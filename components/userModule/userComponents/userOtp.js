
/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userOtp.js
Purpose   : Otp page
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Eye from '@material-ui/icons/Lock';
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js'
import { constants } from '../../../networkCall/constant'
import { items } from '../../../networkCall/service.js'
import Snackbar1 from '../../../networkCall/snackBar.js'

// Inline Styling for react material components
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
    fontSize: 14,
    color: '#555555',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#555555',
      fontFamily: 'montserratregular',
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

// Theme of react material
const theme = createMuiTheme({
  palette: {
    primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class UserOtpPage extends Component {
  // state of the class
  state = {
    password: '',
    openSuccess: false,
    showPassword: false,
    resendOpen: false,
    parameterEmpty: false,
    invalidOtp: false,
    successMsg:"OTP matched successfully.",
    resendMsg: "OTP resent successfully! Please enter OTP",
    vertical: 'top',
    horizontal: 'center',
    otpUser: '',
    resendOtp: {
      votingElection_code: constants.votingElectionCode,
      user_email: ''
    },
    otpButton: false,
    resendOtpLink: false
  };

  componentDidMount() {
    const userId = this.props.match.params.id
    const userEmail = localStorage.getItem('userEmail');
  }

  // Handle OTP input
  handleOtp = (e) => {
    this.setState({ otpUser: e.target.value });
    if (e.target.value !== null) {
      this.setState({ invalidOtp: false })
      this.setState({ parameterEmpty: false })
    }
  }

  // To verift weather a user is register or not
  verifYOtpLoginRegister()
  {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      user_id: this.props.match.params.id,
      user_otp: this.state.otpUser
    }
    if (this.state.otpUser.trim() === "") {
      this.setState({ parameterEmpty: true });
      this.setState({ otpButton: false });
    }
    else if (this.state.otpUser.trim() !== "") {
      this.setState({ otpButton: true });
      items('POST', requestedData, constants.userVerifyOtp)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ openSuccess: true })
            localStorage.setItem('accessToken', btoa(response.data.split("|")[0]));
            localStorage.setItem('userId', response.data.split("|")[1]);
            localStorage.setItem('userType', 'user')
            this.userProfile();
            setTimeout(() => {
              this.props.history.push('/AddInfo/'+response.data);
            }, 2000);
            this.setState({ otpButton: false });
          }
          else if (response.msg === "Otp is incorrect.") {
            this.setState({ invalidOtp: true });
            this.setState({ otpButton: false });
          }
          else {
            this.setState({ otpButton: false });
          }
        });
    }
  }

  // Verify submission for forgot password
  verifyOtpForgotPassword()
  {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      user_email: this.props.match.params.email,
      user_otp: this.state.otpUser
    }
    if (this.state.otpUser.trim() === "") {
      this.setState({ parameterEmpty: true });
      this.setState({ otpButton: false });
    }
    else if (this.state.otpUser.trim() !== "") {
      this.setState({ otpButton: true });
      items('POST', requestedData, constants.forgotPasswordOtpRead)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ openSuccess: true })
            setTimeout(() => {
              this.setState({ openSuccess: false })
            }, 3000);
            this.setState({ otpButton: false });
            this.props.history.push('/ResetPasswordPage/'+this.props.match.params.email);
          }
          else if (response.msg === "Otp is incorrect.") {
            this.setState({ invalidOtp: true });
            this.setState({ otpButton: false });
          }
          else {
            this.setState({ otpButton: false });
          }
        });
    }
  }

  // Handle Submit OTP of verify registrationa nd forgot password
  handleSubmitOtp = () => {
    if (this.props.match.params.page === 'forgot-password' && this.props.match.params.status === "1") {
      this.verifyOtpForgotPassword();
    }
    else if(this.props.match.params.page === 'forgot-password' && this.props.match.params.status === "0")
    {
      this.verifYOtpLoginRegister();
    }
    else {
      this.verifYOtpLoginRegister();
    }

  }

  // Resend OTP function
  handleResendOtp = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      user_email: this.props.match.params.email
    }
    items('POST', requestedData, constants.userResendOtp)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ resendOpen: true })
          setTimeout(() => {
            this.setState({ resendOpen: false })
          }, 4000)
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // API to fetch the data of user
  userProfile() {
    let requestedData = {
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      token_id: localStorage.getItem('accessToken'),
      user_id: localStorage.getItem('userId')
    }
    items('POST', requestedData, constants.userProfileView)
      .then(response => {
        if (response.status === "Success") {
          if (response.data.length !== 0 || response.data !== null) {
            localStorage.setItem(btoa('userdetail'), btoa(JSON.stringify(response.data)));
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // On enter submit the data of OTP form
  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.handleSubmitOtp();
    }
  }

  // Render HTML of class
  render() {
    const { classes, } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="AppUserLogin">
        <UserSearchAppBar />
        <Container className="loginCont otpContainer" >
          <Row className="formContainerLogin">
            <Col xs="12" sm="8" md="8" lg="6" xl="6" className="formBoxLoginLogin lightBackgroundColor">
              <div className="loginTextBox">
                <p className="greyFontColor fontBold22">ENTER OTP</p>
              </div>
              <div className="validationContAdminLogin">
                {this.state.invalidOtp === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.otpNotMatch}</span>
                  : null}
                {this.state.parameterEmpty === true ?
                  <span className="fontRegular14 validationColor">{constants.msg.otpEmpty}</span>
                  : null}
              </div>
              <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                <div>
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start">
                      <Eye color='primary' className={classes.iconMargin} />
                    </InputAdornment>
                  </MuiThemeProvider>
                </div>
                <TextField
                  className={classes.margin}
                  type="text"
                  onChange={this.handleOtp}
                  onKeyPress={this.onEnter}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      outlined: classes.resize
                    },
                  }}
                  inputProps={{
                    maxLength: 4
                  }}
                  InputProps={{
                    maxLength: 13,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                      input: classes.resize,
                      outlined: classes.resize
                    },
                  }}
                  label="Enter OTP*"
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
              </div>
              <Button
                variant="contained"
                color="grey"
                className={classes.buttonLogin}
                onClick={this.handleSubmitOtp}
                disabled={this.state.otpButton ? true : null}
              >
                SUBMIT OTP
              </Button>
              <div className="forgotPasswordBoxLogin">
                <span onClick={this.handleResendOtp} className="ForgotTextStyleLogin cursorPointer fontRegular16 greyFontColor">Resend OTP</span>
              </div>
            </Col>
          </Row>
        </Container>
        <Snackbar1 open={this.state.openSuccess}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.successMsg}
        />
        <Snackbar1 open={this.state.resendOpen}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.resendMsg}
        />
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
export default withStyles(styles)(UserOtpPage);
