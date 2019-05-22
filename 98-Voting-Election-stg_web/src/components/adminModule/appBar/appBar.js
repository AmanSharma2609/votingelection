
/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin header/navbar
Purpose   : Navigation to all the pages from header.
*/
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import { createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Radium from 'radium'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Candidate from '../../../images/SVGs/candidate_icon.svg'
import Logo from '../../../images/SVGs/Logo_Approved_02.svg';
import Flag from '../../../images/SVGs/party_icon.svg'
import Election from '../../../images/SVGs/election_icon.svg'
import { constants } from '../../../networkCall/constant'
import Search from '../../../images/SVGs/search.svg'
import { items } from '../../../networkCall/service.js'
import Users from '../../../images/SVGs/users.svg';
import Profile from '../../../images/SVGs/profile.svg';
import Logout from '../../../images/SVGs/Logout.svg';
import Constituencies from '../../../images/SVGs/constituency_icon.svg';
import AddPost from '../../../images/SVGs/add_post.svg';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';




const styles = theme => ({
  rootPopup: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },

  title: {
    marginLeft: '0.5%',
    fontSize: '14',
    color: 'black',
    marginRight: '2%',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  iconMargin: {
    marginRight: 5,
    color: '#EB6D4A',

  },
  appBarStyle: {
    paddingLeft: '4%',
    paddingRight: '4%',
    boxShadow: 'none',
    backgroundColor: '#FEF8E5',
    lineHeight: 4,
    height: 100,
    justifyContent: 'center'
  },
  marginLeftMl5: {
    marginLeft: '3rem'
  },
  iconTextSpace: {
    marginTop: '2%',
    fontSize: 14,
    color: 'black'
  },

  userName: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1px',
    marginRight: '1px',
    marginTop: '5px',
    fontSize: 14,
    color: '#E18F68',
    textTransform: 'capitalize',
  },

  iconSpace: {
    marginLeft: 1
  },
  oneIconMargin: {
    marginLeft: 1,
    marginRight: 1
  },
  buttonAll: {
    color: 'grey',
    fontFamily: 'montserratsemibold',
    fontSize: 18,
    padding: '0px 15px',
    textTransform: 'capitalize',
    '&:hover': {
      color: '#E18F68',
    },
  },
  activeButton: {
    color: '#E18F68',
    fontFamily: 'montserratsemibold',
    fontSize: 18,
    textTransform: 'capitalize',
    '&:hover': {
      color: 'grey',
    },
  },
  buttonActive: {
    color: '#E18F68',
    fontFamily: 'montserratsemibold',
    fontSize: 18,
    textTransform: 'capitalize',
    '&:hover': {
      color: '#E18F68',
    },

    '& span': {
      color: '#E18F68'
    }
  },
  fontMobileMenu: {
    fontFamily: 'montserratregular',
    fontSize: 14

  },
  noHover: {
    '&:hover': {
      background: 'none'
    }
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
  iconHover: {
    '&:hover': {
      backgroundColor: '#eb6d4a8a'
    },
  },

  iconHoverUsername: {
    borderRadius: 10,
    '&:hover': {
      backgroundColor: '#eb6d4a8a'
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

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


let suggestions = [
]

class PrimarySearchAppBar extends React.Component {
  state = {
    single: '',
    partyList: null,
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobile1MoreAnchorEl: null,
    activeLinkParty: true,
    activeLinkCandidate: true,
    adminLogoutParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      admin_id: ''
    },
    suggestions: [],
    suggestionSelect: null,
    showLogOutPopup: false,
    vertical: 'top',
    horizontal: 'center',
    open: false,
    msg: 'Please enter something to search.',
  };

  componentDidMount() {
    if (!(localStorage.getItem(btoa('search_data_admin')))) {
      this.globalSearchAutoSuggest();
    }
    suggestions = JSON.parse(localStorage.getItem(btoa('search_data_admin')));
    console.log(suggestions)

    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      admin_id: 1
    }

    items('POST', requestedData, constants.adminProfile)
      .then(response => {
        if (response.status === "Success") {

        }

        else {
          localStorage.clear()
          this.props.history.push('/AdminLogin')
        }
      });
    this.setState({ searchBoxOpen: false })
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleClickOpen = () => {
    this.setState({ searchBoxOpen: true });
  };

  //close the seatch box on the cross icon click
  handleSearchClose = () => {
    this.setState({ searchBoxOpen: false });
    this.setState({ single: '' });
  }

// logout admin from the website
  handleLogout = () => {
    const adminToken = localStorage.getItem('accessToken');
    const adminId = localStorage.getItem('adminId');
    this.setState({ adminLogoutParameter: { ...this.state.adminLogoutParameter, token_id: adminToken, admin_id: adminId } }, function () {
      items('POST', this.state.adminLogoutParameter, constants.adminLogout)
        .then(response => {
          if (response.status === "Success") {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('adminId')
            localStorage.removeItem('userType')
            this.props.history.push('/AdminLogin')
            this.handleClosePopup(false)
          }
        })
    })



  }
  /*Header Side menu open and end function start */
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleClosePopup = (showPopUp) => {
    this.setState({ showLogOutPopup: showPopUp });
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };


  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  /*Header Side menu open and end function end */



  /*On selecting the option from dropdown start */
  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    if (suggestion.type === 'party') {
      this.props.history.push({
        pathname: '/AdminPoliticalParties/:/:/AdminPoliticalProfile/' + suggestion.label + '/' + suggestion.id,
      })
    }
    else if (suggestion.type === 'candidate') {
      this.props.history.push('/AdminCandidate/:/:/AdminCandidateProfile/' + suggestion.label + '/' + suggestion.id)
    }
    else {
      this.props.history.push({
        pathname: '/UserElectionDetail/' + suggestion.id + '/' + suggestion.subtype + '/' + suggestion.label
      });
    }
  }
  /*On selecting the option from dropdown end */


  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  /*Getting value form the input field of search bar start*/
  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };
  /*Getting value form the input field of search bar end*/

  /* On key press down search start */
  onClickSearch = () => {
    if (this.state.single.trim().length !== 0) {
      this.props.history.push({
        pathname: '/searchResultAdmin/' + this.state.single
      });
    }
    else {
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false });
      }, 4000)
    }
  }
  /* On key press down search end */

  /* Global search function for candidate party and election start*/
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
          localStorage.setItem(btoa('search_data_admin'), JSON.stringify(val));
          this.returnValue();
        }
        else if (response.status === "Failure") {

        }
        else {

        }
      });
  }
  /* Global search function for candidate party and election end*/


  /*Storing of the global search function data in localStoarge start*/
  returnValue() {
    suggestions = JSON.parse(localStorage.getItem(btoa('search_data')));
  }
  /*Storing of the global search function data in localStoarge end*/


  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.onClickSearch();
    }
  }


  render() {
    const { vertical, horizontal } = this.state;
    const { anchorEl, mobileMoreAnchorEl, mobile1MoreAnchorEl } = this.state;
    const { classes, ...other } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isCenterMobileMenuOpen = Boolean(mobile1MoreAnchorEl)

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      onSuggestionSelected: this.handleSuggestionSelected(),
      renderSuggestion,
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        className={`profileMenu`}
      >
        <MenuItem onClick={this.handleClose} className="">
          <NavLink to='/AdminProfile' activeClassName={`changeColor`} className="linkRouter">
            <img src={Profile} className={`iconMargin headerImgs`} alt="Profile" />
            My Profile
          </NavLink>
        </MenuItem>
        <MenuItem onClick={this.handleClosePopup.bind(this, true)} className="">
          <img src={Logout} className={`iconMargin headerImgs ml-1 mr-2`} alt="Logout" />
          <span className="linkRouter">  Logout </span>
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
          <NavLink to='/AdminCandidate' activeClassName={`changeColor`} className="linkRouter">
            <img src={Candidate} alt={Candidate} className={`iconMargin mr-2 headerImgs`} />
            Candidates
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink to='/AdminPoliticalParties' activeClassName={`changeColor`} className="linkRouter">
            <img src={Flag} className={`iconMargin mr-2 headerImgs`} alt="Parties" />
            Parties
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink to='/AdminStateConstituency' activeClassName={`changeColor`} className="linkRouter">
            <img src={Constituencies} className={`iconMargin mr-2 headerImgs`} alt="Constituencies" />
            Constituencies
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink to='/AdminElectionList' activeClassName={`changeColor`} className="linkRouter">
            <img src={Election} className={`iconMargin mr-2 headerImgs`} alt="Elections" />
            Elections
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink to='/AdminUsersList' activeClassName={`changeColor`} className="linkRouter">
            <img src={Users} className={`iconMargin mr-2 headerImgs`} alt="Users" />
            Users
          </NavLink>
        </MenuItem>
        <MenuItem className="">
          <NavLink to="/AddPost/candidate/ " activeClassName={`changeColor`} className="linkRouter">
            <img src={AddPost} className={`iconMargin mr-2 headerImgs`} alt="Post" />
            Add Post
          </NavLink>
        </MenuItem>
        <MenuItem onClick={this.handleClose} className="">
          <NavLink to='/AdminProfile' activeClassName={`changeColor`} className="linkRouter">
            <img src={Profile} className={`iconMargin mr-2 headerImgs`} alt="Profile" />
            <span className="linkRouter">
              My Profile
            </span>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={this.handleLogout} className="">
          <img src={Logout} className={`iconMargin mr-2 headerImgs`} alt="Logout" />
          <span className="linkRouter">  Logout </span>
        </MenuItem>
      </Menu>
    );

    return (
      <div>


        <div className={`root userHeader`}>
          <AppBar position="sticky" className={`appBarStyle userHeader position-fixed`}>
            <Toolbar className="headerMenuContainer">
              <div className={`logoBox`}>
                <NavLink to="/AdminHomePage" >
                  <img src={Logo} className={`logoImageHeader`} alt="Apna Neta" />
                </NavLink>
              </div>
              <div className={`${classes.grow} menuBox`}>
                <div className={`${classes.sectionDesktop}`}>
                  <NavLink to='/AdminCandidate' activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="large" onClick={this.handleAdminCandidate}
                      className={this.state.activeLinkCandidate === true ? classes.buttonAll : classes.activeButton}>
                      <img src={Candidate} alt={Candidate} className={`iconMargin headerImgs`} />
                      <span>Candidates</span>
                    </Button>
                  </NavLink>

                  <NavLink to='/AdminPoliticalParties' activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="large" className={this.state.activeLinkParty === true ? classes.buttonAll : classes.activeButton}
                      onClick={this.handleAdminPartyApi}>
                      <img src={Flag} className={`iconMargin headerImgs`} alt="Parties" />
                      <span>Parties</span>
                    </Button>
                  </NavLink>

                  <NavLink to='/AdminStateConstituency' activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="small" className={classes.buttonAll}>
                      <img src={Constituencies} className={`iconMargin headerImgs`} alt="Constituencies" />
                      <span>Constituencies</span>
                    </Button>
                  </NavLink>

                  <NavLink to='/AdminElectionList' activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="large" className={classes.buttonAll}>
                      <img src={Election} className={`iconMargin headerImgs`} alt="Elections" />
                      <span>Elections</span>
                    </Button>
                  </NavLink>

                  <NavLink to='/AdminUsersList' activeClassName={`changeColor`} className="linkRouter">
                    <Button color="primary" size="small" className={classes.buttonAll}>
                      <img src={Users} className={`iconMargin headerImgs`} alt="Users" />
                      <span>Users</span>
                    </Button>
                  </NavLink>

                </div>
              </div>

              <div className={classes.grow} />
              <div className={`loginButtonsBox loginButtonsBoxAdmin d-inline-flex `}>

                <div className="globalSearchHide globalSearchHideFunc d-flex justify-content-center align-items-center mr-auto">
                  <div className="position-relative mr-3">
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
                      <div className="fontSemiBold14 text-dark text-left mt-1 p-2 bg-white boxShadow position-absolute suggestBoxHeight">
                        No record found
                      </div>
                      : null
                    }
                  </div>
                </div>

                {this.state.searchBoxOpen ? null :
                  <NavLink to="/AddPost/candidate/ /name" activeClassName={classes.buttonActive}
                    className="linkRouter">
                    <img src={AddPost} className={`iconMargin headerImgs`} alt="Post" />
                  </NavLink>
                }
                <div className="d-flex align-items-center">

                  <div className={`paddingSearch ${classes.noHover} pr-2 pl-0 mt-1 d-flex align-items-center`}>
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
                          <div className="fontSemiBold14 text-dark text-left mt-1 p-2 bg-white boxShadow position-absolute suggestBoxHeight">
                            No record Found
                          </div>
                          : null
                        }
                      </div>
                      :
                      <img src={Search} alt="search" onClick={this.handleClickOpen} className="searchIcon cursorPointer" />
                    }
                  </div>
                </div>
                {this.state.searchBoxOpen ? null :
                  // <IconButton className={`${classes.noHover}`}>
                  <Typography className={classes.userName} color="inherit" noWrap>
                    {localStorage.getItem('adminUserName') === null ? 'UserName' : localStorage.getItem('adminUserName')}
                  </Typography>
                  // </IconButton>
                }
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen.bind(this)}
                  className={`${classes.noHover} ${this.state.searchBoxOpen} pt-3 pr-0`}
                >
                  <ExpandMore disableAutoFocus={true} className={`${classes.outlinefocus} iconBackground rounded-circle text-white`} />
                </IconButton>
              </div>
              {/* <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen.bind(this)} >
                  <MenuIcon className="primaryColorText font-30" />
                </IconButton>
              </div> */}
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}

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
                    <Button onClick={this.handleLogout} variant="contained" className={classes.dailogButton}>
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
            <div className="scrollableHeader form-inline">
              <div className="widthTable20">
                <NavLink to='/AdminCandidate' activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="large" onClick={this.handleAdminCandidate}
                    className={this.state.activeLinkCandidate === true ? classes.buttonAll : classes.activeButton}>
                    <img src={Candidate} alt={Candidate} className={`iconMargin headerImgs`} />
                    <span>Candidates</span>
                  </Button>
                </NavLink>
              </div>
              <div className="widthTable20">
                <NavLink to='/AdminPoliticalParties' activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="large" className={this.state.activeLinkParty === true ? classes.buttonAll : classes.activeButton}
                    onClick={this.handleAdminPartyApi}>
                    <img src={Flag} className={`iconMargin headerImgs`} alt="Parties" />
                    <span>Parties</span>
                  </Button>
                </NavLink>
              </div>
              <div className="widthTable20">
                <NavLink to='/AdminStateConstituency' activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="small" className={classes.buttonAll}>
                    <img src={Constituencies} className={`iconMargin headerImgs`} alt="Constituencies" />
                    <span>Constituencies</span>
                  </Button>
                </NavLink>
              </div>
              <div className="widthTable20">
                <NavLink to='/AdminElectionList' activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="large" className={classes.buttonAll}>
                    <img src={Election} className={`iconMargin headerImgs`} alt="Elections" />
                    <span>Elections</span>
                  </Button>
                </NavLink>
              </div>
              <div className="widthTable20">
                <NavLink to='/AdminUsersList' activeClassName={`changeColor`} className="linkRouter">
                  <Button color="primary" size="small" className={classes.buttonAll}>
                    <img src={Users} className={`iconMargin headerImgs`} alt="Users" />
                    <span>Users</span>
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

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
PrimarySearchAppBar = withRouter(PrimarySearchAppBar)
PrimarySearchAppBar = Radium(PrimarySearchAppBar);
export default withStyles(styles)(PrimarySearchAppBar);
