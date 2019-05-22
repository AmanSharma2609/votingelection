/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateAdmin - Parent component of tabs.
Purpose   : Add candidates assets and liability having all the function related to the tabs.
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardBody } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "react-datepicker/dist/react-datepicker.css";
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import ErrorSnackBar from '../../networkCall/errorSnackBar.js'
import { withRouter } from 'react-router-dom'
import { ImageUpload } from '../../networkCall/imageUpload.js'


import PrimarySearchAppBar from './appBar/appBar';
import BasicDetails from './addCandidateTabs/basicDetails';
import GeneralInfo from './addCandidateTabs/generalInfo';
import OtherInfo from './addCandidateTabs/otherInfo';
import { NavLink } from 'react-router-dom';
import CriminalRecord from './addCandidateTabs/criminalRecord';
import ContactDetails from './addCandidateTabs/contactDetails';
import AssetsLiabilities from './addCandidateTabs/assetsLiabilities';
import produce from "immer"



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


});

const i = 0

class AddCandidateAdmin extends Component {

  state = {
    value: 0,
    candidateImage: null,
    string: null,
    newValue: '',
    file: null,
    genderFemale: 'Female',
    genderMale: 'Male',
    genderOther: 'Other',
    checkedA: 'Female',
    checkedB: false,
    checkedF: false,
    startDate: null,
    candNameVald: false,
    candVoterName: false,
    candRelName: false,
    candGender: false,
    candDob: false,
    candParty: false,
    candInfo: false,
    candProf: false,
    candEdu: false,
    candInteres: false,
    candRelView: false,
    candAwards: false,
    candLegis: false,
    criminalVald: false,
    candHomeT: false,
    candEmail: false,
    candInvalidEmail: false,
    candPhone: false,
    candCurrentAdd: false,
    partyOptionArray: [],
    emptyCriminal: [],
    valueParty: "",
    body: '',
    eduArray: [],
    awards: [''],
    legislature: [''],
    education: [''],
    movableAssets: [],
    newMovableAssets: [
      {'label': 'Cash', 'symbol' : 'CASH'},
      {'label': 'Deposits in Banks, Financial Institutions and Non-Banking Financial Companies ', 'symbol' : 'DEPOSIT'},
      {'label': 'Bonds, Debentures and Shares in companies ', 'symbol' : 'BONDS_SHARE'},
      {'label': 'NSS, Postal Savings etc', 'symbol' : 'NSS'},
      {'label': 'LIC or other insurance Policies', 'symbol' : 'LIC'},
      {'label': 'Motor Vehicles (details of make, etc.)', 'symbol' : 'VEHICLES'},
      {'label': 'Personal loans/advance given', 'symbol' : 'PERSONAL_LOAN'},
      {'label': 'Jewellery (give details weight value)', 'symbol' : 'JEWELLARY'},
      {'label': 'Other assets, such as values of claims / interests', 'symbol' : 'OTHER_ASSETS'},
     ],
    immovableAssets:  [
      {'label': 'Agricultural Land', 'symbol' : 'AGRI_LAND'},
      {'label': 'Non Agricultural Land', 'symbol' : 'NON_AGRI_LAND'},
      {'label': 'Commercial Buildings', 'symbol' : 'COMM_BUILDING'},
      {'label': 'Residential Buildings', 'symbol' : 'RESI_BUILDING'},
      {'label': 'Others', 'symbol' : 'OTHERS'},
  ],
    liability: [
      {'label': 'Loans from Banks / FIs', 'symbol' : 'BANK_LOAN'},
      {'label': 'Loans due to Individual / Entity', 'symbol' : 'NETITY_LOAN'},
      {'label': 'Any other Liability', 'symbol' : 'OTHER_LIABILITY'},
      {'label': 'Grand Total of Liabilities (as per affidavit)', 'symbol' : 'GRAND_TOTAL_LIABILITY'},
      {'label': 'Dues to departments dealing with government accommodation', 'symbol' : 'DUE_GOV'},
      {'label': 'Dues to departments dealing with supply of water', 'symbol' : 'DUE_WATER'},
      {'label': 'Dues to departments dealing with supply of electricity', 'symbol': 'DUE_ELECTRICITY'},
      {'label': 'Dues to departments dealing with telephones', 'symbol' : 'DUE_TELEPHONE'},
      {'label': 'Dues to departments dealing with supply of transport', 'symbol' : 'DUE_TRANSPORT'},
      {'label': 'Wealth Tax Dues', 'symbol' : 'DUE_WEALTH_TAX'},
      {'label': 'Service Tax Dues', 'symbol' : 'DUE_SERVICE_TAX'},
      {'label': 'Income Tax Dues', 'symbol' : 'DUE_ICNOME_TAX'},
      {'label': 'Property Tax Dues', 'symbol' : 'DUE_PROPERTY_TAX'},
      {'label': 'Sales Tax Dues', 'symbol' : 'DUE_SALES_TAX'},
      {'label': 'Any Other Dues', 'symbol' : 'OTHER_DUES'},
      {'label': 'Grand Total of all Govt Dues (as per affidavit)', 'symbol' : 'GRAND_TOTAL_DUES'},
      {'label': 'Whether any other liabilities are in dispute, if so, mention the amount involved and the authority before which it is pending', 'symbol' : 'DISPUTE_LIABILITY'},
  ],
    
    assets: [{
       assetTab:0,
      'asset_type': '',
      'asset_name': '',
      'asset_range': '',
      'asset_desc': [],
      'data': [{
        'asset_self': [{
          'self_amount': '',
          'self_desc': ''
        }],
        'asset_spouse': [{
          'spouse_amount': '',
          'spouse_desc': ''
        }],
        'asset_depend1': [{
          'depend1_amount': '',
          'depend1_desc': ''
        }],
        'asset_depend2': [{
          'depend2_amount': '',
          'depend2_desc': ''
        }],
        'asset_depend3': [{
          'depend3_amount': '',
          'depend3_desc': ''
        }]
      }],
      'flag': 1
    }],

    partyList: {
      votingElection_code: constants.votingElectionCode,
      type:'admin'
    },
    addCandidateParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: "",
      candidate_name: "",
      candidate_relation: "D/O",
      candidate_relation_name: "",
      candidate_date_of_birth: "",
      candidate_gender: "",
      candidate_email: "",
      candidate_phone_no: "",
      candidate_address: "",
      candidate_name_as_voter: "",
      candidate_party_id: "",
      candidate_profession: "",
      candidate_home_town: "",
      candidate_about: "",
      candidate_awards: "",
      candidate_interests: "",
      candidate_religious_view: "",
      candidate_filed_itr: "",
      candidate_legislature: "",
      candidate_education_record: '',
      candidate_criminal_record: [{ 'criminal_ipc': '', 'criminal_record_desc': '', 'criminal_record_type': '' }],
      candidate_assets: [],
    },
    openAssetError: false,
    vertical: 'top',
    horizontal: 'center',
    errorMsgAsset: "Self amount cannot be empty",
    addCandidateDisabled : false,
    whiteSpacesMsg:'No white spaces allowed',
    openWhiteSpaces: false,
  }
  componentDidMount() {
    let value = localStorage.getItem('accessToken');
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, token_id: value } }, function () {
    })
    items('POST', this.state.partyList, constants.getPartiesList)
      .then(response => {
        this.setState({ partyOptionArray: response.data })
        const temp = localStorage.getItem('candidatePartyName')
        if (temp === null && undefined)
          this.setState({ valueParty: response.data[0].party_name }, function () {
          })
      })
    const candName = localStorage.getItem('candidateName')
    const candVoterName = localStorage.getItem('candidateVoterName')
    const candRelation = localStorage.getItem('candidateRelation')
    const candRelationName = localStorage.getItem('candidateRelationName')
    const dOB = localStorage.getItem('candidateDOB')
    const gender = localStorage.getItem("candidateGender")
    const partyName = localStorage.getItem('candidatePartyName')
    const eduArray = JSON.parse(localStorage.getItem('eduArray'));
    const awardsArray = JSON.parse(localStorage.getItem('awardsArray'))
    const legislatureArray = JSON.parse(localStorage.getItem('legislatureArray'))
    const criminalLocalArray = JSON.parse(localStorage.getItem('criminalArray'))
    const candProf = localStorage.getItem("candProf")
    const candDesc = localStorage.getItem("candDesc")
    const candInterest = localStorage.getItem("candInterest")
    const candRelView = localStorage.getItem("candRelView")
    if (candName !== null || undefined) {
      this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_name: candName } }, function () {
      })
    }

    this.setState({ valueParty: partyName })
    if (eduArray !== null || undefined) {

      this.setState({ education: eduArray })
    }
    if (awardsArray !== null || undefined) {

      this.setState({ awards: awardsArray })
    }
    if (legislatureArray !== null || undefined) {
      this.setState({ legislature: legislatureArray })
    }

    if (criminalLocalArray !== null || undefined) {
      this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_criminal_record: criminalLocalArray } }, function () {
     
      })
    }

    if (candProf !== null || undefined) {
      this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_profession: candProf } })
    }
    if (candDesc !== null || undefined) {
      this.setState({ body: candDesc })
    }
    if (candInterest !== null || undefined) {
      this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_interests: candInterest } })
    }
    if (candRelView !== null || undefined) {
      this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_religious_view: candRelView } })
    }

  }
  handleButtonClick() {
    console.log(this.state.addCandidateParameter)
    if (this.state.addCandidateParameter.candidate_name === null) {
      this.setState({ candNameVald: true })
    }
    else if (this.state.addCandidateParameter.candidate_name.trim() === "") {
      this.setState({ candNameVald: true })
    }

    if (this.state.addCandidateParameter.candidate_relation_name === null) {
      this.setState({ candRelName: true })
    }

    else if (this.state.addCandidateParameter.candidate_relation_name.trim() === "") {
      this.setState({ candRelName: true })
    }


    if (this.state.valueParty === null) {
      this.setState({ candParty: true })
    }
    else if (this.state.valueParty === "") {
      this.setState({ candParty: true })
    }

    else if (this.state.addCandidateParameter.candidate_name.trim() &&
      this.state.addCandidateParameter.candidate_relation &&
      this.state.addCandidateParameter.candidate_relation_name.trim() &&
      this.state.valueParty !== "") {
      this.setState({ value: 1 })
    }
  }

  // <--------------------basicDetail------------start--------------->

  handleCandidateName(e) {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_name: e.target.value } },
      function () {
        
      })
    if (e.target.value !== null) {
      this.setState({ candNameVald: false })

    }
  }
  handleNameAsVoterId = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_name_as_voter: e.target.value } },
      function () {
      })
    if (e.target.value !== null) {
      this.setState({ candVoterName: false })
    }
  }
  handleRelation = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_relation: e.target.value } },
      function () {
      })
  }
  handleRelationName = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_relation_name: e.target.value } },
      function () {
      })
    if (e.target.value !== null) {
      this.setState({ candRelName: false })
    }
  }

  handleDateOfBirth = (event) => {
    let date = event.target.value;
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_date_of_birth: date } }, function () {

      if (this.state.addCandidateParameter.candidate_date_of_birth !== null) {
        this.setState({ candDob: false })
      }
    })

  }
  handleGenderChange = (event) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_gender: event.target.value } }, function () {
    })
    if (event.target.value !== null) {
      this.setState({ candGender: false })
    }
  }

  handleChangeSelect = (event) => {
    this.setState({ valueParty: event.target.value }, function () {

      const temp = this.searchFunction(this.state.partyOptionArray, "party_name", this.state.valueParty)
      this.setState({
        addCandidateParameter: {
          ...this.state.addCandidateParameter,
          candidate_party_id: temp.party_id
        }
      }, function () {
      })

    });
    if (event.target.value !== null) {
      this.setState({ candParty: false })

    }
  }
  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }


  handleBasicDetail = () => {

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
    this.setState({ candidateImage: 'data:image/jpeg;base64,' + filestring });
  }
  
  // <--------------------basicDetail------------end--------------->

  // <-----------------------general-infor-start--------------------------->

  handleEditor = (html, content, delta, editor, source) => {
    this.setState({ body: html });
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_about: this.state.body } }, function () {
      if (this.state.body !== null) {
        this.setState({ candInfo: false })
      }
    })

  }
  handleSelfPro = (event) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_profession: event.target.value } }, function () {
    })
    if (event.target.value !== null) {
      this.setState({ candProf: false })
    }
  }
  handleEducation = (event, index) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_education_record: event.target.value } }, function () {

    })
  }
  handleEducation = (index) => (evt) => {
    this.state.education[index] = evt.target.value;

    if (evt.target.value !== null) {
      this.setState({ candEdu: false })
    }

    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_education_record: this.state.education.join(',') } }, function () {


    })



  }
  handleAddShareholder = () => {
    this.state.education.push("")
    this.setState({ education: this.state.education })
  }


  handleRemoveShareholder = (index) => () => {
    this.setState({
      education: this.state.education.filter((_, i) => i !== index)
    });
  }
  emptyEducation = () => {
    let isError = false;
   if(this.state.education[0] !== ''){
    for(let i= 0 ; i<this.state.education.length ; i++){
      if(this.state.education[i].trim() ===''){

        isError = true
      }
    }
   }
    if(this.state.addCandidateParameter.candidate_profession !== ''){
      if(this.state.addCandidateParameter.candidate_profession.trim() ==='' ){
        isError = true
      }
    }
    
    return isError
  }


  handleGeneralClick = () => {
   
    console.log('check this' ,this.state.addCandidateParameter.candidate_profession, this.state.education)
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_education_record: this.state.education.join(', ') } }, function () {

    })
   
    const check = this.emptyEducation()

    if(check === true){
     
      this.setState({ openWhiteSpaces: true })
      setTimeout(() => {
        this.setState({ openWhiteSpaces: false })
      },2000)
    }
    else{
      this.setState({ value: 2 })
    }
  }


  // <-----------------------general-infor-end--------------------------->

  // <-----------------other-info-start------------------>

  handleInterests = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_interests: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ candInteres: false })
    }
  }
  handleReligiousView = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_religious_view: e.target.value } })
    if (e.target.value !== null) {
      this.setState({ candRelView: false })
    }
  }
  handleAwards = (index) => (evt) => {
    this.state.awards[index] = evt.target.value;
    if (evt.target.value !== "") {
      this.setState({ candAwards: false })
    }
    this.setState({ awards: this.state.awards });
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_awards: this.state.awards.join(',') } }, function () {
    })
  }
  handleLegislature = (index) => (evt) => {
    this.state.legislature[index] = evt.target.value;
    if (evt.target.value !== "") {
      this.setState({ candLegis: false })
    }
    this.setState({ legislature: this.state.legislature });
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_legislature: this.state.legislature.join(', ') } }, function () {
    })
  }
  addAwards = () => {

    this.state.awards.push("")
    this.setState({ awards: this.state.awards })
  }

  addLegislature = () => {
    this.state.legislature.push("")
    this.setState({ legislature: this.state.legislature })
  }

  removeAwards = (index) => {
    this.setState({
      awards: this.state.awards.filter((_, i) => i !== index)
    });

  }

  removeLegislature = (index) => {
    this.setState({
      legislature: this.state.legislature.filter((_, i) => i !== index)
    });
  }
  emptyOtherInfo = () => {
    let isError =  false
    if(this.state.addCandidateParameter.candidate_interests !==''){
      if(this.state.addCandidateParameter.candidate_interests.trim() === ''){
        isError = true
      }
    }
    if(this.state.addCandidateParameter.candidate_religious_view !== ''){
      if(this.state.addCandidateParameter.candidate_religious_view.trim() === ''){
        isError = true
      }
    }
    if(this.state.awards[0] !== ''){
      for(let i= 0 ; i<this.state.awards.length ; i++){
        if(this.state.awards[i].trim() ===''){
  
          isError = true
        }
      }
    }   
    if(this.state.legislature[0] !== ''){
      for(let i= 0 ; i<this.state.legislature.length ; i++){
        if(this.state.legislature[i].trim() ===''){
  
          isError = true
        }
      }
    }   
    return isError 
  }

  handleOtherInfoClick = () => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_awards: this.state.awards.join(',') } }, function () {

    })
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_legislature: this.state.legislature.join(',') } }, function () {

    })
    const check = this.emptyOtherInfo()
    if(check === true){
      
      this.setState({ openWhiteSpaces: true })
      setTimeout(() => {
        this.setState({ openWhiteSpaces: false })
      },2000)
    }
    else{
      this.setState({ value: 3 })
    }
    


  }

  // <-----------------other-info-end------------------>

  // <-------------------------contact-details-start ------------------------>
  handleHometown = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_home_town: e.target.value } }, function () {
    })
    if (e.target.value !== null) {
      this.setState({ candHomeT: false })
    }
  }
  handleCandEmail = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_email: e.target.value } }, function () {
    })
    if (e.target.value !== null) {
      this.setState({ candEmail: false })
      this.setState({ candInvalidEmail: false })

    }
  }
  handlePhoneNumber = (e) => {
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_phone_no: e.target.value } }, function () {
    })
    if (e.target.value !== null) {
      this.setState({ candPhone: false })
    }
  }
  handleCurrentAddress = (e) => {

    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_address: e.target.value } }, function () {
    })
    if (e.target.value !== null) {
      this.setState({ candCurrentAdd: false })
    }
  }

  // <-------------------------contact-details-end ------------------------>

  // <-------------------Criminal-Records-Start----------------------------------->
  handleIpcSection = (index) => (evt) => {
    this.state.addCandidateParameter.candidate_criminal_record[index].criminal_ipc = evt.target.value;
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_criminal_record: this.state.addCandidateParameter.candidate_criminal_record } }, function () {
    })
  }
  handleCheckboxChange = (index) => (evt) => {
  
    this.state.addCandidateParameter.candidate_criminal_record[index].criminal_record_type = evt.target.value;
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_criminal_record: this.state.addCandidateParameter.candidate_criminal_record } }, function () {
    })
  }
  handleOtherDetail = (index) => (evt) => {
    this.state.addCandidateParameter.candidate_criminal_record[index].criminal_record_desc = evt.target.value;
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_criminal_record: this.state.addCandidateParameter.candidate_criminal_record } }, function () {
    })
  }
  addCriminalRecord = (item, index) => {
    this.state.addCandidateParameter.candidate_criminal_record.push({ criminal_record_desc: '', criminal_ipc: "", criminal_record_type: '' });
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_criminal_record: this.state.addCandidateParameter.candidate_criminal_record } });
  }

  removeCriminal = (index) => {
    this.state.addCandidateParameter.candidate_criminal_record.splice(index , 1);
    this.setState({addCandidateParameter : this.state.addCandidateParameter});
  }

  handleCriminalNext = () => {
   
    if (this.state.addCandidateParameter.candidate_criminal_record[0].criminal_ipc === "" &&
      this.state.addCandidateParameter.candidate_criminal_record[0].criminal_record_desc === "" &&
      this.state.addCandidateParameter.candidate_criminal_record[0].criminal_record_type === ""
    ) {

      this.setState({ criminalVald: false })
      this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_criminal_record: this.state.addCandidateParameter.candidate_criminal_record } })

    }
    else if (this.state.addCandidateParameter.candidate_criminal_record) {
      for (let i = 0; i < this.state.addCandidateParameter.candidate_criminal_record.length; i++) {
        if (this.state.addCandidateParameter.candidate_criminal_record[i].criminal_ipc.trim() === "") {
          this.setState({ criminalVald: true })
        }
        if (this.state.addCandidateParameter.candidate_criminal_record[i].criminal_record_desc.trim() === "") {
          this.setState({ criminalVald: true })
        }
        if (this.state.addCandidateParameter.candidate_criminal_record[i].criminal_record_type.trim() === "") {
          this.setState({ criminalVald: true })
        }
      }
    }
    if (this.state.addCandidateParameter.candidate_criminal_record) {
      for (let i = 0; i < this.state.addCandidateParameter.candidate_criminal_record.length; i++) {
        if (this.state.addCandidateParameter.candidate_criminal_record[i].criminal_ipc.trim() !== "" &&
          this.state.addCandidateParameter.candidate_criminal_record[i].criminal_record_desc.trim() !== "" &&
          this.state.addCandidateParameter.candidate_criminal_record[i].criminal_record_type.trim() !== "") {
          this.setState({ criminalVald: false })
        }
      }
    }

    setTimeout(() => {

      if (this.state.criminalVald === false) {
        this.setState({ value: 5 })
      }
    }, 10)
  }
  // <-------------------Criminal-Records-end----------------------------------->

  // <---------------------assets and liabilities--------------------start--------->
  removeAssets = (indx) => {
    this.setState({
      assets: this.state.assets.filter((_, i) => i !== indx)
    });
  }
  assetsHide = (indx) => {

    let temp = this.state.assets[indx].flag = 0;

    this.setState({
      assets: this.state.assets
    });
  }
  assetsShow = (indx) => {

    let temp = this.state.assets[indx].flag = 1;

    this.setState({
      assets: this.state.assets
    });
  }
  addMore = (index,indices) => {
    let form1 = { 'self_amount': '', 'self_desc': '' }
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_self.push(form1)
    }))
  }
  addMoreSpouse = (index, indices) => {
    let form = { 'spouse_amount': '', 'spouse_desc': '' }
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_spouse.push(form)
    }), function () {
    })
  }
  addMoreDep1 = (index, indices) => {
    let form = { 'depend1_amount': '', 'depend1_desc': '' }
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend1.push(form)
    }), function () {
    })
  }
  addMoreDep2 = (index, indices) => {
    let form = { 'depend2_amount': '', 'depend2_desc': '' }
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend2.push(form)
    }), function () {
    })
  }
  addMoreDep3 = (index, indices) => {
    let form = { 'depend3_amount': '', 'depend3_desc': '' }
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend3.push(form)
    }), function () {
    })
  }
  removeData = (indices, index, selfIndex) => {
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_self.splice(selfIndex, 1)
    }), function () {

    })
  }
  removeSpouseData = (indices, index, spouseIndex) => {
   
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_spouse.splice(spouseIndex, 1)
    }), function () {
    })
  }
  removeDep_1Data = (indices, index, dep1Index) => {
   
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend1.splice(dep1Index, 1)
    }), function () {
    })
  }
  removeDep_2Data = (indices, index, dep2Index) => {
   
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend2.splice(dep2Index, 1)
    }), function () {
    })

  }
  removeDep_3Data = (indices, index, dep3Index) => {
   
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend3.splice(dep3Index, 1)
    }), function () {
    })
  }

  addAssets = (event, index) => {

    this.setState({
      assets: [
        ...this.state.assets, {
           assetTab:0,
          'asset_type': '',
          'asset_name': '',
          'asset_range': '',
          'asset_desc': [],
          'data': [{
            'asset_self': [{
              'self_amount': '',
              'self_desc': ''
            }],
            'asset_spouse': [{
              'spouse_amount': '',
              'spouse_desc': ''
            }],
            'asset_depend1': [{
              'depend1_amount': '',
              'depend1_desc': ''
            }],
            'asset_depend2': [{
              'depend2_amount': '',
              'depend2_desc': ''
            }],
            'asset_depend3': [{
              'depend3_amount': '',
              'depend3_desc': ''
            }]
          }],
          'flag': 1
        }
      ]
    })
  }
  // <---------------onChangeData-----------start-------------------------------------->
  handleAssetType = (index) => (e) => {

    const valueAssetType = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].asset_type = valueAssetType
    }), function () {
      if (this.state.assets[index].asset_type === "Immovable Assets") {
        this.setState(produce((draft) => {
          draft.assets[index].asset_desc = this.state.immovableAssets
        }), function () {
        })
      }
      else if (this.state.assets[index].asset_type === "Movable Assets") {
        this.setState(produce((draft) => {
          draft.assets[index].asset_desc = this.state.newMovableAssets
        }), function () {
        })
      }
      else if (this.state.assets[index].asset_type === "Liability") {
        this.setState(produce((draft) => {
          draft.assets[index].asset_desc = this.state.liability
        }), function () {
        })
      }
    })
  }
  handleAssetDesc = (index) => (e) => {
    const assetName = e.target.value;
    this.setState(produce((draft) => {
      draft.assets[index].asset_name = assetName
    }), function () {

    })

  }

  handleDescSelf = (index, indices, selfIndex) => (e) => {
    const valueSelf = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_self[selfIndex].self_desc = valueSelf
    }), function () {
    })
  }
  handleAmtSelf = (index, indices, selfIndex) => (e) => {
    const valueSelfAmt = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_self[selfIndex].self_amount = valueSelfAmt
    }), function () {
    })

  }
  handleDescSpouse = (index, indices, spouseIndex) => (e) => {
    const descSpouse = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_spouse[spouseIndex].spouse_desc = descSpouse
    }), function () {
    })
  }
  handleAmtSpouse = (index, indices, spouseIndex) => (e) => {
    const amtSpouse = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_spouse[spouseIndex].spouse_amount = amtSpouse
    }), function () {
    })
  }
  handleDescDep1 = (index, indices, dep1Index) => (e) => {
    const descDep1 = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend1[dep1Index].depend1_desc = descDep1
    }), function () {
    })
  }
  handleAmtDep1 = (index, indices, dep1Index) => (e) => {
    const amtDep1 = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend1[dep1Index].depend1_amount = amtDep1
    }), function () {
    })
  }
  handleDescDep2 = (index, indices, dep2Index) => (e) => {
    const descDep2 = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend2[dep2Index].depend2_desc = descDep2
    }), function () {
    })
  }
  handleAmtDep2 = (index, indices, dep2Index) => (e) => {
    const amtDep2 = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend2[dep2Index].depend2_amount = amtDep2
    }), function () {
    })
  }
  handleDescDep3 = (index, indices, dep3Index) => (e) => {
  
    const descDep3 = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend3[dep3Index].depend3_desc = descDep3
    }), function () {

    })
  }
  handleAmtDep3 = (index, indices, dep3Index) => (e) => {
    const amtDep3 = e.target.value
    this.setState(produce((draft) => {
      draft.assets[index].data[indices].asset_depend3[dep3Index].depend3_amount = amtDep3
    }), function () {

    })
  }
  // <---------------onChangeData-----------end-------------------------------------->
  handleChangeAssetIndex = (index) =>(event, value) => {
    
    this.setState(produce((draft) => {
      draft.assets[index].assetTab = value
    }), function () {

    })
  }

  handleAssetNextClick = () => {
  
     this.setState({ value: 4 })
  }

  
  // <---------------------assets and liabilities--------------------end--------->

  // <--------------------handle=Contact-Vald-and-add-candidate-------start---------->
  handleAddCandidate = () => {
    
    this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_assets: this.state.assets } }, function () {
      let arr = [];
      for (let i = 0; i < this.state.assets.length; i++) {
        let temp = {
          "asset_range": "",
          "asset_name": "",
          "asset_type": "",
          "asset_self": [],
          "asset_spouse": [],
          "asset_depend1": [],
          "asset_depend2": [],
          "asset_depend3": []
        }

        temp.asset_name = this.state.assets[i].asset_name
        temp.asset_type = this.state.assets[i].asset_type
        temp.asset_self = this.state.assets[i].data[0].asset_self
        temp.asset_spouse = this.state.assets[i].data[0].asset_spouse
        temp.asset_depend1 = this.state.assets[i].data[0].asset_depend1
        temp.asset_depend2 = this.state.assets[i].data[0].asset_depend2
        temp.asset_depend3 = this.state.assets[i].data[0].asset_depend3

        const selfRange = temp.asset_self.length
        const spouseRange = temp.asset_spouse.length
        const dep1Range = temp.asset_depend1.length
        const dep2Range = temp.asset_depend2.length
        const dep3Range = temp.asset_depend3.length
        const maxRange = Math.max(selfRange, spouseRange, dep1Range, dep2Range, dep3Range)
        temp.asset_range = maxRange
        arr.push(temp);
        if (arr.length !== 0) {
          this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_assets: JSON.stringify(arr) } }, function () {

          })
        }
      }
    })

    if (this.state.addCandidateParameter.candidate_email !== "") {
      const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      if (reg.test(this.state.addCandidateParameter.candidate_email) === false) {
        this.setState({ candInvalidEmail: true })
      }
    }
 
    setTimeout(() => {
     
      if (this.state.candInvalidEmail === false) {
        if (this.state.addCandidateParameter.candidate_criminal_record.length !== 0) {
          this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_criminal_record: JSON.stringify(this.state.addCandidateParameter.candidate_criminal_record) } }, function () {
          });
        }
        this.setState({addCandidateDisabled : true})
        items("POST", this.state.addCandidateParameter, constants.addCandidate)
          .then(response => {
            if (response.status === "Success") {
              this.globalSearchAutoSuggest('')
              this.setState({addCandidateDisabled : false});
              this.props.history.push('/CandidateAdded')
              if(response.data !== null) {
                ImageUpload('dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
                localStorage.getItem('accessToken'), 'candidate', response.data,this.state.file, constants.imageUpload)
              }
            }
            else
            {
              this.setState({addCandidateDisabled : false});
            }
          })
      }
    }, 10)

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
  // <--------------------handle=Contact-Vald-and-add-candidate-------end---------->

  handleGoBackCriminal = () => {
    console.log(this.state.addCandidateParameter.candidate_criminal_record);
    this.setState({ value: 3 })
  }

  handleGoBackContact = () => {
    this.setState({ value: 4 })
  }

  handleGoBackAsset = () => {
    this.setState({ value: 2 })
  }

  handleGoBackOther = () => {

    this.setState({ value: 1 })
  }
  handleGoBackGeneral = () => {
    this.setState({ value: 0 })
  }
  handleToCandList = () => {
    this.props.history.push('/AdminCandidate')
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
              <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink
                to='/AdminHomePage' className="breadCrumbs">Home</NavLink>/<NavLink className="breadCrumbs" to='/AdminCandidate'> Candidates </NavLink> / Add Candidate</p>
            </Col>
          </Row>
        </Container>

        <ErrorSnackBar open={this.state.openAssetError}
        onClose={this.handleCloseAsset}
        anchorOrigin={{ vertical, horizontal }}
        message={this.state.errorMsgAsset}
      />
      <ErrorSnackBar open={this.state.openWhiteSpaces}
      onClose={this.handleCloseAsset}
      anchorOrigin={{ vertical, horizontal }}
      message={this.state.whiteSpacesMsg}
    />
        <Container className="addCandidateContainer mt-5">
          <Row className="tabRowAdmin marginTop40">
            <Col sm={12} xs={12} lg={10} md={12} xl={8} className="tabColAdmin">
              <Card className="tabContainerAdmin" >
                <CardHeader className="headerAdminAdd fontColor darkBackground fontRegular16">ADD CANDIDATE</CardHeader>
                <CardBody className="tabContainerCard pb-4">
                  <AppBar position="static" className={classes.appBarStyle}>
                    <Tabs value={this.state.value} onChange={this.handleChange}
                      fullWidth={true}
                      scrollButtons="auto"
                      selected={true}
                      classes={{
                        indicator: `${classes.indicator} w-auto`,
                      }}
                    >
                      <Tab label="Basic Details" className={this.state.value === 0 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}
                      />
                      <Tab label="General Info" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}

                      />
                      <Tab label="Other Info" className={this.state.value === 2 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}

                      />
                      <Tab label="Assets & Liabalities" className={this.state.value === 3 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}

                      />
                      <Tab label="Criminal Records" className={this.state.value === 4 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}

                      />
                      <Tab label="Contact Details" className={this.state.value === 5 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}

                      />


                    </Tabs>
                  </AppBar>
                  {this.state.value === 0 && <BasicDetails
                    handleButtonClick={this.handleButtonClick.bind(this)}
                    candidateImage={this.state.candidateImage}
                    fileChangedHandler={this.fileChangedHandler}
                    file={this.state.file}
                    profilePic={this.profilePic}
                    handleDateOfBirth={this.handleDateOfBirth}
                    candidate_relation={this.state.candidate_relation}
                    addCandidateParameter={this.state.addCandidateParameter}
                    partyOptionArray={this.state.partyOptionArray}
                    valueParty={this.state.valueParty}
                    handleNameAsVoterId={this.handleNameAsVoterId}
                    handleRelation={this.handleRelation}
                    handleRelationName={this.handleRelationName}
                    handleBasicDetail={this.handleBasicDetail}
                    handleGenderChange={this.handleGenderChange.bind(this)}
                    handleCandidateName={this.handleCandidateName.bind(this)}
                    handleChangeSelect={this.handleChangeSelect.bind(this)}
                    candNameVald={this.state.candNameVald}
                    candVoterName={this.state.candVoterName}
                    candRelName={this.state.candRelName}
                    candGender={this.state.candGender}
                    candDob={this.state.candDob}
                    candParty={this.state.candParty}
                    handleToCandList={this.handleToCandList}
                  />}
                  {this.state.value === 1 && <GeneralInfo
                    body={this.state.body}
                    addCandidateParameter={this.state.addCandidateParameter}
                    handleEditor={this.handleEditor}
                    handleSelfPro={this.handleSelfPro}
                    handleEducation={this.handleEducation}
                    education={this.state.education}
                    handleAddShareholder={this.handleAddShareholder}
                    handleRemoveShareholder={this.handleRemoveShareholder}
                    handleGeneralClick={this.handleGeneralClick}
                    candInfo={this.state.candInfo}
                    candProf={this.state.candProf}
                    candEdu={this.state.candEdu}
                    handleGoBackGeneral={this.handleGoBackGeneral}
                  />}
                  {this.state.value === 2 && <OtherInfo
                    addCandidateParameter={this.state.addCandidateParameter}
                    handleInterests={this.handleInterests}
                    awards={this.state.awards}
                    legislature={this.state.legislature}
                    handleReligiousView={this.handleReligiousView}
                    handleAwards={this.handleAwards}
                    handleLegislature={this.handleLegislature}
                    addAwards={this.addAwards}
                    addLegislature={this.addLegislature}
                    removeAwards={this.removeAwards}
                    removeLegislature={this.removeLegislature}
                    handleOtherInfoClick={this.handleOtherInfoClick}
                    candInteres={this.state.candInteres}
                    candRelView={this.state.candRelView}
                    candAwards={this.state.candAwards}
                    candLegis={this.state.candLegis}
                    handleGoBackOther={this.handleGoBackOther}
                  />
                  }
                  {this.state.value === 3 && <AssetsLiabilities
                    assets={this.state.assets}
                    valueAsset={this.state.valueAsset}
                    handleAssetNextClick={this.handleAssetNextClick}
                    addCandidateParameter={this.state.addCandidateParameter}
                    movableAssets={this.state.movableAssets}
                    removeAssets={this.removeAssets}
                    assetsHide={this.assetsHide}
                    assetsShow={this.assetsShow}
                    addMore={this.addMore}
                    addMoreDep1={this.addMoreDep1}
                    addMoreDep2={this.addMoreDep2}
                    addMoreDep3={this.addMoreDep3}
                    addMoreSpouse={this.addMoreSpouse}
                    removeData={this.removeData}
                    removeSpouseData={this.removeSpouseData}
                    removeDep_1Data={this.removeDep_1Data}
                    removeDep_2Data={this.removeDep_2Data}
                    removeDep_3Data={this.removeDep_3Data}
                    addAssets={this.addAssets}
                    handleAssetType={this.handleAssetType}
                    handleAssetDesc={this.handleAssetDesc}
                    handleDescSelf={this.handleDescSelf}
                    handleAmtSelf={this.handleAmtSelf}
                    handleDescSpouse={this.handleDescSpouse}
                    handleAmtSpouse={this.handleAmtSpouse}
                    handleDescDep1={this.handleDescDep1}
                    handleAmtDep1={this.handleAmtDep1}
                    handleDescDep2={this.handleDescDep2}
                    handleAmtDep2={this.handleAmtDep2}
                    handleDescDep3={this.handleDescDep3}
                    handleAmtDep3={this.handleAmtDep3}
                    handleGoBackAsset={this.handleGoBackAsset}
                    handleChangeAssetIndex={this.handleChangeAssetIndex}
                  />}


                  {this.state.value === 4 && <CriminalRecord
                    addCandidateParameter={this.state.addCandidateParameter}
                    handleIpcSection={this.handleIpcSection}
                    addCriminalRecord={this.addCriminalRecord}
                    handleCheckboxChange={this.handleCheckboxChange}
                    handleOtherDetail={this.handleOtherDetail}
                    removeCriminal={this.removeCriminal}
                    addMoreDep_1={this.addMoreDep_1}
                    handleCriminalNext={this.handleCriminalNext.bind(this)}
                    criminalVald={this.state.criminalVald}
                    handleGoBackCriminal={this.handleGoBackCriminal}
                  />}

                  {this.state.value === 5 && <ContactDetails
                    addCandidateParameter={this.state.addCandidateParameter}
                    handleHometown={this.handleHometown}
                    addCandidateDisabled = {this.state.addCandidateDisabled}
                    handleCandEmail={this.handleCandEmail}
                    handlePhoneNumber={this.handlePhoneNumber}
                    handleCurrentAddress={this.handleCurrentAddress}
                    candHomeT={this.state.candHomeT}
                    candEmail={this.state.candEmail}
                    candInvalidEmail={this.state.candInvalidEmail}
                    candPhone={this.state.candPhone}
                    candCurrentAdd={this.state.candCurrentAdd}
                    handleAddCandidate={this.handleAddCandidate}
                    handleGoBackContact={this.handleGoBackContact}
                  />}

                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    )
  }
}

AddCandidateAdmin = withRouter(AddCandidateAdmin)
export default withStyles(styles)(AddCandidateAdmin);


