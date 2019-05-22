/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Add party 
Purpose   : Add party parent component contains all the add party functions.
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardBody } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import PrimarySearchAppBar from './appBar/appBar'

import ErrorSnackBar from '../../networkCall/errorSnackBar'
import GeneralInfo from './addPartyTabs/generalPartyInfo'
import PurposeOfParty from './addPartyTabs/purposeOfParty'
import ContactDetailsParty from './addPartyTabs/contactDetailsParty'
import {ImageUpload} from '../../networkCall/imageUpload.js'



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  tabLabelStyle: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: 12,
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: 140,
    fontFamily: 'montserratregular',
    '&:focus': {
      outline: 'none',
    },
  },
  active_tab: {
    textTransform: 'capitalize',
    fontFamily: 'montserratregular',
    border: 0,
    fontSize: 12,
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: 140,
    color: 'white',
    backgroundColor: '#E18F68',
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
    fontSize: 12,
  },
  indicator: {
    backgroundColor: '#E18F68',
  },
  link: {
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: '#555555',
    '&:hover': {
      color: '#E18F68'
    }
  },
  activelink: {
    color: '#555555',
    '&:hover': {
      color: '#555555'
    }
  }

})

class AddParty extends Component {

  state = {
    value: 0,
    stateParty: '',
    startDate: null,
    body: '',
    title: '',
    partyNameVald: true,
    partyStatusVald: true,
    registrationStateVald: true,
    registrationDateVald: true,
    specialCharacterPartyName: false,
    specialCharacterPartyCode: false,
    presidentVald: true,
    partyActiveVald: true,
    partyPurposeVald: true,
    officeNameVald: true,
    officeAddressVald: true,
    contactNumberVald: true,
    invalidEmail: true,
    valueParty: '',
    facebookUrlVald: false,
    twitterUrlVald : false,
    youtubeUrlVald: false,
    instagramUrlVald: false,
    googleUrlVald: false,
    linkedInUrlVald: false,
    invalidWebUrl: false,
    invalidWebUrlNav: false,
    open: false,
    file: null,
    imagePartyId: null,
    vertical: 'top',
    horizontal: 'center',
    hello: "Political party already present",
    partyImage: null,
    parameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      party_name: '',
      party_code: '',
      party_type: '',
      party_registered_state: '',
      party_office_name: '',
      party_address: '',
      party_status: '',
      party_phone_number: '',
      party_email: '',
      party_website: '',
      party_chairperson: '',
      party_purpose: '',
      party_year_of_establishment: '',
      party_facebook_url: '',
      party_twitter_url: '',
      party_youtube_url: '',
      party_instagram_url: '',
      party_google_url: '',
      party_linkedin_url: '',
    },
    addPartyDisabled : false,
    stateOptionArray: [],
  }

  componentDidMount() {
    let value = localStorage.getItem('accessToken');
    this.setState({ parameter: { ...this.state.parameter, token_id: value } });
    this.statelistApi();
  }

  statelistApi() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken')
    }
    items('POST', requestedData, constants.viewAllState)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ stateOptionArray: response.data });
        }
        else if (response.status === 'Failure') {

        }
        else {

        }
      });
  }

  globalSearchAutoSuggest(newValue) {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_key: ''
    }

    items('POST', requestedData, constants.filterGlobalSearch)
      .then(response => {
        if (response.status === "Success") {
          let val = [];
          if (response.data.election.length !== 0) {
            for (let i of response.data.election) {
              let temp = { label: i.election_name, id: i.election_id, type: 'election' }
              val.push(temp);
            }
          }
          if (response.data.political_party.length !== 0) {
            for (let i of response.data.political_party) {
              let temp = { label: i.party_name, id: i.party_id, type: 'party' }
              val.push(temp);
            }
          }
          if (response.data.candidate.length !== 0) {
            for (let i of response.data.candidate) {
              let temp = { label: i.candidate_name, id: i.candidate_id, type: 'candidate' }
              val.push(temp);
            }
          }
          localStorage.setItem(btoa('search_data_admin'), JSON.stringify(val));
          localStorage.setItem(btoa('search_data'), JSON.stringify(val));
        }
        else if (response.status === "Failure") {

        }
        else {

        }
      });
  }


  // <-------General-Info-Input-Function---------start-------------------------->

  handlePartyName = (e) => {

    this.setState({ parameter: { ...this.state.parameter, party_name: e.target.value } })

    if (e.target.value !== null) {
      this.setState((state) => ({
        partyNameVald: true
      }))
      this.setState((state) => ({
        specialCharacterPartyName: false
      }))
    }
  }
  handlePartyCode = (e) => {
    this.setState({ parameter:{...this.state.parameter, party_code : e.target.value} })
  }

  handlePartyType = (event) => {
    this.setState({ parameter: { ...this.state.parameter, party_type: event.target.value } }, function () {
    })
    if (event.target.value !== null) {
      this.setState((state) => ({
        partyStatusVald: true
      }))
    }

  }
  handleRegistrationState = (e) => {

    this.setState({ valueParty: e.target.value })
    this.setState({ parameter:{...this.state.parameter, party_registered_state: e.target.value} })

    if (e.target.value !== null) {
      this.setState((state) => ({
        registrationStateVald: true
      }))
    }
  }

  handleDateChange = (event) => {
    let date = event.target.value;
    if ( date !== null) {
      this.setState((state) => ({
        registrationDateVald: true
      }))
      this.setState({
        startDate: date
      });
      this.setState({ parameter: { ...this.state.parameter, party_year_of_establishment: date } }, function () {
      })
    }
  }

  handlePresidentName = (event) => {
    this.setState({ parameter: { ...this.state.parameter, party_chairperson: event.target.value } }, function () {
    })
    if (event.target.value !== null) {
      this.setState((state) => ({
        presidentVald: true
      }))
    }
  }

  handlePartyStatus = (event) => {
    this.setState({ parameter: { ...this.state.parameter, party_status: event.target.value } }, function () {
    })
    if (event.target.value !== null) {
      this.setState((state) => ({
        partyActiveVald: true
      }))
    }
  }

  fileChangedHandler = (event) => {
    var reader = new FileReader();
    reader.onload = this.profilePic.bind(this);
    reader.readAsBinaryString(event.target.files[0]);
    this.setState({ file: event.target.files[0] })

  }

  profilePic(readerEvt) {
    var binaryString = readerEvt.target.result;
    let filestring = btoa(binaryString);  // Converting binary string data.
    this.setState({ partyImage: 'data:image/jpeg;base64,' + filestring });
  }


  handleGeneralPartyClick = () => {

    if (this.state.parameter.party_name.trim() !== "") {
      this.setState({ partyNameVald: true })
    }
    else if (this.state.parameter.party_name.trim() === "") {
      this.setState({ partyNameVald: false })

    }
    if (this.state.parameter.party_registered_state.trim() !== "") {
      this.setState({ registrationStateVald: true })
    }

    else if (this.state.parameter.party_registered_state.trim() === "") {
      this.setState({ registrationStateVald: false })
    }
      this.setState({ specialCharacterPartyName: false }, function() {
        if (this.state.parameter.party_name.trim() !== '' && this.state.parameter.party_registered_state.trim() !== '' && this.state.specialCharacterPartyName === false) {
          console.log(this.state.parameter);
          this.setState({ value: 1 })
        }
      })
  }

  // <-------General-Info-Input-Function-------end-------------------------->

  // <-------------------Party-Purpose-input-Function--------start----------->

  handlePartyPurpose = (html, content, delta, source, ) => {
    this.setState({ body: html });
    const inputdatalogin = this.state.body

    this.setState({ parameter: { ...this.state.parameter, party_purpose: inputdatalogin } }, function () {
    })
    this.setState((state) => ({
      partyPurposeVald: true
    }))

  }

  handlePurposePartyClick = () => {

      this.setState({ value: 2 })
  }

  goToGeneralTab = () => {
    this.setState({ value: 0 })
  }

  goToPurpose = () => {
    this.setState({ value: 1 })
  }

  // <-------------------Party-Purpose-input-Function----------end----------->


  //<-----------------Contact-Details-Office-Adrress-Function----start------>

  handleCentralOfficeName = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_office_name: e.target.value } }, function () {

    })
    if (e.target.value !== null) {
      this.setState((state) => ({
        officeNameVald: true
      }))
    }

  }
  handleContactNumber = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_phone_number: e.target.value } }, function () {

    })
    if (e.target.value !== null) {
      this.setState((state) => ({
        contactNumberVald: true
      }))
    }
  }

  handleEmailAddress = (e, ) => {
    this.setState({ parameter: { ...this.state.parameter, party_email: e.target.value } }, function () {
    })
    if (e.target.value !== null) {
      this.setState((state) => ({
        invalidEmail: true
      }))
    }



  }
  handleOfficeAddress = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_address: e.target.value } }, function () {

    })
    if (e.target.value !== null) {
      this.setState((state) => ({
        officeAddressVald: true
      }))
    }
  }
  handleWebsiteAddress = (e) => {
    if(e.target.value !== null) {
      this.setState((state) => ({
        invalidWebUrl: false
      }))
      this.setState({ invalidWebUrlNav: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_website: e.target.value } }, function () {

    })
  }
  handleOfficeButton = () => {

  }
  handleOfficeAddressClick = () => {

  }
  handleContactClick = () => {

  }

  handleEmailClick = () => {
    this.setState((state) => ({
      invalidEmail: false
    }))
  }

  handleEmailToggle = () => {
    this.setState((state) => ({
      invalidEmail: true
    }))
  }
  handleWebsiteClick = () =>  {

    this.setState((state) => ({
      invalidWebUrl: true
    }))
    this.setState({ invalidWebUrlNav: true })
  }
  handleWebsiteToggle = () => {
    this.setState((state) => ({
      invalidWebUrl: false
    }))
    this.setState({ invalidWebUrlNav: false })
  }



  //<-------------------Contact-Details-Office-Adrress-Function----end----->

  //<-------------------Contact-Details-Social-Adrress-Function-----start---->
  handlePartyFacebookUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ facebookUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_facebook_url: e.target.value } }, function () {
    })
  }
  handlePartyTwitterUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ twitterUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_twitter_url: e.target.value } }, function () {
    })
  }
  handlePartyYoutubeUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ youtubeUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_youtube_url: e.target.value } }, function () {
    })
  }
  handlePartyInstagramUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ instagramUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_instagram_url: e.target.value } }, function () {
    })
  }
  handlePartyGoogleUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ googleUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_google_url: e.target.value } }, function () {
    })
  }
  handlePartyLinkedInUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ linkedInUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_linkedin_url: e.target.value } }, function () {
    })

  }
  //<-------------------Contact-Details-Social-Adrress-Function-----------end--->

  // <------------------AddParty-Api-Call--------------------->

  handleApiAddParty = () => {
    console.log(this.state.parameter)
    if(this.state.parameter.party_facebook_url !== ''){
      const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (reg.test(this.state.parameter.party_facebook_url) === false) {
        this.setState({ facebookUrlVald: true })
      }
     }

     if(this.state.parameter.party_twitter_url !== ''){
      const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (reg.test(this.state.parameter.party_twitter_url) === false) {
        this.setState({ twitterUrlVald: true })
      }
     }

     if(this.state.parameter.party_youtube_url !== ''){
      const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (reg.test(this.state.parameter.party_youtube_url) === false) {
        this.setState({ youtubeUrlVald: true })
      }
     }
    
     if(this.state.parameter.party_instagram_url !== ''){
      const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (reg.test(this.state.parameter.party_instagram_url) === false) {
        this.setState({ instagramUrlVald: true })
      }
     }

     if(this.state.parameter.party_google_url !== ''){
      const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (reg.test(this.state.parameter.party_google_url) === false) {
        this.setState({ googleUrlVald: true })
      }
     }

     if(this.state.parameter.party_linkedin_url !== ''){
      const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (reg.test(this.state.parameter.party_linkedin_url) === false) {
        this.setState({ linkedInUrlVald: true })
      }
     }
     
      setTimeout(() => {
        if(this.state.facebookUrlVald === false && this.state.twitterUrlVald === false && this.state.youtubeUrlVald === false &&
          this.state.instagramUrlVald === false && this.state.googleUrlVald === false && this.state.linkedInUrlVald === false){
            this.setState({addPartyDisabled : true});
            items('POST', this.state.parameter, constants.addParty)
            .then(response => {
              if (response.status === "Success") {
                
                if(response.data !== null) {
      
                  this.setState({ imagePartyId: response.data }, function() {
                    ImageUpload('dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
                    localStorage.getItem('accessToken'), 'political_party',
                    this.state.imagePartyId, this.state.file, constants.imageUpload)
                    .then(response => {
      
                    })
                  })
                  this.setState({addPartyDisabled : false});
                }
                this.props.history.push('/SuccessAdd')
              }
      
                else if(response.status === 'Failure'){
                  this.setState({addPartyDisabled : false});
                  this.setState({ open: true })
                  setTimeout(() =>{
                    this.setState({ open: false })
                  }, 3000)
              }
              else
              {
                this.setState({addPartyDisabled : false});
              }
            })
  
          }
      },10)
     
     

     if(this.state.parameter.party_facebook_url === '' && this.state.parameter.party_twitter_url === '' && this.state.parameter.party_youtube_url === '' &&
     this.state.parameter.party_instagram_url === '' && this.state.parameter.party_google_url === '' && this.state.parameter.party_linkedin_url === '' ){
      items('POST', this.state.parameter, constants.addParty)
      .then(response => {
        if (response.status === "Success") {
          this.setState({addPartyDisabled : true});
          if(response.data !== null) {

            this.setState({ imagePartyId: response.data }, function() {
              ImageUpload('dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
              localStorage.getItem('accessToken'), 'political_party',
              this.state.imagePartyId, this.state.file, constants.imageUpload)
              .then(response => {

              })
            })

          }
          this.props.history.push('/SuccessAdd')
        }

          else if(response.status === 'Failure'){
            this.setState({addPartyDisabled : true});
            this.setState({ open: true })
            setTimeout(() =>{
              this.setState({ open: false })
            }, 3000)
        }
        else
        {
          this.setState({addPartyDisabled : true});
        }
      });
     }
    
    
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {

    const { classes } = this.props;
    const { vertical, horizontal } = this.state;

    return (
      <div className="App userElection">
        <PrimarySearchAppBar />

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink
                to='/AdminHomePage' className="breadCrumbs">Home</NavLink>/<NavLink className="breadCrumbs" to='/AdminPoliticalParties'> Parties </NavLink>/ Add Party</p>
            </Col>
          </Row>
        </Container>

        <Container className="addCandidateContainer mt-5">
          <Row className="tabRowAdmin marginTop60">
            <Col sm={12} xs={12} lg={10} md={12} xl={8} className="tabColAdmin">
              <Card className="tabContainerAdmin" >
                <CardHeader className="headerAdminAdd fontColor darkBackground fontRegular16">ADD PARTY</CardHeader>
                <CardBody className="tabContainerCard">
                  <AppBar position="static" className={`${classes.appBarStyle} mb-3`}>
                    <Tabs value={this.state.value} onChange={this.handleChange}
                      fullWidth={true}
                      scrollButtons="auto"
                      selected={true}
                      classes={{
                        indicator: `${classes.indicator} w-auto`,
                      }}
                    >
                      <Tab label="General Info" className={this.state.value === 0 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={this.state.rippleValue ? false : true}
                      />
                      <Tab label="Purpose Of Party" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}
                      />
                      <Tab label="Contact Details" className={this.state.value === 2 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}
                      />
                    </Tabs>
                  </AppBar>

                  {this.state.value === 0 && <GeneralInfo
                    handlePartyName={this.handlePartyName.bind(this)}
                    handlePartyType={this.handlePartyType.bind(this)}
                    handlePartyCode={this.handlePartyCode}
                    parameter={this.state.parameter}
                    stateParty={this.state.stateParty}
                    partyNameVald={this.state.partyNameVald}
                    specialCharacterPartyName={this.state.specialCharacterPartyName}
                    specialCharacterPartyCode={this.state.specialCharacterPartyCode}
                    partyStatusVald={this.state.partyStatusVald}
                    registrationStateVald={this.state.registrationStateVald}
                    registrationDateVald={this.state.registrationDateVald}
                    presidentVald={this.state.presidentVald}
                    partyActiveVald={this.state.partyActiveVald}
                    handleRegistrationState={this.handleRegistrationState.bind(this)}
                    handleDateChange={this.handleDateChange.bind(this)}
                    startDate={this.state.startDate}
                    valueParty={this.state.valueParty}
                    handlePresidentName={this.handlePresidentName.bind(this)}
                    handlePartyStatus={this.handlePartyStatus.bind(this)}
                    handleGeneralPartyClick={this.handleGeneralPartyClick.bind(this)}
                    fileChangedHandler={this.fileChangedHandler}
                    profilePic={this.profilePic}
                    partyImage={this.state.partyImage}
                    stateOptionArray={this.state.stateOptionArray}
                  />
                  }
                  {this.state.value === 1 && <PurposeOfParty
                    parameter={this.state.parameter}
                    body={this.state.body}
                    partyPurposeVald={this.state.partyPurposeVald}
                    handlePartyPurpose={this.handlePartyPurpose.bind(this)}
                    handlePurposePartyClick={this.handlePurposePartyClick.bind(this)}
                    goToGeneralTab={this.goToGeneralTab.bind(this)}

                  />
                  }
                  {this.state.value === 2 && <ContactDetailsParty
                    parameter={this.state.parameter}
                    handlePartyFacebookUrl={this.handlePartyFacebookUrl.bind(this)}
                    handlePartyTwitterUrl={this.handlePartyTwitterUrl.bind(this)}
                    handlePartyYoutubeUrl={this.handlePartyYoutubeUrl.bind(this)}
                    handlePartyInstagramUrl={this.handlePartyInstagramUrl.bind(this)}
                    handlePartyGoogleUrl={this.handlePartyGoogleUrl.bind(this)}
                    handlePartyLinkedInUrl={this.handlePartyLinkedInUrl.bind(this)}
                    handleCentralOfficeName={this.handleCentralOfficeName.bind(this)}
                    handleOfficeAddress={this.handleOfficeAddress.bind(this)}
                    officeAddressVald={this.state.officeAddressVald}
                    handleOfficeAddressClick={this.handleOfficeAddressClick.bind(this)}
                    officeNameVald={this.state.officeNameVald}
                    handleEmailClick={this.handleEmailClick.bind(this)}
                    invalidEmail={this.state.invalidEmail}
                    invalidWebUrl={this.state.invalidWebUrl}
                    invalidWebUrlNav={this.state.invalidWebUrlNav}
                    handleWebsiteClick={this.handleWebsiteClick}
                    handleWebsiteToggle={this.handleWebsiteToggle}
                    facebookUrlVald={this.state.facebookUrlVald}
                    twitterUrlVald={this.state.twitterUrlVald}
                    youtubeUrlVald={this.state.youtubeUrlVald}
                    instagramUrlVald={this.state.instagramUrlVald}
                    googleUrlVald={this.state.googleUrlVald}
                    linkedInUrlVald={this.state.linkedInUrlVald}
                    contactNumberVald={this.state.contactNumberVald}
                    addPartyDisabled = {this.state.addPartyDisabled}
                    handleContactClick={this.handleContactClick.bind(this)}
                    handleOfficeButton={this.handleOfficeButton.bind(this)}
                    handleWebsiteAddress={this.handleWebsiteAddress.bind(this)}
                    handleEmailAddress={this.handleEmailAddress.bind(this)}
                    handleEmailToggle={this.handleEmailToggle.bind(this)}
                    handleContactNumber={this.handleContactNumber.bind(this)}
                    handleApiAddParty={this.handleApiAddParty.bind(this)}
                    goToPurpose={this.goToPurpose.bind(this)}

                  />
                  }

                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
        <ErrorSnackBar open={this.state.open}
        onClose={this.handleClose}
        anchorOrigin={{ vertical, horizontal }}
        message={this.state.hello}
      />
      </div>
    )
  }
}

AddParty = withRouter(AddParty)
export default withStyles(styles)(AddParty);
