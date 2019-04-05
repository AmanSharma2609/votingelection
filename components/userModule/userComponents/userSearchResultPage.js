/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userSearchResultPage.js
Purpose   : Global search result page
*/

import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string'
import userOne from '../../../images/SVGs/default_userimg.svg';
import partyPic from '../../../images/SVGs/default_partyimg.svg';
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';
import { items } from '../../../networkCall/service.js';
import { constants } from '../../../networkCall/constant'
import Upvoted from '../../../images/1-up-arrow.png';
import DownVoted from '../../../images/2-down-arrow.png';
import Election from '../../../images/election.png';
import Upvote from '../../../images/1-up-line-arrow.png'
import DownVote from '../../../images/2-downl-ine-arrow.png'

// inline styling for react material components
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textFieldInput1: {
    border: '1px solid grey',
    backgroundColor: '#FBFBFB',
    fontSize: 8,
    padding: '10px 12px',
    height: 30,
    lineHeight: 'normal',
    width: 'calc(60% - 10px)',
  },
  circularLoader: {
    color: '#E18F68',
    zIndex: 1,
    marginTop: '25px',
    marginBottom: '25px'
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
});

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
];

const suggestions = []

class UserSearchResultPage extends Component {
  state = {
    arrayItems: [],
    isLoading: true,
    upvote_counts: [],
    downvote_counts: [],
    searchKey: '',
    party: [],
    candidate: [],
    election: [],
    count: 0,
    loaderSpinner: false,
    stopLoadMore: false,
  }

  // Calls on component load
  componentDidMount() {
    this.state.party.length = 0;
    this.state.election.length = 0;
    this.state.candidate.length = 0;
    let values = queryString.parse(this.props.location.search)
    this.setState({ count: 0 });
    this.setState({ searchKey: values.search }, function () {
      this.globalSearch();
    })
  }

  // Loads when Params value updated on same page
  componentWillReceiveProps = (newProps) => {
    this.setState({ stopLoadMore: false });
    this.setState({isLoading: true});
    this.state.party.length = 0;
    this.state.election.length = 0;
    this.state.candidate.length = 0;
    this.setState({ count: 0 });
    let values = queryString.parse(newProps.location.search)
    this.setState({ searchKey: values.search }, function () {
      this.globalSearch();
    })
  }

  // move to candidate profile page whne click on candidate card
  handleProfileClick = (candidate_id, candidate_name) => {
    this.props.history.push({
      pathname: '/Candidate/Candidate-Profile/',
      search: `?name=${candidate_name}&&id=${candidate_id}`
    });
  }

