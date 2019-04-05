import React, { Component } from 'react';
import { Image, Media } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';
import produce from "immer"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Dislike from '../../../images/SVGs/dislike_unfill.svg'
import Liked from '../../../images/SVGs/like_fill.svg';
import Disliked from '../../../images/SVGs/dislike_fill.svg';
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import partyPic from '../../../images/SVGs/default_partyimg.svg'
import Like from '../../../images/SVGs/like_unfill.svg';
import Comment from '../../../images/SVGs/comment.svg'
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js';
import { items } from '../../../networkCall/service.js';
import { constants } from '../../../networkCall/constant';
import Upvoted from '../../../images/1-up-arrow.png'
import DownVoted from '../../../images/2-down-arrow.png'
import Delete from '../../../images/SVGs/delete.svg'
import UserIcon from '../../../images/SVGs/default_userimg.svg'
import { withRouter } from 'react-router-dom';
import constituencyImg  from '../../../images/SVGs/constituency_icon.svg'
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';

let id = 0;
function createData(Self, Spouse, Dependent1, Dependent2, Dependent3) {
  id += 1;
  return { id, Self, Spouse, Dependent1, Dependent2, Dependent3 };
}

const rows = [
  createData('1,15,123', '1,24,432', '16,324,123', '-', '-'),

];
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const optionsOne = {
  maintainAspectRatio: false,
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
        var total = meta.total;
        var currentValue = dataset.data[tooltipItem.index];
        var percentage = parseFloat((currentValue / total * 100).toFixed(1));
        return currentValue + ' (' + percentage + '%)';
      },
      title: function (tooltipItem, data) {
        return data.labels[tooltipItem[0].index];
      }
    }
  },
  title: {
    display: true,
    fontFamily: 'montserratregular',
    text: 'Assets & Liabilities',
    position: 'bottom'
  },
  responsive: true,
  legend: {
    position: 'hidden',
    labels: {
      boxWidth: 0
    }
  }
}

const optionsTwo = {
  maintainAspectRatio: false,
  responsive: true,
  title: {
    display: true,
    fontFamily: 'montserratregular',
    text: 'Winning Ratio',
    position: 'bottom'
  },
  legend: {
    position: 'hidden',
    labels: {
      boxWidth: 0,
      marginTop: 20,
    }
  }
}
const optionsThree = {
  maintainAspectRatio: false,
  responsive: true,
  tooltip: '0',
  rotation: -1 * Math.PI,
  circumference: 1 * Math.PI,
  title: {
    display: true,
    fontFamily: 'montserratregular',
    text: 'Criminal Cases',
    position: 'bottom'
  },
  legend: {
    position: 'hidden',
    labels: {
      boxWidth: 0,
    }
  }
}

