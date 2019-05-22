/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userForgotPasswordPage.js
Purpose   : Forgot password action page.
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Eye from '@material-ui/icons/Lock';
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';
import { constants } from '../../../networkCall/constant';
import { items } from '../../../networkCall/service.js';
import Snackbar1 from '../../../networkCall/snackBar.js';
import ErrorSnackBar from '../../../networkCall/errorSnackBar';

// Inline styling for React material components
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
    color: 'black',
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

// Theme of react material components
const theme = createMuiTheme({
  palette: {
    primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class UserForgotPage extends Component {

  // State of the class
  state = {
    password: '',
    showPassword: false,
    resendOpen: false,
    parameterEmpty: false,
    successMsgm: '',
    email: '',
    msg: '',
    open: '',
    vertical: 'top',
    horizontal: 'center',
    forgotPasswordButton: false,
    emailCheck: false
  };

  // To handle the OTP String
  handleOtp = (e) => {
    this.setState({ email: e.target.value })
  }

  // API for resend the OTP
  handleResendOtp = () => {
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.state.email);
    if (this.state.email === '') {
      this.setState({ parameterEmpty: true });
      this.setState({ emailCheck: false });
    }
    else if (reg.test(this.state.email) === false) {
      this.setState({ parameterEmpty: false });
      this.setState({ emailCheck: true });
    }
    else {
      this.setState({ parameterEmpty: false });
      this.setState({ emailCheck: false });
      let requestedData = {
        'votingElection_code': constants.votingElectionCode,
        'user_email': this.state.email
      }
      items('POST', requestedData, constants.userForgotPassword)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ openSuccess: true });
            this.setState({ successMsg: response.msg });
            setTimeout(() => {
              this.setState({ openSuccess: false });
            }, 2500)
          }
          else if (response.status === "Failure") {
            this.setState({ open: true });
            this.setState({ msg: response.msg });
            setTimeout(() => {
              this.setState({ open: false });
            }, 2500)
          }
          else {
            this.setState({ open: true });
            this.setState({ msg: response.msg });
            setTimeout(() => {
              this.setState({ open: false });
            }, 2500)
          }
        });
    }
  }

  // Submit OPT function
  handleSubmitOtp = () => {
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.state.email);
    if (this.state.email === '') {
      this.setState({ parameterEmpty: true });
      this.setState({ emailCheck: false });
    }
    else if (reg.test(this.state.email) === false) {
      this.setState({ parameterEmpty: false });
      this.setState({ emailCheck: true });
    }
    else {
      this.setState({ parameterEmpty: false });
      this.setState({ emailCheck: false });
      let requestedData = {
        'votingElection_code': constants.votingElectionCode,
        'user_email': this.state.email
      }
      items('POST', requestedData, constants.userForgotPassword)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ openSuccess: true });
            this.setState({ successMsg: constants.msg.otpVerifyMsg });
            setTimeout(() => {
              this.setState({ openSuccess: false });
              this.props.history.push('/UserOtp/' + response.data.split('|')[0] + '/' + response.data.split('|')[1] + '/' + 'forgot-password' + '/' + this.state.email);
            }, 2500)
          }
          else if (response.status === "Failure") {
            this.setState({ open: true });
            this.setState({ msg: response.msg });
            setTimeout(() => {
              this.setState({ open: false });
            }, 2500)
          }
          else {
            this.setState({ open: true });
            this.setState({ msg: response.msg });
            setTimeout(() => {
              this.setState({ open: false });
            }, 2500)
          }
        });
    }
  }

  // On enter Submit the OTP
  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmitOtp();
    }
  }

  // Render the HTML of a class
  render() {
    const { classes, } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="AppUserLogin">
        <UserSearchAppBar />
        <Container className="loginCont" >
          <Row className="formContainerLogin">
            <Col xs="12" sm="8" md="8" lg="6" xl="6" className="formBoxLoginLogin lightBackgroundColor d-flex align-items-center">
              <div className="h-80 w-100 ml-auto mr-auto">
                <div className="loginTextBox">
                  <p className="greyFontColor fontBold20">Forgot Password</p>
                </div>
                <div className="validationContAdminLogin">
                  {this.state.parameterEmpty === true ?
                    <span className="fontRegular14 validationColor">{constants.msg.emailEmpty}</span>
                    : null}
                  {this.state.emailCheck === true ?
                    <span className="fontRegular14 validationColor">{constants.msg.invalidEmail}</span>
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
                    onChange={this.handlePhoneNumber}
                    type="text"
                    onChange={this.handleOtp}
                    onKeyPress={this.onEnter}
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      maxLength: 13,
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    label="Email-Id"
                    variant="outlined"
                    id="custom-css-outlined-input"
                  />
                </div>
                <Button
                  variant="contained"
                  color="grey"
                  className={classes.buttonLogin}
                  onClick={this.handleSubmitOtp}
                >
                  Request OTP
              </Button>
                <div className="forgotPasswordBoxLogin cursorPointer">
                  <span onClick={this.handleResendOtp} className="ForgotTextStyleLogin cursorPointer fontRegular14 greyFontColor">Resend OTP</span>
                </div>
              </div>
            </Col>
            <ErrorSnackBar open={this.state.open}
              autoHideDuration={3000}
              onClose={this.handleClose}
              anchorOrigin={{ vertical, horizontal }}
              message={this.state.msg}
            />
            <Snackbar1 open={this.state.openSuccess}
              anchorOrigin={{ vertical, horizontal }}
              message={this.state.successMsg}
            />
          </Row>
        </Container>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
export default withStyles(styles)(UserForgotPage);
