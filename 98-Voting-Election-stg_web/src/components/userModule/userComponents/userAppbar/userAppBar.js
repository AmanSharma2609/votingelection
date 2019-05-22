/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : UserAppBar.js
Purpose   : Header
*/

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import userOne from '../../../../images/02-user.png';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import ErrorSnackBar from '../../../../networkCall/errorSnackBar'
import TextField from '@material-ui/core/TextField';
import Lock from '@material-ui/icons/Lock';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Radium from 'radium'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Candidate from '../../../../images/SVGs/candidate_icon.svg';
import Constituencies from '../../../../images/SVGs/constituency_icon.svg';
import Logo from '../../../../images/SVGs/Logo_Approved_02.svg';
import Flag from '../../../../images/SVGs/party_icon.svg';
import Election from '../../../../images/SVGs/election_icon.svg';
import UserIcon from '../../../../images/SVGs/default_userimg.svg';
import Search from '../../../../images/SVGs/search.svg'
import Profile from '../../../../images/SVGs/profile.svg';
import Logout from '../../../../images/SVGs/Logout.svg';
import { items } from '../../../../networkCall/service.js';
import { constants } from '../../../../networkCall/constant'
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import SiteFeedback from '../siteFeedback';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// Material Styling
const styles = theme => ({

  rootPopup: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  userNameFirst: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: 'black',
    fontFamily: 'montserratsemibold'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttonAll: {
    color: 'grey',
    fontFamily: 'montserratsemibold',
    fontSize: 18,
    textTransform: 'capitalize',
    padding: '0px 15px',
    '&:hover': {
      color: '#E18F68',
    },
  },
  outlinefocus: {
    fontFamily: 'montserratregular',
    outline: 'none',

    '&:focus': {
      outline: 'none',
    },
  },
  noHover: {
    '&:hover': {
      background: 'none'
    }
  },
  userOpt: {
    height: '85%',
    paddingLeft: 4,
    paddingRight: 4,
    '&:hover': {
    }
  },
  paperPopup: {
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
  paper: {
    height: '100vh',
    width: '100vh',
    borderRadius: '15px'
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  'dialog': {
    height: '100vh',
    minWidth: '70vh'
  },
  noBackground: {
    background: 'none'
  },
  menuItemFocus: {
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  userNameLogin: {
    width: '20%',
    float: 'right'
  },
  rootBackDrop: {
    backgroundColor: 'rgba(127, 127, 127, 0.2)',
  },
  suggestionsContainerOpen: {
    zIndex: 9000,
    marginTop: -45,
    left: '4%',
    right: 0,
    width: '250px',
    scrollX: 'auto'
  },
  suggestion: {
    display: 'block',
    zIndex: 9000
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  container: {
    border: '1px solid #ddd',
    width: 200,
    borderRadius: 20,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 65,
    marginTop: 0,
    color: '#fff',
    backgroundColor: '#FFF',
    height: 40,
    '&>div>div::before': {
      border: '0px'
    },

    '&>div>div:focus': {
      border: 0
    },
    '&>div>div input:focus': {
      border: 0,
      boxShadow: 'none'
    },
    '&>div>div input': {
      border: 0,
      boxShadow: 'none'
    },
    '&>div>div::after': {
      border: 0,
    },
    '&>div>div:before:hover': {
      border: 0,
      display: 'none',
      content: ''
    }
  },

  containerMediumScreen: {
    border: '1px solid #ddd',
    width: '100%',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 65,
    marginTop: 0,
    color: '#fff',
    backgroundColor: '#FFF',
    height: 40,
    '&>div>div::before': {
      border: '0px'
    },
    '&>div>div:focus': {
      border: 0
    },
    '&>div>div input:focus': {
      border: 0,
      boxShadow: 'none'
    },
    '&>div>div input': {
      border: 0,
      boxShadow: 'none'
    },
    '&>div>div::after': {
      border: 0,
    },
    '&>div>div:before:hover': {
      border: 0,
      display: 'none',
      content: ''
    }
  },
});

let suggestions = []

//Auto suggest fucntion

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

//Auto suggest fuction to render suggestion
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
        )}
      </div>
    </MenuItem>
  );
}

// To get the related suggestion
function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

