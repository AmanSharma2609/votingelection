/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : editUserProfilePage.js
Purpose   : To edit the profile of a user.
*/

import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Cake from '@material-ui/icons/Cake';
import UserProfilePic from '../../../images/SVGs/default_userimg.svg'
import Place from '@material-ui/icons/Place';
import LocalMall from '@material-ui/icons/LocalMall';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import Religion from '@material-ui/icons/SupervisedUserCircle';
import Income from '@material-ui/icons/Money';
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import ErrorSnackBar2 from '../../../networkCall/errorSnackBar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Create from '@material-ui/icons/Create';
import { userImageUpload } from '../../../networkCall/userImageUpload.js'
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js'
import User from '../../../images/user.png'
import Mail from '../../../images/mail.png'
import Password from '../../../images/password.png'
import Phone from '../../../images/phone.png'
import Male from '../../../images/SVGs/male_deselect.svg'
import ColoredMale from '../../../images/SVGs/male_select.svg'
import ColoredFemale from '../../../images/SVGs/female_select.svg'
import Female from '../../../images/SVGs/female_deselect.svg'
import ColoredOther from '../../../images/SVGs/other_select.svg'
import Other from '../../../images/SVGs/other_deselect.svg'
import { items } from '../../../networkCall/service.js'
import { constants } from '../../../networkCall/constant'
import Snackbar1 from '../../../networkCall/snackBar.js'
import { withRouter } from 'react-router-dom';

// Materia theme 
const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

