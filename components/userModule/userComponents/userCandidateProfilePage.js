/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userCandidateProfilePage.js
Purpose   : To show the details of a particular candidate.
*/

import React, { Component } from 'react';
import { Image, } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Add from '../../../images/add.png';
import Minus from '../../../images/minus.png';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import queryString from 'query-string'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import { Emojione } from 'react-emoji-render';
import { items } from '../../../networkCall/service.js';
import { constants } from '../../../networkCall/constant';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import produce, { setAutoFreeze } from "immer"
import userOne from '../../../images/SVGs/default_userimg.svg';
import partyPic from '../../../images/SVGs/default_partyimg.svg'
import Dislike from '../../../images/SVGs/dislike_unfill.svg'
import Like from '../../../images/SVGs/like_unfill.svg'
import Publicuser from '../../../images/SVGs/default_userimg.svg'
import UserSearchAppBar from './userAppbar/userAppBar'
import Comment from '../../../images/SVGs/comment.svg'
import Footer from './userFooter/footer.js'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import Delete from '../../../images/SVGs/delete.svg'
import Liked from '../../../images/SVGs/like_fill.svg';
import Disliked from '../../../images/SVGs/dislike_fill.svg';
import 'react-quill/dist/quill.snow.css';
import UserIcon from '../../../images/SVGs/default_userimg.svg'
import constituencyImg from '../../../images/SVGs/constituency_icon.svg'

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

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' }
]

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
  iconButton: {
    padding: 10,
    '&:hover': {
      backgroundColor: '#FEF8DF'
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
    cursor: 'pointer'
  },
  disabledIconMargin: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  appBarStyle: {
    backgroundColor: '#FEF8DF',
    boxShadow: 'none',
    overflowX: 'auto',
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
  tabLabelStyleAssets: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: 13,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
    'element.style': {
      width: 183,
    },
  },
  circularLoader: {
    color: '#E18F68',
    marginTop: '40px'
  },
  tabLabelStyleAssetsImmovable: {
    textTransform: 'capitalize',
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  tabLabelStyleAssetsLiabilities: {
    textTransform: 'capitalize',
    color: 'black',
    paddingRight: '3%',
    fontSize: 13,
    marginLeft: 5,
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
    fontFamily: 'montserratregular',
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
    borderTop: '1px solid grey',
    borderLeft: '1px solid grey',
    borderRight: '1px solid grey',
    fontSize: 16,
    width: '100% ',
    minHeight: '100%'
  },
  textFieldInput2: {
    borderRadius: 50,
    border: '1px solid grey',
    backgroundColor: '#F4F2F0',
    fontSize: 16,
    height: 50,
    padding: '10px 12px',
    width: 'calc(100% - 10px)',
    marginTop: '2%',
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  iconMarginImg: {
    color: 'white',
    zIndex: 1,
    marginLeft: 14,
    position: 'absolute',
    marginTop: 35
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
    },
    paper: {
      minHeight: '80vh',
      maxHeight: '80vh',
      minWidth: '100vh',
      maxWidth: '100vh',
      borderRadius: '15px'
    },
    commetTextArea: {
      wordWrap: 'break',
      maxWidth: '60vh',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
    },
    rootBackDrop: {
      height: '100vh',
      width: '100vh',
      backgroundColor: 'rgba(127, 127, 127, 0.2)',
    },
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
  heading: {
    backgroundColor: 'blue',
    fontSize: '16px',
    fontWeight: '700'
  },
  widthLike: {
    width: likeWidth
  },
  widthDislike: {
    width: dislikeWidth
  },
  widthCantSay: {
    width: cantSayWidth
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
const likeWidth = ''
const dislikeWidth = ''
const cantSayWidth = ''
function handleClick(e) {
}

const userType = () => {
  const userType = localStorage.getItem('userType')
  return userType
}

const userCheck = () => {
  const userCheckType = constants.checkUserValidity
  return userCheckType
}

const shortid = require('shortid');

class UserCandidateProfile extends Component {
  state = {
    value: 0,
    status: '',
    valueAssets: 0,
    valueCriminal: 0,
    newsArray: [],
    secondArray: [],
    activeIndex: 0,
    educationArray: [],
    PolliticalArray: [],
    bankingArray: dataBanking,
    bondArray: bondArray,
    candidateProfileData: [],
    candidate_name: '',
    candidateAddress: '',
    candidateEducation: '',
    upvoteCounts: '',
    downvoteCounts: '',
    cannotSayCounts: '',
    candidateParty: '',
    per_upvote: '',
    per_downvote: '',
    per_cantsay: '',
    user_name: '',
    newsStatus: [],
    newsLike: [],
    newsDislike: [],
    userCommentArray: [],
    commentNewsError: false,
    dailogPostArray: '',
    userCommentAdd: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      comment_desc: '',
      comment_on_id: '',
    },
    userOpinionLike: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      opinion_id: '',
      opinion_status: ''
    },
    activityLikeStatus: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      news_id: ''
    },
    statusParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      vote_type: 'candidate',
      vote_on_id: '',
    },
    publicOpinionArray: [],
    commentError: false,
    userVoteApi: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      vote_type: 'candidate',
      vote_on_id: '',
      status: ''
    },
    userCommentRead: {
      votingElection_code: constants.votingElectionCode,
      news_id: ''
    },
    userActivityLike: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      news_id: '',
      news_status: ''
    },
    vertical: 'top',
    horizontal: 'center',
    hello: "Comment cannot be empty",
    criminalRecordArray: { 'charges_convicted': [], 'charges_framed': [], 'cognizance_only': [] },
    movable: { 'cash': [], 'bonds': [], 'shares': [], 'postal': [], 'insurance': [], 'personalLoans': [], 'vehicle': [], 'jewellery': [], 'other': [] },
    immovable: { 'agricultural': [], 'nonAgricultural': [], 'buildings': [], 'commBuildings': [], 'resiBuildings': [], 'others': [], 'houses': [] },
    liabilities: {
      'loans': [], 'anyOther': [], 'houses': [], 'govAccomodation': [], 'supplyOfWater': [], 'supplyOfELec': [], 'telephones': [], 'supplyOfTrans': [],
      'incomeTax': [], 'serviceTax': [], 'wealthTax': [], 'propertyTax': [], 'salesTax': [], 'anyOtherDues': [], 'grandTotalDue': [], 'grandTotalLia': [],
      'loansIndividual': [], 'disputeLia': []
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
    commentLikeCount: '',
    commentDislikeCount: '',
    commentCount: '',
    newCreatedOn: '',
    openDelOpi: false,
    openDelCommentPost: false,
    userDeleteOpi: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      opinion_id: ''
    },
    followStatus: null,
    showMovale: 'false',
    showImmovale: 'false',
    showLiability: 'false',
    candidateImage: null,
    partyImage: null,
    candidateId: '',
    candidateName: '',
    post: null,
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
    vertical: 'top',
    horizontal: 'center',
    won: '',
    lost: '',
    participated: '',
    movableTotal: '',
    imovableTotal: '',
    liabilityTotal: '',
    user_profile: '',
    about: '',
    newsParameter: {
      votingElection_code: constants.votingElectionCode,
      candidate_id: '',
      count: 0,
      user_id: localStorage.getItem('userId')
    },
    publicOpParameter: {
      votingElection_code: constants.votingElectionCode,
      candidate_id: '',
      count: 0,
      user_id: localStorage.getItem('userId')
    },
    stopNewsCall: false,
    stopPublicCall: false,
    recentPostLoader: false,
    recentPublicLoader: false,
    publicComment: false,
    activityComment: false,
    publicOpinionText: '',
    activityCommentText: '',
    commentPublicError: false,
    errorMsg: '',
    newsTitlePost: '',
    newsCount: 0,
    activityLoader: true,
    publicOpinionLoader: true,
    profileLoader: true,
    assetsLoader: true,
    criminalLoader: true,
    newsIndex: '',
    opiIndx: ''
  }

  candidateAssetsAndLiabilities() {
    this.setState({ movable: { 'cash': [], 'bonds': [], 'shares': [], 'postal': [], 'insurance': [], 'personalLoans': [], 'vehicle': [], 'jewellery': [], 'other': [] } });
    this.setState({ immovable: { 'agricultural': [], 'nonAgricultural': [], 'buildings': [], 'commBuildings': [], 'resiBuildings': [], 'others': [], 'houses': [] } });
    this.setState({
      liability: {
        'loans': [], 'anyOther': [], 'houses': [], 'govAccomodation': [], 'supplyOfWater': [], 'supplyOfELec': [], 'telephones': [], 'supplyOfTrans': [],
        'incomeTax': [], 'serviceTax': [], 'wealthTax': [], 'propertyTax': [], 'salesTax': [], 'anyOtherDues': [], 'grandTotalDue': [], 'grandTotalLia': [],
        'loansIndividual': [], 'disputeLia': []
      }
    });

    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      candidate_id: this.state.candidateId,
    }
    items('POST', requestedData, constants.assetsAndLiabilities)
      .then(response => {
        if (response.status === "Success" && response.data.length !== 0) {
          for (let j = 0; j < response.data.length; j++) {
            let self = response.data[j].asset_self.length;
            let spouse = response.data[j].asset_spouse.length
            let dep1 = response.data[j].asset_depend1.length;
            let dep2 = response.data[j].asset_depend2.length;
            let dep3 = response.data[j].asset_depend3.length;
            let tempMax = Math.max(response.data[j].asset_self.length,
              response.data[j].asset_depend1.length,
              response.data[j].asset_depend2.length,
              response.data[j].asset_depend3.length,
              response.data[j].asset_spouse.length);
            for (let i = 0; i < tempMax - self; i++) {
              response.data[j].asset_self.push('Empty')
            }
            for (let i = 0; i < tempMax - spouse; i++) {
              response.data[j].asset_spouse.push('Empty')
            }
            for (let i = 0; i < tempMax - dep1; i++) {
              response.data[j].asset_depend1.push('Empty');
            }
            for (let i = 0; i < tempMax - dep2; i++) {
              response.data[j].asset_depend2.push('Empty')
            }
            for (let i = 0; i < tempMax - dep3; i++) {
              response.data[j].asset_depend3.push('Empty')
            }
            if (response.data[j].asset_type === 'Movable Assets') {
              if (response.data[j].asset_name === 'Bonds debentures' || response.data[j].asset_name === 'shares in companies' || response.data[j].asset_name === 'BONDS_SHARE') {
                this.state.movable.bonds.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Bonds, Debentures and Shares in companies' || response.data[j].asset_name === 'BONDS_SHARE') {
                this.state.movable.bonds.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'NSS, Postal Savings etc' || response.data[j].asset_name === 'NSS') {
                this.state.movable.postal.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'LIC' || response.data[j].asset_name === 'LIC or other insurance Policies') {
                this.state.movable.insurance.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Personal loans/advance given' || response.data[j].asset_name === 'PERSONAL_LOAN') {
                this.state.movable.personalLoans.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Motor Vehicles (details of make, etc.)' || response.data[j].asset_name === 'VEHICLES') {
                this.state.movable.vehicle.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Jewellery (give details weight value)' || response.data[j].asset_name === 'JEWELLARY ') {
                this.state.movable.jewellery.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Other assets, such as values of claims / interests' || response.data[j].asset_name === 'OTHER_ASSETS') {
                this.state.movable.other.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Deposits in Banks, Financial Institutions and Non-Banking Financial Companies' || response.data[j].asset_name === 'DEPOSIT') {
                this.state.movable.shares.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Deposits in bank' || response.data[j].asset_name === 'Financial institutions' || response.data[j].asset_name === 'non-banking Financial companies' || response.data[j].asset_name === 'DEPOSIT') {
                this.state.movable.shares.push(response.data[j]);
              }
              else {
                this.state.movable.cash.push(response.data[j]);
              }
              this.setState({ movable: this.state.movable })
            }
            else if (response.data[j].asset_type === 'Immovable Assets') {
              if (response.data[j].asset_name === 'Agricultural land' || response.data[j].asset_name === 'AGRI_LAND') {
                this.state.immovable.agricultural.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Non-Agricultural land' || response.data[j].asset_name === 'NON_AGRI_LAND') {
                this.state.immovable.nonAgricultural.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Buildings') {
                this.state.immovable.buildings.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Commercial Buildings' || response.data[j].asset_name === 'COMM_BUILDING') {
                this.state.immovable.commBuildings.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Residential Buildings' || response.data[j].asset_name === 'RESI_BUILDING') {
                this.state.immovable.resiBuildings.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Others' || response.data[j].asset_name === 'OTHERS') {
                this.state.immovable.others.push(response.data[j]);
              }
              else {
                this.state.immovable.houses.push(response.data[j]);
              }
              this.setState({ immovable: this.state.immovable })
            }
            else {
              if (response.data[j].asset_name === 'Loan from bank & F/I' || response.data[j].asset_name === 'BANK_LOAN') {
                this.state.liabilities.loans.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Any other liabilities' || response.data[j].asset_name === 'OTHER_LIABILITY') {
                this.state.liabilities.anyOther.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Loans due to Individual / Entity' || response.data[j].asset_name === 'NETITY_LOAN') {
                this.state.liabilities.loansIndividual.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Grand Total of Liabilities (as per affidavit)' || response.data[j].asset_name === 'GRAND_TOTAL_LIABILITY') {
                this.state.liabilities.grandTotalLia.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Dues to departments dealing with government accommodation' || response.data[j].asset_name === 'DUE_GOV') {
                this.state.liabilities.govAccomodation.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Dues to departments dealing with supply of water' || response.data[j].asset_name === 'DUE_WATER') {
                this.state.liabilities.supplyOfWater.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Dues to departments dealing with supply of electricity' || response.data[j].asset_name === 'DUE_ELECTRICITY') {
                this.state.liabilities.supplyOfELec.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Dues to departments dealing with telephones' || response.data[j].asset_name === 'DUE_TELEPHONE') {
                this.state.liabilities.telephones.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Dues to departments dealing with supply of transport' || response.data[j].asset_name === 'DUE_TRANSPORT') {
                this.state.liabilities.supplyOfTrans.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Income Tax Dues' || response.data[j].asset_name === 'DUE_ICNOME_TAX') {
                this.state.liabilities.incomeTax.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Wealth Tax Dues' || response.data[j].asset_name === 'DUE_WEALTH_TAX') {
                this.state.liabilities.wealthTax.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Service Tax Dues' || response.data[j].asset_name === 'DUE_SERVICE_TAX') {
                this.state.liabilities.serviceTax.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Property Tax Dues' || response.data[j].asset_name === 'DUE_PROPERTY_TAX') {
                this.state.liabilities.propertyTax.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Sales Tax Dues' || response.data[j].asset_name === 'DUE_SALES_TAX') {
                this.state.liabilities.salesTax.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Any Other Dues' || response.data[j].asset_name === 'OTHER_DUES') {
                this.state.liabilities.anyOtherDues.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'Grand Total of all Govt Dues (as per affidavit)' || response.data[j].asset_name === 'GRAND_TOTAL_DUES') {
                this.state.liabilities.grandTotalDue.push(response.data[j]);
              }
              else if (response.data[j].asset_name === 'DISPUTE_LIABILITY' || response.data[j].asset_name === 'Whether any other liabilities are in dispute, if so, mention the amount involved and the authority before which it is pending') {
                this.state.liabilities.disputeLia.push(response.data[j]);
              }
              else {
                this.state.liabilities.houses.push(response.data[j]);
              }
              this.setState({ liabilities: this.state.liabilities })
            }
          }
          this.setState({ assetsLoader: false })
        }
        else if (response.status === "Failure") {
          this.setState({ assetsLoader: false })
        }
        else {
          this.setState({ assetsLoader: false })
        }
      });
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  handleAssetsChange = (event, valueAssets) => {
    this.setState({ valueAssets: valueAssets });
  }

  handleCriminalChange = (event, valueCriminal) => {
    this.setState({ valueCriminal: valueCriminal })
  }

  handleChange = (event, value, index) => {
    this.setState({ value: value });
  };

  openUpMovable = (value) => {
    if (this.state.showMovable === value) {
      this.setState({ showMovable: 'false' });
    }
    else {
      this.setState({ showMovable: value });
    }
  };

  openUpImmovable = (value) => {
    if (this.state.showImmovable === value) {
      this.setState({ showImmovable: 'false' });
    }
    else {
      this.setState({ showImmovable: value });
    }
  };

  openUpLiability = (value) => {
    if (this.state.showLiability === value) {
      this.setState({ showLiability: 'false' });
    }
    else {
      this.setState({ showLiability: value });
    }
  };

  onEnter = (e) => {
    if (e.key === 'Enter') {
      if (this.state.activityComment === false) {
        this.handleAddNewsComment();
      }
    }
  }

  scrollToBottom = () => {
    if (this.state.userCommentArray.length !== 0) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  follow = (value) => {
    if (this.isUser()) {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: localStorage.getItem('accessToken'),
        user_id: localStorage.getItem('userId'),
        follow_type: 'candidate',
        follow_id: this.state.candidateId,
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
          }
          else if (response.status === "Failure") {
          }
          else {
          }
        });
    }
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.setState({ publicOpParameter: { ...this.state.publicOpParameter, candidate_id: values.id } })
    this.setState({ url: this.props.location.pathname }, function () {
      this.setState({ url: shortid.generate(`https://devvec.apnaneta.com${this.props.location.pathname}`) }, function () {
      })
    })
    this.setState({ url1: this.props.location.pathname }, function () {
      this.setState({ url1: encodeURI(this.props.location.pathname) }, function () {
      })
    })

    userCheck()
    userType()

    this.setState({ showMovable: 'cash' });
    this.setState({ showImmovable: 'agri' });
    this.setState({ showLiability: 'loans' });
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId')
    this.setState({ newsParameter: { ...this.state.newsParameter, user_id: userId } })
    this.setState({ publicOpParameter: { ...this.state.publicOpParameter, user_id: userId } })
    const candidateId = values.id
    this.state.candidateId = values.id
    this.state.candidateName = values.name
    this.setState({ candidateId: this.state.candidateId });
    this.setState({ candidateName: this.state.candidateName });
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
      this.setState({ userVoteApi: { ...this.state.userVoteApi, token_id: accessToken, user_id: userId, vote_on_id: candidateId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userVoteApi: { ...this.state.userVoteApi, token_id: accessToken, user_id: userId, vote_on_id: candidateId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ statusParameter: { ...this.state.statusParameter, token_id: accessToken, user_id: userId, vote_on_id: candidateId } }, function () {
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
      this.setState({ userComment: { ...this.state.userComment, token_id: accessToken, user_id: userId, opinion_on_id: candidateId } })
    }
    this.candidateProfileView();
    this.candidatePublicOpinion();
    this.candidateNewsArray();
    this.candidateElectionArray();
    this.candidateCriminalSection();
    this.candidateAssetsAndLiabilities();
    this.returnFollowStatus();
  }
  isUser = () => {
    return (localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'user');
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
    userCheck()
    userType()
    this.setState({ showMovable: 'cash' });
    this.setState({ showImmovable: 'agri' });
    this.setState({ showLiability: 'loans' });
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId')
    const candidateId = values.id
    this.state.candidateId = values.id
    this.state.candidateName = values.name
    this.setState({ candidateId: this.state.candidateId });
    this.setState({ candidateName: this.state.candidateName });
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
      this.setState({ userVoteApi: { ...this.state.userVoteApi, token_id: accessToken, user_id: userId, vote_on_id: candidateId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ userVoteApi: { ...this.state.userVoteApi, token_id: accessToken, user_id: userId, vote_on_id: candidateId } })
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      this.setState({ statusParameter: { ...this.state.statusParameter, token_id: accessToken, user_id: userId, vote_on_id: candidateId } }, function () {
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
      this.setState({ userComment: { ...this.state.userComment, token_id: accessToken, user_id: userId, opinion_on_id: candidateId } })
    }
    this.candidateProfileView();
    this.candidatePublicOpinion();
    this.candidateNewsArray();
    this.candidateCriminalSection();
    this.candidateAssetsAndLiabilities();
    this.returnFollowStatus();
  }

  returnFollowStatus() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId'),
      follow_type: 'candidate',
      follow_id: this.state.candidateId,
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

  deleteCommentPostPopup = (openPopup, comment_id) => {
    this.setState({ openDelCommentPost: openPopup });
    this.setState({ userCommDelete: { ...this.state.userCommDelete, comment_id: comment_id } });
  }

  statusSubmitCall = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      items('POST', this.state.userVoteApi, constants.userVote)
        .then(response => {

          if (response.status === "Success") {
            this.candidateProfileView();
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
  }

  candidateProfileView() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      candidate_id: this.state.candidateId,
    }
    items('POST', requestedData, constants.viewCandProfile)
      .then(response => {
        if (response.status === "Success" && response.data.length !== 0) {
          dataDoughnut.datasets[0].data = [response.data[0].total_criminal_cases];
          dataPieOne.datasets[0].data = [response.data[0].immovable, response.data[0].movable, response.data[0].liabilities];
          dataPieTwo.datasets[0].data = [response.data[0].loss, response.data[0].won, response.data[0].total];
          this.setState({ candidateProfileData: response.data });
          this.setState({ candidate_name: response.data[0].candidate_name });
          this.setState({ candidateAddress: response.data[0].candidate_address });
          this.setState({ candidateEducation: response.data[0].candidate_profession });
          this.setState({ educationArray: response.data[0].candidate_education_rec.split(',') });
          this.setState({ downvoteCounts: response.data[0].downvote_count });
          this.setState({ upvoteCounts: response.data[0].upvote_count });
          this.setState({ candidateParty: response.data[0].candidate_party_name })
          this.setState({ PolliticalArray: response.data[0].candidate_legislature.split(',') });
          this.setState({ cannotSayCounts: response.data[0].cannot_say_count });
          this.setState({ candidateImage: response.data[0].candidate_img_url })
          this.setState({ partyImage: response.data[0].party_img_url })
          this.setState({ about: response.data[0].candidate_about })
          this.setState({ won: response.data[0].won })
          this.setState({ lost: response.data[0].loss })
          this.setState({ participated: response.data[0].total })
          this.setState({ movableTotal: response.data[0].movable })
          this.setState({ imovableTotal: response.data[0].immovable })
          this.setState({ liabilityTotal: response.data[0].liabilities })
          this.calculateWidthForBar(this.state.upvoteCounts, this.state.downvoteCounts, this.state.cannotSayCounts);
          this.setState({ profileLoader: false })
        }
        else if (response.status === "Failure") {
          this.setState({ profileLoader: false })
          if (response.msg === "Candidate not present.") {
            this.props.history.push('/Candidate/All')
          }
          this.setState({ profileLoader: false })
        }
        else {
          this.setState({ profileLoader: false })
        }
      });
  }

  candidatePublicOpinion() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      candidate_id: this.state.candidateId,
      count: 0,
      user_id: localStorage.getItem('userId')
    }
    items('POST', requestedData, constants.candidatePublicOpinion)
      .then(response => {
        if (response.status === "Success" && response.data.length !== 0) {
          this.setState({ publicOpinionArray: response.data });
          this.setState({ publicOpinionLoader: false })
        }
        else if (response.status === "Failure") {
          this.setState({ publicOpinionLoader: false })
        }
        else {
          this.setState({ publicOpinionLoader: false })
        }
      });
  }

  candidateNewsArray() {
    if (this.state.value === 0) {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        party_id: this.state.candidateId,
        user_id: localStorage.getItem('userId'),
        search_type: 'candidate',
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
              this.setState({ post: response.data[0].news_text });
              this.setState({ activityLoader: false });
            }
            else {
              this.setState({ activityLoader: false });
            }
          }
          else if (response.status === "Failure") {
            this.setState({ activityLoader: false });
          }
          else {
            this.setState({ activityLoader: false });
          }
          this.setState({ activityLoader: false });
        });
    }
  }

  candidateElectionArray() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      candidate_id: this.state.candidateId
    }
    items('POST', requestedData, constants.candidateElectionsRecord)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ secondArray: response.data });
        }
        else if (response.status === "Failure") {
          this.setState({ secondArray: [] });
        }
        else {
          this.setState({ secondArray: [] });
        }
      });
  }

  candidateCriminalSection() {
    this.setState({ criminalRecordArray: { 'charges_convicted': [], 'charges_framed': [], 'cognizance_only': [] } })
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      candidate_id: this.state.candidateId,
    }
    items('POST', requestedData, constants.candidateCriminalSection)
      .then(response => {
        if (response.status === "Success" && response.data.length !== 0) {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].criminal_record_type === 'Charges Convicted') {
              this.state.criminalRecordArray.charges_convicted.push(response.data[i]);
            }
            else if (response.data[i].criminal_record_type === 'Charges Framed') {
              this.state.criminalRecordArray.charges_framed.push(response.data[i]);
            }
            else {
              this.state.criminalRecordArray.cognizance_only.push(response.data[i]);
            }
          }
          this.setState({ criminalRecordArray: this.state.criminalRecordArray });
          this.setState({ criminalLoader: false })
        }
        else if (response.status === "Failure") {
          this.setState({ criminalLoader: false })
        }
        else {
          this.setState({ criminalLoader: false })
        }
      });
  }

  handleUpVoteIncrement = () => {
    if (this.isUser()) {
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
      }
    }
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }

  handleDownVoteIncrement = () => {
    if (this.isUser()) {
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
              this.statusSubmitCall();
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

              this.statusSubmitCall();
            })
          })
        })
      }
    }
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }

  handleCantSay = () => {
    if (this.isUser()) {
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
      }
    }
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }

  handleCandidateComment = (e) => {
    const encode = e.target.value
    this.setState({ publicOpinionText: e.target.value }, function () {
      this.setState({ userComment: { ...this.state.userComment, opinion_desc: encode } }, function () {
      })
    })

  }

  handleAddComment = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (this.state.userComment.opinion_desc.trim() === "" || this.state.userComment.opinion_desc.trim() === null) {
        this.setState({ commentError: true })
        setTimeout(() => {
          this.setState({ commentError: false })
        }, 4000)
      }
      else {
        this.setState({ publicComment: true })
        this.setState({ userComment: { ...this.state.userComment, opinion_desc: encodeURI(this.state.userComment.opinion_desc) } }, function () {
          items('POST', this.state.userComment, constants.userComment)
            .then(response => {
              if (response.status === "Success") {
                this.setState({ publicOpinionText: '' });
                this.setState({})
                this.candidatePublicOpinion();
                this.setState({ userComment: { ...this.state.userComment, opinion_desc: "" } })
                this.setState({ publicOpinionText: '' })
                this.setState({ publicComment: false })
              }
            })
        })
      }
    }
    else {
      this.setState({ errorMsg: 'Please Login to continue' });
      this.setState({ commentPublicError: true })
      setTimeout(() => {
        this.setState({ commentPublicError: false })
      }, 3000)
    }
  }

  handleDislike = (index, status, news_id) => {
    if (this.isUser()) {
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
          })
        })
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
    }
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }

  handleLike = (index, status, news_id) => {
    if (this.isUser()) {
      if (status === null || status === 0) {
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
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }


  userActivityLikeApi = () => {
    items("POST", this.state.userActivityLike, constants.activityLike)
      .then(response => {
        if (response.status === "Success") {
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      })
  }

  handleOpinionLike = (index, status, public_opinion_id) => {
    if (this.isUser()) {
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
    }
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }

  handleOpinionDislike = (index, status, public_opinion_id) => {
    if (this.isUser()) {
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
    }
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
  }

  userOpinionLikeApi = () => {
    items("POST", this.state.userOpinionLike, constants.userOpinionLike)
      .then(response => {
      })
  }

  handleOpenCommentBox = (news_id, news_text, comment_count, likes_count, dislikes_count, news_created_on, index) => {
    if (this.isUser()) {
      this.setState({ newCreatedOn: news_created_on })
      this.setState({ commentCount: comment_count })
      this.setState({ newsIndex: index })
      this.setState({ commentLikeCount: likes_count })
      this.setState({ commentDislikeCount: dislikes_count })
      this.setState({ dailogPostArray: news_text })
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
    else {
      this.setState({ hello: 'Please login to continue.' })
      this.setState({ commentError: true });
      setTimeout(() => {
        this.setState({ commentError: false });
      }, 2500);
    }
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
    if (this.state.commentNewsError === false) {
      this.setState({ activityComment: true })
      this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_desc: encodeURI(this.state.activityCommentText) } }, function () {
        items("POST", this.state.userCommentAdd, constants.userCommentAdd)
          .then(response => {
            if (response.status === "Success") {
              items("POST", this.state.userCommentRead, constants.userCommentView)
                .then(response => {
                  if (response.status === "Success") {
                    this.setState({ userCommentArray: response.data })
                    this.setState({ activityComment: false })
                    this.setState({ commentCount: this.state.commentCount + 1 })
                    this.candidateNewsArray();
                    this.scrollToBottom();
                    this.state.newsArray[this.state.newsIndex].comment_count = this.state.newsArray[this.state.newsIndex].comment_count + 1;
                    this.setState({ newsArray: this.state.newsArray });
                  }
                  else {
                    if (response.msg === 'News not present.') {
                      this.state.newsArray.splice(this.state.newsIndex, 1);
                      this.setState({ openComment: false });
                      this.setState({ newsArray: this.state.newsArray });
                      this.setState({ hello: "This activity/news is no longer available." });
                      this.setState({ commentError: true });
                      setTimeout(() => {
                        this.setState({ commentError: false });
                      }, 2500);
                    }
                  }
                })
              this.setState({ userCommentAdd: { ...this.state.userCommentAdd, comment_desc: "" } })
              this.setState({ activityCommentText: '' })
            }
          })
      })
    }
    else {
    }
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
                this.candidateNewsArray();
                this.setState({ commentCount: this.state.commentCount - 1 })
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

  handleDeleteOpen = (public_opinion_id, index) => {
    this.setState({ opiIndx: index });
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
          this.setState({ openDelOpi: false });
          this.state.publicOpinionArray.splice(this.state.opiIndx, 1);
          this.setState({ publicOpinionArray: this.state.publicOpinionArray });
          this.candidatePublicOpinion();
        }
      })
  }

  handlePostScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
    }
  }

  handlePublicScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (this.state.value === 0) {
        this.candidateNewsArray();
      }
      if (this.state.value === 1) {
        if (this.state.stopPublicCall === false) {
          this.setState({ recentPublicLoader: true })
          this.setState({ publicOpParameter: { ...this.state.publicOpParameter, count: this.state.publicOpParameter.count + 1 } }, function () {
            items('POST', this.state.publicOpParameter, constants.candidatePublicOpinion)
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
            items('POST', this.state.newsParameter, constants.candidateNews)
              .then(response => {
                if (response.status === "Success" && response.data.length !== 0 && response.data !== null) {
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
  }

  handleCandidateImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }

  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png';
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
            message={this.state.hello}
          />
          <ErrorSnackBar open={this.state.commentNewsError}
            onClose={this.handleCloseNews}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.hello}
          />
          <ErrorSnackBar open={this.state.commentPublicError}
            onClose={this.handleCloseNews}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.errorMsg}
          />
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 breadCrumbs fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'> Home</NavLink> / <NavLink className="breadCrumbs" to='/Candidate'> Candidates </NavLink>/ {this.state.candidate_name}</p>
            </Col>
          </Row>
        </Container>

        {this.state.loading === true ? <div className="marginTop80"><div className="circularLoading mt-5"><CircularProgress className={classes.circularLoader} /></div> </div> :
          <div className="candidateProfileContainer ml-auto mr-auto mt-5">
            {/* <----------Center-Content------------------> */}
            <Container fluid={true} className="marginTop80">
              <Row className="row_height">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                  <div className="flexCardContainer">
                    <div className="lightBackgroundColor flexCardProfile rounded paddingLeft10 paddingRight10 pt-3 pb-3 boxShadowNone">
                      {this.state.profileLoader ? <CircularProgress className={classes.circularLoader} /> : <div>
                        <div className="justify-content-center d-flex mb-3 mt-2">
                          <div className="d-flex justify-content-center">

                            <div className="d-flex justify-content-center">
                              <div className="imageUpload">
                                <Image
                                  className="imageCandidatePartyProfile"
                                  src={this.state.candidateImage === null || this.state.candidateImage === undefined || this.state.candidateImage === '' ? userOne : this.state.candidateImage}
                                  responsive
                                  onError={this.handleCandidateImgError}
                                >
                                </Image>
                              </div>
                              <div className="partyIconCandidateBadgeUser">
                                <Image
                                  className="circlePartyIcon"
                                  src={this.state.partyImage === null || this.state.partyImage === '' ? partyPic : this.state.partyImage}
                                  responsive
                                  onError={this.handlePartyImgError}
                                >
                                </Image>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="wordBreakAll">
                          <h6 className="fontWeight700 headingHeight">{this.state.candidate_name}</h6>
                          <small className="lineHeight14">
                            <p className="greyFontColor fontRegular13 mt-3 text-capitalize wordBreakAll">
                              {this.state.candidateParty}<br />
                              {this.state.candidateAddress.toLowerCase()}<br />
                              {this.state.candidateEducation}
                            </p>
                          </small>
                        </div>
                        <div className="likeDislikeBarContainer">
                          <div className="form-inline pl-0 mb-1 mt-4 d-flex justify-content-center">
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
                            <Typography variant="caption" className={classes.textStyle}>{this.state.downvoteCounts}</Typography>
                            <Typography variant="caption" className={classes.profileTextTwo}>{this.state.cannotSayCounts} &nbsp;
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
                                <span
                                  className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? this.state.status === 2 ? "cursorPointer fontBold10" : "cursorPointer fontRegular10" : null}
                                  onClick={this.handleCantSay}>Can't Say</span>
                              </Tooltip>
                            </Typography>
                            <div className="w-100 form-inline likeDislikeBar mt-1">
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
                                // disabled={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? false : true}
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
                                // disabled={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? false : true}
                                className={classes.buttonUserCandidate}
                                onClick={this.follow.bind(this, 'UNFOLLOW')}
                              >
                                Unfollow
                          </Button>
                            }
                          </div>
                        </div>
                      </div>
                      }
                    </div>
                  </div>
                  <div className="contentContainer mb-3 rounded boxShadowNone">
                    <Row>
                      <Col>
                        <div className="">
                          <AppBar position="static" className={classes.appBarStyle}>
                            <Tabs value={this.state.value} onChange={this.handleChange}
                              fullWidth={true}
                              classes={{
                                indicator: `${classes.indicator} w-auto`,
                              }}
                              scrollButtons="auto"
                              selected={true}
                            >
                              <Tab label="Activity" className={this.state.value === 0 ? classes.active_tab : classes.tabLabelStyle} />
                              <Tab label="Public Opinions" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle} />
                              <Tab label="Profile" className={this.state.value === 2 ? classes.active_tab : classes.tabLabelStyle} />
                              <Tab label="Assets & Liabilities" className={this.state.value === 3 ? classes.active_tab : classes.tabLabelStyle} />
                              <Tab label="Criminal Records" className={this.state.value === 4 ? classes.active_tab : classes.tabLabelStyle} />
                            </Tabs>
                          </AppBar>
                        </div>
                      </Col>
                    </Row>
                    {/* <--------------Activity-Tab---------------------------------> */}
                    {this.state.value === 0 && <div className="" >
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
                                          <span><img src={Dislike} alt={Dislike} width="15" /></span>
                                        </div>
                                        <div className="mr-1 ml-1 d-flex align-items-center">
                                          <span className="mr-2">{this.state.commentCount} </span>
                                          <span><img src={Comment} alt={Comment} width="15" /></span>
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
                                                    >
                                                      <img src={Delete} className="greyFontColor cursorPointer icon"
                                                        alt="delete" width="13" />
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
                                          className="fontRegular14 w-100 commentBoxInput"
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
                      <div>
                        {this.state.activityLoader ? <CircularProgress className={classes.circularLoader} /> : <div>
                          {this.state.secondArray.length === 0 && this.state.newsArray.length === 0 ?
                            <Row className="ml-1 mb-4 mt-4">
                              <div className="fontRegular16 text-center w-100"> No news available. </div>
                            </Row>
                            :
                            <Row className="ml-0 mr-0 mb-4 mt-4">
                              <Col xs={12} sm={12} md={12} lg={8} xl={8} className="">
                                <div className="commentShow pr-3 " onScroll={this.handlePostScroll}>
                                  {this.state.newsArray.length === 0 ? <div className="fontRegular16"> No news available. </div> :
                                    <div>
                                      {this.state.newsArray.map((item, index) => {
                                        return (
                                          <div>
                                            {item.post_type === 'post' ?
                                              <div className="mt-3">
                                                <div className="text-left pl-0 greyFontColor fontSemiBold13 mb-2 wordBreak "
                                                ><strong>{item.news_title}</strong></div>
                                                <div className="text-left greyFontColor fontRegular12 mb-2 wordBreak ql-editor p-0"
                                                  dangerouslySetInnerHTML={{ __html: item.news_text }}>
                                                </div>
                                                <div className="postCommentLike form-inline pl-2 pr-2 commentTrayBackground">
                                                  <div className="form-inline">
                                                    <p className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
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
                                                          className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} alt="candidate" height="15" width="15"
                                                        />
                                                      </Tooltip>
                                                    </p>
                                                    <p className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
                                                      <span className="likesCount ml-2 mr-1">{item.dislikes_count}</span>
                                                      {item.status === 0 ?
                                                        <Tooltip
                                                          placement="top"
                                                          TransitionComponent={Zoom}
                                                          title={
                                                            <React.Fragment>
                                                              <div className="fontRegular14">Disliked </div>
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
                                                          <img src={Disliked}
                                                            onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                            className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                            alt="candidate" height="15" width="15"
                                                          />
                                                        </Tooltip> :
                                                        <Tooltip
                                                          placement="top"
                                                          TransitionComponent={Zoom}
                                                          title={
                                                            <React.Fragment>
                                                              <div className="fontRegular14">Dislike post</div>
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
                                                          <img src={Dislike}
                                                            onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                            className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                            alt="candidate" height="18" width="18"
                                                          /></Tooltip>}
                                                    </p>
                                                    <p className="fontRegular12 greyFontColor d-flex align-self-center mt-auto mb-auto">
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
                                                          {this.handleOpenCommentBox.bind(this, item.news_id, item.news_text, item.comment_count, item.likes_count, item.dislikes_count, item.news_created_on, index)} className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}
                                                          alt="candidate" height="15" width="15"
                                                        />
                                                      </Tooltip>
                                                    </p>
                                                    <div className="ml-2 form-inline" onClick={this.getTheValue.bind(this, item.news_text)}>
                                                      <FacebookShareButton
                                                        url={`https://devvec.apnaneta.com${this.state.url1}`}
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
                                                        url={`https://devvec.apnaneta.com${this.state.url1}`}
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
                                              :
                                              <div className="mt-3 row">
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                                                  <div className="">
                                                    <div>
                                                      <div className="fontSemiBold14 text-left mb-2 wordBreakAll" dangerouslySetInnerHTML={{ __html: item.news_text }}></div>
                                                      <fieldset id={`group${index}`}>
                                                        {item.pollanswer.map((itemAnswer, indexAnswer) => {
                                                          return (
                                                            <div className="form-inline">
                                                              <div class="radio mr-2">
                                                                <input type="radio" name={`group${index}`} value={itemAnswer.vote_flag === null || itemAnswer.vote_flag === 0 ? 1 : 0} checked={itemAnswer.vote_flag === 1} />
                                                              </div>
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
                                                              className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} alt="candidate" height="15" width="15"
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
                                                                alt="candidate" height="15" width="15"
                                                              /> :
                                                              <img src={Dislike}
                                                                onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                                className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                                alt="candidate" height="18" width="18"
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
                                                              alt="candidate" height="15" width="15"
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
                                {this.state.secondArray.length === 0 ? <div className="fontRegular16"> No records available. </div> :
                                  <div>
                                    {this.state.secondArray.map(function (item, index) {
                                      return (
                                        <div className="electionDetailContainer mr-5 p-2 text-left">
                                          <span> <span className="fontSemiBold12 greyFontColor"> Election Name :</span> <span className="contentElection greyFontColor">{item.election_name}</span>
                                            <br />
                                            <span className="fontSemiBold12 greyFontColor">Constituencies :</span>  <span className="contentElection greyFontColor">{item.constituency_name}</span>
                                            <br />
                                            <span className="fontSemiBold12 greyFontColor">Party :</span>  <span className="contentElection greyFontColor">{item.party_name}</span>
                                            <br />
                                            <span className="fontSemiBold12 greyFontColor">Status :</span>  <span className="contentElection greyFontColor">{item.score === null || item.score === '' ? 'Pending' : item.score}</span>
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
                    </div>
                    }
                    { /* <----------------public-opinion-tab-------------------------------------------------> */}
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
                      </Dialog>
                      <div>
                        {localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') === null ? null :
                          <Row className="mb-3 ml-0 mr-0">
                            <div className="opinionImageContainer">
                              <div className="imageUploadOpinion">
                                <img src={this.state.user_profile === null || this.state.user_profile === undefined || this.state.user_profile === '' ? Publicuser : this.state.user_profile}
                                  alt="candidate" className='imageOpinion'
                                  onError={this.handleCandidateImgError}
                                />
                              </div>
                              <div className="fontBold12 greyFontColor mt-2 text-capitalize">{this.state.user_name}</div>
                            </div>
                            <div className="commentSection">
                              <div className="">
                                <textarea
                                  type="text"
                                  ref=""
                                  className="form-control fontRegular14 commentTextEdit"
                                  onChange={this.handleCandidateComment}
                                  value={this.state.publicOpinionText}
                                ></textarea>
                              </div>
                              <div className="text-right">
                                <MuiThemeProvider theme={theme}>
                                  <Button
                                    onClick={this.handleAddComment}
                                    className={classes.buttonComment}
                                    disabled={this.state.publicComment ? true : false}
                                  >
                                    Comment
                                  </Button>
                                </MuiThemeProvider>
                              </div>
                            </div>
                          </Row>
                        }
                      </div>
                      <div>
                        {this.state.publicOpinionLoader ? <CircularProgress className={classes.circularLoader} /> : <div>
                          {this.state.publicOpinionArray === null || this.state.publicOpinionArray.length === 0 ? <div className="fontRegular16 mb-5 mt-5"> No public opinion available.</div> :
                            <div>
                              {this.state.publicOpinionArray.map((item, index) => {
                                return (
                                  <Row className="mt-3 ml-0 mr-0 publicOpinionComment">
                                    <div className="opinionImageContainer">
                                      <div className="imageUploadOpinion">
                                        <img src={item.user_img_url === null || item.user_img_url === undefined || item.user_img_url === '' ? Publicuser : item.user_img_url}
                                          alt="candidate" className='imageOpinion'
                                        />
                                      </div>
                                      <div className="fontBold12 greyFontColor text-capitalize user_name_truncate">{item.user_name}</div>
                                    </div>
                                    <div className="commentSection border-0 d-flex flex-column align-self-end">
                                      <p className="text-left fontRegular12 greyFontColor wordBreak preWrapWhiteSpace mb-2">
                                        {decodeURI(item.opinion_desc)}
                                      </p>
                                      <div className="fontRegular12 lightBackgroundColor form-inline commentLikeDislikeBox boxShadowNone">
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
                                                alt="candidate" height="15" width="15"
                                              />
                                            </Tooltip>
                                          </div>&nbsp; &nbsp;
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
                                                alt="candidate" height="16" width="16"
                                              />
                                            </Tooltip>
                                          </div>&nbsp;
                                        <div className="remove1box">
                                            {this.state.user_name === item.user_name ? <div className="greyFontColor cursorPointer remove1">
                                              <Tooltip
                                                placement="top" S
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
                                                <img onClick={this.handleDeleteOpen.bind(this, item.public_opinion_id, index)}
                                                  src={Delete} className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? "greyFontColor cursorPointer icon" : "greyFontColor  icon"}
                                                  alt="candidate" width="13"
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
                              })}
                              <div>
                                {this.state.recentPublicLoader ? <CircularProgress className={classes.recentPublicLoader} /> : null}
                              </div>
                            </div>
                          }
                        </div>}
                      </div>
                    </div>
                    }

                    {/* <-------------------Profile-Tab--------------------> */}

                    {this.state.value === 2 &&
                      <div className="">
                        {this.state.profileLoader ? <CircularProgress className={classes.circularLoader} /> : <div>
                          <Row className="mt-4">
                            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="ml-auto mr-auto profileBorder">
                              <div className="text-left w-100 mt-4 pr-3 pl-3 w-80">
                                <table className="w-100">
                                  <tr>
                                    <td className="fontSemiBold12">
                                      Name :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].candidate_name === '' ? <div>  - </div>
                                        :
                                        <div>
                                          {this.state.candidateProfileData[0].candidate_name}
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fontSemiBold12">
                                      {this.state.candidateProfileData[0].candidate_relation} :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].candidate_relation_name === '' ? <div>  - </div>
                                        :
                                        <div>
                                          {this.state.candidateProfileData[0].candidate_relation_name}
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fontSemiBold12">
                                      D.O.B :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].candidate_DOB === '' || this.state.candidateProfileData[0].candidate_DOB === '0000-00-00' ? <div>  - </div>
                                        :
                                        <div>
                                          {this.state.candidateProfileData[0].candidate_DOB}
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fontSemiBold12">
                                      Age :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].Age}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fontSemiBold12">
                                      Address :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].candidate_address === '' ? <div>  - </div>
                                        :
                                        <div>
                                          {this.state.candidateProfileData[0].candidate_address}
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fontSemiBold12">
                                      Email :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].candidate_email === '' ? <div>  - </div>
                                        :
                                        <div>
                                          {this.state.candidateProfileData[0].candidate_email}
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fontSemiBold12">
                                      Mobile :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].candidate_phone_no === '' ? <div>  - </div>
                                        :
                                        <div>
                                          {this.state.candidateProfileData[0].candidate_phone_no}
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fontSemiBold12">
                                      Profession :
                                    </td>
                                    <td className="fontRegular12">
                                      {this.state.candidateProfileData[0].candidate_profession === '' ? <div>  - </div>
                                        :
                                        <div>
                                          {this.state.candidateProfileData[0].candidate_profession}
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="ml-auto mr-auto">
                              <div className="text-center w-100 mt-4 mb-4">
                                <Row className="">
                                  <Col xs={12} sm={12} md={12} lg={4} xl={4} className="">
                                    <div className="">
                                      <Doughnut data={dataDoughnut} height={120} width={120} options={optionsThree} />
                                    </div>
                                  </Col>
                                  <Col xs={12} sm={12} md={12} lg={4} xl={4} >
                                    <div className="">
                                      <Pie data={dataPieOne} height={120} width={120} options={optionsOne} />
                                    </div>
                                  </Col>
                                  <Col xs={12} sm={12} md={12} lg={4} xl={4} >
                                    <div className="">
                                      <Pie data={dataPieTwo} height={120} width={120} options={optionsTwo} />
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <Row className="">
                                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="">
                                  <div className="fontRegular12">
                                    <tabel className="w-100 text-left">
                                      <tr>
                                        <td>
                                          Movable Assets:
                                        </td>
                                        <td>
                                          &nbsp;{this.state.movableTotal}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Immovable Assets:
                                        </td>
                                        <td>
                                          &nbsp;{this.state.immovableTotal}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Liabilities:
                                        </td>
                                        <td>
                                          &nbsp;{this.state.liabilityTotal}
                                        </td>
                                      </tr>
                                    </tabel>
                                  </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="">
                                  <div className="fontRegular12">
                                    <tabel className="w-100 text-left">
                                      <tr>
                                        <td>
                                          Election Participated:
                                        </td>
                                        <td>
                                          &nbsp;{this.state.participated}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Election Won:
                                        </td>
                                        <td>
                                          &nbsp;{this.state.won}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Election Lost:
                                        </td>
                                        <td>
                                          &nbsp;{this.state.lost}
                                        </td>
                                      </tr>
                                    </tabel>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12}>

                              <div className="text-left ml-3 mr-3 mt-4 mb-4">
                                {this.state.about === null || this.state.about === '' || this.state.about === undefined ?
                                  null :
                                  <div>
                                    <div className="fontRegular14 greyFontColor">
                                      About
                                    </div>
                                    <hr className="bg-dark" />
                                    <div className="fontRegular12 ql-editor p-0" dangerouslySetInnerHTML={{ __html: this.state.about }}>
                                    </div>
                                  </div>
                                }

                                {this.state.educationArray === null || this.state.educationArray.length === 0 || this.state.educationArray === undefined || this.state.educationArray[0] === undefined || this.state.educationArray[0] === '' ?
                                  null :
                                  <div>
                                    <div className="fontRegular14 greyFontColor mt-5">
                                      Education
                                    </div>
                                    <hr className="bg-dark" />
                                    <div className="fontRegular12">
                                      {this.state.educationArray.map(function (item, index) {
                                        return (
                                          <div className="greyFontColor">
                                            {item === '' || item === null || item === undefined ? null :
                                              <span>
                                                <span className="fontRegular14">+</span> {item}
                                              </span>
                                            }
                                            <br />
                                          </div>
                                        )
                                      }
                                      )}
                                    </div>
                                  </div>
                                }
                                {this.state.PolliticalArray === null || this.state.PolliticalArray.length === 0 || this.state.PolliticalArray === undefined || this.state.PolliticalArray[0] === undefined || this.state.PolliticalArray[0] === '' || this.state.PolliticalArray[0] === null ?
                                  null :
                                  <div>
                                    <div className="fontRegular14 greyFontColor mt-5">
                                      Political Career
                                    <hr className="bg-dark" />
                                    </div>
                                    <div className="greyFontColor fontRegular12">
                                      {this.state.PolliticalArray.map(function (item, index) {
                                        return (
                                          <div>
                                            {item === '' || item === null || item === undefined ? null :
                                              <span className="greyFontColor">
                                                <span className="fontRegular14">+</span> {item}
                                              </span>
                                            }
                                            <br />
                                          </div>
                                        )
                                      }
                                      )}
                                    </div>

                                  </div>
                                }
                                {this.state.candidateProfileData[0].candidate_religious_views === null || this.state.candidateProfileData[0].candidate_religious_views === '' ? null
                                  :
                                  <div>
                                    <div className="fontRegular14 greyFontColor mt-5">
                                      Religious View
                                    <hr className="bg-dark" />
                                    </div>
                                    <div className="fontRegular12 greyFontColor">
                                      <span className="fontRegular14">+</span> {this.state.candidateProfileData[0].candidate_religious_views}
                                    </div>
                                  </div>
                                }
                              </div>
                            </Col>
                          </Row>
                        </div>}
                      </div>
                    }

                    {/* <---------Assets-&-Liabilities-Tab-----------------> */}

                    {this.state.value === 3 &&
                      <div>
                        {this.state.assetsLoader ? <CircularProgress className={classes.circularLoader} /> : <div className="assetsTabContainer">
                          <AppBar position="static" className={classes.appBarStyleNest} >
                            <Tabs
                              value={this.state.valueAssets}
                              onChange={this.handleAssetsChange}
                              fullWidth
                              classes={{
                                indicator: classes.indicator,
                                style: classes.style
                              }}
                            >
                              <Tab label="Movable Assets" className={classes.tabLabelStyleAssets} />
                              <Tab label="Immovable Assets" className={classes.tabLabelStyleAssetsImmovable} />
                              <Tab label="Liabilities" className={classes.tabLabelStyleAssetsLiabilities} />
                            </Tabs>
                          </AppBar>
                          {/* <------------Movable-Assets-------------------------> */}
                          <div className="assetFixedSize">
                            <div className="assetValueSize">
                              {this.state.valueAssets === 0 &&
                                <div className="">
                                  <Row>
                                    <Col xs={12}>
                                      <div className="lightBackgroundColor form-inline pt-3 pb-3 greyFontColor fontBold16 border-bottom">
                                        <div className="assetWidth">Self</div>
                                        <div className="assetWidth">Spouse</div>
                                        <div className="assetWidth">Dependent1</div>
                                        <div className="assetWidth">Dependent2</div>
                                        <div className="assetWidth">Dependent3</div>
                                      </div>

                                      {this.state.movable.cash.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Cash
                                            {this.state.showMovable === 'cash' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'cash')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'cash')}></i>
                                            }
                                          </div>

                                          {this.state.showMovable === 'cash' ?
                                            <div>
                                              {this.state.movable.cash.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.cash.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.cash[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline pt-3 pb-2 border-bottom">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">{this.state.movable.cash[index].asset_self[indx].self_amount}</div>
                                                                <span className="fontRegular12">{this.state.movable.cash[index].asset_self[indx].self_desc}</span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">{this.state.movable.cash[index].asset_spouse[indx].spouse_amount}</div>
                                                                <span className="fontRegular12">{this.state.movable.cash[index].asset_spouse[indx].spouse_desc}</span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">{this.state.movable.cash[index].asset_depend1[indx].depend1_amount}</div>
                                                                <span className="fontRegular12">{this.state.movable.cash[index].asset_depend1[indx].depend1_desc}</span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">{this.state.movable.cash[index].asset_depend2[indx].depend2_amount}</div>
                                                                <span className="fontRegular12">{this.state.movable.cash[index].asset_depend2[indx].depend2_desc}</span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">{this.state.movable.cash[index].asset_depend3[indx].depend3_amount}</div>
                                                                <span className="fontRegular12">{this.state.movable.cash[index].asset_depend3[indx].depend3_desc}</span>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            :
                                            null}
                                        </div>
                                      }
                                      {this.state.movable.shares.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Deposits in bank Financial Institution and,Non Banking Financial Companies
                                            {this.state.showMovable === 'shares' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'shares')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'shares')}></i>
                                            }
                                          </div>

                                          {this.state.showMovable === 'shares' ?
                                            <div>

                                              {this.state.movable.shares.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor  border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.shares.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.shares[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.shares[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.shares[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.shares[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.shares[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.shares[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.shares[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.shares[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.movable.shares[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.shares[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.shares[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            :
                                            null}
                                        </div>
                                      }
                                      {this.state.movable.bonds.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Bonds, Debentures and Shares in companies
                                            {this.state.showMovable === 'bonds' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'bonds')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'bonds')}></i>
                                            }
                                          </div>
                                          {this.state.showMovable === 'bonds' ?
                                            <div>
                                              {this.state.movable.bonds.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.bonds.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.bonds[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.bonds[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.bonds[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.bonds[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.bonds[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.bonds[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.bonds[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.bonds[index].asset_depend2[indx].depend2_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.bonds[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.bonds[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.bonds[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.movable.postal.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            NSS, Postal Savings etc
                                            {this.state.showMovable === 'postal' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'postal')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'postal')}></i>
                                            }
                                          </div>
                                          {this.state.showMovable === 'postal' ?
                                            <div>
                                              {this.state.movable.postal.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.postal.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.postal[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.postal[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.postal[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.postal[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.postal[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.postal[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.postal[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.postal[index].asset_depend2[indx].depend2_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.postal[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.postal[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.postal[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.movable.insurance.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            LIC or other insurance Policies
                                            {this.state.showMovable === 'insurance' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'insurance')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'insurance')}></i>
                                            }
                                          </div>
                                          {this.state.showMovable === 'insurance' ?
                                            <div>
                                              {this.state.movable.insurance.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.insurance.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.insurance[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.insurance[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.insurance[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.insurance[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.insurance[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.insurance[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.insurance[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.insurance[index].asset_depend2[indx].depend2_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.insurance[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.insurance[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.insurance[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.movable.personalLoans.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Personal loans/advance given
                                            {this.state.showMovable === 'personalLoans' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'personalLoans')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'personalLoans')}></i>
                                            }
                                          </div>
                                          {this.state.showMovable === 'personalLoans' ?
                                            <div>
                                              {this.state.movable.personalLoans.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.personalLoans.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.personalLoans[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.personalLoans[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.personalLoans[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.personalLoans[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.personalLoans[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.personalLoans[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.personalLoans[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.personalLoans[index].asset_depend2[indx].depend2_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.personalLoans[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.personalLoans[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.personalLoans[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.movable.vehicle.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Motor Vehicles (details of make, etc.)
                                            {this.state.showMovable === 'vehicle' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'vehicle')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'vehicle')}></i>
                                            }
                                          </div>
                                          {this.state.showMovable === 'vehicle' ?
                                            <div>
                                              {this.state.movable.vehicle.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.vehicle.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.vehicle[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.vehicle[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.vehicle[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.vehicle[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.vehicle[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.vehicle[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.vehicle[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.vehicle[index].asset_depend2[indx].depend2_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.vehicle[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.vehicle[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.vehicle[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.movable.jewellery.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Jewellery (give details weight value)
                                            {this.state.showMovable === 'jewellery' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'jewellery')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'jewellery')}></i>
                                            }
                                          </div>
                                          {this.state.showMovable === 'jewellery' ?
                                            <div>
                                              {this.state.movable.jewellery.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.jewellery.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.jewellery[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.jewellery[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.jewellery[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.jewellery[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.jewellery[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.jewellery[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.jewellery[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.jewellery[index].asset_depend2[indx].depend2_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.jewellery[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.jewellery[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.jewellery[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.movable.other.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Other assets, such as values of claims / interests
                                            {this.state.showMovable === 'other' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'other')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpMovable.bind(this, 'other')}></i>
                                            }
                                          </div>
                                          {this.state.showMovable === 'other' ?
                                            <div>
                                              {this.state.movable.other.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.movable.other.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.movable.other[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.other[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.other[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.other[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.movable.other[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.other[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.other[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.other[index].asset_depend2[indx].depend2_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.other[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.movable.other[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.movable.other[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.movable.cash.length === 0 && this.state.movable.shares.length === 0 && this.state.movable.bonds.length === 0
                                        && this.state.movable.postal.length === 0 && this.state.movable.insurance.length === 0 && this.state.movable.personalLoans.length === 0
                                        && this.state.movable.vehicle.length && this.state.movable.jewellery.length && this.state.movable.other.length ?
                                        <div className="d-flex justify-content-center align-items-center mt-5 fontSemiBold16">No Record Found.</div> : null}
                                    </Col>
                                  </Row>
                                </div>
                              }
                              {/* <------------Immovable-Assets-------------------------> */}
                              {this.state.valueAssets === 1 && <div className="">
                                <Row>
                                  <Col xs={12}>
                                    <div className="lightBackgroundColor form-inline pt-3 pb-3 greyFontColor fontBold16 border-bottom">
                                      <div className="assetWidth">Self</div>
                                      <div className="assetWidth">Spouse</div>
                                      <div className="assetWidth">Dependent1</div>
                                      <div className="assetWidth">Dependent2</div>
                                      <div className="assetWidth">Dependent3</div>
                                    </div>
                                    {this.state.immovable.agricultural.length === 0 && this.state.immovable.nonAgricultural.length === 0 &&
                                      this.state.immovable.buildings.length === 0 && this.state.immovable.houses.length === 0
                                      && this.state.immovable.commBuildings.length === 0 && this.state.immovable.resiBuildings.length === 0 && this.state.immovable.others.length === 0 ?
                                      <div className="d-flex justify-content-center align-items-center mt-5 fontSemiBold16">No Record Found.</div> : null}
                                      {this.state.immovable.agricultural.length === 0 ? null :
                                      <div>
                                        <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                          Agriculture Land
                                          {this.state.showImmovable === 'agri' ?
                                            <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'agri')}></i>
                                            :
                                            <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'agri')}></i>
                                          }
                                        </div>
                                        {this.state.showImmovable === 'agri' ?
                                          <div>
                                            {this.state.immovable.agricultural.length === 0 ?
                                              <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                              </div>
                                              :
                                              <div>
                                                {this.state.immovable.agricultural.map((item, index) => {
                                                  return (
                                                    <div className="greyFontColor">
                                                      {this.state.immovable.agricultural[index].asset_self.map((subValue, indx) => {
                                                        return (
                                                          <div className="form-inline border-bottom pt-3 pb-2">
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.agricultural[index].asset_self[indx].self_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.agricultural[index].asset_self[indx].self_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.agricultural[index].asset_spouse[indx].spouse_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.agricultural[index].asset_spouse[indx].spouse_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.agricultural[index].asset_depend1[indx].depend1_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.agricultural[index].asset_depend1[indx].depend1_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.agricultural[index].asset_depend2[indx].depend2_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.agricultural[index].asset_depend2[indx].depend2_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.agricultural[index].asset_depend3[indx].depend3_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.agricultural[index].asset_depend3[indx].depend3_desc}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            }
                                          </div>
                                          :
                                          null}
                                      </div>
                                    }
                                    {this.state.immovable.nonAgricultural.length === 0 ? null :
                                      <div>
                                        <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                          Non-Agricultural Land
                                          {this.state.showImmovable === 'nonAgri' ?
                                            <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'nonAgri')}></i>
                                            :
                                            <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'nonAgri')}></i>
                                          }
                                        </div>
                                        {this.state.showImmovable === 'nonAgri' ?
                                          <div>
                                            {this.state.immovable.nonAgricultural.length === 0 ?
                                              <div className="form-inline pt-3 pb-3 greyFontColor  border-bottom">
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                              </div>
                                              :
                                              <div>
                                                {this.state.immovable.nonAgricultural.map((item, index) => {
                                                  return (
                                                    <div className="greyFontColor">
                                                      {this.state.immovable.nonAgricultural[index].asset_self.map((subValue, indx) => {
                                                        return (
                                                          <div className="form-inline border-bottom pt-3 pb-2">
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.nonAgricultural[index].asset_self[indx].self_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.nonAgricultural[index].asset_self[indx].self_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.nonAgricultural[index].asset_spouse[indx].spouse_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.nonAgricultural[index].asset_spouse[indx].spouse_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.nonAgricultural[index].asset_depend1[indx].depend1_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.nonAgricultural[index].asset_depend1[indx].depend1_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.nonAgricultural[index].asset_depend2[indx].depend2_amount}
                                                              </div>

                                                              <div className="fontRegular12">
                                                                {this.state.immovable.nonAgricultural[index].asset_depend2[indx].depend2_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.nonAgricultural[index].asset_depend3[indx].depend3_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.nonAgricultural[index].asset_depend3[indx].depend3_desc}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            }
                                          </div>
                                          :
                                          null}
                                      </div>
                                    }
                                    {this.state.immovable.buildings.length === 0 ? null :
                                      <div>
                                        <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                          Building
                                          {this.state.showImmovable === 'buildings' ?
                                            <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'buildings')}></i>
                                            :
                                            <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'buildings')}></i>
                                          }
                                        </div>
                                        {this.state.showImmovable === 'buildings' ?
                                          <div>
                                            {this.state.immovable.buildings.length === 0 ?
                                              <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                              </div>
                                              :
                                              <div>
                                                {this.state.immovable.buildings.map((item, index) => {
                                                  return (
                                                    <div className="greyFontColor">
                                                      {this.state.immovable.buildings[index].asset_self.map((subValue, indx) => {
                                                        return (
                                                          <div className="form-inline border-bottom pt-3 pb-2">
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.buildings[index].asset_self[indx].self_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.buildings[index].asset_self[indx].self_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.buildings[index].asset_spouse[indx].spouse_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.buildings[index].asset_spouse[indx].spouse_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.buildings[index].asset_depend1[indx].depend1_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.buildings[index].asset_depend1[indx].depend1_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.buildings[index].asset_depend2[indx].depend2_amount}
                                                              </div>

                                                              <div className="fontRegular12">
                                                                {this.state.immovable.buildings[index].asset_depend2[indx].depend2_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.buildings[index].asset_depend3[indx].depend3_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.buildings[index].asset_depend3[indx].depend3_desc}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            }
                                          </div>
                                          :
                                          null
                                        }
                                      </div>
                                    }
                                    {this.state.immovable.houses.length === 0 ? null :
                                      <div>

                                        <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                          Houses
                                          {this.state.showImmovable === 'houses' ?
                                            <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'houses')}></i>
                                            :
                                            <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'houses')}></i>
                                          }
                                        </div>
                                        {this.state.showImmovable === 'houses' ?
                                          <div>
                                            {this.state.immovable.houses.length === 0 ?
                                              <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                              </div>
                                              :
                                              <div>
                                                {this.state.immovable.houses.map((item, index) => {
                                                  return (
                                                    <div className="greyFontColor">
                                                      {this.state.immovable.houses[index].asset_self.map((subValue, indx) => {
                                                        return (
                                                          <div className="form-inline border-bottom pt-3 pb-2">
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.houses[index].asset_self[indx].self_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.houses[index].asset_self[indx].self_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.houses[index].asset_spouse[indx].spouse_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.houses[index].asset_spouse[indx].spouse_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.houses[index].asset_depend1[indx].depend1_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.houses[index].asset_depend1[indx].depend1_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.houses[index].asset_depend2[indx].depend2_amount}
                                                              </div>

                                                              <div className="fontRegular12">
                                                                {this.state.immovable.houses[index].asset_depend2[indx].depend2_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.houses[index].asset_depend3[indx].depend3_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.houses[index].asset_depend3[indx].depend3_desc}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            }
                                          </div>
                                          :
                                          null
                                        }
                                      </div>
                                    }
                                    {this.state.immovable.commBuildings.length === 0 ? null :
                                      <div>
                                        <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                          Commercial Buildings
                                          {this.state.showImmovable === 'commBuildings' ?
                                            <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'commBuildings')}></i>
                                            :
                                            <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'commBuildings')}></i>
                                          }
                                        </div>
                                        {this.state.showImmovable === 'commBuildings' ?
                                          <div>
                                            {this.state.immovable.commBuildings.length === 0 ?
                                              <div className="form-inline pt-3 pb-3 greyFontColor  border-bottom">
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                              </div>
                                              :
                                              <div>
                                                {this.state.immovable.commBuildings.map((item, index) => {
                                                  return (
                                                    <div className="greyFontColor">
                                                      {this.state.immovable.commBuildings[index].asset_self.map((subValue, indx) => {
                                                        return (
                                                          <div className="form-inline border-bottom pt-3 pb-2">
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.commBuildings[index].asset_self[indx].self_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.commBuildings[index].asset_self[indx].self_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.commBuildings[index].asset_spouse[indx].spouse_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.commBuildings[index].asset_spouse[indx].spouse_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.commBuildings[index].asset_depend1[indx].depend1_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.commBuildings[index].asset_depend1[indx].depend1_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.commBuildings[index].asset_depend2[indx].depend2_amount}
                                                              </div>

                                                              <div className="fontRegular12">
                                                                {this.state.immovable.commBuildings[index].asset_depend2[indx].depend2_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.commBuildings[index].asset_depend3[indx].depend3_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.commBuildings[index].asset_depend3[indx].depend3_desc}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            }
                                          </div>
                                          :
                                          null}

                                      </div>
                                    }

                                    {this.state.immovable.resiBuildings.length === 0 ? null :
                                      <div>
                                        <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                          Residential Buildings
                                          {this.state.showImmovable === 'resiBuildings' ?
                                            <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'resiBuildings')}></i>
                                            :
                                            <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'resiBuildings')}></i>
                                          }
                                        </div>
                                        {this.state.showImmovable === 'resiBuildings' ?
                                          <div>
                                            {this.state.immovable.resiBuildings.length === 0 ?
                                              <div className="form-inline pt-3 pb-3 greyFontColor  border-bottom">
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                              </div>
                                              :
                                              <div>
                                                {this.state.immovable.resiBuildings.map((item, index) => {
                                                  return (
                                                    <div className="greyFontColor">
                                                      {this.state.immovable.resiBuildings[index].asset_self.map((subValue, indx) => {
                                                        return (
                                                          <div className="form-inline border-bottom pt-3 pb-2">
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.resiBuildings[index].asset_self[indx].self_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.resiBuildings[index].asset_self[indx].self_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.resiBuildings[index].asset_spouse[indx].spouse_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.resiBuildings[index].asset_spouse[indx].spouse_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.resiBuildings[index].asset_depend1[indx].depend1_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.resiBuildings[index].asset_depend1[indx].depend1_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.resiBuildings[index].asset_depend2[indx].depend2_amount}
                                                              </div>

                                                              <div className="fontRegular12">
                                                                {this.state.immovable.resiBuildings[index].asset_depend2[indx].depend2_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.resiBuildings[index].asset_depend3[indx].depend3_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.resiBuildings[index].asset_depend3[indx].depend3_desc}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            }
                                          </div>
                                          :
                                          null}

                                      </div>
                                    }

                                    {this.state.immovable.others.length === 0 ? null :
                                      <div>
                                        <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                          Others
                                          {this.state.showImmovable === 'others' ?
                                            <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'others')}></i>
                                            :
                                            <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpImmovable.bind(this, 'others')}></i>
                                          }
                                        </div>
                                        {this.state.showImmovable === 'others' ?
                                          <div>
                                            {this.state.immovable.others.length === 0 ?
                                              <div className="form-inline pt-3 pb-3 greyFontColor  border-bottom">
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                                <div className="assetWidth">-</div>
                                              </div>
                                              :
                                              <div>
                                                {this.state.immovable.others.map((item, index) => {
                                                  return (
                                                    <div className="greyFontColor">
                                                      {this.state.immovable.others[index].asset_self.map((subValue, indx) => {
                                                        return (
                                                          <div className="form-inline border-bottom pt-3 pb-2">
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.others[index].asset_self[indx].self_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.others[index].asset_self[indx].self_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.others[index].asset_spouse[indx].spouse_amount}
                                                              </div>
                                                              <span className="fontRegular12">
                                                                {this.state.immovable.others[index].asset_spouse[indx].spouse_desc}
                                                              </span>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.others[index].asset_depend1[indx].depend1_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.others[index].asset_depend1[indx].depend1_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.others[index].asset_depend2[indx].depend2_amount}
                                                              </div>

                                                              <div className="fontRegular12">
                                                                {this.state.immovable.others[index].asset_depend2[indx].depend2_desc}
                                                              </div>
                                                            </div>
                                                            <div className="assetWidth">
                                                              <div className="fontRegular14">
                                                                {this.state.immovable.others[index].asset_depend3[indx].depend3_amount}
                                                              </div>
                                                              <div className="fontRegular12">
                                                                {this.state.immovable.others[index].asset_depend3[indx].depend3_desc}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            }
                                          </div>
                                          :
                                          null}

                                      </div>
                                    }
                                  </Col>
                                </Row>
                              </div>
                              }

                              {/* <---------------Liability-----------------------> */}
                              {this.state.valueAssets === 2 &&
                                <div className="movableAssetsContainer">
                                  <Row>
                                    <Col xs={12}>
                                      <div className="lightBackgroundColor form-inline pt-3 pb-3 greyFontColor fontBold16 border-bottom">
                                        <div className="assetWidth">Self</div>
                                        <div className="assetWidth">Spouse</div>
                                        <div className="assetWidth">Dependent1</div>
                                        <div className="assetWidth">Dependent2</div>
                                        <div className="assetWidth">Dependent3</div>
                                      </div>

                                      {this.state.liabilities.loans.length === 0 && this.state.liabilities.anyOther.length === 0 && this.state.liabilities.houses.length === 0 &&
                                        this.state.liabilities.govAccomodation.length === 0 && this.state.liabilities.supplyOfWater.length === 0 && this.state.liabilities.supplyOfELec.length === 0 &&
                                        this.state.liabilities.telephones.length === 0 && this.state.liabilities.supplyOfTrans.length === 0 && this.state.liabilities.incomeTax.length === 0 &&
                                        this.state.liabilities.serviceTax.length === 0 && this.state.liabilities.wealthTax.length === 0 && this.state.liabilities.propertyTax.length === 0 &&
                                        this.state.liabilities.salesTax.length === 0 && this.state.liabilities.anyOtherDues.length === 0 && this.state.liabilities.grandTotalDue.length === 0 &&
                                        this.state.liabilities.grandTotalLia.length === 0 && this.state.liabilities.loansIndividual.length === 0 && this.state.liabilities.disputeLia.length === 0 ?
                                        <div className="d-flex justify-content-center align-items-center mt-5 fontSemiBold16">No Record Found.</div> : null}


                                      {this.state.liabilities.loans.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Loans from banks / F/I
                                          {this.state.showLiability === 'loans' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'loans')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'loans')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'loans' ?
                                            <div>
                                              {this.state.liabilities.loans.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.loans.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.loans[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loans[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.loans[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loans[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.loans[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loans[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.loans[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loans[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.loans[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loans[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.loans[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }

                                      {this.state.liabilities.anyOther.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Any other liability
                                          {this.state.showLiability === 'liaOthers' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'liaOthers')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'liaOthers')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'liaOthers' ?
                                            <div>
                                              {this.state.liabilities.anyOther.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor  border-bottom">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.anyOther.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.anyOther[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOther[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.anyOther[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOther[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.anyOther[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOther[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.anyOther[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOther[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.anyOther[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOther[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.anyOther[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.houses.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Houses
                                          {this.state.showLiability === 'liaHouse' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'liaHouse')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'liaHouse')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'liaHouse' ?
                                            <div>
                                              {this.state.liabilities.houses.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.houses.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.houses[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.houses[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.houses[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.houses[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.houses[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.houses[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.houses[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.houses[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.houses[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.houses[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.houses[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.loansIndividual.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Loans due to Individual / Entity
                                          {this.state.showLiability === 'loansIndividual' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'loansIndividual')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'loansIndividual')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'loansIndividual' ?
                                            <div>
                                              {this.state.liabilities.loansIndividual.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.loansIndividual.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.loansIndividual[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loansIndividual[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.loansIndividual[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loansIndividual[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.loansIndividual[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loansIndividual[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.loansIndividual[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loansIndividual[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.loansIndividual[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.loansIndividual[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.loansIndividual[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.grandTotalLia.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Grand Total of Liabilities (as per affidavit)
                                          {this.state.showLiability === 'grandTotalLia' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'grandTotalLia')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'grandTotalLia')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'grandTotalLia' ?
                                            <div>
                                              {this.state.liabilities.grandTotalLia.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.grandTotalLia.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.grandTotalLia[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalLia[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.govAccomodation.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Dues to departments dealing with government accommodation
                                          {this.state.showLiability === 'govAccomodation' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'govAccomodation')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'govAccomodation')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'govAccomodation' ?
                                            <div>
                                              {this.state.liabilities.govAccomodation.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.govAccomodation.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.govAccomodation[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.govAccomodation[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.govAccomodation[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.govAccomodation[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.govAccomodation[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.govAccomodation[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.govAccomodation[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.govAccomodation[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.govAccomodation[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.govAccomodation[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.govAccomodation[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.supplyOfWater.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Dues to departments dealing with supply of water
                                          {this.state.showLiability === 'supplyOfWater' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'supplyOfWater')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'supplyOfWater')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'supplyOfWater' ?
                                            <div>
                                              {this.state.liabilities.supplyOfWater.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.supplyOfWater.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.supplyOfWater[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfWater[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.supplyOfELec.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Dues to departments dealing with supply of electricity
                                          {this.state.showLiability === 'supplyOfELec' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'supplyOfELec')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'supplyOfELec')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'supplyOfELec' ?
                                            <div>
                                              {this.state.liabilities.supplyOfELec.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.supplyOfELec.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.supplyOfELec[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfELec[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.telephones.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Dues to departments dealing with telephones
                                          {this.state.showLiability === 'telephones' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'telephones')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'telephones')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'telephones' ?
                                            <div>
                                              {this.state.liabilities.telephones.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.telephones.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.telephones[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.telephones[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.telephones[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.telephones[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.telephones[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.telephones[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.telephones[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.telephones[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.telephones[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.telephones[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.telephones[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.supplyOfTrans.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Dues to departments dealing with supply of transport
                                          {this.state.showLiability === 'supplyOfTrans' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'supplyOfTrans')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'supplyOfTrans')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'supplyOfTrans' ?
                                            <div>
                                              {this.state.liabilities.supplyOfTrans.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.supplyOfTrans.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.supplyOfTrans[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.supplyOfTrans[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }

                                      {this.state.liabilities.incomeTax.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Income Tax Dues
                                          {this.state.showLiability === 'incomeTax' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'incomeTax')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'incomeTax')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'incomeTax' ?
                                            <div>
                                              {this.state.liabilities.incomeTax.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.incomeTax.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.incomeTax[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.incomeTax[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.incomeTax[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.incomeTax[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.incomeTax[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.incomeTax[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.incomeTax[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.incomeTax[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.incomeTax[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.incomeTax[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.incomeTax[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }

                                      {this.state.liabilities.serviceTax.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Service Tax Dues
                                          {this.state.showLiability === 'serviceTax' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'serviceTax')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'serviceTax')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'serviceTax' ?
                                            <div>
                                              {this.state.liabilities.serviceTax.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.serviceTax.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.serviceTax[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.serviceTax[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.serviceTax[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.serviceTax[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.serviceTax[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.serviceTax[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.serviceTax[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.serviceTax[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.serviceTax[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.serviceTax[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.serviceTax[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.wealthTax.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Wealth Tax Dues
                                          {this.state.showLiability === 'wealthTax' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'wealthTax')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'wealthTax')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'wealthTax' ?
                                            <div>
                                              {this.state.liabilities.wealthTax.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.wealthTax.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.wealthTax[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.wealthTax[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.wealthTax[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.wealthTax[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.wealthTax[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.wealthTax[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.wealthTax[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.wealthTax[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.wealthTax[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.wealthTax[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.wealthTax[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.propertyTax.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Property Tax Dues
                                          {this.state.showLiability === 'propertyTax' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'propertyTax')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'propertyTax')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'propertyTax' ?
                                            <div>
                                              {this.state.liabilities.propertyTax.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.propertyTax.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.propertyTax[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.propertyTax[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.propertyTax[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.propertyTax[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.propertyTax[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.propertyTax[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.propertyTax[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.propertyTax[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.propertyTax[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.propertyTax[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.propertyTax[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.salesTax.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Sales Tax Dues
                                          {this.state.showLiability === 'salesTax' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'salesTax')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'salesTax')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'salesTax' ?
                                            <div>
                                              {this.state.liabilities.salesTax.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.salesTax.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.salesTax[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.salesTax[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.salesTax[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.salesTax[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.salesTax[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.salesTax[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.salesTax[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.salesTax[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.salesTax[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.salesTax[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.salesTax[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }

                                      {this.state.liabilities.anyOtherDues.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Any Other Dues
                                          {this.state.showLiability === 'anyOtherDues' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'anyOtherDues')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'anyOtherDues')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'anyOtherDues' ?
                                            <div>
                                              {this.state.liabilities.anyOtherDues.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.anyOtherDues.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.anyOtherDues[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.anyOtherDues[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.grandTotalDue.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Grand Total of all Govt Dues (as per affidavit)
                                          {this.state.showLiability === 'grandTotalDue' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'grandTotalDue')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'grandTotalDue')}></i>
                                            }
                                          </div>

                                          {this.state.showLiability === 'grandTotalDue' ?
                                            <div>
                                              {this.state.liabilities.grandTotalDue.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.grandTotalDue.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.grandTotalDue[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.grandTotalDue[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                      {this.state.liabilities.disputeLia.length === 0 ? null :
                                        <div>
                                          <div className="fontRegular16 greyFontColor lightBackgroundColor p-3 text-left border-bottom">
                                            Grand Total of all Govt Dues (as per affidavit)
                                          {this.state.showLiability === 'disputeLia' ?
                                              <i className="fa fa-angle-up iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'disputeLia')}></i>
                                              :
                                              <i className="fa fa-angle-down iconDown float-right cursorPointer" onClick={this.openUpLiability.bind(this, 'disputeLia')}></i>
                                            }
                                          </div>
                                          {this.state.showLiability === 'disputeLia' ?
                                            <div>
                                              {this.state.liabilities.disputeLia.length === 0 ?
                                                <div className="form-inline pt-3 pb-3 greyFontColor">
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                  <div className="assetWidth">-</div>
                                                </div>
                                                :
                                                <div>
                                                  {this.state.liabilities.disputeLia.map((item, index) => {
                                                    return (
                                                      <div className="greyFontColor">
                                                        {this.state.liabilities.disputeLia[index].asset_self.map((subValue, indx) => {
                                                          return (
                                                            <div className="form-inline border-bottom pt-3 pb-2">
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.disputeLia[index].asset_self[indx].self_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.disputeLia[index].asset_self[indx].self_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.disputeLia[index].asset_spouse[indx].spouse_amount}
                                                                </div>
                                                                <span className="fontRegular12">
                                                                  {this.state.liabilities.disputeLia[index].asset_spouse[indx].spouse_desc}
                                                                </span>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.disputeLia[index].asset_depend1[indx].depend1_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.disputeLia[index].asset_depend1[indx].depend1_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.disputeLia[index].asset_depend2[indx].depend2_amount}
                                                                </div>

                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.disputeLia[index].asset_depend2[indx].depend2_desc}
                                                                </div>
                                                              </div>
                                                              <div className="assetWidth">
                                                                <div className="fontRegular14">
                                                                  {this.state.liabilities.disputeLia[index].asset_depend3[indx].depend3_amount}
                                                                </div>
                                                                <div className="fontRegular12">
                                                                  {this.state.liabilities.disputeLia[index].asset_depend3[indx].depend3_desc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        })}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              }
                                            </div>
                                            : null}
                                        </div>
                                      }
                                    </Col>
                                  </Row>
                                </div>
                              }
                            </div>
                          </div>
                        </div>}
                      </div>
                    }

                    {/* <-------------Criminal-Record-Tab-----------------------> */}

                    {this.state.value === 4 && <div className="movableAssetsContainer">
                      {this.state.criminalLoader ? <CircularProgress className={classes.circularLoader} /> : <div>
                        <AppBar position="static"
                          className={classes.appBarStyleNest}>
                          <Tabs value={this.state.valueCriminal}
                            onChange={this.handleCriminalChange}
                            fullWidth
                            classes={{
                              indicator: classes.indicator,
                              style: classes.style
                            }}
                          >
                            <Tab label="Cognizance Taken" className={classes.tabLabelStyleAssets} />
                            <Tab label="Charges Framed" className={classes.tabLabelStyleAssetsImmovable} />
                            <Tab label="Convicted" className={classes.tabLabelStyleAssetsLiabilities} />
                          </Tabs>
                        </AppBar>
                        {this.state.valueCriminal === 0 && <div className="movableAssetsContainer">

                          {this.state.criminalRecordArray.cognizance_only.length === 0 ? <div className="">
                            <div className="chargedFramesCont fontSemiBold16 greyFontColor d-flex justify-content-center align-items-center">No Cases Found</div>
                          </div> :
                            <table className="table table-striped">
                              <thead className="lightBackgroundColor">
                                <tr>
                                  <th className="fontBold16 greyFontColor">#</th>
                                  <th className="fontBold16 greyFontColor">IPC Sections Applicable</th>
                                  <th className="fontBold16  greyFontColor">Other detail/acts</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.criminalRecordArray.cognizance_only.map(function (item, index) {
                                  return (
                                    <tr>
                                      <td className="greyFontColor">{index + 1}</td>
                                      <td className="fontRegular14 greyFontColor">{item.criminal_ipc}</td>
                                      <td className="fontRegular14 otherDetail greyFontColor">{item.criminal_record_desc}</td>
                                    </tr>
                                  )
                                }
                                )}
                              </tbody>

                            </table>
                          }
                        </div>}
                        {this.state.valueCriminal === 1 && <div className="movableAssetsContainer">
                          {this.state.criminalRecordArray.charges_framed.length === 0 ? <div className="">
                            <div className="chargedFramesCont fontSemiBold16 greyFontColor d-flex justify-content-center align-items-center">No Cases Found</div>
                          </div> :
                            <table className="table table-striped">
                              <thead className="lightBackgroundColor">
                                <tr>
                                  <th className="fontBold16 greyFontColor">#</th>
                                  <th className="fontBold16 greyFontColor">IPC Sections Applicable</th>
                                  <th className="fontBold16  greyFontColor">Other detail/acts</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.criminalRecordArray.charges_framed.map(function (item, index) {
                                  return (
                                    <tr>
                                      <td className="greyFontColor">{index + 1}</td>
                                      <td className="fontRegular14 greyFontColor">{item.criminal_ipc}</td>
                                      <td className="fontRegular14 otherDetail otherDetail greyFontColor">{item.criminal_record_desc}</td>
                                    </tr>
                                  )
                                }
                                )}
                              </tbody>

                            </table>
                          }
                        </div>}
                        {this.state.valueCriminal === 2 && <div className="movableAssetsContainer">
                          {this.state.criminalRecordArray.charges_convicted.length === 0 ? <div className="">
                            <div className="chargedFramesCont fontSemiBold16 greyFontColor d-flex justify-content-center align-items-center">No Cases Found</div>
                          </div> :
                            <table className="table table-striped">
                              <thead className="lightBackgroundColor">
                                <tr>
                                  <th className="fontBold16 greyFontColor">#</th>
                                  <th className="fontBold16 greyFontColor">IPC Sections Applicable</th>
                                  <th className="fontBold16 otherDetail greyFontColor">Other detail/acts</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.criminalRecordArray.charges_convicted.map(function (item, index) {
                                  return (
                                    <tr>
                                      <td className="greyFontColor">{index + 1}</td>
                                      <td className="fontRegular14 greyFontColor">{item.criminal_ipc}</td>
                                      <td className="fontRegular14 greyFontColor">{item.criminal_record_desc}</td>
                                    </tr>
                                  )
                                }
                                )}
                              </tbody>
                            </table>
                          }
                        </div>}
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
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
export default withStyles(styles)(UserCandidateProfile);