// To get the inout value of suggestion
function getSuggestionValue(suggestion) {
  return suggestion.label;
}

// To check the user type
const userType = () => {
  global.userType = localStorage.getItem('userType')
  return global.userType
}

// To check the user detail
const userDetail = () => {
  global.userDetail = localStorage.getItem(btoa('userdetail'))
  return global.userDetail
}


class UserSearchAppBar extends React.Component {

  //State of the Class
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobile1MoreAnchorEl: null,
    userLogoutParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: ''
    },
    user_name: '',
    single: '',
    popper: '',
    suggestions: [],
    userData: '',
    suggestionSelect: null,
    showLogOutPopup: false,
    vertical: 'top',
    horizontal: 'center',
    open: false,
    profilePic: userOne,
    msg: 'Please enter something to search.',
  };

  //Search icon click to search a candidate, party and election
  clickFunc = (value) => {
    this.globalSearchAutoSuggest(value);
  }

  //Auto suggest option selected to push to a profile of party, candidate and elections
  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    if (suggestion.type === 'party') {
      this.props.history.push({
        pathname: '/Political-Parties/Political-Parties-Profile/',
        search:`?name=${suggestion.label}&&id=${suggestion.id}`
      });
    }
    else if (suggestion.type === 'candidate') {
      this.props.history.push({
        pathname: '/Candidate/Candidate-Profile/' ,
        search: `?name=${suggestion.label}&&id=${suggestion.id}`
      });
    }
    else {
      this.props.history.push({
        pathname: '/UserElectionDetail/' + suggestion.id + '/' + suggestion.subtype + '/' + suggestion.label
      });
    }
  }

  // To shortened the name on header
  nameShortened()
  {
    if(this.state.user_name.length > 10)
    {
      return this.state.user_name.slice(0,9) + '...'
    }
    else
    {
      return this.state.user_name
    }
  }

  // To Show the fetch suggestion on key
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // To clear the array of suggestion of autosuggest
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // To get the value of input for auto suggest
  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  //On click on search icon push to search result page or show error message
  onClickSearch = () => {
    if (this.state.single.trim().length !== 0) {
      this.props.history.push({
        pathname: '/searchResult',
        search: `?search=${this.state.single}`
      });
    }
    else {
      this.setState({ msg: "Please enter something to search." })
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false });
      }, 4000)
    }
  }

  // Global search API to show the suggestions
  globalSearchAutoSuggest(newValue) {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_key: ''
    }
    items('POST', requestedData, constants.filterGlobalSearch)
      .then(response => {
        if (response.status === "Success") {
          let val = [];
          if (response.data.election.length !== 0) {
            for (let i of response.data.election) {
              let temp = { label: i.election_name, id: i.election_id, type: 'election' }
              val.push(temp);
            }
          }
          if (response.data.political_party.length !== 0) {
            for (let i of response.data.political_party) {
              let temp = { label: i.party_name, id: i.party_id, type: 'party' }
              val.push(temp);
            }
          }
          if (response.data.candidate.length !== 0) {
            for (let i of response.data.candidate) {
              let temp = { label: i.candidate_name, id: i.candidate_id, type: 'candidate' }
              val.push(temp);
            }
          }
          localStorage.setItem(btoa('search_data'), JSON.stringify(val));
          this.returnValue();
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // To return the value of suggestions from local storage
  returnValue()
  {
    suggestions = JSON.parse(localStorage.getItem(btoa('search_data')));
  }

  // To check the status weather user is deactivated or deleted
    statusCheck() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId')
    }

    items('POST', requestedData, constants.userDeactivatedStatusApi)
      .then(response => {
        if (response.data === 2) {
          this.setState({ msg: response.msg });
          this.setState({ open: true });
          setTimeout(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem("userId");
            localStorage.removeItem(btoa('userdetail'));
            localStorage.removeItem('facebookUserName')
            localStorage.removeItem('userType')
            this.setState({ user_name: '' });
            this.setState({ anchorEl: null });
            this.setState({ mobileMoreAnchorEl: null });
            this.setState({ mobile1MoreAnchorEl: null });
            this.props.history.push('/userLogin');
            this.setState({ open: false });
            this.handleUserLogout();
          }, 2500)
        }
        if (response.data === 3) {
          this.setState({ msg: response.msg });
          this.setState({ open: true });
          setTimeout(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem("userId");
            localStorage.removeItem(btoa('userdetail'));
            localStorage.removeItem('facebookUserName')
            localStorage.removeItem('userType')
            this.setState({ user_name: '' });
            this.setState({ anchorEl: null });
            this.setState({ mobileMoreAnchorEl: null });
            this.setState({ mobile1MoreAnchorEl: null });
            this.props.history.push('/userLogin');
            this.setState({ open: false });
            this.handleUserLogout();
          }, 2500)
        }
        else if (response.data === 4) {
          this.setState({ msg: response.msg });
          this.setState({ open: true });
          setTimeout(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem("userId");
            localStorage.removeItem(btoa('userdetail'));
            localStorage.removeItem('facebookUserName')
            localStorage.removeItem('userType')
            this.setState({ user_name: '' });
            this.setState({ anchorEl: null });
            this.setState({ mobileMoreAnchorEl: null });
            this.setState({ mobile1MoreAnchorEl: null });
            this.props.history.push('/userLogin');
            this.setState({ open: false });
            this.handleUserLogout();
          }, 2500)
        }
        else {
        }
      });

  }

  // To fetch the data of user profile.
  userProfile() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId')
    }
    items('POST', requestedData, constants.userProfileView)
      .then(response => {
        if (response.status === "Success") {
          if (response.data !== null || response.data.length !== 1) {
            this.setState({ userName: response.data[0].user_name });
            this.setState({ profilePic: response.data[0].user_img_url })
            localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // component did update function
  componentDidUpdate() {
    userType();
    userDetail();
  }

  //Component did mount to call API when class initaites
  componentDidMount() {
    if (!(localStorage.getItem(btoa('search_data')))) {
      this.globalSearchAutoSuggest();
    }
    suggestions = JSON.parse(localStorage.getItem(btoa('search_data')));
    this.statusCheck();
    if (localStorage.getItem(btoa('userdetail'))) {
      let temp = localStorage.getItem(btoa('userdetail'));
      let value = atob(temp);
      let data = JSON.parse(value);
      this.setState({ userData: data[0] });
    }
    this.userProfile();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    userType()
    if (localStorage.getItem(btoa('userdetail')) !== null) {
      let temp = localStorage.getItem(btoa('userdetail'));
      let value = atob(temp);
      let data = JSON.parse(value);
      this.setState({ user_name: data[0].user_name });
      this.setState({ user_image: data[0].user_img_url })
      this.setState({ searchBoxOpen: false })
    }
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    this.setState({ userLogoutParameter: { ...this.state.userLogoutParameter, token_id: accessToken, user_id: userId } })
    if (localStorage.getItem('userType') === 'admin') {
      this.setState({ user_name: '' })
    }
  }

  // TO close the pop up
  handleClosePopup = (showPopUp) => {
    this.setState({ showLogOutPopup: showPopUp });
  }

  // To open a serch box
  handleClickOpen = () => {
    this.setState({ searchBoxOpen: true });
  };

  // TO close the searhc box
  handleSearchClose = () => {
    this.setState({ searchBoxOpen: false });
    this.setState({ single: '' });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  // To oepn the menu
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // To close the menu
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  // To open the menu on small screen
  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  // To open the menu on medium screen
  handleCenterMobileMenuOpen = event => {
    this.setState({ mobile1MoreAnchorEl: event.currentTarget });
  }

  // To close the menu on small screen
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  // To close the menu on mediu screen
  handleCenterMobileMenuClose = () => {
    this.setState({ mobile1MoreAnchorEl: null })
  };

  // Logout Function
  handleUserLogout = () => {
    items('POST', this.state.userLogoutParameter, constants.userLogout)
      .then(response => {
        if (response.status === "Success") {
          localStorage.removeItem('accessToken');
          localStorage.removeItem("userId");
          localStorage.removeItem(btoa('userdetail'));
          localStorage.removeItem('facebookUserName')
          localStorage.removeItem('userType')
          this.setState({ user_name: '' });
          this.setState({ anchorEl: null });
          this.setState({ mobileMoreAnchorEl: null });
          this.setState({ mobile1MoreAnchorEl: null });
          this.props.history.push('/userLogin');
          this.handleClosePopup(false);
        }
      });
  };

  // To search a gloabl data on enter press
  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.onClickSearch();
    }
  }

  // If image is not defined than repalce it form default image
  handleCandidateImgError = (ev) =>  {
    ev.target.src = 'https://i.imgur.com/IrgCdyx.png'
  }

  // Render function to render HTML code
  render() {
    const { vertical, horizontal } = this.state;
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      onSuggestionSelected: this.handleSuggestionSelected(),
      renderSuggestion,
    };
    const { anchorEl, mobileMoreAnchorEl, mobile1MoreAnchorEl } = this.state;
    const { classes, ...other } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isCenterMobileMenuOpen = Boolean(mobile1MoreAnchorEl)
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        className={`profileMenu`}
      >
        <MenuItem onClick={this.handleClose} className="menuListItem">
          <NavLink to='/UserProfile' className="linkRouter">
            <img src={Profile} className={`iconMargin mr-2 headerImgs`} alt="Profile" />
            <span>My Profile</span>
          </NavLink>
        </MenuItem>
        <MenuItem className="menuListItem" onClick={this.handleClosePopup.bind(this, true)}>
          <img src={Logout} className={`iconMargin ml-1 mr-2 headerImgs`} alt="Logout" />
          <span className="linkRouter">
            <span>Logout</span>
          </span>
        </MenuItem>
      </Menu>
    );
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <NavLink  to={{
            pathname: '/Candidate',
          }}
           activeClassName={`changeColor`} className="linkRouter d-flex align-items-center">
            <img src={Candidate} className={`iconMargin mr-2`}    width="22" />
            Candidates
          </NavLink>
        </MenuItem>

        <MenuItem >
          <NavLink    to={{
            pathname: '/Political-Parties',
          }} activeClassName={`changeColor`} className="linkRouter d-flex align-items-center">
            <img src={Flag} className={`iconMargin mr-2`} width="22" />
            Parties
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink to='/UserStateConstituency' activeClassName={`changeColor`} className="linkRouter d-flex align-items-center">
            <img src={Constituencies} className={`iconMargin mr-2`} alt="Constituencies" width="22" />
            Constituencies
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink  to={{
            pathname: '/Election-List',
          }} activeClassName={`changeColor`} className="linkRouter d-flex align-items-center">
            <img src={Election} className={`iconMargin mr-2`} width="22" />
            Elections
          </NavLink>
        </MenuItem>
        {localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'user' ?
          <span className="menuItem">
            <MenuItem onClick={this.handleClose} className="">
              <NavLink to='/UserProfile' activeClassName={`changeColor`} className="linkRouter d-flex align-items-center">
                <img src={Profile} className={`iconMargin mr-2`} alt="Profile" width="22" />
                My Profile
              </NavLink>
            </MenuItem>
            <MenuItem onClick={this.handleClose} className="d-flex align-items-center" onClick={this.handleClosePopup.bind(this, true)}>
              <img src={Logout} className={`iconMargin mr-2`} alt="Logout" width="22" />
              <span className="linkRouter" activeClassName={`changeColor`}>Logout</span>
            </MenuItem>
          </span>
          :
          <span className="menuItem">
            <MenuItem className="">
              <NavLink to='/UserLogin' activeClassName={`changeColor`} className="linkRouter d-flex align-items-center">
                <Lock className="iconColor mr-2" />
                Login
              </NavLink>
            </MenuItem>
            <MenuItem className="">
              <NavLink to='/UserSignup' activeClassName={`changeColor`} className="linkRouter d-flex align-items-center">
                <Lock className="iconColor mr-2" />
                Sign Up
              </NavLink>
            </MenuItem>
          </span>
        }
      </Menu>
    );
    return (
      <div>
        <div className={`root userHeader`}>
          <div className="rela">
            <SiteFeedback />
          </div>
          <AppBar position="sticky" className={`appBarStyle userHeader position-fixed`}>
            <Toolbar className="headerMenuContainer">
              <div className={`logoBox`}>
                <NavLink to="/" >
                  <img src={Logo} className={`logoImageHeader`} alt="Apna Neta" />
                </NavLink>
              </div>
              <div className={`${classes.grow} menuBox`}>
                <div className={`${classes.sectionDesktop}`} >
                  <NavLink to={{
                    pathname: '/Candidate',
                  }}
                   activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="large" className={classes.buttonAll}>
                      <img src={Candidate} className={`iconMargin headerImgs`} />
                      <span>Candidates</span>
                    </Button>
                  </NavLink>
                  <NavLink  to={{
                    pathname: '/Political-Parties',
                  }} activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="large" className={classes.buttonAll}>
                      <img src={Flag} className={`iconMargin headerImgs`} />
                      <span>Parties</span>
                    </Button>
                  </NavLink>
                  <NavLink to='/UserStateConstituency' activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="small" className={classes.buttonAll}>
                      <img src={Constituencies} className={`iconMargin headerImgs`} alt="Constituencies" />
                      <span>Constituencies</span>
                    </Button>
                  </NavLink>
                  <NavLink to={{
                    pathname: '/Election-List',
                    }}
                    activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="large" className={classes.buttonAll}>
                      <img src={Election} className={`iconMargin headerImgs`} />
                      <span>Elections</span>
                    </Button>
                  </NavLink>
                </div>
              </div>
              <div className={`d-inline-flex loginButtonsBox`}>
                <div className="globalSearchHide globalSearchHideFunc d-flex justify-content-center align-items-center mr-auto">
                  <div className="position-relative mr-2 searchBoxParent">
                    <i className="fa fa-check darkBackground searchAppBarResponsive cursorPointer" onClick={this.onClickSearch}></i>
                    <Autosuggest
                      {...autosuggestProps}
                      inputProps={{
                        classes,
                        placeholder: 'Search here',
                        value: this.state.single,
                        onChange: this.handleChange('single'),
                        onKeyPress: this.onEnter
                      }}
                      theme={{
                        container: classes.containerMediumScreen,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                      }}
                      renderSuggestionsContainer={options => (
                        <Paper {...options.containerProps} square>
                          {options.children}
                        </Paper>
                      )}
                    />
                    {this.state.suggestions.length === 0 && this.state.single.length >= 3 ?
                      <div className="text-dark fontSemiBold14 text-left mt-0 p-2 ml-3 mr-3 bg-white boxShadow position-absolute w-75">
                        No record found
                      </div>
                      : null
                    }
                  </div>
                </div>
                {this.state.searchBoxOpen ? null :
                  <NavLink to='/dashboard' className="linkRouter">
                    <div className="mr-2 text-dark userNameHeader">
                      {localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'user' ?
                        <img src={!(this.state.userData.user_img_url === undefined || this.state.userData.user_img_url === '' || this.state.userData.user_img_url === null) ? this.state.userData.user_img_url : UserIcon}
                          className="mr-2 rounded-circle headerUserImg" alt="user"
                          onError={this.handleCandidateImgError}/>
                        : null
                      }
                      <span className="fontBold14 userName text-transform-capitalize">
                        {this.nameShortened()}
                      </span>
                    </div>
                  </NavLink>
                }
                <div className="d-flex align-items-center">
                  <div className={`paddingSearch pl-2 pr-2 mt-1 d-flex align-items-center`}>
                    {this.state.searchBoxOpen ?
                      <div className="w-100 searchBoxParent position-relative">
                        <i className="fa fa-check darkBackground searchAppBar cursorPointer" onClick={this.onClickSearch}></i>
                        <i className="fa fa-close closeIcon cursorPointer" onClick={this.handleSearchClose}></i>
                        <Autosuggest
                          {...autosuggestProps}
                          inputProps={{
                            classes,
                            placeholder: 'Search here',
                            value: this.state.single,
                            onChange: this.handleChange('single'),
                            onKeyPress: this.onEnter
                          }}
                          theme={{
                            container: classes.container,
                            suggestionsContainerOpen: classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                          }}
                          renderSuggestionsContainer={options => (
                            <Paper {...options.containerProps} square>
                              {options.children}
                            </Paper>
                          )}
                        />
                        {this.state.suggestions.length === 0 && this.state.single.length >= 3 ?
                          <div className="fontSemiBold14 text-dark text-left p-2 mt-0 bg-white boxShadow position-absolute suggestBoxHeight">
                            No record found
                          </div>
                          : null
                        }
                      </div>
                      :
                      <img src={Search} alt="search" onClick={this.handleClickOpen} className="searchIcon cursorPointer" />
                    }
                  </div>
                </div>
                {localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'user' ? null :
                  <div>
                    {this.state.searchBoxOpen ? null :
                      <NavLink to='/UserLogin' activeClassName={`changeColor`} className="linkRouter">
                        <Button
                          aria-owns={isMenuOpen ? 'material-appbar' : null}
                          aria-haspopup="true"
                          color="black"
                          className={classes.userOpt}
                        >
                          <Typography className={classes.userNameFirst} color="inherit" noWrap>
                            <span className="linkRouter">Login</span>
                          </Typography>
                        </Button>
                      </NavLink>
                    }
                  </div>
                }
                {localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'user' ? null :
                  <div>
                    {this.state.searchBoxOpen ? null :
                      <NavLink to='/UserSignup' activeClassName={`changeColor`} className="linkRouter">
                        <Button
                          className={classes.userOpt}
                          aria-owns={isMenuOpen ? 'material-appbar' : null}
                          aria-haspopup="true"
                          color="black"
                        >
                          <Typography className={classes.userNameFirst} color="inherit" noWrap>
                            <span className="linkRouter">Sign Up</span>
                          </Typography>
                        </Button>
                      </NavLink>
                    }
                  </div>
                }
                {localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'user' ?
                  <div className="d-flex justify-content-center align-items-center cursorPointer p-2">
                    <ExpandMore disableAutoFocus={true} onClick={this.handleProfileMenuOpen} className={`${classes.outlinefocus} iconBackground rounded-circle text-white`} />
                  </div>
                  : null}
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
          <Dialog
            TransitionComponent={Transition}
            open={this.state.showLogOutPopup}
            onClose={this.handleClosePopup}
            PaperProps={{
              classes: {
                root: classes.paperPopup
              }
            }}
            {...other}
            BackdropProps={{
              classes: {
                root: classes.rootPopup
              }
            }
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Logout"}</DialogTitle>
            <DialogContent className={classes.dailogContent}>
              <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                <div className="fontSemiBold16 mt-4">
                  Are You sure you want to Logout?
              </div>
                <div className="mt-3 form-inline d-flex justify-content-center">
                  <div className="mr-2 mt-3">
                    <Button onClick={this.handleClosePopup.bind(this, false)} variant="contained" className={classes.dailogButton}>
                      NO
                  </Button>
                  </div>
                  <div className="mt-3">
                    <Button onClick={this.handleUserLogout} variant="contained" className={classes.dailogButton}>
                      YES
                  </Button>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <ErrorSnackBar open={this.state.open}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.msg}
          />
        </div>
        <div className="mediumScreenHeader lightBackgroundColor">
          <div className="lightBackgroundColor fixedMediumHeader">
            <div className="form-inline scrollableHeaderUser">
              <div className="w-25">
              <NavLink to={{
                    pathname: '/Candidate',
                  }}
                   activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="large" className={classes.buttonAll}>
                    <img src={Candidate} className={`iconMargin headerImgs`} />
                    <span>Candidates</span>
                  </Button>
                </NavLink>
              </div>
              <div className="w-25">
                  <NavLink  to={{
                    pathname: '/Political-Parties',
                  }} activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="large" className={classes.buttonAll}>
                    <img src={Flag} className={`iconMargin headerImgs`} />
                    <span>Parties</span>
                  </Button>
                </NavLink>
              </div>
              <div className="w-25">
                <NavLink to='/UserStateConstituency' activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="small" className={classes.buttonAll}>
                    <img src={Constituencies} className={`iconMargin headerImgs`} alt="Constituencies" />
                    <span>Constituencies</span>
                  </Button>
                </NavLink>
              </div>
              <div className="w-25">
                <NavLink to='/Election-List' activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="large" className={classes.buttonAll}>
                    <img src={Election} className={`iconMargin headerImgs`} />
                    <span>Elections</span>
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserSearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
UserSearchAppBar = Radium(UserSearchAppBar);
UserSearchAppBar = withRouter(UserSearchAppBar)
export default withStyles(styles)(UserSearchAppBar);
