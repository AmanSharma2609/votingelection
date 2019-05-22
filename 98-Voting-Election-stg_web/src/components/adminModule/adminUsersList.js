/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin User List
Purpose   : admin user list, can delete user or activate of deactivate status.
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import PrimarySearchAppBar from './appBar/appBar'
import { constants } from '../../networkCall/constant';
import { items } from '../../networkCall/service.js';
import Delete from '../../images/SVGs/delete.svg'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


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
  circularLoader1: {
    color: '#E18F68',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 15,
    height: 15
  },
  colorChecked: {
    color: "#E18F68",
    '&$colorChecked': {
      color: "#E18F68",
      '& + $colorBar': {
        backgroundColor: "#E18F68",
      },
    },
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
    
  },
  paperOpi: {
    boxShadow: 'none',
    position: 'absolute',
    borderRadius: 0,
    top: '30%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  colorBar: {},
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class AdminUsersList extends Component {
  state = {
    userList: [],
    circularLoader: true,
    open: false,
    deleteIndex: '',
    recordsPerPage: 10,
    currentPage: 0,
    totalPages: 0,
    currentUsersList: []
  }

  handleClickOpen = (indx) => {
    let index = this.state.userList.indexOf(this.state.currentUsersList[indx]);
    this.setState({ deleteIndex: index })
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.userList();
  }

  deleteUser = (indx) => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      user_id: this.state.userList[this.state.deleteIndex].user_id,
    }

    items('POST', requestedData, constants.AdminUserDelete)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ open: false });
          this.state.currentUsersList.splice(this.state.currentUsersList.indexOf(this.state.userList[this.state.deleteIndex]), 1);
          this.state.userList.splice(this.state.deleteIndex, 1);
          this.setState({ electionList: this.state.userList });
        }
        else if (response.status === "Failure") {
          this.setState({ open: false });
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ open: false });
          this.setState({ circularLoader: false });
        }
      })
  };

  statusChange = (index) => {
    let indx = this.state.userList.indexOf(this.state.currentUsersList[index]);
    if (this.state.userList[indx].user_status == 1) {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: localStorage.getItem('accessToken'),
        user_id: this.state.userList[indx].user_id,
        status: 'block'
      }

      items('POST', requestedData, constants.userBlock)
        .then(response => {
          if (response.status === "Success") {
            this.state.userList[indx].user_status = 0;
            this.setState({ user_status: this.state.userList });
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
        token_id: localStorage.getItem('accessToken'),
        user_id: this.state.userList[indx].user_id,
        status: 'unblock'
      }

      items('POST', requestedData, constants.userBlock)
        .then(response => {
          if (response.status === "Success") {
            this.state.userList[indx].user_status = 1;
            this.setState({ user_status: this.state.userList });
          }
          else if (response.status === "Failure") {

          }
          else {

          }
        });
    }
  }

  handlePageChange = (isPrevious) => {
    let temp = 0; 
    if(isPrevious){
      temp = this.state.currentPage - 1;
    }else{
      temp = this.state.currentPage + 1;
    }
    this.setState({currentPage: temp}, function(){
      let list = []
      let index = this.state.currentPage * this.state.recordsPerPage;
      for(let i = index; i < index + this.state.recordsPerPage; i++){
        if(this.state.userList[i] != undefined){
          list.push(this.state.userList[i]);
        }
      }
      this.setState({currentUsersList: list})
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    })
  }

  userList() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken')
    }

    items('POST', requestedData, constants.AdminUserList)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ userList: response.data }, function(){
              let temp = parseInt(this.state.userList.length / this.state.recordsPerPage, 10);
              if((this.state.userList.length % this.state.recordsPerPage) > 0){
                temp++;
              }
              this.setState({totalPages: temp}, function(){
                if(this.state.totalPages != 0){
                  this.setState({currentPage: 0});
                  let temp = this.state.userList;
                  this.setState({currentUsersList: temp.slice(0, this.state.recordsPerPage)})
                  console.log(this.state.totalPages)
                }
              })
            });
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

  render() {
    const { classes, theme } = this.props;

    return (
      <div className="userElection">

        <PrimarySearchAppBar />

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / Users </p>
            </Col>
          </Row>
        </Container>

        <Container fluid={true} className="w-90 AdminPoliticalPartyContainer mt-4">
          <Row className="mb-3">
            <Col xs={12} sm={12} lg={12} md={12} xl={12} className="mt-4 text-left">
              <div className="form-inline">
                <div className="form-inline headingParties">
                  <h5 className="fontSemiBold18 greyFontColor mr-3 pb-1 headingPage">Users</h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>


        <Container fluid={true} className="electionGridContainer">
          <Row className="rowCandidate">
            <Col xs={12} sm={12} lg={12} md={12} xl={12} className="pl-0 pr-0">
              <div className="tableElectionDiv text-left">
                {this.state.circularLoader ? <CircularProgress className={classes.circularLoader} /> :
                  <table className="table table-striped tableElectionList">
                    <thead className="lightBackgroundColor fontSemiBold18">
                      <tr >
                        <th className="tableHeaderTwoElection fontBold16 greyFontColor text-center">Full Name</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Constituency</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Email Address</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Member Since</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Last Login</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Status</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.currentUsersList.map((item, index) => {
                        return (
                          <tr className={styles.lightBackgroundColor}>
                            {item.user_name === null || item.user_name === '' ? <div className="mt-3 text-center">-</div> :
                              <td className="greyFontColor fontRegular14 text-center">
                                {item.user_name}
                              </td>
                            }

                            <td className="greyFontColor fontRegular14 text-center">{item.vs_constituency_name}</td>
                            <td className="greyFontColor fontRegular14 text-center">{item.user_email}</td>
                            <td className="greyFontColor fontRegular14 text-center">{item.user_created_on === '0000-00-00' ? null : item.user_created_on}</td>
                            <td className="greyFontColor fontRegular14 text-center">{item.last_login === '0000-00-00' ? null : item.last_login}</td>
                            <td className="greyFontColor fontRegular14 text-center">
                              <Switch
                                checked={item.user_status}
                                onClick={this.statusChange.bind(this, index)}
                                value="checkedA"
                                className="height_auto"
                                classes={{
                                  switchBase: classes.colorSwitchBase,
                                  checked: classes.colorChecked,
                                  bar: classes.colorBar,
                                }}
                              />
                            </td>
                            <td className="greyFontColor text-center">
                              <img onClick={""}
                                src={Delete} className="greyFontColor cursorPointer icon"
                                alt=""  width="15"
                                // onClick={this.deleteUser.bind(this, index)}
                                onClick={this.handleClickOpen.bind(this, index)}
                              />
                            </td>

                          </tr>
                        )
                      })}
                  
                    </tbody>

                  </table>
                }
              </div>
              {this.state.circularLoader ? null :
                <div className="row mb-3 mt-3">
                  <div className="col-6 text-left">
                    {this.state.currentPage === 0 ? null :
                      <span className="paginationButtons fontBold14" onClick={this.handlePageChange.bind(this, true)}>Previous</span>
                    }
                  </div>
                  <div className="col-6 text-right">
                    {this.state.currentPage === this.state.totalPages - 1 ? null :
                      <span className="paginationButtons fontBold14" onClick={this.handlePageChange.bind(this, false)}>Next</span>
                    }
                    </div>
                </div>
              }
              <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        PaperProps={{
                          classes: {
                            root: classes.paperOpi
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
                        <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Confirmation"}</DialogTitle>
                        <DialogContent className={classes.dailogContent}>
                          <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                            <div className="fontSemiBold16 mt-4">
                              Are You sure you want to delete this user?
                                  </div>
                            <div className="fontRegular12 mt-3">
                              All data will be deleted and this process cannot be undone.
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
                                <Button variant="contained"
                                  className={classes.dailogButton}
                                  onClick={this.deleteUser.bind(this, 'index')}
                                >
                                  DELETE
                                      </Button>
                              </div>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}
AdminUsersList = withRouter(AdminUsersList)
export default withStyles(styles)(AdminUsersList);
