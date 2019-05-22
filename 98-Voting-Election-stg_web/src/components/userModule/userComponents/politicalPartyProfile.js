/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : politicalPartyProfile.js
Purpose   : To display the detail of particular political party
*/

import React, { Component } from 'react';
import { Image, } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Add from '../../../images/add.png';
import Minus from '../../../images/minus.png';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes, { func } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SocialIcon } from 'react-social-icons';
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import { NavLink } from 'react-router-dom';
import produce from "immer"
import queryString from 'query-string'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import partyPic from '../../../images/SVGs/default_partyimg.svg'
import Dislike from '../../../images/SVGs/dislike_unfill.svg'
import Like from '../../../images/SVGs/like_unfill.svg';
import Publicuser from '../../../images/SVGs/default_userimg.svg'
import Comment from '../../../images/SVGs/comment.svg';
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js';
import { items } from '../../../networkCall/service.js';
import { constants } from '../../../networkCall/constant';
import Liked from '../../../images/SVGs/like_fill.svg'
import Disliked from '../../../images/SVGs/dislike_fill.svg';
import Delete from '../../../images/SVGs/delete.svg'

const shortid = require('shortid');

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

const dataPieOne = {
  labels: [
    '75%',
    '20%'
  ],
  datasets: [{
    data: [200, 90],
    backgroundColor: [
      '#FEF8DF',
      '#E18F68'
    ],
    hoverBackgroundColor: [
      '#FEF8DF',
      '#E18F68'
    ]
  }]
};

const dataPieTwo = {
  labels: [
    '75%',
    '20%'
  ],

  datasets: [{
    data: [150, 130],

    backgroundColor: [
      '#FEF8DF',
      '#E18F68'
    ],
    hoverBackgroundColor: [
      '#FEF8DF',
      '#E18F68'
    ]
  }]
};

