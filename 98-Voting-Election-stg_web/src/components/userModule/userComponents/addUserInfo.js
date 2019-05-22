/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : addUserInfo.js
Purpose   : To add detail of user (after signup page)
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Cake from '@material-ui/icons/Cake';
import Place from '@material-ui/icons/Place';
import Religion from '@material-ui/icons/SupervisedUserCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import { InputGroup}
  from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js'
import { constants } from '../../../networkCall/constant'
import { items } from '../../../networkCall/service.js'
import Male from '../../../images/SVGs/male_deselect.svg'
import ColoredMale from '../../../images/SVGs/male_select.svg'
import ColoredFemale from '../../../images/SVGs/female_select.svg'
import Female from '../../../images/SVGs/female_deselect.svg'
import ColoredOther from '../../../images/SVGs/other_select.svg'
import Other from '../../../images/SVGs/other_deselect.svg'
import SnackBar1 from '../../../networkCall/snackBar.js'
import SnackBar from '../../../networkCall/errorSnackBar'

// React material theme
const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

// Inline style for react material component
const styles = theme => ({
  textFieldInput1: {
    justifyContent: 'center',
    borderRadius: 0,
    height: "50px",
    backgroundColor: 'white',
    fontSize: 16,
    width: 'calc(100% - 24px)',
    margin: 0,
    paddingLeft: '8px',
    borderBottom: '0.5px solid  #f2f2f2'
  },
  btnColor: {
    backgroundColor: 'white',
    '&:after': {
      borderBottom: '2px solid white',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  borderStyle: {
    borderBottomColor: "white"
  },
  textFieldInput2: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
    width: 'calc(100% - 24px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2'
  },
  selectField: {
    backgroundColor: 'white',
    width: 'calc(100% - 24px)',
    paddingLeft: 10,
    boxShadow: 'none',
    height: 50,
    border: 'none',
    marginLeft: '10px',
    fontSize: 15,
    color: '#555555',
    fontFamily: 'montserratregular',
    '&:focus': {
      border: 'none',
    }
  },
  root: {
    padding: 5
  },
  resize: {
    fontSize: 15,
    color: '#555555',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#555555',
    }
  },
  buttonaddUserInfo: {
    width: '100%',
    height: 40,
    boxShadow: 'none',
    border: 'none',
    borderRadius: 0,
    backgroundColor: '#E18F68',
    fontSize: 12,
    fontFamily: 'montserratregular',
    color: 'white',
    marginBottom: '10%',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  iconmargin: {
    marginLeft: '4%',
    marginRight: '16%',
  },
  textMargin: {
    marginLeft: '4%'
  },
  label: {
    fontFamily: 'montserratsemibold',
    fontSize: '14px',
    color: '#555555'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  margin: {
    margin: theme.spacing.unit,
    width: '100%',
    padding: '0px'
  },
  cssLabel: {
    '&$cssFocused': {
      border: '0px',
      color: '#A5A5A5',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      border: '0px',
      borderBottomColor: '#A5A5A5',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      border: '0px',
      borderColor: '#A5A5A5',
    },
  },
  notchedOutline: {
    border: '0px'
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '0px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: 0,
    height: '30px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#A5A5A5',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
    backgroundColor: '#fff'
  },
});

//To store a current date
const today = new Date();
var inputProps = {
  max: today
};

class AddUserInfo extends Component {
  // State of add user info class

  state = {
    password: '',
    showPassword: false,
    startDate: null,
    stateoptionArray: [],
    stateSelect: "",
    optionDistrictArray: [],
    districtSelect: "",
    constiListArray: [],
    viewAllState: {
      votingElection_code: constants.votingElectionCode,
    },
    viewAllDistrict: {
      votingElection_code: constants.votingElectionCode,
    },
    viewAllConstiList: {
      votingElection_code: constants.votingElectionCode,
      district_id: null
    },
    constiList: [],
    constiSelect: "",
    addUserParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      user_name: '',
      user_gender: '',
      user_dob: '',
      user_profession: '',
      user_location: '',
      user_constituency: '',
      user_region: '',
      user_religion: '',
    },
    emptyParameter: false,
    genderEmpty: false,
    professionEmpty: false,
    religionEmpty: false,
    dobEmpty: false,
    stateEmpty: false,
    distEmpty: false,
    constEmpty: false,
    dobExceed: false,
    vertical: 'top',
    horizontal: 'center',
    resendOpen: false,
    resendMsg: '',
    open: false,
    dateValue: '',
    dateHold: null,
    parameterEmpty: false,
    maxDate: '',
    inputProps:{
    },
    religions: constants.religions,
    professions: constants.professions,
    userDetail : [{}],
    districtDis: false,
    constiDis: false,
  };

  // To handle a state name
  handleAddStateName = (e) => {
    if(e.target.value !==null) {
      this.setState({ stateEmpty: false })
      this.setState({ parameterEmpty: false })
      const temp = this.searchFunction(this.state.stateoptionArray, 'state_name', e.target.value)
      this.setState({ addUserParameter:{...this.state.addUserParameter, user_location : temp.state_id} })
    }
    this.setState({ stateSelect: e.target.value }, function () {
      this.handleViewAllDistrict()
    })

  }

  // To handle a strict name
  handleAddDistrictName = (e) => {
    if(e.target.value !== null ){
      const temp = this.searchFunction(this.state.optionDistrictArray, 'district_name', e.target.value)
      this.setState({ addUserParameter:{...this.state.addUserParameter, user_region: temp.district_id} })
    }
    this.setState({ districtSelect: e.target.value }, function () {
      this.handleViewContiList()
    })
  }

  // To handle a constituency name
  handleConstiName = (e) => {
    if(e.target.value !== null ){
      const temp = this.searchFunction(this.state.constiListArray, 'vs_constituency_name', e.target.value)
      this.setState({ addUserParameter:{...this.state.addUserParameter, user_constituency: temp.vs_constituency_id} })
    }
    this.setState({ constiSelect: e.target.value }, function () {
    })
  }

  // Search a value from array using key
  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  // View All district API calling
  handleViewAllDistrict = () => {
    const temp = this.searchFunction(this.state.stateoptionArray, "state_name", this.state.stateSelect)
    this.setState({ viewAllDistrict: { ...this.state.viewAllDistrict, state_id: temp.state_id } }, function () {
      this.setState({ districtDis: true })
      items('POST', this.state.viewAllDistrict, constants.viewAllDistrictList)
        .then(response => {
          if(!(response.data.length === null ||response.data.length === 0)) {
            this.setState({ districtDis: false })
            this.setState({ optionDistrictArray: response.data })
          }
          else {
            this.setState({ districtDis: false })
            this.setState({ optionDistrictArray: [] })
            this.setState({ constiListArray: [] })
            this.setState({ constiSelect: '' })
            this.setState({ districtSelect: '' })
          }
        })
    })
  }

  // View constituency list API calling
  handleViewContiList = () => {
    const temp = this.searchFunction(this.state.optionDistrictArray, "district_name", this.state.districtSelect)
    this.setState({ viewAllConstiList: { ...this.state.viewAllConstiList, district_id: temp.district_id } }, function () {
      this.setState({ constiDis: true })
      items('POST', this.state.viewAllConstiList, constants.viewAllConsti)
        .then(response => {
          if(!(response.data.length === null ||response.data.length === 0)){
            this.setState({ constiDis: false })
            this.setState({ constiListArray: response.data })
          }
          else{
            this.setState({ constiDis: false })
          }
        })
    })
  }

  // To handle the date input
  handleDateChange = (e) => {
    if(e.target.value !== null) {
      this.setState({ dobEmpty: false })
      this.setState({ parameterEmpty: false })
      const temp = moment(e.target.value).format('MM-DD-YYYY')
    }
    this.setState({ addUserParameter:{...this.state.addUserParameter, user_dob: e.target.value} })
  }

  // Handle the gender option
  handleGenderChange = (e) => {
    this.setState({ addUserParameter: { ...this.state.addUserParameter, user_gender: e.target.value } },
      function () {
      })
  }

  // handle the religion of a user
  handleReligion = (e) => {
    this.setState({ addUserParameter: { ...this.state.addUserParameter, user_religion: e.target.value } }, function () {
    })
  }

  // Fucntion to hide and unhide a password
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  // Function to handle a profession of user
  handleProfession = (e) => {
    this.setState({ addUserParameter: { ...this.state.addUserParameter, user_profession: e.target.value } }, function () {
    })
  }

  // Add user info submit function.
  handleAddUserInfo = () => {
   if(this.state.addUserParameter.user_dob.trim() === '' && this.state.stateSelect === ''){
   this.setState({ parameterEmpty: true })
   }
   else{
    if (this.state.addUserParameter.user_dob.trim() === '') {
      this.setState({ dobEmpty: true });
    }
     if (this.state.stateSelect === '') {
      this.setState({ stateEmpty: true });
    }
   }
   setTimeout(() => {
    if (this.state.parameterEmpty === false && this.state.dobEmpty === false && this.state.stateEmpty === false) {
        let requestedData = {
          votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
          token_id: btoa(this.props.match.params.token.split('|')[0]),
          user_id: this.props.match.params.token.split('|')[1],
          user_name: this.props.match.params.token.split('|')[2],
          user_gender: this.state.addUserParameter.user_gender,
          user_dob: this.state.addUserParameter.user_dob,
          user_profession: this.state.addUserParameter.user_profession,
          user_location: this.state.addUserParameter.user_location,
          user_constituency: this.state.addUserParameter.user_constituency,
          user_region: this.state.addUserParameter.user_region,
          user_religion: this.state.addUserParameter.user_religion
        }
        items('POST', requestedData, constants.addUserInfo)
          .then(response => {
            if (response.status === "Success") {
              this.setState({ resendMsg: response.msg })
              this.setState({ resendOpen: true });
              setTimeout(() => {
                this.setState({ resendOpen: false });
                 this.props.history.push('/');
              }, 4000)
            }
            else if (response.status === "Failure") {
              this.setState({ Msg: response.msg })
              this.setState({ open: true });
              setTimeout(() => {
                this.setState({ resendOpen: false });
              }, 4000)
            }
            else {
            }
          });
  }
   },10)
  }

  // Component did mount when class initiates.
  componentDidMount = () => {
    if(localStorage.getItem(btoa('userdetail')))
    {
      this.setState({userDetail : JSON.parse(atob(localStorage.getItem(btoa('userdetail'))))}, () => {

      })
    }
    this.stateList();
  }

  // To fetch the list of the state
  stateList()
  {
    items('POST', this.state.viewAllState, constants.viewAllState)
    .then(response => {
      if(response.status === 'Success')
      {
        if(!(response.data === null || response.data.length === 0))
        {
          this.setState({ stateoptionArray: response.data });
        }
      }
      else if(response.status === 'Failure'){
      }
      else
      {
      }
    });
  }

  //On enter submitting the useer info
  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.handleAddUserInfo();
    }
  }

  // Render method to render HTML

  render() {
    const { vertical, horizontal } = this.state;
    const { classes } = this.props;
    return (
      <div className="AppUserLogin">
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Col xs="12" sm="10" md="8" lg="6" xl="4" className="ml-auto mr-auto userInfoCont lightBackgroundColor">
            <div className="">
              <Row>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="ml-auto mr-auto marginTop60">
                  <div className="mt-5 greyFontColor fontRegular18">
                    <h5>Hey {this.state.userDetail[0].user_name} Welcome to the App,</h5>
                    <p className="">please provide more information about you..</p>
                  </div>
                </Col>
              </Row>
              <div className="validationContAdminLogin">
                {this.state.dobEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.dobEmpty}</span>
                  : null}
                  {this.state.parameterEmpty === true ?
                    <span className="fontRegular14 validationColor">Please fill the required fields</span>
                    : null}
                {this.state.stateEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.registrationStateCheck}</span>
                  : null}
              </div>

              <Row className="w-100">
                <Col sm={10} xs={10} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                  <div className="form-inline">
                    <div className="fontSemiBold14 greyFontColor mr-auto">
                      I'm a
                    </div>
                    <div className="fontSemiBold14 mr-auto">
                      <FormGroup className={classes.fontLabel} row>
                        <FormControlLabel classes={{
                          label: classes.label
                        }}
                          control={
                            <Radio
                              checked={this.state.addUserParameter.user_gender === "Female"}
                              onChange={this.handleGenderChange}
                              value="Female"

                              classes={{
                                root: classes.root,
                                checked: classes.checked,
                              }}
                              icon={<img src={Female} alt="Female" width="40"/>}
                              checkedIcon={<img src={ColoredFemale} alt="Female" width="40"/>}
                            />
                          }
                          label="Female"
                        />
                        <FormControlLabel classes={{
                          label: classes.label
                        }}
                          control={
                            <Radio
                              checked={this.state.addUserParameter.user_gender === "Male"}
                              onChange={this.handleGenderChange}
                              value="Male"
                              classes={{
                                root: classes.root,
                                checked: classes.checked,
                              }}
                              icon={<img src={Male} alt="male" width="40"/>}
                              checkedIcon={<img src={ColoredMale} width="40" alt="Male" />}
                            />
                          }
                          label="Male"
                        />
                        <FormControlLabel classes={{
                          label: classes.label
                        }}
                          control={
                            <Radio
                              checked={this.state.addUserParameter.user_gender === "Other"}
                              onChange={this.handleGenderChange}
                              value="Other"
                              classes={{
                                root: classes.root,
                                checked: classes.checked,
                              }}
                              icon={<img src={Other} alt="other" width="40" />}
                              checkedIcon={<img src={ColoredOther} width="40" alt="Other" />}
                            />
                          }
                          label="Other"
                        />
                      </FormGroup>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="12" md="10" lg="10" xl="10" className="ml-auto mr-auto">
                  <div className="mt-1">

                    <div className="bg-white selectBox ml-auto mr-auto d-flex pl-2 align-items-center">
                      <div>
                        <MuiThemeProvider theme={theme}>
                          <InputAdornment position="start">
                            <Religion color='primary' className={classes.religionSize} />
                          </InputAdornment>
                        </MuiThemeProvider>
                      </div>
                      <select type="text"
                        onKeyPress={this.onEnter}
                        value={this.state.addUserParameter.user_religion}
                        onChange={this.handleReligion}
                        className={classes.selectField}
                      >
                        <option value="" disabled className="fontRegular12">Religion</option>
                        {this.state.religions.map((item, index) => {
                          return (
                            <option value={item}>{item}</option>
                          );
                        }
                        )}
                      </select>
                    </div>
                    <div className="bg-white selectBox ml-auto mr-auto d-flex pl-2 align-items-center">
                      <div>
                        <MuiThemeProvider theme={theme}>
                          <InputAdornment position="start">
                            <Religion color='primary' className={classes.religionSize} />
                          </InputAdornment>
                        </MuiThemeProvider>
                      </div>
                      <select type="text"
                        value={this.state.addUserParameter.user_profession}
                        onChange={this.handleProfession}
                        className={classes.selectField}
                      >
                        <option value="" disabled className="fontRegular12">Profession</option>
                        {this.state.professions.map((item, index) => {
                          return (
                            <option value={item}>{item}</option>
                          );
                        }
                        )}
                      </select>
                    </div>
                    <div className="bg-white selectBox w-100 ml-auto mr-auto d-flex pl-2 align-items-center">
                      <MuiThemeProvider theme={theme}>
                        <InputAdornment position="start">
                          <Cake color='primary' />
                        </InputAdornment>
                      </MuiThemeProvider>
                      <InputGroup className="addUserDatePicker ">
                        <input {...this.state.inputProps}
                         ref="dateField" type="date"
                         value={this.state.dob}
                         onKeyPress={this.onEnter}
                          className="text-uppercase fontRegular14 form-control border-0 dateInput"
                          max={"2010-12-31"} placeholder="DATE OF BIRTH*"
                          min={"1947-12-31"} onChange={this.handleDateChange} />
                      </InputGroup>
                    </div>
                    <div className="bg-white selectBox w-100 ml-auto mr-auto d-flex pl-2 align-items-center">
                      <MuiThemeProvider theme={theme}>
                        <InputAdornment position="start">
                          <Place color='primary' />
                        </InputAdornment>
                      </MuiThemeProvider>
                      <select type="text"
                        value={this.state.stateSelect}
                        onChange={this.handleAddStateName}
                        onKeyPress={this.onEnter}
                        className={classes.selectField}
                      >
                        <option value="" disabled className="fontRegular12">State*</option>
                        {this.state.stateoptionArray.map((item, index) => {
                          return (
                            <option key={item.state_name} value={item.state_name}>{item.state_name}</option>
                          );
                        }
                        )}
                      </select>
                    </div>
                    <div className="bg-white selectBox w-100 ml-auto mr-auto d-flex pl-2 align-items-center">
                      <MuiThemeProvider theme={theme}>
                        <InputAdornment position="start">
                          <Place color='primary' />
                        </InputAdornment>
                      </MuiThemeProvider>
                      <select type="text"
                        value={this.state.districtSelect}
                        onChange={this.handleAddDistrictName}
                        onKeyPress={this.onEnter}
                        className={classes.selectField}
                        disabled={this.state.districtDis ? true : false}
                      >
                        <option value="" disabled className="fontRegular12">District</option>
                        {this.state.optionDistrictArray.map((item, index) => {
                          return (
                            <option key={item.district_name} value={item.district_name}>{item.district_name}</option>
                          );
                        }
                        )}
                      </select>
                    </div>
                    <div className="bg-white selectBox w-100 ml-auto mr-auto d-flex pl-2 align-items-center mb-1">
                      <MuiThemeProvider theme={theme}>
                        <InputAdornment position="start">
                          <Place color='primary' />
                        </InputAdornment>
                      </MuiThemeProvider>
                      <select type="text"
                        value={this.state.constiSelect}
                        onChange={this.handleConstiName}
                        onKeyPress={this.onEnter}
                        className={classes.selectField}
                        disabled={this.state.constiDis ? true : false}
                      >
                        <option value="" disabled className="fontRegular12">Constituency</option>
                        {this.state.constiListArray.map((item, index) => {
                          return (
                            <option key={item.vs_constituency_name} value={item.vs_constituency_name}>{item.vs_constituency_name}</option>
                          );
                        }
                        )}
                      </select>
                    </div>
                    <div>
                      <Button className={classes.buttonaddUserInfo}
                        onClick={this.handleAddUserInfo}
                      >CONTINUE
                      </Button>
                    </div>
                    <Link to='/' className="ForgotTextStyleLogin fontRegular12 greyFontColor">
                      <div className="mb-5">
                        <h4 className="fontRegular16  greyFontColor cursorPointer">Skip for now</h4>
                      </div>
                    </Link>
                  </div>
                </Col>
              </Row>
              <SnackBar1 open={this.state.resendOpen}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.resendMsg}
              />
              <SnackBar open={this.state.Open}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.resendMsg}
              />
            </div>
          </Col>
        </Container>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
AddUserInfo = withRouter(AddUserInfo)
export default withStyles(styles)(AddUserInfo);
