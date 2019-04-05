/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userProfile.js
Purpose   : Profile details
*/

import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { items } from '../../../networkCall/service.js';
import { Button } from '@material-ui/core';
import { constants } from '../../../networkCall/constant'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom'
import moment from "moment";
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserProfilePic from '../../../images/SVGs/default_userimg.svg'
import UserProfilePicFemale from '../../../images/userProfilePicFemale.png'
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js'

// React material theme provider
const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

// Inline classes for react material component
const styles = theme => ({
  rootPopup: {
    width: '100%'
  },
  textFieldInput1: {
    borderRadius: 0,
    backgroundColor: '#FBFBFB',
    fontSize: 16,
    width: 'calc(80% - 24px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2'
  },
  btnColor: {
    backgroundColor: 'white',
    '&:after': {
      borderBottom: '2px solid white',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  underline: {
    color: 'white',
    borderBottom: 'white',
    '&:after': {
      borderBottom: '2px solid white',
    },
    '&:focused::after': {
      borderBottom: '2px solid white',
    },
    '&:before': {
      borderBottom: '1px solid white',
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: '2px solid white',
    },
    '&$disabled:before': {
      borderBottom: '1px dotted white',
    },
  },
  borderStyle: {
    borderBottomColor: "white"
  },
  textFieldInput2: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
    width: 'calc(80% - 24px)',
    margin: 0,
    borderBottom: '0.5px solid  #f2f2f2'
  },
  buttonUserProfile: {
    width: 'calc(75% - 80px)',
    height: 40,
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
  circularLoader: {
    color: '#E18F68',
    margin:'auto'
  },
  paperPopup: {
    backgroundColor: '#f2f2f2',
    boxShadow: 'none',
    position: 'absolute',
    borderRadius: 0,
    top: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonContDailog: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  dailogContent: {
    textAlign: 'center',
    fontFamily: 'montserratregular',
    fontSize: 14,
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  dailogTitle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'montserratsemibold',
    fontSize: 20,
    backgroundColor: '#E18F68',
    padding: '5px 15px',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dailogButton: {
    backgroundColor: '#E18F68',
    color: 'white',
    fontFamily: 'montserratregular',
    fontSize: 14,
    boxShadow: 'none',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  dailogContentStyle: {
    color: '#555555',
    fontFamily: 'montserratregular',
    fontSize: 16,
  },
});

// Dialog animation transistion
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class UserProfile extends Component {
  // State of the class
  state = {
    loader:true,
    userData : {'user_profile' : '', 'user_prof' : '', 'dob' : '' , 'gender' : '', 'email' : '', 'mobile' : '', 'location' : '', 'region' : ''},
    showDeletePopup: false
  };

  // To call teh user profile API on component load
  componentDidMount(){
    this.userProfile();
  }

  // APi to fetch the User data
  userProfile(){
    let requestedData = {
      votingElection_code : constants.votingElectionCode,
      token_id : localStorage.getItem('accessToken'),
      user_id : localStorage.getItem('userId')
    }
    items('POST', requestedData, constants.userProfileView)
        .then(response => {
          if (response.status === "Success") {
            if(response.data.length != 0 || response.data != null)
            {
              this.state.userData.user_prof = response.data[0].user_profession;
              this.state.userData.dob = response.data[0].user_dob;
              this.state.userData.gender = response.data[0].user_gender;
              this.state.userData.email= response.data[0].user_email;
              this.state.userData.gender = response.data[0].user_gender;
              this.state.userData.location = response.data[0].location;
              this.state.userData.region = response.data[0].region;
              this.state.userData.mobile = response.data[0].user_phone_number;
              this.state.userData.user_profile = response.data[0].user_img_url;
              this.setState({userData : this.state.userData});
              this.setState({loader:false});
            }
          }
          else if (response.status === "Failure") {
            this.setState({loader:false});
          } 
          else {
            this.setState({loader:false});
          }
        });
  }

  // To show the pop up for delete accont
  deleteAccountPopup = (showPopup) => {
    this.setState({showDeletePopup: showPopup})
  }

  // Delete Account API call
  deleteAccount = () => {
      let requestedData = {
        votingElection_code : constants.votingElectionCode,
        token_id : localStorage.getItem('accessToken'),
        user_id : localStorage.getItem('userId')
      }
      items('POST', requestedData, constants.userDelete)
      .then(response => {
        if (response.status === "Success") {
            localStorage.removeItem('accessToken');
            localStorage.removeItem("userId");
            localStorage.removeItem(btoa('userdetail'));
            localStorage.removeItem('facebookUserName');
            localStorage.removeItem('userType');
            this.props.history.push({
              pathname: '/UserLogin'
            });
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }
  
  // Handle broken images and replace them with dfault image
  handleCandidateImgError = (ev) =>  {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }

  // Render HTML of class
  render() {
    const { classes, ...other } = this.props;
    return (
      <div className="">
        <UserSearchAppBar />
        <div>
        <Container fluid={true} className={this.state.loader === true ? 'userProfileContainer': ''}>
        <Row className="row_height">
        {this.state.loader === true ? <CircularProgress className={classes.circularLoader} />
        :
          <Col xs="10" sm="10" md="8" lg="6" xl="4" className="lightBackgroundColor ml-auto mr-auto profileCont">
            <div className="text-center mt-5">
              <div className="imageUpload ml-auto mr-auto userProfileCircle">
                <Image
                  src={this.state.userData.user_profile === null || this.state.userData.user_profile === '' ? 
                  ( 
                    [
                    (this.state.userData.gender === null || this.state.userData.gender === '' || this.state.userData.gender === 'Male' || this.state.userData.gender === undefined
                    ? UserProfilePic 
                    : UserProfilePic),
                    ]
                  ) : this.state.userData.user_profile}
                  height="100" width="100" responsive className="imageCandidatePartyProfile"
                  onError={this.handleCandidateImgError}
                >
                </Image>
              </div>
              <p className="fontBold16 mt-3">User Profile</p>
            </div>
            <div className="tableProfile">
              <table className="w-90 ml-auto mr-auto">
                <tr>
                  <td>
                    <p className="fontSemiBold13">Profession :</p>
                  </td>
                  <td className="pl-2">
                    {this.state.userData.user_prof==='' || null ? <p>-</p> : 
                    <p className="fontRegular12">{this.state.userData.user_prof}</p>
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="fontSemiBold13">Date of Birth :</p>
                  </td>
                  <td className="pl-2">
                  {this.state.userData.dob===null ? <p>-</p> : 
                    <p className="fontRegular12">{this.state.userData.dob === "0000-00-00" ? '-': moment(this.state.userData.dob).format('MM-DD-YYYY')}</p>
                  }
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="fontSemiBold13">Gender :</p>
                  </td>
                  <td className="pl-2">
                  {this.state.userData.gender==="" ||  null ? <p>-</p> : 
                    <p className="fontRegular12">{this.state.userData.gender}</p>
                  }
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="fontSemiBold13">Email Address :</p>
                  </td>
                  <td className="pl-2">
                  {this.state.userData.email===null ? <p>-</p> : 
                    <p className="fontRegular12">{this.state.userData.email}</p>
                  }
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="fontSemiBold13">Mobile No :</p>
                  </td>
                  <td className="pl-2">
                  {this.state.userData.mobile===null || this.state.userData.mobile==='' ? <p>-</p> : 
                    <p className="fontRegular12">{this.state.userData.mobile}</p>
                  }
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="fontSemiBold13">State :</p>
                  </td>
                  <td className="pl-2">
                  {this.state.userData.location===null ? <p>-</p> : 
                    <p className="fontRegular12">{this.state.userData.location}</p>
                  }
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="fontSemiBold13">District :</p>
                  </td>
                  <td className="pl-2">
                  {this.state.userData.region===null ? <p>-</p> : 
                    <p className="fontRegular12">{this.state.userData.region}</p>
                  }
                  </td>
                </tr>
              </table>
            </div>
            <Link to='/EditUserProfile' className="ForgotTextStyleLogin fontRegular16 greyFontColor">
            <div className="w-90 text-center mt-3">
              <Button
                variant="contained"
                color="grey"
                className={classes.buttonUserProfile}
              >
                Edit Profile
              </Button>
            </div>
            </Link>
            <div className="text-center mt-3 mb-3 cursorPointer" onClick={this.deleteAccountPopup.bind(this, true)}>
              <small>Delete My Account Permanently</small>
            </div>
          </Col>
        }
        </Row>
        </Container>
        </div>
        {/* Popup for confirmation to delete account */}
        <Dialog
          TransitionComponent={Transition}
          open={this.state.showDeletePopup}
          onClose={this.deleteAccountPopup}
          PaperProps={{
            classes: {
              root: classes.paperPopup
            }
          }}
          {...other}
          BackdropProps={{
            classes: {
              root: classes.rootPopup
            }
          }
          }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Delete Account"}</DialogTitle>
          <DialogContent className={classes.dailogContent}>
            <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
              <div className="fontSemiBold16 mt-4">
                Are You sure you want to delete your account?
              </div>
              <div className="fontRegular12 mt-3">
                All data will be deleted and this process cannot be undone.
              </div>
              <div className="mt-3 form-inline d-flex justify-content-center">
                <div className="mr-2 mt-3">
                  <Button onClick={this.deleteAccountPopup.bind(this, false)} variant="contained" className={classes.dailogButton}>
                    NO
                  </Button>
                </div>
                <div className="mt-3">
                  <Button onClick={this.deleteAccount} variant="contained" className={classes.dailogButton}>
                    YES
                  </Button>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}
UserProfile = withRouter(UserProfile)
export default withStyles(styles)(UserProfile);