  // Global search  to search global data of party candidate and election
  globalSearch() {
    if (this.state.count === 0) {
      this.setState({ isLoading: true });
    }
    else {
      this.setState({ loaderSpinner: true })
    }
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_key: this.state.searchKey,
      count: this.state.count
    }
    items('POST', requestedData, constants.globalSearch)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ isLoading: false });
          suggestions.length = 0;
          if (response.data.election_data.length !== 0) {
            for (let i of response.data.election_data) {
              this.setState({ election: [...this.state.election, i] });
            }
          }
          if (response.data.party_data.length !== 0) {
            for (let i of response.data.party_data) {
              this.setState({ party: [...this.state.party, i] })
            }
          }
          if (response.data.candidate_data.length !== 0) {
            for (let i of response.data.candidate_data) {
              this.setState({ candidate: [...this.state.candidate, i] })
            }
          }
          if (response.data.election_data.length === 0 && response.data.party_data.length === 0
            && response.data.candidate_data.length === 0) {
            this.setState({ stopLoadMore: true });
          }
          this.setState({ count: this.state.count + 1 });
          this.setState({ loaderSpinner: false });
        }
        else if (response.status === "Failure") {
          this.setState({ isLoading: false });
        }
        else {
          this.setState({ isLoading: false });
        }
      });
  }

  // Move to election detail page when clicking election list
  pushToElectionDetail = (election_id, election_type, election_name) => {
    this.props.history.push('/UserElectionDetail/' + election_id + '/' + election_type + '/' + election_name);
  }

  // Move to party profile clicking on a party
  handleProfileClickParty = (party_id, party_name) => {
    this.props.history.push({
      pathname: '/Political-Parties/Political-Parties-Profile/',
      search: `?name=${party_name}&&id=${party_id}`
    });
  }

  // Handle broken images for candidate images
  handleCandidateImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }

  // Handle Broken images for party images
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  // Load more functionality
  loadMore = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      if (this.state.stopLoadMore === false) {
        this.globalSearch();
      }
    }
  }

  // Render HTML Of class
  render() {
    const { classes, theme } = this.props;
    return (
      <div className="candidateCardsParent overflowY" onScroll={this.loadMore}>
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / Search Result</p>
            </Col>
          </Row>
        </Container>
        <Container fluid={true} className="w-90 AdminPoliticalPartyContainer mt-5">
          <Row className="mb-3">
            <Col xs={12} sm={12} lg={4} md={8} xl={4} className="mt-4 text-left">
              <div className="">
                <div className="fontSemiBold18 greyFontColor mr-3 pb-1 headingForSearch">
                  You searched for "{this.state.searchKey}"
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="contheight">
          {this.state.isLoading === true ? <CircularProgress className={classes.circularLoader} />
            :
            <div className="contHeight">
              <Container fluid={true} className="">
                {this.state.election.length === 0 && this.state.party.length === 0 && this.state.candidate.length === 0 ?
                  <div className="fontSemiBold16 greyFontColor text-center">
                    No Record Found.
                      </div>
                  :
                  null
                }
                <Container fluid={true} className="candidateGridContainer">
                  <Row className="rowCandidate">
                    {this.state.candidate.map((item, index) => {
                      return (
                        <Col className="candidateCards" xs={6} sm={4} lg={3} md={3} xl={2}>
                          <div className="flex_card_design border lightBackgroundColor cursorPointer" onClick={this.handleProfileClick.bind(this, item.candidate_id, item.candidate_name)}>
                            <div className="cursorPointer">
                              <div className="imageUpload">
                                <Image
                                  className="imageCandidatePartyProfile"
                                  src={item.candidate_img_url === null || item.candidate_img_url === undefined || item.candidate_img_url === '' ? userOne : item.candidate_img_url}
                                  responsive
                                  onError={this.handleCandidateImgError}
                                >
                                </Image>
                              </div>
                              <div className="badgeIcon">
                                <Image
                                  className="circlePartyIconCandidate"
                                  src={item.party_img_url === null || item.party_img_url === undefined || item.party_img_url === '' ? partyPic : item.party_img_url}
                                  responsive
                                  onError={this.handlePartyImgError}
                                >
                                </Image>
                              </div>
                            </div>
                            <span className="fontSemiBold16 greyFontColor mt-3 heading_height">{item.candidate_name}</span>
                            <span className="fontRegular12 greyFontColor mb-3 mt-1"><i><br />{item.candidate_profession}</i></span>
                            <div className="form-inline alignBottom mt-2 fontRegular12">
                              {item.upvote_count}
                              <img src={item.upvote_count === 0 || item.upvote_count === '0' ? Upvote : Upvoted} className={classes.iconMargin}
                                width="25"
                              />
                              <img src={item.downvote_count === 0 || item.downvote_count === '0' ? DownVote : DownVoted} className={classes.iconMargin}
                                width="25"
                              />
                              {item.downvote_count}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    )}
                    {this.state.party.map((item, index) => {
                      return (
                        <Col className="candidateCards" xs={6} sm={4} lg={3} md={3} xl={2}>
                          <div className="flex_card_design lightBackgroundColor border cursorPointer" onClick={this.handleProfileClickParty.bind(this, item.party_id, item.party_name)}>
                            <div className="imageUpload" >
                              <Image
                                className="imageCandidatePartyProfile"
                                src={item.party_img_url === null || item.party_img_url === undefined || item.party_img_url === '' ? partyPic : item.party_img_url}
                                responsive
                              >
                              </Image>
                            </div>
                            <h5 className="fontSemiBold16 greyFontColor mt-3 heading_height">{item.party_name}</h5>
                            <p className="fontRegular12 greyFontColor mb-5 mt-1"><i>{item.party_chairperson} - {item.party_year_of_establishment === '0000-00-00' ? null : item.party_year_of_establishment} <br /> {item.party_registered_state} | {item.party_type} </i></p>
                            <div className="form-inline alignBottom mt-2 fontRegular12">
                              {item.upvote_count}
                              <img src={item.upvote_count === 0 || item.upvote_count === '0' ? Upvote : Upvoted} className={classes.iconMargin}
                                width="25"
                              />
                              <img src={item.downvote_count === 0 || item.downvote_count === '0' ? DownVote : DownVoted} className={classes.iconMargin}
                                width="25"
                              />
                              {item.downvote_count}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    )}
                    {this.state.election.map((item, index) => {
                      return (
                        <Col className="candidateCards" xs={6} sm={4} lg={3} md={3} xl={2}>
                          <div className="flex_card_design lightBackgroundColor border cursorPointer" onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>
                            <div className="imageUpload">
                              <Image
                                className="imageCandidatePartyProfile"
                                src={Election}
                                responsive
                              >
                              </Image>
                            </div>
                            <h5 className="fontSemiBold16 greyFontColor mt-3 heading_height">{item.election_name}</h5>
                            <p className="fontRegular12 greyFontColor mb-5 mt-1"><i>{item.current_status}<br /> {item.election_start_date === '0000-00-00' ? null : item.election_start_date} - {item.election_end_date === '0000-00-00' ? null : item.election_end_date}</i></p>
                            <div className="form-inline alignBottom mt-2 fontRegular12">
                            </div>
                          </div>

                        </Col>
                      );
                    }
                    )}
                  </Row>
                </Container>
              </Container>
              {this.state.loaderSpinner ?
                <CircularProgress
                  size={30}
                  thickness={4.6}
                  className={classes.circularLoader} />
                : null
              }
            </div>
          }
        </div>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
export default withStyles(styles)(UserSearchResultPage);