const dataDoughnut = {
  labels: [
    'Criminal ',
    'Other Cases'
  ],
  datasets: [{
    data: [60, 50],

    backgroundColor: [
      '#FEF8DF',
      '#E18F68'
    ],
    hoverBackgroundColor: [
      '#FEF8DF',
      '#E18F68'
    ]
  }]
};

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
  postButton: {
    position: 'absolute',
    top: -23,
    right: 18,
    width: '15%',
  },
  profileBoxText: {
    fontSize: 12,
    fontFamily: 'montserratregular',
  },
  profileTextTwo: {
    fontSize: 12,
    fontFamily: 'montserratregular',
    paddingLeft: 10,
    marginLeft: 15,
    borderLeft: '1px solid'
  },
  profileBold: {
    fontSize: 10,
    fontFamily: 'montserratbold',
    marginLeft: 25,
  },
  textStyle: {
    fontSize: 12,
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
    '&>div>div>div': {
      overflowX: 'auto',
      overflowY: 'hidden'
    },
    '&>div>div>div::-webkit-scrollbar': {
      height: '0px'
    },
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
    fontFamily: 'montserratregular',
    color: 'white',
    backgroundColor: '#E18F68',
    '&:focus': {
      outline: 'none',
    },
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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
  iconMarginImg: {
    color: 'white',
    zIndex: 1,
    marginLeft: 14,
    position: 'absolute',
    marginTop: 35
  },
  circularLoader: {
    color: '#E18F68',
    marginTop: '40px'
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
    '&:hover': {
      backgroundColor: '#FEF8DF'
    }
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
  recentPostLoader: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    bottom: 0,
    color: '#E18F68'
  },
  recentPublicLoader: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 15,
    bottom: 0,
    color: '#E18F68'
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

class PoliticalPartyProfile extends Component {
  state = {
    value: 0,
    valueAssets: 0,
    status: '',
    valueCriminal: 0,
    newsArray: [],
    secondArray: [],
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
    openDelCommentPost: false,
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
    errorMsg: "Comment cannot be empty",
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
    url: null,
    styleForUpvote: {
      width: '33%'
    },
    styleForDownvote: {
      width: '34%'
    },
    styleForCantSay: {
      width: '33%'
    },
    resendOpen: false,
    resendMsg: '',
    user_profile: '',
    isLoading: false,
    newsParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: '',
      count: 0,
      user_id: localStorage.getItem('userId')
    },
    stopNewsCall: false,
    publicOpParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: '',
      count: 0,
      user_id: localStorage.getItem('userId')
    },
    stopPublicCall: false,
    recentPostLoader: false,
    recentPublicLoader: false,
    publicComment: false,
    activityComment: false,
    activityCommentText: '',
    publicOpinionText: '',
    newsCount: 0,
    activityLoader: true,
    publicLoader: true,
    genInfoLoader: true,
    contactLoader: true,
    newsIndex: ''
  }

  follow = (value) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
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
    else {
      this.showError();
    }
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  }

  componentDidUpdate() {
    userCheck()
    userType()
  }

  showError = () => {
    this.setState({ errorMsg: 'Please Login to continue' });
    this.setState({ commentNewsError: true })
    setTimeout(() => {
      this.setState({ commentNewsError: false })
    }, 3000)
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      if (this.state.activityComment === false) {
        this.handleAddNewsComment();
      }
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.setState({ url: this.props.location.pathname }, function () {
      this.setState({ url: shortid.generate(`https://stgvec.apnaneta.com${this.props.location.pathname}`) }, function () {
      })
    })
    this.setState({ url1: this.props.location.pathname }, function () {
      this.setState({ url1: encodeURI(this.props.location.pathname) }, function () {
      })
    })

    const party_id = values.id;
    this.state.party_id = values.id;
    this.state.party_name = values.name;
    this.setState({ party_id: this.state.party_id });
    this.setState({ party_name: this.state.party_id });
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    if (localStorage.getItem('facebookUserName')) {
      this.setState({ user_name: localStorage.getItem('facebookUserName') });
    }
    if (localStorage.getItem(btoa('userdetail'))) {
      let temp = localStorage.getItem(btoa('userdetail'));
      let value = atob(temp);
      let data = JSON.parse(value);
      this.setState({ user_name: data[0].user_name });
      this.setState({ user_profile: data[0].user_img_url })
    }
    this.setState({ returnOpinionStatus: { ...this.state.returnOpinionStatus, token_id: accessToken, user_id: userId, opinion_id: party_id } }, function () {
    })
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userDeleteOpi: { ...this.state.userDeleteOpi, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommDelete: { ...this.state.userCommDelete, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommentAdd: { ...this.state.userCommentAdd, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userOpinionLike: { ...this.state.userOpinionLike, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userActivityLike: { ...this.state.userActivityLike, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userVoteApi: { ...this.state.userVoteApi, token_id: accessToken, user_id: userId, vote_on_id: party_id } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ statusParameter: { ...this.state.statusParameter, token_id: accessToken, user_id: userId, vote_on_id: party_id } }, function () {
        items('POST', this.state.statusParameter, constants.statusReturn)
          .then(response => {
            if (response.status === "Success") {
              this.setState({ status: response.data }, function () {
              })
            }
          })
      })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userPublicOpinion: { ...this.state.userPublicOpinion, token_id: accessToken, opinion_on_id: party_id, user_id: userId } })
    }
    this.partyGeneralInfo();
    this.newsApiParty();
    this.publicOpinion();
    this.partyContact();
    this.returnFollowStatus();
    this.electionPartyRecord();
  }

  calculateWidthForBar = (upvote, downvote, cantsay) => {
    let total = upvote + downvote + cantsay;
    let upVoteWidth = ((upvote * 100) / total) + '%';
    let downVoteWidth = ((downvote * 100) / total) + '%';
    let cantSayWidth = ((cantsay * 100) / total) + '%';
    if (total !== 0) {
      this.setState({ styleForUpvote: { ...this.state.styleForUpvote, width: upVoteWidth } })
      this.setState({ styleForDownvote: { ...this.state.styleForDownvote, width: downVoteWidth } })
      this.setState({ styleForCantSay: { ...this.state.styleForCantSay, width: cantSayWidth } })
    }
  }

  componentWillReceiveProps = (newProps) => {
    const values = queryString.parse(newProps)
    const party_id = values.id;
    this.state.party_id = values.id;
    this.state.party_name = values.name;
    this.setState({ party_id: this.state.party_id });
    this.setState({ party_name: this.state.party_id });
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    if (localStorage.getItem('facebookUserName')) {
      this.setState({ user_name: localStorage.getItem('facebookUserName') });
    }
    if (localStorage.getItem(btoa('userdetail'))) {
      let temp = localStorage.getItem(btoa('userdetail'));
      let value = atob(temp);
      let data = JSON.parse(value);
      this.setState({ user_name: data[0].user_name });
      this.setState({ user_profile: data[0].user_img_url })
    }
    this.setState({ returnOpinionStatus: { ...this.state.returnOpinionStatus, token_id: accessToken, user_id: userId, opinion_id: party_id } }, function () {
    })
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userDeleteOpi: { ...this.state.userDeleteOpi, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommDelete: { ...this.state.userCommDelete, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userCommentAdd: { ...this.state.userCommentAdd, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userOpinionLike: { ...this.state.userOpinionLike, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userActivityLike: { ...this.state.userActivityLike, token_id: accessToken, user_id: userId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userVoteApi: { ...this.state.userVoteApi, token_id: accessToken, user_id: userId, vote_on_id: party_id } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ statusParameter: { ...this.state.statusParameter, token_id: accessToken, user_id: userId, vote_on_id: party_id } }, function () {
        items('POST', this.state.statusParameter, constants.statusReturn)
          .then(response => {
            if (response.status === "Success") {
              this.setState({ status: response.data }, function () {
              })
            }
          })
      })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userPublicOpinion: { ...this.state.userPublicOpinion, token_id: accessToken, opinion_on_id: party_id, user_id: userId } })
    }
    this.partyGeneralInfo();
    this.newsApiParty();
    this.publicOpinion();
    this.partyContact();
    this.returnFollowStatus();
    this.electionPartyRecord();
  }

  electionPartyRecord() {
    const values = queryString.parse(this.props.location.search)
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      party_id: values.party_id
    }
    items('POST', requestedData, constants.electionPartyDetail)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ electionPartyArr: response.data });
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  returnFollowStatus() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId'),
      follow_type: 'political_party',
      follow_id: this.state.party_id,
    }
    items('POST', requestedData, constants.returnFollowStatus)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ followStatus: response.data })
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  newsApiParty = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      party_id: this.state.party_id,
      user_id: localStorage.getItem('userId'),
      search_type: 'political_party',
      count: this.state.newsCount
    }
    items('POST', requestedData, constants.candidateNews)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === undefined || response.data === null || response.data.length === 0)) {
            for (let i of response.data) {
              if (i.post_type === 'poll') {
                let temp = {
                  "post_type": "poll",
                  "news_id": i.news_id,
                  "news_text": i.news_text,
                  "poll_flag": i.poll_flag,
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
            this.setState({ activityLoader: false })
          }
          else {
            this.setState({ activityLoader: false })
          }
        }
        else if (response.status === "Failure") {
          this.setState({ activityLoader: false })
        }
        else {
          this.setState({ activityLoader: false })
        }
        this.setState({ activityLoader: false });
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
          this.setState({ publicOpinionArray: response.data });
          this.setState({ publicLoader: false })
        }
        else if (response.status === "Failure") {
          this.setState({ publicLoader: false })
        }
        else {
          this.setState({ publicLoader: false })
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
        if (response.status === "Success" && response.data.length !== 0) {

          this.setState({ contactArray: response.data });
          this.setState({ contactLoader: false })
        }
        else if (response.status === "Failure") {
          this.setState({ contactLoader: false })
        }
        else {
          this.setState({ contactLoader: false })
        }
      });
  }

  partyGeneralInfo() {
    this.setState({ loading: true });
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      party_id: this.state.party_id,
    }
    items('POST', requestedData, constants.partyGeneralInfo)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ party_name: response.data[0].party_name });
          this.setState({ partyRegisteredState: response.data[0].party_registered_state });
          this.setState({ partyType: response.data[0].party_type });
          this.setState({ partyChairPerson: response.data[0].party_chairperson });
          this.setState({ partyYearOfEstablishment: response.data[0].party_year_of_establishment });
          this.setState({ downvoteCounts: response.data[0].downvote_count });
          this.setState({ upvoteCounts: response.data[0].upvote_count });
          this.setState({ cannotSayCounts: response.data[0].cannot_say_count });
          this.setState({ party_purpose: response.data[0].party_purpose });
          this.setState({ partyImage: response.data[0].party_img_url });
          this.calculateWidthForBar(this.state.upvoteCounts, this.state.downvoteCounts, this.state.cannotSayCounts);
          this.setState({ genInfoLoader: false })
        }
        else if (response.status === "Failure") {
          if (response.msg === "Political party not present.") {
            this.props.history.push('/Political-Parties/')
          }
          this.setState({ loading: false });
          this.setState({ genInfoLoader: false })
        }
        else {
          this.setState({ loading: false });
          this.setState({ genInfoLoader: false })
        }
      });
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

  handlePartyOpinion = (e) => {
    this.setState({ publicOpinionText: e.target.value })
    this.setState({ userPublicOpinion: { ...this.state.userPublicOpinion, opinion_desc: e.target.value } })
  }

  handleAddPublicOpinion = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (this.state.userPublicOpinion.opinion_desc.trim() !== "" || null) {
        this.setState({ publicComment: true })
        this.setState({ userPublicOpinion: { ...this.state.userPublicOpinion, opinion_desc: encodeURI(this.state.publicOpinionText) } }, function () {
          items('POST', this.state.userPublicOpinion, constants.userComment)
            .then(response => {
              if (response.status === "Success") {
                this.publicOpinion();
                this.setState({ publicOpinionText: '' });
                this.setState({ userPublicOpinion: { ...this.state.userPublicOpinion, opinion_desc: "" } })
                this.setState({ publicComment: false })
              }
            })
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
      this.showError();
    }
  }

  deleteCommentPostPopup = (openPopup, comment_id) => {
    this.setState({ openDelCommentPost: openPopup });
    this.setState({ userCommDelete: { ...this.state.userCommDelete, comment_id: comment_id } });
  }

  statusSubmitCall = () => {
    items('POST', this.state.userVoteApi, constants.userVote)
      .then(response => {
        if (response.status === "Success") {
          this.partyGeneralInfo();
          if (this.state.upvoteCounts === 0 && this.state.downvoteCounts === 0 && this.state.cannotSayCounts === 0) {
            this.setState({ styleForUpvote: { ...this.state.styleForUpvote, width: '33%' } })
            this.setState({ styleForDownvote: { ...this.state.styleForDownvote, width: '34%' } })
            this.setState({ styleForCantSay: { ...this.state.styleForCantSay, width: '33%' } })
          }
        }
        if (response.status === "Failure") {
        }
      })
  }

  handleUpVoteIncrement = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (this.state.status === 0 || this.state.status === 2) {
        this.setState({ upvoteCounts: this.state.upvoteCounts + 1 }, function () {
          if (this.state.status === 0) {
            this.setState({ downvoteCounts: this.state.downvoteCounts - 1 })
          }
          if (this.state.status === 2) {
            this.setState({ cannotSayCounts: this.state.cannotSayCounts - 1 })
          }
          this.setState({ status: 1 }, function () {
            this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
              this.statusSubmitCall()
            })
          })
        })
      }
      if (this.state.status === 1) {
        this.setState({ upvoteCounts: this.state.upvoteCounts - 1 })
        this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
          this.statusSubmitCall();
          this.setState({ status: null });
        })
      }
      if (this.state.status === null || "") {
        this.setState({ upvoteCounts: this.state.upvoteCounts + 1 }, function () {
          this.setState({ status: 1 }, function () {
            this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
              this.statusSubmitCall()
            })
          })
        })
      }
    } else {
      this.showError();
    }
  }

  handleDownVoteIncrement = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (this.state.status === 1 || this.state.status === 2) {
        this.setState({ downvoteCounts: this.state.downvoteCounts + 1 }, function () {
          if (this.state.status === 1) {
            this.setState({ upvoteCounts: this.state.upvoteCounts - 1 })
          }
          if (this.state.status === 2) {
            this.setState({ cannotSayCounts: this.state.cannotSayCounts - 1 })
          }
          this.setState({ status: 0 }, function () {
            this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
              this.statusSubmitCall()
            })
          })
        })
      }

      if (this.state.status === 0) {
        this.setState({ downvoteCounts: this.state.downvoteCounts - 1 })
        this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
          this.statusSubmitCall();
          this.setState({ status: null });
        });
      }

      if (this.state.status === null || "") {
        this.setState({ downvoteCounts: this.state.downvoteCounts + 1 }, function () {
          this.setState({ status: 0 }, function () {
            this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
              this.statusSubmitCall()
            })
          })
        })
      }
    } else {
      this.showError();
    }
  }

  handleCantSay = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (this.state.status === 0 || this.state.status === 1) {
        this.setState({ cannotSayCounts: this.state.cannotSayCounts + 1 }, function () {
          if (this.state.status === 0) {
            this.setState({ downvoteCounts: this.state.downvoteCounts - 1 })
          }
          if (this.state.status === 1) {
            this.setState({ upvoteCounts: this.state.upvoteCounts - 1 })
          }
          this.setState({ status: 2 }, function () {
            this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
              this.statusSubmitCall()
            })
          })
        })
      }

      if (this.state.status === 2) {
        this.setState({ cannotSayCounts: this.state.cannotSayCounts - 1 })
        this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
          this.statusSubmitCall();
          this.setState({ status: null });
        })
      }

      if (this.state.status === null || "") {
        this.setState({ cannotSayCounts: this.state.cannotSayCounts + 1 }, function () {
          this.setState({ status: 2 }, function () {
            this.setState({ userVoteApi: { ...this.state.userVoteApi, status: this.state.status } }, function () {
              this.statusSubmitCall()
            })
          })
        })
      }
    } else {
      this.showError();
    }
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
          });
        });
      }

      if (status === 0) {
        this.setState(produce((draft) => {
          draft.newsArray[index].dislikes_count -= 1
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
    } else {
      this.showError();
    }
  }

  handleLike = (index, status, news_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 0) {
        this.setState(produce((draft) => {
          draft.newsArray[index].likes_count += 1
        }), function () {
          this.setState({ userActivityLike: { ...this.state.userActivityLike, news_status: 1, news_id: news_id } }, function () {
            this.userActivityLikeApi()
          });
          if (status === 0) {
            this.setState(produce((draft) => {
              draft.newsArray[index].dislikes_count -= 1
            }), function () {
            });
          }
          this.setState(produce((draft) => {
            draft.newsArray[index].status = 1
          }), function () {
          });
        });
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
    } else {
      this.showError();
    }
  }

  userActivityLikeApi = () => {
    items("POST", this.state.userActivityLike, constants.activityLike)
      .then(response => {
      })
  }

  handleOpinionLike = (index, status, public_opinion_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 0) {
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].likes_count += 1
        }), function () {
          this.setState({ userOpinionLike: { ...this.state.userOpinionLike, opinion_status: 1, opinion_id: public_opinion_id } }, function () {
            this.userOpinionLikeApi()
          })
          if (status === 0) {
            this.setState(produce((draft) => {
              draft.publicOpinionArray[index].dislikes_count -= 1
            }), function () {
            })
          }
          this.setState(produce((draft) => {
            draft.publicOpinionArray[index].status = 1
          }), function () {
          })
        })
      }
      if (status === 1) {
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].likes_count -= 1
        }), function () {
          this.setState({ userOpinionLike: { ...this.state.userOpinionLike, opinion_status: 1, opinion_id: public_opinion_id } }, function () {
            this.userOpinionLikeApi()
          });
        });
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].status = null
        }), function () {
        })
      }
    } else {
      this.showError();
    }

  }

  handleOpinionDislike = (index, status, public_opinion_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 1) {
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].dislikes_count += 1
        }), function () {
          this.setState({ userOpinionLike: { ...this.state.userOpinionLike, opinion_status: 0, opinion_id: public_opinion_id } }, function () {
            this.userOpinionLikeApi()
          })
          if (status === 1) {
            this.setState(produce((draft) => {
              draft.publicOpinionArray[index].likes_count -= 1
            }), function () {
            })
          }
          this.setState(produce((draft) => {
            draft.publicOpinionArray[index].status = 0
          }), function () {
          })
        })
      }
      if (status === 0) {
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].dislikes_count -= 1
        }), function () {
          this.setState({ userOpinionLike: { ...this.state.userOpinionLike, opinion_status: 0, opinion_id: public_opinion_id } }, function () {
            this.userOpinionLikeApi()
          });
        });
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].status = null
        }), function () {
        })
      }
    } else {
      this.showError();
    }
  }

  userOpinionLikeApi = () => {
    items("POST", this.state.userOpinionLike, constants.userOpinionLike)
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
    this.setState({ newsIndex: index })
    this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_on_id: news_id } })
    this.setState({ userCommentRead: { ...this.state.userCommentRead, news_id: news_id } })
    this.setState({ userCommentRead: { ...this.state.userCommentRead, news_id: news_id } }, function () {
      items("POST", this.state.userCommentRead, constants.userCommentView)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ userCommentArray: response.data })
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
    this.setState({ activityCommentText: e.target.value })
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
        this.setState({ activityComment: true });
        this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_desc: encodeURI(this.state.activityCommentText) } }, function () {
          items("POST", this.state.userCommentAdd, constants.userCommentAdd)
            .then(response => {
              if (response.status === "Success") {
                items("POST", this.state.userCommentRead, constants.userCommentView)
                  .then(response => {
                    if (response.status === "Success") {
                      this.setState({ userCommentArray: response.data })
                      this.newsApiParty();
                      this.setState({ commentCount: this.state.commentCount + 1 });
                      this.scrollToBottom();
                      this.setState({ activityComment: false });
                      this.state.newsArray[this.state.newsIndex].comment_count = this.state.newsArray[this.state.newsIndex].comment_count + 1;
                      this.setState({ newsArray: this.state.newsArray });
                    }
                  })

                this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_desc: "" } })
                this.setState({ activityCommentText: '' });
              }
              else {
                if (response.msg === 'News not present.') {
                  this.state.newsArray.splice(this.state.newsIndex, 1);
                  this.setState({ openComment: false });
                  this.setState({ newsArray: this.state.newsArray });
                  this.setState({ errorMsg: 'This activity/news is no longer available.' });
                  this.setState({ commentNewsError: true })
                  setTimeout(() => {
                    this.setState({ commentNewsError: false })
                  }, 3000)
                }
              }
            })
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
                this.newsApiParty();
                this.setState({ commentCount: this.state.commentCount - 1 });
                this.state.newsArray[this.state.newsIndex].comment_count = this.state.newsArray[this.state.newsIndex].comment_count - 1;
                this.setState({ newsArray: this.state.newsArray });
              }
              else {
              }
            })
        }
      })
    this.setState({ openDelCommentPost: false });
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
      })
  }

  handleNewsScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
    }
  }

  handlePublicScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      if (this.state.value === 0) {
        this.newsApiParty();
      }
      if (this.state.value === 1) {
        if (this.state.stopPublicCall === false) {
          this.setState({ recentPublicLoader: true })
          this.setState({ publicOpParameter: { ...this.state.publicOpParameter, count: this.state.publicOpParameter.count + 1 } }, function () {
            items('POST', this.state.publicOpParameter, constants.partyPublicOpinion)
              .then(response => {
                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ publicOpinionArray: this.state.publicOpinionArray.concat(response.data) })
                  this.setState({ recentPublicLoader: false })
                }
                else {
                  this.setState({ stopPublicCall: true })
                  this.setState({ recentPublicLoader: false })
                }
              })
          })
        }
      }
      if (this.state.value === 0) {
        if (this.state.stopNewsCall === false) {
          this.setState({ recentPostLoader: true })
          this.setState({ newsParameter: { ...this.state.newsParameter, count: this.state.newsParameter.count + 1 } }, function () {
            items('POST', this.state.newsParameter, constants.partyNews)
              .then(response => {
                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ newsArray: this.state.newsArray.concat(response.data) })
                  this.setState({ recentPostLoader: false })
                }
                else {
                  this.setState({ stopNewsCall: true })
                  this.setState({ recentPostLoader: false })
                }
              })
          })
        }
      }
    }
  }

  scrollToBottom = () => {
    if (this.state.userCommentArray.length !== 0)
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  getTheValue = (val) => {
    var html = val;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";
    if (text.length < 60) {
      return text;
    }
    else {
      return text.slice(0, 59) + '...';
    }
  }

  voteOnPolls = (indx, parIndex) => (e) => {
    for (let i of this.state.newsArray[parIndex].pollanswer) {
      i.vote_flag = 0;
    }
    this.state.newsArray[parIndex].pollanswer[indx].vote_flag = 1;
    this.setState({ newsArray: this.state.newsArray });
  }

  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  render() {
    const { classes, theme, ...other } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="AppUserLogin userElection adminCandidate" onScroll={this.handlePublicScroll}>
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <ErrorSnackBar open={this.state.commentError}
            onClose={this.handleClose}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.errorMsg} />
          <ErrorSnackBar open={this.state.commentNewsError}
            onClose={this.handleCloseNews}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.errorMsg}
          />
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to=''>Home</NavLink> / <NavLink className="breadCrumbs" to='/Political-Parties'>Political Parties</NavLink> / {this.state.party_name}</p>
            </Col>
          </Row>
        </Container>

        {/* <----------Center-Content------------------> */}
        {this.state.isLoading === true ? <div className="marginTop80"><div className="circularLoading mt-5"><CircularProgress className={classes.circularLoader} /></div></div> :
          <div className="partyProfileSection ml-auto mr-auto mt-5">
            <Container fluid={true} className="marginTop80">
              <Row className="row_height">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                  <div className="flexCardContainer">
                    <div className="lightBackgroundColor flexCardProfile rounded paddingLeft10 paddingRight10 pt-3 pb-3 boxShadowNone">
                      <div className="circleImageCandidateProfile">
                        <div className="imageUpload">
                          <Image
                            className="imageCandidatePartyProfile"
                            src={this.state.partyImage === null || this.state.partyImage === '' || this.state.partyImage === undefined ? partyPic : this.state.partyImage}
                            responsive
                          >
                          </Image>
                        </div>
                      </div>
                      <div>
                        {this.state.activityLoader ? null : <div>
                          <h6 className="fontWeight700 greyFontColor">{this.state.party_name}</h6>
                          <small className="lineHeight18">
                            <p className="greyFontColor fontRegular13 mt-3">
                              {this.state.partyRegisteredState} | {this.state.partyType}
                              <br />
                              {this.state.partyChairPerson} - {this.state.partyYearOfEstablishment === '0000-00-00' ? null : this.state.partyYearOfEstablishment}
                            </p>
                          </small>
                        </div>}
                      </div>
                      <div className="likeDislikeBarContainer">
                        <div className="form-inline pl-0 d-flex mb-0 mt-4 justify-content-center">
                          {/* <div className="d-flex justify-content-center"> */}
                          <Typography variant="caption" className={classes.textStyle}>{this.state.upvoteCounts}</Typography>
                          <Tooltip
                            placement="top"
                            TransitionComponent={Zoom}
                            title={
                              <React.Fragment>
                                <div className="fontRegular14">{this.state.status === 1 ? 'Upvoted' : 'Upvote'}</div>
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
                            <span className={this.state.status === 1 ? 'icon-up_fill ml-1' : 'icon-up_unfill ml-1'} onClick={this.handleUpVoteIncrement}></span>
                          </Tooltip>
                          <Tooltip
                            placement="top"
                            TransitionComponent={Zoom}
                            title={
                              <React.Fragment>
                                <div className="fontRegular14">{this.state.status === 0 ? 'Downvoted' : 'Downvote'}</div>
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
                            <span className={this.state.status === 0 ? 'icon-down_fill mr-1' : 'icon-down_unfill mr-1'} onClick={this.handleDownVoteIncrement}></span>
                          </Tooltip>
                          <Typography variant="caption" className={classes.profileBoxText}>{this.state.downvoteCounts}</Typography>
                          <Tooltip
                            placement="top"
                            TransitionComponent={Zoom}
                            title={
                              <React.Fragment>
                                <div className="fontRegular14">Can't Say</div>
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
                            <Typography variant="caption" className={classes.profileTextTwo} >{this.state.cannotSayCounts} &nbsp;
                          <span className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? this.state.status === 2 ? "cursorPointer fontBold10" : "cursorPointer fontRegular10" : null}
                                onClick={this.handleCantSay}>Can't Say</span>
                            </Typography>
                          </Tooltip>
                          <div className="w-100 form-inline mt-1 likeDislikeBar">
                            <span className="bg-success likeDislikeBar" style={this.state.styleForUpvote}><small>{this.state.upvoteCounts}</small></span>
                            <span className="bg-warning likeDislikeBar" style={this.state.styleForDownvote}><small>{this.state.downvoteCounts}</small></span>
                            <span className="bg-danger likeDislikeBar" style={this.state.styleForCantSay}><small>{this.state.cannotSayCounts}</small></span>
                          </div>
                        </div>
                        <div className="follow p-0">
                          {this.state.followStatus === null || this.state.followStatus === 0 ?
                            <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                            :
                            <img src={Minus} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                          }
                          {this.state.followStatus === null || this.state.followStatus === 0 ?
                            <Button
                              bssize="large"
                              color="inherit"
                              className={classes.buttonUserCandidate}
                              onClick={this.follow.bind(this, 'FOLLOW')}
                            >
                              {/* <Add /> */}
                              Follow
                            </Button>
                            :
                            <Button
                              bssize="large"
                              color="inherit"
                              disabled={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? false : true}
                              className={classes.buttonUserCandidate}
                              onClick={this.follow.bind(this, 'UNFOLLOW')}
                            >
                              {/* <Add /> */}
                              Unfollow
                            </Button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contentContainer mb-3 rounded boxShadowNone">
                    <div className="">
                      <AppBar position="static" className={classes.appBarStyle}>
                        <Tabs value={this.state.value}
                          classes={{
                            indicator: `${classes.indicator} w-auto`,
                          }}
                          onChange={this.handleChange}
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
                    </div>
                    {/* <--------------Activity-Tab---------------------------------> */}
                    {this.state.value === 0 && <div className="" >
                      {this.state.activityLoader ? <CircularProgress className={classes.circularLoader} /> : <div>
                        <Container>
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
                                                  <span className="mb-1 greyFontColor fontSemiBold12">{decodeURI(item.comment_desc)}</span>
                                                  <Row className="ml-0 mr-0 fontSemiBold12 pl-0 pr-0">
                                                    <Col xs={7} className="d-flex align-items-center ml-0 mr-0 pl-0 pr-0">
                                                      <span className="pl-0 pr-0">By <span className="text-capitalize">{item.user_name}</span></span>
                                                      {item.user_name === this.state.user_name ? <span className="ml-3 cursorPointer"
                                                        onClick={this.deleteCommentPostPopup.bind(this, true, item.comment_id)}
                                                      ><img src={Delete} className="greyFontColor cursorPointer"
                                                        width="13" />
                                                      </span> : null}
                                                    </Col>
                                                    <Col xs={5} className="text-right">
                                                      <span className="">{item.comment_created_on}</span>
                                                    </Col>
                                                  </Row>
                                                </div>
                                              )
                                            }
                                            )}
                                            <div style={{ float: "left", clear: "both" }}
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
                                            value={this.state.activityCommentText}
                                            placeholder="comment something..."
                                            className=" fontRegular14 w-100 commentBoxInput"
                                          />
                                          <Button
                                            bssize="large"
                                            color="inherit"
                                            onClick={this.handleAddNewsComment}
                                            disabled={this.state.activityComment ? true : false}
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
                        {this.state.electionPartyArr.length === 0 && this.state.newsArray.length === 0 ?
                          <Row className="ml-1 mb-4 mt-4">
                            <div className="fontRegular16 text-center w-100"> No news available. </div>
                          </Row>
                          :
                          <Row className="ml-0 mr-0 mt-4 mb-4">
                            <Col xs={12} sm={12} md={12} lg={8} xl={8} className="mb-3">

                              <div className="commentShow pr-3" >
                                {this.state.newsArray.length === 0 ? <div className="fontRegular16"> No news available. </div> :
                                  <div>
                                    {this.state.newsArray.map((item, index) => {
                                      return (
                                        <div>
                                          {item.post_type === 'poll' ?
                                            <div className="mt-3 row">

                                              <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                                                <div className="">
                                                  <div>
                                                    <div className="fontSemiBold14 text-left mb-2 wordBreakAll" dangerouslySetInnerHTML={{ __html: item.news_text }}></div>
                                                    <fieldset id={`group${index}`}>
                                                      {item.pollanswer.map((itemAnswer, indexAnswer) => {
                                                        return (
                                                          <div className="form-inline">
                                                            <div className="radio mr-2 fontSemiBold12 wordBreakAll">
                                                              <input type="radio" id={`group${index}group${indexAnswer}`} name={`group${index}`} value={itemAnswer.vote_flag} checked={itemAnswer.vote_flag === 1} onClick={this.voteOnPolls(indexAnswer, index)} />
                                                              <label for={`group${index}group${indexAnswer}`}>{itemAnswer.poll_answer}</label>
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
                                                          </div> : null}
                                                          </div>
                                                        )
                                                      })}
                                                    </fieldset>
                                                    <div className="form-inline mt-2">
                                                      <div className="fontRegular10 mr-auto">
                                                        Ends: January 21st, 8:10 PM
                                                      </div>
                                                      <div className="fontRegular10 textBold ml-auto">
                                                        {item.poll_flag === 0 ?
                                                          <Tooltip
                                                            placement="top"
                                                            TransitionComponent={Zoom}
                                                            title={
                                                              <React.Fragment>
                                                                <div className="fontRegular14">Please vote to see the results.</div>

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
                                                            <i className="fa fa-info-circle "></i>
                                                          </Tooltip>
                                                          : null}
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
                                                            className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} height="15" width="15"
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
                                                            />
                                                            :
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
                                                          url={`https://stgvec.apnaneta.com/#${this.state.url1}`}
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
                                                          url={`https://stgvec.apnaneta.com/#${this.state.url1}`}
                                                          title='POST LINK'
                                                          className="Demo__some-network__share-button">
                                                          <Tooltip
                                                            placement="top"
                                                            TransitionComponent={Zoom}
                                                            title={
                                                              <React.Fragment>
                                                                <div className="fontRegular14">Share on twitter</div>
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
                                            :
                                            <div className="mt-3">
                                              <div className="text-left pl-0 greyFontColor fontSemiBold13 mb-2 wordBreak">
                                                <strong>{item.news_title}</strong>
                                              </div>
                                              <div className="text-left greyFontColor fontRegular12 mb-2 ql-editor p-0"
                                                dangerouslySetInnerHTML={{ __html: item.news_text }}>
                                              </div>
                                              <div className="postCommentLike form-inline pl-2 pr-2 commentTrayBackground">
                                                <div className="form-inline">
                                                  <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                                    <span className="likesCount mr-1">{item.likes_count}</span>
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
                                                        className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} height="15" width="15"
                                                      />
                                                    </Tooltip>
                                                  </div>
                                                  <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                                    <span className="likesCount ml-2 mr-1">{item.dislikes_count}</span>
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
                                                        />
                                                        :
                                                        <img src={Dislike}
                                                          onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                          className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                          height="18" width="18"
                                                        />}
                                                    </Tooltip>
                                                  </div>
                                                  <div className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                                    <span className="likesCount ml-2 mr-1">{item.comment_count}</span>
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
                                                        {localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? this.handleOpenCommentBox.bind(this, item.news_id, item.news_text, item.comment_count, item.likes_count, item.dislikes_count, item.news_created_on, index) : this.showError} className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}
                                                        height="15" width="15"
                                                      />
                                                    </Tooltip>
                                                  </div>
                                                  <div className="ml-2 mt-1 d-flex" onClick={this.getTheValue.bind(this, item.news_text)}>
                                                    <FacebookShareButton
                                                      url={`https://stgvec.apnaneta.com${this.state.url1}`}
                                                      quote={this.getTheValue(item.news_text)}

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
                                                      url={`https://stgvec.apnaneta.com${this.state.url1}`}
                                                      title={this.getTheValue(item.news_text)}
                                                      className="Demo__some-network__share-button">
                                                      <Tooltip
                                                        placement="top"
                                                        TransitionComponent={Zoom}
                                                        title={
                                                          <React.Fragment>
                                                            <div className="fontRegular14">Share on twitter</div>
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
                                          }
                                        </div>
                                      )
                                    }
                                    )}
                                  </div>
                                }
                                <div>
                                  {this.state.recentPostLoader ? <CircularProgress className={classes.recentPostLoader} /> : null}
                                </div>
                              </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="">
                              {this.state.electionPartyArr.length === 0 ? <div className="fontRegular16"> No records available. </div> :
                                <div>
                                  {this.state.electionPartyArr.map((item, index) => {
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
                      <Dialog
                        transition={Collapse}
                        open={this.state.openDelOpi}
                        onClose={this.handleCloseDelOpi}
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
                      </Dialog>

                      {localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') === null ? null :
                        <Row className="mb-3 ml-0 mr-0">
                          <div className="opinionImageContainer">
                            <div className="imageUploadOpinion">
                              <img src={this.state.user_profile === null || this.state.user_profile === undefined || this.state.user_profile === '' ? Publicuser : this.state.user_profile}
                                className='imageOpinion'
                              />
                            </div>
                            <div className="fontBold12 greyFontColor mt-2 text-capitalize">{this.state.user_name}</div>
                          </div>
                          <div className="commentSection">
                            <div className="">
                              <textarea
                                type="text"
                                className="form-control commentTextEdit fontRegular14"
                                onChange={this.handlePartyOpinion}
                                value={this.state.publicOpinionText}
                              ></textarea>
                            </div>
                            <div className="text-right">
                              <MuiThemeProvider theme={theme}>
                                <Button className={classes.buttonComment}
                                  onClick={this.handleAddPublicOpinion}
                                  disabled={this.state.publicComment ? true : false}
                                >
                                  Comment
                                </Button>
                              </MuiThemeProvider>
                            </div>
                          </div>
                        </Row>
                      }
                      <div>
                        {this.state.publicLoader ? <CircularProgress className={classes.circularLoader} /> : <div>
                          {this.state.publicOpinionArray === null || this.state.publicOpinionArray.length === 0 ? <div className="fontRegular16 mb-5 mt-5"> No public opinion available.</div> :
                            <div>
                              <div>
                                {this.state.publicOpinionArray.map((item, index) => {
                                  return (
                                    <Row className="mt-3 ml-0 mr-0 publicOpinionComment">
                                      <div className="opinionImageContainer">
                                        <div className="imageUploadOpinion">
                                          <img src={item.user_img_url === null || item.user_img_url === undefined || item.user_img_url === '' ? Publicuser : item.user_img_url}
                                            className='imageOpinion'
                                          />
                                        </div>
                                        <div className="fontBold12 greyFontColor text-capitalize user_name_truncate">{item.user_name}</div>
                                      </div>
                                      <div className="commentSection border-0 d-flex flex-column align-self-end">
                                        <p className="text-left fontRegular12 greyFontColor preWrapWhiteSpace mb-2">
                                          {decodeURI(item.opinion_desc)}
                                        </p>
                                        <div className="fontRegular12 lightBackgroundColor form-inline commentLikeDislikeBox">
                                          <div className="form-inline pl-4">
                                            <div className="fontRegular12 greyFontColor d-flex align-self-center">
                                              <span className="likesCount">{item.likes_count}</span>
                                              &nbsp;
                                                <Tooltip
                                                placement="top"
                                                TransitionComponent={Zoom}
                                                title={
                                                  <React.Fragment>
                                                    <div className="fontRegular14">{item.status === 1 ? 'Liked' : 'Like opinion'}</div>

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
                                                <img src={item.status === 1 ? Liked : Like} onClick={this.handleOpinionLike.bind(this, index, item.status, item.public_opinion_id)}
                                                  className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}

                                                  height="15" width="15"
                                                />
                                              </Tooltip>
                                            </div>&nbsp; &nbsp;&nbsp;
                                          <div className="fontRegular12 greyFontColor d-flex align-self-center">
                                              <span className="likesCount">{item.dislikes_count}</span>
                                              &nbsp;
                                                <Tooltip
                                                placement="top"
                                                TransitionComponent={Zoom}
                                                title={
                                                  <React.Fragment>
                                                    <div className="fontRegular14">{item.status === 0 ? 'Disliked' : 'Dislike opinion'}</div>
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
                                                <img src={item.status === 0 ? Disliked : Dislike} onClick={this.handleOpinionDislike.bind(this, index, item.status, item.public_opinion_id)}
                                                  className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                  height="16" width="16"
                                                />
                                              </Tooltip>
                                            </div>&nbsp; &nbsp;
                                              <div className="remove1box">
                                              {this.state.user_name === item.user_name ? <div className="greyFontColor cursorPointer remove1">
                                                <Tooltip
                                                  placement="top"
                                                  TransitionComponent={Zoom}
                                                  title={
                                                    <React.Fragment>
                                                      <div className="fontRegular14">Delete opinion</div>
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
                                                  <img onClick={this.handleDeleteOpen.bind(this, item.public_opinion_id)}
                                                    src={Delete} className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? "greyFontColor cursorPointer icon" : "greyFontColor  icon"}
                                                    width="13"
                                                  /></Tooltip>
                                              </div>
                                                : null}
                                            </div>
                                          </div>
                                          <div className="ml-auto form-inline pr-4 ">
                                            <span className="greyFontColor">{item.opinion_created_on}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </Row>
                                  )
                                }
                                )}
                                <div>
                                  {this.state.recentPublicLoader ? <CircularProgress className={classes.recentPublicLoader} /> : null}
                                </div>
                              </div>
                            </div>
                          }
                        </div>}
                      </div>
                    </div>
                    }
                    {/* <-------------------General-Info-Tab--------------------> */}
                    {this.state.value === 2 &&
                      <div>
                        {this.state.genInfoLoader ? <CircularProgress className={classes.circularLoader} /> : <div className="text-left p-3">
                          {this.state.party_purpose === '' ? <div> No information available </div> :
                            <div>
                              <p className="fontRegular14 greyFontColor p-0 pt-2 ql-editor" dangerouslySetInnerHTML={{ __html: this.state.party_purpose }}>
                              </p>
                            </div>
                          }
                        </div>}

                      </div>
                    }
                    {/* <---------Contact-Tab-----------------> */}
                    {this.state.value === 3 && <div >
                      {this.state.contactLoader ? <CircularProgress className={classes.circularLoader} /> : <div className="text-left greyFontColor pl-3 pb-3 pr-5 ">
                        <h4 className="fontSemiBold16 mt-3">{this.state.contactArray[0].party_office_name}</h4>
                        <div className="">
                          <div className="">
                            {this.state.contactArray[0].party_address === null || this.state.contactArray[0].party_address === '' || this.state.contactArray[0].party_address === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Office Address: {this.state.contactArray[0].party_address}</div>
                            }
                            {this.state.contactArray[0].party_email === null || this.state.contactArray[0].party_email === '' || this.state.contactArray[0].party_email === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Email: {this.state.contactArray[0].party_email}</div>
                            }
                            {this.state.contactArray[0].party_phone_number === null || this.state.contactArray[0].party_phone_number === '' || this.state.contactArray[0].party_phone_number === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Phone: {this.state.contactArray[0].party_phone_number}</div>
                            }
                            {this.state.contactArray[0].party_website === null || this.state.contactArray[0].party_website === '' || this.state.contactArray[0].party_website === undefined ? null :
                              <div className="fontRegular14 greyFontColor">Website: {this.state.contactArray[0].party_website}</div>
                            }
                          </div>
                          <div className="mt-3">
                            {this.state.contactArray[0].party_facebook_url === '' ? null :
                              <a href={this.state.contactArray[0].party_facebook_url} target="_blank"><SocialIcon network="facebook" style={{ height: 30, width: 30 }} className="ml-1" /></a>
                            }
                            {this.state.contactArray[0].party_twitter_url === '' ? null :
                              <a href={this.state.contactArray[0].party_twitter_url} target="_blank"><SocialIcon network="twitter" style={{ height: 30, width: 30 }} className="ml-1" /></a>
                            }
                            {this.state.contactArray[0].party_instagram_url === '' ? null :
                              <a href={this.state.contactArray[0].party_instagram_url} target="_blank"><SocialIcon network="instagram" style={{ height: 30, width: 30 }} className="ml-1" /></a>
                            }
                            {this.state.contactArray[0].party_youtube_url === '' ? null :
                              <a href={this.state.contactArray[0].party_youtube_url} target="_blank"><SocialIcon network="youtube" style={{ height: 30, width: 30 }} className="ml-1" /></a>
                            }
                            {this.state.contactArray[0].party_google_url === '' ? null :
                              <a href={this.state.contactArray[0].party_google_url} target="_blank"><SocialIcon network="google" style={{ height: 30, width: 30 }} className="ml-1" /></a>
                            }
                            {this.state.contactArray[0].party_linkedin_url === '' ? null :
                              <a href={this.state.contactArray[0].party_linkedin_url} target="_blank"><SocialIcon network="linkedin" style={{ height: 30, width: 30 }} className="ml-1" /></a>
                            }
                          </div>
                        </div>

                        {(this.state.contactArray[0].party_facebook_url === '' || this.state.contactArray[0].party_facebook_url === null || this.state.contactArray[0].party_facebook_url === undefined)
                          && (this.state.contactArray[0].party_twitter_url === '' || this.state.contactArray[0].party_twitter_url === null || this.state.contactArray[0].party_twitter_url === undefined)
                          && (this.state.contactArray[0].party_instagram_url === '' || this.state.contactArray[0].party_instagram_url === null || this.state.contactArray[0].party_instagram_url === undefined)
                          && (this.state.contactArray[0].party_youtube_url === '' || this.state.contactArray[0].party_youtube_url === null || this.state.contactArray[0].party_youtube_url === undefined)
                          && (this.state.contactArray[0].party_google_url === '' || this.state.contactArray[0].party_google_url === null || this.state.contactArray[0].party_google_url === undefined)
                          && (this.state.contactArray[0].party_linkedin_url === '' || this.state.contactArray[0].party_linkedin_url === null || this.state.contactArray[0].party_linkedin_url === undefined)
                          && (this.state.contactArray[0].party_phone_number === '' || this.state.contactArray[0].party_phone_number === null || this.state.contactArray[0].party_phone_number === undefined)
                          && (this.state.contactArray[0].party_email === '' || this.state.contactArray[0].party_email === null || this.state.contactArray[0].party_email === undefined)
                          && (this.state.contactArray[0].party_office_name === '' || this.state.contactArray[0].party_office_name === null || this.state.contactArray[0].party_office_name === undefined)
                          && (this.state.contactArray[0].party_address === '' || this.state.contactArray[0].party_address === null || this.state.contactArray[0].party_address === undefined)
                          && (this.state.contactArray[0].party_website === '' || this.state.contactArray[0].party_website === null || this.state.contactArray[0].party_website === undefined)
                          ?
                          <div className="d-flex align-items-center justify-content-center fontSemiBold16">
                            No contact details available.
                          </div>
                          :
                          null
                        }
                      </div>}
                    </div>
                    }
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
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
        <ErrorSnackBar open={this.state.resendOpen}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.resendMsg}
        />
      </div>
    )
  }
}


export default withStyles(styles)(PoliticalPartyProfile);
