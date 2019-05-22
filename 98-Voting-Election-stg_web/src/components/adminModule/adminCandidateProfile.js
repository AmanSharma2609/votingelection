/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin Candidate Profile. 
Purpose   : compelete candidate information view section 
*/
import React, { Component } from 'react';
import { Image, } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import Typography from '@material-ui/core/Typography';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import AppBar from '@material-ui/core/AppBar';
import { NavLink } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes, { func } from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import base64 from 'base-64';
import utf8 from 'utf8';
import { Emojione } from 'react-emoji-render';
import { Table } from 'reactstrap';
import Add from '../../images/add.png';
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import { withRouter } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';

import Delete from '../../images/SVGs/delete.svg'
import userOne from '../../images/SVGs/default_userimg.svg'
import partyPic from '../../images/SVGs/default_partyimg.svg'
import Dislike from '../../images/SVGs/dislike_unfill.svg'
import Like from '../../images/SVGs/like_unfill.svg'
import AppleStore from '../../images/app-store.png'
import GooglePlay from '../../images/google-paly.png'
import Publicuser from '../../images/SVGs/default_userimg.svg'
import PrimarySearchAppBar from './appBar/appBar'
import Comment from '../../images/SVGs/comment.svg'


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
    'Immovable', 'Movable', 'Liabilities'
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
    'Loss', 'Won', 'Total'
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
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  
];

const dataBanking = [
  { key: 'A' }, { key: 'B' },
]
const bondArray = [
  { key: 'A' },
]

