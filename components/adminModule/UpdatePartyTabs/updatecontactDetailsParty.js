/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdatePartyTabs > contact details - tab.
Purpose   : Update party's contact details
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom'

import Facebook from '../../../images/facebook.png'
import Twitter from '../../../images/twitter.png'
import Youtube from '../../../images/youtube.png'
import Instagram from '../../../images/instagram.png'
import GooglePlus from '../../../images/google+.png'    
import LinkedIn from '../../../images/linkedIn.png'



const styles = theme => ({
  tabLabelStyle: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: 14,
    minWidth: 0,
    paddingLeft: 0,
    cursor: 'default',
    paddingRight: 0,
    width: 140,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  active_tab: {
    textTransform: 'capitalize',
    border: 0,
    fontSize: 14,
    minWidth: 0,
    paddingLeft: 0,
    cursor: 'default',
    paddingRight: 0,
    width: 140,
    color: 'black',
    // backgroundColor: '#E18F68',
    '&:focus': {
      outline: 'none',
    },
  },
  appBarStyle: {
    backgroundColor: '#FEF8DF',
    boxShadow: 'none',
  },
  labelContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  labelWrapped: {
    fontSize: 10,
  },
  indicator: {
    backgroundColor: '#E18F68',
  },

  buttonLogin: {
    width: '100%',
    textTransform: 'capitalize',
    fontFamily: 'montserratregular',
    fontSize: 14,
    height: '15%',
    marginTop: 0.1,
    boxShadow: 'none',
    borderRadius: 3,

    backgroundColor: '#E18F68',
    color: 'white',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: '#b75628'
    }

  }
})

class UpdateContactDetailsParty extends Component {

  
  handleSubmit = () => {
  }
  handleGoToOffice = () => {
    this.setState({ value: 0 })
  }

  state = {
    value: 0,
    
  }
  handleOfficeClick = () => {
    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.props.parameter.party_email)
    const urlCheck = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    if(this.props.parameter.party_website !==''){
      if (urlCheck.test(this.props.parameter.party_website) === false) {
        this.props.handleWebsiteClick();
        
        
      }
      else {
        this.props.handleWebsiteToggle();
        
        
      }
    }
    setTimeout(() => {

    
   if(this.props.invalidWebUrlNav === false){
    if(this.props.parameter.party_email !== ''){
      if (reg.test(this.props.parameter.party_email) === false) {
        this.props.handleEmailClick();
        
      }
      else {
        this.props.handleEmailToggle();
        this.setState({ value: 1 });
      }
    }
    else{
      this.setState({ value: 1 });
    }
   }
  }, 10)
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="ContactDetailsContParty">
        <Container className="contactPartyTabs">
          <Row className="contactPartyRow">

