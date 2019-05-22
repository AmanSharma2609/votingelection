/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userConstituencyDetail.js
Purpose   : Constituency detail of lok sabha and vidhan sabha
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Table } from 'reactstrap';
import { Button } from '@material-ui/core';
import { Collapse } from 'reactstrap';
import PrimarySearchAppBar from '../../adminModule/appBar/appBar';
import { constants } from '../../../networkCall/constant';
import { items } from '../../../networkCall/service.js';
import produce from "immer"
import { NavLink } from 'react-router-dom';
import partyPic from '../../../images/SVGs/default_partyimg.svg';
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js';
import ErrorSnackBar from '../../../networkCall/errorSnackBar';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Emojione } from 'react-emoji-render';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Dislike from '../../../images/SVGs/dislike_unfill.svg'
import Like from '../../../images/SVGs/like_unfill.svg'
import Delete from '../../../images/SVGs/delete.svg'
import Liked from '../../../images/SVGs/like_fill.svg'
import Disliked from '../../../images/SVGs/dislike_fill.svg'
import Comment from '../../../images/SVGs/comment.svg'
import userOne from '../../../images/SVGs/default_userimg.svg'
import Publicuser from '../../../images/SVGs/default_userimg.svg'
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import Tooltip from '@material-ui/core/Tooltip';

const suggestions = []

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

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
      backgroundColor: 'none'
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
const dataParty = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }];

const dataCandidate = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  { key: 'A' }, { key: 'B' }, { key: 'C' },
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

const shortid = require('shortid');

class UserConstituencyDetails extends Component {
  state = {
    value: 0,
    userComment: '',
    consId: '',
    stateId: '',
    type: '',
    PartyList: dataParty,
    CandidateList: dataCandidate,
    collapse: false,
    stateList: [{
      state_id: '',
      state_name: '',
      districts: [],
      collapse: true
    }],
    userDetailArr: [{ 'user_name': '' }],
    totalCandidatePartyArr: [],
    hideShowVar: 'filterCandidateContainer',
    single: '',
    popper: '',
    suggestions: [],
    vertical: 'top',
    horizontal: 'center',
    open: false,
    hideShowVar: 'filterCandidateContainer',
    msg: '',
    active: '',
    newsArray: [],
    newsArryCount: 0,
    userCommentArray: [],
    publicOpinionArray: [],
    constituencyHistoryData: { 'current_leader': [], 'upcoming_election': [], 'past_election': [] },
    openComment: false,
    userCommentAdd: {},
    candidatesOfElection: ['', '', '', '', '', ''],
    newCreatedOn: '',
    commentCount: '',
    commentLikeCount: '',
    commentDislikeCount: '',
    dailogPostArray: '',
    activityComment: '',
    newsId: '',
    userId: '',
    tokenId: '',
    consDesc: '',
    countScroll: 0,
    openDelOpi: false,
    opinionId: '',
    indxOpi: '',
    openDelCommentPost: false,
    breadCrumbLabel: 'Activity',
    openDelCommentPost: false,
    userCommDelete: {
      index: '',
      comment_id: ''
    },
    newsIndexValue: '',
    opinionCount: 0,
    activityComButton: false,
    publicOpComment: false,

  }

  // ==================================================Component Mount=====================================================================

  componentDidMount() {

    this.state.stateList[0].state_name = this.props.match.params.name;
    this.state.stateList[0].state_id = this.props.match.params.id;
    this.setState({ stateList: this.state.stateList });
    this.setState({ userId: localStorage.getItem('userId') });
    this.setState({ tokenId: localStorage.getItem('accessToken') });
    this.setState({ url: this.props.location.pathname }, function () {
      this.setState({ url: shortid.generate(`https://stgvec.apnaneta.com/#${this.props.location.pathname}`) }, function () {
      })
    })
    this.setState({ url1: this.props.location.pathname }, function () {
      this.setState({ url1: encodeURI(this.props.location.pathname) }, function () {
      })
    })
    this.props.match.params.type === 'lok_sabha' ? this.state_const() : this.vidhanConst();
    this.setState({ type: this.props.match.params.type }, () => {
      this.setState({ stateId: this.props.match.params.id });
      this.setState({ consId: this.props.match.params.consId }, () => {
        this.constituencyNews();
        this.constituencyPublicOpinion();
        this.constituencyHistory();
      });
    });
    if (localStorage.getItem(btoa('userdetail')) !== null) {
      this.setState({ userDetailArr: JSON.parse(atob(localStorage.getItem(btoa('userdetail')))) });
    }
    if (localStorage.getItem('consDesc')) {
      this.setState({ consDesc: localStorage.getItem('consDesc') });
    }
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  }

  // ==================================================Component update on route params=====================================================================

  componentWillReceiveProps = (newProps) => {
    this.setState({ newsArray: [] });
    this.setState({ newsArryCount: 0 });
    this.setState({ publicOpinionArray: [] });
    this.setState({ opinionCount: 0 });
    let stateIndex = this.state.stateList.indexOf(this.searchFunction(this.state.stateList, 'state_id', parseInt(newProps.match.params.id, 10)));
    if (stateIndex == -1) {
      stateIndex = 0;
    }
    let districtIndex = this.state.stateList[stateIndex].districts.indexOf(this.searchFunction(this.state.stateList[stateIndex].districts, 'district_id', parseInt(newProps.match.params.consId, 10)));
    for (let i = 0; i < this.state.stateList.length; i++) {
      for (let j = 0; j < this.state.stateList[i].districts.length; j++) {
        this.state.stateList[i].districts[j].active = false;
      }
    }
    this.state.stateList[stateIndex].districts[districtIndex].active = true;
    this.setState({ url: newProps.location.pathname }, function () {
      this.setState({ url: shortid.generate(`https://stgvec.apnaneta.com${newProps.location.pathname}`) }, function () {
      })
    })
    this.setState({ url1: newProps.location.pathname }, function () {
      this.setState({ url1: encodeURI(newProps.location.pathname) }, function () {
      })
    })
    this.setState({ consId: newProps.match.params.consId }, () => {
      this.setState({ stateId: newProps.match.params.id })
      this.setState({ type: newProps.match.params.type }, () => {
        this.constituencyNews();
        this.constituencyPublicOpinion();
        this.constituencyHistory();
      });
    });
    if (localStorage.getItem('consDesc')) {
      this.setState({ consDesc: localStorage.getItem('consDesc') });
    }
  }


