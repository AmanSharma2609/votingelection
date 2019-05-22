/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddPartyTabs > contact details - tab.
Purpose   : Add party's contact details
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Facebook from '../../../images/facebook.png'
import Twitter from '../../../images/twitter.png'
import Youtube from '../../../images/youtube.png'
import Instagram from '../../../images/instagram.png'
import GooglePlus from '../../../images/google+.png'
import LinkedIn from '../../../images/linkedIn.png'



const styles = theme => ({
  tabLabelStyle: {
    textTransform: 'capitalize',
    cursor: 'default',
    color: 'black',
    fontSize: 14,
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,

    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  active_tab: {
    textTransform: 'capitalize',
    cursor: 'default',
    border: 0,
    fontSize: 14,
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,

    color: 'black',
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
    '&:hover': {
      backgroundColor: '#b75628'
    }

  }
})

class ContactDetailsParty extends Component {


  handleSubmit = () => {
  }

  state = {
    value: 0,

  }
  handleOfficeClick = () => {

    const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    reg.test(this.props.parameter.party_email)
    const urlCheck = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    if (this.props.parameter.party_website !== '') {
      if (urlCheck.test(this.props.parameter.party_website) === false) {
        this.props.handleWebsiteClick();


      }
      else {
        this.props.handleWebsiteToggle();


      }
    }
    setTimeout(() => {


      if (this.props.invalidWebUrlNav === false) {
        if (this.props.parameter.party_email !== '') {
          if (reg.test(this.props.parameter.party_email) === false) {
            this.props.handleEmailClick();

          }
          else {
            this.props.handleEmailToggle();
            this.setState({ value: 1 });
          }
        }
        else {
          this.setState({ value: 1 });
        }
      }
    }, 1)
  }

  goToOfficeAddress = () => {
    this.setState({ value: 0 })
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
                    disableRipple={true}
                  />
                  <Tab label="Social Profiles" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle}
                    classes={{
                      labelContainer: classes.labelContainer,
                      labelWrapped: classes.labelWrapped,
                    }}
                    disableRipple={true}
                  />

                </Tabs>
              </AppBar>
              {this.state.value === 0 && <div className="officeContainer">
                <div className="firstInputContactOffice ">
                  <InputGroup className="firstInputContactOfficeOne ">

                    <Input
                      invalid={this.props.officeNameVald === true ? false : true}
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Office name i.e central office"
                      onChange={this.props.handleCentralOfficeName}
                      autoCompelete={true}
                      maxLength={100}
                      value={this.props.parameter.party_office_name}
                    />
                  </InputGroup>
                  {this.props.officeNameVald === true ? null : <div className="validationContOffice"> * This Field is required</div>
                  }
                </div>

                <div className="firstInputContactOffice ">
                  <InputGroup className="firstInputContactOfficeOne ">
                    <Input
                      invalid={this.props.officeAddressVald === true ? false : true}
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Office Address"
                      maxLength={100}
                      onChange={this.props.handleOfficeAddress}
                      autoCompelete={true}
                      value={this.props.parameter.party_address}
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
                      maxLength={250}
                      onChange={this.props.handleWebsiteAddress}
                      autoCompelete={true}
                      value={this.props.parameter.party_website}
                    />
                  </InputGroup>
                  {this.props.invalidWebUrl === true ?
                    <div className="validationContOffice">Invalid URL </div>
                    : null}
                </div>

                <div className="firstInputContactOffice bottomMargin">
                  <InputGroup className="firstInputContactOfficeOne ">
                    <Input
                      invalid={this.props.invalidEmail === false ? true : false}
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Email Address"
                      maxLength={100}
                      onChange={this.props.handleEmailAddress}
                      autoCompelete={true}
                      value={this.props.parameter.party_email}
                    />
                  </InputGroup>
                  {this.props.invalidEmail === false ?
                    <div className="validationContOffice">Invalid Format of email </div>
                    : null}
                </div>

                <div className="firstInputContactOffice ">
                  <InputGroup className="firstInputContactOfficeOne ">
                    <Input
                      type="text"
                      invalid={this.props.contactNumberVald === true ? false : true}
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Contact Number"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 12)
                      }}
                      onChange={this.props.handleContactNumber}
                      autoCompelete={true}
                      value={this.props.parameter.party_phone_number}
                    />
                  </InputGroup>
                  {this.props.contactNumberVald === true ? null :
                    <div className="validationContOffice"> * This Field is required</div>
                  }
                </div>

                <div className="validationContOffice"> </div>


                <Row className="twoButtonRowParty pb-4">
                  <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonOneBasicCol">
                    <Button
                      variant="contained"
                      color="grey"
                      className={classes.buttonLogin}
                      onClick={this.props.goToPurpose}
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
                          onChange={this.props.handlePartyFacebookUrl}
                          autoCompelete={true}
                          value={this.props.parameter.party_facebook_url}
                        />
                      </InputGroup>
                      {this.props.facebookUrlVald === true ? <div className="validationCont"> Invalid URL</div> : null

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
                          onChange={this.props.handlePartyTwitterUrl}
                          autoCompelete={true}
                          value={this.props.parameter.party_twitter_url}

                        />
                      </InputGroup>
                      {this.props.twitterUrlVald === true ? <div className="validationCont"> Invalid URL</div> : null

                      }
                    </div>
                  </Col>
                  {/* <Calendar
           /> */}
                </Row>
                <Row className="firstInputContSelectContact noMargin">
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
                          onChange={this.props.handlePartyYoutubeUrl}
                          autoCompelete={true}
                          value={this.props.parameter.party_youtube_url}
                        />
                      </InputGroup>
                      {this.props.youtubeUrlVald === true ? <div className="validationCont"> Invalid URL</div> : null

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
                          onChange={this.props.handlePartyInstagramUrl}
                          autoCompelete={true}
                          value={this.props.parameter.party_instagram_url}
                        />
                      </InputGroup>
                      {this.props.instagramUrlVald === true ? <div className="validationCont"> Invalid URL</div> : null

                      }
                    </div>
                  </Col>
                  {/* <Calendar
           /> */}
                </Row>
                <Row className="firstInputContSelectContact noMargin">
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
                          onChange={this.props.handlePartyGoogleUrl}
                          autoCompelete={true}
                          value={this.props.parameter.party_google_url}
                        />
                      </InputGroup>
                      {this.props.googleUrlVald === true ? <div className="validationCont"> Invalid URL</div> : null

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
                          placeholder="LinkedIn Company URL"
                          onChange={this.props.handlePartyLinkedInUrl}
                          autoCompelete={true}
                          value={this.props.parameter.party_linkedin_url}
                        />
                      </InputGroup>
                      {this.props.linkedInUrlVald === true ? <div className="validationCont"> Invalid URL</div> : null

                      }
                    </div>
                  </Col>
                </Row>


                <Row className="twoButtonRowParty">
                  <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonOneBasicCol">
                    <Button
                      variant="contained"
                      color="grey"
                      className={classes.buttonLogin}
                      onClick={this.goToOfficeAddress}
                    >
                      GO BACK
                    </Button>
                  </Col>
                  <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonBasicCol">
                    <Button
                      disabled={this.props.addPartyDisabled ? true : false}
                      variant="contained"
                      onClick={this.props.handleApiAddParty}
                      className={classes.buttonLogin}
                    >
                      ADD PARTY
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


export default withStyles(styles)(ContactDetailsParty);
