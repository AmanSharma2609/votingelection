/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : siteFeedback.js
Purpose   : To share the feedback by user
*/

import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import { items } from '../../../networkCall/service.js'
import { constants } from '../../../networkCall/constant'
import Snackbar1 from '../../../networkCall/snackBar.js'
import { withRouter } from 'react-router-dom'
import ErrorSnackBar from '../../../networkCall/errorSnackBar';
import Close from '@material-ui/icons/Close';

// Theme for react material component
const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

// inline class for styling of react material components
const styles = theme => ({
  textFieldInput1: {
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: 12,
    display: 'flex',
    flexWrap: 'wrap',
    height: 45,
    margin: 0.01,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 3,
    border: '1px solid #ddd',
  },
  resize: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#3C3C3C',
      fontWeight: 800
    }
  },
  buttonLogin: {
    width: '100%',
    fontFamily: 'montserratregular',
    fontSize: 12,
    height: 45,
    marginTop: 0.1,
    marginBottom: 3,
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
});

const today = new Date();

class SiteFeedback extends Component {
  // State of the class
  state = {
    vertical: 'top',
    horizontal: 'center',
    feedbackBoxOpen: false,
    user_email: '',
    open:false,
    msg: '',
    user_feedback: '',
    invalidEmail: false,
    emailEmpty: false,
    feedbackEmpty: false,
    feedbackSubmitted: false,
    disableSend: false,
    sitefeed : ''
  };

  // render the function when componet load
  componentDidMount() {
    if (localStorage.getItem(btoa('userdetail'))) {
      let temp = localStorage.getItem(btoa('userdetail'));
      let value = atob(temp);
      let data = JSON.parse(value);
      this.setState({ user_email: data[0].user_email });
      this.setState({sitefeed : data[0].user_email})
    }
  }


  // Submit feedback form
  submitFeedback = (event) =>{
    event.preventDefault();
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.state.user_email)
    if (this.state.user_email.trim() == '') {
      this.setState({ emailEmpty: true });
      this.setState({ invalidEmail: false });
      this.setState({ feedbackEmpty: false });
    }
    else if (reg.test(this.state.user_email) === false) {
      this.setState({ emailEmpty: false });
      this.setState({ invalidEmail: true });
      this.setState({ feedbackEmpty: false });
    }else if(this.state.user_feedback.trim() === ''){
      this.setState({ emailEmpty: false });
      this.setState({ invalidEmail: false });
      this.setState({ feedbackEmpty: true });
    }else{
      this.setState({ feedbackEmpty: false });
      this.setState({disableSend: true});
      let request = {
        votingElection_code: constants.votingElectionCode,
        user_id: localStorage.getItem('userId'),
        user_email: this.state.user_email,
        user_feedback: this.state.user_feedback
      }
      items('POST', request, constants.userSiteFeedback).then(response => {
        if (response.status === "Success") {
          this.setState({feedbackSubmitted: true});
          this.setState({feedbackBoxOpen: false})
          setTimeout(() => {
            this.setState({ feedbackSubmitted: false });
          }, 2500);
          this.setState({user_email : ''});
        }
        else if (response.status === "Failure") {
          this.setState({msg : response.msg});
          this.setState({open: true});
          setTimeout(() => {
            this.setState({ open: false });
          }, 2500)
        }
        else {
          this.setState({msg : response.msg});
          this.setState({open: true});
          setTimeout(() => {
            this.setState({ open: false });
          }, 2500)
        }
        this.setState({disableSend: false});
      })
    }
  }

  // To open the sete feedback box on click
  sideBoxToggle = (open) => {
    if (localStorage.getItem(btoa('userdetail'))) {
      let temp = localStorage.getItem(btoa('userdetail'));
      let value = atob(temp);
      let data = JSON.parse(value);
      this.setState({ user_email: data[0].user_email });
      this.setState({sitefeed : data[0].user_email})
    }
    this.setState({feedbackBoxOpen: open});
  }

  // To handle the input email
  handleEmail = (event) => {
    this.setState({ emailEmpty: false });
    this.setState({ invalidEmail: false });
    this.setState({user_email: event.target.value})
  }

  // To handle the input feedback
  handleFeedback = (event) => {
    this.setState({ feedbackEmpty: false });
    this.setState({user_feedback: event.target.value});
  }

  // Render the HTML of class
  render() {
    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className={`${
        this.props.match.path === '/Candidate' ||
        this.props.match.path === '/Political-Parties' ||
        this.props.match.path === '/Candidate/Candidate-Profile/' ||
        this.props.match.path === '/Political-Parties/Political-Parties-Profile/' ||
        this.props.match.path === '/UserConstituencyDetails/:type/:id/:name/:consId/:consDesc' ||
        this.props.match.path === '/dashboard'
      ? 'modifiedSiteFeedback' : null
        } siteFeedbackContainer`}>
        <Snackbar1 open={this.state.feedbackSubmitted}
          anchorOrigin={{ vertical, horizontal }}
          message={constants.msg.feedbackSubmitted}
        />
        <ErrorSnackBar open={this.state.open}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.msg}
        />
        {
          this.state.feedbackBoxOpen ?
          <div className={`siteFeedbackFormContainer`}>
            <Row className="siteFeedbackForm text-left ml-0 mr-0 p-3 pt-4 pb-4">
              <Col sm={12}>
                <span className="fontBold18">Share Feedback</span>
              </Col>
              <Col sm={12} className="pt-2 pb-2">
                <span className="fontRegular12 greyFontColor">Share your opinions/suggestions/feedbacks for ApnaNeta</span>
              </Col>
              <Col sm={12}>
                <Row className="ml-0 mr-0">
                  {
                    this.state.emailEmpty === true ?
                    <span className="fontRegular12 validationColor">{constants.msg.emailEmpty}</span> : null
                  }
                  {
                    this.state.invalidEmail === true ?
                    <span className="fontRegular12 validationColor">{constants.msg.invalidEmail}</span> : null
                  }
                  {
                    this.state.feedbackEmpty === true ?
                    <span className="fontRegular12 validationColor">{constants.msg.feedbackEmpty}</span> : null
                  }
                  <Col sm={11} className="pl-0 pr-0">
                    <div className="">
                      <form onSubmit={this.submitFeedback}>
                      <TextField
                        placeholder="Email Address"
                        autoComplete="email"
                        name="user_email"
                        type="email"
                        value={this.state.user_email}
                        onChange={this.handleEmail}
                        inputProps={{
                          maxLength: 30
                        }}
                        disabled = {this.state.sitefeed === undefined || this.state.sitefeed === '' || this.state.sitefeed === null ? false : true}
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
                      <textarea type="text" ref="" className="form-control fontRegular12 siteFeedbackTextArea"
                        placeholder="We will be glad to hear from you. Share your thoughts.."
                        onChange={this.handleFeedback}
                      ></textarea>
                      <Button variant="contained" className={classes.buttonLogin} type="submit" disabled={this.state.disableSend}>
                        SEND
                      </Button>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Col>
              <div className="position-relative">
                <div className="siteFeedbackCloseIcon" onClick={this.sideBoxToggle.bind(this, false)}>
                  <Close className="cursorPointer greyFontColor"/>
                </div>
              </div>
            </Row>
          </div>
        :
          <div className="siteFeedbackButton cursorPointer" onClick={this.sideBoxToggle.bind(this, true)}>
            Share Feedback
          </div>
        }
      </div>
    )
  }
}
SiteFeedback = withRouter(SiteFeedback)
export default withStyles(styles)(SiteFeedback);
