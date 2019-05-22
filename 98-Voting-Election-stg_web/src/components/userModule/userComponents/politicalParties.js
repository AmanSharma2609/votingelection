/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : politicalParties.js
Purpose   : To show the list of political parties
*/

import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import queryString from 'query-string'
import PartyPic from '../../../images/SVGs/default_partyimg.svg'
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js'
import { items } from '../../../networkCall/service.js';
import { constants } from '../../../networkCall/constant'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'

// Adding a theme to a material.

const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

// Inline styling to add a styling to react material design
const styles = theme => ({
  button: {
    padding: 8,
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
    color: '#E18F68'
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  inputWidthSearch: {
    width: '320px'
  },
  rootCheckBox: {
    '&$checked': {
      color: '#E18F68',
    },
  },
  checked: {
    color: '#E18F68',
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
  labelFont: {
    fontFamily: 'montserratregular',
    fontSize: 14,
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
  marginCheckBox: {
    marginLeft: '44px',
  }
});

// Tooltip styling
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


class PoliticalParties extends Component {
  //State of the class
  state = {
    arrayItems: [],
    isLoading: false,
    searchType: '',
    count: 0,
    loaderSpinner: false,
    filterClass: '',
    stopPartyCall: false,
    loadMoreParty: {
      votingElection_code: constants.votingElectionCode,
      count: 0
    },
    filterParty: [],
    filterArrayParameter: {
      votingElection_code: constants.votingElectionCode,
      user_type: 'user',
      party_type: null,
      count: ''
    },
    nationalParty: false,
    stateParty: false,
    unrecParty: false,
    nationalValue: '',
    stateValue: '',
    unrecValue: '',
    parameter: {
      votingElection_code: constants.votingElectionCode,
      type: 'user',
    },
    noFilter: false,
    noSelectMsg: 'Please select one filter at least',
    vertical: 'top',
    horizontal: 'center',
    noParty: false,
    noPartyMsg: 'No party present',
    startPartyFilter: false,
    stopFilterCall: false,
  }

  // Outside click functionality
  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return null
    }
    else {
      this.handleAlert()
    }
  }

  // To remove the style of filter class
  handleAlert = () => {
    this.setState({ filterClass: '' });
  }

  // Component did mount function for initiating a fucntion when component load
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    document.addEventListener('mousedown', this.handleClick, false);
    this.setState({ count: 0 });
    this.setState({ arrayItems: [] });
    window.addEventListener('scroll', this.onScroll, false);
    if (values.sort === 'national') {
      this.setState({ searchType: 'national_party' }, () =>
        this.partyListData()
      )
    }
    else if (values.sort === 'top') {
      this.setState({ searchType: 'upvote' },
        () => this.partyListData()
      );
    }
    else {
      this.setState({ searchType: '' }, () =>
        this.partyListData()
      );
    }
  }

  // / Component will unmount function for initiating a fucntion when component unload
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  // To fetch the value of route params
  componentWillReceiveProps = (newProps) => {
    const values = queryString.parse(newProps)
    this.setState({ count: 0 });
    this.setState({ arrayItems: [] });
    if (values.sort === 'national') {
      this.setState({ searchType: 'national_party' }, () => {
        this.partyListData();
      }
      )
    }
    else if (values.sort === 'top') {
      this.setState({ searchType: 'upvote' },
        () => {
          this.partyListData();
        }
      );
    }
    else {
      this.setState({ searchType: '' }, () => {
        this.partyListData();
      }
      );
    }
  }

  // To show the list of party
  partyListData() {
    if (this.state.count === 0) {
      this.setState({ isLoading: true });
    }

    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_type: this.state.searchType,
      count: this.state.count
    }

    items('POST', requestedData, constants.viewAllParty)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            for (let i of response.data) {
              this.state.arrayItems.push(i);
            }
            this.setState({ arrayItems: this.state.arrayItems })
            this.setState({ isLoading: false });
          }
          else {
            this.setState({ isLoading: false });
          }
        }
        else if (response.status === "Failure") {
          this.setState({ isLoading: false });
        }
        else {
          this.setState({ isLoading: false });
        }
      })
  }

  // On clicking on the party card push to party profile
  handleProfileClick = (party_id, party_name) => {
    this.props.history.push({
      pathname: '/Political-Parties/Political-Parties-Profile/',
      search: `?name=${party_name}&&id=${party_id}`
    })
  }

  // To handle the arrow of a tooltip
  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  // To show and hide a filter box
  filterBoxShowHide = () => {
    if (this.state.filterClass === '') {
      this.setState({ filterClass: 'flip' });
    }
    else {
      this.setState({ filterClass: '' });
    }
  }

  // On scroll party list should update as load more functionality
  partyListCall = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      if (this.state.startPartyFilter === true) {
        if (this.state.stopFilterCall === false) {
          this.setState({ loaderSpinner: true })
          this.setState({ filterArrayParameter: { ...this.state.filterArrayParameter, count: this.state.filterArrayParameter.count + 1 } }, function () {
            items('POST', this.state.filterArrayParameter, constants.partyFilter)
              .then(response => {

                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ arrayItems: this.state.arrayItems.concat(response.data) })
                  this.setState({ loaderSpinner: false })
                }
                else {
                  this.setState({ stopFilterCall: true })
                  this.setState({ loaderSpinner: false })
                }
              })
          })
        }
      }
      else {
        if (this.state.stopPartyCall === false) {
          this.setState({ loaderSpinner: true })
          this.setState({ loadMoreParty: { ...this.state.loadMoreParty, count: this.state.loadMoreParty.count + 1 } }, function () {
            items('POST', this.state.loadMoreParty, constants.viewAllParty)
              .then(response => {

                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ arrayItems: this.state.arrayItems.concat(response.data) })
                  this.setState({ loaderSpinner: false })
                }
                else {
                  this.setState({ stopPartyCall: true })
                  this.setState({ loaderSpinner: false })
                }
              })
          })
        }
      }
    }
  }

  // National party is selected in filter box
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

  // Handle state party selected in filter box
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

  // Handle the case of unrecognized party is been selected in filter box
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

  // Applying a filter to a party list
  handleFilterArray = () => {
    if (this.state.nationalValue === '' && this.state.stateValue === '' && this.state.unrecValue === '') {
      this.setState({ noFilter: true })
      setTimeout(() => {
        this.setState({ noFilter: false })
      }, 3500)
    }
    else {
      this.setState({ isLoading: true });
      this.setState({ filterArrayParameter: { ...this.state.filterArrayParameter, party_type: JSON.stringify(this.state.filterParty) } }, function () {
        items('POST', this.state.filterArrayParameter, constants.partyFilter)
          .then(response => {
            if (response.status === "Success") {
              if (!(response.data === null || response.data.length === 0)) {
                this.setState({ arrayItems: response.data });
                this.setState({ filterClass: '' });
                this.setState({ startPartyFilter: true })
              }
              this.setState({ isLoading: false });
            }
            else {
              this.setState({ noParty: true })
              this.setState({ startPartyFilter: false })
              setTimeout(() => {
                this.setState({ noParty: false })
              }, 2500)
              this.setState({ isLoading: false });
            }
          })
      })
    }
  }

  //Reset the value selected in a filter
  handleResetFilter = () => {
    this.setState({ isLoading: true });
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_type: this.state.searchType,
      count: 0
    }
    this.setState({ startPartyFilter: false })
    items('POST', requestedData, constants.viewAllParty)
      .then(response => {

        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ arrayItems: response.data })
          }
          this.setState({ isLoading: false });
        }
        else {
          this.setState({ isLoading: false });
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

  //To handle a broken image and replace it by default image
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  // To render a HTML of a component
  render() {
    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="partyCardsParent" onScroll={this.partyListCall}>
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to=''>Home </NavLink> / Political Parties</p>
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
          <Row className="mb-3 marginTop60">
            <Col xs={12} sm={12} lg={12} md={12} xl={12} className="mt-4 text-left">
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
          </Row>
        </Container>
        <div className="contheight">
          {this.state.isLoading === true ? <CircularProgress className={classes.circularLoader} />
            :
            <Container fluid={true} className="">
              <Container fluid={true} className="candidateGridContainer">
                {this.state.arrayItems === undefined || this.state.arrayItems.length === 0 ?
                  <Row className="rowCandidate">
                    <Col xl={12} className="text-center">No parties to show</Col>
                  </Row>
                  :
                  <Row className="rowCandidate">
                    {this.state.arrayItems.map((item, index) => {
                      return (
                        <Col className="candidateCards cursorPointer" xs={6} sm={4} lg={3} md={3} xl={2} onClick={this.handleProfileClick.bind(this, item.party_id, item.party_name)}>
                          <div className="flex_card_design lightBackgroundColor border">
                            <div className="circleImagePolitical cursorPointer">
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
                            <p className="fontRegular12 greyFontColor mb-3 mt-1"><i>{item.party_chairperson} - {item.party_year_of_establishment === '0000-00-00' ? null : item.party_year_of_establishment} <br /> {item.party_registered_state} | {item.party_type} </i></p>
                            <div className="form-inline alignBottom mt-2 fontRegular12">
                              {item.upvote_count}
                              <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                              <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                              {item.downvote_count}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    )}
                  </Row>
                }
              </Container>
              {this.state.loaderSpinner ?
                <CircularProgress
                  size={30}
                  thickness={4.6}
                  className={classes.circularLoader} />
                : null}
            </Container>
          }
        </div>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}



export default withStyles(styles)(PoliticalParties);