  handleChange = (event, value, index) => {
    this.setState({ value: value });
    if (value === 1) {
      this.setState({ breadCrumbLabel: 'Public Opinions' })
    } else if (value === 2) {
      this.setState({ breadCrumbLabel: 'General Information' })
    } else {
      this.setState({ breadCrumbLabel: 'Activity' })
    }
  };

  // ================================================== Accordion functionality =====================================================================

  toggle = (index) => {
    if (this.state.stateList[index].collapse === false) {
      this.state.stateList[index].collapse = true;
      this.setState({ stateList: this.state.stateList });
    }
    else {
      this.state.stateList[index].collapse = false;
      this.setState({ stateList: this.state.stateList });
    }
    for (let i = 0; i < this.state.stateList.length; i++) {
      if (index != i) {
        this.state.stateList[i].collapse = false;
      }
    }
    this.getConstituencies(index);
  }

  getConstituencies = (index) => {
    if (this.state.stateList[index].districts.length === 0 && this.state.type === 'lok_sabha') {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: this.state.tokenId,
        state_id: this.state.stateList[index].state_id,
        user_id: this.state.userId
      }
      items('POST', requestedData, constants.lokSabhaConst)
        .then(response => {
          if (response.status === "Success") {
            if (!(response.data.length === 0 || response.data === null)) {
              for (let i of response.data) {
                let detail = {
                  district_id: i.ls_constituency_id,
                  district_name: i.ls_constituency_name.toLowerCase(),
                  district_cons: i.ls_constituency_desc,
                  stateListArrayIndex: index,
                  active: false
                }
                this.state.stateList[index].districts.push(detail);
              }
              this.setState({ stateList: this.state.stateList });
            }
          }
          else if (response.status === "Failure") {
          }
          else {
          }
        })
    } else if (this.state.stateList[index].districts.length === 0 && this.state.type === 'vidhan_sabha') {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        district_id: this.state.stateList[index].state_id,
        user_id: this.state.userId
      }
      items('POST', requestedData, constants.viewConstituencyList)
        .then(response => {
          if (response.status === "Success") {
            if (!(response.data.length === 0 || response.data === null)) {
              for (let i of response.data) {
                let detail = {
                  district_id: i.vs_constituency_id,
                  district_name: i.vs_constituency_name,
                  district_cons: i.vs_constituency_desc,
                  stateListArrayIndex: index,
                  active: false
                }
                this.state.stateList[index].districts.push(detail);

              }
              this.setState({ stateList: this.state.stateList });
            }
          }
          else if (response.status === "Failure") {
          }
          else {
          }
        })
    }
  }

  // ==================================================Public opinion text box value fetch=====================================================================

  handleUserComment = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // ==================================================Add comment in public opinion=====================================================================
  addPublicOpinion = () => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: localStorage.getItem('accessToken'),
        user_id: localStorage.getItem('userId'),
        opinion_desc: this.state.userComment,
        opinion_type: this.state.type,
        opinion_on_id: this.state.consId,
      }
      if (this.state.userComment.trim() !== '') {
        this.setState({ publicOpComment: true })
        items('POST', requestedData, constants.userComment)
          .then(response => {
            if (response.status === "Success") {
              let temp = {
                dislikes_count: 0,
                likes_count: 0,
                opinion_by: 644,
                opinion_created_on: 'Just now',
                opinion_desc: this.state.userComment,
                public_opinion_id: response.data,
                status: null,
                user_img_url: this.state.userDetailArr[0].user_img_url,
                user_name: this.state.userDetailArr[0].user_name,
              }
              this.state.publicOpinionArray.splice(0, 0, temp)
              this.setState({ publicOpinionArray: this.state.publicOpinionArray });
              this.setState({ userComment: '' });
              this.setState({ publicOpComment: false });
            }
            else if (response.status === 'Failure') {
            }
            else {
            }
          });
      }
      else {
        this.setState({ msg: 'Please enter something to continue.' });
        this.setState({ open: true });
        setTimeout(() => {
          this.setState({ open: false })
        }, 2500)
      }
    }
    else {
      this.setState({ msg: constants.msg.LoginContinueMsg });
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false })
      }, 2500)
    }
  }

  // ==================================================Public opinion like functionality=====================================================================

  handleOpinionLike = (index, status, public_opinion_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 0) {
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].likes_count += 1
        }), function () {
          this.setState({ userOpinionLike: { ...this.state.userOpinionLike, opinion_status: 1, opinion_id: public_opinion_id } }, function () {
            this.userOpinionLikeApi(1, public_opinion_id)
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
            this.userOpinionLikeApi(1, public_opinion_id)
          });
        });
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].status = null
        }), function () {
        })
      }
    }
    else {
      this.setState({ msg: constants.msg.LoginContinueMsg });
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false })
      }, 2500)
    }
  }

  // ==================================================Public opinion dislike functionality=====================================================================

  handleOpinionDislike = (index, status, public_opinion_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 1) {
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].dislikes_count += 1
        }), function () {
          this.setState({ userOpinionLike: { ...this.state.userOpinionLike, opinion_status: 0, opinion_id: public_opinion_id } }, function () {
            this.userOpinionLikeApi(0, public_opinion_id)
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
            this.userOpinionLikeApi(0, public_opinion_id)
          });
        });
        this.setState(produce((draft) => {
          draft.publicOpinionArray[index].status = null
        }), function () {
        })
      }
    }
    else {
      this.setState({ msg: constants.msg.LoginContinueMsg });
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false })
      }, 2500)
    }
  }

  // =================================================Api integration to fetch the activity news=====================================================================

  constituencyNews() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      constituency_id: this.state.consId,
      constituency_type: this.state.type,
      user_id: this.state.userId,
      count: this.state.newsArryCount
    }
    items('POST', requestedData, constants.constituencyNewsApi)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === [])) {
            for (let i of response.data) {
              this.state.newsArray.push(i);
            }
            this.setState({ newsArray: this.state.newsArray })
            this.setState({ newsArryCount: this.state.newsArryCount + 1 });
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // ==================================================Api integration to fetch public opinion=====================================================================

  constituencyPublicOpinion() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      constituency_id: this.state.consId,
      constituency_type: this.state.type,
      user_id: this.state.userId,
      count: this.state.opinionCount
    }
    items('POST', requestedData, constants.cosntituencyPublicOpinion)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === [])) {
            for (let i of response.data) {
              this.state.publicOpinionArray.push(i);
            }
            this.setState({ publicOpinionArray: this.state.publicOpinionArray })
            this.setState({ opinionCount: this.state.opinionCount + 1 });
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // ==================================================APi integration to fetch lok sabha constituency================================================================

  state_const() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: this.state.tokenId,
      state_id: this.props.match.params.id,
      user_id: this.state.userId
    }
    items('POST', requestedData, constants.lokSabhaConst)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data.length === 0 || response.data === null)) {
            for (let i of response.data) {
              let detail = {
                district_id: i.ls_constituency_id,
                district_name: i.ls_constituency_name,
                district_cons: i.ls_constituency_desc,
                stateListArrayIndex: 0,
                active: false
              }
              this.state.stateList[0].districts.push(detail);
            }
            this.setState({ stateList: this.state.stateList }, () => {
              let temp = this.state.stateList[0].districts.indexOf(this.searchFunction(this.state.stateList[0].districts, 'district_id', parseInt(this.props.match.params.consId, 10)));
              this.state.stateList[0].districts[temp].active = true;
            });
          }
          this.setState({ contiListLoading: false })
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      })

    let stateAPIParams = {
      votingElection_code: constants.votingElectionCode
    }
    items('POST', stateAPIParams, constants.viewAllState).then(response => {
      if (response.status === "Success") {
        if (!(response.data.length === 0 || response.data === null)) {
          for (let item of response.data) {
            let detail = {
              state_id: item.state_id,
              state_name: item.state_name,
              districts: [],
              collapse: false
            }
            if (this.state.stateList[0].state_id !== '' && detail.state_id != this.state.stateList[0].state_id) {
              this.state.stateList.push(detail);
            }
          }
          this.setState({ stateList: this.state.stateList }, () => {
          });
        }
      }
      else if (response.status === "Failure") {
      }
      else {
      }
    })
  }

  // ==================================================To open a comment box=====================================================================

  handleOpenCommentBox = (news_id, news_text, comment_count, likes_count, dislikes_count, news_created_on, index) => {
    this.setState({ newCreatedOn: news_created_on })
    this.setState({ commentCount: comment_count })
    this.setState({ commentLikeCount: likes_count })
    this.setState({ commentDislikeCount: dislikes_count })
    this.setState({ dailogPostArray: news_text })
    this.setState({ newsIndexValue: index })
    this.setState({ newsId: news_id }, () => {
      this.newsArrayComment();
      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
    });
  }

  scrollToBottom = () => {
    if (this.state.userCommentArray.length !== 0) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  newsArrayComment() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      news_id: this.state.newsId
    }
    items("POST", requestedData, constants.userCommentView)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ openComment: true })
          if (response.data !== null || response.data.length === 0) {
            this.setState({ userCommentArray: response.data })
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // ==================================================To add a comment in a comment box=====================================================================

  handleAddNewsComment = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId'),
      comment_desc: encodeURI(this.state.activityComment),
      comment_on_id: this.state.newsId,
    }
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (this.state.activityComment.trim() !== "") {
        this.setState({ activityComButton: true })
        items("POST", requestedData, constants.userCommentAdd)
          .then(response => {
            if (response.status === "Success") {
              let temp = {
                comment_by: localStorage.getItem('userId'),
                comment_created_on: "Just now",
                comment_desc: this.state.activityComment,
                comment_id: '',
                user_name: this.state.userDetailArr[0].user_name
              }
              this.setState({ userCommentArray: [...this.state.userCommentArray, temp] })
              this.setState({ activityComment: '' });
              this.setState({ activityComButton: false })
              this.setState({ commentCount: this.state.commentCount + 1 });
              this.newsArrayComment();
              this.state.newsArray[this.state.newsIndexValue].comment_count = this.state.newsArray[this.state.newsIndexValue].comment_count + 1;
              this.setState({ newsArray: this.state.newsArray });
              this.scrollToBottom();
            }
          })
      }
      else {
        this.setState({ msg: 'Please enter something to continue.' });
        this.setState({ open: true });
        setTimeout(() => {
          this.setState({ open: false })
        }, 2500)
      }
    }
    else {
      this.setState({ msg: 'Please login to continue.' });
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false })
      }, 2500)
    }
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      if (this.state.activityComButton === false) {
        this.handleAddNewsComment();
      }
    }
  }

  // ==================================================To close the comment box=====================================================================

  handleCloseComment = () => {
    this.setState({ openComment: false })
  }

  // ==================================================To dislike the news from activity=====================================================================

  handleDislike = (index, status, news_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 1) {
        this.setState(produce((draft) => {
          draft.newsArray[index].dislikes_count += 1
        }), function () {
          this.setState({ userActivityLike: { ...this.state.userActivityLike, news_status: 0, news_id: news_id } }, function () {
            this.userActivityLikeApi(0, news_id)
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
            this.userActivityLikeApi(0, news_id)
          });
        });
        this.setState(produce((draft) => {
          draft.newsArray[index].status = null
        }), function () {
        })
      }
    }
    else {
      this.setState({ msg: constants.msg.LoginContinueMsg });
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false })
      }, 2500)
    }
  }

  // ==================================================To like a the news from activity=====================================================================

  handleLike = (index, status, news_id) => {
    if (localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken')) {
      if (status === null || status === 0) {
        this.setState(produce((draft) => {
          draft.newsArray[index].likes_count += 1
        }), function () {
          this.setState({ userActivityLike: { ...this.state.userActivityLike, news_status: 1, news_id: news_id } }, function () {
            this.userActivityLikeApi(1, news_id)
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
            this.userActivityLikeApi(1, news_id)
          });
        });
        this.setState(produce((draft) => {
          draft.newsArray[index].status = null
        }), function () {
        })
      }
    }
    else {
      this.setState({ msg: constants.msg.LoginContinueMsg });
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false })
      }, 2500)
    }
  }


  // ==================================================Api integration of like dislike API=====================================================================

  userActivityLikeApi = (status, id) => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId'),
      news_id: id,
      news_status: status
    }
    items("POST", requestedData, constants.activityLike)
      .then(response => {
        if (response.status === "Success") {
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      })
  }

  // ==================================================T0 search value from array of json functionality=====================================================================

  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  // ==================================================To fetch the data of lok sabha integration=====================================================================

  vidhanConst() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: this.state.tokenId,
      district_id: this.props.match.params.id,
      user_id: this.state.userId
    }
    items('POST', requestedData, constants.viewConstituencyList)
      .then(response => {
        if (response.status === 'Success') {
          if (!(response.data === null || response.data.length === 0)) {
            for (let i of response.data) {
              let detail = {
                district_id: i.vs_constituency_id,
                district_name: i.vs_constituency_name.toLowerCase(),
                district_cons: i.vs_constituency_desc,
                stateListArrayIndex: 0,
                active: false
              }
              this.state.stateList[0].districts.push(detail);
            }

            // Fetching other districts list
            let districtAPIParams = {
              votingElection_code: constants.votingElectionCode,
              state_id: response.data[0].state_id
            }
            items('POST', districtAPIParams, constants.viewAllDistrictList).then(response => {
              if (response.status === "Success") {
                if (!(response.data.length === 0 || response.data === null)) {
                  for (let item of response.data) {
                    let detail = {
                      state_id: item.district_id,
                      state_name: item.district_name,
                      districts: [],
                      collapse: false
                    }
                    if (this.state.stateList[0].state_id !== '' && detail.state_id != this.state.stateList[0].state_id) {
                      this.state.stateList.push(detail);
                    }
                  }
                  this.setState({ stateList: this.state.stateList });
                }
              }
              else if (response.status === "Failure") {
              }
              else {
              }
            })
            this.setState({ stateList: this.state.stateList }, () => {
              let temp = this.state.stateList[0].districts.indexOf(this.searchFunction(this.state.stateList[0].districts, 'district_id', parseInt(this.props.match.params.consId, 10)));
              this.state.stateList[0].districts[temp].active = true;
            });
          }
        }
        else if (response.status === 'Failure') {
        }
        else {
        }
      })
  }

  handleProfileClick = (candidate_id, candidate_name) => {
    if (this.isAdmin()) {
      this.props.history.push({
        pathname: '/AdminCandidate/:/:/AdminCandidateProfile/' + candidate_name + '/' + candidate_id
      });
    }
    else {
      this.props.history.push({
        pathname: '/Candidate/Candidate-Profile/',
        search: `?name=${candidate_name}&&id=${candidate_id}`
      });
    }
  }

  // ==================================================Api integration to fetch the constituency history==========================================================

  constituencyHistory() {
    this.setState({ constituencyHistoryData: { 'current_leader': [], 'upcoming_election': [], 'past_election': [] } })
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      constituency_type: this.state.type,
      state_id: this.state.stateId,
      constituency_id: this.state.consId,
    }
    items('POST', requestedData, constants.constituencyHistoryApi)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data === '')) {
            this.setState({ constituencyHistoryData: response.data });
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // ==================================================To like the user Commnet API=====================================================================

  userOpinionLikeApi = (status, id) => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId'),
      opinion_id: id,
      opinion_status: status
    }
    items("POST", requestedData, constants.userOpinionLike)
      .then(response => {
        if (response.status === "Success") {
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      })
  }

  // ==================================================Change the route using param observable=====================================================================

  selectAnotherConstituency = (id, index, desc, stateListArrayIndex) => {
    this.setState({ active: index });
    this.setState({ userComment: '' });
    localStorage.setItem('consDesc', desc);
    if (this.isAdmin())
      this.props.history.push('/AdminConstituencyDetails/' + this.state.type + '/' + this.state.stateList[stateListArrayIndex].state_id + '/' + this.state.stateList[stateListArrayIndex].state_name + '/' + id + '/' + 'desc')
    else
      this.props.history.push('/UserConstituencyDetails/' + this.state.type + '/' + this.state.stateList[stateListArrayIndex].state_id + '/' + this.state.stateList[stateListArrayIndex].state_name + '/' + id + '/' + 'desc')
    this.setState({ hideShowVar: 'filterCandidateContainer' });
  }



  // ==================================================To switch the card value by 1+=====================================================================

  handleNext = () => {
    if (this.state.countScroll !== this.state.constituencyHistoryData.upcoming_election.length - 1) {
      this.setState({ countScroll: this.state.countScroll + 1 });
    }
    document.getElementById('scrollDiv').scrollBy({ left: (265), behavior: 'smooth' });
  };

  // ====================================================Tp switch the card value by 1-===================================================================

  handleBack = () => {
    if (this.state.countScroll !== 0) {
      this.setState({ countScroll: this.state.countScroll - 1 });
    }
    document.getElementById('scrollDiv').scrollBy({ left: (-265), behavior: 'smooth' });
  };

  hideShow = () => {
    if (this.state.hideShowVar === 'filterCandidateContainer') {
      this.setState({ hideShowVar: 'filterCandidateContainerHideShow' });
    }
    else {
      this.setState({ hideShowVar: 'filterCandidateContainer' });
    }
  }

  isAdmin = () => {
    return (localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'admin');
  }


  handleDeleteOpen = (public_opinion_id, index) => {
    this.setState({ openDelOpi: true })
    this.setState({ opinionId: public_opinion_id })
    this.setState({ indxOpi: index })
    this.setState({ openDelOpi: true })
  }

  handleCloseDelOpi = () => {
    this.setState({ openDelOpi: false })
  }

  handleDeleteOpinion = () => {
    if (this.isAdmin()) {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: this.state.tokenId,
        opinion_id: this.state.opinionId
      }
      items("POST", requestedData, constants.adminDeleteOpinion)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ openDelOpi: false })
            this.state.publicOpinionArray.splice(this.state.indxOpi, 1);
            this.setState({ publicOpinionArray: this.state.publicOpinionArray });
          }
          else if (response.status === "Failure") {
          }
          else {
          }
        });
    }
    else {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: this.state.tokenId,
        user_id: this.state.userId,
        opinion_id: this.state.opinionId
      }
      items("POST", requestedData, constants.userDeleteOpinion)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ openDelOpi: false });
            this.state.publicOpinionArray.splice(this.state.indxOpi, 1);
            this.setState({ publicOpinionArray: this.state.publicOpinionArray });
          }
          else if (response.status === "Failure") {
          }
          else {
          }
        });
    }
  }

  deleteCommentPostPopup = (openPopup, comment_id, index) => {
    this.setState({ openDelCommentPost: openPopup });
    this.setState({ userCommDelete: { ...this.state.userCommDelete, comment_id: comment_id, index: index } });
  }

  handleUserDeleteComment = () => {
    if (this.isAdmin()) {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: this.state.tokenId,
        comment_id: this.state.userCommDelete.comment_id
      }

      items("POST", requestedData, constants.adminDeleteComm)
        .then(response => {
          if (response.status === "Success") {
            if (response.status === "Success") {
              this.state.userCommentArray.splice(this.state.userCommDelete.index, 1);
              this.setState({ userCommentArray: this.state.userCommentArray });
              this.setState({ commentCount: this.state.commentCount - 1 })
              this.state.newsArray[this.state.newsIndexValue].comment_count = this.state.newsArray[this.state.newsIndexValue].comment_count - 1;
              this.setState({ newsArray: this.state.newsArray });
            }
          }
        })
      this.setState({ openDelCommentPost: false });
    }
    else {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: this.state.tokenId,
        user_id: this.state.userId,
        comment_id: this.state.userCommDelete.comment_id
      }
      items("POST", requestedData, constants.userDeleteComment)
        .then(response => {
          if (response.status === "Success") {
            items("POST", requestedData, constants.userCommentView)
              .then(response => {
                if (response.status === "Success") {
                  this.state.userCommentArray.splice(this.state.userCommDelete.index, 1);
                  this.setState({ userCommentArray: this.state.userCommentArray });
                  this.setState({ commentCount: this.state.commentCount - 1 })
                  this.state.newsArray[this.state.newsIndexValue].comment_count = this.state.newsArray[this.state.newsIndexValue].comment_count - 1;
                  this.setState({ newsArray: this.state.newsArray });
                }
                else {
                }
              })
          }
        })
    }
    this.setState({ openDelCommentPost: false });
  }

  handleRecentPostScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      if (this.state.value === 0) {
        this.constituencyNews();
      }
      else if (this.state.value === 1) {
        this.constituencyPublicOpinion();
      }
      else {
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

  handleCandidateImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }

  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  render() {
    const { vertical, horizontal } = this.state;
    const { classes, theme, ...other } = this.props;

    return (
      <div className="AppUserLogin userElection heightContainer" onScroll={this.handleRecentPostScroll}>
        {
          (this.isAdmin()) ?
            <PrimarySearchAppBar />
            :
            <UserSearchAppBar />
        }
        <Container fluid={true} className="">
          <Row className="homeArea">
            <div className="text-left col-9">
              {(this.isAdmin()) ?
                <div className="fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / <NavLink className="breadCrumbs" to="/AdminStateConstituency">Constituencies</NavLink> / {this.state.breadCrumbLabel}</div>
                :
                <div className="fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / <NavLink className="breadCrumbs" to="/UserStateConstituency">Constituencies</NavLink> / {this.state.breadCrumbLabel}</div>
              }
            </div>
            <div className="text-right col-3">
              <button className="showHide fa fa-ellipsis-h" onClick={this.hideShow}></button>
            </div>
          </Row>
        </Container>
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
        <div className="constituencyContainer ml-auto mr-auto mt-5 candidateProfileContainer constituencyDetailContainer">
          <Container fluid={true} className="ml-xl-3 ml-lg-3 ml-md-2 ml-0">
            <Row className="marginTop80">
              <Col sm={12} xs={12} className="d-flex">
                <div className={`${this.state.hideShowVar}`}>
                  <div className="filterCandidate rounded pb-3">
                    <div className="">
                      <div>
                        {this.state.stateList.map((item, index) => {
                          return (
                            <div className="position-relative">
                              <div className="pl-3 pr-3 border-bottom pt-2 pb-2 fontSemiBold16 greyFontColor text-left constituencyNameDetail cursorPointer" onClick={this.toggle.bind(this, index)}>
                                {item.state_name}
                                {item.collapse === false ?
                                  <ChevronRight className="cursorPointer greyFontColor caretRightIcon" />
                                  :
                                  <ExpandMore className="cursorPointer greyFontColor caretRightIcon" />
                                }
                              </div>
                              <Collapse isOpen={item.collapse}>
                                {item.districts.map((item, index) => {
                                  return (
                                    <div className={`collapsibleMenuItem fontRegular14 cursorPointer border-bottom ${item.active === true ? 'activeDistrict border-left border-right' : null}`} onClick={this.selectAnotherConstituency.bind(this, item.district_id, index, item.district_cons, item.stateListArrayIndex)}>
                                      <span className="text-capitalize">{item.district_name}</span>
                                      <br />
                                    </div>
                                  )
                                })}
                              </Collapse>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="allCandidateContainer row ml-xl-3 ml-lg-3 ml-md-3 ml-0">
                  <div className="rounded w-100">
                    <Row className="">
                      <Col className="">
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
                              <Tab label="General Information" className={this.state.value === 2 ? classes.active_tab : classes.tabLabelStyle} />
                            </Tabs>
                          </AppBar>
                        </div>
                      </Col>
                    </Row>

                    {/* <--------------Activity-Tab Starts Here---------------------------------> */}

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
                                          <span><img src={Like} alt={Like} className="likeDislikeIcons" /></span>
                                        </div>
                                        <div className="mr-1 ml-1 d-flex align-items-center">
                                          <span className="mr-2">{this.state.commentDislikeCount}</span>
                                          <span><img src={Dislike} alt={Dislike} className="likeDislikeIcons" /></span>
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
                                                    <div className="pl-0 pr-0">By <span className="text-capitalize">{item.user_name}</span></div>
                                                    {this.isAdmin() ?
                                                      <div>
                                                        <span className="ml-3 cursorPointer"
                                                          onClick={this.deleteCommentPostPopup.bind(this, true, item.comment_id, index)}
                                                        >
                                                          <img src={Delete} className="greyFontColor cursorPointer icon"
                                                            alt="" width="13" />
                                                        </span>
                                                      </div>
                                                      :
                                                      <div>
                                                        {
                                                          item.user_name === this.state.userDetailArr[0].user_name ?
                                                            <div className="col-4 cursorPointer"
                                                              onClick={this.deleteCommentPostPopup.bind(this, true, item.comment_id, index)}
                                                            >
                                                              <img src={Delete} className="greyFontColor cursorPointer icon"
                                                                alt="" width="13" />
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                      </div>
                                                    }
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
                                        {this.isAdmin() ? null :
                                          <input type="text"
                                            onChange={this.handleUserComment}
                                            name="activityComment"
                                            onKeyPress={this.onEnter}
                                            value={this.state.activityComment}
                                            placeholder="comment something..."
                                            className=" fontRegular14 w-100 commentBoxInput"
                                          />
                                        }
                                        {this.isAdmin() ? null :
                                          <Button
                                            bssize="large"
                                            color="inherit"
                                            onClick={this.handleAddNewsComment}
                                            disabled={this.state.activityComButton ? true : false}
                                            className={`${classes.buttonUserCandidate} ${classes.postButton}`}
                                          >POST</Button>
                                        }
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
                      <Row className="ml-1">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                          <div className="commentShow pr-3 border-0">
                            {this.state.newsArray.length === 0 ? <div className="fontSemiBold16 mb-5 mt-5"> No news available</div> :
                              <div>
                                {this.state.newsArray.map((item, index) => {
                                  return (
                                    <div className="mt-3">
                                      <div className="text-left pl-0 greyFontColor fontSemiBold13 mb-2 wordBreak">
                                        <strong>{item.news_title}</strong>
                                      </div>
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
                                              {this.isAdmin() ?
                                                <img src={item.status === 1 ? Liked : Like}
                                                  className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} likeDislikeIcons`} alt=""
                                                />
                                                :
                                                <img onClick={this.handleLike.bind(this, index, item.status, item.news_id)} src={item.status === 1 ? Liked : Like}
                                                  className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} likeDislikeIcons`} alt="" height="15" width="15"
                                                />
                                              }
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
                                                {this.isAdmin() ?
                                                  <img src={Disliked}
                                                    className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                    alt="" height="15" width="15"
                                                  />
                                                  :
                                                  <img src={Disliked}
                                                    onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                    className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                    alt="" height="15" width="15"
                                                  />
                                                }
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
                                                {this.isAdmin() ?
                                                  <img src={Dislike}
                                                    className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                    alt=""
                                                  />
                                                  :
                                                  <img src={Dislike}
                                                    onClick={this.handleDislike.bind(this, index, item.status, item.news_id)}
                                                    className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                                    alt=""
                                                  />
                                                }
                                              </Tooltip>
                                            }
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
                                              {this.isAdmin() ?
                                                <img src={Comment}
                                                  onClick=
                                                  {this.handleOpenCommentBox.bind(this, item.news_id, item.news_text, item.comment_count, item.likes_count, item.dislikes_count, item.news_created_on, index)} className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}
                                                  alt="" height="15" width="15" className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}
                                                /> :
                                                <img src={Comment}
                                                  onClick=
                                                  {this.handleOpenCommentBox.bind(this, item.news_id, item.news_text, item.comment_count, item.likes_count, item.dislikes_count, item.news_created_on, index)} className={localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin}
                                                  alt="" height="15" width="15"
                                                />
                                              }
                                            </Tooltip>
                                          </p>
                                          {this.isAdmin() ? null :
                                            <div className="ml-2 form-inline" onClick={this.getTheValue.bind(this, item.news_text)}>
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
                                          }
                                        </div>
                                        <div className="fontRegular12 greyFontColor ml-auto">
                                          {item.news_created_on}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                }
                                )}
                              </div>
                            }
                          </div>

                        </Col>
                      </Row>
                    </div>
                    }
                    {/* <--------------Activity-Tab Ends Here---------------------------------> */}

                    {/* <--------------Public Opinions-Tab Starts Here---------------------------------> */}
                    {this.state.value === 1 && <div className="pt-3" onScroll={this.handlePublicScroll}>
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
                      <div>
                        {this.isAdmin() ? null :
                          <Row className="mb-3 ml-0 mr-0">
                            <div className="opinionImageContainer">
                              <div className="imageUploadOpinion">
                                <img src={this.state.user_profile === null || this.state.user_profile === undefined || this.state.user_profile === '' ? Publicuser : this.state.user_profile}
                                  alt="" className='imageOpinion'
                                  onError={this.handleCandidateImgError}
                                />
                              </div>
                              <div className="fontSemiBold13 greyFontColor mt-2 text-capitalize">{this.state.user_name}</div>
                            </div>
                            <div className="commentSection">
                              <div className="">
                                <textarea
                                  type="text"
                                  ref=""
                                  className="form-control fontRegular14 commentTextEdit"
                                  onChange={this.handleUserComment}
                                  name='userComment'
                                  value={this.state.userComment}
                                ></textarea>
                              </div>
                              <div className="text-right">
                                <MuiThemeProvider theme={theme}>
                                  <Button
                                    onClick={this.addPublicOpinion}
                                    className={classes.buttonComment}
                                    disabled={this.state.publicOpComment ? true : false}
                                  >
                                    Comment
                                    </Button>
                                </MuiThemeProvider>
                              </div>
                            </div>
                          </Row>
                        }
                      </div>
                      {this.state.publicOpinionArray === null || this.state.publicOpinionArray.length === 0 ? <div className="fontSemiBold16 mb-5 mt-5"> No public opinion available.</div> :
                        <div>
                          {this.state.publicOpinionArray.map((item, index) => {
                            return (
                              <Row className="mt-3 ml-0 mr-0 publicOpinionComment">
                                <div className="opinionImageContainer">
                                  <div className="imageUploadOpinion">
                                    <img src={item.user_img_url === null || item.user_img_url === '' || item.user_img_url === undefined ? Publicuser : item.user_img_url}
                                      alt="" className='imageOpinion'
                                      onError={this.handleCandidateImgError}
                                    />
                                  </div>
                                  <div className="fontSemiBold13 greyFontColor text-capitalize user_name_truncate">{item.user_name}</div>
                                </div>
                                <div className="commentSection border-0 d-flex flex-column align-self-end">
                                  <p className="text-left fontRegular14 greyFontColor wordBreak preWrapWhiteSpace mb-2">
                                    <Emojione size={42} text={item.opinion_desc} />
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
                                          {this.isAdmin() ?
                                            <img src={item.status === 1 ? Liked : Like}
                                              className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} likeDislikeIcons`}
                                              alt=""
                                            />
                                            :
                                            <img src={item.status === 1 ? Liked : Like} onClick={this.handleOpinionLike.bind(this, index, item.status, item.public_opinion_id)}
                                              className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} likeDislikeIcons`}
                                              alt=""
                                            />
                                          }
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
                                          {this.isAdmin() ?
                                            <img src={item.status === 0 ? Disliked : Dislike}
                                              className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                              alt=""
                                            />
                                            :
                                            <img src={item.status === 0 ? Disliked : Dislike} onClick={this.handleOpinionDislike.bind(this, index, item.status, item.public_opinion_id)}
                                              className={`${localStorage.getItem('userType') === 'user' && localStorage.getItem('accessToken') ? classes.iconMargin : classes.disabledIconMargin} mt-2 likeDislikeIcons`}
                                              alt=""
                                            />
                                          }
                                        </Tooltip>
                                      </div>&nbsp;
                                        {this.isAdmin() ?
                                        <div className="remove1box">
                                          <div className="greyFontColor cursorPointer remove1">
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
                                                alt="" width="13"
                                              /></Tooltip>
                                          </div>
                                        </div>
                                        :
                                        <div className="remove1box">
                                          {this.state.userDetailArr[0].user_name === item.user_name ? <div className="greyFontColor cursorPointer remove1">
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
                                                alt="" height="18" width="18"
                                              /></Tooltip>
                                          </div>
                                            : null}
                                        </div>
                                      }
                                    </div>
                                    <div className="ml-auto form-inline pr-4 ">
                                      <span className="greyFontColor">{item.opinion_created_on}</span>
                                    </div>
                                  </div>
                                </div>
                              </Row>
                            )
                          })}
                        </div>
                      }
                    </div>
                    }

                    {/* <--------------Public Opinions-Tab Ends Here---------------------------------> */}

                    {/* <--------------General Information-Tab Starts Here---------------------------------> */}

                    {this.state.value === 2 &&
                      <div>
                        {this.state.constituencyHistoryData.current_leader.length === 0 && this.state.constituencyHistoryData.upcoming_election.length === 0 && this.state.constituencyHistoryData.past_election.length === 0 ?
                          <div className="fontSemiBold16 mb-5 mt-5"> No record available</div>
                          :
                          <div className="mt-2 text-left">
                            <Row className="ml-0 mr-0 pl-3 pr-3 mb-3 mt-3">
                              <h3 className="fontBold16">Current Leader</h3>
                              <Row className="mt-2 w-100 ml-0 mr-0">
                                {this.state.constituencyHistoryData.current_leader === undefined || this.state.constituencyHistoryData.current_leader === null || this.state.constituencyHistoryData.current_leader.length === 0 ? null :

                                  <div className="currentLeaderCard">
                                    {this.state.constituencyHistoryData.current_leader.map((item, index) => {
                                      return (
                                        <div className="candidateProfile pt-2 boxShadow cursorPointer" onClick={this.handleProfileClick.bind(this, item.candidate_id, item.candidate_name)}>
                                          <div className="col-12 d-flex justify-content-center">
                                            <div className="imageUpload">
                                              <Image className="imageCandidatePartyProfile" src={!(item.candidate_img_url === null
                                                || item.candidate_img_url === ''
                                                || item.candidate_img_url === undefined)
                                                ?
                                                item.candidate_img_url
                                                :
                                                userOne}
                                                onError={this.handleCandidateImgError}
                                              >
                                              </Image>
                                            </div>
                                            <div className="badgeIcon">
                                              <Image className="partyImage" src={!(item.party_img_url === null
                                                || item.party_img_url === ''
                                                || item.party_img_url === undefined)
                                                ?
                                                item.party_img_url
                                                : partyPic}
                                                onError={this.handlePartyImgError}
                                              >
                                              </Image>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <span className="fontBold14 greyFontColor mt-3 heading_height">{item.candidate_name}</span>
                                            <br />
                                            <span className="fontRegular12 greyFontColor mt-3 heading_height">{item.party_code}</span>
                                            <br />
                                            <span className="fontRegular12 greyFontColor mb-5 mt-1">
                                              <i>{item.candidate_home_town}</i>
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                }

                                {this.state.constituencyHistoryData.current_leader === undefined || this.state.constituencyHistoryData.current_leader === null || this.state.constituencyHistoryData.current_leader.length === 0 ?
                                  <div className="fontSemiBold14 d-flex justify-content-center w-100">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                                      {this.state.consDesc === 'null' || this.state.consDesc === '' || this.state.consDesc === undefined ?
                                        <div className="fontSemiBold16 d-flex justify-content-center">
                                          No record available.
                                      </div>
                                        :
                                        <div className="boxShadow candidateDetails p-3 fontRegular12">
                                          {this.state.consDesc}
                                        </div>
                                      }
                                    </Col>
                                  </div>
                                  :
                                  <div className="constituencyDetails">
                                    <div className="boxShadow candidateDetails p-3 fontRegular12">
                                      {this.state.consDesc}
                                    </div>
                                  </div>
                                }

                              </Row>
                            </Row>
                            <Row className="ml-0 mr-0 pl-3 pr-3 mb-3 mt-3">
                              <h3 className="fontBold16">Upcoming Elections</h3>
                              {this.state.constituencyHistoryData.upcoming_election === undefined || this.state.constituencyHistoryData.upcoming_election === null || this.state.constituencyHistoryData.upcoming_election.length === 0 ?
                                null :
                                <span className="fontRegular14 ml-5">{this.state.constituencyHistoryData.upcoming_election[0].election_name}</span>
                              }
                            </Row>
                            <div className="pl-3 pr-5">
                              <div className="position-relative">
                                {this.state.constituencyHistoryData.upcoming_election === undefined || this.state.constituencyHistoryData.upcoming_election === null || this.state.constituencyHistoryData.upcoming_election.length === 0 ?
                                  null
                                  :
                                  <div>
                                    <div className="backBtn" onClick={this.handleBack}>
                                      <span>
                                        <ChevronLeft className="cursorPointer" />
                                      </span>
                                    </div>
                                  </div>
                                }
                                {this.state.constituencyHistoryData.upcoming_election === undefined || this.state.constituencyHistoryData.upcoming_election === null || this.state.constituencyHistoryData.upcoming_election.length === 0 ? null :
                                  <div className="candidateProfileElectionsContainer" id="scrollDiv">
                                    {this.state.constituencyHistoryData.upcoming_election.map((item, index) => {
                                      return (
                                        <div className="candidateProfile candidateProfileElections pt-2 cursorPointer" onClick={this.handleProfileClick.bind(this, item.candidate_id, item.candidate_name)}>
                                          <div className="col-12 d-flex justify-content-center">
                                            <div className="imageUpload">
                                              <Image className="imageCandidatePartyProfile" src={item.candidate_img_url !== null
                                                || item.candidate_img_url !== ''
                                                || item.candidate_img_url !== undefined
                                                ?
                                                item.candidate_img_url
                                                :
                                                userOne}
                                                onError={this.handleCandidateImgError}
                                              ></Image>
                                            </div>
                                            <div className="badgeIcon">
                                              <Image className="partyImage" src={item.party_img_url !== null
                                                || item.party_img_url !== ''
                                                || item.party_img_url !== undefined
                                                ?
                                                item.party_img_url
                                                : partyPic}
                                                onError={this.handlePartyImgError}
                                              ></Image>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <span className="fontBold14 greyFontColor mt-3 heading_height">{item.candidate_name}</span>
                                            <br />
                                            <span className="fontRegular12 greyFontColor mt-3 heading_height">{item.party_name}</span>
                                            <br />
                                            <span className="fontRegular12 greyFontColor mb-5 mt-1">
                                              <i>{item.candidate_home_town}</i>
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                }
                                {this.state.constituencyHistoryData.upcoming_election === undefined || this.state.constituencyHistoryData.upcoming_election === null || this.state.constituencyHistoryData.upcoming_election.length === 0 ?
                                  <div className="fontSemiBold14 d-flex justify-content-center mt-3 mb-3">
                                    No Record available.
                                  </div>
                                  :
                                  null
                                }
                                {this.state.constituencyHistoryData.upcoming_election === undefined || this.state.constituencyHistoryData.upcoming_election === null || this.state.constituencyHistoryData.upcoming_election.length === 0 ?
                                  null
                                  :
                                  <div>
                                    <div className="nextBtn" onClick={this.handleNext}>
                                      <span>
                                        <ChevronRight className="cursorPointer" />
                                      </span>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                            <Row className="ml-0 mr-0 pl-3 pr-3 mb-3 mt-3">
                              <h3 className="fontBold16">Past Elections</h3>
                              <Row className="mt-2 w-100 ml-0 mr-0">
                                <Col className="pl-0 pr-0">
                                  {this.state.constituencyHistoryData.past_election === undefined || this.state.constituencyHistoryData.past_election === null || this.state.constituencyHistoryData.past_election.length === 0 ?
                                    null
                                    :
                                    <Table className="table table-striped text-left boxShadow">
                                      <thead className="lightBackgroundColor fontSemiBold18">
                                        <tr>
                                          <th className="tableHeaderTwoElection fontBold14 greyFontColor">Election Name</th>
                                          <th className="tableHeaderTwoElection fontBold14 greyFontColor">Winner</th>
                                          <th className="tableHeaderTwoElection fontBold14 greyFontColor">Political Party</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.constituencyHistoryData.past_election.map((item, index) => {
                                          return (
                                            <tr className={styles.lightBackgroundColor} key={item.candidate_id}>
                                              <td className="greyFontColor fontRegular13">{item.election_name}</td>
                                              <td className="greyFontColor fontRegular13">{item.candidate_name}</td>
                                              <td className="greyFontColor fontRegular13">{item.party_name}</td>
                                            </tr>
                                          )
                                        })}
                                      </tbody>
                                    </Table>
                                  }
                                  {this.state.constituencyHistoryData.past_election === undefined || this.state.constituencyHistoryData.past_election === null || this.state.constituencyHistoryData.past_election.length === 0 ?
                                    <Table className="table table-striped text-left boxShadow">
                                      <thead className="lightBackgroundColor fontSemiBold18">
                                        <tr>
                                          <th className="tableHeaderTwoElection fontBold14 greyFontColor">Election Name</th>
                                          <th className="tableHeaderTwoElection fontBold14 greyFontColor">Winner</th>
                                          <th className="tableHeaderTwoElection fontBold14 greyFontColor">Political Party</th>
                                        </tr>
                                      </thead>
                                      <div className="fontSemiBold14 p-2">
                                        No record available.
                                      </div>
                                    </Table>
                                    : null}
                                </Col>
                              </Row>
                            </Row>
                          </div>
                        }
                      </div>
                    }
                    {/* <--------------General Information-Tab Ends Here---------------------------------> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* <-------------Footer-starts-here--------------------------> */}

        {
          (this.isAdmin()) ?
            null
            :
            <Footer />
        }
        <ErrorSnackBar open={this.state.open}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.msg}
        />
      </div>
    )
  }
}

export default withStyles(styles)(UserConstituencyDetails);
