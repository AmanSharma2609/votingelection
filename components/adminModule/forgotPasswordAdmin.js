/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin forgot password
Purpose   : admin can request the OTP from here to reset his password
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import { constants } from '../../networkCall/constant'
import {items} from '../../networkCall/service.js'
import Snackbar1 from '../../networkCall/snackBar.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/web-logo.png';
import ErrorSnackBar from '../../networkCall/errorSnackBar';

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
    '&:hover':{
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



class ForgotPasswordPage extends Component {

  state = {
    parameter: {
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      admin_email: ''
    },
    open: false,
    vertical: 'top',
    horizontal: 'center',
    showButton: true,
    otpData: null,
    openError: false,
    msg : '',
    hello: 'Mail Sent Successfully! Please wait...',
    invalidEmail: false,
    parameterEmpty: false,
    emailEmpty: false,
    updateButton : false
  }

  handleAdminEmail = (e) => {
    this.setState({ parameter: { ...this.state.parameter, admin_email: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ invalidEmail: false })
    }
    if (e.target.value !== null) {
      this.setState({ parameterEmpty: false })
    }
  }


  adminOtp = (state) => {
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.state.parameter.admin_email)
    if (reg.test(this.state.parameter.admin_email) === false && this.state.parameter.admin_email !== '') {
      this.setState({ invalidEmail: true })
      this.setState({ parameterEmpty: false })
    }
    if (this.state.parameter.admin_email === '') {
      this.setState({ invalidEmail: false })
      this.setState({ parameterEmpty: true })
    }
    else if (this.state.parameter.admin_email.trim() !== "" && reg.test(this.state.parameter.admin_email) === true) {
      this.setState({ showButton: false })
      this.setState({ invalidEmail: false })
      this.setState({ updateButton: true })
      this.setState({ parameterEmpty: false })
      items('POST', this.state.parameter, constants.adminForgot)
        .then(response => {
          this.setState({ otpData: response.data })

          if (response.status === "Success") {
            this.setState({ open: true });
            this.setState({ showButton: true });
            this.setState({ updateButton: false })

            setTimeout(() => {
              localStorage.setItem('adminEmail', this.state.parameter.admin_email)
              localStorage.setItem('otpData', this.state.otpData)
              localStorage.setItem('otpNewData', response.data)
              this.setState({ open: false })
              this.props.history.push({
                pathname: '/AdminOtp',
              })
  
            }, 4000)

          }
          else if(response.status === 'Failure')
          {
            this.setState({msg : response.msg})
            this.setState({ openError: true });
            setTimeout(() => {
            this.setState({ openError: false })
          }, 4000)

            this.setState({ updateButton: false })
            this.setState({ showButton: true });
          }
          else
          {
            this.setState({ updateButton: false })
            this.setState({ showButton: true });
          }

        })
    }
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  }
  handleClose = () => {
    this.setState({ open: false });
  }

  componentDidMount = () => {
  }

  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.adminOtp();
    }
  }

  render() {
    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    return (

      
      <Container fluid={true} className="loginPage d-flex flex-column w-100 justify-content-center align-items-center lightBackgroundColor">
        {this.state.showButton ? null : <CircularProgress className={classes.circularLoader}/>}
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
        <div>
        
        </div>
        <Row className="formContainerLogin d-flex  w-100 justify-content-center align-items-start">
          <Col xs="12" sm="12" md="8" lg="5" xl="4" className="formBoxLogin mt-5 d-flex flex-column justify-content-start align-items-center">
            <div className="loginTextBox text-nowrap d-flex w-50 justify-content-center align-items-end">
              <p className=" fontBold fontLightColor ">FORGOT PASSWORD</p>
            </div>
            <div className="validationContAdminLogin">
              {this.state.invalidEmail === true ?

                <span className="fontRegular14 validationColor">{constants.msg.invalidEmail}</span>

                : null}
              {this.state.parameterEmpty === true ?

                <span className="fontRegular14 validationColor">{constants.msg.emailEmpty}</span>

                : null}
            </div>

            <TextField
              placeholder="Email Address"
              autoComplete="email"
              name="email"
              type="email"
              onChange={this.handleAdminEmail}
              margin="normal"
              onKeyPress={this.onEnter}
              inputProps={{
                maxLength: 40,
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

            <Button
              variant="contained"
              onClick={this.adminOtp}
              className={classes.buttonLogin}
              disabled = {this.state.updateButton}
            >
              REQUEST OTP
            </Button>
            <div className="forgotPasswordBoxLogin  d-flex flex-column justify-content-center align-items-center">
              <NavLink to='/AdminLogin'>
                <span className="fontRegular12 greyFontColor">Back To Login?</span>
              </NavLink>
            </div>
            <Snackbar1 open={this.state.open}
              onClose={this.handleClose}
              anchorOrigin={{ vertical, horizontal }}
              message={this.state.hello}
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
export default withStyles(styles)(ForgotPasswordPage);
