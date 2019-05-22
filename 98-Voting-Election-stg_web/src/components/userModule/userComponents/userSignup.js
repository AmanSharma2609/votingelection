/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userSignUp.js
Purpose   : SignUp page for user
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import User from '../../../images/user.png';
import Mail from '../../../images/mail.png';
import Password from '../../../images/password.png';
import Phone from '../../../images/phone.png';
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';
import { constants } from '../../../networkCall/constant';
import ErrorSnackBar from '../../../networkCall/errorSnackBar';
import { items } from '../../../networkCall/service.js';
import Snackbar1 from '../../../networkCall/snackBar.js';
import fb  from '../../../images/fb.png';
import google  from '../../../images/gplus.png';
import { NavLink } from 'react-router-dom'
import checkValidity from '../../../networkCall/emptyValueValidity'

// Theme for react material
const theme = createMuiTheme({
  overrides:{
    MuiOutlinedInput: {
      input: {
        padding:'0px',
        paddingTop:'17px',
        paddingLeft:'14px'
      }
    }
  },
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

// Inline Styling for react material
const styles = theme => ({
  textFieldInput1: {
    borderRadius: 0,
    backgroundColor: '#FBFBFB',
    paddingLeft: 5,
    width: 'calc(75% - 32px)',
    margin: 0,
    height: '50px',
    paddingTop: "12px",
    borderBottom: '0.5px solid  #f2f2f2'
  },
  btnColor: {
    backgroundColor: 'white',
    '&:after': {
      borderBottom: '2px solid white',
    },
  },
  extendedIcon: {
    marginRight: 8,
  },
  resize: {
    fontSize: 12,
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#3C3C3C',
      fontFamily: 'montserratregular',
    },
  },
  input: {
    color: 'white'
  },
  borderStyle: {
    borderBottomColor: "white"
  },
  textFieldInput2: {
    borderRadius: 0,
    paddingLeft: 5,
    backgroundColor: 'white',
    width: 'calc(75% - 32px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2'
  },
  textFieldFormLabel: {
    fontSize: 11,
    marginLeft: 38,
    marginTop: 5,
    fontFamily: 'montserratregular',
  },
  buttonSignup: {
    width: ' calc(80% - 24px)',
    height: 50,
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: '#E18F68',
    color: 'white',
    fontSize: 12,
    fontFamily: 'montserratregular',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  buttonFacebook: {
    fontSize: 12,
    fontFamily: 'montserratregular',
    width: "100%",
    whiteSpace: "nowrap",
    color: 'white',
    height: 45,
    border: 'none',
    borderRadius: 0,
    backgroundColor: '#4267B2',
    '&:hover': {
      backgroundColor: '#4267B2'
    }
  },
  buttonGoogle: {
    fontSize: 12,
    color: 'white',
    width: "100%",
    border: 'none',
    whiteSpace: "nowrap",
    fontFamily: 'montserratregular',
    height: 45,
    borderRadius: 0,
    backgroundColor: '#FA564D',
    '&:hover': {
      backgroundColor: '#FA564D'
    }
  },
  iconMargin: {
    marginBottom: 0,
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
  marginEmail:{
    margin: theme.spacing.unit,
    width: '100%',
     height: '55px',
    padding: '0px',
    fontFamily: 'montserratregular',
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

class UserSignupPage extends Component {
  // State of the class
  state = {
    openSuccess: false,
    openError: false,
    openDuplicateUser: false,
    parameterEmpty: false,
    invalidEmail: false,
    emailEmpty: false,
    usernameEmpty: false,
    mobileEmpty: false,
    passwordEmpty: false,
    minPassword: false,
    emptyFields: false,
    emptyMsg: 'The fields cannot be empty',
    vertical: 'top',
    horizontal: 'center',
    duplicateError: "Sorry, this user already exists",
    successMsg: "Verify the OTP sent to your Mail/Mobile",
    someThingWentWrong: "Something went wrong",
    userRegistration: {
      votingElection_code: constants.votingElectionCode,
      user_name: '',
      user_email: '',
      user_phone_no: '',
      user_password: ''
    },
    password: '',
    showPassword: false,
    loginButton : false,
    facebookLoginButton : false,
    googleLoginButton : false,
    facebookLogin: {
      votingElection_code : constants.votingElectionCode,
      user_name :'',
      user_email :'',
      access_token :'',
      access_id : ''
    },
  };

  // Handle Name of user
  handleName = (e) => {
    this.setState({ userRegistration: { ...this.state.userRegistration, user_name: e.target.value } }, function () {
    })
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
    }
  }

  // Handle Email of user
  handleEmail = (e) => {
    this.setState({ userRegistration: { ...this.state.userRegistration, user_email: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
      this.setState({ invalidEmail: false })

    }
  }

  // Handle phone number of user
  handlePhoneNumber = (e) => {
    this.setState({ userRegistration: { ...this.state.userRegistration, user_phone_no: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
    }
  }

  // Handle password of user
  handlePassword = (e) => {
    this.setState({ userRegistration: { ...this.state.userRegistration, user_password: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
      this.setState({ minPassword: false });
    }
  }

  // TO hide and unhide password
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  // Login with facebook functionality
  responseFacebook = response => {
    if(response.name !== undefined)
    {
      this.setState({facebookLoginButton : true})
      this.setState({ facebookLogin:{...this.state.facebookLogin,user_emai:'', user_name: response.name, access_token: response.accessToken, access_id : response.userID } }, function(){
        items("POST", this.state.facebookLogin, constants.userSocialLogin)
        .then(response => {
          if(response.status === "Success") {
            localStorage.setItem('accessToken', btoa(response.data.split('|')[0]))
            localStorage.setItem('userId', response.data.split('|')[1]);
            localStorage.setItem('userType', 'user')
            let temp = [{'user_name' : response.data.split('|')[response.data.split('|').length-1]}];
            localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(temp)));
            this.props.history.push('/dashboard');
            this.setState({facebookLoginButton : false});
          }
          else if(response.status === "Failure"){
            this.setState({facebookLoginButton : false});
            this.setState({ duplicateError: response.msg })
                this.setState({ openDuplicateUser: true })
                setTimeout(() => {
                  this.setState({ openDuplicateUser: false });
                }, 2500)
            this.setState({facebookLoginButton : false})
          }
          else
          {
            this.setState({facebookLoginButton : false});
            this.setState({ duplicateError: response.msg })
            this.setState({ openDuplicateUser: true })
            setTimeout(() => {
              this.setState({ openDuplicateUser: false });
            }, 2500);
            this.setState({facebookLoginButton : false})
          }
        });
      });
    }
  }

  // Login with google functionality
  responseGoogle = response => {
    this.setState({ facebookLogin:{...this.state.facebookLogin,user_email:response.profileObj.email, user_name: response.profileObj.name, access_token: response.accessToken, access_id : response.googleId } }, function(){
      items("POST", this.state.facebookLogin, constants.userSocialLogin)
      .then(response => {
        if(response.status === "Success") {
          localStorage.setItem('accessToken', btoa(response.data.split('|')[0]))
          localStorage.setItem('userId', response.data.split('|')[1]);
          localStorage.setItem('userType', 'user')
          let temp = [{'user_name' : response.data.split('|')[response.data.split('|').length-1]}];
          localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(temp)));
          this.props.history.push('/dashboard');
        }
        else if(response.status === "Failure"){
          this.setState({ duplicateError: response.msg })
              this.setState({ openDuplicateUser: true })
              setTimeout(() => {
                this.setState({ openDuplicateUser: false });
              }, 2500)
        }
        else
        {
          this.setState({ duplicateError: response.msg })
              this.setState({ openDuplicateUser: true })
              setTimeout(() => {
                this.setState({ openDuplicateUser: false });
              }, 2500)
        }
      });
    });
  }

  onPress = (event) => {
  }

  // Handle facebook login load
  handleFacebookLogin = () => {
    this.setState({ loadFacebook: true })
    setTimeout(() => {
      this.setState({ loadFacebook: false })
    }, 1000)
  }

  // Handle google login load
  handleGoogleLogin = () => {
    this.state.loadGoogle = true;
    this.setState({ loadGoogle: this.state.loadGoogle })
  }

  // Check the validity of a user name, email and password
  isValid = () => {
    let isError = false
    if(checkValidity(this.state.userRegistration.user_name)===false){
      isError = true;
    }
    if(checkValidity(this.state.userRegistration.user_password) === false) {
      isError = true;
    }
    if(checkValidity(this.state.userRegistration.user_email)===false){
      isError = true;
    }
    return isError;
  }

  // Speacial character check validity
  specialCheck = () => {
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let check = false
    if(this.state.userRegistration.user_password.trim() !==''){
      if(this.state.userRegistration.user_password.length < 6){
        check =true ;
        this.setState({ minPassword: true });
        this.setState({ invalidEmail: false });
      }
    }
    if(this.state.userRegistration.user_email.trim() !== ''){
      if (reg.test(this.state.userRegistration.user_email) === false) {
        check =true ;
        this.setState({ invalidEmail: true });
        this.setState({ minPassword: false });
      }
    }
    return check;
  }


  // Submit user registration form
  handleUserReg = () => {
    const err = this.isValid()
    const check = this.specialCheck()
    if(err === true){
      if(check === false){
        this.setState({ emptyFields: true })
        setTimeout(() => {
          this.setState({ emptyFields: false })
        },2500)
      }
    }
    else if(err === false && check === false){
      this.setState({loginButton : true});
        items('POST', this.state.userRegistration, constants.userRegistration)
          .then(response => {
            if (response.status === "Success") {
              localStorage.setItem('userId', response.data)
              localStorage.setItem('userEmail', this.state.userRegistration.user_email)
              this.setState({ openSuccess: true })
              setTimeout(() => {
                this.setState({ openSuccess: false })
                this.props.history.push('/UserOtp/'+response.data+'/'+' /'+'registration'+'/'+this.state.userRegistration.user_email);
              }, 2500)
            }
            else if (response.status === 'Failure') {
              if (  response.data.split('|')[1] === '0') {
                let temp = response.data.split('|')[0];
                this.setState({ duplicateError: "User already exist please verify OTP to continue." })
                this.setState({ openDuplicateUser: true })
                setTimeout(() => {
                  this.setState({ openDuplicateUser: false });
                }, 2500)
                localStorage.setItem('userId', temp);
                this.props.history.push('/UserOtp/'+response.data.split('|')[0]+'/'+response.data.split('|')[1]+'/'+'registration'+'/'+this.state.userRegistration.user_email);
                this.setState({loginButton : false});
              }
              else {
                this.setState({ duplicateError: response.msg })
                this.setState({ openDuplicateUser: true })
                setTimeout(() => {
                  this.setState({ openDuplicateUser: false });
                }, 2500)
                this.setState({loginButton : false});
              }
            }
            else {
              this.setState({ duplicateError: "Something went wrong" })
              this.setState({ openDuplicateUser: true });
              setTimeout(() => {
                this.setState({ openDuplicateUser: false });
              }, 2500)
              this.setState({loginButton : false});
            }
          })
      }
    } 

  // On enter submit user registration form
  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.handleUserReg();
    }
  }

  // Handle HTML of class
  render() {
    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="AppUserLogin">
        <UserSearchAppBar />
        <Container className="loginCont" >
          <Row className="formContainerLogin">
            <Col xs="12" sm="12" md="8" lg="5" xl="5" className="formBoxLoginLogin lightBackgroundColor pl-2 pr-2">
              <div className="loginTextBox">
                <p className="greyFontColor fontBold18 mb-0 mt-4">SIGN UP</p>
              </div>
              <div className="validationContAdminLogin h-10">
                {this.state.invalidEmail === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.invalidEmail}</span>
                  : null}
                {this.state.emailEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.emailEmpty}</span>
                  : null}
                {this.state.usernameEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.nameEmpty}</span>
                  : null}
                {this.state.passwordEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.passwordEmpty}</span>
                  : null}
                {this.state.minPassword === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.passwordLength}</span>
                  : null}
              </div>
              <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                <div>
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start" className="mr-0">
                      <img src={User} className={`{classes.iconMargin} loginImages`}/>
                    </InputAdornment>
                  </MuiThemeProvider>
                </div>
                <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.marginEmail}
                  onChange={this.handleName}
                  onKeyPress={this.onEnter}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      outlined: classes.resize,
                    },
                  }}
                  inputProps={{
                    maxLength: 25
                  }}
                  InputProps={{
                    maxLength: 25,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                      outlined: classes.resize,
                      input: classes.resize
                    },
                  }}
                  label="Full Name*"
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
                </MuiThemeProvider>
              </div>
              <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                <div>
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start" className="mr-0">
                      <img src={Mail} className={`${classes.iconMargin} loginImages`}
                            width="30"
                      />                  
                    </InputAdornment>
                  </MuiThemeProvider>
                </div>
                <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.marginEmail}
                  onChange={this.handleEmail}
                  onKeyPress={this.onEnter}
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
                  label="Email Address*"
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
                </MuiThemeProvider>
              </div>
              <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                <div>
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start" className="mr-0">
                      <img src={Phone} className={`${classes.iconMargin} loginImages`}
                           width="30"
                      />                  
                    </InputAdornment>
                  </MuiThemeProvider>
                </div>
                <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.marginEmail}
                  onChange={this.handlePhoneNumber}
                  onKeyPress={this.onEnter}
                  type="text"
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0,10) }}
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
                  label="Mobile Number"
                  variant="outlined"
                  id="custom-css-outlined-input"
                  onKeyPress={this.onPress}
                />
                </MuiThemeProvider>
              </div>

              <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                <div>
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start" className="mr-0">
                      <img src={Password} className={`${classes.iconMargin} loginImages`}
                            width="30"
                      />           
                    </InputAdornment>
                  </MuiThemeProvider>
                </div>
                <TextField
                  className={classes.marginEmail}
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={this.handlePassword}
                  onKeyPress={this.onEnter}
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
                  label="Password*"
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
                <MuiThemeProvider theme={theme}>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}>
                      {this.state.showPassword ? <Visibility color='primary' /> : <VisibilityOff color='primary' />}
                    </IconButton>
                  </InputAdornment>
                </MuiThemeProvider>
              </div>
              <Button
                variant="contained"
                color="grey"
                className={classes.buttonSignup}
                onClick={this.handleUserReg}
                disabled = { this.state.loginButton ? true : null}>
                SIGN UP
              </Button>
              <div className="forgotPasswordBoxLogin mt-2">
                <span className="ForgotTextStyleLogin fontRegular12 greyFontColor mt-2 mb-2">
                  By signing in you agree to our 
                  <NavLink to='/underConstruction' className="text-white">
                    <i className="darkTheme fontSemiBold12">Terms </i>
                    <span className="fontRegular10 greyFontColor">and</span>
                    <i className="darkTheme fontSemiBold12"> Conditions</i>
                  </NavLink>
                </span>
                <Link to='/UserLogin' className="ForgotTextStyleLogin fontRegular14 greyFontColor">Already have an account? <span className="darkTheme fontSemiBold14">Login.</span></Link>
              </div>
              <div className="">
                <div className="orLine"></div>
                  <div className="orArea">
                    <div className="fontMedium14 orColor">OR</div>
                  </div>
              </div>
              <div className="buttonsContainerLogin">
              <Row className="facebookAndGoogleContainerLogin">
                  <Col xs="12" sm="12" md="12" lg="12" xl="12" className="facebookColLogin">
                  <FacebookLogin
                    appId="303843757127561"
                    callback={this.responseFacebook}
                    fields="email,name,picture"
                    scope="public_profile, email"
                    returnScopes
                    render={renderProps => (
                      <Button variant="outlined"
                       onClick={renderProps.onClick}
                       className={classes.buttonFacebook} 
                       disabled = { this.state.facebookLoginButton ? true : null}>
                        <img src={fb} alt={fb} className={`${classes.extendedIcon} facebookIcon`} />
                        <span className="mt-1 text-white"> LogIn With Facebook</span>
                      </Button>
                    )}
                  />
                  </Col>
                </Row>
                <Row className="facebookAndGoogleContainerLogin">
                  <Col xs="12" sm="12" md="12" lg="12" xl="12" className="googleColLogin">
                      <GoogleLogin
                        clientId="119311387859-n2rso184jejlulvq94rq7ticc4f1tbq3.apps.googleusercontent.com"
                        callback={this.responseGoogle}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        render={renderProps => (
                        <Button variant="outlined"
                          onClick={renderProps.onClick}
                          className={classes.buttonGoogle}>
                          <img src={google} alt={google} className={`${classes.extendedIcon} googleIcon`}/>
                          <span className="mt-1 text-white"> LogIn With Google</span>
                        </Button>
                      )}
                    />
                  </Col>
                </Row>
              </div>
              <br />
              <Link to='/' className="ForgotTextStyleLogin fontRegular12 greyFontColor">
                <div className="mb-2">
                  <h4 className="fontRegular16  greyFontColor cursorPointer">Skip for now</h4>
                </div>
              </Link>
            </Col>
          </Row>
          <ErrorSnackBar open={this.state.openDuplicateUser}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.duplicateError}
          />
          <ErrorSnackBar open={this.state.openError}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.someThingWentWrong}
          />
          <ErrorSnackBar open={this.state.emptyFields}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.emptyMsg}
        />
          <Snackbar1 open={this.state.openSuccess}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.successMsg}
          />
        </Container>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
UserSignupPage = withRouter(UserSignupPage)
export default withStyles(styles)(UserSignupPage);
