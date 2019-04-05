/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userElectionPage.js
Purpose   : To show the list of election to user.
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import produce from "immer"
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js';
import { constants } from '../../../networkCall/constant';
import { items } from '../../../networkCall/service.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButton from '@material-ui/icons/RadioButtonUnchecked';
import queryString from 'query-string'
import ErrorSnackBar from '../../../networkCall/errorSnackBar';

// Inline css class for react material components
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  tableList: {
    boxShadow: 'box-shadow: rgb(107, 106, 106) 0px 1px 6px 0px',
  },
  circularLoader: {
    color: '#E18F68',
    marginLeft: 'auto',
    marginRight: 'auto'
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
  label: {
    position: 'absolute',
    left: '50px',
    fontFamily: 'montserratregular',
    fontSize: 12,
  },
  checkBox: {
    paddingRight: '70px'
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

class UserElectionPage extends Component {
  // state of the class
  state = {
    electionList: [],
    circularLoader: true,
    searchType: '',
    filterClass: '',
    stateListArray: [],
    vidhanSabha: false,
    lokSabha: false,
    tempElectionArray: [],
    tempStateIdArray: [],
    lokSabhaText: '',
    vidhanSabhaText: '',
    stateList: '',
    backClass: 'back',
    stateListParameter: {
      votingElection_code: constants.votingElectionCode
    },
    filterParameter: {
      votingElection_code: constants.votingElectionCode,
      user_type: 'user',
      election_type: [],
      state_id: [],
      count: ''
    },
    noElection: false,
    openNoElection: false,
    noFilter: false,
    vertical: 'top',
    horizontal: 'center',
    noElectionMsg: "No election available",
    selectFilterMsg: "Please select one filter at least"
  }

  //Outside click functionality
  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return null
    }
    else {
      this.setState({ lokSabha: false })
      this.setState({ vidhanSabha: false })
      this.handleAlert()
    }
  }

  // To hide the filter box
  handleAlert = () => {
    this.setState({ filterClass: '' });
  }

  // Call this method and functions on component load
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    const values = queryString.parse(this.props.location.search)
    items('POST', this.state.stateListParameter, constants.viewAllState)
      .then(response => {
        if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
          this.setState({ stateListArray: response.data }, function () {
            var result = this.state.stateListArray.map(function (el) {
              var o = Object.assign({}, el);
              o.isChecked = false;
              return o;
            })
            this.setState({ stateListArray: result }, function () {
            })
          })
        }
      })
    if (values.sort === 'completed') {
      this.setState({ searchType: 'completed' }, () => {
        this.electionListStatus();
      }
      )
    }
    else if (values.sort === 'running') {
      this.setState({ searchType: 'In_progress' },
        () => {
          this.electionListStatus();
        }
      );
    }
    else if (values.sort === 'upcoming') {
      this.setState({ searchType: 'not_started' }, () => {
        this.electionListStatus();
      }
      );
    }
    else {
      this.setState({ searchType: '' }, () => {
        this.electionList();
      }
      );
    }
  }

  // Call this function and method on component load
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  // Calll this function when component will recieve params value
  componentWillReceiveProps = (newProps) => {
    const values = queryString.parse(newProps.location.search)
    items('POST', this.state.stateListParameter, constants.viewAllState)
      .then(response => {
        if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
          this.setState({ stateListArray: response.data }, function () {
            var result = this.state.stateListArray.map(function (el) {
              var o = Object.assign({}, el);
              o.isChecked = false;
              return o;
            })
            this.setState({ stateListArray: result }, function () {
            })
          })
        }
      })
    if (values.sort === 'completed') {
      this.setState({ searchType: 'completed' }, () => {
        this.electionListStatus();
      }
      )
    }
    else if (values.sort === 'running') {
      this.setState({ searchType: 'In_progress' },
        () => {
          this.electionListStatus();
        }
      );
    }
    else if (values.sort === 'upcoming') {
      this.setState({ searchType: 'not_started' }, () => {
        this.electionListStatus();
      }
      );
    }
    else {
      this.setState({ searchType: '' }, () => {
        this.electionList();
      }
      );
    }
  }

  // TO fetch the election list
  electionList() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      user_type: 'user'
    }
    items('POST', requestedData, constants.AdminElectionList)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ electionList: response.data });
          }
          this.setState({ circularLoader: false });
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      })
  }

  // TO fetch the status of election list
  electionListStatus() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_type: this.state.searchType
    }
    items('POST', requestedData, constants.electionStatusApi)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ electionList: response.data });
          }
          this.setState({ circularLoader: false });
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      })
  }

  // move to election detail on click
  pushToElectionDetail = (election_id, election_type, election_name) => {
    this.props.history.push('/UserElectionDetail/' + election_id + '/' + election_type + '/' + election_name);
  }

  // Toggle hide and unhide functionality in to show a filter box
  filterBoxShowHide = () => {
    if (this.state.filterClass === '') {
      this.setState({ filterClass: 'flip' });
    }
    else {
      this.setState({ filterClass: '' });
    }
  }

  // Hanlde vidhan sabha when selected in filter box
  handleVidhanSabha = () => {
    this.setState({ lokSabha: false }, function () {
      this.setState({
        tempElectionArray: this.state.tempElectionArray.filter(function (tempElectionArray) {
          return tempElectionArray !== 'lok_sabha'
        })
      }, function () {
        this.setState(prevState => ({
          vidhanSabha: !prevState.vidhanSabha,
        }), function () {
          if (this.state.vidhanSabha === true) {
            this.setState({ vidhanSabhaText: 'vidhan_sabha' })
            this.setState({ tempElectionArray: [...this.state.tempElectionArray, 'vidhan_sabha'] }, function () {
            })
          }
          else {
            this.setState({ vidhanSabhaText: '' })
            this.setState({
              tempElectionArray: this.state.tempElectionArray.filter(function (tempElectionArray) {
                return tempElectionArray !== "vidhan_sabha"
              })
            }, function () {
            });
            this.setState({ tempStateIdArray: [] })
            var result = this.state.stateListArray.map(function (el) {
              var o = Object.assign({}, el);
              o.isChecked = false;
              return o;
            })
            this.setState({ stateListArray: result })
          }
        })
      });
    })
  }

  // Handle lok sabha when selected in a filter box
  handleLokSabha = () => {
    this.setState({ tempStateIdArray: [] })
    var result = this.state.stateListArray.map(function (el) {
      var o = Object.assign({}, el);
      o.isChecked = false;
      return o;
    })
    this.setState({ stateListArray: result })
    this.setState({ vidhanSabha: false }, function () {
      this.setState({
        tempElectionArray: this.state.tempElectionArray.filter(function (tempElectionArray) {
          return tempElectionArray !== "vidhan_sabha"
        })
      }, function () {
        this.setState(prevState => ({
          lokSabha: !prevState.lokSabha,
        }), function () {
          if (this.state.lokSabha === true) {
            this.setState({ lokSabhaText: 'lok_sabha' })
            this.setState({ tempElectionArray: [...this.state.tempElectionArray, 'lok_sabha'] }, function () {
            })
          }
          else {
            this.setState({ lokSabhaText: '' })
            this.setState({
              tempElectionArray: this.state.tempElectionArray.filter(function (tempElectionArray) {
                return tempElectionArray !== 'lok_sabha'
              })
            }, function () {
            });
          }
        })
      });
    })
  }

  // handle the state when selected from filter box
  handleStateSelect = (index, state_name, idState) => {
    this.setState(produce((draft) => {
      draft.stateListArray[index].isChecked = !this.state.stateListArray[index].isChecked
    }), function () {
      if (this.state.stateListArray[index].isChecked === true) {
        this.setState({ stateList: idState })
        this.setState({ tempStateIdArray: [...this.state.tempStateIdArray, idState] }, function () {
        })
      }
      else {
        this.setState({ stateList: '' })
        this.setState({
          tempStateIdArray: this.state.tempStateIdArray.filter(function (tempStateIdArray) {
            return tempStateIdArray !== idState
          })
        }, function () {
        });
      }
    })
  }

  // Submit filter value 
  handleFilterArray = () => {
    if (this.state.tempElectionArray.length === 0) {
      this.setState({ noFilter: true })
      setTimeout(() => {
        this.setState({ noFilter: false })
      }, 3500)
    }
    else {
      this.setState({
        filterParameter: {
          ...this.state.filterParameter, election_type: JSON.stringify(this.state.tempElectionArray),
          state_id: this.state.tempStateIdArray.length === 0 ? '' : JSON.stringify(this.state.tempStateIdArray)
        }
      }, function () {
        items('POST', this.state.filterParameter, constants.electionFilter)
          .then(response => {
            if (response.status === "Success") {
              if (!(response.data === null || response.data.length === 0)) {
                this.setState({ electionList: response.data })
                this.setState({ filterClass: '' });
              } else {
                this.setState({ filterClass: '' });
                this.setState({ electionList: response.data })
                setTimeout(() => {
                  this.setState({ openNoElection: false })
                }, 3500)
              }
            }
            else {
              this.setState({ openNoElection: true })
              setTimeout(() => {
                this.setState({ openNoElection: false })
              }, 3500)
            }
          })
      })
    }
  }

  // Handle reset filter 
  handleResetFilter = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      user_type: 'user'
    }
    items('POST', requestedData, constants.AdminElectionList)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ electionList: response.data });
          }
        }
      })
    if (this.state.lokSabha === true) {
      this.setState({ lokSabha: false })
      this.setState({ lokSabhaText: '' })
      this.setState({
        tempElectionArray: this.state.tempElectionArray.filter(function (tempElectionArray) {
          return tempElectionArray !== 'lok_sabha'
        })
      }, function () {
      });
    }
    if (this.state.vidhanSabha === true) {
      this.setState({ vidhanSabha: false })
      this.setState({ vidhanSabhaText: '' })
      this.setState({
        tempElectionArray: this.state.tempElectionArray.filter(function (tempElectionArray) {
          return tempElectionArray !== "vidhan_sabha"
        })
      }, function () {
      });
      this.setState({ tempStateIdArray: [] })
      var result = this.state.stateListArray.map(function (el) {
        var o = Object.assign({}, el);
        o.isChecked = false;
        return o;
      })
      this.setState({ stateListArray: result })
    }
  }

  // Render the HTML of a class
  render() {
    const { classes, theme } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="userElection">
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / Elections </p>
            </Col>
          </Row>
        </Container>
        <Container fluid={true} className="w-90 AdminPoliticalPartyContainer mt-4">
          <ErrorSnackBar open={this.state.openNoElection}
            onClose={this.handleClose}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.noElectionMsg}
          />
          <ErrorSnackBar open={this.state.noFilter}
            onClose={this.handleClose}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.selectFilterMsg}
          />
          <Row className="mb-3 marginTop60">
            <Col xs={12} sm={12} lg={12} md={12} xl={12} className="mt-4 text-left">
              <div className="form-inline">
                <div className="form-inline">
                  <h5 className="fontSemiBold18 greyFontColor mr-3 pb-1 headingPage">Elections</h5>
                </div>
                <div className="position-relative filterBox" ref={node => this.node = node}>
                  <i className="fa fa-filter cursorPointer" onClick={this.filterBoxShowHide}></i>
                  <div className={`hover card_panel ${this.state.filterClass}`}>
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
                                    checked={this.state.lokSabha}
                                    onChange={this.handleLokSabha}
                                    value="Lok-Sabha"
                                    color="primary"
                                    disableRipple={this.state.vidhanSabha ? true : false}
                                    icon={<RadioButton fontSize="medium" />}
                                    checkedIcon={<RadioChecked fontSize="medium" />}
                                    classes={{
                                      root: classes.rootCheckBox,
                                      checked: classes.checked,
                                    }}
                                  />
                                }
                                label="Lok Sabha"
                              />
                              <FormControlLabel
                                classes={{
                                  label: classes.labelFont
                                }}
                                control={
                                  <Checkbox
                                    checked={this.state.vidhanSabha}
                                    onChange={this.handleVidhanSabha}
                                    value="Vidhan-Sabha"
                                    color="primary"
                                    disableRipple={this.state.lokSabha ? true : false}
                                    icon={<RadioButton fontSize="medium" />}
                                    checkedIcon={<RadioChecked fontSize="medium" />}
                                    classes={{
                                      root: classes.rootCheckBox,
                                      checked: classes.checked,
                                    }}
                                  />
                                }
                                label="Vidhan Sabha"
                              />
                              {this.state.vidhanSabha === true ? <div className="position-relative stateBox">
                                <div className={`stateHeader fontColor ${classes.labelFont} text-center darkBackground`}>Select State</div>
                                {this.state.stateListArray.map((item, index) => {
                                  return (
                                    <FormControlLabel
                                      classes={{
                                        label: classes.label
                                      }}
                                      control={
                                        <Checkbox
                                          disableRipple={true}
                                          checked={item.isChecked}
                                          onChange={this.handleStateSelect.bind(this, index, item.state_name, item.state_id)}
                                          value={item.state_name}
                                          className={classes.checkBox}
                                          color="primary"
                                          classes={{
                                            root: classes.rootCheckBox,
                                            checked: classes.checked,
                                          }}
                                        />
                                      }
                                      label={item.state_name}
                                    />
                                  )
                                }
                                )}
                              </div>
                                : null
                              }
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
        <Container fluid={true} className="electionGridContainer">
          <Row className="rowCandidate">
            <Col xs={12} sm={12} lg={12} md={12} xl={12} className="pl-0 pr-0">
              <div className="tableElectionDiv">
                {this.state.circularLoader ? <CircularProgress className={classes.circularLoader} /> :
                  <Table className="table table-striped tableElectionList text-left">
                    <thead className="lightBackgroundColor fontSemiBold18">
                      <tr >
                        <th className="tableHeaderTwoElection fontBold16 greyFontColor text-center">Election Name</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Total Seats</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Election Status</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Start Date</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.electionList.map((item, index) => {
                        return (
                          <tr className={`cursorPointer ${styles.lightBackgroundColor}`} onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>
                            <td className="greyFontColor cursorPointer text-center widthTable20">
                              {item.election_name}
                            </td>
                            <td className="greyFontColor text-center widthTable20">{item.total_seat}</td>
                            <td className="greyFontColor text-center widthTable20">{item.current_status}</td>
                            <td className="greyFontColor text-center widthTable20">{item.election_start_date === '0000-00-00' ? null : item.election_start_date}</td>
                            <td className="greyFontColor text-center widthTable20">{item.election_end_date === '0000-00-00' ? null : item.election_end_date}</td>
                          </tr>
                        )
                      })}
                      {this.state.electionList.length === 0 ?
                        <tr>
                          <td colSpan="5">
                            <div className="fontSemiBold16 greyFontColor text-center">
                              No record found.
                          </div>
                          </td>
                        </tr>
                        :
                        null
                      }
                    </tbody>
                  </Table>
                }
              </div>
            </Col>
          </Row>
        </Container>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(UserElectionPage);
