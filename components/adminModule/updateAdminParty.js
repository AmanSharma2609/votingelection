/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : update admin party (parent component)
Purpose   : this page holds the update party tabs as children and all the functions related to those tabs.
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardBody } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import base64 from 'base-64';
import utf8 from 'utf8';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom'
import { constants } from '../../networkCall/constant'
import {items} from '../../networkCall/service.js';
import { withRouter } from 'react-router-dom'

import ErrorSnackBar from '../../networkCall/errorSnackBar'
import { ImageUpload } from '../../networkCall/imageUpload.js'
import PrimarySearchAppBar from './appBar/appBar'
import UpdateGeneralInfo from './UpdatePartyTabs/updategeneralPartyInfo'
import UpdatePurposeOfParty from './UpdatePartyTabs/updatepurposeOfParty'
import UpdateContactDetailsParty from './UpdatePartyTabs/updatecontactDetailsParty'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  tabLabelStyle: {
    textTransform: 'capitalize',
    color: 'black',
    cursor: 'default',
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
    cursor: 'default',
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
  circularLoader: {
    color: '#E18F68'
  },
  link: {
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: '#555555',
    '&:hover':{
      color: '#E18F68'
     }
  },
  activelink: {
    color: '#E18F68',
    '&:hover':{
      color: '#555555'
     }
  }


})

class UpdateParty extends Component {

  state = {
    value: 0,
    stateParty: '',
    startDate: null,
    body: '',
    title: '',
    file: '',
    isLoading: true,
    UpdateNameVald: true,
    UpdateStatusVald: true,
    registrationStateVald: true,
    registrationDateVald: true,
    presidentVald: true,
    UpdateActiveVald: true,
    UpdatePurposeVald: true,
    officeNameVald: true,
    officeAddressVald: true,
    contactNumberVald: true,
    invalidEmail: true,
    valueOfParty: '',
    addPartyDisabled : false,
    facebookUrlVald: false,
    twitterUrlVald : false,
    youtubeUrlVald: false,
    instagramUrlVald: false,
    googleUrlVald: false,
    linkedInUrlVald: false,
    invalidWebUrl: false,
    invalidWebUrlNav: false,
    open: false,
    vertical: 'top',
    horizontal: 'center',
    hello: "Political party with this name already present",
    updateParameter: {
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      party_id: '',
      token_id: 'N1B2YnJmTlU=',
    },
    parameter: {
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      token_id: 'N1B2YnJmTlU=',
      party_id: '',
      party_name: '',
      party_code:'',
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
      party_facebook_url: 'https://',
      party_twitter_url: 'https://',
      party_youtube_url: 'https://',
      party_instagram_url: 'https://',
      party_google_url: 'https://',
      party_linkedin_url: 'https://',
    },

    stateOptionArray : [],
    partyImage : null,

  }
  handleChange = (event, value, index) => {
  
  };
  componentWillMount() {

  }

