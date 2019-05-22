/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin otp 
Purpose   : admin otp verification  
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Lock from '@material-ui/icons/Lock';
import Snackbar1 from '../../networkCall/snackBar.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';
import ErrorSnackBar from '../../networkCall/errorSnackBar'


import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import Logo from '../../images/web-logo.png';


const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  textFieldInput1: {
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: 20,
    display: 'flex',
    flexWrap: 'wrap',
    height: 55,
    width: 'calc(90% - 20px)',
    margin: 0.01,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5

  },
  textFieldInput2: {
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 16,
    width: 'calc(90% - 20px)',
    margin: 0.01,
  },

  resize: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#3C3C3C',
      fontWeight: 800
    }
  },
  buttonLogin: {
    width: 'calc(90% - 20px)',
    fontFamily: 'montserratregular',
    fontSize: 14,
    height: 55,
    marginTop: 0.1,
    borderRadius: 0,
    backgroundColor: '#E18F68',
    color: 'white',
    boxShadow: 'none',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    '&:hover': {
      backgroundColor: '#b75628'
    }

  },
  circularLoader: {
    color: '#E18F68',
    position: 'absolute',
    top: '30px'
  },

};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class AdminOtp extends Component {
  state = {
    otpParameter: {
      votingElection_code: constants.votingElectionCode,
      admin_id: '',
      admin_otp: ''
    },
    resendParameter: {
      votingElection_code: constants.votingElectionCode,
      admin_email: ''
    },
    open: false,
    openError: false,
    vertical: 'top',
    horizontal: 'center',
    showButton: true,
    otpData: null,
    openResend: false,
    otpNotMatch: false,
    otpEmpty: false,
    otpButton: false,
    successMatch: 'OTP match successfully',
    resendMsg: 'OTP resend successfully please check your mail'
  }

  otpMatch = () => {

    const otp = localStorage.getItem('otpData')
    this.setState({ otpParameter: { ...this.state.otpParameter, admin_id: otp } })
    if (this.state.otpParameter.admin_otp.trim() === '') {
      this.setState({ otpEmpty: true })
      this.setState({ otpButton: true });
    }
    else if (this.state.otpParameter.admin_otp.trim() !== '') {
      this.setState({ showButton: false })
      this.setState({ otpButton: true });
      items('POST', this.state.otpParameter, constants.adminOtp)
        .then(response => {
          if (response.status === "Success") {
            this.setState({ open: true });
            this.setState({ otpButton: false });
            this.setState({ showButton: true })
            setTimeout(() => {

              this.setState({ open: false })
              this.props.history.push({
                pathname: '/ResetPasswordAdmin',

              })
            }, 2000)
          }
          else {
            this.setState({ openError: true });
            this.setState({ otpButton: false });
            this.setState({ msg: response.msg })
            setTimeout(() => {
              this.setState({ openError: false })
            }, 2000)
            this.setState({ updateButton: false });
            this.setState({ showButton: true })
            this.setState({ otpNotMatch: true })
          }
          //   this.props.route.handleLiner()
        })
    }

  }

  requestOtp = () => {
    this.setState({ showButton: false })
    items('POST', this.state.resendParameter, constants.adminForgot)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ otpParameter: { ...this.state.otpParameter, admin_id: response.data } })
          localStorage.setItem('otpNewData', response.data)
          this.setState({ openResend: true })
          setTimeout(() => {
            this.setState({ openResend: false })
          }, 3000)
          this.setState({ showButton: true })
        }
        else {
          this.setState({ showButton: true })
          this.setState({ otpNotMatch: true })
        }

      })
  }

  componentDidMount() {
    const otp = localStorage.getItem('otpData')
    const adminEmail = localStorage.getItem('adminEmail')
    this.setState({ resendParameter: { ...this.state.resendParameter, admin_email: adminEmail } })
    this.setState({ otpParameter: { ...this.state.otpParameter, admin_id: otp } })

  }

  handleEmailAdmin = (e) => {
    this.setState({ otpButton: false });
    this.setState({ openResend: false })
    this.setState({ otpParameter: { ...this.state.otpParameter, admin_otp: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ otpEmpty: false })
    }
    if (e.target.value !== null) {
      this.setState({ otpNotMatch: false })
    }
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.otpMatch();
    }
  }

  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open, openResend } = this.state;
    return (
      <Container fluid={true} className="loginPage d-flex flex-column w-100 justify-content-center align-items-center lightBackgroundColor">
        <Row className="topContainerLogin d-flex mt-5 w-50 justify-content-center align-items-center">
          {this.state.showButton ? null : <CircularProgress className={classes.circularLoader} />}
          <Col xs="6" sm="4" md="5" lg="5" xl="4" className="d-flex  h-50 justify-content-center align-items-center">
            <NavLink to='/AdminLogin'>
              <Image
                src={Logo}
                rounded
                style={{ height: 70, width: 200 }}
              />
            </NavLink>
          </Col>

        </Row>
        <Row className="formContainerLogin d-flex  w-100 justify-content-center align-items-start">
          <Col xs="12" sm="12" md="8" lg="5" xl="4" className="formBoxLogin mt-5 d-flex flex-column justify-content-start align-items-center">
            <div className="loginTextBox text-nowrap d-flex w-50 justify-content-center align-items-end">
              <p className=" fontBold fontLightColor ">ENTER OTP </p>
            </div>
            <div className="validationContAdminLogin">
              {this.state.otpNotMatch === true ?

                <span className="fontRegular14 validationColor">{constants.msg.otpNotMatch}</span>

                : null}
              {this.state.otpEmpty === true ?

                <span className="fontRegular14 validationColor">{constants.msg.otpEmpty}</span>

                : null}
            </div>

            <TextField
              placeholder="_ _ _ _"
              onChange={this.handleEmailAdmin}
              onKeyPress={this.onEnter}
              type="text"
              maxLength="5"
              startAdornment={<InputAdornment position="start"> <Lock color='primary' className={classes.iconMargin} /></InputAdornment>}
              inputLabelProps={{
                className: classes.textFieldFormLabel,
              }}
              className={classes.textFieldInput1}
              inputProps={{
                maxLength: 4
              }}
              InputProps={{
                maxlength: 4,
                disableUnderline: true,
                classes: {
                  input: classes.resize,
                },

                startAdornment: (
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start">
                      <Lock color='primary' className={classes.iconMargin} />
                    </InputAdornment>
                  </MuiThemeProvider>
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={this.otpMatch}
              className={classes.buttonLogin}
              disabled={this.state.otpButton ? true : false}
            >
              SUBMIT OTP
            </Button>
            <div
              onClick={this.requestOtp}
              className="forgotPasswordBoxLogin cursorPointer  d-flex flex-column justify-content-center align-items-center">
              <span className="fontRegular12 greyFontColor">Resend OTP</span>
            </div>

            <div className="forgotPasswordBoxLogin  d-flex flex-column justify-content-center align-items-center">
              <NavLink to='/AdminLogin'>
                <span className="fontRegular12 greyFontColor">Back To Login?</span>
              </NavLink>
            </div>
            <Snackbar1
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={this.handleClose}
              message={this.state.successMatch}
            />
            <Snackbar1
              anchorOrigin={{ vertical, horizontal }}
              open={openResend}
              onClose={this.handleCloseResend}
              message={this.state.resendMsg}

            />
            <ErrorSnackBar open={this.state.openError}
              onClose={this.handleClose}
              anchorOrigin={{ vertical, horizontal }}
              message={this.state.msg}
            />

          </Col>

        </Row>
      </Container>


    )
  }
}
export default withStyles(styles)(AdminOtp);
