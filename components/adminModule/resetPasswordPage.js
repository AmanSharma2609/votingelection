/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin reset password page
Purpose   : admin can reset password after entering the correct otp
*/
import React, { Component } from 'react';
import { Image, FormControl } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Eye from '@material-ui/icons/Lock';
import Snackbar1 from '../../networkCall/snackBar.js'

import { constants } from '../../networkCall/constant';
import {items} from '../../networkCall/service.js';
import Logo from '../../images/web-logo.png';
import { NavLink } from 'react-router-dom';

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
    borderTopRightRadius: 5,
    marginBottom: 3
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
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class ResetPasswordPage extends Component {

  state = {
    passwordRe: {
      admin_id: '',
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      admin_password: '',
    },
    confirmPassword: '',
    parameterEmpty: false,
    passwordNotMatch: false,
    parameterMinLength: false,
    showButton: true,
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'Password reset Successful',
    updateButton : false,
    successReset: false,
    successMsg:'Password reset successfully'


  }

  handleAdminPassword = (e) => {
    this.setState({ passwordRe: { ...this.state.passwordRe, admin_password: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
    }
  }
  handleConfirm = (e) => {
    this.setState({ confirmPassword: e.target.value })
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
    }
  }

  componentDidMount = () => {
    const otp = localStorage.getItem('otpNewData')
    this.setState({ passwordRe: { ...this.state.passwordRe, admin_id: otp } }, function () {
    })
  }

  adminResetCall = () => {

    if (this.state.confirmPassword === '') {
      this.setState({ parameterEmpty: true })
      this.setState({ parameterMinLength: false })
      this.setState({ passwordNotMatch: false })
    }
    else if (this.state.passwordRe.admin_password === '') {
      this.setState({ parameterEmpty: true })
      this.setState({ parameterMinLength: false })
      this.setState({ passwordNotMatch: false })
    }
    else if (this.state.confirmPassword.length < 6 || this.state.passwordRe.admin_password.length < 6) {
      this.setState({ parameterMinLength: true })
      this.setState({ parameterEmpty: false })
      this.setState({ passwordNotMatch: false })
    }
    else if (this.state.confirmPassword !== this.state.passwordRe.admin_password) {
      this.setState({ parameterEmpty: false })
      this.setState({ passwordNotMatch: true })
      this.setState({ parameterMinLength: false })
    }
    else if (this.state.confirmPassword === this.state.passwordRe.admin_password) {
      this.setState({ updateButton: true })
      this.setState({ parameterEmpty: false })
      this.setState({ passwordNotMatch: false })
      this.setState({ parameterMinLength: false })
      items('POST', this.state.passwordRe, constants.resetPasswordAdmin)
        .then(response => {
          if(response.status==='Success')
          {
            this.setState({ updateButton: false });
            this.setState({ successReset: true })
            setTimeout(() => {
              this.setState({ successReset: false })
              this.props.history.push('/AdminLogin')
            },2000)
          }
          else if(response.status==='Failure')
          {
            this.setState({ updateButton: false });
          }
          else
          {
            this.setState({ updateButton: false });
          }
        })
    }
  }

  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.adminResetCall();
    }
  }

  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;

    return (
      <Container fluid={true} className="loginPage d-flex flex-column w-100 justify-content-center align-items-center lightBackgroundColor">
        {this.state.showButton ? null : <CircularProgress className={classes.circularLoader} />}
        <Row className="topContainerLogin d-flex mt-5 w-50 justify-content-center align-items-center">
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
          <Col xs="12" sm="12" md="8" lg="5" xl="4" className="formBoxLogin d-flex flex-column justify-content-start align-items-center">
            <div className="loginTextBox  d-flex   w-50 justify-content-center align-items-end">
              <p className=" fontBold fontLightColor">RESET PASSWORD</p>
            </div>
            <div className="validationContAdminLogin">
              {this.state.parameterEmpty === true ?

                <span className="fontRegular14 validationColor">{constants.msg.passwordEmpty}</span>

                : null}
              {this.state.parameterMinLength === true ?

                <span className="fontRegular14 validationColor">{constants.msg.passwordLength}</span>

                : null}
              {this.state.passwordNotMatch === true ?

                <span className="fontRegular14 validationColor">{constants.msg.samePasswordCheck}</span>

                : null}
            </div>

            <TextField
              placeholder="New Password"
              type={this.state.showPassword ? 'text' : 'password'}
              onChange={this.handleAdminPassword}
              onKeyPress={this.onEnter}
              margin="normal"
              inputProps={{
                maxLength: 20,
                minLength: 6
              }}
              InputLabelProps={{
                className: classes.textFieldFormLabel,
              }}
              className={classes.textFieldInput1}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.resize,
                  className: classes.input

                },
                startAdornment: (
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start">
                      <Eye color='primary' className={classes.iconMargin} />
                    </InputAdornment>
                  </MuiThemeProvider>
                ),

              }}
            />

            <TextField
              placeholder="Confirm Password"
              type={this.state.showConfirm ? 'text' : 'password'}
              onChange={this.handleConfirm}
              onKeyPress={this.onEnter}
              margin="normal"
              inputProps={{
                maxLength: 20,
                minLength: 6
              }}
              InputLabelProps={{
                className: classes.textFieldFormLabel,
              }}
              className={classes.textFieldInput1}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.resize,
                  className: classes.input
                },
                startAdornment: (
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start">
                      <Eye color='primary' className={classes.iconMargin} />
                    </InputAdornment>
                  </MuiThemeProvider>
                ),

              }}
            />

            <Button
              variant="contained"
              onClick={this.adminResetCall}
              className={classes.buttonLogin}
              disabled = {this.state.updateButton}
            >
              RESET PASSWORD
            </Button>

            <div className="forgotPasswordBoxLogin  d-flex flex-column justify-content-center align-items-center">
              <NavLink to='/AdminLogin'>
                <span className="fontRegular12 greyFontColor">Back To Login?</span>
              </NavLink>
            </div>
            <Snackbar1 open={this.state.successReset}
              onClose={this.handleClose}
              anchorOrigin={{ vertical, horizontal }}
              message={this.state.successMsg}
            />
          </Col>
        </Row>
      </Container>



    )
  }
}
export default withStyles(styles)(ResetPasswordPage);