  componentDidMount() {
    const valueTwo = localStorage.getItem('party_id');
    const value = localStorage.getItem('accessToken');
    const valueFour = localStorage.getItem('profilePartyId')

    this.stateListApi();

    this.setState({ updateParameter: { ...this.state.updateParameter, token_id: value, party_id: valueFour } }, function () {

    })
    this.setState({ parameter: { ...this.state.parameter, party_id: valueFour, token_id: value } }, function () {

    })



    setTimeout(() => {

      const updateData = this.state.updateParameter
      const text = JSON.stringify(updateData)
      const bytes = utf8.encode(text);
      const encodedParameterData = base64.encode(bytes);


      const dataAddParty = {
        "data": encodedParameterData
      }

      fetch('https://devvecapi.apnaneta.com/political_party/return_party_detail', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataAddParty)
      })
        .then(response => response.json())
        .then(response => {

          var reply = response.res
          var reply2 = base64.decode(reply);
          var reply3 = utf8.decode(reply2);
          var obj = JSON.parse(reply3);
          console.log(obj);


          // <----------------------General-Party-default-value-------start------------------>

          this.setState({ parameter: { ...this.state.parameter, party_name: obj.data[0].party_name } })

          this.setState({ parameter:{...this.state.parameter, party_code: obj.data[0].party_code } })
          this.setState({ parameter: { ...this.state.parameter, party_type: obj.data[0].party_type } }, function () {

          })
          if(obj.data[0].party_img_url !== null) {
            this.setState({ partyImage: obj.data[0].party_img_url })
          }


          this.setState({ parameter: { ...this.state.parameter, party_registered_state: obj.data[0].party_registered_state } })

          this.setState({ valueOfParty: obj.data[0].party_registered_state })
          this.setState({ parameter: { ...this.state.parameter, party_year_of_establishment: obj.data[0].party_year_of_establishment } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_chairperson: obj.data[0].party_chairperson } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_status: obj.data[0].party_status } }, function () {

          })

          // <----------------------General-Party-default-value-------end------------------>

          // <-----------------------Party-Purpose-default-value-------start------------------>

          this.setState({
            body: obj.data[0].party_purpose
          })
          this.setState({ parameter: { ...this.state.parameter, party_purpose: obj.data[0].party_purpose } }, function () {

          })
          // <-----------------------Party-Purpose-default-value-------end------------------>

          this.setState({ parameter: { ...this.state.parameter, party_office_name: obj.data[0].party_office_name } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_address: obj.data[0].party_address } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_website: obj.data[0].party_website } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_email: obj.data[0].party_email } }, function () {

          })
          this.setState({ parameter: { ...this.state.parameter, party_phone_number: obj.data[0].party_phone_number } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_facebook_url: obj.data[0].party_facebook_url } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_twitter_url: obj.data[0].party_twitter_url } }, function () {

          })

          this.setState({ parameter: { ...this.state.parameter, party_youtube_url: obj.data[0].party_youtube_url } }, function () {

          })
          this.setState({ parameter: { ...this.state.parameter, party_instagram_url: obj.data[0].party_instagram_url } }, function () {

          })
          this.setState({ parameter: { ...this.state.parameter, party_google_url: obj.data[0].party_google_url } }, function () {

          })
          this.setState({ parameter: { ...this.state.parameter, party_linkedin_url: obj.data[0].party_linkedin_url } }, function () {

          })
          this.setState({ isLoading: false })
        })
    }, 20)

  }

  stateListApi(){
    let requestedData = {
      votingElection_code : 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      token_id : localStorage.getItem('accessToken')
    }
    items('POST', requestedData, constants.viewAllState)
    .then(response => {
      if (response.status === "Success") {

        this.setState({stateOptionArray : response.data});
      }
      else if(response.status==='Failure') {

      }
      else
      {

      }
    });
  }

  // <-------General-Info-Input-Function---------start-------------------------->

  handleUpdatePartyName = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_name: e.target.value } })

    if (e.target.value !== null) {
      this.setState((state) => ({
        UpdateNameVald: true
      }))
    }
  }
  handleUpdatePartyCode = (e) => {
    this.setState({ parameter:{...this.state.parameter, party_code: e.target.value} })
  }
  handleUpdatePartyType = (event) => {
    this.setState({ parameter: { ...this.state.parameter, party_type: event.target.value } }, function () {

    })
    if (event.target.value !== null) {
      this.setState((state) => ({
        UpdateStatusVald: true
      }))
    }
  }
  handleUpdateRegistrationState = (e) => {
    this.setState({ valueOfParty: e.target.value })
    this.setState({ parameter: { ...this.state.parameter, party_registered_state: e.target.value } })

    if (e.target.value !== null) {
      this.setState((state) => ({
        registrationStateVald: true
      }))
    }
  }

  handleUpdateDateChange = (event) => {
    let date = event.target.value;
    if (date !== null) {
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

  handleUpdatePresidentName = (event) => {
    this.setState({ parameter: { ...this.state.parameter, party_chairperson: event.target.value } }, function () {

    })
    if (event.target.value !== null) {
      this.setState((state) => ({
        presidentVald: true
      }))
    }
  }

  handleUpdatePartyStatus = (event) => {
    this.setState({ parameter: { ...this.state.parameter, party_status: event.target.value } }, function () {

    })
    if (event.target.value !== null) {
      this.setState((state) => ({
        UpdateActiveVald: true
      }))
    }
  }

  handleUpdateGeneralPartyClick = () => {

     if (this.state.parameter.party_name.trim() === "") {
      this.setState({ UpdateNameVald: false })
    }
    else if (this.state.parameter.party_name.trim() !== "") {
      this.setState({ UpdateNameVald: true })
    }

    if (this.state.parameter.party_registered_state.trim() === "") {
      this.setState({ registrationStateVald: false })
    }
    else if (this.state.parameter.party_registered_state.trim() !== "") {
      this.setState({ registrationStateVald: true })
    }


    if (this.state.parameter.party_name.trim() !== '' && this.state.parameter.party_registered_state.trim() !== '') {
   this.setState({ value: 1 })
 }
 }
  // <-------General-Info-Input-Function-------end-------------------------->

  // <-------------------Party-Purpose-input-Function--------start----------->

  handleUpdatePartyPurpose = (html, content, delta, source, ) => {
    this.setState({ body: html });

    const inputdatalogin = this.state.body

    this.setState({ parameter: { ...this.state.parameter, party_purpose: inputdatalogin.trim() } }, function () {

    })

    this.setState((state) => ({
      UpdatePurposeVald: true
    }))
  }

  handleUpdatePurposePartyClick = () => {
    this.setState({ value: 2 })
  }
  // <-------------------Party-Purpose-input-Function----------end----------->


  //<-----------------Contact-Details-Office-Adrress-Function----start------>

  handleUpdateCentralOfficeName = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_office_name: e.target.value.trim() } }, function () {

    })
    if(e.target.value !== null){
      this.setState((state) => ({
        officeNameVald: true
      }))
    }
  }
  handleUpdateContactNumber = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_phone_number: e.target.value.trim() } }, function () {

    })
    if(e.target.value !== null){
      this.setState((state) => ({
        contactNumberVald: true
      }))
    }
  }
  handleUpdateEmailAddress = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_email: e.target.value.trim() } }, function () {

    })
    if(e.target.value !== null){
      this.setState((state) => ({
        invalidEmail: true
      }))
  }
}

  handleUpdateOfficeAddress = (e) => {
    this.setState({ parameter: { ...this.state.parameter, party_address: e.target.value.trim() } }, function () {

    })
    if(e.target.value !== null){
      this.setState((state) => ({
        officeAddressVald: true
      }))
    }
  }

  handleUpdateWebsiteAddress = (e) => {
    if(e.target.value !== null){
      this.setState((state) => ({
        invalidWebUrl: false
      }))
      this.setState({ invalidWebUrlNav: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_website: e.target.value.trim() } }, function () {

    })
  }

  handleOfficeButton = () => {
    if(this.state.parameter.party_office_name.trim() !== ""){
      this.setState({ officeNameVald: true })
    }
    else if(this.state.parameter.party_office_name.trim() === ""){
      this.setState({ officeNameVald: false })

    }
  }

  handleOfficeAddressClick = () => {
    if(this.state.parameter.party_address.trim() !== ""){
      this.setState({ officeAddressVald: true })
    }
    else if(this.state.parameter.party_address.trim() === ""){
      this.setState({ officeAddressVald: false })

    }
  }

  handleContactClick = () => {
    if(this.state.parameter.party_phone_number.trim() !== ""){
      this.setState({ contactNumberVald: true })
    }
    else if(this.state.parameter.party_phone_number.trim() === ""){
      this.setState({ contactNumberVald: false });
    }
  }

  handleEmailClick = () =>  {

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
  handleUpdatePartyFacebookUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ facebookUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_facebook_url: e.target.value.trim() } }, function () {

    })
  }
  handleUpdatePartyTwitterUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ twitterUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_twitter_url: e.target.value.trim() } }, function () {

    })
  }
  handleUpdatePartyYoutubeUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ youtubeUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_youtube_url: e.target.value.trim() } }, function () {

    })
  }
  handleUpdatePartyInstagramUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ instagramUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_instagram_url: e.target.value.trim() } }, function () {

    })
  }
  handleUpdatePartyGoogleUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ googleUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_google_url: e.target.value.trim() } }, function () {

    })
  }
  handleUpdatePartyLinkedInUrl = (e) => {
    if(e.target.value !== null) {
      this.setState({ linkedInUrlVald: false })
    }
    this.setState({ parameter: { ...this.state.parameter, party_linkedin_url: e.target.value.trim() } }, function () {

    })

  }
  //<-------------------Contact-Details-Social-Adrress-Function-----------end--->

  // <------------------AddParty-Api-Call--------------------->

  handleUpdateApiAddParty = () => {
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
          this.setState({addPartyDisabled : true})

          const parameterData = this.state.parameter
          const text = JSON.stringify(parameterData)
          const bytes = utf8.encode(text);
          const encodedParameterData = base64.encode(bytes);
      
      
          const dataAddParty = {
            "data": encodedParameterData
          }
          fetch('https://devvecapi.apnaneta.com/political_party/update_party', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAddParty)
          })
            .then(response => response.json())
            .then(response => {
      
              ImageUpload('dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
              localStorage.getItem('accessToken'), 'political_party', localStorage.getItem('profilePartyId'), this.state.file, constants.imageUpload)
              .then(response => {
                
              })
      
              var reply = response.res
              var reply2 = base64.decode(reply);
              var reply3 = utf8.decode(reply2);
              var obj = JSON.parse(reply3);
              console.log(obj)
              if(obj.status === 'Success'){
                
                this.setState({addPartyDisabled : false})
                this.props.history.push('/SuccessUpdate')
              }
              else
              {
                this.setState({ open: true })
                  setTimeout(() =>{
                    this.setState({ open: false })
                  }, 3000)
                this.setState({addPartyDisabled : false})

              }
            })
        }
     },10)
   
  }


  handlePartyPurpose = () => {

    this.setState({ value: 0 })
  }
  handleToPurpose = () => {
    this.setState({ value: 1 })
  }

  fileChangedHandler = (event) => {
    var reader = new FileReader();
    reader.onload = this.profilePic.bind(this);
    this.profilePic.bind(this)
    reader.readAsBinaryString(event.target.files[0]);
    this.setState({ file: event.target.files[0] })


  }
  profilePic(readerEvt) {
    var binaryString = readerEvt.target.result;
    let filestring = btoa(binaryString);  // Converting binary string data.
    this.setState({ partyImage: 'data:image/jpeg;base64,' + filestring }, function() {

    });
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
            to='/AdminHomePage' className="breadCrumbs">Home</NavLink> / <NavLink className="breadCrumbs" to='/AdminPoliticalParties'> Parties</NavLink> / Update Party</p>            </Col>
          </Row>
        </Container>
        <ErrorSnackBar open={this.state.open}
        onClose={this.handleClose}
        anchorOrigin={{ vertical, horizontal }}
        message={this.state.hello}
      />

        <Container className="addCandidateContainer mt-5">
          <Row className="tabRowAdmin marginTop60">
            {this.state.isLoading === true ? <CircularProgress className={classes.circularLoader}/> :
              <Col sm={12} xs={12} lg={10} md={12} xl={8} className="tabColAdmin">
                <Card className="tabContainerAdmin" >
                  <CardHeader className="headerAdminAdd fontColor darkBackground fontRegular16">UPDATE PARTY</CardHeader>
                  <CardBody className="tabContainerCard">
                    <AppBar position="static" className={`${classes.appBarStyle}  mb-3`}>
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
                          disableRipple={true}
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
                    {this.state.value === 0 && <UpdateGeneralInfo
                      handleUpdatePartyName={this.handleUpdatePartyName.bind(this)}
                      handleUpdatePartyType={this.handleUpdatePartyType.bind(this)}
                      parameter={this.state.parameter}
                      handleUpdatePartyCode={this.handleUpdatePartyCode}
                      partyImage={this.state.partyImage}
                      fileChangedHandler={this.fileChangedHandler}
                      profilePic={this.profilePic}
                      stateOptionArray={this.state.stateOptionArray}
                      UpdateNameVald={this.state.UpdateNameVald}
                      valueOfParty={this.state.valueOfParty}
                      UpdateStatusVald={this.state.UpdateStatusVald}
                      registrationStateVald={this.state.registrationStateVald}
                      registrationDateVald={this.state.registrationDateVald}
                      presidentVald={this.state.presidentVald}
                      UpdateActiveVald={this.state.UpdateActiveVald}
                      stateParty={this.state.stateParty}
                      handleUpdateRegistrationState={this.handleUpdateRegistrationState.bind(this)}
                      handleUpdateDateChange={this.handleUpdateDateChange.bind(this)}
                      startDate={this.state.startDate}
                      handleUpdatePresidentName={this.handleUpdatePresidentName.bind(this)}
                      handleUpdatePartyStatus={this.handleUpdatePartyStatus.bind(this)}
                      handleUpdateGeneralPartyClick={this.handleUpdateGeneralPartyClick.bind(this)}
                    />
                    }
                    {this.state.value === 1 && <UpdatePurposeOfParty
                      parameter={this.state.parameter}
                      body={this.state.body}
                      handlePartyPurpose={this.handlePartyPurpose}
                      UpdatePurposeVald={this.state.UpdatePurposeVald}
                      handleUpdatePartyPurpose={this.handleUpdatePartyPurpose.bind(this)}
                      handleUpdatePurposePartyClick={this.handleUpdatePurposePartyClick.bind(this)}

                    />
                    }
                    {this.state.value === 2 && <UpdateContactDetailsParty
                      parameter={this.state.parameter}
                      handleUpdatePartyFacebookUrl={this.handleUpdatePartyFacebookUrl.bind(this)}
                      handleUpdatePartyTwitterUrl={this.handleUpdatePartyTwitterUrl.bind(this)}
                      handleUpdatePartyYoutubeUrl={this.handleUpdatePartyYoutubeUrl.bind(this)}
                      handleUpdatePartyInstagramUrl={this.handleUpdatePartyInstagramUrl.bind(this)}
                      handleUpdatePartyGoogleUrl={this.handleUpdatePartyGoogleUrl.bind(this)}
                      handleUpdatePartyLinkedInUrl={this.handleUpdatePartyLinkedInUrl.bind(this)}
                      handleUpdateCentralOfficeName={this.handleUpdateCentralOfficeName.bind(this)}
                      handleToPurpose={this.handleToPurpose}
                      officeNameVald={this.state.officeNameVald}
                      addPartyDisabled = {this.state.addPartyDisabled}
                      officeAddressVald={this.state.officeAddressVald}
                      contactNumberVald={this.state.contactNumberVald}
                      invalidEmail={this.state.invalidEmail}
                      facebookUrlVald={this.state.facebookUrlVald}
                      twitterUrlVald={this.state.twitterUrlVald}
                      youtubeUrlVald={this.state.youtubeUrlVald}
                      instagramUrlVald={this.state.instagramUrlVald}
                      googleUrlVald={this.state.googleUrlVald}
                      linkedInUrlVald={this.state.linkedInUrlVald}
                      invalidWebUrlNav={this.state.invalidWebUrlNav}
                      invalidWebUrl={this.state.invalidWebUrl}
                      handleWebsiteClick={this.handleWebsiteClick}
                      handleWebsiteToggle={this.handleWebsiteToggle}
                      handleEmailClick={this.handleEmailClick}
                      handleEmailToggle={this.handleEmailToggle}
                      handleOfficeButton={this.handleOfficeButton}
                      handleContactClick={this.handleContactClick}
                      handleOfficeAddressClick={this.handleOfficeAddressClick}
                      handleUpdateOfficeAddress={this.handleUpdateOfficeAddress.bind(this)}
                      handleUpdateWebsiteAddress={this.handleUpdateWebsiteAddress.bind(this)}
                      handleUpdateEmailAddress={this.handleUpdateEmailAddress.bind(this)}
                      handleUpdateContactNumber={this.handleUpdateContactNumber.bind(this)}
                      handleUpdateApiAddParty={this.handleUpdateApiAddParty.bind(this)}
                    />
                    }

                  </CardBody>
                </Card>
              </Col>
            }
          </Row>

        </Container>
      </div>
    )
  }
}
UpdateParty = withRouter(UpdateParty)
export default withStyles(styles)(UpdateParty);