const theme = createMuiTheme({
  palette: {
    primary: { main: '#E18F68' }, 
    secondary: { main: '#11cb5f' }, 
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
  iconMarginComment: {
    marginTop: 'auto',
    marginBottom: 'auto',
    cursor: "pointer"
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
    fontSize: 11,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  tabLabelStyleAssets: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: 14,
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
    fontSize: 14,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  tabLabelStyleAssetsLiabilities: {
    textTransform: 'capitalize',
    color: 'black',
    paddingRight: '3%',
    fontSize: 14,
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
  circularLoader: {
    color: '#E18F68',
    marginTop: '40px',
  },
  iconMarginImg: {
    color: 'white',
    zIndex: 1,
    left: 8,
    position: 'absolute',
  },
  link: {
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: '#555555',
    '&:hover': {
      color: '#E18F68'
    }
  },
  activelink: {
    color: '#E18F68',
    '&:hover': {
      color: '#555555'
    }
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
  rootBackDrop: {

    backgroundColor: 'rgba(127, 127, 127, 0.2)',
  },
  paperComment: {

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
  }

})

class AdminCandidateProfile extends Component {

  state = {
    value: 0,
    valueAssets: 0,
    valueCriminal: 0,
    newsArray: [],
    isLoading: false,
    secondArray: [],
    activeIndex: 0,
    educationArray: [],
    commentLikeCount: '',
    commentDislikeCount: '',
    commentCount: '',
    PolliticalArray: [],
    bankingArray: dataBanking,
    bondArray: bondArray,
    publicArray: [],
    dataOfNews: false,
    openDelOpi: false,
    openDelPost: false,
    deleteComments: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      comment_id: ''
    },
    criminalRecordArray: { 'charges_convicted': [], 'charges_framed': [], 'cognizance_only': [] },
    viewCandParameter: {
      votingElection_code: constants.votingElectionCode,
      candidate_id: ''
    },
    viewCandNews: {
      votingElection_code: constants.votingElectionCode,
      candidate_id: '',
      count: 0
    },
    candPublicOpinion: {
      votingElection_code: constants.votingElectionCode,
      candidate_id: '',
      count: 0
    },
    candCriminalRec: {
      votingElection_code: constants.votingElectionCode,
      candidate_id: '',
    },
    candAsset: {
      votingElection_code: constants.votingElectionCode,
      candidate_id: '',
    },
    deleteOpinioin: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      opinion_id: ''
    },
    deletePost: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      news_id: ''
    },
    userCommentRead: {
      votingElection_code: constants.votingElectionCode,
      news_id: ''
    },
    userCommentArray: [],
    dailogPostArray: '',
    openComment: false,
    adminDeleteComment: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      comment_id: ''
    },
    showMovable: 'false',
    showImmovable: 'false',
    showLiability: 'false',
    candidateId: '',
    candidateName: '',
    styleForUpvote: {
      width: '33%'
    },
    styleForDownvote: {
      width: '34%'
    },
    styleForCantSay: {
      width: '33%'
    },
    stopNewsCall: false,
    stopPublicCall: false,
    recentPostLoader: false,
    recentPublicLoader: false,
    movable: { 'cash': [], 'bonds': [], 'shares': [], 'postal': [], 'insurance': [], 'personalLoans': [], 'vehicle': [], 'jewellery': [], 'other': [] },
    immovable: { 'agricultural': [], 'nonAgricultural': [], 'buildings': [], 'commBuildings': [], 'resiBuildings': [], 'others': [], 'houses': [] },
    liabilities: {
      'loans': [], 'anyOther': [], 'houses': [], 'govAccomodation': [], 'supplyOfWater': [], 'supplyOfELec': [], 'telephones': [], 'supplyOfTrans': [],
      'incomeTax': [], 'serviceTax': [], 'wealthTax': [], 'propertyTax': [], 'salesTax': [], 'anyOtherDues': [], 'grandTotalDue': [], 'grandTotalLia': [],
      'loansIndividual': [], 'disputeLia': []
    },
    newsCount: 0,
    newsActivityIndex : null,
    activityLoader: true,
    publicOpinionLoader: true,
    profileLoader: true,
    assetsLoader: true,
    criminalLoader: true,
    opiIndex : '',
  }

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

  handleAssetsChange = (event, valueAssets) => {
    this.setState({ valueAssets: valueAssets });
  }
  handleCriminalChange = (event, valueCriminal) => {
    this.setState({ valueCriminal: valueCriminal })
  }

  handleChange = (event, value, index) => {
    this.setState({ value: value });
  };

  deleteCommentPostPopup = (openPopup, comment_id) => {
    this.setState({ openDelCommentPost: openPopup });
    this.setState({ adminDeleteComment: { ...this.state.adminDeleteComment, comment_id: comment_id } });
  }


  componentDidMount() {
    this.setState({ showMovable: 'cash' });
    this.setState({ showImmovable: 'agri' });
    this.setState({ showLiability: 'loans' });

    const candValue = this.props.match.params.id;
    this.state.candidateId = this.props.match.params.id;
    this.state.candidateName = this.props.match.params.name;

    this.setState({ candidateName: this.props.match.params.name })
    this.setState({ candidateId: this.props.match.params.id })

    const adminToken = localStorage.getItem("accessToken")

    this.setState({ adminDeleteComment: { ...this.state.adminDeleteComment, token_id: adminToken } })
    this.setState({ deleteOpinioin: { ...this.state.deleteOpinioin, token_id: adminToken } })
    this.setState({ deletePost: { ...this.state.deletePost, token_id: adminToken } })
    this.setState({ viewCandParameter: { ...this.state.viewCandParameter, candidate_id: candValue } }, function () {
      items('POST', this.state.viewCandParameter, constants.viewCandProfile)
        .then(response => {
          dataDoughnut.datasets[0].data = [response.data[0].total_criminal_cases];
          dataPieOne.datasets[0].data = [response.data[0].immovable, response.data[0].movable, response.data[0].liabilities];
          dataPieTwo.datasets[0].data = [response.data[0].loss, response.data[0].won, response.data[0].total];
          if (response.status === "Success" && response.data.length !== 0) {
            global.value = response.data
            this.setState({ educationArray: response.data[0].candidate_education_rec.split(',') })
            this.setState({ PolliticalArray: response.data[0].candidate_legislature.split(',') });
            localStorage.setItem("candidateUpdateId", response.data[0].candidate_id)

            if (global.value !== undefined || global.value !== null || global.value.length !== 0) {
              this.calculateWidthForBar(global.value[0].upvote_count, global.value[0].downvote_count, global.value[0].cannot_say_count);
            }

            this.candidateElectionArray();
            this.setState({ profileLoader: false })

          }
           else if (response.status === "Failure") {
            if (response.msg === "Candidate not present.") {
              this.props.history.push('/AdminCandidate')
            }
            this.setState({ profileLoader: false })
          }
          else{
            this.setState({ profileLoader: false })
          }

        })

    })
    this.setState({ viewCandNews: { ...this.state.viewCandNews, candidate_id: candValue } }, function () {
      this.viewCandNews()
    })
    this.setState({ candPublicOpinion: { ...this.state.candPublicOpinion, candidate_id: candValue } }, function () {
      this.candPublicOpinion()
    })
    this.setState({ candCriminalRec: { ...this.state.candCriminalRec, candidate_id: candValue } }, function () {
      this.candCriminalRec()
    })
    this.setState({ candAsset: { ...this.state.candAsset, candidate_id: candValue } }, function () {
      this.candidateAssetsAndLiabilities();
    })
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
    this.setState({ showMovable: 'cash' });
    this.setState({ showImmovable: 'agri' });
    this.setState({ showLiability: 'loans' });

    const candValue = newProps.match.params.id;
    this.state.candidateId = newProps.match.params.id;

    this.state.candidateName = newProps.match.params.name;
    this.setState({ candidateName: newProps.match.params.name })

    this.setState({ candidateId: newProps.match.params.id })
    const adminToken = localStorage.getItem("accessToken")

    this.setState({ adminDeleteComment: { ...this.state.adminDeleteComment, token_id: adminToken } })
    this.setState({ deleteOpinioin: { ...this.state.deleteOpinioin, token_id: adminToken } })
    this.setState({ viewCandParameter: { ...this.state.viewCandParameter, candidate_id: candValue } }, function () {
      items('POST', this.state.viewCandParameter, constants.viewCandProfile)

        .then(response => {

          if (response.status === "Success") {
            global.value = response.data
            this.setState({ educationArray: response.data[0].candidate_education_rec.split(', ') })
            this.setState({ PolliticalArray: response.data[0].candidate_legislature.split(', ') })
            localStorage.setItem("candidateUpdateId", response.data[0].candidate_id)

            
          } else if (response.status === "Failure") {
            if (response.msg === "Candidate not present.") {
              this.props.history.push('/AdminCandidate')
            }
          }

        })

    })
    this.setState({ viewCandNews: { ...this.state.viewCandNews, candidate_id: candValue } }, function () {
      this.viewCandNews()
    })
    this.setState({ candPublicOpinion: { ...this.state.candPublicOpinion, candidate_id: candValue } }, function () {
      this.candPublicOpinion()
    })
    this.setState({ candCriminalRec: { ...this.state.candCriminalRec, candidate_id: candValue } }, function () {
      this.candCriminalRec()
    })
    this.setState({ candAsset: { ...this.state.candAsset, candidate_id: candValue } }, function () {
      this.candidateAssetsAndLiabilities();
    })
  }

  viewCandNews = () => {
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
        this.setState({ activityLoader: false })
      });
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

  candPublicOpinion = () => {
    items('POST', this.state.candPublicOpinion, constants.candPublicOpinion)
      .then(response => {

        if (response.status === "Success" && response.data.length !== 0) {
          this.setState({ publicArray: response.data })
          this.setState({ publicOpinionLoader: false })        
        }
        else{
          this.setState({ publicOpinionLoader: false })
        }
      })
  }

  candCriminalRec = () => {
    items('POST', this.state.candCriminalRec, constants.candCriminalRec)
      .then(response => {
        if (response.status === "Success" && response.data.length !== 0) {
          if (response.status === "Success") {
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
          }
          this.setState({ criminalLoader: false })

        }
        else{
          this.setState({ criminalLoader: false })
        }
      })
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
        console.log(response);
        if (response.status === "Success" && response.data.length !== 0)  {
          let valueData = { 'movable': [], 'immovable': [], 'liability': [] };
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
              response.data[j].asset_self.push({self_amount: "", self_desc: ""})
            }
            for (let i = 0; i < tempMax - spouse; i++) {
              response.data[j].asset_spouse.push({spouse_amount: "", spouse_desc: ""})
            }
            for (let i = 0; i < tempMax - dep1; i++) {
              response.data[j].asset_depend1.push({depend1_amount: '', depend1_desc: ''});
            }
            for (let i = 0; i < tempMax - dep2; i++) {
              response.data[j].asset_depend2.push({depend1_amount: '', depend1_desc: ''})
            }
            for (let i = 0; i < tempMax - dep3; i++) {
              response.data[j].asset_depend3.push({depend1_amount: '', depend1_desc: ''})
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
                console.log(this.state.immovable.resiBuildings)
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


  handleNewsScroll = (e, prevState) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {

    }

  }

  handlePublicScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      if (this.state.value === 1) {
        if (this.state.stopPublicCall === false) {
          this.setState({ recentPublicLoader: true })
          this.setState({ candPublicOpinion: { ...this.state.candPublicOpinion, count: this.state.candPublicOpinion.count + 1 } }, function () {
            items('POST', this.state.candPublicOpinion, constants.candPublicOpinion)
              .then(response => {
                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ publicArray: this.state.publicArray.concat(response.data) })
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
        this.viewCandNews();
      }
    }
  }

  handleDeletePostPopUp = (news_id, index) => {
    this.setState({ deletePost: { ...this.state.deletePost, news_id: news_id } });
    this.setState({ openDelPost: true });
    this.setState({newsActivityIndex : index});
  }

  handleDeletePost = () => {
    items("POST", this.state.deletePost, constants.adminDeletePost)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ openDelPost: false })
          this.state.newsArray.splice(this.state.newsActivityIndex,1)
          this.setState({newsArray : this.state.newsArray});
        }
      });
  }

  handleDeleteOpen = (public_opinion_id, index) => {
    this.setState({opiIndx : index});
    this.setState({ deleteOpinioin: { ...this.state.deleteOpinioin, opinion_id: public_opinion_id } })
    this.setState({ openDelOpi: true });
  }

  handleCloseDelPost = () => {
    this.setState({ openDelPost: false })
  }

  handleCloseDelOpi = () => {
    this.setState({ openDelOpi: false })
  }

  handleDeleteOpinion = () => {
    items("POST", this.state.deleteOpinioin, constants.adminDeleteOpinion)
      .then(response => {
        if (response.status === "Success") {
          this.state.publicArray.splice(this.state.opiIndx, 1);
          this.setState({publicArray: this.state.publicArray});
          this.setState({ openDelOpi: false })
          this.candPublicOpinion()
        }
      });
  }

  handleToEditCandidate = () => {
    this.props.history.push('/AdminUpdateCandidate');
  }

  handleOpenAdminComment = (news_id, news_text, comment_count, likes_count, dislikes_count, news_created_on) => {
    this.setState({ newCreatedOn: news_created_on })
    this.setState({ commentCount: comment_count })
    this.setState({ commentLikeCount: likes_count })
    this.setState({ commentDislikeCount: dislikes_count })
    this.setState({ dailogPostArray: news_text })
    this.setState({ userCommentRead: { ...this.state.userCommentRead, news_id: news_id } }, function () {
      items("POST", this.state.userCommentRead, constants.userCommentView)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ userCommentArray: response.data })
            this.setState({ openComment: true })
          }
        })
    })
  }

  handleCloseComment = () => {
    this.setState({ openComment: false })
  }

  handleUserDeleteComment = (comment_id) => {
    items("POST", this.state.adminDeleteComment, constants.adminDeleteComm)
      .then(response => {
        if (response.status === "Success") {
          items("POST", this.state.userCommentRead, constants.userCommentView)
            .then(response => {
              if (response.status === "Success") {
                this.setState({ userCommentArray: response.data })
                this.setState({ commentCount: this.state.commentCount - 1 })
                this.viewCandNews()

              }
            })
        }
      })
    this.setState({ openDelCommentPost: false });
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
      <div className="AppUserLogin userElection adminCandidate" onScroll={this.handlePublicScroll}>
        <PrimarySearchAppBar />

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home </NavLink> / <NavLink className="breadCrumbs" to='/AdminCandidate'>Candidates </NavLink>/ {this.state.candidateName}</p>
            </Col>
          </Row>
        </Container>

        {/* <----------Center-Content------------------> */}
        {this.state.isLoading ? <div className="marginTop80"><CircularProgress className={`marginTop80 mt-5 ${classes.circularLoader}`} /></div> :
          <div className="candidateProfileContainer ml-auto mr-auto mt-5">
            <Container fluid={true} className="marginTop80">
              <Row className="">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                  <div className="flexCardContainer">
                    <div className="lightBackgroundColor flexCardProfile rounded paddingLeft10 paddingRight10 pt-3 pb-3 boxShadowNone">
                      <div className="justify-content-center mb-3 mt-2">
                        <div className="d-flex justify-content-center">
                          <div className="imageUpload">
                            <Image className="imageCandidatePartyProfile"
                              src={global.value[0].candidate_img_url === null || global.value[0].candidate_img_url === undefined || global.value[0].candidate_img_url === '' ? userOne : global.value[0].candidate_img_url}
                              responsive
                              onError={this.handleCandidateImgError}
                              >
                            </Image>
                          </div>
                        </div>
                        <div>
                        {this.state.profileLoader ? null :  <div className="partyIconCandidateBadge">
                        <Image className="circlePartyIcon"
                          src={global.value[0].party_img_url === null || global.value[0].party_img_url === '' ? partyPic : global.value[0].party_img_url}
                          responsive
                          onError={this.handlePartyImgError}
                        >
                        </Image>
                      </div>}
                       
                        </div>
                      </div>

                      <div>
                        <h6 className="fontWeight700 headingHeight wordBreakAll">{global.value[0].candidate_name}</h6>
                        <small className="lineHeight18">
                          <p className="greyFontColor fontRegular13 mt-3 mb-3 text-capitalize wordBreakAll">
                            <b>{global.value[0].candidate_party_name}</b>
                            <br />
                            {global.value[0].candidate_address !== undefined ? global.value[0].candidate_address.toLowerCase() : ''}<br />
                            {global.value[0].candidate_profession}
                          </p>
                        </small>
                      </div>

                      <div className="likeDislikeBarContainer mt-0">
                        <div className="form-inline pl-0 mb-4 mt-4 d-flex justify-content-center">
                          <Typography variant="caption" className={`${classes.textStyle} pr-2`}>{global.value[0].upvote_count}</Typography>
                          <span className={global.value[0].upvote_count === 0 || global.value[0].upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                          <span className={global.value[0].downvote_count === 0 || global.value[0].downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                          <Typography variant="caption" className={`${classes.profileBoxText} pl-3`}>{global.value[0].downvote_count}</Typography>
                          <Typography variant="caption" className={classes.profileTextTwo}>{global.value[0].cannot_say_count} Can't Say</Typography>
                        </div>
                        <div className="w-100 form-inline likeDislikeBar">
                          <span className="bg-success likeDislikeBar" style={this.state.styleForUpvote}><small>{global.value[0].upvote_count}</small></span>
                          <span className="bg-warning likeDislikeBar" style={this.state.styleForDownvote}><small>{global.value[0].downvote_count}</small></span>
                          <span className="bg-danger likeDislikeBar" style={this.state.styleForCantSay}><small>{global.value[0].cannot_say_count}</small></span>
                        </div>
                        <div className="follow mt-0 pr-0">
                          <NavLink className="breadCrumbs text-white" to={`/AddPost/candidate/${this.props.match.params.id}/${this.props.match.params.name}`}>
                            <Button bssize="large" color="inherit" className={`${classes.buttonUserCandidate} mt-2 p-0`}>
                              <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                              ADD POST
                            </Button>
                          </NavLink>
                        </div>

                        <div className="follow pr-0">
                          <Button
                            bssize="large"
                            color="inherit"
                            className={classes.buttonUserCandidate}
                            onClick={this.handleToEditCandidate}
                          >
                            <img src={Add} className={classes.iconMarginImg}
                              alt="search" height="15" width="15"
                            />
                            {/* <Add /> */}
                            EDIT CANDIDATE
                          </Button>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="contentContainer mb-3 rounded boxShadowNone">
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


                    {/* <--------------Activity-Tab---------------------------------> */}

                    {this.state.value === 0 && <div className="" >
                    {this.state.activityLoader? <CircularProgress className={classes.circularLoader}/> : <div>
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
                                <hr className="mt-0 mb-0" />
                              </DialogTitle>
                              <DialogContent className={classes.paperComment}>
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
                                                  <div className="pl-0 pr-0">By <span className="text-capitalize">{item.user_name}</span></div>
                                                  <div className="col-4 cursorPointer"
                                                    onClick={this.deleteCommentPostPopup.bind(this, true, item.comment_id)}
                                                  ><img src={Delete} className="greyFontColor cursorPointer"
                                                       width="13" />
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
                    {this.state.secondArray.length === 0 && this.state.newsArray.length === 0 ?
                      <Row className="ml-1 mb-4 mt-4">
                        <div className="fontRegular16 text-center w-100"> No news available. </div>
                      </Row>
                      :
                      <Row className="ml-0 mr-0 mb-4 mt-4">

                        <Col xs={12} sm={12} md={12} lg={8} xl={8} className="">
                          <div className="commentShow pr-3">
                            {this.state.newsArray.length === 0 ? <div className="fontRegular16"> No news available. </div> :
                              <div className="" >
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
                                {this.state.newsArray.map((item, index) => {
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
                                          {/* <div className="fontBold12 text-md-left text-sm-center cursorPointer" >Bhartiya Janta Party</div> */}
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
                                <div>
                                  {this.state.recentPostLoader ? <CircularProgress className={classes.recentPostLoader} /> : null}

                                </div>
                              </div>

                            }

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
                    }

                    {this.state.value === 1 && <div className="publicCandOpinion pt-3" >
                    {this.state.publicOpinionLoader ? <CircularProgress className={classes.circularLoader} /> :<div>
                    
                    {this.state.publicArray === null || this.state.publicArray.length === 0 ? <div className="fontRegular16"> No public opinion available. </div> :
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
                        {this.state.publicArray.map((item, index) => {
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
                                <p className="text-left fontRegular12 greyFontColor wordBreak pt-2 pb-2 mb-2 preWrapWhiteSpace"> {decodeURI(item.opinion_desc)} </p>

                                <div className="fontRegular12 lightBackgroundColor form-inline commentLikeDislikeBox">
                                  <div className="form-inline pl-4">
                                    <div className="fontRegular12 greyFontColor d-flex align-self-center">
                                      <span className="likesCount">{item.likes_count}</span>
                                      &nbsp;
                                      <img src={Like} className={`${classes.iconMargin} likeDislikeIcons`}    />
                                    </div>
                                    &nbsp; &nbsp;&nbsp;
                                      <div className="fontRegular12 greyFontColor d-flex align-self-center">
                                      <span className="likesCount">{item.dislikes_count}</span>
                                      &nbsp;
                                      <img src={Dislike} className={`${classes.iconMargin} likeDislikeIcons mt-2`}    />
                                    </div>
                                    &nbsp; &nbsp;
                                      </div>
                                  <div className="ml-auto form-inline pr-4 d-flex align-self-center">
                                    <span className="">{item.opinion_created_on}</span>
                                    &nbsp; &nbsp;
                                      <div className="greyFontColor cursorPointer remove1 mb-0">
                                      <img onClick={this.handleDeleteOpen.bind(this, item.public_opinion_id, index)}
                                        src={Delete} className="greyFontColor cursorPointer icon"
                                           width="13" />
                                    </div>
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
                    }
                  </div> }
                    
                    </div>
                  }

                    {/* <-------------------Profile-Tab--------------------> */}

                    {this.state.value === 2 &&
                      <div>
                      {this.state.profileLoader? <CircularProgress className={classes.circularLoader} /> :<div className="">
                      <Row className="mt-4">
                        <Col xs={12} sm={12} md={8} lg={6} xl={6} className="ml-auto mr-auto profileBorder">
                          <div className="text-left w-100 mt-4 pr-3 pl-3 w-80">
                            <table className="w-100">
                              <tr>
                                <td className="fontSemiBold12">
                                  Name :
                          </td>
                                <td className="fontRegular12">
                                  {global.value[0].candidate_name === '' ? <div>  - </div>
                                    :
                                    <div>
                                      {global.value[0].candidate_name}
                                    </div>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="fontSemiBold12">

                                  {global.value[0].candidate_relation} :

                          </td>
                                <td className="fontRegular12">
                                  {global.value[0].candidate_relation_name === '' ? <div>  - </div>
                                    :
                                    <div>
                                      {global.value[0].candidate_relation_name}
                                    </div>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="fontSemiBold12">
                                  D.O.B :
                          </td>
                                <td className="fontRegular12">
                                  {global.value[0].candidate_DOB === '' || global.value[0].candidate_DOB === '0000-00-00' ? <div>  - </div>
                                    :
                                    <div>
                                      {global.value[0].candidate_DOB}
                                    </div>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="fontSemiBold12">
                                  Age :
                                </td>
                                <td className="fontRegular12">
                                  {global.value[0].Age}
                                </td>
                              </tr>
                              <tr>
                                <td className="fontSemiBold12">
                                  Address :
                          </td>
                                <td className="fontRegular12">
                                  {global.value[0].candidate_address === '' ? <div>  - </div>
                                    :
                                    <div>
                                      {global.value[0].candidate_address}
                                    </div>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="fontSemiBold12">
                                  Email :
                          </td>
                                <td className="fontRegular12">
                                  {global.value[0].candidate_email === '' ? <div>  - </div>
                                    :
                                    <div>
                                      {global.value[0].candidate_email}
                                    </div>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="fontSemiBold12">
                                  Mobile :
                          </td>
                                <td className="fontRegular12">
                                  {global.value[0].candidate_phone_no === '' ? <div>  - </div>
                                    :
                                    <div>
                                      {global.value[0].candidate_phone_no}
                                    </div>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="fontSemiBold12">
                                  Profession :
                          </td>
                                <td className="fontRegular12">
                                  {global.value[0].candidate_profession === '' ? <div>  - </div>
                                    :
                                    <div>
                                      {global.value[0].candidate_profession}
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
                                      {global.value[0].movable}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Immovable Assets:
                              </td>
                                    <td>
                                      {global.value[0].immovable}

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Liabilities:
                              </td>
                                    <td>
                                      {global.value[0].liabilities}

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
                                    <td className="ml-2">
                                      {global.value[0].total}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Election Won:
                                </td>
                                    <td>
                                      {global.value[0].won}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Election Lost:
                                </td>
                                    <td>
                                      {global.value[0].loss}
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

                            {global.value[0].candidate_about === null || global.value[0].candidate_about === '' ? null
                              :
                              <div>

                                <div className="fontRegular14 greyFontColor">
                                  About
                           </div>
                                <hr className="bg-dark" />
                                <div className="fontRegular12" dangerouslySetInnerHTML={{ __html: global.value[0].candidate_about }}>


                                </div>
                              </div>
                            }

                            {this.state.educationArray === null || this.state.educationArray === undefined || this.state.educationArray.length === 0 || this.state.educationArray[0] === undefined || this.state.educationArray[0] === '' ? null
                              :
                              <div>
                                <div className="fontRegular14 greyFontColor mt-5">
                                  Education
                           </div>
                                <hr className="bg-dark" />
                                <div className="fontRegular12">
                                  {this.state.educationArray.map(function (item, index) {
                                    return (

                                      <span>
                                        {item === '' || item === null || item === undefined ? null :
                                          <span className="greyFontColor">+  {item}
                                          </span>
                                        }
                                        <br />

                                      </span>
                                    )
                                  }
                                  )}
                                </div>
                              </div>
                            }

                            {this.state.PolliticalArray === null || this.state.PolliticalArray === undefined || this.state.PolliticalArray.length === 0 || this.state.PolliticalArray[0] === undefined || this.state.PolliticalArray[0] === '' ? null
                              :
                              <div>
                                <div className="fontRegular14 greyFontColor mt-5">
                                  Political Career
                            <hr className="bg-dark" />
                                </div>
                                <div className="greyFontColor fontRegular12">
                                  {this.state.PolliticalArray.map(function (item, index) {
                                    return (
                                      <span>
                                        {item === '' || item === null || item === undefined ? null :
                                          <span className="">+ {item}</span>
                                        }
                                        <br />
                                      </span>
                                    )
                                  }
                                  )}
                                </div>
                              </div>
                            }


                            {global.value[0].candidate_religious_views === null || global.value[0].candidate_religious_views === undefined || global.value[0].candidate_religious_views === '' ? null
                              :
                              <div>
                                <div className="fontRegular14 greyFontColor mt-5">
                                  Religious View
                            <hr className="bg-dark" />
                                </div>
                                <div className="fontRegular12 greyFontColor">
                                  {global.value[0].candidate_religious_views}
                                </div>
                              </div>
                            }
                          </div>
                        </Col>
                      </Row>
                    </div>
                   }
                      
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

                                  {this.state.movable.cash.length === 0 || (this.state.movable.cash[0].asset_self.length === 0 && this.state.movable.cash[0].asset_spouse.length === 0 && this.state.movable.cash[0].asset_depend1.length === 0 && this.state.movable.cash[0].asset_depend2.length === 0 && this.state.movable.cash[0].asset_depend3.length === 0) ? null :
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

                                  {this.state.movable.shares.length === 0 || (this.state.movable.shares[0].asset_self.length === 0 && this.state.movable.shares[0].asset_spouse.length === 0 && this.state.movable.shares[0].asset_depend1.length === 0 && this.state.movable.shares[0].asset_depend2.length === 0 && this.state.movable.shares[0].asset_depend3.length === 0)? null :
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

                                  {this.state.movable.bonds.length === 0 || (this.state.movable.bonds[0].asset_self.length === 0 && this.state.movable.bonds[0].asset_spouse.length === 0 && this.state.movable.bonds[0].asset_depend1.length === 0 && this.state.movable.bonds[0].asset_depend2.length === 0 && this.state.movable.bonds[0].asset_depend3.length === 0) === 0 ? null :
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

                                  {this.state.movable.postal.length === 0 || (this.state.movable.postal[0].asset_self.length === 0 && this.state.movable.postal[0].asset_spouse.length === 0 && this.state.movable.postal[0].asset_depend1.length === 0 && this.state.movable.postal[0].asset_depend2.length === 0 && this.state.movable.postal[0].asset_depend3.length === 0) === 0 ? null :
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

                                  {this.state.movable.insurance.length === 0 || (this.state.movable.insurance[0].asset_self.length === 0 && this.state.movable.insurance[0].asset_spouse.length === 0 && this.state.movable.insurance[0].asset_depend1.length === 0 && this.state.movable.insurance[0].asset_depend2.length === 0 && this.state.movable.insurance[0].asset_depend3.length === 0) ? null :
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

                                  {this.state.movable.personalLoans.length === 0 || (this.state.movable.personalLoans[0].asset_self.length === 0 && this.state.movable.personalLoans[0].asset_spouse.length === 0 && this.state.movable.personalLoans[0].asset_depend1.length === 0 && this.state.movable.personalLoans[0].asset_depend2.length === 0 && this.state.movable.personalLoans[0].asset_depend3.length === 0) ? null :
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

                                  {this.state.movable.vehicle.length === 0 || (this.state.movable.vehicle[0].asset_self.length === 0 && this.state.movable.vehicle[0].asset_spouse.length === 0 && this.state.movable.vehicle[0].asset_depend1.length === 0 && this.state.movable.vehicle[0].asset_depend2.length === 0 && this.state.movable.vehicle[0].asset_depend3.length === 0) === 0 ? null :
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

                                  {this.state.movable.jewellery.length === 0 || (this.state.movable.jewellery[0].asset_self.length === 0 && this.state.movable.jewellery[0].asset_spouse.length === 0 && this.state.movable.jewellery[0].asset_depend1.length === 0 && this.state.movable.jewellery[0].asset_depend2.length === 0 && this.state.movable.jewellery[0].asset_depend3.length === 0) === 0 ? null :
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

                                  {this.state.movable.other.length === 0 || (this.state.movable.other[0].asset_self.length === 0 && this.state.movable.other[0].asset_spouse.length === 0 && this.state.movable.other[0].asset_depend1.length === 0 && this.state.movable.other[0].asset_depend2.length === 0 && this.state.movable.other[0].asset_depend3.length === 0) ? null :
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
                                    && this.state.movable.vehicle.length===0 && this.state.movable.jewellery.length===0 && this.state.movable.other.length===0 ?
                                    <div className="d-flex justify-content-center align-items-center mt-5 fontSemiBold16">No Record Found.</div> : null}

                                  {/* ===================================Immovable section================================= */}


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

                                {this.state.immovable.agricultural.length === 0 || (this.state.immovable.agricultural[0].asset_self.length === 0 && this.state.immovable.agricultural[0].asset_spouse.length === 0 && this.state.immovable.agricultural[0].asset_depend1.length === 0 && this.state.immovable.agricultural[0].asset_depend2.length === 0 && this.state.immovable.agricultural[0].asset_depend3.length === 0)  ? null :
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

                                {this.state.immovable.nonAgricultural.length === 0 || (this.state.immovable.nonAgricultural[0].asset_self.length === 0 && this.state.immovable.nonAgricultural[0].asset_spouse.length === 0 && this.state.immovable.nonAgricultural[0].asset_depend1.length === 0 && this.state.immovable.nonAgricultural[0].asset_depend2.length === 0 && this.state.immovable.nonAgricultural[0].asset_depend3.length === 0)  ? null :
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

                                {this.state.immovable.buildings.length === 0 || (this.state.immovable.buildings[0].asset_self.length === 0 && this.state.immovable.buildings[0].asset_spouse.length === 0 && this.state.immovable.buildings[0].asset_depend1.length === 0 && this.state.immovable.buildings[0].asset_depend2.length === 0 && this.state.immovable.buildings[0].asset_depend3.length === 0)  ? null :
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

                                {this.state.immovable.houses.length === 0 || (this.state.immovable.houses[0].asset_self.length === 0 && this.state.immovable.houses[0].asset_spouse.length === 0 && this.state.immovable.houses[0].asset_depend1.length === 0 && this.state.immovable.houses[0].asset_depend2.length === 0 && this.state.immovable.houses[0].asset_depend3.length === 0) ? null :
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

                                {this.state.immovable.commBuildings.length === 0 || (this.state.immovable.commBuildings[0].asset_self.length === 0 && this.state.immovable.commBuildings[0].asset_spouse.length === 0 && this.state.immovable.commBuildings[0].asset_depend1.length === 0 && this.state.immovable.commBuildings[0].asset_depend2.length === 0 && this.state.immovable.commBuildings[0].asset_depend3.length === 0) ? null :
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

                                {this.state.immovable.resiBuildings.length === 0 || (this.state.immovable.resiBuildings[0].asset_self.length === 0 && this.state.immovable.resiBuildings[0].asset_spouse.length === 0 && this.state.immovable.resiBuildings[0].asset_depend1.length === 0 && this.state.immovable.resiBuildings[0].asset_depend2.length === 0 && this.state.immovable.resiBuildings[0].asset_depend3.length === 0)  ? null :
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

                                {this.state.immovable.others.length === 0 || (this.state.immovable.others[0].asset_self.length === 0 && this.state.immovable.others[0].asset_spouse.length === 0 && this.state.immovable.others[0].asset_depend1.length === 0 && this.state.immovable.others[0].asset_depend2.length === 0 && this.state.immovable.others[0].asset_depend3.length === 0) ? null :
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


                                  {this.state.liabilities.loans.length === 0 || (this.state.liabilities.loans[0].asset_self.length === 0 && this.state.liabilities.loans[0].asset_spouse.length === 0 && this.state.liabilities.loans[0].asset_depend1.length === 0 && this.state.liabilities.loans[0].asset_depend2.length === 0 && this.state.liabilities.loans[0].asset_depend3.length === 0) ? null :
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

                                  {this.state.liabilities.anyOther.length === 0 || (this.state.liabilities.anyOther[0].asset_self.length === 0 && this.state.liabilities.anyOther[0].asset_spouse.length === 0 && this.state.liabilities.anyOther[0].asset_depend1.length === 0 && this.state.liabilities.anyOther[0].asset_depend2.length === 0 && this.state.liabilities.anyOther[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.houses.length === 0 || (this.state.liabilities.houses[0].asset_self.length === 0 && this.state.liabilities.houses[0].asset_spouse.length === 0 && this.state.liabilities.houses[0].asset_depend1.length === 0 && this.state.liabilities.houses[0].asset_depend2.length === 0 && this.state.liabilities.houses[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.loansIndividual.length === 0 || (this.state.liabilities.loansIndividual[0].asset_self.length === 0 && this.state.liabilities.loansIndividual[0].asset_spouse.length === 0 && this.state.liabilities.loansIndividual[0].asset_depend1.length === 0 && this.state.liabilities.loansIndividual[0].asset_depend2.length === 0 && this.state.liabilities.loansIndividual[0].asset_depend3.length === 0)  === 0 ? null :
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

                                  {this.state.liabilities.grandTotalLia.length === 0 || (this.state.liabilities.grandTotalLia[0].asset_self.length === 0 && this.state.liabilities.grandTotalLia[0].asset_spouse.length === 0 && this.state.liabilities.grandTotalLia[0].asset_depend1.length === 0 && this.state.liabilities.grandTotalLia[0].asset_depend2.length === 0 && this.state.liabilities.grandTotalLia[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.govAccomodation.length === 0 || (this.state.liabilities.govAccomodation[0].asset_self.length === 0 && this.state.liabilities.govAccomodation[0].asset_spouse.length === 0 && this.state.liabilities.govAccomodation[0].asset_depend1.length === 0 && this.state.liabilities.govAccomodation[0].asset_depend2.length === 0 && this.state.liabilities.govAccomodation[0].asset_depend3.length === 0) ? null :
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

                                  {this.state.liabilities.supplyOfWater.length === 0 || (this.state.liabilities.supplyOfWater[0].asset_self.length === 0 && this.state.liabilities.supplyOfWater[0].asset_spouse.length === 0 && this.state.liabilities.supplyOfWater[0].asset_depend1.length === 0 && this.state.liabilities.supplyOfWater[0].asset_depend2.length === 0 && this.state.liabilities.supplyOfWater[0].asset_depend3.length === 0) ? null :
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

                                  {this.state.liabilities.supplyOfELec.length === 0 || (this.state.liabilities.supplyOfELec[0].asset_self.length === 0 && this.state.liabilities.supplyOfELec[0].asset_spouse.length === 0 && this.state.liabilities.supplyOfELec[0].asset_depend1.length === 0 && this.state.liabilities.supplyOfELec[0].asset_depend2.length === 0 && this.state.liabilities.supplyOfELec[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.telephones.length === 0 || (this.state.liabilities.telephones[0].asset_self.length === 0 && this.state.liabilities.telephones[0].asset_spouse.length === 0 && this.state.liabilities.telephones[0].asset_depend1.length === 0 && this.state.liabilities.telephones[0].asset_depend2.length === 0 && this.state.liabilities.telephones[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.supplyOfTrans.length === 0 || (this.state.liabilities.supplyOfTrans[0].asset_self.length === 0 && this.state.liabilities.supplyOfTrans[0].asset_spouse.length === 0 && this.state.liabilities.supplyOfTrans[0].asset_depend1.length === 0 && this.state.liabilities.supplyOfTrans[0].asset_depend2.length === 0 && this.state.liabilities.supplyOfTrans[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.incomeTax.length === 0 || (this.state.liabilities.incomeTax[0].asset_self.length === 0 && this.state.liabilities.incomeTax[0].asset_spouse.length === 0 && this.state.liabilities.incomeTax[0].asset_depend1.length === 0 && this.state.liabilities.incomeTax[0].asset_depend2.length === 0 && this.state.liabilities.incomeTax[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.serviceTax.length === 0 || (this.state.liabilities.serviceTax[0].asset_self.length === 0 && this.state.liabilities.serviceTax[0].asset_spouse.length === 0 && this.state.liabilities.serviceTax[0].asset_depend1.length === 0 && this.state.liabilities.serviceTax[0].asset_depend2.length === 0 && this.state.liabilities.serviceTax[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.wealthTax.length === 0 || (this.state.liabilities.wealthTax[0].asset_self.length === 0 && this.state.liabilities.wealthTax[0].asset_spouse.length === 0 && this.state.liabilities.wealthTax[0].asset_depend1.length === 0 && this.state.liabilities.wealthTax[0].asset_depend2.length === 0 && this.state.liabilities.wealthTax[0].asset_depend3.length === 0) ? null :
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

                                  {this.state.liabilities.propertyTax.length === 0 || (this.state.liabilities.propertyTax[0].asset_self.length === 0 && this.state.liabilities.propertyTax[0].asset_spouse.length === 0 && this.state.liabilities.propertyTax[0].asset_depend1.length === 0 && this.state.liabilities.propertyTax[0].asset_depend2.length === 0 && this.state.liabilities.propertyTax[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.salesTax.length === 0 || (this.state.liabilities.salesTax[0].asset_self.length === 0 && this.state.liabilities.salesTax[0].asset_spouse.length === 0 && this.state.liabilities.salesTax[0].asset_depend1.length === 0 && this.state.liabilities.salesTax[0].asset_depend2.length === 0 && this.state.liabilities.salesTax[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.anyOtherDues.length === 0 || (this.state.liabilities.anyOtherDues[0].asset_self.length === 0 && this.state.liabilities.anyOtherDues[0].asset_spouse.length === 0 && this.state.liabilities.anyOtherDues[0].asset_depend1.length === 0 && this.state.liabilities.anyOtherDues[0].asset_depend2.length === 0 && this.state.liabilities.anyOtherDues[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.grandTotalDue.length === 0 || (this.state.liabilities.grandTotalDue[0].asset_self.length === 0 && this.state.liabilities.grandTotalDue[0].asset_spouse.length === 0 && this.state.liabilities.grandTotalDue[0].asset_depend1.length === 0 && this.state.liabilities.grandTotalDue[0].asset_depend2.length === 0 && this.state.liabilities.grandTotalDue[0].asset_depend3.length === 0)  ? null :
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

                                  {this.state.liabilities.disputeLia.length === 0 || (this.state.liabilities.disputeLia[0].asset_self.length === 0 && this.state.liabilities.disputeLia[0].asset_spouse.length === 0 && this.state.liabilities.disputeLia[0].asset_depend1.length === 0 && this.state.liabilities.disputeLia[0].asset_depend2.length === 0 && this.state.liabilities.disputeLia[0].asset_depend3.length === 0)  ? null :
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
                    {this.state.criminalLoader ? <CircularProgress  className={classes.circularLoader}/> : <div className="movableAssetsContainer">
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
                                  <td className="fontRegular14 otherDetail greyFontColor">{item.criminal_record_desc}</td>
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
                              <th className="fontBold16 greyFontColor">Other detail/acts</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.criminalRecordArray.charges_convicted.map(function (item, index) {
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


      </div>

    )
  }
}

AdminCandidateProfile = withRouter(AdminCandidateProfile)
export default withStyles(styles)(AdminCandidateProfile);
