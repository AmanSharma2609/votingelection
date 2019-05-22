/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userLogin.js
Purpose   : User Login
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
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import Mail from '../../../images/mail.png'
import Password from '../../../images/password.png'
import UserSearchAppBar from './userAppbar/userAppBar';
import { constants } from '../../../networkCall/constant'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import Footer from './userFooter/footer.js';
import { withRouter } from 'react-router-dom'
import { items } from '../../../networkCall/service.js';
import fb  from '../../../images/fb.png'
import google  from '../../../images/gplus.png'

// Inline Css for react material components
const styles = theme => ({
  textFieldInput1: {
    borderRadius: 0,
    backgroundColor: '#FBFBFB',
    height: '8%',
    paddingLeft: '13px',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'calc(80% - 24px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2',
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  resize: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#3C3C3C'
    }
  },
  textFieldFormLabel: {
    fontSize: 11,
    marginLeft: 37,
    marginTop: 5,
    fontFamily: 'montserratregular',
  },
  textFieldInput2: {
    height: '8%',
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingTop: 15,
    width: 'calc(80% - 24px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2',
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  buttonLogin: {
    width: 'calc(80% - 24px)',
    height: 50,
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: '#E18F68',
    color: 'white',
    fontSize: 12,
    fontFamily: 'montserratregular',
    marginBottom: '4%',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  extendedIcon: {
    marginRight: 8
  },
  buttonFacebook: {
    fontSize: 12,
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'montserratregular',
    width: '100%',
    whiteSpace: 'nowrap',
    color: 'white',
    height: 45,
    borderRadius: 0,
    border: 'none',
    backgroundColor: '#4267B2',
    '&:hover': {
      backgroundColor: '#4267B2'
    }
  },
  buttonGoogle: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'montserratregular',
    width: '100%',
    whiteSpace: 'nowrap',
    height: 45,
    borderRadius: 0,
    border: 'none',
    backgroundColor: '#FA564D',
    '&:hover': {
      backgroundColor: '#FA564D'
    }
  },
  iconMargin: {
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  margin: {
    margin: theme.spacing.unit,
    width: '100%',
     height: '55px',
    padding: '0px',
    fontFamily: 'montserratregular',
  },
  marginEmail:{
    margin: theme.spacing.unit,
    width: '100%',
     height: '55px',
    padding: '0px',
    fontFamily: 'montserratregular',
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
    border: '0px',
    paddingLeft:'14px',
    paddingTop:'14px'
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit,
    },
    width: '100%'
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '0px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: 0,
    height: '40px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'montserratregular',
    '&:focus': {
      borderColor: '#A5A5A5',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
    backgroundColor: '#fff',
    fontFamily: 'montserratregular'
  },
});
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
    primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class UserLoginPage extends Component {

  // State of the class
  state = {
    email: '',
    password: '',
    vertical: 'top',
    horizontal: 'center',
    showPassword: false,
    invalidEmail: false,
    invalidPass: false,
    emailEmpty: false,
    passEmpty: false,
    parameterEmpty: false,
    resendOpen: false,
    resendMsg: '',
    loadFacebook: false,
    loadGoogle : false,
    facebookLogin: {
      votingElection_code : constants.votingElectionCode,
      user_name :'',
      user_email :'',
      access_token :'',
      access_id : ''
    },
    loginButton : false,
    facebookLoginButton : false,
    googleLoginButton : true
  };

  // Component Dis mount function calls when component loads
  componentDidMount = () => {
    this.setState({email : ''});
    this.setState({password : ''});
    this.setState({ vertical: 'top' })
    this.setState({email: ''});
  }

  // To show the password of a input field
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  // User profile to fetch the data of user
  userProfile(){
    let requestedData = {
      votingElection_code : constants.votingElectionCode,
      token_id : localStorage.getItem('accessToken'),
      user_id : localStorage.getItem('userId')
    }
    items('POST', requestedData, constants.userProfileView)
        .then(response => {
          if (response.status === "Success") {
            if(response.data.length !== 0 || response.data !== null)
            {
             localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
            }
          }
          else if (response.status === "Failure") {
          }
          else {
          }
        });
  }

  // Handle email and password field
  handleLogin = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // To submit the login form
  submit = () => {
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.state.email)
    if (this.state.email.trim() == '') {
      this.setState({ parameterEmpty: true });
      this.setState({ emailEmpty: true });
      this.setState({ passEmpty: false });
      this.setState({ invalidEmail: false });
      this.setState({ invalidPass: false });
    }
    else if (this.state.password.trim() == '') {
      this.setState({ emailEmpty: false });
      this.setState({ passEmpty: true });
      this.setState({ parameterEmpty: false });
      this.setState({ invalidEmail: false });
      this.setState({ invalidPass: false });
    }
    else if (reg.test(this.state.email) === false) {
      this.setState({ emailEmpty: false });
      this.setState({ passEmpty: false });
      this.setState({ parameterEmpty: false });
      this.setState({ invalidEmail: true });
      this.setState({ invalidPass: false });
    }
    else if (this.state.password.length < 6) {
      this.setState({ emailEmpty: false });
      this.setState({ passEmpty: false });
      this.setState({ parameterEmpty: false });
      this.setState({ invalidEmail: false });
      this.setState({ invalidPass: true });
    }
    else {
      this.setState({loginButton : true});
      this.setState({ emailEmpty: false });
      this.setState({ passEmpty: false });
      this.setState({ parameterEmpty: false });
      this.setState({ invalidEmail: false });
      this.setState({ invalidPass: false });
      
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        email: this.state.email,
        password: this.state.password,
      }
      items('POST', requestedData, constants.adminLogin)
        .then(response => {
          if (response.status === "Success") {
            if (response.msg === 'please verify otp.' || response.data.split('|')[2] === '0') {
              let temp = response.data.split('|')[0];
              this.setState({ resendMsg: response.msg });
              this.setState({ resendOpen: true });
              setTimeout(() => {
                localStorage.setItem('userId', temp);
                this.setState({ resendOpen: false });
              }, 4000)
              localStorage.setItem('userType', response.data.split('|')[1]);
              localStorage.setItem('userId', response.data.split('|')[0]);
              this.props.history.push('/UserOtp/'+response.data.split('|')[0]+'/'+response.data.split('|')[2]+'/'+'login'+'/'+this.state.email);
            }
            else {
              if(response.data.split('|')[2] === 'admin')
              {
                this.setState({ resendMsg: 'Invalid email or password.' });
                this.setState({ resendOpen: true });
                setTimeout(() => {
                  this.setState({ resendOpen: false })
                }, 2500)
              }
              else
              {
                localStorage.setItem('accessToken', btoa(response.data.split('|')[0]));
                localStorage.setItem('userId', response.data.split('|')[1]);
                localStorage.setItem('userType', response.data.split('|')[2]);
                this.userProfile();
                setTimeout(() => {
                 this.props.history.push('/dashboard');
                }, 1000)
              }
            }
            this.setState({loginButton : false});
          }
          else if (response.status === "Failure") {
            this.setState({ resendMsg: response.msg });
            this.setState({ resendOpen: true });
            setTimeout(() => {
              this.setState({ resendOpen: false })
            }, 4000)
            this.setState({loginButton : false});
          }
          else {
            this.setState({ resendMsg: 'Something went wrong.' });
            this.setState({ resendOpen: true });
            setTimeout(() => {
              this.setState({ resendOpen: false })
            }, 4000)
            this.setState({loginButton : false});
          }
        });
    }
  }
  
  // Login with facebook functionlities
  responseFacebook = response => {
    if(response.name !== undefined)
    {
      this.setState({facebookLoginButton : true});
      this.setState({ facebookLogin:{...this.state.facebookLogin, user_name: response.name, access_token: response.accessToken, access_id : response.userID } }, function(){
        items("POST", this.state.facebookLogin, constants.userSocialLogin)
        .then(response => {
          if(response.status === "Success") {
            localStorage.setItem('accessToken', btoa(response.data.split('|')[0]))
            localStorage.setItem('userId', response.data.split('|')[1]);
            let temp = [{'user_name' : response.data.split('|')[response.data.split('|').length-1]}];
            localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(temp)));
            localStorage.setItem('userType', 'user')
            this.props.history.push('/dashboard');
            this.setState({facebookLoginButton : false})
          }
          else if(response.status === "Failure"){
            this.setState({ resendMsg: response.msg });
            this.setState({ resendOpen: true });
            setTimeout(() => {
              this.setState({ resendOpen: false })
            }, 4000);
            this.setState({facebookLoginButton : false})
          }
          else
          {
            this.setState({ resendMsg: response.msg });
            this.setState({ resendOpen: true });
            setTimeout(() => {
              this.setState({ resendOpen: false });
            }, 4000)
            this.setState({facebookLoginButton : false});
            this.setState({facebookLoginButton : false})
          }
        });
      });
    }
  }

  // login with google functionalities
  responseGoogle = response => {
    this.setState({ facebookLogin:{...this.state.facebookLogin, user_name: response.profileObj.name, access_token: response.accessToken, access_id : response.googleId, user_email : response.profileObj.email} }, function(){
      items("POST", this.state.facebookLogin, constants.userSocialLogin)
      .then(response => {
        if(response.status === "Success") {
          localStorage.setItem('accessToken', btoa(response.data.split('|')[0]))
          localStorage.setItem('userId', response.data.split('|')[1]);
          let temp = [{'user_name' : response.data.split('|')[response.data.split('|').length-1]}];
          localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(temp)));
          localStorage.setItem('userType', 'user')
          this.props.history.push('/dashboard');
          this.setState({googleLoginButton : false})
        }
        else if(response.status === "Failure"){
          this.setState({googleLoginButton : false});
          this.setState({ resendMsg: response.msg });
          this.setState({ resendOpen: true });
          setTimeout(() => {
            this.setState({ resendOpen: false })
          }, 4000)
          this.setState({googleLoginButton : true});
        }
        else
        {
          this.setState({googleLoginButton : false});
          this.setState({ resendMsg: response.msg });
          this.setState({ resendOpen: true });
          setTimeout(() => {
            this.setState({ resendOpen: false })
          }, 4000)
          this.setState({googleLoginButton : true});
        }
      });
    });
  }

  // Handle facebook load functionality
  handleFacebookLogin = () => {
    this.setState({ loadFacebook: true })
    setTimeout(() => {
      this.setState({ loadFacebook: false })
    }, 1000)
  }

  // handle google load functinlity
  handleGoogleLogin = () => {
    this.state.loadGoogle = true;
    this.setState({ loadGoogle: this.state.loadGoogle })
  }

  // On enter sumit the form
  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.submit();
    }
  }
  
  // Render HTML of class
  render() {
    const { vertical, horizontal } = this.state;
    const { classes, } = this.props;
    return (
      <div className="AppUserLogin">
        <UserSearchAppBar />
        <Container className="loginCont" >
          <Row className="formContainerLogin">
            <Col xs="12" sm="8" md="8" lg="5" xl="5" className="formBoxLoginLogin lightBackgroundColor pl-2 pr-2">              
              <div className="loginTextBox">
                <p className="greyFontColor fontBold18 mb-0 mt-4">LOGIN</p>
              </div>
              <div className="validationContAdminLogin">
                {this.state.invalidEmail === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.invalidEmail}</span>
                  : null}
                {this.state.invalidPass === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.passwordLength}</span>
                  : null}
                {this.state.emailEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.emailEmpty}</span>
                  : null}
                {this.state.passEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.passwordEmpty}</span>
                  : null}
              </div>
              <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                <div>
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start" className="mr-0">
                      <img src={Mail} alt={Mail} className="loginImages"/>
                    </InputAdornment>
                  </MuiThemeProvider>
                </div>
                <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.marginEmail}
                  onChange={this.handleLogin}
                  onKeyPress={this.onEnter}
                  name="email"
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      outlined: classes.resize,
                      input: classes.resize
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
                    <img src={Password} alt={Password} className="loginImages"/>
                    </InputAdornment>
                  </MuiThemeProvider>
                </div>
                <TextField
                  className={classes.margin}
                  onChange={this.handleLogin}
                  onKeyPress={this.onEnter}
                  type={this.state.showPassword ? 'text' : 'password'}
                  name="password"
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
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility color='primary' /> : <VisibilityOff color='primary' />}
                    </IconButton>
                  </InputAdornment>
                </MuiThemeProvider>
              </div>
              <Button
                variant="contained"
                className={classes.buttonLogin}
                onClick={this.submit}
                disabled = { this.state.loginButton ? true : null}
              >
                Login
              </Button>
              <div className="forgotPasswordBoxLogin mt-2">
                <Link to='/UserForgotPassword' className="ForgotTextStyleLogin fontRegular16 greyFontColor">Forgot Password?</Link>
                <Link to='/UserSignup' className="ForgotTextStyleLogin fontRegular16 greyFontColor">Don't have an account? <span className="darkTheme fontSemiBold16">Sign Up.</span></Link>
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
                       disabled = { this.state.facebookLoginButton ? true : null} >
                    <img src={fb} alt={fb} width="10" className={`${classes.extendedIcon} facebookIcon`} />
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
                    autoLoad={ false}
                    render={renderProps => (
                      <Button variant="outlined"
                      onClick={renderProps.onClick}
                      className={classes.buttonGoogle}
                      disabled = { this.state.googleLoginButton ? false : true }>
                      <img src={google} alt={google} className={`${classes.extendedIcon} googleIcon`} />
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
        </Container>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
        <ErrorSnackBar open={this.state.resendOpen}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.resendMsg}
        />
      </div>
    )
  }
}
UserLoginPage = withRouter(UserLoginPage)
export default withStyles(styles)(UserLoginPage);
