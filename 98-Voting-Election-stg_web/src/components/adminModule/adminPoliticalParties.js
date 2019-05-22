/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin political parties
Purpose   : admin political parties list view
*/

import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { NavLink } from 'react-router-dom'
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import Collapse from '@material-ui/core/Collapse';
import { withRouter } from 'react-router-dom'
import Fade from '@material-ui/core/Fade';

import PartyPic from '../../images/SVGs/default_partyimg.svg'
import PrimarySearchAppBar from './appBar/appBar'
import Add from '../../images/SVGs/add.svg'
import Download from '../../images/download.png'

import Dropzone from 'react-dropzone';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ErrorSnackBar from '../../networkCall/errorSnackBar'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  searchButton: {
    marginRight: '2%',
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  importButton: {
    marginLeft: '2%',
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    width: 150,
    whiteSpace: 'nowrap',
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  filterButton: {
    marginRight: 10,
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    width: 100,
    whiteSpace: 'nowrap',
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  addButton: {
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    width: 150,
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
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
  iconMargin: {
    marginRight: '5%',
    color: 'white'
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
  textFieldInput1: {
    border: '1px solid grey',
    backgroundColor: '#FBFBFB',
    fontSize: 8,
    padding: '10px 12px',
    height: 30,
    lineHeight: 'normal',
    width: 'calc(60% - 10px)',

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
    textAlign: 'left',
    color: '#fff',
    fontFamily: 'montserratsemibold',
    fontSize: 20,
    backgroundColor: '#E18F68',
    padding: '5px 15px',
  },
  dailogContentStyle: {
    color: '#555555',
    fontFamily: 'montserratregular',
    fontSize: 16,
  },
  link: {
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: '#555555',
    '&:hover': {
      color: '#E18F68'
    }
  },
  circularLoader: {
    color: '#E18F68',
    marginBottom: 20,
    marginTop: 20,
  },
  marginCheckBox: {
    marginLeft: '44px',
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
    padding: '5px 5px 5px 5px',
  },
  fontHead: {
    fontSize: 14,
  },

  rootCheckBox: {
    '&$checked': {
      color: '#E18F68',
    },
  },
  checked: {
    color: '#E18F68',

  },
  labelFont: {
    fontFamily: 'montserratregular',
    fontSize: 14,
  }

});
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

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const data = [

];



class AdminPoliticalParties extends Component {

  state = {
    arrayItems: data,
    openDropZone: false,
    arrowRef: null,
    party_id: 0,
    token_id: '',
    party_name: '',
    open: false,
    iconLoaded: {},
    random: null,
    isLoading: true,
    party_hide_flag: null,
    hideParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: null,
      token_id: '',
    },
    parameter: {
      votingElection_code: constants.votingElectionCode,
      count: 0
    },
    deleteParameter: {
      votingElection_code: constants.votingElectionCode,
      party_id: null,
      token_id: '',
    },
    loaderSpinner: false,
    loadMoreSpinner: false,
    stopPartyCall: false,
    files: [],
    count: 0,
    loadMore: false,
    filterClass: '',
    filterParty: [],
    filterArrayParameter: {
      votingElection_code: constants.votingElectionCode,
      user_type: 'admin',
      party_type: null,
      count: ''
    },
    nationalParty: false,
    stateParty: false,
    unrecParty: false,
    nationalValue: '',
    stateValue: '',
    unrecValue: '',
    indexCards: '',
    noFilter: false,
    noSelectMsg: 'Please select one filter at least',
    vertical: 'top',
    horizontal: 'center',
    noParty: false,
    noPartyMsg: 'No party present',
    startPartyFilter: false,
    stopFilterCall: false,
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  handleAddClick = (e, party_id) => {
    this.props.history.push({
      pathname: '/AdminPoliticalParties/:AddParty',
      state: { party_id }
    })
  }

  handleEditClick = (party_id, party_img_url) => {
    localStorage.setItem('profilePartyId', party_id)
    localStorage.setItem('partyProfilePic', party_img_url)
    this.props.history.push({
      pathname: '/AdminPoliticalParties//UpdateParty',
    })
  }

  handleProfileClick = (party_id, party_name) => {
    this.setState({ party_id: party_id })
    this.setState({ party_name: party_name })
    this.props.history.push({
      pathname: '/AdminPoliticalParties/:/:/AdminPoliticalProfile/' + party_name + '/' + party_id,
      state: { party_id, party_name }
    })
  }

  partyListApiCall = () => {
    if (this.state.count === 0) {
      this.setState({ isLoading: true });
    }
    else {
      this.setState({ loadMore: true });
    }

    let value = localStorage.getItem('accessToken');
    this.setState({ token_id: value, count: this.state.count })
    this.setState({ hideParameter: { ...this.state.hideParameter, token_id: value } })
    this.setState({ deleteParameter: { ...this.state.deleteParameter, token_id: value } })
    this.setState({ parameter: { ...this.state.parameter, count: this.state.count } })

    items('POST', this.state.parameter, constants.viewPartyList)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            for (let i of response.data) {
              this.state.arrayItems.push(i);
            }
            this.setState({ arrayItems: this.state.arrayItems })
            this.setState({ isLoading: false });
            this.setState({ count: this.state.count + 1 });
            this.setState({ loadMore: false })
          }
          else {
            this.setState({ loadMore: false });
            this.setState({ isLoading: false });
          }
          this.setState({ isLoading: false })
        }
        else if (response.status === 'Failure') {
          this.setState({ isLoading: false });
          this.setState({ loadMore: false })
        }
        else {
          this.setState({ isLoading: false });
          this.setState({ loadMore: false })
        }
      })
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return null
    }
    else {
      this.handleAlert()
    }
  }
  handleAlert = () => {
    this.setState({ filterClass: '' });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    this.setState({ count: 0 });
    this.setState({ arrayItems: [] });
    let value = localStorage.getItem('accessToken');
    this.setState({ hideParameter: { ...this.state.hideParameter, token_id: value } })
    this.setState({ deleteParameter: { ...this.state.deleteParameter, token_id: value } })

    this.partyListApiCall()
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleStateSet = () => {
  }

  handleOpen = (party_id, index) => {
    this.setState({ indexCards: index })
    this.setState({ deleteParameter: { ...this.state.deleteParameter, party_id: party_id } }, function () {
    })
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    items('POST', this.state.deleteParameter, constants.deleteParty)
      .then(response => {
        if (response.status === "Success") {
          this.state.arrayItems.splice(this.state.indexCards, 1);
          this.setState({ open: false });
          this.setState({ loaderSpinner: false });
          this.globalSearchAutoSuggest('');
        }
        else if (response.status === 'Failure') {
          this.setState({ loaderSpinner: false });
        }
        else {
          this.setState({ loaderSpinner: false });
        }
      })
  }

  handleHideAndUnhideApi = (party_id, index, party_hide_flag) => {
    let value = localStorage.getItem('accessToken');
    this.setState({ hideParameter: { ...this.state.hideParameter, token_id: value } }, function () {

    })
    this.setState({ hideParameter: { ...this.state.hideParameter, party_id: party_id } }, function () {
    })
    if (party_hide_flag === 1) {
      this.setState({ party_hide_flag: 0 })
    }
    if (party_hide_flag === 0) {
      this.setState({ party_hide_flag: 1 })
    }

    setTimeout(() => {
      if (this.state.party_hide_flag === 0) {
        items('POST', this.state.hideParameter, constants.partyHide)
          .then(response => {
            this.setState((state) => ({
              iconLoaded: !state.iconLoaded
            }))
            this.componentDidMount()
            if (response.status === "Success") {
              this.globalSearchAutoSuggest('');
            }
          })
      }

      if (this.state.party_hide_flag === 1) {
        items('POST', this.state.hideParameter, constants.partyUnhide)
          .then(response => {
            this.setState((state) => ({
              iconLoaded: !state.iconLoaded
            }))
            this.componentDidMount()

            if (response.status === "Success") {
              this.globalSearchAutoSuggest('');
            }
          })
      }
    }, 10)

  }

  globalSearchAutoSuggest(newValue) {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_key: '',
      user_type: 'user',
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
        }
        else if (response.status === "Failure") {

        }
        else {

        }
      });
  }

  filterBoxShowHide = () => {
    if (this.state.filterClass === '') {
      this.setState({ filterClass: 'flip' });
    }
    else {
      this.setState({ filterClass: '' });
    }
  }

  handleDropFile = (filesUploaded) => {
    this.setState({ files: filesUploaded })
    window.URL.revokeObjectURL(filesUploaded.preview);
  }

  openDropZonePopup = (openPopup) => {
    this.setState({ openDropZone: openPopup });
  }

  onPartyListScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      if (this.state.startPartyFilter === true) {
        if (this.state.stopFilterCall === false) {
          this.setState({ loadMoreSpinner: true })
          this.setState({ filterArrayParameter: { ...this.state.filterArrayParameter, count: this.state.filterArrayParameter.count + 1 } }, function () {
            items('POST', this.state.filterArrayParameter, constants.partyFilter)
              .then(response => {

                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ arrayItems: this.state.arrayItems.concat(response.data) })
                  this.setState({ loadMoreSpinner: false })
                }
                else {
                  this.setState({ stopFilterCall: true })
                  this.setState({ loadMoreSpinner: false })
                }
              })
          })
        }
      }
      else {
        if (this.state.stopPartyCall === false) {
          this.setState({ loadMoreSpinner: true })
          this.setState({ parameter: { ...this.state.parameter, count: this.state.parameter.count + 1 } }, function () {
            items('POST', this.state.parameter, constants.viewPartyList)
              .then(response => {

                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ arrayItems: this.state.arrayItems.concat(response.data) })
                  this.setState({ loadMoreSpinner: false })
                }
                else {
                  this.setState({ stopPartyCall: true })
                  this.setState({ loadMoreSpinner: false })
                }
              })
          })
        }
      }

    }
  }

  handleNationalParty = (e) => {

    this.setState(prevState => ({
      nationalParty: !prevState.nationalParty,
    }), function () {
      if (this.state.nationalParty === true) {
        this.setState({ nationalValue: "National Party" })
        this.setState({ filterParty: [...this.state.filterParty, "National Party",] }, function () {

        })
      }
      else {
        this.setState({ nationalValue: "" })
        this.setState({
          filterParty: this.state.filterParty.filter(function (filterParty) {
            return filterParty !== "National Party"

          })
        }, function () {

        });
      }
    });

  }
  handleStateParty = (e) => {
    this.setState(prevState => ({
      stateParty: !prevState.stateParty,
    }), function () {

      if (this.state.stateParty === true) {
        this.setState({ stateValue: "State Party" })
        this.setState({ filterParty: [...this.state.filterParty, "State Party",] }, function () {

        })
      }
      else {
        this.setState({ stateValue: "" })
        this.setState({
          filterParty: this.state.filterParty.filter(function (filterParty) {
            return filterParty !== "State Party"

          })
        }, function () {

        });
      }
    });

  }
  handleUnrecognized = (e) => {
    this.setState(prevState => ({
      unrecParty: !prevState.unrecParty,
    }), function () {
      if (this.state.unrecParty === true) {
        this.setState({ unrecValue: "Unrecognized" })
        this.setState({ filterParty: [...this.state.filterParty, 'Unrecognized',] }, function () {

        })
      }
      else {
        this.setState({ unrecValue: "" })
        this.setState({
          filterParty: this.state.filterParty.filter(function (filterParty) {
            return filterParty !== "Unrecognized"

          })
        }, function () {

        });

      }
    });


  }
  handleFilterArray = () => {
    if (this.state.nationalValue === '' && this.state.stateValue === '' && this.state.unrecValue === '') {
      this.setState({ noFilter: true })
      setTimeout(() => {
        this.setState({ noFilter: false })
      }, 3500);
    }
    else {
      this.setState({ isLoading: true })
      this.setState({ filterArrayParameter: { ...this.state.filterArrayParameter, party_type: JSON.stringify(this.state.filterParty) } }, function () {
        items('POST', this.state.filterArrayParameter, constants.partyFilter)
          .then(response => {

            if (response.status === "Success") {
              if (!(response.data === null || response.data.length === 0)) {
                this.setState({ arrayItems: response.data })
                this.setState({ filterClass: '' });
                this.setState({ startPartyFilter: true })
              }
              this.setState({ isLoading: false })
            }
            else {
              this.setState({ noParty: true })
              this.setState({ startPartyFilter: false })
              setTimeout(() => {
                this.setState({ noParty: false })
              }, 2500)
              this.setState({ isLoading: false })
            }
          })
      })

    }
  }
  handleResetFilter = () => {
    this.setState({ isLoading: true })
    this.setState({ startPartyFilter: false })
    items('POST', this.state.parameter, constants.viewPartyList)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ isLoading: false })
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ arrayItems: response.data })
          }
        }
        else {
          this.setState({ isLoading: false })
        }
      })

    this.setState({ filterParty: [] }, () => {

    })
    this.setState({ nationalParty: false })
    this.setState({ nationalValue: "" })
    this.setState({ stateParty: false })
    this.setState({ stateValue: "" })
    this.setState({ unrecParty: false })
    this.setState({ unrecValue: "" })


  }

  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  render() {
    const { classes, ...other } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="partyCardsParent" onScroll={this.onPartyListScroll}>

        <PrimarySearchAppBar />


        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / Political Parties</p>
            </Col>
          </Row>
        </Container>

        <ErrorSnackBar open={this.state.noFilter}
          onClose={this.handleClose}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.noSelectMsg}
        />
        <ErrorSnackBar open={this.state.noParty}
          onClose={this.handleClose}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.noPartyMsg}
        />

        <Container fluid={true} className="w-90 AdminPoliticalPartyContainer mt-4">
          <Row className="marginTop60">
            <Col xs={12} sm={12} lg={3} md={3} xl={3} className="mt-4 text-left">
              <div className="form-inline">
                <div className="form-inline">
                  <h5 className="fontSemiBold18 greyFontColor mr-3 pb-1 headingPage">Political Parties</h5>
                </div>

                <div className="position-relative filterBox" ref={node => this.node = node}>
                  <i className="fa fa-filter cursorPointer" onClick={this.filterBoxShowHide}></i>
                  <div className={`hover card_panel_party ${this.state.filterClass}`}>
                    <div ref={node => this.node = node} className="back">
                      <div className="box2">
                        <form>
                          <div className="form-inline">
                            <div className="fontSemiBold14 mr-auto">
                              Filters
                          </div>
                            <div className="form-inline ml-auto">
                              <Button
                                onClick={this.handleResetFilter}

                                variant="contained" size="small" className={classes.filterButton}>
                                RESET
                            </Button>
                              <Button
                                onClick={this.handleFilterArray}
                                variant="contained" size="small" className={classes.filterButton}>
                                APPLY
                            </Button>
                            </div>
                          </div>
                          <hr />
                          <div class="form-inline">

                            <div className="fontRegular12 form-inline">
                              <div className="fontSemiBold14 mr-3">
                                Type :
                        </div>
                              <FormControlLabel
                                classes={{
                                  label: classes.labelFont
                                }}
                                control={
                                  <Checkbox
                                    checked={this.state.nationalParty}
                                    onChange={this.handleNationalParty}
                                    value="National Party"

                                    classes={{
                                      root: classes.rootCheckBox,
                                      checked: classes.checked,
                                    }}
                                  />
                                }
                                label="National Party"
                              />
                              <FormControlLabel
                                classes={{
                                  label: classes.labelFont
                                }}
                                control={
                                  <Checkbox
                                    checked={this.state.stateParty}
                                    onChange={this.handleStateParty}
                                    value="State Party"

                                    classes={{
                                      root: classes.rootCheckBox,
                                      checked: classes.checked,
                                    }}
                                  />
                                }
                                label="State Party"
                              />
                              <FormControlLabel
                                classes={{
                                  label: classes.labelFont
                                }}
                                className={classes.marginCheckBox}
                                control={
                                  <Checkbox
                                    checked={this.state.unrecParty}
                                    onChange={this.handleUnrecognized}
                                    value="Unrecognized"

                                    classes={{
                                      root: classes.rootCheckBox,
                                      checked: classes.checked,
                                    }}
                                  />
                                }
                                label="Unrecognized"
                              />
                            </div>
                          </div>

                          <div>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} lg={9} md={9} xl={9} className="mt-3 text-right form-inline d-flex justify-content-end">
              <div className="mt-1">
                <Button variant="contained" size="small"
                  className={classes.addButton}
                  onClick={this.handleAddClick.bind(this)}
                >
                  <img src={Add} className={classes.iconMargin}
                    alt="search" width="13"
                  />
                  ADD PARTY
                </Button>
              </div>
              <div className="mt-1">
                <Button variant="contained" size="small" className={classes.importButton} onClick={this.openDropZonePopup.bind(this, true)}>
                  <img src={Download} className={classes.iconMargin}
                    alt="search" height="18" width="18"
                  />
                  IMPORT LIST
                </Button>
              </div>
            </Col>
          </Row>
        </Container>



        {this.state.loaderSpinner === true ?
          <div className="d-flex justify-content-center align-items-center position-relative"><div class="loaderSpinner"></div></div>
          :

          <div>
            {this.state.isLoading === true ? <CircularProgress className={classes.circularLoader} />
              :
              <Container fluid={true} className="mt-3 candidateGridContainer pl-3 pr-2">

                <Row className="rowCandidate">

                  {this.state.arrayItems.map((item, index) => {
                    return (

                      <Col className="candidateCards" key={index} xs={6} sm={4} lg={3} md={3} xl={2}>
                        <div className="flex_card_design border lightBackgroundColor">
                          <div className="circleImagePolitical cursorPointer" onClick={this.handleProfileClick.bind(this, item.party_id, item.party_name)}>
                            
                            <div className="imageUpload">
                              <Image
                                className="imageCandidatePartyProfile"
                                src={item.party_img_url === null || item.party_img_url === '' ? PartyPic : item.party_img_url}
                                responsive
                                onError={this.handlePartyImgError}
                              >
                              </Image>
                            </div>
                           
                          </div>
                          <h5 className="fontSemiBold16 greyFontColor mt-3 heading_height">{item.party_name}</h5>

                          <p className="fontRegular12 greyFontColor mb-auto mt-1">
                            <i>
                              {item.party_chairperson} - {item.party_year_of_establishment === '0000-00-00' ? null : item.party_year_of_establishment} <br />
                              {item.party_registered_state} | {item.party_type}
                            </i>
                          </p>
                          <div className="form-inline mt-2 w-100">
                            <div className="d-flex ml-auto mr-auto">

                              <div className="cursorPointer icon_styling" key={index} onClick={this.handleHideAndUnhideApi.bind(this, item.party_id, index, item.party_hide_flag)}>
                                {!this.state.iconLoaded[index] && item.party_hide_flag === 0 ?
                                                                    <VisibilityOff className="greyFontColor icon" /> :
                                  
                                  <Visibility className="greyFontColor icon" />
                                  // </Tooltip>
                                }

                              </div>
                              <div className="ml-3 cursorPointer icon_styling">
                                
                                <Create className="greyFontColor cursorPointer icon"
                                  onClick={this.handleEditClick.bind(this, item.party_id, item.party_img_url)}
                                />
                               
                              </div>
                              <div className="ml-3 cursorPointer icon_styling">
                               
                                <Delete className="greyFontColor cursorPointer icon" onClick={this.handleOpen.bind(this, item.party_id, index)} />
                               
                                <Dialog
                                  transition={Collapse}
                                  open={this.state.open}
                                  onClose={this.handleClose}
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
                                  <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Confirmation"}</DialogTitle>
                               
                                  <DialogContent className={classes.dailogContent}>
                                    <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                                      <div className="fontSemiBold16 mt-4">
                                        Are You sure you want to delete this party?
                                    </div>
                                      <div className="fontRegular12 mt-3">
                                        All data associated with this party (Including Candidates) will be deleted and this process cannot be undone.
                                    </div>

                                      <div className="mt-3 form-inline d-flex justify-content-center">
                                        <div className="mr-2 mt-3">
                                          <Button onClick={this.handleClose} variant="contained"
                                            className={classes.dailogButton}
                                          >
                                            CANCEL
                                        </Button>
                                        </div>
                                        <div className="mt-3">
                                          <Button onClick={this.handleDelete} variant="contained"
                                            className={classes.dailogButton}
                                          >
                                            DELETE
                                        </Button>
                                        </div>
                                      </div>
                                    </DialogContentText>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>

                        </div>

                      </Col>                     
                    );
                  }
                  )}


                </Row>

              </Container>
            }
            {this.state.loadMoreSpinner === true ?
              <Fade in={true} timeout={{
                enter: 25, exit: 25
              }}>
                <CircularProgress
                  size={30}
                  thickness={4.6}
                  className={classes.circularLoader} />
              </Fade>
              : null
            }

          </div>
        }

        <div className="searchDialogBox">
          <Dialog
            scroll='paper'
            fullWidth
            open={this.state.openDropZone}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.openDropZonePopup.bind(this, false)}
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
            <DialogTitle id="alert-dialog-slide-title" className={classes.dailogTitle}>
              <Row className="p-2 text-white">
                <div className="col-12 text-center">
                  Import list from file
                </div>
              </Row>
            </DialogTitle>
            <DialogContent className={classes.paperComment}>
              <DialogContentText id="alert-dialog-slide-description">
                <div className="commetTextArea">
                  <Row className="ml-0 mr-0 mt-3">
                    <div className="col-12 dropZoneBox d-flex align-items-center">

                      <Dropzone onDrop={this.handleDrop} accept="image/jpeg,image/jpg,image/tiff,image/gif"
                        multiple={false} onDropRejected={() => { }}>
                        {() => {
                          return (
                            "Drag a file here or click to upload."
                          );
                        }}
                      </Dropzone>
                    </div>
                  </Row>
                </div>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </Dialog>

        </div>

      </div>

    )
  }
}


AdminPoliticalParties = withRouter(AdminPoliticalParties)
export default withStyles(styles)(AdminPoliticalParties);
