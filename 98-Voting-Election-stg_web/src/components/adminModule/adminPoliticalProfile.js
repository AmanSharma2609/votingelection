/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin political partiy profile
Purpose   : admin political profile view
*/
import React, { Component } from 'react';
import { Image, } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import { constants } from '../../networkCall/constant'
import {items} from '../../networkCall/service.js'
import { NavLink } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import { withRouter } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';

import partyPic from '../../images/SVGs/default_partyimg.svg'
import Dislike from '../../images/SVGs/dislike_unfill.svg'
import Like from '../../images/SVGs/like_unfill.svg'
import Publicuser from '../../images/SVGs/default_userimg.svg'
import Comment from '../../images/SVGs/comment.svg'
import PrimarySearchAppBar from './appBar/appBar'
import Add from '../../images/add.png';
import Delete from '../../images/SVGs/delete.svg'
import { Emojione } from 'react-emoji-render';


function TabContainer({ children, dir }) {
  return (
    0
  );
}
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  

];

const dataBanking = [
  { key: 'A' }, { key: 'B' },
]
const bondArray = [
  { key: 'A' },
]




const styles = theme => ({
  buttonUserCandidate: {
    width: '100%',
    backgroundColor: '#E18F68',
    color: 'white',
    fontFamily: 'montserratregular',
    borderRadius: 0,
    marginTop: '25px',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  profileBoxText: {
    fontSize: 12,
    fontFamily: 'montserratregular',
    marginLeft: -10,
  },
  profileTextTwo: {
    fontSize: 12,
    fontFamily: 'montserratregular',
    paddingLeft: 10,
    marginLeft: 15,
    borderLeft: '1px solid'
  },
  textStyle: {
    fontSize: 12,
    fontFamily: 'montserratregular',
  },
  arrowUp: {
    fontSize: 50,
    marginLeft: -10,
    color: 'green'
  },
  arrowDown: {
    fontSize: 50,
    marginLeft: -20,
    marginBottom: 5,
    color: '#FDD717'
  },
  iconMargin: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  appBarStyle: {
    backgroundColor: '#FEF8DF',
    boxShadow: 'none',
    '&>div>div>div': {
      overflowX:'auto',
      overflowY:'hidden'
    },
    '&>div>div>div::-webkit-scrollbar': {
      height : '0px'
    },
  },
  appBarStyleNest: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },

  indicator: {
    backgroundColor: '#E18F68',
  },
  link: {
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: '#555555',
    '&:hover':{
      color: '#E18F68'
     }
  },
  activelink: {
    color: '#E18F68',
    '&:hover':{
      color: '#555555'
     }
  },

  tabLabelStyle: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: 11,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  tabLabelStyleAssets: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: 16,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
    'element.style': {
      width: 183,
    },
  },

  tabLabelStyleAssetsImmovable: {
    textTransform: 'capitalize',
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  tabLabelStyleAssetsLiabilities: {
    textTransform: 'capitalize',
    color: 'black',
    paddingRight: '3%',
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  active_tab: {
    textTransform: 'capitalize',
    border: 0,
    fontSize: 11,
    color: 'white',
    backgroundColor: '#E18F68',
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  table: {
    width: '100%',
  },
  rowHeading: {
    fontSize: 16,
    fontFamily: 'montserratregular',
    paddingRight: 4,
    paddingLeft: 4
  },
  rowCell: {
    fontSize: 14,
    fontFamily: 'montserratmedium',
    paddingRight: 4,
    paddingLeft: 4
  },
  textFieldInput1: {
    borderTop: '1px solid grey',
    borderLeft: '1px solid grey',
    borderRight: '1px solid grey',

    fontSize: 16,
    width: '100% ',
    minHeight: '100%'
  },

  buttonComment: {
    width: '30%',
    backgroundColor: '#E18F68',
    borderRadius: 0,
    marginBottom: 0,
    fontSize: 12,
    color: 'white',
    fontFamily: 'montserratregular',
  },
  iconMarginImg: {
    color: 'white',
    zIndex: 1,
    marginLeft: 14,
    position: 'absolute',
    marginTop: 35
  },
  iconMarginImgAdd: {
    position: 'absolute',
    left: 15,
    margin: 0
  },
  circularLoader: {
    color: '#E18F68'
  },
  root: {
    backgroundColor: 'rgba(127, 127, 127, 0.2)',
  },
  paper: {
    backgroundColor: '#f2f2f2',
    boxShadow: 'none',
    position: 'absolute',
    borderRadius: 0,
    top: '30%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  buttonContDailog: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover':{
      backgroundColor: '#b75628'
     }
  },
  dailogContent: {
    textAlign: 'center',
    fontFamily: 'montserratregular',
    fontSize: 14,
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  dailogTitle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'montserratsemibold',
    fontSize: 20,
    backgroundColor: '#E18F68',
    padding: '5px 15px',
  },
  dailogButton: {
    backgroundColor: '#E18F68',
    color: 'white',
    fontFamily: 'montserratregular',
    fontSize: 14,
    boxShadow: 'none',
    borderRadius: 5,
    '&:hover':{
      backgroundColor: '#b75628'
     }
    },
  dailogContentStyle: {
    color: '#555555',
    fontFamily: 'montserratregular',
    fontSize: 16,
  },
  iconMarginComment:{
    marginTop: 'auto',
    marginBottom: 'auto',
    cursor: "pointer"
  },
  recentPostLoader:{
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    bottom: 0,
    color: '#E18F68'
  },
  recentPublicLoader:{
    marginTop: 25,
    marginBottom: 25,
    fontSize: 15,
    bottom: 0,
    color: '#E18F68'
  }

})

class AdminPoliticalPartyProfile extends Component {

  state = {
    value: 0,
    valueAssets: 0,
    valueCriminal: 0,
    count: 0,
    party_name: '',
    newsArray: [],
    publicOpinionArray: [],
    isLoading: true,
    secondArray: [],
    activeIndex: 0,
    openDelOpi: false,
    openDelPost: false,
    newsParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: null,
      count: 0
    },
    publicParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: null,
      count: 0
    },
    contactParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: null,
    },
    educationArray: [],
    PolliticalArray: [],
    bankingArray: dataBanking,
    bondArray: bondArray,
    openDelCommentPost: false,
    profileData: null,
    generalParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: null,
    },
    deleteOpinioin:{
      votingElection_code : constants.votingElectionCode,
      token_id :'',
      opinion_id :''
    },
    deletePost: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      news_id: ''
    },
    userCommentRead:{
      votingElection_code : constants.votingElectionCode,
      news_id :''
    },
    userCommentArray: [],
    dailogPostArray: '',
    openComment: false,
    adminDeleteComment:{
      votingElection_code : constants.votingElectionCode,
      token_id :'',
      comment_id :''
    },
    electionPartyArr:[],
    styleForUpvote: {
      width: '33%'
    },
    styleForDownvote: {
      width: '34%'
    },
    styleForCantSay: {
      width: '33%'
    },
    stopPublicCall: false,
    stopNewsCall: false,
    recentPostLoader: false,
    recentPublicLoader: false,
    newsCount : 0, 
    activityNewsIndex : null,
    activityLoader: false,
    publicLoader: true,
    genInfoLoader: true,
    contactLoader: true,
  }

  handleAssetsChange = (event, valueAssets) => {
    this.setState({ valueAssets: valueAssets });
  }
  handleCriminalChange = (event, valueCriminal) => {
    this.setState({ valueCriminal: valueCriminal })
  }

  handleChange = (event, value, index) => {
    this.setState({ value: value });

  };
  handleNewsScroll = (e, prevState) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
    }
  }

  handlePublicScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if(bottom) {
      if(this.state.value === 0)
      {
        this.newsApiParty();
      }
      if(this.state.value === 1){
      if(this.state.stopPublicCall === false) {
        this.setState({ recentPublicLoader : true })
        this.setState({ publicParameter:{...this.state.publicParameter, count: this.state.publicParameter.count + 1} }, function() {
          items('POST', this.state.publicParameter, constants.partyPublicOpinion)
            .then(response => {
              console.log(response)
              if(response.status === "Success" && response.data.length !==0 && response.data !== null){
              this.setState({ publicOpinionArray: this.state.publicOpinionArray.concat(response.data)  })
              this.setState({ recentPublicLoader : false })
            }
            else{
              this.setState({ stopPublicCall: true })
              this.setState({ recentPublicLoader : false })
            }
            })
        })
      }
    }
    if(this.state.value === 0) {
      if(this.state.stopNewsCall === false) {
        this.setState({ recentPostLoader: true })
        this.setState({ newsParameter: { ...this.state.newsParameter, count: this.state.newsParameter.count + 1 } }, function () {
          items('POST', this.state.newsParameter, constants.partyNews)
            .then(response => {
              if(response.status === "Success" && response.data.length !==0 && response.data !== null){
              this.setState({ newsArray: this.state.newsArray.concat(response.data) })
              this.setState({ recentPostLoader: false })
            }
            else{
              this.setState({ stopNewsCall : true })
              this.setState({ recentPostLoader: false })
            }
            })
        })
      }
    }
  }
  }

  electionPartyRecord()
  {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      party_id : this.props.match.params.id
    }

    items('POST', requestedData, constants.electionPartyDetail)
      .then(response => {

       if(response.status === "Success")
       {
        if(!(response.data === null || response.data.length === 0))
        {
         this.setState({electionPartyArr:response.data});

        }
       }
       else if(response.status === "Failure"){

       }
       else {

       }
      });
  }

  deleteCommentPostPopup = (openPopup, comment_id) => {
    this.setState({ openDelCommentPost: openPopup });
    this.setState({ adminDeleteComment: { ...this.state.adminDeleteComment, comment_id: comment_id } });
  }

  componentDidMount() {
    global.partyData = [''];
    let value = localStorage.getItem('accessToken');
    let valueThree =  this.props.match.params.name;

    const valueTwo =  this.props.match.params.id;

    const adminToken = localStorage.getItem("accessToken")

    this.setState({ adminDeleteComment:{...this.state.adminDeleteComment, token_id: adminToken} })
    this.setState({ deleteOpinioin:{...this.state.deleteOpinioin, token_id: adminToken} })
    this.setState({ deletePost: { ...this.state.deletePost, token_id: adminToken } })
    this.setState({ generalParameter: { ...this.state.generalParameter, party_id: valueTwo, token_id: value } }, function () {

      items('POST', this.state.generalParameter, constants.partyGeneralInfo)
      .then(response => {
        if(response.status === "Success"){

          if(!(response.data === undefined || response.data === null || response.data.length === 0)){
            global.partyData = response.data

            if(global.partyData !== undefined || global.partyData !== null || global.partyData.length !== 0){
              this.calculateWidthForBar(global.partyData[0].upvote_count, global.partyData[0].downvote_count, global.partyData[0].cannot_say_count);
            }
          }
          else
          {
            global.partyData = [{'party_img_url' : ''}];
          }

          this.setState({ profileData: response })
          localStorage.setItem('profilePartyId', response.data[0].party_id)
        }else if(response.status === "Failure"){
          if(response.msg === "Political party not present."){
            this.props.history.push('/AdminPoliticalParties')
          }
        }

        if(global.partyData === undefined || global.partyData === null || global.partyData.length === 0){
          this.props.history.push('/AdminPoliticalParties')
        }

      })
    })
    this.setState({ newsParameter: { ...this.state.newsParameter, party_id: valueTwo, token_id: value } }, function () {

      this.newsApiParty()

    })
    this.setState({ party_name: valueThree })

    this.setState({ publicParameter: { ...this.state.publicParameter, party_id: valueTwo, token_id: value } }, function () {

      this.publicOpinionArray()

    })
    this.setState({ contactParameter: { ...this.state.contactParameter, party_id: valueTwo } }, function () {

      this.partyContact()

    })

    setTimeout(() => {

    }, 10)

    this.electionPartyRecord();
  }

  calculateWidthForBar = (upvote, downvote, cantsay) => {
    let total = upvote + downvote + cantsay;

    let upVoteWidth = ((upvote * 100) / total ) + '%';
    let downVoteWidth = ((downvote * 100) / total ) + '%';
    let cantSayWidth = ((cantsay * 100) / total ) + '%';

    if(total !== 0){
      this.setState({styleForUpvote: {...this.state.styleForUpvote, width: upVoteWidth}})
      this.setState({styleForDownvote: {...this.state.styleForDownvote, width: downVoteWidth}})
      this.setState({styleForCantSay: {...this.state.styleForCantSay, width: cantSayWidth}})
    }
  }

  componentWillReceiveProps = (newProps) =>{
    global.partyData = [''];
    
    let value = localStorage.getItem('accessToken');
    let valueThree =  newProps.match.params.name;

    const valueTwo =  newProps.match.params.id;

    const adminToken = localStorage.getItem("accessToken")

    this.setState({ adminDeleteComment:{...this.state.adminDeleteComment, token_id: adminToken} })
    this.setState({ deleteOpinioin:{...this.state.deleteOpinioin, token_id: adminToken} })
    this.setState({ generalParameter: { ...this.state.generalParameter, party_id: valueTwo, token_id: value } }, function () {

      items('POST', this.state.generalParameter, constants.partyGeneralInfo)
      .then(response => {
        if(response.status === "Success"){

          if(response.data !== undefined || response.data !== null || response.data.length !== 0){
            global.partyData = response.data
          }
          this.setState({ profileData: response })
          localStorage.setItem('profilePartyId', response.data[0].party_id)
        }else if(response.status === "Failure"){
          if(response.msg === "Political party not present."){
            this.props.history.push('/AdminPoliticalParties')
          }
        }
      })
    })
    this.setState({ newsParameter: { ...this.state.newsParameter, party_id: valueTwo, token_id: value } }, function () {

      this.newsApiParty()

    })
    this.setState({ party_name: valueThree })

    this.setState({ publicParameter: { ...this.state.publicParameter, party_id: valueTwo, token_id: value } }, function () {

      this.publicOpinionArray()

    })
    this.setState({ contactParameter: { ...this.state.contactParameter, party_id: valueTwo } }, function () {

      this.partyContact()

    })

    setTimeout(() => {

    }, 10)
    this.electionPartyRecord();
  }

  newsApiParty = () => {
     let requestedData = {
      votingElection_code: constants.votingElectionCode,
      party_id: this.props.match.params.id,
      user_id: localStorage.getItem('userId'),
      search_type: 'political_party',
      count: this.state.newsCount
    }

    items('POST', requestedData, constants.candidateNews)
      .then(response => {
        if (response.status === "Success") {
          console.log(response)
          if (!(response.data === undefined || response.data === null || response.data.length === 0)) {
            for (let i of response.data) {
              
              if (i.post_type === 'poll') {
                let temp = {
                  "post_type": "poll",
                  "news_id": i.news_id,
                  "news_text": i.news_text,
                  "poll_flag": 1,
                  "news_created_on": i.news_created_on,
                  "likes_count": i.likes_count,
                  "dislikes_count": i.dislikes_count,
                  "comment_count": i.comment_count,
                  "status": i.status,
                  "pollanswer": []
                }
                for (let j of i.pollanswer) {
                  let pollTempVar = {
                    "polls_ans_id": j.polls_ans_id,
                    "poll_answer": j.poll_answer,
                    "vote": j.vote,
                    "vote_flag": j.vote_flag,
                    "width": {
                      width: j.vote + '%'
                    }
                  }
                  temp.pollanswer.push(pollTempVar)
                }
                this.setState({ newsArray: [...this.state.newsArray, temp] });
              }
              else {
                this.setState({ newsArray: [...this.state.newsArray, i] });
              }
            }
            this.setState({ newsCount: this.state.newsCount + 1 });
            this.setState({ post: response.data[0].news_text });
            this.setState({ activityLoader: false })
          }
        }
        else if (response.status === "Failure") {
          this.setState({ activityLoader: false })
        }
        else {
          
          this.setState({ activityLoader: false })
        }
      });
  }

  publicOpinionArray = () => {
    items('POST', this.state.publicParameter, constants.partyPublicOpinion)
      .then(response => {

        this.setState({ publicOpinionArray: response.data })
      })
  }

  partyContact = () => {
    items('POST', this.state.contactParameter, constants.partyContactDetail)
      .then(response => {
        if(response.status === 'Success' && response.data.length !== 0){
          this.setState({ isLoading: false })
          global.contactData = response.data[0]
        }
        else{
          this.setState({ isLoading: false })
        }
        
      })
  }

  handleDeleteOpen = (public_opinion_id) => {

    this.setState({ deleteOpinioin: {...this.state.deleteOpinioin,opinion_id: public_opinion_id} })
    this.setState({ openDelOpi: true })
  }

  handleCloseDelOpi = () => {
    this.setState({ openDelOpi: false })
  }

  handleDeleteOpinion = () => {
    items("POST", this.state.deleteOpinioin, constants.adminDeleteOpinion)
    .then(response=> {

      if(response.status === "Success"){
        this.setState({ openDelOpi: false })
        this.publicOpinionArray()
      }
    })
  }

  handleCloseDelPost = () => {
    this.setState({ openDelPost: false })
  }

  handleDeletePostPopUp = (news_id, index) => {
    this.setState({ deletePost: { ...this.state.deletePost, news_id: news_id } })
    this.setState({ openDelPost: true })
    this.setState({activityNewsIndex : index});
  }

  handleDeletePost = () => {
    items("POST", this.state.deletePost, constants.adminDeletePost)
      .then(response => {

        if (response.status === "Success") {
          this.setState({ openDelPost: false })
          // this.newsApiParty();
          this.state.newsArray.splice(this.state.activityNewsIndex, 1);
          this.setState({newsArray : this.state.newsArray})
        }
      })
  }

  handleToEditParty = () => {
    this.props.history.push({
      pathname: '/AdminPoliticalParties//UpdateParty',

    })
  }
  handleOpenAdminComment = (news_id, news_text, comment_count, likes_count, dislikes_count, news_created_on) => {
    this.setState({ newCreatedOn: news_created_on })
    this.setState({ commentCount: comment_count })
    this.setState({ commentLikeCount: likes_count })
    this.setState({ commentDislikeCount: dislikes_count })
    this.setState({ dailogPostArray: news_text })
    this.setState({ userCommentRead: {...this.state.userCommentRead, news_id: news_id} }, function(){
      items("POST", this.state.userCommentRead, constants.userCommentView)
      .then(response => {

        if(response.status === "Success"){
          this.setState({ userCommentArray: response.data })
          this.setState({ openComment: true })
        }
      })
    })
  }
  handleCloseComment = () => {
    this.setState({ openComment: false })
  }
  handleUserDeleteComment = () => {

      items("POST", this.state.adminDeleteComment, constants.adminDeleteComm)
      .then(response => {

        if(response.status === "Success"){
          items("POST", this.state.userCommentRead, constants.userCommentView)
          .then(response => {

            if(response.status === "Success"){
              this.setState({ userCommentArray: response.data })
              this.newsApiParty()
              this.setState({ commentCount : this.state.commentCount -1 })

                        }
          })
        }
    })
    this.setState({openDelCommentPost: false});
  }
  
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }
  
  render() {
    const { classes, ...other } = this.props;

    return (
      <div className="AppUserLogin userElection adminCandidate" onScroll={this.handlePublicScroll}>
        <PrimarySearchAppBar />

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> /
              <NavLink className="breadCrumbs" to='/AdminPoliticalParties'> Parties</NavLink> / {this.state.party_name}</p>
            </Col>
          </Row>
        </Container>

        {/* <----------Center-Content------------------> */}
        {this.state.isLoading === true ? <div className="marginTop80"><CircularProgress className={`marginTop80 mt-5 ${classes.circularLoader}`} /></div> :
          <div className="partyProfileSection ml-auto mr-auto mt-5">
            <Container fluid={true} className="marginTop80">
              <Row className="">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                  <div className="flexCardContainer">
                    <div className="lightBackgroundColor flexCardProfile rounded paddingLeft10 paddingRight10 pt-3 pb-3 boxShadowNone">
                      <div className="justify-content-center mb-3 mt-2">
                        <div className="d-flex justify-content-center">
                          <div className="imageUpload">
                            <Image
                              className="imageCandidatePartyProfile"
                              src={global.partyData[0].party_img_url === null || global.partyData[0].party_img_url === '' ||  global.partyData[0].party_img_url === undefined ? partyPic : global.partyData[0].party_img_url}
                              responsive
                              onError={this.handlePartyImgError}
                            >
                            </Image>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6 className="fontWeight700 headingHeight">{global.partyData[0].party_name}</h6>
                        <small className="lineHeight18">
                          <p className="textCenterCandidateProfile greyFontColor fontRegular13 mt-3 mb-4">
                            {global.partyData[0].party_type}<br />
                            {global.partyData[0].party_chairperson}<br />
                            {global.partyData[0].party_registered_state},India
                          </p>
                        </small>
                      </div>


                      <div className="likeDislikeBarContainer mt-0">
                        <div className="pl-1">
                          <div className="form-inline pl-0 mb-4 mt-4  d-flex justify-content-center">
                            <Typography variant="caption" className={`${classes.textStyle} pr-2`}>{global.partyData[0].upvote_count}</Typography>
                            <span className={global.partyData[0].upvote_count === 0 || global.partyData[0].upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                            <span className={global.partyData[0].downvote_count === 0 || global.partyData[0].downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                            <Typography variant="caption" className={`${classes.profileBoxText} pl-3`}>{global.partyData[0].downvote_count}</Typography>
                            <Typography variant="caption" className={classes.profileTextTwo} >{global.partyData[0].cannot_say_count} Can't Say</Typography>
                          </div>

                          <div className="w-100 form-inline likeDislikeBar">
                            <span className="bg-success likeDislikeBar like" style={this.state.styleForUpvote}><small>{global.partyData[0].upvote_count}</small></span>
                            <span className="bg-warning likeDislikeBar dislike" style={this.state.styleForDownvote}><small>{global.partyData[0].downvote_count}</small></span>
                            <span className="bg-danger likeDislikeBar cantSay" style={this.state.styleForCantSay}><small>{global.partyData[0].cannot_say_count}</small></span>
                          </div>
                          <div className="follow mt-0 pr-0">
                            <NavLink className="breadCrumbs text-white" to={`/AddPost/political_party/${this.props.match.params.id}/${this.props.match.params.name}`}>
                              <Button bssize="large" color="inherit" className={`${classes.buttonUserCandidate} mt-2 p-0`}>
                                <img src={Add} className={classes.iconMarginImgAdd} alt="search" height="15" width="15"/>
                                ADD POST
                              </Button>
                            </NavLink>
                          </div>
                          <div className="follow pr-0">

                            <img src={Add} className={classes.iconMarginImg}
                              alt="search" height="15" width="15"
                            />

                            <Button
                              bssize="large"
                              color="inherit"
                              className={classes.buttonUserCandidate}
                              onClick={this.handleToEditParty}
                            >
                              {/* <Add /> */}
                              EDIT PARTY
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="contentContainer mb-3 rounded boxShadowNone">
                    <div className="mb-4">
                      <AppBar position="static" className={classes.appBarStyle}>
                        <Tabs value={this.state.value} onChange={this.handleChange}
                          classes={{
                            indicator: `${classes.indicator} w-auto`,
                          }}
                          fullWidth={true}

                          scrollButtons="auto"
                          selected={true}
                        >
                          <Tab label="Activity" className={this.state.value === 0 ? classes.active_tab : classes.tabLabelStyle} />
                          <Tab label="Public Opinions" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle} />
                          <Tab label="General Information" className={this.state.value === 2 ? classes.active_tab : classes.tabLabelStyle} />
                          <Tab label="Contact Details" className={this.state.value === 3 ? classes.active_tab : classes.tabLabelStyle} />

                        </Tabs>
                      </AppBar>

                      {/* <--------------Activity-Tab---------------------------------> */}

                      {this.state.value === 0 && <div className="" >
                      {this.state.activityLoader ? <CircularProgress  className={classes.circularLoader}/> : <div>
                      <Container>
                      <Row>
                        <Col xs={12} sm={6} lg={12} md={12} xl={12}>
                          <div className="searchDialogBox">
                          <Dialog

                          scroll='paper'
                          fullWidth
                          open={this.state.openComment}
                          TransitionComponent={Transition}
                          keepMounted
                          onClose={this.handleCloseComment}
                          PaperProps={{
                            classes: {
                              root: classes.paperComment,
                              paper: classes.paperComment
                            }
                          }}
                          BackdropProps={{
                            classes: {
                              root: classes.rootBackDrop
                            }
                          }
                          }
                          aria-labelledby="alert-dialog-slide-title"
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle id="alert-dialog-slide-title">
                            <div className="greyFontColor wordBreak w-100 fontSemiBold16 mb-4">
                              {/* {this.state.dailogPostArray} */}
                            </div>
                            <div className="">
                              <Row className="greyFontColor fontSemiBold12">
                                <Col xs={7} className="row">
                                  <div className="mr-1 ml-3 d-flex align-items-center">
                                    <span className="mr-2">{this.state.commentLikeCount}</span>
                                    <span><img src={Like} alt={Like} className="likeDislikeIcons" /></span>
                                  </div>
                                  <div className="mr-1 ml-1 d-flex align-items-center">
                                    <span className="mr-2">{this.state.commentDislikeCount}</span>
                                    <span><img src={Dislike} alt={Dislike} className="likeDislikeIcons" /> </span>
                                  </div>
                                  <div className="mr-1 ml-1 d-flex align-items-center">
                                    <span className="mr-2">{this.state.commentCount} </span>
                                    <span><img src={Comment} alt={Comment} className="likeDislikeIcons" /> </span>
                                  </div>
                                </Col>
                                <Col xs={5} className="text-right pr-2">
                                  {this.state.newCreatedOn}
                                </Col>
                              </Row>
                            </div>
                            <hr className="mt-0 mb-0"/>
                          </DialogTitle>
                          <DialogContent className={classes.paperComment}>
                            <DialogContentText id="alert-dialog-slide-description">
                              <div className="commetTextArea">
                              {this.state.userCommentArray.length === 0 ? <p className="fontMedium16">No Comments here</p> :
                                <div className="commetTextArea">
                                {this.state.userCommentArray.map((item,index) =>{
                                  return(

                                    <div className="card p-2 cardRadius mb-1">
                                      <span className="mb-1 greyFontColor fontSemiBold12">{decodeURI(item.comment_desc)}</span>
                                      <Row className="ml-0 mr-0 fontSemiBold12 pl-0 pr-0">
                                        <Col xs={7} className="d-flex align-items-center ml-0 mr-0 pl-0 pr-0">
                                          <div className="pl-0 pr-0">By <span className="text-capitalize">{item.user_name}</span></div>
                                          <div className="col-4 cursorPointer"
                                            onClick={this.deleteCommentPostPopup.bind(this, true, item.comment_id)}
                                            ><img src={Delete} className="greyFontColor cursorPointer icon"
                                               width="13"/>
                                          </div>

                                        </Col>
                                        <Col xs={5} className="text-right">
                                          <span className="">{item.comment_created_on}</span>
                                        </Col>
                                      </Row>
                                    </div>
                                   )
                              }
                              )}
                                </div>
                              }

                            </div>

                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                          </DialogActions>
                        </Dialog>

                          </div>
                        </Col>
                      </Row>
                    </Container>
                      {this.state.electionPartyArr.length === 0 && this.state.newsArray.length === 0 ?
                      <Row className="ml-1 mb-4 mt-4">
                        <div className="fontRegular16 text-center w-100"> No news available. </div>
                      </Row>
                      :
                        <Row className="ml-0 mr-0 mb-4">

                          <Col xs={12} sm={12} md={12} lg={8} xl={8}  className="mb-3">
                            <div className="commentShow pr-3 mt-4" onScroll={this.handleNewsScroll}>
                              {this.state.newsArray.length === 0 ? <div className="fontRegular16"> No news available. </div>:
                              <div>
                                <Dialog
                                TransitionComponent={Transition}
                                open={this.state.openDelPost}
                                onClose={this.handleCloseDelPost}
                                PaperProps={{
                                  classes: {
                                    root: classes.paper
                                  }
                                }}
                                {...other}
                                BackdropProps={{
                                  classes: {
                                    root: classes.root
                                  }
                                }
                                }
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                >
                                <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Delete Post"}</DialogTitle>
                                <DialogContent className={classes.dailogContent}>
                                  <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                                    <div className="fontSemiBold16 mt-4">
                                      Are You sure you want to delete this post?
                                    </div>
                                    <div className="mt-3 form-inline d-flex justify-content-center">
                                      <div className="mr-2 mt-3">
                                        <Button onClick={this.handleCloseDelPost} variant="contained" className={classes.dailogButton}>
                                          CANCEL
                                        </Button>
                                      </div>
                                      <div className="mt-3">
                                        <Button onClick={this.handleDeletePost} variant="contained" className={classes.dailogButton}>
                                          DELETE
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContentText>
                                </DialogContent>
                              </Dialog>
                                {this.state.newsArray.map( (item, index) => {
                                  return (
                                    <div>
                                      {item.post_type === 'post'?
                                      <div className="mt-3">
                                        <div className="text-left pl-0 greyFontColor fontSemiBold13 mb-2 wordBreak">
                                          <strong>{item.news_title}</strong>
                                        </div>
                                        <div className="text-left greyFontColor fontRegular12 mb-2 wordBreak ql-editor p-0"
                                          dangerouslySetInnerHTML={{ __html: item.news_text }}>
                                        </div>
                                        <div className="postCommentLike form-inline pl-2 pr-2 commentTrayBackground">
                                          <div className="form-inline">
                                            <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                              <span className="likesCount mr-1">{item.likes_count}</span>
                                              <img src={Like} className={`${classes.iconMargin} likeDislikeIcons`}    />
                                            </div>
                                            <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                              <span className="likesCount ml-2 mr-1">{item.dislikes_count}</span>
                                              <img src={Dislike} className={`${classes.iconMargin} mt-2 likeDislikeIcons`}    />
                                            </div>
                                            <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                              <span className="likesCount ml-2 mr-1">{item.comment_count}</span>
                                              <img src={Comment} onClick={this.handleOpenAdminComment.bind(this, item.news_id, item.news_text, item.comment_count, item.likes_count, item.dislikes_count, item.news_created_on)} className={classes.iconMarginComment}
                                                   height="15" width="15"
                                              />
                                            </div>
                                          </div>
                                          <div className="form-inline ml-auto">
                                            <div className="fontRegular12 greyFontColor mr-3">
                                              {item.news_created_on}
                                            </div>
                                            <div className="remove1box">
                                              <div className="greyFontColor cursorPointer remove1 m-0">
                                                <img onClick={this.handleDeletePostPopUp.bind(this, item.news_id, index)}
                                                  src={Delete} className="greyFontColor cursorPointer icon margin-top-negative-5"
                                                     width="13" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      :
                                      <div className="mt-3">
                                        <div>
                                          {/* <div className="fontBold12 text-md-left text-sm-center cursorPointer">Bhartiya Janta Party</div> */}
                                          <div className="fontSemiBold14 text-left mb-2 wordBreakAll" dangerouslySetInnerHTML={{ __html: item.news_text }}></div>
                                          {item.pollanswer.map((itemAnswer, indexAnswer) => {
                                            return (
                                              <div className="form-inline mt-2">
                                                
                                                <div className="fontSemiBold12 wordBreakAll">
                                                  {itemAnswer.poll_answer}
                                                </div>
                                                {item.poll_flag === 1 ?
                                                  <div className="resultProgressPolls mr-2">
                                                    <div class="progress">
                                                      <div class={`progress-bar`} role="progressbar" style={itemAnswer.width} aria-valuenow="70"
                                                        aria-valuemin="0" aria-valuemax="100">
                                                      </div>
                                                    </div>
                                                  </div>
                                                  : null}
                                                {item.poll_flag === 1 ?
                                                <div className={`fontRegular10`}>
                                                  {itemAnswer.vote}%
                                                </div>: null}
                                              </div>
                                            )
                                          })}

                                          <div className="form-inline mt-2">
                                            <div className="fontRegular10 mr-auto">
                                              Ends: January 21st, 8:10 PM
                                            </div>
                                            <div className="fontRegular10 textBold ml-auto">
                                              
                                                Total Voters : 127844
                                            </div>
                                          </div>
                                        </div>

                                        <div className="postCommentLike form-inline pl-2 pr-2 commentTrayBackground">
                                          <div className="form-inline">
                                            <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                              <span className="likesCount mr-1">{item.likes_count}</span>
                                              <img src={Like} className={`${classes.iconMargin} likeDislikeIcons`}    />
                                            </div>
                                            <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                              <span className="likesCount ml-2 mr-1">{item.dislikes_count}</span>
                                              <img src={Dislike} className={`${classes.iconMargin} mt-2 likeDislikeIcons`}    />
                                            </div>
                                            <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                              <span className="likesCount ml-2 mr-1">{item.comment_count}</span>
                                              <img src={Comment} onClick={this.handleOpenAdminComment.bind(this, item.news_id, item.news_text, item.comment_count, item.likes_count, item.dislikes_count, item.news_created_on)} className={classes.iconMarginComment}
                                                   height="15" width="15"
                                              />
                                            </div>
                                          </div>
                                          <div className="form-inline ml-auto">
                                            <div className="fontRegular12 greyFontColor mr-3">
                                              {item.news_created_on}
                                            </div>
                                            <div className="remove1box">
                                              <div className="greyFontColor cursorPointer remove1 m-0">
                                                <img onClick={this.handleDeletePostPopUp.bind(this, item.news_id, index)}
                                                  src={Delete} className="greyFontColor cursorPointer icon margin-top-negative-5"
                                                     width="13" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      }
                                    </div>
                                  )
                                     
                                }
                                )}

                              </div>

                              }
                              <div>
                                {this.state.recentPostLoader ? <CircularProgress className={classes.recentPostLoader}/> : null }

                              </div>
                            </div>
                          </Col>


                          <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-4">
                          {this.state.electionPartyArr.length === 0 ? <div className="fontRegular16"> No records available. </div>:
                            <div>
                            {this.state.electionPartyArr.map(function (item, index) {
                              return (
                                <div className="electionDetailContainer mr-5 p-2 text-left">
                                  <span> <span className="fontSemiBold12 greyFontColor"> Election Name :</span> <span className="contentElection greyFontColor">{item.election_name}</span>
                                    <br />

                                    <span className="fontSemiBold12 greyFontColor">Candidates :</span>  <span className="contentElection greyFontColor">{item.candidate}</span>
                                  </span>
                                </div>
                              )
                            }
                            )}
                            </div>
                          }
                          </Col>
                        </Row>
                      }
                      </div>}
                      
                      </div>
                      }

                      {this.state.value === 1 && <div className="pt-3" >
                      {this.state.publicOpinionArray === null || this.state.publicOpinionArray.length === 0 ? <div className="fontRegular16 mt-5 mb-5"> No public opinion available. </div>:
                      <div>
                      <Dialog
                            TransitionComponent={Transition}
                            open={this.state.openDelOpi}
                            onClose={this.handleCloseDelOpi}
                            PaperProps={{
                              classes: {
                                root: classes.paper
                              }
                            }}
                            {...other}
                            BackdropProps={{
                              classes: {
                                root: classes.root
                              }
                            }
                            }
                             aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Delete Opinion"}</DialogTitle>
                            {/* <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Are you sure you want to delete this party?"}</DialogTitle> */}
                            <DialogContent className={classes.dailogContent}>
                              <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                                <div className="fontSemiBold16 mt-4">
                                  Are You sure you want to delete this opinion?
                                </div>


                                <div className="mt-3 form-inline d-flex justify-content-center">
                                  <div className="mr-2 mt-3">
                                    <Button onClick={this.handleCloseDelOpi} variant="contained"
                                      className={classes.dailogButton}
                                    >
                                      CANCEL
                                    </Button>
                                  </div>
                                  <div className="mt-3">
                                    <Button onClick={this.handleDeleteOpinion} variant="contained"
                                      className={classes.dailogButton}
                                    >
                                      DELETE
                                    </Button>
                                  </div>
                                </div>
                              </DialogContentText>
                            </DialogContent>
                            {/* <DialogActions className={classes.buttonContDailog}>



                            </DialogActions> */}

                          </Dialog>
                        {this.state.publicOpinionArray.map( (item, index) => {
                          return (

                            // <Container key={index} className="commentsArrayContainer">
                            <Row className="mt-3 ml-0 mr-0 publicOpinionComment">
                                <div className="opinionImageContainer">
                                  <div className="imageUploadOpinion">
                                    <img src={item.user_img_url === null || item.user_img_url === undefined ? Publicuser : item.user_img_url}
                                         className='imageOpinion' width="55"
                                    />
                                  </div>
                                  <div className="fontBold12 greyFontColor text-capitalize user_name_truncate">{item.user_name}</div>
                                </div>
                                <div className="commentSection border-0 d-flex flex-column align-self-end">
                                  <p className="text-left fontRegular12 greyFontColor wordBreak preWrapWhiteSpace mb-2">
                                  <Emojione size={42} text={decodeURI(item.opinion_desc)} /></p>

                                  <div className="fontRegular12 lightBackgroundColor form-inline commentLikeDislikeBox">
                                    <div className="form-inline pl-4">
                                      <div className="fontRegular12 greyFontColor d-flex align-self-center">
                                        <span className="likesCount">{item.likes_count}</span>
                                        &nbsp;
                                        <img src={Like} className={`${classes.iconMargin} likeImage likeDislikeIcons`}   />
                                      </div>
                                      &nbsp; &nbsp;&nbsp;
                                      <div className="fontRegular12 greyFontColor d-flex align-self-center">
                                        <span className="likesCount">{item.dislikes_count}</span>
                                        &nbsp;
                                        <img src={Dislike} className={`${classes.iconMargin} dislikeImage mt-2 likeDislikeIcons`}   />
                                      </div>
                                    </div>

                                    <div className="ml-auto form-inline pr-4 ">
                                      <div className="greyFontColor">
                                      {item.opinion_created_on}
                                      </div>
                                      &nbsp; &nbsp;
                                      <div className="greyFontColor cursorPointer remove1">
                                        <img onClick={this.handleDeleteOpen.bind(this,item.public_opinion_id)}
                                          src={Delete} className="greyFontColor cursorPointer"    width="13"/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </Row>
                            // </Container>
                          )
                        }
                        )}
                        <div>
                          {this.state.recentPublicLoader ? <CircularProgress className={classes.recentPublicLoader}/> : null }

                        </div>
                        </div>

                      }


                      </div>}

                      {/* <-------------------General-Info-Tab--------------------> */}

                      {this.state.value === 2 && <div className="">
                        <div>
                        {global.partyData[0].party_purpose==='' ? <div className="fontRegular14"> No information available </div> :
                        <div className="greyFontColor wordBreak text-left p-3 pt-2 ql-editor fontRegular14" dangerouslySetInnerHTML={{__html: global.partyData[0].party_purpose}}>

                        </div>
                        }
                        </div>
                      </div>

                      }

                      {/* <---------Contact-Tab-----------------> */}

                      {this.state.value === 3 && <div className="text-left greyFontColor pl-5 pb-3 pr-5 pt-3">
                        <h4 className="fontSemiBold16 greyFontColor">{global.contactData.party_office_name}</h4>
                        <div className="">
                          <div className="">
                            {global.contactData.party_address === null || global.contactData.party_address === '' || global.contactData.party_address === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Office Address: {global.contactData.party_address}</div>
                            }
                            {global.contactData.party_email === null || global.contactData.party_email === '' || global.contactData.party_email === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Email: {global.contactData.party_email}</div>
                            }
                            {global.contactData.party_phone_number === null || global.contactData.party_phone_number === '' || global.contactData.party_phone_number === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Phone: {global.contactData.party_phone_number}</div>
                            }
                            {global.contactData.party_website === null || global.contactData.party_website === '' || global.contactData.party_website === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Website: {global.contactData.party_website}</div>
                            }
                          </div>
                          <div className="mt-3">
                            {global.contactData.party_facebook_url === '' ? null :
                              <a href={global.contactData.party_facebook_url} target="_blank"><SocialIcon network="facebook" style={{ height: 30, width: 30}} className="ml-1"/></a>
                            }
                            {global.contactData.party_twitter_url === '' ? null :
                              <a href={global.contactData.party_twitter_url} target="_blank"><SocialIcon network="twitter" style={{ height: 30, width: 30 }} className="ml-1"/></a>
                            }
                            {global.contactData.party_instagram_url === ''  ? null :
                              <a href={global.contactData.party_instagram_url} target="_blank"><SocialIcon network="instagram" style={{ height: 30, width: 30 }} className="ml-1"/></a>
                            }
                            {global.contactData.party_youtube_url === '' ? null :
                              <a href={global.contactData.party_youtube_url} target="_blank"><SocialIcon network="youtube" style={{ height: 30, width: 30 }} className="ml-1"/></a>
                            }
                            {global.contactData.party_google_url === '' ? null :
                              <a href={global.contactData.party_google_url} target="_blank"><SocialIcon network="google" style={{ height: 30, width: 30 }} className="ml-1"/></a>
                            }
                            {global.contactData.party_linkedin_url === '' ? null :
                              <a href={global.contactData.party_linkedin_url} target="_blank"><SocialIcon network="linkedin" style={{ height: 30, width: 30 }} className="ml-1"/></a>
                            }
                          </div>
                        </div>

                        {(global.contactData.party_facebook_url === '' || global.contactData.party_facebook_url === null || global.contactData.party_facebook_url === undefined)
                        && (global.contactData.party_twitter_url === '' || global.contactData.party_twitter_url === null || global.contactData.party_twitter_url === undefined)
                        && (global.contactData.party_instagram_url === '' || global.contactData.party_instagram_url === null || global.contactData.party_instagram_url === undefined)
                        && ( global.contactData.party_youtube_url === '' ||global.contactData.party_youtube_url === null || global.contactData.party_youtube_url === undefined)
                        &&  (global.contactData.party_google_url === '' || global.contactData.party_google_url === null || global.contactData.party_google_url === undefined)
                        && (global.contactData.party_linkedin_url === '' || global.contactData.party_linkedin_url === null || global.contactData.party_linkedin_url === undefined)
                        && (global.contactData.party_phone_number === '' || global.contactData.party_phone_number === null || global.contactData.party_phone_number === undefined)
                        && (global.contactData.party_email === '' ||  global.contactData.party_email === null || global.contactData.party_email === undefined)
                        && (global.contactData.party_office_name === '' || global.contactData.party_office_name === null || global.contactData.party_office_name === undefined)
                        && (global.contactData.party_address === '' || global.contactData.party_address === null || global.contactData.party_address === undefined)
                        && (global.contactData.party_website === '' || global.contactData.party_website === null || global.contactData.party_website === undefined)
                      ?
                      <div className="d-flex align-items-center justify-content-center fontSemiBold16">
                        No contact details available.
                      </div>
                      :
                      null
                      }

                      </div>
                      }

                    </div>
                  </div>
                </Col>

              </Row>

            </Container>
          </div>
        }
        {/* <---------------Delete confirmation popup for comment in post-----------------> */}
        <Dialog
          transition={Collapse}
          open={this.state.openDelCommentPost}
          onClose={this.deleteCommentPostPopup}
          PaperProps={{
            classes: {
              root: classes.paperOpi
            }
          }}
          {...other}
          BackdropProps={{
            classes: {
              root: classes.rootBackDrop
            }
          }
          }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Delete Opinion"}</DialogTitle>
          <DialogContent className={classes.dailogContent}>
            <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
              <div className="fontSemiBold16 mt-4">
                Are You sure you want to delete this comment?
              </div>

              <div className="mt-3 form-inline d-flex justify-content-center">
                <div className="mr-2 mt-3">
                  <Button onClick={this.deleteCommentPostPopup.bind(this, false, -1)} variant="contained" className={classes.dailogButton}>
                    CANCEL
                  </Button>
                </div>
                <div className="mt-3">
                  <Button onClick={this.handleUserDeleteComment} variant="contained" className={classes.dailogButton}>
                    DELETE
                  </Button>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>

    )
  }
}

AdminPoliticalPartyProfile = withRouter(AdminPoliticalPartyProfile)
export default withStyles(styles)(AdminPoliticalPartyProfile);
