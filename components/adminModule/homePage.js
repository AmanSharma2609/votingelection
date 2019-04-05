/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin home page
Purpose   : Admin can view the top candidate and party here and recent post as well as public opinions
*/
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import {  Row, Col, Media } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import { Pie } from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {  withRouter } from 'react-router-dom'
import PrimarySearchAppBar from './appBar/appBar'
import UserUpvoted from '../../images/user.png'
import Dislike from '../../images/SVGs/dislike_unfill.svg'
import Like from '../../images/SVGs/like_unfill.svg'
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Comment from '../../images/SVGs/comment.svg'


const dataLine = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    position: 'right',
    labels: {
      boxWidth: 8
    }
  }
}
const optionsLine = {
  maintainAspectRatio: false,
  responsive: true,

}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  circularLoader: {
    color: '#E18F68'
  },
  recentPostLoader:{
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    bottom: 0,
    color: '#E18F68'
  },
  recentPublicLoader:{
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
    bottom: 0,
    color: '#E18F68'
  }

})






class HomePage extends Component {
  state = {
    topCandidate:{
      votingElection_code : constants.votingElectionCode,
      user_type :'admin'
    },
    topParties :{
      votingElection_code : constants.votingElectionCode,
      user_type :'admin'
    },
    recentPost :{
      votingElection_code : constants.votingElectionCode,
      count: 0,
    },
    publicOpinion:{
      votingElection_code : constants.votingElectionCode,
      count: 0
    },
    topCandidateArray:[],
    topPartiesArray:[],
    publicOpinionArray: [],
    recentPostArray : [],
    isLoading: true,
    stopPublicOpinion: false,
    stopRecentPost: false,
    recentPostLoader: false,
    publicOpinionLoader: false,
  }
  componentDidMount  ()  {
    items('POST',this.state.topCandidate, constants.topCandidates)
    .then(response => {
      console.log(response)
      if(response.status === "Success" && response.data.length !==0 && response.data !== null){
        this.setState({ topCandidateArray: response.data })
      }
      else{
        this.setState({ isLoading: false })
      }
    })
    items('POST',this.state.topParties, constants.topParties)
    .then(response => {
      console.log(response)
      if(response.status === "Success" && response.data.length !==0 && response.data !== null){
        this.setState({ topPartiesArray: response.data })
      }
      else{
        this.setState({ isLoading: false })
      }
    })
    this.viewPublicOpinionCall()
    this.viewRecentPostCall()
  }
  handleToCandidateList = () => {
    this.props.history.push('/AdminCandidate')
  }
  handleToPartyList = () => {
    this.props.history.push('/AdminPoliticalParties')
  }
  publicOpinionScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if(bottom) {
        if(this.state.stopPublicOpinion === false){
          this.setState({ publicOpinionLoader: true })
      this.setState({ publicOpinion:{...this.state.publicOpinion, count : this.state.publicOpinion.count + 1} }, function(){

          items('POST',this.state.publicOpinion, constants.viewPublicOpinion)
          .then(response =>{
            console.log(response);
            if(response.status === "Success" && response.data.length !==0 && response.data !== null){
              this.setState({ publicOpinionArray: this.state.publicOpinionArray.concat(response.data)})
              this.setState({ publicOpinionLoader: false })
            }
            else{
              this.setState({ stopPublicOpinion: true })
              this.setState({ publicOpinionLoader: false })
            }
          })
      })
    }
    }
  }
  handleRecentPostScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if(bottom) {
        if(this.state.stopRecentPost === false){
          this.setState({ recentPostLoader: true })
      this.setState({ recentPost:{...this.state.recentPost, count: this.state.recentPost.count + 1} }, function(){

          items('POST',this.state.recentPost, constants.viewRecentPost)
          .then(response =>{
            console.log(response);
            if(response.status === "Success" && response.data.length !==0 && response.data !== null){
              this.setState({ recentPostArray: this.state.recentPostArray.concat(response.data)  })
              this.setState({ recentPostLoader: false })
            }
            else{
              this.setState({ stopRecentPost: true })
              this.setState({ recentPostLoader: false })

            }
          })

      })
    }
  }
  }
  viewPublicOpinionCall = () => {
    items('POST',this.state.publicOpinion, constants.viewPublicOpinion)
    .then(response =>{
      console.log(response);
      if(response.status === "Success" && response.data.length !==0 && response.data !== null){
        this.setState({ publicOpinionArray: response.data })
      }
    })
  }
  viewRecentPostCall = () => {
    items('POST',this.state.recentPost, constants.viewRecentPost)
    .then(response =>{
      console.log(response);
      if(response.status === "Success" && response.data.length !==0 && response.data !== null){
        this.setState({ recentPostArray: response.data })
        this.setState({ isLoading: false })
      }
      else{
        this.setState({ isLoading: false })
      }
    })
  }

  pushToprofile = (type, id, name) => {
    if(type === 'candidate')
    {
      this.props.history.push({
        pathname: '/AdminCandidate/:/:/AdminCandidateProfile/' + name + '/' + id
      });
    }
    else
    {
      this.props.history.push({
        pathname: '/AdminPoliticalParties/:/:/AdminPoliticalProfile/' + name + '/' + id 
      })
    }
  }

  handleCandidateImgError = (ev) =>  {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  render() {
    const { classes, ...other } = this.props;

    return (
      <div className="AppUserLogin userElection adminDashboard">
        <PrimarySearchAppBar />

        <Container fluid={true} className="">

          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor">Home</p>
            </Col>
          </Row>
        </Container>

        <Container fluid={true} className="w-90 AdminPoliticalPartyContainer mt-4">
          <Row className="marginTop60">
            <Col xs={12} sm={12} lg={6} md={6} xl={6} className="mt-3 text-left">
              <h5 className="fontSemiBold18 greyFontColor">Dashboard</h5>
            </Col>
          </Row>
        </Container>

        <Container fluid={true} className="mt-3 candidateGridContainer AdminPoliticalPartyContainer">
          {this.state.isLoading ? <CircularProgress className={classes.circularLoader}/> :
          <div className="">
                <Row className="">
                  <Col className="" sm={12} xs={12} lg={4} md={6} xl={4} >
                    <div className="boxShadow position-relative mb-3">

                      <div className="darkBackground form-inline">
                        <div className="pl-2 pr-2 text-left text-white headHeight">
                          <p className="mt-2">Recent Post</p>
                        </div>


                      </div>

                      <div onScroll={this.handleRecentPostScroll} className="pl-2 recentPostBox pr-2">
                        {
                          this.state.recentPostArray.map((item, index) => {
                            return (

                        <div key={item.news_id} className="border-bottom mt-3">
                          <div className='fontBold16 text-left'>
                            {item.news_title}
                          </div>
                          <div className="text-left">
                            <div className="text-left greyFontColor fontRegular12 mb-2 wordBreak ql-editor p-0"
                              dangerouslySetInnerHTML={{ __html: item.news_text }}>
                            </div>
                          </div>
                          <div className="form-inline">
                            <div className="form-inline fontRegular10 d-flex align-items-baseline">
                              <div className="mr-1 ml-0 d-flex align-items-center">
                                <span className="mr-1 mt-1">{item.likes_count}</span>
                                <img src={Like} className="likeDislikeIcons" alt={Like}/> 
                              </div>
                              <div className="mr-1 ml-1 d-flex align-items-center">
                                <span className="mr-1">{item.dislikes_count}</span>
                                <img src={Dislike} className="likeDislikeIcons" alt={Dislike}/>
                              </div>
                              <div className="mr-1 ml-1 d-flex align-items-center">
                                <span className="mr-1">{item.comment_count}</span>
                                <img src={Comment} alt={Comment} className="likeDislikeIcons"/>
                              </div>
                            </div>
                            <div className="fontRegular10 ml-auto">
                              <p className="">{item.news_posted_on}</p>
                            </div>

                          </div>
                        </div>
                      )
                    })
                  }
                  {this.state.recentPostArray.length === 0 ? 'No Recent Post' : null}
                    <div>
                      {this.state.recentPostLoader ? <CircularProgress className={classes.recentPostLoader}/> : null }

                    </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="" sm={12} xs={12} lg={4} md={6} xl={4} >
                    <Row className="">
                      <Col className="" sm={12} xs={12} lg={12} md={12} xl={12}>
                        <div className="boxShadow mb-3">
                        <div className="darkBackground form-inline">
                          <div className="pl-2 pr-2 text-left text-white headHeight">
                            <p className="mt-2">Current Election</p>
                          </div>
                        </div>
                          <div className="mt-2">
                            <div className="pb-2 w-50 mr-auto ml-auto">
                              <Pie data={data} height={120} width={120} options={options} />
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col className="" sm={12} xs={12} lg={12} md={12} xl={12}>
                        <div className="boxShadow mb-3">
                          <div className="darkBackground">
                            <p className="pl-2 pr-2 pt-1 pb-1 text-left text-white">SITE USERS </p>
                          </div>
                          <div className="">
                          <div className="pl-2 pr-2 pb-2">
                            <Line data={dataLine} options={optionsLine} />
                          </div>
                          </div>
                        </div>
                      </Col>

                      <Col className="" sm={12} xs={12} lg={12} md={12} xl={12}>
                        <div className="boxShadow mb-4">
                        <div className="darkBackground form-inline">
                          <div className="pl-2 pr-2 text-left text-white headHeight">
                            <p className="mt-2">Top Candidates</p>
                          </div>
                          <div className="ml-auto pl-2 pr-2 headHeight fontRegular12">

                            <p onClick={this.handleToCandidateList} className="mt-2 pl-2 pr-2 pt-1 pb-1 bg-white viewAll">
                              View All
                            </p>
                          </div>
                        </div>
                          <div className="pl-1 pr-1">
                            <div className="pt-2">
                              <div className="mt-1 pl-2">
                                {
                                  this.state.topCandidateArray.map((item, index) => {
                                    return (
                                <Media key={item.candidate_id} className="mediaCenter cursorPointer" onClick={this.pushToprofile.bind(this, 'candidate', item.candidate_id, item.candidate_name)}>
                                  <div className="rounded-circle cardImgCont">
                                    <img width={30} className="" onError={this.handleCandidateImgError}
                                     className="rounded-circle mr-1  mb-3" src={item.candidate_img_url === null || item.candidate_img_url === '' ? UserUpvoted : item.candidate_img_url } alt="" />
                                  </div>
                                  <div className="cardContent text-left ml-2">
                                    <Media.Heading className="fontBoldItalic greyFontColor lineHeight16">
                                      <div className="topPartiesList">
                                        {item.candidate_name}
                                          
                                          <div className="fontRegular10 greyFontColor topList text-capitalize">
                                            <i>{item.party_name.toLowerCase()}</i>
                                          </div>
                                      </div>
                                    </Media.Heading>
                                  </div>
                                  <p className="likesStyle greyFontColor spaceTextUserHome mt-1 ml-auto mr-1 m-0">{item.upvote_count}</p>
                                  <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                                  <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                                  <p className="likesStyle greyFontColor mt-1 mr-2">{item.downvote_count}</p>
                                </Media>
                              )
                            })
                          }
                              </div>
                            </div>



                          </div>

                        </div>
                      </Col>
                    </Row>
                  </Col>



                  <Col className="" sm={12} xs={12} lg={4} md={12} xl={4} >
                    <Row className="">
                      <Col className="" sm={12} xs={12} lg={12} md={12} xl={12}>
                        <div className="boxShadow  mb-3">
                        <div className="darkBackground form-inline">
                          <div className="pl-2 pr-2 text-left text-white headHeight">
                            <p className="mt-2">Public Opinion</p>
                          </div>
                        </div>
                          <div className="text-left publicOpinionBox pl-2 pr-2 pb-3" onScroll={this.publicOpinionScroll}>

                            {
                              this.state.publicOpinionArray.map((item, index) => {
                                return (
                            <div key={item.opinion_by} className="border-bottom position-relative pb-2 pt-2">
                              <div className="fontRegular14 wordBreak">
                              {decodeURI(item.opinion_desc)}
                              </div>

                              <div className="fontRegular12 position-absolute mt-1 text-left">
                                For-{item.opinion_on_name}
                              </div>
                              <div className="fontRegular12 text-right">

                                {item.opinion_created_on}
                              </div>


                            </div>
                          )
                        })
                      }
                      <div className="d-flex justify-content-center">
                        {this.state.publicOpinionLoader ? <CircularProgress className={classes.recentPublicLoader}/> : null }
                      </div>
                          </div>

                        </div>
                      </Col>
                    </Row>

                    <Row className="">
                      <Col className="" sm={12} xs={12} lg={12} md={12} xl={12}>
                        <div className="boxShadow">
                          <div className="darkBackground form-inline">
                            <div className="pl-2 pr-2 text-left text-white headHeight">
                              <p className="mt-2">Top Parties</p>
                            </div>
                            <div className="ml-auto pl-2 pr-2 headHeight fontRegular12">
                              <p onClick={this.handleToPartyList} className="mt-2 pl-2 pr-2 pt-1 pb-1 bg-white viewAll">
                                View All
                              </p>
                            </div>
                          </div>
                          <div className="text-left pl-2 pr-2 ">
                            <div className=" pt-2">
                              <div className="mt-1 pl-2">
                                {
                                  this.state.topPartiesArray.map((item, index) => {
                                    return (
                                <Media key={item.party_id} className="mediaCenter cursorPointer" onClick={this.pushToprofile.bind(this, 'party', item.party_id, item.party_name)}>
                                  <div className="rounded-circle cardImgCont">
                                    <img width={30} className="" onError={this.handlePartyImgError}
                                     src={item.party_img_url === null || item.party_img_url === '' ? UserUpvoted : item.party_img_url } alt={item.party_img_url } />
                                  </div>
                                  <div className="cardContent text-left ml-2">
                                    <Media.Heading className="fontBoldItalic greyFontColor lineHeight18">
                                      <div className="topPartiesList">
                                        {item.party_name}
                                          <div className="fontRegular10 greyFontColor topList text-capitalize">
                                            <i>{item.party_type === '' || item.party_type === null ? item.party_name.toLowerCase() : item.party_type.toLowerCase()}</i>
                                          </div>  
                                      </div>
                                    </Media.Heading>
                                  </div>
                                  <p className="likesStyle greyFontColor spaceTextUserHome mt-1 ml-auto mr-1 m-0">{item.upvote_count}</p>
                                  <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                                  <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                                  <p className="likesStyle greyFontColor mt-1 mr-2">{item.downvote_count}</p>
                                </Media>
                              )
                            })
                          }
                              </div>
                            </div>
                          </div>

                        </div>
                      </Col>
                    </Row>


                  </Col>

                </Row>
          </div>
        }
        </Container>



      </div>

    )
  }
}
HomePage = withRouter(HomePage)
export default withStyles(styles)(HomePage);
