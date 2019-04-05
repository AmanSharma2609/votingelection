import React, { Component } from 'react';
import { Image, FormControl } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import {
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import {
  FacebookShareButton,
  TwitterShareButton,

} from 'react-share';
import { FacebookProvider, Share, EmbeddedPost } from 'react-facebook';
import {Helmet} from "react-helmet";
import MetaTags from 'react-meta-tags';

import UserSearchAppBar from './userAppbar/userAppBar';
import { constants } from '../../../networkCall/constant'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import Footer from './userFooter/footer.js';
import { withRouter } from 'react-router-dom'
import { items } from '../../../networkCall/service.js';
import fb  from '../../../images/fb.png'
import google  from '../../../images/gplus.png'

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
    fontSize: 14,
    fontFamily: 'montserratregular',
    marginBottom: '4%',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
 

});
const theme = createMuiTheme({
  palette: {
    primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

const shareOverrideOGMeta = (overrideLink, overrideTitle, overrideDescription, overrideImage) =>
{
	window.FB.ui({
		method: 'share_open_graph',
		action_type: 'og.likes',
		action_properties: JSON.stringify({
			object: {
				'og:url': overrideLink,
				'og:title': overrideTitle,
				'og:description': overrideDescription,
				'og:image': overrideImage
			}
		})
	},
	function (response) {
	});
}

class UserPostPreview extends Component {

  state = {
    email: '',
    password: '',
   
  };
 
  componentDidMount = () => {
    this.setState({ vertical: 'top' })
    const post = localStorage.getItem('Post')
    shareOverrideOGMeta(`https://devvec.apnaneta.com/#${this.props.location.pathname}`,'Post Link','','https://i.imgur.com/RSIAvPA.png')
   
  }
  
  

  render() {

    const { vertical, horizontal } = this.state;
    const { classes, } = this.props;


    return (
      <div className="AppUserLogin">
        <UserSearchAppBar />
        <Container className="loginCont" >
          <Row className="formContainerLogin">
            <Col xs="12" sm="8" md="8" lg="6" xl="6" className="formBoxLoginLogin lightBackgroundColor">
            <MetaTags>
            <meta property="og:image" content="https://i.imgur.com/RSIAvPA.png"  />
            <meta property="og:type" content="video.movie" />
            <meta property="og:video:type" content="application/x-shockwave-flash" />
            <meta property="og:video:width" content="398" />
            <meta property="og:video:height" content="224" />
            <meta property="og:site_name" content="YouTube" />
            <meta property="og:url" content="https://www.youtube.com/watch?v=a81eP2E8MEQ&start_radio=1&list=RDa81eP2E8MEQ" />
            <meta property='og:video:url' content='https://www.youtube.com/watch?v=a81eP2E8MEQ&start_radio=1&list=RDa81eP2E8MEQ' />
          </MetaTags>
            
              <div className="loginTextBox">

                <p className="greyFontColor fontBold22">POST PREVIEW</p>
                <FacebookShareButton
                  url={`https://devvec.apnaneta.com/#${this.props.location.pathname}`}
                  quote="Post Link"
                  imageURL={google}
                  className="Demo__some-network__share-button">
                  <FacebookIcon
                    size={40}
                    round
                    />
                  </FacebookShareButton> 
                  <TwitterShareButton
                  url={`https://devvec.apnaneta.com/#${this.props.location.pathname}`}
                  title="Post Link"
                  className="Demo__some-network__share-button">
                  <TwitterIcon
                    size={40}
                    round
                    />
                  </TwitterShareButton> 
                  
              </div>

              
              
              <div  dangerouslySetInnerHTML={{ __html: localStorage.getItem('Post') }}
               className="previewSection ml-auto mr-auto d-flex flex-column pl-2 align-items-center">
                </div>
                <img src={google}
                alt='imageeeee' width='25'>
                </img>
                
                      
                 
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
UserPostPreview = withRouter(UserPostPreview)
export default withStyles(styles)(UserPostPreview);


// <FacebookShareButton
// url="www.facebook.com"
// quote="link"
// className="Demo__some-network__share-button">
// <FacebookIcon
//   size={40}
//   round
//   />
// </FacebookShareButton> 