// Inline styling to update component of react material
const styles = theme => ({
  textFieldInput1: {
    borderRadius: 0,
    backgroundColor: '#FBFBFB',
    height: '50px',
    paddingLeft: 5,
    width: 'calc(80% - 24px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2',
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  iconMargin: {
    marginBottom: 15,
  },
  btnColor: {
    backgroundColor: 'white',
    '&:after': {
      // The source seems to use this but it doesn't work
      borderBottom: '2px solid white',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  iconmargin: {
    marginLeft: '4%',
    marginRight: '16%',
  },
  textMargin: {
    marginLeft: '4%'
  },
  borderStyle: {
    borderBottomColor: "white"
  },
  textFieldInput2: {
    borderRadius: 0,
    backgroundColor: 'white',
    height: '8%',
    paddingLeft: 5,
    width: 'calc(80% - 24px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2',
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  textFieldFormLabel: {
    fontSize: 11,
    marginLeft: 37,
    marginTop: 5,
    fontFamily: 'montserratregular',
  },
  buttoneditUserProfile: {
    width: 'calc(80% - 24px)',
    height: 40,
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: '#E18F68',
    color: 'white',
    fontSize: 16,
    fontFamily: 'montserratregular',
    marginBottom: '4%',
    marginTop: '4%',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  root: {
    padding: 5
  },
  slider: {
    padding: '22px 0px',
    width: '90%',
    marginLeft: 'auto',
    marginRight: "auto"
  },
  track: {
    color: '#E18F68',
    backgroundColor: '#E18F68'
  },
  thumbIconWrapper: {
    color: '#E18F68',
    backgroundColor: '#E18F68'
  },
  cssLabel: {
    fontFamily: 'montserratregular',
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
  marginEmail: {
    margin: theme.spacing.unit,
    width: '100%',
    height: '55px',
    padding: '0px',
    fontFamily: 'montserratregular',
  },
  marginProfession: {
    width: '100%',
    height: '55px',
    fontFamily: 'montserratregular',
    marginLeft: 4
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
  resize: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#3C3C3C',
      fontFamily: 'montserratregular',
    },
  },
  selectField: {
    backgroundColor: 'white',
    width: 'calc(100% - 24px)',
    paddingLeft: 5,
    boxShadow: 'none',
    height: 50,
    border: 'none',
    marginLeft: '10px',
    fontSize: 15,
    color: '#555555',
    fontFamily: 'montserratregular',
    '&:focus': {
      border: 'none',
    },
  },
  inputDate: {
    width: 'calc(100% - 24px)',
    paddingLeft: 5,
    boxShadow: 'none',
    height: '100%',
    border: 'none',
    marginLeft: '10px',
    fontSize: 15,
    color: '#555555',
    fontFamily: 'montserratregular',
    '&:focus': {
      border: 'none',
    },
  },
  religionSize: {
    fontSize: '30px'
  },
  circularLoader: {
    color: '#E18F68',
  },
  circularLoaderCont: {
    height: '95vh'
  }
});

const today = new Date();

class EditUserProfile extends Component {

  // State of the class
  state = {
    value: 0,
    password: '',
    showPassword: false,
    updateUser: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      user_name: '',
      user_email: '',
      user_phone_no: '',
      user_gender: '',
      user_dob: '',
      user_profession: '',
      user_location: '',
      user_constituency: '',
      user_region: '',
      user_religion: '',
      user_annual_income: '',
      user_password: '',
      user_profile: ''
    },
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
    viewDistrictList: {
      votingElection_code: constants.votingElectionCode,
      state_id: ''
    },
    constiSelect: "",
    userImage: null,
    vertical: 'top',
    horizontal: 'center',
    hello: "Invalid email",
    parameterEmpty: false,
    returnDefaultValue: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: ''
    },
    isLoading: true,
    updateSucess: false,
    successMsg: 'Profile updated successfully',
    changePassword: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      user_id: '',
      user_old_password: '',
      user_new_password: '',
    },
    passwordNotMatch: false,
    passwordMsg: 'Old password is incorrect',
    passwordProtec: false,
    socialMediaHide: null,
    dobEmpty: false,
    dobCheck: false,
    dobMsg: 'Date of birth cannot be empty',
    stateOpen: false,
    stateCheck: false,
    stateMsg: 'State cannot be empty',
    emailEmpty: false,
    emailEmptyMsg: 'Please enter email',
    emailEmptyCheck: false,
    duplicateEmail: false,
    duplicateEmailMsg: 'Email already exists',
    religions: constants.religions,
    professions: constants.professions,
    annualIncome: ['Less than 1 Lac', '1 Lac - 5 Lacs', '5 Lacs - 10 Lacs', '10 Lacs to 20 Lacs', '20 Lacs - 50 Lacs', 'More than 50 Lacs'],
    fileUploadValue: '',
    districtDis: false,
    constiDis: false,
  };

  // To get the list of state
  stateListAPI() {
    items('POST', this.state.viewAllState, constants.viewAllState)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data.length === 0 || response.data === null)) {
            this.setState({ stateoptionArray: response.data })
          }
        }
        else if (response.status === 'Failure') {
        }
        else {
        }
      });
  }

  // component did mount function to initiate the function when class initaites
  componentDidMount() {
    this.stateListAPI();
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId')
    this.setState({ changePassword: { ...this.state.changePassword, token_id: accessToken, user_id: userId } })
    this.setState({ updateUser: { ...this.state.updateUser, token_id: accessToken, user_id: userId } })
    this.setState({ returnDefaultValue: { ...this.state.returnDefaultValue, token_id: accessToken, user_id: userId } }, function () {
      items('POST', this.state.returnDefaultValue, constants.userReturnProfile)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ socialMediaHide: response.data[0].social_id })
            this.setState({
              updateUser: {
                ...this.state.updateUser,
                user_name: response.data[0].user_name,
                user_email: response.data[0].user_email,
                user_phone_no: response.data[0].user_phone_number,
                user_religion: response.data[0].user_religion === null ? '' : response.data[0].user_religion,
                user_dob: response.data[0].user_dob,
                user_gender: response.data[0].user_gender,
                user_annual_income: response.data[0].user_income_range === null ? '' : response.data[0].user_income_range,
                user_profession: response.data[0].user_profession === null ? '' : response.data[0].user_profession,
                user_location: response.data[0].location_id === null ? '' : response.data[0].location_id,
                user_region: response.data[0].region_id === null ? "" : response.data[0].region_id,
                user_constituency: response.data[0].vs_constituency_id === null ? '' : response.data[0].vs_constituency_id,
                user_profile: response.data[0].user_img_url
              }
            }, function () {
              if (this.state.updateUser.user_location !== '') {
                this.setState({ viewAllDistrictList: { ...this.state.viewDistrictList, state_id: this.state.updateUser.user_location } }, function () {
                  items('POST', this.state.viewAllDistrictList, constants.viewDistrictList)
                    .then(response => {
                      if (response.status === "Success" && response.data !== null) {
                        this.setState({ optionDistrictArray: response.data })
                      }
                    })
                })
              }
              if (this.state.updateUser.user_region !== '') {
                this.setState({ viewAllConstiList: { ...this.state.viewAllConstiList, district_id: this.state.updateUser.user_region } }, function () {
                  items('POST', this.state.viewAllConstiList, constants.viewAllConsti)
                    .then(response => {
                      if (response.status === "Success" && response.data !== null) {
                        this.setState({ constiListArray: response.data })
                      }
                    })
                })
              }
              if (this.state.updateUser.user_region !== '') {
                this.handleViewAllDistrict();
              }
              if (this.state.updateUser.user_constituency !== '') {
                this.handleViewContiList();
              }
            })
            this.setState({ isLoading: false })
          }
        });
    })
  }

  // To search a value from array using key
  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  // Funtion to view all district
  handleViewAllDistrict = () => {
    this.setState({ viewAllDistrict: { ...this.state.viewAllDistrict, state_id: this.state.updateUser.user_location } }, function () {
      this.setState({ districtDis: true })
      items('POST', this.state.viewAllDistrict, constants.viewAllDistrictList)
        .then(response => {
          if (response.status === 'Success') {
            if (!(response.data === null || response.data.length === 0)) {
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
          }
          else if (response.status === 'Failure') {
          }
          else {
          }
        })
    })
  }

  // To view the list of constituency
  handleViewContiList = () => {
    this.setState({ viewAllConstiList: { ...this.state.viewAllConstiList, district_id: this.state.updateUser.user_region } }, function () {
      this.setState({ constiDis: true })
      items('POST', this.state.viewAllConstiList, constants.viewAllConsti)
        .then(response => {
          if (response.status === 'Success') {
            if (!(response.data === null || response.data.length === 0)) {
              this.setState({ constiDis: false })
              this.setState({ constiListArray: response.data })
            }
            else {
              this.setState({ constiDis: false })
              this.setState({ constiListArray: [] })
            }
          }
          else if (response.status === 'Failure') {
          }
          else {
          }
        })
    })
  }

  // To show and hide the pasword in password field
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  // To handle the profile pic
  fileChangedHandler = (event) => {
    var reader = new FileReader();
    reader.onload = this.profilePic.bind(this);
    reader.readAsBinaryString(event.target.files[0]);
    this.setState({ fileUploadValue: event.target.files[0] }, () => {
    }
    );
  }

  // To convert a profile pic in base 64
  profilePic(readerEvt) {
    var binaryString = readerEvt.target.result;
    let filestring = btoa(binaryString);  // Converting binary string data.
    this.setState({ userImage: 'data:image/jpeg;base64,' + filestring });
    this.setState({ updateUser: { ...this.state.updateUser, user_profile: 'data:image/jpeg;base64,' + filestring } });
  }

  // On click the icon of edit profile pic should edit
  onChange = () => {
    document.getElementById('updateCandidateImage').click();
  }

  // Handle name of a user
  handleFullName = (e) => {
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
    }
    this.setState({ updateUser: { ...this.state.updateUser, user_name: e.target.value } })
  }

  // To handle a email of user
  handleEmailAddress = (e) => {
    if (e.target.value !== null) {
      this.setState({ emailEmptyCheck: false })
    }
    this.setState({ updateUser: { ...this.state.updateUser, user_email: e.target.value } }, function () {
    })
  }

  // To handle a phone no of user
  handlePhoneNumber = (e) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_phone_no: e.target.value } })
  }

  // To handle a passwprd of user
  handlePassword = (e) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_password: e.target.value } })
  }

  // To handle a reigion of user
  handleReligion = (e) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_religion: e.target.value } })
  }

  // To handle a gender of user
  handleGenderChange = (e) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_gender: e.target.value } })
  }

  // To handle a Date of birth of user
  handleDateOfBirth = (e) => {
    if (e.target.value !== null || '') {
      this.setState({ dobCheck: false })
    }
    this.setState({ updateUser: { ...this.state.updateUser, user_dob: e.target.value } })
  }

  // To handle a profession of user
  handleProfession = (e) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_profession: e.target.value } })
  }

  // To handle a state of user
  handleUserStateName = (e) => {
    if (e.target.value !== '' || null) {
      this.setState({ stateCheck: false })
    }
    this.setState({ updateUser: { ...this.state.updateUser, user_location: e.target.value } }, function () {
      this.handleViewAllDistrict()
    })
  }

  // To handle a District of user
  handleUserDistrictName = (e) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_region: e.target.value } }, function () {
      this.handleViewContiList()
    })
  }

  // To handle a constituency of user
  handleUserContituency = (e) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_constituency: e.target.value } })
  }

  // To handle a income of user
  handleIncomeChange = (event) => {
    this.setState({ updateUser: { ...this.state.updateUser, user_annual_income: event.target.value } }, function () {
    })
  };

  // API calling to submit the user profile
  handleUpdateUserProfile = () => {
    if (this.state.updateUser.user_email === '') {
      this.setState({ emailEmpty: true })
      this.setState({ emailEmptyCheck: true })
      setTimeout(() => {
        this.setState({ emailEmpty: false })
      }, 2500)
    }
    if (this.state.updateUser.user_location === '') {
      this.setState({ stateOpen: true })
      this.setState({ stateCheck: true })
      setTimeout(() => {
        this.setState({ stateOpen: false })
      }, 2500)
    }
    if (!(this.state.changePassword.user_new_password === "" && this.state.changePassword.user_old_password === "")) {
      items('POST', this.state.changePassword, constants.changeUserPassword)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ passwordProtec: false }, function () {
              if (this.state.passwordProtec === false) {
                items('POST', this.state.updateUser, constants.userUpdateProfile)
                  .then(response => {
                    if (response.status === "Success") {
                      this.setState({ updateSucess: true })
                      userImageUpload(constants.votingElectionCode,
                        localStorage.getItem('accessToken'), localStorage.getItem('userId'), this.state.fileUploadValue, constants.imageUpload)
                        .then(response => {
                          items('POST', this.state.returnDefaultValue, constants.userReturnProfile).then(response => {
                            localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
                          })
                        })
                      setTimeout(() => {
                        this.setState({ updateSucess: false })
                        this.props.history.push('/UserProfile')
                      }, 2500)
                      items('POST', this.state.returnDefaultValue, constants.userReturnProfile)
                        .then(response => {
                          localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
                        })
                    }
                  })
              }
            })
          }
          if (response.status === "Failure" && response.msg === "Password not match.") {
            this.setState({ passwordNotMatch: true })
            this.setState({ passwordProtec: true })
            setTimeout(() => {
              this.setState({ passwordNotMatch: false })
            }, 3000)
          }
        })
    }
    setTimeout(() => {
      if (this.state.emailEmptyCheck === false && this.state.dobCheck === false && this.state.stateCheck === false) {
        items('POST', this.state.updateUser, constants.userUpdateProfile)
          .then(response => {
            userImageUpload(constants.votingElectionCode,
              localStorage.getItem('accessToken'), localStorage.getItem('userId'), this.state.fileUploadValue, constants.imageUpload)
              .then(response => {
                items('POST', this.state.returnDefaultValue, constants.userReturnProfile).then(response => {
                  localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
                })
              })
            if (response.status === "Success") {
              this.setState({ updateSucess: true })
              setTimeout(() => {
                this.setState({ updateSucess: false })
                this.props.history.push('/UserProfile')
              }, 2500)
              items('POST', this.state.returnDefaultValue, constants.userReturnProfile)
                .then(response => {
                  localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
                })
            }
            else if (response.status === 'Failure' && response.msg === 'Email already present.') {
              this.setState({ duplicateEmail: true })
              setTimeout(() => {
                this.setState({ duplicateEmail: false })
              }, 2500)
            }
          })
      }
    }, 10)
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (!(this.state.updateUser.user_email === '' || this.state.updateUser.user_email === null)) {
      if (reg.test(this.state.updateUser.user_email) === false) {
        this.setState({ parameterEmpty: true })
        setTimeout(() => {
          this.setState({ parameterEmpty: false })
        }, 3000)
      }
    }
    setTimeout(() => {
      if (this.state.emailEmptyCheck === false && this.state.passwordProtec === false && this.state.stateCheck === false) {
        items('POST', this.state.updateUser, constants.userUpdateProfile)
          .then(response => {
            if (response.status === "Success") {
              this.setState({ updateSucess: true })
              items('POST', this.state.returnDefaultValue, constants.userReturnProfile).then(response => {
                localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
                userImageUpload(constants.votingElectionCode,
                  localStorage.getItem('accessToken'), localStorage.getItem('userId'), this.state.fileUploadValue, constants.imageUpload)
                  .then(response => {
                    items('POST', this.state.returnDefaultValue, constants.userReturnProfile).then(response => {
                      localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
                    })
                  })
              })
              setTimeout(() => {
                this.setState({ updateSucess: false })
              }, 2500)
            }
            else if (response.status === 'Failure' && response.msg === 'Email already present.') {
              this.setState({ duplicateEmail: true })
              setTimeout(() => {
                this.setState({ duplicateEmail: false })
              }, 2500)
            }
          })
      }
    }, 10)
  }

  // To handle a old password of user
  handleOldPassword = (e) => {
    if (e.target.value !== null) {
      this.setState({ passwordNotMatch: false })
    }
    this.setState({ changePassword: { ...this.state.changePassword, user_old_password: e.target.value } })
  }

  // To handle a new password of user
  handleNewPassword = (e) => {
    if (e.target.value !== null) {
      this.setState({ passwordNotMatch: false })
    }
    this.setState({ changePassword: { ...this.state.changePassword, user_new_password: e.target.value } })
  }

  // To handle a broken image and replace it by default image
  handleCandidateImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }

  // To render a html of class
  render() {
    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="AppUserLogin">
        <UserSearchAppBar />
        {this.state.isLoading ? <div className={classes.circularLoaderCont}> <CircularProgress className={classes.circularLoader} /> </div> :
          <div>
            <container fluid={true}>
              <ErrorSnackBar open={this.state.parameterEmpty}
                onClose={this.handleClose}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.hello}
              />
              <ErrorSnackBar open={this.state.dobEmpty}
                onClose={this.handleClose}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.dobMsg}
              />
              <ErrorSnackBar open={this.state.emailEmpty}
                onClose={this.handleClose}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.emailEmptyMsg}
              />
              <ErrorSnackBar open={this.state.stateOpen}
                onClose={this.handleClose}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.stateMsg}
              />
              <ErrorSnackBar open={this.state.duplicateEmail}
                onClose={this.handleClose}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.duplicateEmailMsg}
              />
              <ErrorSnackBar2 open={this.state.passwordNotMatch}

                anchorOrigin={{ vertical, horizontal }}
                message={this.state.passwordMsg}
              />
              <Snackbar1 open={this.state.updateSucess}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.successMsg}
              />

              <Row className="formContainereditUserProfile">
                <Col xs="12" sm="12" md="6" lg="6" xl="4" className="formBoxeditUserProfile lightBackgroundColor ml-auto mr-auto">
                  <div className="formInnerbox  marginTop60">
                    <div className="editUserProfileTextBox mt-3 mb-3">
                      <div className="circleImageCandidateProfile">
                        <div className="imageUpload d-flex justify-content-center align-items-stretch userProfileCircle">
                          <Image
                            className="circlePoliticalAdmin imageCandidatePartyProfile"
                            src={this.state.updateUser.user_profile === null || this.state.updateUser.user_profile === '' ?
                              (
                                [
                                  (this.state.updateUser.user_gender === null || this.state.updateUser.user_gender === '' || this.state.updateUser.user_gender === 'Male' || this.state.updateUser.user_gender === undefined
                                    ? UserProfilePic
                                    : UserProfilePic),
                                ]
                              ) : this.state.updateUser.user_profile}

                            responsive
                            onError={this.handleCandidateImgError}
                          >
                          </Image>
                        </div>
                        <div className="badgeIconCandidateProfile cursorPointer bg-white">
                          <Create className={classes.iconSize} onClick={this.onChange} />
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="" className="imgUploadFunc"
                      id="updateCandidateImage"
                      accept=".jpg, .jpeg, .png"
                      onChange={this.fileChangedHandler} ref="input" />
                    <div className="">
                      <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                        <div>
                          <MuiThemeProvider theme={theme}>
                            <InputAdornment position="start">
                              <img src={User} className={classes.iconMargin}
                                width="30"
                              />
                            </InputAdornment>
                          </MuiThemeProvider>
                        </div>
                        <TextField
                          className={classes.marginEmail}
                          onChange={this.handleFullName}
                          defaultValue={this.state.updateUser.user_name}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                              outlined: classes.resize,

                            },
                          }}
                          InputProps={{
                            maxLength: 40,
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                              outlined: classes.resize,
                              input: classes.resize
                            },
                          }}
                          label="Full Name"
                          variant="outlined"
                          id="custom-css-outlined-input"
                        />
                      </div>
                      <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                        <div>
                          <MuiThemeProvider theme={theme}>
                            <InputAdornment position="start">
                              <img src={Mail} className={classes.iconMargin}
                                width="30"
                              />                  
                            </InputAdornment>
                          </MuiThemeProvider>
                        </div>
                        <TextField
                          className={classes.marginEmail}
                          onChange={this.handleEmailAddress}
                          defaultValue={this.state.updateUser.user_email}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                              outlined: classes.resize,

                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                              outlined: classes.resize,
                              input: classes.resize
                            },
                          }}
                          label="Email Address"
                          variant="outlined"
                          id="custom-css-outlined-input"
                        />
                      </div>
                      <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                        <div>
                          <MuiThemeProvider theme={theme}>
                            <InputAdornment position="start">
                              <img src={Phone} className={classes.iconMargin}
                                width="30"
                              />                  
                            </InputAdornment>
                          </MuiThemeProvider>
                        </div>
                        <TextField
                          className={classes.marginEmail}
                          onChange={this.handlePhoneNumber}
                          defaultValue={this.state.updateUser.user_phone_no}
                          type="text"
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                              outlined: classes.resize,
                            },
                          }}
                          InputProps={{
                            maxLength: 13,
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                              outlined: classes.resize,
                              input: classes.resize
                            },
                          }}
                          label="Mobile Number"
                          variant="outlined"
                          id="custom-css-outlined-input"
                        />
                      </div>
                      <div>
                        {this.state.socialMediaHide === 'true' ? null :
                          <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">

                            <div>
                              <MuiThemeProvider theme={theme}>
                                <InputAdornment position="start">
                                  <img src={Password} className={classes.iconMargin}
                                    width="30"
                                  />                      
                                </InputAdornment>
                              </MuiThemeProvider>
                            </div>
                            <TextField
                              className={classes.marginEmail}
                              type={this.state.showPassword ? 'text' : 'password'}
                              onChange={this.handleOldPassword}
                              InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                  outlined: classes.resize,
                                },
                              }}
                              InputProps={{
                                classes: {
                                  root: classes.cssOutlinedInput,
                                  focused: classes.cssFocused,
                                  notchedOutline: classes.notchedOutline,
                                  outlined: classes.resize,
                                  input: classes.resize
                                },
                              }}
                              label="Old Password"
                              variant="outlined"
                              id="custom-css-outlined-input"
                            />
                          </div>
                        }
                      </div>
                      <div>
                        {this.state.socialMediaHide === 'true' ? null :
                          <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                            <div>
                              <MuiThemeProvider theme={theme}>
                                <InputAdornment position="start">
                                  <img src={Password} className={classes.iconMargin}
                                    width="30"
                                  />                      
                                </InputAdornment>
                              </MuiThemeProvider>
                            </div>
                            <TextField
                              className={classes.marginEmail}
                              type={this.state.showPassword ? 'text' : 'password'}
                              onChange={this.handleNewPassword}
                              InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                  outlined: classes.resize,
                                },
                              }}
                              InputProps={{
                                classes: {
                                  root: classes.cssOutlinedInput,
                                  focused: classes.cssFocused,
                                  notchedOutline: classes.notchedOutline,
                                  outlined: classes.resize,
                                  input: classes.resize
                                },
                              }}
                              label="New Password"
                              variant="outlined"
                              id="custom-css-outlined-input"
                            />
                          </div>
                        }
                      </div>
                      <div className="bg-white selectEdit ml-auto mr-auto d-flex pl-2 align-items-center">
                        <div>
                          <MuiThemeProvider theme={theme}>
                            <InputAdornment position="start">
                              <Religion color='primary' className={classes.religionSize} />
                            </InputAdornment>
                          </MuiThemeProvider>
                        </div>
                        <select type="text"
                          value={this.state.updateUser.user_religion}
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
                      <div className="mt-3 mb-3 userInfoGenderEdit  ml-auto mr-auto">
                        <Row className="w-100">
                          <Col sm={12} xs={12} lg={12} md={12} xl={12} className="ml-auto mr-auto">
                            <div className="form-inline ml-auto mr-auto w-75">
                              <div className="mr-3 fontSemiBold14 greyFontColor ml-2 mr-2">
                                Gender :
                              </div>
                              <div className="fontSemiBold14 mr-auto pl-3">
                                <FormGroup className={classes.fontLabel} row>
                                  <FormControlLabel classes={{
                                    label: classes.label
                                  }}
                                    control={
                                      <Radio
                                        checked={this.state.updateUser.user_gender === "Female"}
                                        onChange={this.handleGenderChange}
                                        value="Female"

                                        classes={{
                                          root: classes.root,
                                          checked: classes.checked,
                                        }}
                                        icon={<img src={Female} alt="Female" width="40" />}
                                        checkedIcon={<img src={ColoredFemale} alt="Female" width="40" />}
                                      />
                                    }
                                    label="Female"
                                  />
                                  <FormControlLabel classes={{
                                    label: classes.label
                                  }}
                                    control={
                                      <Radio
                                        checked={this.state.updateUser.user_gender === "Male"}
                                        onChange={this.handleGenderChange}
                                        value="Male"
                                        classes={{
                                          root: classes.root,
                                          checked: classes.checked,
                                        }}
                                        icon={<img src={Male} alt="male" width="40" />}
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
                                        checked={this.state.updateUser.user_gender === "Other"}
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
                      </div>

                      <div className="bg-white inputWidth1 fontRegular12 ml-auto mr-auto d-flex pl-2 align-items-center">
                        <div>
                          <MuiThemeProvider theme={theme}>
                            <InputAdornment position="start">
                              <Cake color='primary' className={classes.religionSize} />
                            </InputAdornment>
                          </MuiThemeProvider>
                        </div>
                        <input
                          value={this.state.updateUser.user_dob === '0000-00-00' ? null : this.state.updateUser.user_dob}
                          format='YYYY-MM-DD'
                          max={"2010-12-31"}
                          ref="dateField" type="date" className="pb-2 pl-3 h-100 mb-1 fontRegular14 dateInput border-0"
                          placeholder="DATE OF BIRTH" min={"1947-12-31"} onChange={this.handleDateOfBirth} />
                      </div>
                      <div className="bg-white selectEdit   ml-auto mr-auto d-flex pl-2 align-items-center">
                        <div>
                          <MuiThemeProvider theme={theme}>
                            <InputAdornment position="start">
                              <LocalMall color='primary' className={classes.religionSize} />
                            </InputAdornment>
                          </MuiThemeProvider>
                        </div>
                        <select type="text"
                          value={this.state.updateUser.user_profession}
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
                      <div className="bg-white selectEdit ml-auto mr-auto d-flex pl-2 align-items-center">
                        <MuiThemeProvider theme={theme}>
                          <InputAdornment position="start">
                            <Place color='primary' className={classes.religionSize} />
                          </InputAdornment>
                        </MuiThemeProvider>
                        <select type="text"
                          value={this.state.updateUser.user_location}
                          onChange={this.handleUserStateName}
                          className={classes.selectField}
                        >
                          <option value="" disabled className="fontRegular12">State*</option>
                          {this.state.stateoptionArray.map((item, index) => {
                            return (
                              <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                            );
                          }
                          )}
                        </select>
                      </div>
                      <div className="select bg-white ml-auto smallMargin selectEdit mr-auto d-flex pl-2 align-items-center">
                        <MuiThemeProvider theme={theme}>
                          <InputAdornment position="start">
                            <Place color='primary' className={classes.religionSize} />
                          </InputAdornment>
                        </MuiThemeProvider>
                        <select type="text"
                          value={this.state.updateUser.user_region}
                          onChange={this.handleUserDistrictName}
                          className={classes.selectField}
                          disabled={this.state.districtDis ? true : false}
                        >
                          <option value="" disabled className="fontRegular12">District</option>
                          {this.state.optionDistrictArray.map((item, index) => {
                            return (
                              <option key={item.district_name} value={item.district_id}>{item.district_name}</option>
                            );
                          }
                          )}
                        </select>
                      </div>
                      <div className="select bg-white selectEdit smallMargin ml-auto mr-auto d-flex pl-2 align-items-center">
                        <MuiThemeProvider theme={theme}>
                          <InputAdornment position="start">
                            <Place color='primary' className={classes.religionSize} />
                          </InputAdornment>
                        </MuiThemeProvider>
                        <select type="text"
                          value={this.state.updateUser.user_constituency}
                          onChange={this.handleUserContituency}
                          className={classes.selectField}
                          disabled={this.state.constiDis ? true : false}
                        >
                          <option value="" disabled className="fontRegular12">Constituency</option>
                          {this.state.constiListArray.map((item, index) => {
                            return (
                              <option key={item.vs_constituency_name} value={item.vs_constituency_id}>{item.vs_constituency_name}</option>
                            );
                          }
                          )}
                        </select>
                      </div>
                      <div className="select bg-white selectEdit smallMargin ml-auto mr-auto d-flex pl-2 align-items-center">
                        <MuiThemeProvider theme={theme}>
                          <InputAdornment position="start">
                            <Income color='primary' className={classes.religionSize} />
                          </InputAdornment>
                        </MuiThemeProvider>
                        <select type="text"
                          value={this.state.updateUser.user_annual_income}
                          onChange={this.handleIncomeChange}
                          className={classes.selectField}
                        >
                          <option value="" disabled className="fontRegular12">Select Annual Income</option>
                          {this.state.annualIncome.map((item, index) => {
                            return (
                              <option value={item}>{item}</option>
                            );
                          }
                          )}
                        </select>
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      color="grey"
                      className={classes.buttoneditUserProfile}
                      onClick={this.handleUpdateUserProfile}
                    >
                      Update
                  </Button>
                  </div>
                </Col>
              </Row>
            </container>
          </div>
        }
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
EditUserProfile = withRouter(EditUserProfile)
export default withStyles(styles)(EditUserProfile);