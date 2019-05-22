/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin login page
Purpose   : admin can login and go to the home page or to forgot password page if that is the case
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import Eye from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { constants } from '../../networkCall/constant'
import ErrorSnackBar from '../../networkCall/errorSnackBar'
import {items} from '../../networkCall/service.js'
import Logo from '../../images/SVGs/Logo_Approved_02.svg';


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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
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

  }

};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class LoginPage extends Component {

  state = {
    parameter: {
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      email: '',
      password: '',
    },
    parameterEmpty: false,
    passwordEmpty: true,
    showPassword: false,
    invalidEmail: false,
    open: false,
    vertical: 'top',
    horizontal: 'center',
    hello: "Invalid Email or Password",
    updateButton : false,
    passwordCheck : false
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleAdminEmail = (e) => {
    this.setState({ parameter: { ...this.state.parameter, email: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ invalidEmail: false })
      this.setState({ open: false })

    }
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
    }
  }
  handleAdminPassword = (e) => {
    this.setState({ parameter: { ...this.state.parameter, password: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
      this.setState({ open: false })
    }
  }

  componentDidMount = () => {
  }

  adminLoginAuth = () => {

    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.state.parameter.email)
    if (reg.test(this.state.parameter.email) === false && this.state.parameter.email !==
      '' && this.state.parameter.password !== '') {
      this.setState({ invalidEmail: true });
      this.setState({ parameterEmpty: false });
      this.setState({ passwordCheck: false });
    }

    else if (this.state.parameter.email === '' ) {
      this.setState({ parameterEmpty: true });
      this.setState({ invalidEmail: false });
      this.setState({ passwordCheck: false });
    }

    else if (this.state.parameter.password === '') {
      this.setState({ parameterEmpty: false });
      this.setState({ invalidEmail: false });
      this.setState({ passwordCheck: true });
    }

    else if (this.state.parameter.email.trim() && this.state.parameter.password.trim() !== "" && reg.test(this.state.parameter.email) === true) {
      this.setState({ parameterEmpty: false });
      this.setState({updateButton : true});
      this.setState({ invalidEmail: false });
      this.setState({ passwordCheck: false });
      items('POST', this.state.parameter, constants.adminLogin)
        .then(response => {
          if (response.status === "Success") {
            if(response.data.split('|')[2] === 'user')
            {
              this.setState({ open: true })
              setTimeout(() => {
                this.setState({ open: false });
              }, 2500)
              this.setState({updateButton : false});
            }
            else
            {
              localStorage.removeItem(btoa('userdetail'));
              const splitAccess = response.data.split("|")
              const inputdatalogin = splitAccess[0]
              let encoded = btoa(inputdatalogin)
              localStorage.setItem('accessToken', encoded);
              localStorage.setItem('adminId', splitAccess[1]);
              localStorage.getItem('accessToken')
              localStorage.setItem('userType' , splitAccess[2])
              localStorage.setItem('adminUserName', splitAccess[3])
              this.setState({updateButton : false});
              this.props.history.push('/AdminHomePage')
            }
           
          }
          else if(response.status === "Failure") {
            this.setState({updateButton : false});
            this.setState({ open: true })
            setTimeout(() => {
              this.setState({ open: false });
            }, 2500)
          }
          else
          {
            this.setState({ open: true })
            setTimeout(() => {
              this.setState({ open: false });
            }, 2500)
            this.setState({updateButton : false});
          }
        })
    }

  }

  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.adminLoginAuth();
    }
  }

  render() {
    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <Container fluid={true} className="loginPage d-flex flex-column w-100 justify-content-center align-items-center lightBackgroundColor">
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
          <Col xs="12" sm="12" md="8" lg="5" xl="4" className="formBoxLogin d-flex flex-column justify-content-center align-items-center">
            <div className="loginTextBox mb-1  d-flex  w-50 justify-content-center align-items-">
              <span className=" fontBold fontLightColor">LOGIN</span>
            </div>
            <div className="validationContAdminLogin">
              {this.state.invalidEmail === true ?

                <span className="fontRegular14 validationColor">{constants.msg.invalidEmail}</span>

                : null}
              {this.state.parameterEmpty === true ?

                <span className="fontRegular14 validationColor">{constants.msg.emailEmpty}</span>

                : null}
                {this.state.passwordCheck === true ?

                <span className="fontRegular14 validationColor">{constants.msg.passwordEmpty}</span>

                : null}
            </div>

            <TextField
              placeholder="Email Address"
              autoComplete="email"
              name="email"
              type="email"
              onChange={this.handleAdminEmail}
              onKeyPress={this.onEnter}
              inputProps={{
                maxLength: 30
              }}
              InputLabelProps={{
                className: classes.textFieldFormLabel,
              }}
              className={classes.textFieldInput1}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.resize,
                },

                startAdornment: (
                  <MuiThemeProvider theme={theme}>
                    <InputAdornment position="start">
                      <Email color='primary' className={classes.iconMargin} />
                    </InputAdornment>
                  </MuiThemeProvider>
                ),
              }}
            />

            <TextField
              placeholder="Password"
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
                endAdornment: (
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
                )
              }}
            />

            <Button
              variant="contained"
              onClick={this.adminLoginAuth}
              className={classes.buttonLogin}
              disabled = {this.state.updateButton}
            >
              Login
              </Button>
            <ErrorSnackBar open={this.state.open}
              onClose={this.handleClose}
              anchorOrigin={{ vertical, horizontal }}
              message={this.state.hello}
            />
            <div className="forgotPasswordBoxLogin  d-flex flex-column justify-content-center align-items-center">
              <NavLink to='/PasswordAdmin'>
                <span className="fontRegular12 greyFontColor">Forgot Password?</span>
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>



    )
  }
}
LoginPage = withRouter(LoginPage)
export default withStyles(styles)(LoginPage);