            <Col className="tabPartyContCol " sm={12} xs={12} lg={8} md={8} xl={8}>
              <AppBar position="static" className={classes.appBarStyle}>
                <Tabs value={this.state.value} onChange={this.handleChange}
                  fullWidth={true}
                  scrollButtons="auto"
                  selected={true}
                  classes={{
                    indicator: classes.indicator,
                  }}
                >
                  <Tab label="Office Address" className={this.state.value === 0 ? classes.active_tab : classes.tabLabelStyle}
                    classes={{
                      labelContainer: classes.labelContainer,
                      labelWrapped: classes.labelWrapped,
                    }}
                  />
                  <Tab label="Social Profiles" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle}
                    classes={{
                      labelContainer: classes.labelContainer,
                      labelWrapped: classes.labelWrapped,
                    }}
                  />

                </Tabs>
              </AppBar>
              {this.state.value === 0 && <div className="officeContainer">
                <div className="firstInputContactOffice">
                  <InputGroup className="firstInputContactOfficeOne ">

                    <Input
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Office name i.e central office"
                      maxLength={100}
                      onChange={this.props.handleUpdateCentralOfficeName}
                      invalid={this.props.officeNameVald === false ? true : false}
                      defaultValue={this.props.parameter.party_office_name}
                    />
                  </InputGroup>
                  {this.props.officeNameVald === true ? null : <div className="validationContOffice"> * This Field is required</div>
                  }
                </div>
                <div className="firstInputContactOffice ">
                  <InputGroup className="firstInputContactOfficeOne ">
                    <Input
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Office Address"
                      maxLength={100}
                      invalid={this.props.officeAddressVald === false ? true : false}
                      onChange={this.props.handleUpdateOfficeAddress}
                      defaultValue={this.props.parameter.party_address}
                    />
                  </InputGroup>
                  {this.props.officeAddressVald === true ? null : <div className="validationContOffice"> * This Field is required</div>
                  }
                </div>
                <div className="firstInputContactOffice ">
                  <InputGroup className="firstInputContactOfficeOne ">
                    <Input
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Website Address"
                      onChange={this.props.handleUpdateWebsiteAddress}
                      maxLength={250}
                      defaultValue={this.props.parameter.party_website}
                    />
                  </InputGroup>
                  {this.props.invalidWebUrl === true ?
                    <div className="validationContOffice">Invalid URL </div>
                    : null}

                </div>

                <div className="firstInputContactOffice ">
                  <InputGroup className="firstInputContactOfficeOne ">
                    <Input
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Email Address"
                      invalid={this.props.invalidEmail === false ? true : false}
                      maxLength={100}
                      onChange={this.props.handleUpdateEmailAddress}
                      defaultValue={this.props.parameter.party_email}
                    />
                  </InputGroup>
                  {this.props.invalidEmail === false ?
                    <div className="validationContOffice">Invalid Format of email </div>
                    : null}

                </div>
               

                <div className="firstInputContactOffice ">
                  <InputGroup className="firstInputContactOfficeOne ">
                    <Input
                      type="number"
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Contact Number"
                      onInput={(e)=>{
                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0,12)
                      }}
                      invalid={this.props.contactNumberVald === false ? true : false}
                      onChange={this.props.handleUpdateContactNumber}
                      maxLength={10}
                      defaultValue={this.props.parameter.party_phone_number}
                    />
                  </InputGroup>
                  {this.props.contactNumberVald === true ? null :
                    <div className="validationContOffice"> * This Field is required</div>
                  }
                </div>


                <Row className="twoButtonRowParty">
                  <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonOneBasicCol">
                    <Button
                      variant="contained"
                      color="grey"
                      onClick={this.props.handleToPurpose}
                      className={classes.buttonLogin}
                    >
                      GO BACK
                  </Button>
                  </Col>
                  <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonBasicCol">
                    <Button
                      variant="contained"
                      onClick={this.handleOfficeClick}
                      className={classes.buttonLogin}
                    >
                      NEXT
                    </Button>
                  </Col>
                </Row>

              </div>
              }
              {this.state.value === 1 && <div className="officeContainer">
                <Row className="firstInputContSelectContact noMargin">
                  <Col sm={12} xs={12} lg={6} md={6} xl={6} className="inputColAdd  LittleTopBottomMargin">
                    <div className="firstInput">
                      <InputGroup >
                        <InputGroupAddon addonType="prepend" className="noBorderRadius" >
                          <InputGroupText className="noBorderRadius" ><img src={Facebook}
                            alt="search" height="25" width="25"
                          /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className=" fontRegular12 noBorderRadius"
                          placeholder="Facebook URL"
                          onChange={this.props.handleUpdatePartyFacebookUrl}
                          defaultValue={this.props.parameter.party_facebook_url}
                        />
                      </InputGroup>
                      {this.props.facebookUrlVald === true ? <div className="validationCont"> Invalid URL</div> :null
                        
                    }
                    </div>
                  </Col>
                  <Col sm={12} xs={12} lg={6} md={6} xl={6} className="inputColAdd  LittleTopBottomMargin">
                    <div className="firstInput ">
                      <InputGroup >
                        <InputGroupAddon addonType="prepend" className="noBorderRadius" >
                          <InputGroupText className="noBorderRadius" ><img src={Twitter}
                            alt="search" height="25" width="25"
                          /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className=" fontRegular12 noBorderRadius"
                          placeholder="Twitter URL"
                          onChange={this.props.handleUpdatePartyTwitterUrl}
                          defaultValue={this.props.parameter.party_twitter_url}
                        />
                      </InputGroup>
                      {this.props.twitterUrlVald === true ? <div className="validationCont"> Invalid URL</div> :null
                        
                    }
                    </div>
                  </Col>
              
                  <Col sm={12} xs={12} lg={6} md={6} xl={6} className="inputColAdd  LittleTopBottomMargin">
                    <div className="firstInput ">
                      <InputGroup >
                        <InputGroupAddon addonType="prepend" className="noBorderRadius" >
                          <InputGroupText className="noBorderRadius" ><img src={Youtube}
                            alt="search" height="25" width="25"
                          /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className=" fontRegular12 noBorderRadius"
                          placeholder="Youtube URL"
                          onChange={this.props.handleUpdatePartyYoutubeUrl}
                          defaultValue={this.props.parameter.party_youtube_url}
                        />
                      </InputGroup>
                      {this.props.youtubeUrlVald === true ? <div className="validationCont"> Invalid URL</div> :null
                        
                    }
                    </div>
                  </Col>
                  <Col sm={12} xs={12} lg={6} md={6} xl={6} className="inputColAdd  LittleTopBottomMargin">
                    <div className="firstInput ">
                      <InputGroup >
                        <InputGroupAddon addonType="prepend" className="noBorderRadius" >
                          <InputGroupText className="noBorderRadius" ><img src={Instagram}
                            alt="search" height="25" width="25"
                          /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className=" fontRegular12 noBorderRadius"
                          placeholder="Instagram URL"
                          onChange={this.props.handleUpdatePartyInstagramUrl}
                          defaultValue={this.props.parameter.party_instagram_url}
                        />
                      </InputGroup>
                      {this.props.instagramUrlVald === true ? <div className="validationCont"> Invalid URL</div> :null
                        
                    }
                    </div>
                  </Col>
              
                  <Col sm={12} xs={12} lg={6} md={6} xl={6} className="inputColAdd  LittleTopBottomMargin">
                    <div className="firstInput ">
                      <InputGroup >
                        <InputGroupAddon addonType="prepend" className="noBorderRadius" >
                          <InputGroupText className="noBorderRadius" ><img src={GooglePlus}
                            alt="search" height="23" width="23"
                          /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className=" fontRegular12 noBorderRadius"
                          placeholder="GooglePlus URL"
                          onChange={this.props.handleUpdatePartyGoogleUrl}
                          defaultValue={this.props.parameter.party_google_url}
                        />
                      </InputGroup>
                      {this.props.googleUrlVald === true ? <div className="validationCont"> Invalid URL</div> :null
                        
                    }
                    </div>
                  </Col>
                  <Col sm={12} xs={12} lg={6} md={6} xl={6} className="inputColAdd  LittleTopBottomMargin">
                    <div className="firstInput ">
                      <InputGroup >
                        <InputGroupAddon addonType="prepend" className="noBorderRadius" >
                          <InputGroupText className="noBorderRadius" ><img src={LinkedIn}
                            alt="search" height="25" width="25"
                          /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className=" fontRegular12 noBorderRadius"
                          placeholder="LinkedIn URL"
                          onChange={this.props.handleUpdatePartyLinkedInUrl}
                          defaultValue={this.props.parameter.party_linkedin_url}
                        />
                      </InputGroup>
                      {this.props.linkedInUrlVald === true ? <div className="validationCont"> Invalid URL</div> :null
                        
                    }
                    </div>
                  </Col>                 
                </Row>

                <Row className="twoButtonRowParty">
                  <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonOneBasicCol">
                    <Button
                      variant="contained"
                      color="grey"
                      onClick={this.handleGoToOffice}
                      className={classes.buttonLogin}
                     
                    >
                      GO BACK
         </Button>
                  </Col>
                  <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonBasicCol">
                    <Button
                      variant="contained"
                      onClick={this.props.handleUpdateApiAddParty}
                      className={classes.buttonLogin}
                      disabled = {this.props.addPartyDisabled}
                    >
                      UPDATE PARTY
         </Button>
                  </Col>
                </Row>

              </div>}

            </Col>

          </Row>
        </Container>
      </div>
    )
  }
}

UpdateContactDetailsParty = withRouter(UpdateContactDetailsParty)
export default withStyles(styles)(UpdateContactDetailsParty);