function TabContainer({ children, dir }) {
  return (
    0
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },

];
// const dataTwo = [
//   { key: 'A' },  { key: 'B' },// { key: 'C' }, { key: 'D' },
// ]
const dataBanking = [
  { key: 'A' }, { key: 'B' },
]
const bondArray = [
  { key: 'A' },
]
const theme = createMuiTheme({
  palette: {
    primary: { main: '#E18F68' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});


const styles = theme => ({
  buttonUserCandidate: {
    width: '96%',
    backgroundColor: '#E18F68',
    color: 'white',
    fontFamily: 'montserratregular',
    borderRadius: 0,
    marginTop: '25px',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  postButton: {
    position: 'absolute',
    top: -23,
    right: 18,
    width: '15%',
  },
  profileBoxText: {
    fontSize: 10,
    fontFamily: 'montserratregular',
  },
  profileTextTwo: {
    fontSize: 10,
    fontFamily: 'montserratregular',
    marginLeft: 25,
  },
  profileBold: {
    fontSize: 10,
    fontFamily: 'montserratbold',
    marginLeft: 25,
  },
  textStyle: {
    fontSize: 10,
    fontFamily: 'montserratregular',
  },
  arrowUp: {
    fontSize: 45,

    color: 'green'
  },
  arrowDown: {
    fontSize: 45,

    marginBottom: 5,
    color: '#FDD717'
  },
  iconMargin: {
    marginTop: 'auto',
    marginBottom: 'auto',
    cursor: 'pointer',
  },
  disabledIconMargin: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  appBarStyle: {
    backgroundColor: '#FEF8DF',
    boxShadow: 'none',
  },
  appBarStyleNest: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },

  indicator: {
    backgroundColor: '#E18F68',
  },


  tabLabelStyle: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: 13,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },

  active_tab: {
    textTransform: 'capitalize',
    border: 0,
    fontSize: 13,
    color: 'white',
    backgroundColor: '#E18F68',
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
    // display: 'flex',
    // justifyContent:'flex-end',
    // alignItems:'flex-end',
    borderTop: '1px solid grey',
    borderLeft: '1px solid grey',
    borderRight: '1px solid grey',

    fontSize: 16,
    width: '100% ',
    minHeight: '100%'
  },

  iconMarginImg: {
    color: 'white',
    zIndex: 1,
    marginLeft: 14,
    position: 'absolute',
    marginTop: 35
  },

  circularLoader: {
    color: '#E18F68',
  },

  buttonComment: {
    width: '30%',
    backgroundColor: '#E18F68',
    borderRadius: 0,
    marginBottom: 0,
    fontSize: 12,
    color: 'white',
    fontFamily: 'montserratregular',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  iconButton: {
    padding: 10,
  },

  commetTextArea: {
    wordWrap: 'break',
    maxWidth: '60vh',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',

  },
  paper: {

  },

  rootBackDrop: {
    // height: '100vh',
    // width: '100vh',
    backgroundColor: 'rgba(127, 127, 127, 0.2)',
  },
  paperOpi: {
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
    '&:hover': {
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dailogButton: {
    backgroundColor: '#E18F68',
    color: 'white',
    fontFamily: 'montserratregular',
    fontSize: 14,
    boxShadow: 'none',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  dailogContentStyle: {
    color: '#555555',
    fontFamily: 'montserratregular',
    fontSize: 16,
  },
  dailogContentStyle: {
    color: '#555555',
    fontFamily: 'montserratregular',
    fontSize: 16,
  },
  arrowPopper: arrowGenerator(theme.palette.common.black),

  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  bootstrapPopper: arrowGenerator(theme.palette.common.black),
  bootstrapTooltip: {
    backgroundColor: theme.palette.common.black,
    fontFamily: 'montserratregular',
  },


})
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

const userType = () => {
  const userType = localStorage.getItem('userType')
  return userType
}
const userCheck = () => {
  const userCheckType = localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')
  return userCheckType
}

const shortid = require('shortid');


class PollResults extends Component {

  state = {
    value: 0,
    valueAssets: 0,
    status: '',
    valueCriminal: 0,
    newsArray: [],
    secondArray: ['', ''],
    activeIndex: 0,
    publicOpinionArray: [],
    educationArray: [],
    PolliticalArray: [],
    bankingArray: dataBanking,
    bondArray: bondArray,
    contactArray: [],
    user_name: '',
    userCommentArray: [],
    commentNewsError: false,
    openComment: false,
    dailogPostArray: '',
    userCommentAdd: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      comment_desc: '',
      comment_on_id: '',
    },
    userCommentRead: {
      votingElection_code: constants.votingElectionCode,
      news_id: ''
    },
    userComment: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      opinion_desc: '',
      opinion_type: 'candidate',
      opinion_on_id: ''
    },
    userCommDelete: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      comment_id: ''

    },
    loading: false,
    statusParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      vote_type: 'political_party ',
      vote_on_id: '',
    },
    userVoteApi: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      vote_type: 'political_party',
      vote_on_id: '',
      status: ''
    },
    party_name: '',
    partyRegisteredState: '',
    partyType: '',
    partyChairPerson: '',
    partyYearOfEstablishment: '',
    upvoteCounts: '',
    downvoteCounts: '',
    cannotSayCounts: '',
    party_purpose: '',
    per_upvote: '',
    per_downvote: '',
    per_cantsay: '',
    commentError: false,
    vertical: 'top',
    horizontal: 'center',
    hello: "Comment cannot be empty",
    userPublicOpinion: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      opinion_desc: '',
      opinion_type: 'political_party',
      opinion_on_id: ''
    },
    returnOpinionStatus: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      opinion_id: ''
    },
    userActivityLike: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      news_id: '',
      news_status: ''
    },
    userOpinionLike: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      opinion_id: '',
      opinion_status: ''
    },
    commentLikeCount: '',
    commentDislikeCount: '',
    commentCount: '',
    openDelOpi: false,
    openDelCommentPost: false,
    userDeleteOpi: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      opinion_id: ''
    },
    followStatus: null,
    partyImage: null,
    party_id: '',
    party_name: '',
    followButton: false,
    electionPartyArr: [],
    topCandidates: [],
    topParties: [],
    userData: {},
    newsCount : 0,
    postIndex : '',
    pollCount : 0
  }

  follow = (value) => {
    this.setState({ followButton: true });
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId'),
      follow_type: 'political_party',
      follow_id: this.state.party_id,
      status: value
    }


    items('POST', requestedData, constants.followUnfollow)
      .then(response => {

        if (response.status === "Success") {
          if (this.state.followStatus === null || this.state.followStatus === 0) {
            this.setState({ followStatus: 1 });
          }
          else {
            this.setState({ followStatus: 0 });
          }
          this.setState({ followButton: false });

        }
        else if (response.status === "Failure") {
          this.setState({ followButton: false });
        }
        else {
          this.setState({ followButton: false });
        }
      });
  }
  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };
  componentDidUpdate() {
    userCheck()
    userType()
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleAddNewsComment();
    }
  }

  deleteCommentPostPopup = (openPopup, comment_id) => {
    this.setState({ openDelCommentPost: openPopup });
    this.setState({ userCommDelete: { ...this.state.userCommDelete, comment_id: comment_id } });
  }

  getTopParties = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode
    }

    items('POST', requestedData, constants.topParties)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ isLoading: false });
          if (response.data.length != 0) {
            this.setState({ topParties: response.data })
          }
        }
        else if (response.status === "Failure") {
          this.setState({ topParties: [] })
        }
        else {

        }

      })
  }

  getTopCandidates = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode
    }

    items('POST', requestedData, constants.topCandidates)
      .then(response => {
        console.log(response)
        if (response.status === "Success") {
          this.setState({ isLoading: false });
          if (response.data.length != 0) {
            this.setState({ topCandidates: response.data })
          }
        }
        else if (response.status === "Failure") {
          this.setState({ topCandidates: [] })
        }
        else {

        }

      })
  }

  userProfile(){
    let requestedData = {
      votingElection_code : constants.votingElectionCode,
      token_id : localStorage.getItem('accessToken'),
      user_id : localStorage.getItem('userId')
    }

    items('POST', requestedData, constants.userProfileView)
        .then(response => {
         
          if (response.status === "Success") {
            if(response.data.length != 0 || response.data != null)
            {
              this.setState({userData: response.data[0]})
            }
          }
          else if (response.status === "Failure") {
           
          }
          else {
            
          }
        });
  }

  componentDidMount() {
    userType();

    this.setState({ url: this.props.location.pathname }, function () {

      this.setState({ url: shortid.generate(`https://devvec.apnaneta.com/#${this.props.location.pathname}`) }, function () {
      })
    })

    this.setState({ url1: this.props.location.pathname }, function () {
      this.setState({ url1: encodeURI(this.props.location.pathname)}, function () {
      })
      })

    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    if (localStorage.getItem('facebookUserName')) {


      this.setState({ user_name: localStorage.getItem('facebookUserName') });
    }

    this.userProfile();

    

    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommDelete: { ...this.state.userCommDelete, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommentAdd: { ...this.state.userCommentAdd, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userActivityLike: { ...this.state.userActivityLike, token_id: accessToken, user_id: userId } })
    }

    // this.partyGeneralInfo();
    // this.newsUserHome();

    this.getTopCandidates();
    this.getTopParties();
    this.viewPollApi();
  }

  componentWillReceiveProps = (newProps) => {
    userType();
    this.setState({newsArray : []});
    this.setState({newsCount : 0});

    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    if (localStorage.getItem('facebookUserName')) {
      this.setState({ user_name: localStorage.getItem('facebookUserName') });
    }

    if (localStorage.getItem(btoa('userdetail'))) {
      let temp = localStorage.getItem(btoa('userdetail'));
      let value = atob(temp);
      let data = JSON.parse(value);

      this.setState({ userData: data[0] });
    }

    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommDelete: { ...this.state.userCommDelete, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommentAdd: { ...this.state.userCommentAdd, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userActivityLike: { ...this.state.userActivityLike, token_id: accessToken, user_id: userId } })
    }

    // this.partyGeneralInfo();
    // this.newsUserHome();

    this.getTopCandidates();
    this.getTopParties();
    this.viewPollApi();
  }

  scrollToBottom = () => {
    if(this.state.userCommentArray.length !== 0)
    {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  newsUserHome = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId'),
      filter_value: 'followed',
      count : this.state.newsCount
    }

    items('POST', requestedData, constants.userHomePosts)
      .then(response => {
        console.log(response)
        if (response.status === "Success") {
          this.setState({ isLoading: false });
          // this.setState({ newsArray: response.data })
          for (let i of response.data) {
            this.state.newsArray.push(i);
          }
          this.setState({ newsArray: this.state.newsArray });
          this.setState({newsCount : this.state.newsCount+1});
        }
        else if (response.status === "Failure") {
          this.setState({ isLoading: false });
          this.setState({ newsArray: [] });
        }
        else {
          this.setState({ isLoading: false });
          this.setState({ newsArray: [] });
        }
      })
  }

  publicOpinion = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      party_id: this.state.party_id,
      count: 0,
      user_id: localStorage.getItem('userId')
    }
    items('POST', requestedData, constants.partyPublicOpinion)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ isLoading: false });
          this.setState({ publicOpinionArray: response.data });
          // global.user_name = response.data[0].user_name
        }
        else if (response.status === "Failure") {
          this.setState({ isLoading: false });
        }
        else {
          this.setState({ isLoading: false });
        }

      })
  }


  partyContact = () => {

    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      party_id: this.state.party_id,
    }

    items('POST', requestedData, constants.partyContactDetail)
      .then(response => {

        if (response.status === "Success") {
          this.setState({ isLoading: false });
          this.setState({ contactArray: response.data });
          this.setState({ loading: false });
        }
        else if (response.status === "Failure") {
          this.setState({ isLoading: false });
        }
        else {
          this.setState({ isLoading: false });
        }

      });
  }

  // partyGeneralInfo() {
  //   this.setState({ loading: true });
  //   let requestedData = {
  //     votingElection_code: constants.votingElectionCode,
  //     party_id: this.state.party_id,
  //   }

  //   items('POST', requestedData, constants.partyGeneralInfo)
  //     .then(response => {
  //       if (response.status === "Success") {
  //         this.setState({ party_name: response.data[0].party_name });
  //         this.setState({ partyRegisteredState: response.data[0].party_registered_state });
  //         this.setState({ partyType: response.data[0].party_type });
  //         this.setState({ partyChairPerson: response.data[0].party_chairperson });
  //         this.setState({ partyYearOfEstablishment: response.data[0].party_year_of_establishment });
  //         this.setState({ downvoteCounts: response.data[0].downvote_count });
  //         this.setState({ upvoteCounts: response.data[0].upvote_count });
  //         this.setState({ cannotSayCounts: response.data[0].cannot_say_count });
  //         this.setState({ party_purpose: response.data[0].party_purpose });
  //         this.setState({ partyImage: response.data[0].party_img_url })

  //         let total = response.data[0].downvote_counts + response.data[0].upvote_counts + response.data[0].cannot_say_counts;

  //         this.setState({ per_upvote: (response.data[0].upvote_counts / total) * 100 });
  //         this.setState({ per_downvote: (response.data[0].downvote_counts / total) * 100 });
  //         this.setState({ per_cantsay: (response.data[0].cannot_say_counts / total) * 100 });

  //       }
  //       else if (response.status === "Failure") {
  //         this.setState({ loading: false });
  //       }
  //       else {
  //         this.setState({ loading: false });
  //       }
  //     });

  // }

  handleAssetsChange = (event, valueAssets) => {
    this.setState({ valueAssets: valueAssets });
  }

  handleCriminalChange = (event, valueCriminal) => {
    this.setState({ valueCriminal: valueCriminal })
  }

  handleChange = (event, value, index) => {
    this.setState({ value: value });

  };

  handlePartyOpinion = (e) => {
    this.setState({ userPublicOpinion: { ...this.state.userPublicOpinion, opinion_desc: e.target.value } })
  }

  handleAddPublicOpinion = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (this.state.userPublicOpinion.opinion_desc.trim() !== "" || null) {
        items('POST', this.state.userPublicOpinion, constants.userComment)
          .then(response => {
            if (response.status === "Success") {

              this.publicOpinion();
              this.setState({ userPublicOpinion: { ...this.state.userPublicOpinion, opinion_desc: "" } })
            }
          })
      }
      else {
        this.setState({ commentError: true })
        setTimeout(() => {
          this.setState({ commentError: false })
        }, 4000)
      }
    }
    else {

      alert('Please log in to perform action')
    }
  }

  statusSubmitCall = () => {
    items('POST', this.state.userVoteApi, constants.userVote)
      .then(response => {

        if (response.status === "Success") {

        }
        if (response.status === "Failure") {

        }
      })
  }

  handleDislike = (index, status, news_id) => {

    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 1) {
        this.setState(produce((draft) => {
          draft.newsArray[index].dislikes_count += 1
        }), function () {
          this.setState({ userActivityLike: { ...this.state.userActivityLike, news_status: 0, news_id: news_id } }, function () {
            this.userActivityLikeApi()
          })

          if (status === 1) {
            this.setState(produce((draft) => {
              draft.newsArray[index].likes_count -= 1
            }), function () {

            })
          }
          this.setState(produce((draft) => {
            draft.newsArray[index].status = 0
          }), function () {
            // this.setState({ userActivityLike:{...this.state.userActivityLike, status: 1} })

          })
        })

      }

      if (status === 0) {
        this.setState(produce((draft) => {
          draft.newsArray[index].dislikes_count += 1
        }), function () {
          this.setState({ userActivityLike: { ...this.state.userActivityLike, news_status: 0, news_id: news_id } }, function () {
            this.userActivityLikeApi()
          });

        });
        this.setState(produce((draft) => {
          draft.newsArray[index].status = null
        }), function () {
        })
      }
    }
  }

  pushToprofile = (type, id, name) => {
    if(type === 'candidate')
    {
      this.props.history.push({
        pathname: '/Candidate/All/Candidate-Profile/' + name + '/' + id
      });
    }
    else
    {
      this.props.history.push({
        pathname: '/Political-Parties/All/Political-Parties-Profile/' + name + '/' + id 
      })
    }
  }

  handleLike = (index, status, news_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 0 || status === undefined) {
        this.setState(produce((draft) => {
          draft.newsArray[index].likes_count += 1
        }), function () {
          this.setState({ userActivityLike: { ...this.state.userActivityLike, news_status: 1, news_id: news_id } }, function () {
            this.userActivityLikeApi()
          })

          if (status === 0) {
            this.setState(produce((draft) => {
              draft.newsArray[index].dislikes_count -= 1
            }), function () {

            })
          }
          this.setState(produce((draft) => {
            draft.newsArray[index].status = 1
          }), function () {
          })
        })

      }

      if (status === 1) {
        this.setState(produce((draft) => {
          draft.newsArray[index].likes_count -= 1
        }), function () {
          this.setState({ userActivityLike: { ...this.state.userActivityLike, news_status: 1, news_id: news_id } }, function () {
            this.userActivityLikeApi()
          });
        });
        this.setState(produce((draft) => {
          draft.newsArray[index].status = null
        }), function () {
        })
      }
    }
  }

  userActivityLikeApi = () => {
    items("POST", this.state.userActivityLike, constants.activityLike)
      .then(response => {

      })
  }

  handleCloseComment = () => {
    this.setState({ openComment: false })
  }

  handleOpenCommentBox = (news_id, news_text, comment_count, likes_count, dislikes_count, news_created_on, index) => {
    this.setState({ newCreatedOn: news_created_on })
    this.setState({ commentCount: comment_count })
    this.setState({ commentLikeCount: likes_count })
    this.setState({ commentDislikeCount: dislikes_count })
    this.setState({ dailogPostArray: news_text })
    this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_on_id: news_id } })
    this.setState({ userCommentRead: { ...this.state.userCommentRead, news_id: news_id } })
    this.setState({postIndex : index})
    this.setState({ userCommentRead: { ...this.state.userCommentRead, news_id: news_id } }, function () {
      items("POST", this.state.userCommentRead, constants.userCommentView)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ userCommentArray: response.data },()=>{
            })
            this.setState({ openComment: true });
            this.scrollToBottom();
          }
        })
    })

  }

  handleCloseComment = () => {
    this.setState({ openComment: false })
  }

  handleUserComment = (e) => {
    if (e.target.value !== null) {
      this.setState({ commentNewsError: false })
    }
    this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_desc: e.target.value } })
  }

  handleAddNewsComment = () => {
    if (this.state.userCommentAdd.comment_desc === "" || this.state.userCommentAdd.comment_desc.trim() === "") {
      this.setState({ commentNewsError: true })
      setTimeout(() => {
        this.setState({ commentNewsError: false })
      }, 3000)
    }
    setTimeout(() => {
      if (this.state.commentNewsError === false) {


        items("POST", this.state.userCommentAdd, constants.userCommentAdd)
          .then(response => {

            if (response.status === "Success") {
              items("POST", this.state.userCommentRead, constants.userCommentView)
                .then(response => {

                  if (response.status === "Success") {
                    console.log(response);
                    this.setState({ userCommentArray: response.data },()=>{
                      console.log(this.state.userCommentArray);
                    })
                    this.newsUserHome();

                    this.setState({ commentCount: this.state.commentCount + 1 });
                    this.state.newsArray[this.state.postIndex].comment_count = this.state.newsArray[this.state.postIndex].comment_count + 1
                    this.setState({newsArray : this.state.newsArray});
                    this.scrollToBottom();
                  }
                })

              this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_desc: "" } })
            }
          })
      }
      else {

      }
    }, 10)

  }
  handleCallCommentArray = () => {
    items("POST", this.state.userCommentRead, constants.userCommentView)
      .then(response => {

        if (response.status === "Success") {

        }
      })
  }

  handleUserDeleteComment = () => {
    items("POST", this.state.userCommDelete, constants.userDeleteComment)
      .then(response => {

        if (response.status === "Success") {
          items("POST", this.state.userCommentRead, constants.userCommentView)
            .then(response => {

              if (response.status === "Success") {
                this.setState({ userCommentArray: response.data })
                this.newsUserHome();
                this.setState({ commentCount: this.state.commentCount - 1 });
                this.state.newsArray[this.state.postIndex].comment_count = this.state.newsArray[this.state.postIndex].comment_count - 1
                    this.setState({newsArray : this.state.newsArray});
              }
              else {

              }
            })
        }
      })

    this.setState({ openDelCommentPost: false })
  }

  handleDeleteOpen = (public_opinion_id) => {
    this.setState({ userDeleteOpi: { ...this.state.userDeleteOpi, opinion_id: public_opinion_id } }, function () {
    })
    this.setState({ openDelOpi: true })
  }

  handleCloseDelOpi = () => {
    this.setState({ openDelOpi: false })
  }

  handleDeleteOpinion = () => {

    items("POST", this.state.userDeleteOpi, constants.userDeleteOpinion)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ openDelOpi: false })
          this.publicOpinion();
        }
      });
  }

  handleRecentPostScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if(bottom) {
      this.newsUserHome();
    }
  }

  viewPollApi()
  {
    let requestedData = {
      votingElection_code : constants.votingElectionCode,
      count : this.state.pollCount
    }

    items("POST", requestedData, constants.viewPoll)
      .then(response => {
        console.log(response)
        if (response.status === "Success") {
          if(!(response.data===null || response.data.length===0 ))
          {
            for(let i of response.data)
            {
              if(i.pollanswer!=null)
              {
                this.setState({newsArray : [...this.state.newsArray, i]})
              }
            }
          }
        }
        else if(response.status === 'Failure')
        {

        }
        else
        {

        }
      });
  }

  render() {
    const { classes, theme, ...other } = this.props;
    const { vertical, horizontal } = this.state;
    return (

      <div className="AppUserLogin userElection userDashboard" onScroll={this.handleRecentPostScroll}>

        <UserSearchAppBar />

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to=''>Home</NavLink> / Poll Timeline (Parties)</p>
            </Col>
          </Row>
        </Container>

        {this.state.loading === true ? <div className="circularLoading marginTop80 mt-5"><CircularProgress className={classes.circularLoader} /></div> :
          <div className="partyProfileSection userDashboardSection ml-auto mr-auto mt-5" >
            <Container fluid={true} className="marginTop80">
              <Row className="row_height_dashboard userDashboardContainer ml-auto mr-auto">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                  <div className="">

                    <div className="rounded pl-2 pr-1 pt-3 pb-3 lightBackgroundColor userDashboardProfileContainer">
                      <div className="circleImageCandidateProfile">
                        <div className="imageUpload d-flex justify-content-center userProfileCircle">
                          <Image
                            className="imageCandidatePartyProfile"
                            src={this.state.userData.user_img_url === null ||  this.state.userData.user_img_url === '' || this.state.userData.user_img_url === undefined ? UserIcon : this.state.userData.user_img_url}
                            responsive
                          >
                          </Image>
                        </div>
                      </div>
                      <div className="w-100 text-center d-flex align-items-center">
                        <div className='dashboardCardContent'>
                          <h5 className="greyFontColor fontWeight700 nameHeadingTimeline">{this.state.userData.user_name}</h5>
                          <small>
                            <div className="mb-1 wordBreakAll">
                              {this.state.userData.user_email === null || this.state.userData.user_email === '' || this.state.userData.user_email === undefined ? null : this.state.userData.user_email}
                            </div>
                            {/* <br /> */}
                            <div className="mb-1">
                              {this.state.userData.user_phone_number === null || this.state.userData.user_phone_number === '' || this.state.userData.user_phone_number === undefined ? null : this.state.userData.user_phone_number}
                            </div>
                            {/* <br /> */}
                            <div>
                              {this.state.userData.constituency === null || this.state.userData.constituency === '' || this.state.userData.constituency === undefined ? null : this.state.userData.constituency}
                            </div>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contentContainerDashboard mb-3 rounded" >
                    {this.state.value === 0 && <div className="" >
                      <Container fluid={true}>
                        <Row>
                          <Col xs={12} sm={12} lg={12} md={12} xl={12}>
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
                                    root: classes.paper,
                                    paper: classes.paper
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
                                          <span><img src={Like} alt={Like} width="15" /></span>
                                        </div>
                                        <div className="mr-1 ml-1 d-flex align-items-center">
                                          <span className="mr-2">{this.state.commentDislikeCount}</span>
                                          <span><img src={Dislike} alt={Dislike} width="15" /> </span>
                                        </div>
                                        <div className="mr-1 ml-1 d-flex align-items-center">
                                          <span className="mr-2">{this.state.commentCount} </span>
                                          <span><img src={Comment} alt={Comment} width="15" /> </span>
                                        </div>
                                      </Col>
                                      <Col xs={5} className="text-right pr-2">
                                        {this.state.newCreatedOn}
                                      </Col>
                                    </Row>
                                  </div>
                                  <hr className="mt-0 mb-0" />
                                </DialogTitle>
                                <DialogContent className={classes.paper}>
                                  <DialogContentText id="alert-dialog-slide-description">
                                    <div className="commetTextArea">
                                      {this.state.userCommentArray.length === 0 ? <p className="fontMedium16">No Comments here</p> :
                                        <div className="commetTextArea">
                                          {this.state.userCommentArray.map((item, index) => {
                                            return (
                                              <div className="card p-2 cardRadius mb-1">
                                                <span className="mb-1 greyFontColor fontSemiBold12">{item.comment_desc}</span>
                                                <Row className="ml-0 mr-0 fontSemiBold12 pl-0 pr-0">
                                                  <Col xs={7} className="d-flex align-items-center ml-0 mr-0 pl-0 pr-0">
                                                    <div className="pl-0 pr-0">By <span className="text-capitalize">{item.user_name}</span></div>
                                                    {item.user_name === this.state.userData.user_name ? <div className="col-4 cursorPointer"
                                                      onClick={this.deleteCommentPostPopup.bind(this, true, item.comment_id)}
                                                    ><img src={Delete} className="greyFontColor cursorPointer icon"
                                                         width="13"/>
                                                    </div> : null}
                                                  </Col>
                                                  <Col xs={5} className="text-right">
                                                    <span className="">{item.comment_created_on}</span>
                                                  </Col>
                                                </Row>
                                              </div>
                                            )
                                          }
                                          )}
                                          <div style={{ float:"left", clear: "both" }}
                                              ref={(el) => { this.messagesEnd = el; }}>
                                          </div>
                                        </div>
                                      }
                                    </div>
                                    <Row className="mt-2">
                                      <Col xs={12}>
                                        <input type="text"
                                          onChange={this.handleUserComment}
                                          onKeyPress={this.onEnter}
                                          value={this.state.userCommentAdd.comment_desc}
                                          placeholder="comment something..."
                                          className="commentBoxInput fontRegular14 w-100 p-2 paddingRight-10"
                                        />
                                        <Button
                                          bssize="large"
                                          color="inherit"
                                          onClick={this.handleAddNewsComment}
                                          className={`${classes.buttonUserCandidate} ${classes.postButton}`}
                                        >POST</Button>
                                      </Col>
                                    </Row>
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </Col>
                        </Row>
                      </Container>


                      <Row className="">
                        <Col xs={12} sm={12} md={12} lg={7} xl={7} className="order-lg-1 order-md-2 order-sm-2 order-xs-2 mt-lg-0 mt-md-3  mt-sm-3  mt-xs-3">
                          <div className="p-3 border-0">
                            {this.state.newsArray.length === 0 ? <div className="fontRegular16"> No news available. </div> :
                              <div>
                                {this.state.newsArray.map((item, index) => {
                                  return (
                                    <div className="mt-3 row">
                                      <Col xs={12} sm={12} md={1} lg={1} xl={1} className="text-center">
                                        <Image className="rounded-circle mt-1 cursorPointer"
                                          src={item.image === null || item.image === undefined || item.image === '' ? 
                                          [
                                            (item.follow_type === 'candidate' ? UserIcon : [
                                              (
                                                item.follow_type === 'lok_sabha' || item.follow_type === 'vidhan_sabha' ? constituencyImg : partyPic
                                              )
                                            ]),
                                          ]
                                           : item.image}
                                          height='40' width='40' responsive onClick={this.pushToprofile.bind(this, item.follow_type, item.follow_type_id, item.name)}>
                                        </Image>
                                      </Col>
                                      <Col xs={12} sm={12} md={11} lg={11} xl={11} className="">
                                        <div className="ml-2">
                                          <div>
                                            <div className="fontBold12 text-md-left text-sm-center cursorPointer" onClick="{this.pushToprofile.bind(this, item.follow_type, item.follow_type_id, item.name)}">Bhartiya Janta Party</div>
                                            <div className="fontSemiBold14 text-left mb-2 wordBreakAll"   dangerouslySetInnerHTML={{ __html: item.news_text }}></div>
                                            {item.pollanswer.map((itemAnswer, indexAnswer) => {
                                            return (
                                              <div className="form-inline">
                                                <div class="radio mr-2">
                                                  <input type="radio" name="optradio" label="Something very important"/>
                                                </div>
                                                <div className="fontSemiBold12 wordBreakAll">
                                                  somethnf
                                                </div>
                                                <div className="resultProgressPolls mr-2">
                                                  <div class="progress">
                                                    <div class="progress-bar w-50" role="progressbar" aria-valuenow="70"
                                                      aria-valuemin="0" aria-valuemax="100">
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="fontRegular10">
                                                  50%
                                                </div>
                                              </div>
                                              )})}

                                              <div className="form-inline mt-2">
                                                <div className="fontRegular10 mr-auto">
                                                  Ends: January 21st, 8:10 PM
                                                </div>
                                                <div className="fontRegular10 textBold ml-auto">
                                                  Total Voters : 127844
                                                </div>
                                              </div>
                                          </div>
                                          <div className="postCommentLike form-inline pl-2 pr-2 commentTrayBackground mt-2">
                                            <div className="form-inline">
                                              <p className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                                <span className="likesCount mr-2">{item.likes_count}</span>
                                                <Tooltip
                                                  placement="top"
                                                  TransitionComponent={Zoom}
                                                  title={
                                                    <React.Fragment>
                                                      <div className="fontRegular14">{item.status === 1 ? 'Liked' : 'Like post'}</div>

                                                      <span className={classes.arrow} ref={this.handleArrowRef} />
                                                    </React.Fragment>
                                                  }
                                                  classes={{
                                                    popper: classes.arrowPopper,
                                                    tooltip: classes.bootstrapTooltip,
                                                  }}

                                                  PopperProps={{
                                                    popperOptions: {
                                                      modifiers: {
                                                        arrow: {
                                                          enabled: Boolean(this.state.arrowRef),
                                                          element: this.state.arrowRef,
                                                        },
                                                      },
                                                    },
                                                  }}
                                                >
                                                  <img onClick={this.handleLike.bind(this, index, item.status, item.news_id)} src={item.status === 1 ? Liked : Like}
                                                    className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}    height="15" width="15"
                                                  />
                                                </Tooltip>
                                              </p>
                                              <p className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                                <span className="likesCount ml-2 mr-2">{item.dislikes_count}</span>
                                                <Tooltip
                                                  placement="top"
                                                  TransitionComponent={Zoom}
                                                  title={
                                                    <React.Fragment>
                                                      <div className="fontRegular14">{item.status === 0 ? 'Disliked' : 'Dislike post'}</div>

                                                      <span className={classes.arrow} ref={this.handleArrowRef} />
                                                    </React.Fragment>
                                                  }
                                                  classes={{
                                                    popper: classes.arrowPopper,
                                                    tooltip: classes.bootstrapTooltip,
                                                  }}

                                                  PopperProps={{
                                                    popperOptions: {
                                                      modifiers: {
                                                        arrow: {
                                                          enabled: Boolean(this.state.arrowRef),
                                                          element: this.state.arrowRef,
                                                        },
                                                      },
                                                    },
                                                  }}
                                                >
                                                  {item.status === 0 ?

                                                    <img src={Disliked}
                                                      onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                      className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                         height="15" width="15"
                                                    /> :

                                                    <img src={Dislike}
                                                      onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                      className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                         height="18" width="18"
                                                    />}
                                                </Tooltip>
                                              </p>
                                              <p className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                                <span className="likesCount ml-2 mr-2">{item.comment_count}</span>
                                                <Tooltip
                                                  placement="top"
                                                  TransitionComponent={Zoom}
                                                  title={
                                                    <React.Fragment>
                                                      <div className="fontRegular14">Comment on post</div>

                                                      <span className={classes.arrow} ref={this.handleArrowRef} />
                                                    </React.Fragment>
                                                  }
                                                  classes={{
                                                    popper: classes.arrowPopper,
                                                    tooltip: classes.bootstrapTooltip,
                                                  }}

                                                  PopperProps={{
                                                    popperOptions: {
                                                      modifiers: {
                                                        arrow: {
                                                          enabled: Boolean(this.state.arrowRef),
                                                          element: this.state.arrowRef,
                                                        },
                                                      },
                                                    },
                                                  }}
                                                >
                                                  <img src={Comment}
                                                    onClick=
                                                    {localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? this.handleOpenCommentBox.bind(this, item.news_id, item.news_text, item.comment_count, item.likes_count, item.dislikes_count, item.news_created_on, index) : null} className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}
                                                       height="15" width="15"
                                                  />
                                                </Tooltip>
                                              </p>
                                              <div className="ml-2 form-inline">
                                                <FacebookShareButton
                                                  url={`https://devvec.apnaneta.com/#${this.state.url1}`}
                                                  quote={item.news_title}
                                                  className="Demo__some-network__share-button">
                                                  <Tooltip
                                                    placement="top"
                                                    TransitionComponent={Zoom}
                                                    title={
                                                      <React.Fragment>
                                                        <div className="fontRegular14">Share on facebook</div>
                                                        <span className={classes.arrow} ref={this.handleArrowRef} />
                                                      </React.Fragment>
                                                    }
                                                    classes={{
                                                      popper: classes.arrowPopper,
                                                      tooltip: classes.bootstrapTooltip,
                                                    }}
                                                    PopperProps={{
                                                      popperOptions: {
                                                        modifiers: {
                                                          arrow: {
                                                            enabled: Boolean(this.state.arrowRef),
                                                            element: this.state.arrowRef,
                                                          },
                                                        },
                                                      },
                                                    }}
                                                  >
                                                    <i className="fa fa-facebook ml-1 mr-2"></i>
                                                  </Tooltip>
                                                </FacebookShareButton>
                                                <TwitterShareButton
                                                  url={`https://devvec.apnaneta.com/#${this.state.url1}`}
                                                  title='POST LINK'
                                                  className="Demo__some-network__share-button">
                                                  <Tooltip
                                                    placement="top"
                                                    TransitionComponent={Zoom}
                                                    title={
                                                      <React.Fragment>
                                                        <div className="fontRegular14">Share on twitter</div>
                                                        <span className={classes.arrow} ref={this.handleArrowRef}/>
                                                      </React.Fragment>
                                                    }
                                                    classes={{
                                                      popper: classes.arrowPopper,
                                                      tooltip: classes.bootstrapTooltip,
                                                    }}
                                                    PopperProps={{
                                                      popperOptions: {
                                                        modifiers: {
                                                          arrow: {
                                                            enabled: Boolean(this.state.arrowRef),
                                                            element: this.state.arrowRef,
                                                          },
                                                        },
                                                      },
                                                    }}>
                                                    <i className="fa fa-twitter ml-1"></i>
                                                  </Tooltip>
                                                </TwitterShareButton>

                                              </div>
                                            </div>
                                            <div className="fontRegular12 greyFontColor ml-auto">
                                              {item.news_created_on}
                                            </div>
                                          </div>
                                        </div>
                                      </Col>
                                    </div>
                                  )
                                }
                                )}
                              </div>
                            }
                          </div>
                        </Col>
                          
                          <Col xs={12} sm={12} md={12} lg={5} xl={5} className="row userDashboardContainer align-items-start align-content-start pl-0 pr-0 order-lg-2 order-md-1 m-0 order-sm-1 order-xs-1">
                            <div className="">
                            <Row className="fixedPositionCssDashboard rowfix">
                            <Col xs={12} className="upvotedCandidateCol pl-lg-0 pr-lg-0 pl-3 pr-3 mt-lg-0 mb-3">
                              <Card className="topCandidatesPartiesCard">
                                <CardHeader className="cardHeaderUser darkBackground fontBold20">Most Upvoted Candidates</CardHeader>
                                <CardBody>
                                  {
                                    this.state.topCandidates.map((item, index) => {
                                      return (
                                        <Media className="mediaCenter cursorPointer" onClick={this.pushToprofile.bind(this, 'candidate', item.candidate_id, item.candidate_name)}>
                                          <img width={34} height={34} className="rounded-circle"
                                            src={item.candidate_img_url === null || item.candidate_img_url === '' ? UserIcon : item.candidate_img_url}   
                                          />
                                          <div className="cardContent">
                                            <Media.Heading className="fontBoldItalic greyFontColor text-left ml-1">
                                              
                                              <div className="ml-1">
                                              {item.candidate_name}
                                              </div>
                                              <p className="fontThinItalic12 greyFontColor text-left ml-1">
                                                {item.party_name}
                                              </p>
                                            </Media.Heading>
                                          </div>
                                          <div className="form-inline ml-auto mr-2">
                                            <div className="likesStyle greyFontColor mr-2">{item.upvote_count}</div>
                                            <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                                            <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                                            <div className="likesStyle greyFontColor ml-2">{item.downvote_count}</div>
                                          </div>
                                        </Media>
                                      )
                                    })
                                  }
                                </CardBody>
                              </Card>

                            </Col>
                            <Col xs={12} className="upvotedCandidateCol pl-lg-0 pr-lg-0 pl-3 pr-3">
                              <Card className="topCandidatesPartiesCard">
                                <CardHeader className="cardHeaderUser darkBackground fontBold20">Most Upvoted Parties</CardHeader>
                                <CardBody>
                                  {
                                    this.state.topParties.map((item, index) => {
                                      return (
                                        <Media className="mediaCenter cursorPointer" onClick={this.pushToprofile.bind(this, 'party', item.party_id, item.party_name)}>
                                          <img width={34} height={34} className="rounded-circle"
                                            src={item.party_img_url === null || item.party_img_url === '' ? partyPic : item.party_img_url} alt="party"
                                          />
                                          <div className="cardContent">
                                            <Media.Heading className="fontBoldItalic greyFontColor text-left ml-1">
                                              <div className="ml-1">
                                              {item.party_name}
                                              </div>
                                             
                                              <p className="fontThinItalic12 greyFontColor text-left ml-1">
                                                {item.party_type === '' || item.party_type === null ? '-' : item.party_type}
                                              </p>
                                            </Media.Heading>
                                          </div>
                                          <div className="form-inline ml-auto mr-2">
                                            <div className="likesStyle greyFontColor mr-2">{item.upvote_count}</div>
                                            <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                                            <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                                            <div className="likesStyle greyFontColor ml-2">{item.downvote_count}</div>
                                          </div>
                                        </Media>
                                      );
                                    })
                                  }
                                </CardBody>
                              </Card>
                            </Col>
                            </Row>
                            </div>
                          </Col>
                         
                      </Row>
                    </div>
                    }
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        }
        {/* <---------------Delete confirmation popup for comment in post-----------------> */}

        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}

PollResults = withRouter(PollResults)
export default withStyles(styles)(PollResults);
