/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin election 
Purpose   : admin election list view section 
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Table } from 'reactstrap';
import Switch from '@material-ui/core/Switch';
import { NavLink } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import PrimarySearchAppBar from './appBar/appBar';
import { withRouter } from 'react-router-dom'
import produce from "immer"
import Delete from '../../images/SVGs/delete.svg';
import Add from '../../images/SVGs/add.svg'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import RadioChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButton from '@material-ui/icons/RadioButtonUnchecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ErrorSnackBar from '../../networkCall/errorSnackBar'
import { constants } from '../../networkCall/constant';
import { items } from '../../networkCall/service.js';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  tableList: {
    boxShadow: 'box-shadow: rgb(107, 106, 106) 0px 1px 6px 0px',
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
  iconMargin: {
    marginRight: '5%',
    color: 'white'
  },
  circularLoader: {
    color: '#E18F68',
    marginLeft: 'auto',
    marginRight: 'auto'
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
  colorBar: {},
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
  filterButton:{
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
  label:{
    position: 'absolute',
    left: '50px',
    fontFamily: 'montserratregular',
    fontSize: 12,
  },
  checkBox:{
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
  labelFont:{
    fontFamily: 'montserratregular',
    fontSize: 14,
  }
});


class AdminElectionPage extends Component {

  state = {
    electionList: [],
    circularLoader: true,
    open: false,
    deleteIndex : '',
    filterClass : '',
    stateListArray:[],
    vidhanSabha: false,
    lokSabha: false,
    tempElectionArray:[],
    tempStateIdArray:[],
    lokSabhaText: '',
    vidhanSabhaText:'',
    stateList:'',
    backClass: 'back',
    stateListParameter:{
      votingElection_code : constants.votingElectionCode
    },
    filterParameter:{
      votingElection_code :constants.votingElectionCode,
      user_type :'admin',
      election_type :[],
      state_id :[],
      count :''
    },
    noElection: false,
    openNoElection: false,
    noFilter: false,
    vertical: 'top',
    horizontal: 'center',
    noElectionMsg: "No election available",
    selectFilterMsg:"Please select one filter at least"
  }

  handleClick =(e) => {
    if(this.node.contains(e.target)){
      return null
    }
    else{
      this.setState({ lokSabha: false })
      this.setState({ vidhanSabha: false })
      this.handleAlert()
    }
  }
  handleAlert = () => {
    this.setState({filterClass : ''});
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);

    this.electionList();
    items('POST', this.state.stateListParameter, constants.viewAllState)
    .then(response => {
      if(response.status === "Success" && response.data !== null && response.data.length !== 0){
        this.setState({ stateListArray: response.data }, function() {
          var result = this.state.stateListArray.map(function(el) {
            var o = Object.assign({}, el);
            o.isChecked = false;
            return o;
          })
          
          this.setState({ stateListArray: result }, function() {
           console.log(this.state.stateListArray)
          })
        })

      }
    })
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClickOpen = (indx) => {
    this.setState({deleteIndex : indx})
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  statusChange = (indx) => {
    if (this.state.electionList[indx].election_status == 0) {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        token_id: localStorage.getItem('accessToken'),
        election_id: this.state.electionList[indx].election_id,
        status: 'unhide'
      }

      items('POST', requestedData, constants.electionHide)
        .then(response => {

          if (response.status === "Success") {
            this.state.electionList[indx].election_status = 1;
            this.setState({ user_status: this.state.electionList });
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
        election_id: this.state.electionList[indx].election_id,
        status: 'hide'
      }

      items('POST', requestedData, constants.electionHide)
        .then(response => {

          if (response.status === "Success") {
            this.state.electionList[indx].election_status = 0;
            this.setState({ user_status: this.state.electionList });
          }
          else if (response.status === "Failure") {

          }
          else {

          }
        });
      this.state.electionList[indx].election_status = 0;
      this.setState({ user_status: this.state.electionList });
    }
  }


  pushToElectionDetail = (election_id, election_type, election_name) => {
    this.props.history.push('/AdminElectionDetail/' + election_id + '/' + election_type + '/' + election_name);
  }

  electionList() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      user_type: 'admin'
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

  deleteElection = (indx) => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      election_id: this.state.electionList[this.state.deleteIndex].election_id,
    }

    items('POST', requestedData, constants.AdminDeleteElection)
      .then(response => {
        if (response.status === "Success") {
          this.state.electionList.splice(this.state.deleteIndex, 1);
          this.setState({ electionList: this.state.electionList });
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      })
  };

  filterBoxShowHide = () =>
    {
      if(this.state.filterClass === '')
      {
        this.setState({filterClass : 'flip'});
      }
      else
      {
        this.setState({filterClass : ''});
        this.setState({ backClass: 'newBack' })
        
      }
    }

    handleVidhanSabha = () => {
      this.setState({ lokSabha: false }, function () {
        this.setState({tempElectionArray: this.state.tempElectionArray.filter(function(tempElectionArray) { 
          return tempElectionArray !== 'lok_sabha'
  
      })}, function(){
        console.log(this.state.tempElectionArray)
        this.setState(prevState => ({
          vidhanSabha: !prevState.vidhanSabha,
        }), function() {
          if(this.state.vidhanSabha === true) {
           this.setState({ vidhanSabhaText: 'vidhan_sabha' })
           this.setState({ tempElectionArray :[...this.state.tempElectionArray, 'vidhan_sabha' ] }, function() {
            console.log(this.state.tempElectionArray)
           })
          }
          else{
            this.setState({ vidhanSabhaText: '' })
            this.setState({tempElectionArray: this.state.tempElectionArray.filter(function(tempElectionArray) { 
              return tempElectionArray !== "vidhan_sabha"
      
          })}, function(){
            console.log(this.state.tempElectionArray)
          });
          this.setState({ tempStateIdArray: [] })
            var result = this.state.stateListArray.map(function(el) {
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

    handleLokSabha = () => {
      console.log(this.state.tempStateIdArray)
      this.setState({ tempStateIdArray: [] })
      var result = this.state.stateListArray.map(function(el) {
        var o = Object.assign({}, el);
        o.isChecked = false;
        return o;
      })
      this.setState({ stateListArray: result })
      this.setState({ vidhanSabha: false }, function() {
        this.setState({tempElectionArray: this.state.tempElectionArray.filter(function(tempElectionArray) { 
          return tempElectionArray !== "vidhan_sabha"
  
      })}, function(){
        console.log(this.state.tempElectionArray)
        this.setState(prevState => ({
          lokSabha: !prevState.lokSabha,
        }), function() {
          if(this.state.lokSabha === true) {
            this.setState({ lokSabhaText: 'lok_sabha' })
            this.setState({ tempElectionArray:[...this.state.tempElectionArray, 'lok_sabha' ] }, function() {
              console.log(this.state.tempElectionArray)
            })
          }
          else{
            this.setState({ lokSabhaText: '' })
            this.setState({tempElectionArray: this.state.tempElectionArray.filter(function(tempElectionArray) { 
              return tempElectionArray !== 'lok_sabha'
      
          })}, function(){
            console.log(this.state.tempElectionArray)
          });
           
          }
        })
      });
      })
    }
    
    handleStateSelect = (index, state_name, idState) => {

      this.setState(produce((draft) => {
        draft.stateListArray[index].isChecked = !this.state.stateListArray[index].isChecked
      }), function () {
        if(this.state.stateListArray[index].isChecked === true){
         this.setState({ stateList: idState })
         this.setState({ tempStateIdArray: [...this.state.tempStateIdArray, idState] }, function() { 
          console.log(this.state.tempStateIdArray)
         })
        }
        else{
          this.setState({ stateList: '' })
          this.setState({tempStateIdArray: this.state.tempStateIdArray.filter(function(tempStateIdArray) { 
            return tempStateIdArray !== idState
    
        })}, function(){
          console.log(this.state.tempStateIdArray)
        });
        }
      })
    }

    handleFilterArray = () => {
      if(this.state.tempElectionArray.length === 0) {
        this.setState({ noFilter: true })
        setTimeout(() => {
          this.setState({ noFilter: false })
        },3500)
      }
      else{
        this.setState({ filterParameter:{...this.state.filterParameter,  election_type: JSON.stringify(this.state.tempElectionArray), 
        state_id: this.state.tempStateIdArray.length === 0 ? '' : JSON.stringify(this.state.tempStateIdArray)
        } }, function() {
          console.log(this.state.filterParameter)
          items('POST', this.state.filterParameter, constants.electionFilter)
        .then(response => {
          console.log(response)
            if(response.status === "Success"){
            {
              if(!(response.data === null || response.data.length === 0)){
                this.setState({ electionList: response.data })
                this.setState({filterClass : ''});
              }else{
                this.setState({ electionList: response.data });
                this.setState({filterClass : ''});
                setTimeout(() => {
                  this.setState({ openNoElection: false })
                },3500)
              }
            }
          }
          else{
            this.setState({ openNoElection: true })
            setTimeout(() => {
              this.setState({ openNoElection: false })
            },3500)
          }
        })
        })
      }
    }

    handleResetFilter = () => {
      // if(this.state.lokSabha === true || this.state.vidhanSabha === true ){
        
        let requestedData = {
          votingElection_code: constants.votingElectionCode,
          user_type: 'admin'
        }
    
        items('POST', requestedData, constants.AdminElectionList)
          .then(response => {
            if (response.status === "Success") {
              if (!(response.data === null || response.data.length === 0)) {
                this.setState({ electionList: response.data });
                
              }
             
            }
          })

          if(this.state.lokSabha === true) {
            this.setState({ lokSabha: false })
            this.setState({ lokSabhaText: '' })
            this.setState({tempElectionArray: this.state.tempElectionArray.filter(function(tempElectionArray) { 
              return tempElectionArray !== 'lok_sabha'
      
          })}, function(){
            console.log(this.state.tempElectionArray)
          });
        
          }
          if(this.state.vidhanSabha === true) {
            this.setState({ vidhanSabha: false })
            this.setState({ vidhanSabhaText: '' })
            this.setState({tempElectionArray: this.state.tempElectionArray.filter(function(tempElectionArray) { 
              return tempElectionArray !== "vidhan_sabha"
      
          })}, function(){
            console.log(this.state.tempElectionArray)
          });
          this.setState({ tempStateIdArray: [] })
            var result = this.state.stateListArray.map(function(el) {
              var o = Object.assign({}, el);
              o.isChecked = false;
              return o;
            })
            this.setState({ stateListArray: result })
          }
      // }

    }

  render() {
    const { classes, theme } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="userElection">

        <PrimarySearchAppBar />

        <Container fluid={true} className="">
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
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / Elections</p>
            </Col>
          </Row>
        </Container>

        <Container fluid={true} className="w-90 AdminPoliticalPartyContainer mt-5">
          <Row className="mb-3 marginTop60">
            <Col xs={12} sm={12} lg={3} md={3} xl={3} className="mt-4 text-left">
              <div  className="form-inline">
                <div className="form-inline">
                  <h5 className="fontSemiBold18 greyFontColor mr-3 pb-1 headingPage">Elections</h5>
                </div>
                <div className="position-relative filterBox" ref={node => this.node = node}>
                  <i className="fa fa-filter cursorPointer" onClick={this.filterBoxShowHide}></i>
                  <div className={`hover card_panel ${this.state.filterClass}`}>
                    <div ref={node => this.node = node} className='back' >
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
                                  disableRipple={this.state.vidhanSabha ?  true : false }
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
                                  disableRipple={this.state.lokSabha ?  true : false }                        
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
                                    onChange={this.handleStateSelect.bind(this,index, item.state_name, item.state_id)}
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
            <Col xs={12} sm={12} lg={9} md={9} xl={9} className="mt-4 text-right">
              <div className="buttonContainer">
                <Button variant="contained" size="small" className={classes.addButton} onClick={ () => { 
                  this.props.history.push('/AddElection')
                 }}>
                  <img src={Add} className={classes.iconMargin} alt="search" width="13"/>
                  ADD ELECTION
                </Button>
              </div>
            </Col>
          </Row>
        </Container>


        <Container fluid={true} className="electionGridContainer">
          <Row className="rowCandidate">
            <Col xs={12} sm={12} lg={12} md={12} xl={12} className="pl-0 pr-0">
              <div className="tableElectionDiv text-left">

                {this.state.circularLoader ? <CircularProgress className={classes.circularLoader} /> :
                  <Table className="table table-striped tableElectionList">
                    <thead className="lightBackgroundColor fontSemiBold18">
                      <tr >
                        <th className="tableHeaderTwoElection fontBold16 greyFontColor">Election Name</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor">Total Seats</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor">Election Status</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor">Start Date</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor">End Date</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor">Status</th>
                        <th className="tableheaderTwoElection fontBold16 greyFontColor">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.electionList.map((item, index) => {
                        return (

                          <tr className={styles.lightBackgroundColor} key={index} >
                            <td className="greyFontColor cursorPointer fontRegular14" onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>
                              {item.election_name}
                            </td>
                            <td className="greyFontColor cursorPointer fontRegular14 pl-4" onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>{item.total_seat}</td>
                            <td className="greyFontColor cursorPointer fontRegular14" onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>{item.current_status}</td>
                            <td className="greyFontColor cursorPointer fontRegular14" onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>{item.election_start_date === '0000-00-00' ? null : item.election_start_date}</td>
                            <td className="greyFontColor cursorPointer fontRegular14" onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>{item.election_end_date === '0000-00-00' ? null : item.election_end_date}</td>
                            <td className="greyFontColor  fontRegular14">
                              <Switch
                                checked={item.election_status}
                                onChange={this.statusChange.bind(this, index)}
                                value="0"
                                className="height_auto"
                                classes={{
                                  switchBase: classes.colorSwitchBase,
                                  checked: classes.colorChecked,
                                  bar: classes.colorBar,
                                }}
                              />
                            </td>
                            <td className="greyFontColor pl-4">
                              <img onClick={""}
                                src={Delete} className="greyFontColor cursorPointer icon"
                                alt="" width="15"
                                // onClick={this.deleteElection.bind(this, index)}
                                onClick={this.handleClickOpen.bind(this,index)}
                              />
                            </td>
                            <Dialog
                              open={this.state.open}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={this.handleClose}
                              aria-labelledby="alert-dialog-slide-title"
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Confirmation"}</DialogTitle>
                              <DialogContent className={classes.dailogContent}>
                                <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                                  <div className="fontSemiBold16 mt-4">
                                    Are You sure you want to delete this election?
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
                                        onClick={this.deleteElection.bind(this, index)}
                                      >
                                        DELETE
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContentText>
                              </DialogContent>
                            </Dialog>
                          </tr>
                        )
                      })}

                      {this.state.electionList.length === 0 ?
                        <tr>
                          <td colSpan="7">
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


      </div>
    )
  }
}

AdminElectionPage = withRouter(AdminElectionPage);
export default withStyles(styles)(AdminElectionPage);
