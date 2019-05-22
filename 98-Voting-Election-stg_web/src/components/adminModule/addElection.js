/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Add election .
Purpose   : Add election details with the two tabs
*/
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NavLink } from 'react-router-dom'
import ReactQuill from 'react-quill';
import { withRouter } from 'react-router-dom';
import produce from "immer"
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';

import PrimarySearchAppBar from './appBar/appBar'
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import checkValidity from '../../networkCall/emptyValueValidity'
import ErrorSnackBar from '../../networkCall/errorSnackBar'
import Add from '../../images/add.png';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
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
  },
  selectField: {
    backgroundColor: 'white',
    width: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    color: '#555555',
    fontSize: 12,
    fontFamily: 'montserratregular',
    '&:focus': {
      border: 'none',
    },
  },
  addButton: {
     boxShadow: 'none',
     borderRadius: 0,
     fontFamily: 'montserratregular',
     fontSize: 12,
     color: 'white',
     width: 160,
     backgroundColor: '#E18F68',
     '&:hover':{
      backgroundColor: '#b75628'
     }
   },
   cssFocused: {},
  cssLabel: {
    '&$cssFocused': {
      border: '1px solid grey',
      color: '#A5A5A5',

    },
  },
  resize: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#3C3C3C'
    }
  },
  cssUnderline: {
    '&:after': {
      border: '0px',
      borderBottomColor: '#A5A5A5',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      border: '1px solid grey',
      borderColor: '#A5A5A5',
    },
  }, 
  notchedOutline: {
    border: '1px solid grey',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: '6%',
    right: 0,
    width: '89%'
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  searchBox:{
    width: '99%',
    height: '50px',
    marginLeft: '2px',
    marginTop: '10px'
  },
})


let suggestions = [
]


function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      className={classes.searchBox}
      variant='outlined'
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
          outlined: classes.resize,
          input: classes.resize
        },
      }}
      inputProps={{
        maxLength: 25
      }}
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
          outlined: classes.resize,
          input: classes.resize
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
        )}
      </div>
    </MenuItem>
  );
}


function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}







class AddElection extends Component {
 
  state = {
    value: 1,
    startDate: null,
    
    body: '',
    title: '',
    invalidEmail: false,
    vertical: 'top',
    horizontal: 'center',
    electionNameValid: false,
    electionTypeValid: false,
    electionStatusValid: false,
    electionStartValid: false,
    electionEndValid: false,
    vsConstiList:{
      votingElection_code :constants.votingElectionCode,
      district_id :''
    },
    viewAllState:{
      votingElection_code: constants.votingElectionCode
    },
    districtVidhanSabha:{
      votingElection_code: constants.votingElectionCode,
      state_id :''
    },
    constiLokSabha:{
      votingElection_code: constants.votingElectionCode,
      state_id :''
    },
    viewAllConsti:{
      votingElection_code: constants.votingElectionCode,
      district_id:''
    },
    candidateList:{
      votingElection_code: constants.votingElectionCode,
      type: 'admin'
    },
    partyList:{
      votingElection_code: constants.votingElectionCode,
      type: 'admin'
    },
    addElection:{
      votingElection_code :constants.votingElectionCode,
      token_id :localStorage.getItem('accessToken'),
      election_name :'',
      elec_current_status :'',
      election_type :'',
      election_start :'',
      election_end :'',
      election_summary :'',
      election_detail :'',
    },
    election_status: ["Not Started", "In-Progres", "Completed"],
    election_type:['Lok Sabha','Vidhan Sabha'],
    constituencies: [{
      state_id:'',
      district_id:'',
      constituency_id: '',
      constituency_data: [{
        candidate_id: '',
        party_id: ''
      },
      
      ]
    }],
    state_id:'',
    district_id:'',
    constituencies_name: [],
    district_name:[],
    state_list: [],
    candidates: [],
    parties: [],
    showDistrictList: false,
    showStartDate: true,
    showEndDate: true,
    lsConstiDisabled: true,
    vsDistrictDisabled: true,
    openConstiError: false,
    constiMsg:'Please select all the fields to continue',
    duplicateCand: false,
    duplicateParty: false,
    duplicateCandMsg:'Candidate already added',
    duplicatePartyMsg: 'Party already added',
    duplicateElection: false,
    buttonDisable: false,
    duplicateElectionMsg: 'Election already present',
    electionArray: '' 
  }

  

  componentDidMount() {
    
    items('POST', this.state.viewAllState, constants.viewAllState)
    .then(response => {
      if(response.status ==='Success' && response.data.length !== 0){
        this.setState({ state_list: response.data })
      }
    })
    this.candidateListCall()
    this.partyListCall()
  }

  //on drop down data selected function
  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    if (suggestion.type === 'party') {
      this.props.history.push({
        pathname: '/AdminPoliticalParties/:/:/AdminPoliticalProfile/' + suggestion.label + '/' + suggestion.id,
      })
    }
    else if (suggestion.type === 'candidate') {
      this.props.history.push('/AdminCandidate/:/:/AdminCandidateProfile/' + suggestion.label + '/' + suggestion.id)
    }
    else {
      this.props.history.push({
        pathname: '/UserElectionDetail/' + suggestion.id + '/' + suggestion.subtype + '/' + suggestion.label
      });
    }
  }


  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

//on input field change
  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });

    if (newValue.length == 2){
    }
  };

  
//global search api call
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
          localStorage.setItem(btoa('search_data'), JSON.stringify(val));
          this.returnValue();
        }
        else if (response.status === "Failure") {

        }
        else {

        }
      });
  }

  returnValue()
  {
    suggestions = JSON.parse(localStorage.getItem(btoa('search_data')));
  }

  //getting election name value
  handleElectionName = (e) => {
    if(e.target.value!==null){
      this.setState({ electionNameValid: false })
    }
    this.setState({ addElection:{...this.state.addElection, election_name: e.target.value} })
  }
  //getting electioon type value and showing district list if the type is vidhan sabha and vice versa if it is lok sabha
  handleElectionType = (e) => {
    
    if(e.target.value === 'Vidhan Sabha'){
      for(let i =0 ; i< this.state.constituencies.length ;i++){
        this.setState( produce((draft) => {
          draft.constituencies[i].state_id = ''
        }) )
      this.setState( produce((draft) => {
        draft.constituencies[i].district_id = ''
      }) )
    this.setState( produce((draft) => {
      draft.constituencies[i].constituency_id = ''
    }) )
      }
     
      this.setState({ state_id: '' })
      this.setState({ lsConstiDisabled: true })
      this.setState({ vsDistrictDisabled: true })
      this.setState({ district_name: [] })
      this.setState({ district_id: '' })
      this.setState({ constituencies_name: [] })
      this.setState({ constituency_id: '' })
      this.setState({ showDistrictList: true })
    }
    else{
      for(let i =0 ; i< this.state.constituencies.length ;i++){
        this.setState( produce((draft) => {
          draft.constituencies[i].state_id = ''
        }) )
      this.setState( produce((draft) => {
        draft.constituencies[i].district_id = ''
      }) )
    this.setState( produce((draft) => {
      draft.constituencies[i].constituency_id = ''
    }) )
      }
     
      this.setState({ state_id: '' })
      this.setState({ lsConstiDisabled: true })
      this.setState({ district_name: [] })
      this.setState({ district_id: '' })
      this.setState({ constituencies_name: [] })
      this.setState({ constituency_id: '' })
      this.setState({ showDistrictList: false })  
    }
    if(e.target.value!==null){
      this.setState({ electionTypeValid: false })
    }
    this.setState({ addElection:{...this.state.addElection, election_type: e.target.value} })
  }

  //getting the eleciton status value
  handleElectionStatus = (e) => {
    if(e.target.value!==null){
      this.setState({ electionStatusValid: false })
    }
    this.setState({ addElection:{...this.state.addElection, elec_current_status: e.target.value} })
  }

  //getting the start date of the election
  handleStartDate = (e) => {
    
    if(e.target.value!==null){
      
      this.setState({ electionStartValid: false })
    }
    this.setState({ addElection:{...this.state.addElection, election_start: e.target.value} },()=>{
      console.log(this.state.addElection.election_start)
      
    })
  }

  //getting the end date of the election
  handleEndDate = (e) => {
    if(e.target.value!==null){
      this.setState({ showEndDate: false })
      this.setState({ electionEndValid: false })
    }
    this.setState({ addElection:{...this.state.addElection, election_end: e.target.value} })
  }

  //getting the election summary
  handleElectionSummary = (html) => {
    
    this.setState({ addElection:{...this.state.addElection, election_summary:html} })
  }

  //getting the candidate name form drop down and check for duplicate value
  handleCandidateInfo = (index,indices)=> (e)=> {
    const candidateId = e.target.value
    
      this.setState( produce((draft) => {
        draft.constituencies[index].constituency_data[indices].candidate_id = candidateId
      }))

    for(let i= 0 ; i< this.state.constituencies.length; i++){
      for(let j=0 ; j< this.state.constituencies[index].constituency_data.length ; j++) {
        if(e.target.value ===this.state.constituencies[i].constituency_data[j].candidate_id ){
          this.setState({ duplicateCand: true })
          setTimeout(() => {
            this.setState({ duplicateCand: false })
          },2500)

          this.setState( produce((draft) => {
            draft.constituencies[index].constituency_data[indices].candidate_id = ''
          }) )
        } 
      }
    }
  }

  //getting the party name form drop down
  handlePartyInfo= (index,indices)=> (e)=> {
    const partyId = e.target.value
    this.setState( produce((draft) => {
      draft.constituencies[index].constituency_data[indices].party_id = partyId
    }))
   
  }
//add more functionality for candidate and party
  handleAddElection = (index) => {
    let form1 =  {
      candidate_id: '',
      party_id: ''
    }
    this.setState(produce((draft) => {
      draft.constituencies[index].constituency_data.push(form1)
    }))
  }
  //add more functinality for election 
  handleAddConsti = () => {
    let addMore = {
      state_id:'',
      district_id:'',
      constituency_id: '',
      constituency_data: [{
        candidate_id: '',
        party_id: ''
      },
      
      ]
    }
    this.setState(produce((draft) => {
      draft.constituencies.push(addMore)
    }) )
  }

  //remove election on cross icon click 
  handleRemoveConsti = (index) => {
    this.setState({
      constituencies: this.state.constituencies.filter((_, i) => i !== index)
    });
  }
  //remove candidate and party on cross icon click 
  handleRemoveCanPar = (index,indices) => {
    this.setState(produce((draft) => {
      draft.constituencies[index].constituency_data.splice(indices, 1)
    }) )
  }

  //getting the state name value from the dropdown
  handleStateName = (index) => (e) =>  {
    const stateId = e.target.value
    this.setState( produce((draft) => {
      draft.constituencies[index].state_id = stateId
    }) )
    if(this.state.showDistrictList === true){
    
      this.setState({ state_id: e.target.value }, function() {
        this.districtVidhanSabhaCall()
      })
    } 
    else{
      this.setState({ state_id: e.target.value },function() {
      
  
        this.constiLokSabhaCall()
      })
    }
        
      
  }
  //getting the Constituncy name value from the dropdown
  handleConstituncy = (index) =>(e) => {
    const constituencyId = e.target.value
    this.setState( produce((draft) => {
      draft.constituencies[index].constituency_id = constituencyId
    }) )
  }

  //the vidhan sabha Constituncy list api call
  vidhanSabhaConstiCall = () => {
    
    this.setState({ vsConstiList:{...this.state.vsConstiList, district_id: this.state.district_id} }, function() {
      items("POST", this.state.vsConstiList, constants.viewConstituencyList)
      .then(response => {
        if(response.status=== 'Success' && response.data.length !== 0){
          this.setState({ constituencies_name: response.data })
          this.setState({ lsConstiDisabled : false })
          
        }
       
        else{
          this.setState({ lsConstiDisabled : false })
          
        }
      })
    })
  }

  // getting the value form district if election type is vidhan sabha
  handledistrictVidhanSabha = (index) => (e) => {
    const districtId = e.target.value
    this.setState( produce((draft) => {
      draft.constituencies[index].district_id = districtId
    }) )
    this.setState({ district_id: e.target.value },function(){
      this.vidhanSabhaConstiCall()
    })
   
  }
  //constituency list call for lok sabha as election type
  constiLokSabhaCall = () => {
    this.setState({ constiLokSabha:{...this.state.constiLokSabha, state_id:this.state.state_id } }, function() {
      this.setState({ lsConstiDisabled: true })
      items('POST', this.state.constiLokSabha, constants.lokSabhaConst)
      .then(response => {
        if(response.status === 'Success' && response.data.length !== 0){
          this.setState({ constituencies_name: response.data })
          this.setState({ lsConstiDisabled: false })
        }
        else{
          this.setState({ constituencies_name: [] })
          this.setState({ lsConstiDisabled: false })
        }
      })
    })
  }
  
    // the district call for vidhan sabha 
  districtVidhanSabhaCall = () => {
    this.setState({ districtVidhanSabha:{...this.state.districtVidhanSabha, state_id: this.state.state_id} }, function() {
      this.setState({ vsDistrictDisabled: true })
      items('POST', this.state.districtVidhanSabha, constants.viewDistrictList)
      .then(response => {
        if(response.status ==='Success' && response.data.length !== 0){
          this.setState({ district_name: response.data })
          this.setState({ vsDistrictDisabled: false })
        }
        else{
          this.setState({ district_name: [] })
          this.setState({ vsDistrictDisabled: false })
        }
      })
    })
  }
  
  //party list call for constituency detail tab
  partyListCall = () => {
    items('POST', this.state.partyList, constants.getPartiesList)
    .then(response => {
      if(response.status ==='Success' && response.data.length !== 0){
        this.setState({ parties: response.data })
      }
    })
  }
  //candidate list call for constituency detail tab
  candidateListCall = () => {
    items("POST", this.state.candidateList, constants.getCandidatesList)
    .then(response =>{
      if(response.status === 'Success' && response.data.length !== 0){
        this.setState({ candidates: response.data }  )

      }
    })
  }
  //search the state id or candidate id in an array
  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  //empty for constituency tab validation
  constiValidation = () => {
   let isConstiError = false
   if(this.state.showDistrictList === true){
    for(let i =0; i< this.state.constituencies.length ; i++){
      if(checkValidity(this.state.constituencies[i].state_id)=== false){
        isConstiError = true
      }
      if(checkValidity(this.state.constituencies[i].district_id) ===false){
        isConstiError = true
      }
      if(checkValidity(this.state.constituencies[i].constituency_id) ===false){
        isConstiError = true
      }
      for(let j=0 ; j<this.state.constituencies[i].constituency_data.length; j++){
        if(checkValidity(this.state.constituencies[i].constituency_data[j].candidate_id)===false){
          isConstiError = true
        }
        if(checkValidity(this.state.constituencies[i].constituency_data[j].party_id)===false){
          isConstiError = true
          
        }
      }
    }
   }
   else{
    for(let i =0; i< this.state.constituencies.length ; i++){
      if(checkValidity(this.state.constituencies[i].state_id)=== false){
        isConstiError = true
      }
      if(checkValidity(this.state.constituencies[i].constituency_id) ===false){
        isConstiError = true
      }
      for(let j=0 ; j<this.state.constituencies[i].constituency_data.length; j++){
        if(checkValidity(this.state.constituencies[i].constituency_data[j].candidate_id)===false){
          isConstiError = true
        }
        if(checkValidity(this.state.constituencies[i].constituency_data[j].party_id)===false){
          isConstiError = true
          
        }
      }
    }
   }
    
    return isConstiError
  }
  
 
//empty for election detail tab validation
  isValid = () => {
    
    let isError = false
    if(checkValidity(this.state.addElection.election_name)===false){
      isError = true;
      this.setState({ electionNameValid: true })
    }
    if(checkValidity(this.state.addElection.election_type) === false) {
      isError = true;
      this.setState({ electionTypeValid: true })
    }
    if(checkValidity(this.state.addElection.elec_current_status)===false){
      isError = true;
      this.setState({ electionStatusValid: true })
    }
    if(checkValidity(this.state.addElection.election_start)===false){
      isError = true;
      this.setState({ electionStartValid: true })
    }
    if(checkValidity(this.state.addElection.election_end)===false){
      isError = true;
      this.setState({ electionEndValid: true })
    }
    return isError;
  }

  handleSubmitGenInfo = (e) => {

    e.preventDefault()

      const err = this.isValid()
      
      if(err === true){
        
      }
      else{
        this.setState({ value : 1 })
      } 
  }
  addElection = (event) => {
    event.preventDefault();
    const constiErr = this.constiValidation()
    if(constiErr === true){
      this.setState({ openConstiError: true })
      setTimeout(() => {
        this.setState({ openConstiError: false })
      },2000)
    }
    else{
      this.setState({ buttonDisable: true })
      this.setState({ addElection:{...this.state.addElection, election_detail: JSON.stringify(this.state.constituencies)} }, function() {
        items('POST', this.state.addElection, constants.addElection)
        .then(response => {
          
          if(response.status === 'Success' ){
            this.setState({ buttonDisable: false })
             this.props.history.push('/ElectionAdded');
          }
          else if(response.msg === "Election already present."){
            this.setState({ duplicateElection: true })
            this.setState({ buttonDisable: false })
            setTimeout(() => {
              this.setState({ duplicateElection: false })
            },2500)
           
          }
          else{
            this.setState({ buttonDisable: false })
          }
        })
      })
    }
    
    
  }
  handleNewSelect = (e) => {
    console.log('new select value', e.target.value)
  }

  render() {

    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
      onSuggestionSelected: this.handleSuggestionSelected(),
    };
    return (
      <div className="App userElection">
        <PrimarySearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor">
                <NavLink to='/AdminHomePage' className="breadCrumbs">Home</NavLink> /
                <NavLink className="breadCrumbs" to='/AdminElectionList'> Elections List </NavLink>/ Add Election
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="addCandidateContainer mt-5">
          <Row className="tabRowAdmin marginTop40">
            <Col sm={12} xs={12} lg={10} md={12} xl={8} className="tabColAdmin ">
              <Card className="tabContainerAdmin" >
                <CardHeader className="headerAdminAdd fontColor darkBackground fontRegular16">ADD ELECTION</CardHeader>
                <CardBody className="tabContainerCard">
                  <AppBar position="static" className={classes.appBarStyle}>
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
                      <Tab label="Constituency Details" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle}
                        classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                        }}
                        disableRipple={true}
                      />
                    </Tabs>
                  </AppBar>
                  {/* General Info tab */}
                  {this.state.value === 0 && 
                    <form onSubmit={this.handleSubmitGenInfo} className="generalInfo w-100 pl-3 pr-3">
                    <div className="basicDetailCont generalInfo">            
                      <Row className="w-100 justify-content-center">
                        <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd mt-4">
                          <div className="firstInputContact">
                            <InputGroup className="firstInputContactGen ">
                              <Input
                                maxLength={20}
                                className="required fontRegular12 noBorderRadius"
                                placeholder="Election Name*"
                                onChange={this.handleElectionName}
                                autoCompelete={true}
                                value={this.state.addElection.election_name}
                              />
                            </InputGroup>
                            <div className="fontRegular12 text-danger position-absolute">
                            {this.state.electionNameValid ? <span>{constants.msg.electionName}</span> : null }
                              
                            </div>
                          </div>
                        </Col>
                        <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd mt-2">
                        <div className="firstInputContact">
                          <select type="text" value={this.state.addElection.election_type} onChange={this.handleElectionType} className={`form-control ${classes.selectField} firstInputGeneralOne`}>
                            <option value="" disabled className="fontRegular12">Election Type*</option>
                            {this.state.election_type.map((item, index) => {
                              return (
                                <option value={item}>{item}</option>
                              );
                            }
                            )}
                          </select>
                          <div className="fontRegular12 text-danger position-absolute">
                          {this.state.electionTypeValid ? <span>{constants.msg.electionType}</span> : null }
                            
                          </div>
                        </div>
                      </Col>
                     
                        <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd mt-2">
                          <div className="firstInputContact">
                            <select type="text" value={this.state.addElection.elec_current_status} onChange={this.handleElectionStatus} className={`form-control ${classes.selectField} firstInputGeneralOne`}>
                              <option value="" disabled className="fontRegular12">Election Status*</option>
                              {this.state.election_status.map((item, index) => {
                                return (
                                  <option value={item}>{item}</option>
                                );
                              }
                              )}
                            </select>
                            <div className="fontRegular12 text-danger position-absolute">
                            {this.state.electionStatusValid ? <span>{constants.msg.electionStatus}</span> : null }
                              
                            </div>
                          </div>
                        </Col>
                       
                        <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd newMargin">
                          <div className="firstInputContact position-relative">
                          {this.state.showStartDate ? <div onClick={() => this.setState({ showStartDate: false },function(){this.nameInput.focus()})} className="w-100 formBorder d-flex align-items-center fontRegular12 greyFontColor bg-white position-absolute zIndex h-100 text-left pl-3">Start Date*
                            </div> : null}
                            <InputGroup className="firstInputGeneralOne datePickerCandidate">
                              <input 
                                type="date" 
                                autoCompelete={true}
                                onKeyDown={(e) => e.preventDefault()}
                                ref={(input) => { this.nameInput = input; }}                           
                                onChange={this.handleStartDate}    
                                onKeyPress={() => this.setState({ showStartDate: false })}                            
                                value={this.state.addElection.election_start}
                                className="text-uppercase dateInput placeholderclass fontRegular12 pl-2  form-control noBorderRadius "
                                placeholder="Start Date" min={"1947-12-31"} 
                              />
                              </InputGroup>
                              <div className="fontRegular12 text-danger position-absolute">
                              {this.state.electionStartValid ? <span>{constants.msg.electionStartDate}</span> : null }
                                
                              </div>
                          </div>
                        </Col>
                        <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd newMargin">
                          <div className="firstInputTwo">
                            <InputGroup className="firstInputGeneralOne position-relative datePickerCandidate">
                            {this.state.showEndDate ? <div onClick={() => this.setState({ showEndDate: false },function(){this.nameInputEnd.focus()})} className="w-100 formBorder d-flex align-items-center fontRegular12 greyFontColor bg-white position-absolute zIndex h-100 text-left pl-3">End Date*
                            </div> : null}
                              <input 
                                type="date" 
                                autoCompelete={true}
                                disabled={this.state.addElection.election_start ==='' ? true: false}
                                onChange={this.handleEndDate}
                                onKeyDown={(e) => e.preventDefault()}
                                ref={(input) => { this.nameInputEnd = input; }}  
                                value={this.state.addElection.election_end}
                                className="text-uppercase dateInput fontRegular12 pl-2 fontRegular14 form-control noBorderRadius dateInput"
                                placeholder="End Date" min={this.state.addElection.election_start} 
                              />
                              </InputGroup>
                              <div className="fontRegular12 text-danger position-absolute">
                              {this.state.electionEndValid ? <span>{constants.msg.electionEndDate}</span> : null }
                                
                              </div>
                          </div>
                        </Col>
                        <Col sm={12} xs={12} lg={10} md={10} xl={10} className="quillColPurpose mt-2 mb-3">
                          <div className="quillContAddElection">
                            <ReactQuill
                              id="quillDataElection" ref="quill"
                              theme={this.state.theme}
                              modules={AddElection.modules}
                              formats={AddElection.formats}
                              value={this.state.addElection.election_summary}
                              placeholder="Write election summary..."
                              onChange={this.handleElectionSummary}
                              className="fontRegular12 mt-0"
                            />
                            
                          </div>
                        </Col>
                        <Row className="col-xl-10 col-lg-10 col-md-10 col-sm-12 pl-0 pr-0">
                          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonOneBasicCol">
                            <Button variant="contained" className={classes.buttonLogin} onClick={""}>CANCEL</Button>
                          </Col>
                          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonBasicCol">
                            <Button variant="contained"  className={classes.buttonLogin} type="submit">
                             NEXT
                            </Button>
                          </Col>
                        </Row>
                      </Row>
                    </div>
                    </form>
                  }
                  {/* Constituency details tab */}
                  {this.state.value === 1 && 
                    <div className="basicDetailCont generalInfo">
                      <form onSubmit={this.addElection} className="generalInfo w-100">
                        <Row className="w-100 d-flex justify-content-center ml-0 mr-0">
                          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="newMargin">
                            {this.state.constituencies.map((item, index) => {
                              return(
                                <div className="mt-4 p-3 boxShadow position-relative assetLiabilitiesIcons w-100 rounded row ml-0 mr-0">
                                {index === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.handleRemoveConsti.bind(this,index)} ></i>}
                                  <Row className="w-100 ml-0 mr-0">
                                  <Col sm={12} xs={12} md={12} lg={12} xl={12} className="mb-2">
                                      <div className="firstInputContact">
                                        <select 
                                          type="text"
                                          value={this.state.constituencies[index].state_id} 
                                          onChange={this.handleStateName(index)} 
                                          className={`form-control ${classes.selectField} firstInputGeneralOne`}>
                                          <option value='' disabled className="fontRegular12">State Name*</option>
                                          {this.state.state_list.map((item, index) => {
                                            return (
                                              <option 
                                               key={item.state_id} value={item.state_id}>{item.state_name}</option>
                                            );
                                          }
                                          )}
                                        </select>
                                      </div>
                                    </Col>
                                  {this.state.showDistrictList ?  <Col sm={12} xs={12} md={12} lg={12} xl={12} className="mb-2">
                                  <div className="firstInputContact">
                                    <select
                                       type="text"
                                       value={this.state.constituencies[index].district_id} 
                                       disabled={this.state.vsDistrictDisabled ? true: false}
                                       onChange={this.handledistrictVidhanSabha(index)}
                                       className={`form-control ${classes.selectField} firstInputGeneralOne`}>
                                      <option value="" disabled className="fontRegular12">District Name*</option>
                                      {this.state.district_name.map((item, index) => {
                                        return (
                                          <option key={item.district_id} value={item.district_id}>{item.district_name}</option>
                                        );
                                      }
                                      )}
                                    </select>
                                  </div>
                                </Col> : null}
                                    <Col sm={12} xs={12} md={12} lg={12} xl={12} className="mb-2">
                                      <div className="firstInputContact">
                                        <select
                                          disabled={this.state.lsConstiDisabled ? true: false}
                                          type="text" value={this.state.constituencies[index].constituency_id} onChange={this.handleConstituncy(index)} className={`form-control ${classes.selectField} firstInputGeneralOne`}>
                                          <option value="" disabled className="fontRegular12">Constituency Name*</option>
                                          {this.state.constituencies_name.map((item, index) => {
                                            return (
                                              <option key={index} value={this.state.showDistrictList ?item.vs_constituency_id: item.ls_constituency_id}>
                                              { this.state.showDistrictList ?item.vs_constituency_name: item.ls_constituency_name}</option>
                                            );
                                          }
                                          )}
                                        </select>
                                      </div>
                                    </Col>
                                  
                                  {
                                    this.state.constituencies[index].constituency_data.map((item,indices) => {
                                      return(
                                        <Row key={indices} 
                                        className={indices === 0 ? "w-100 greyBoxShadow position-relative mt-1 pt-2 pb-2 ml-0 mr-0":"w-100 greyBoxShadow position-relative mt-3 pt-2 pb-2 ml-0 mr-0"  }>
                                        {indices === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer"onClick={this.handleRemoveCanPar.bind(this,index,indices)} ></i>}
                                          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="pr-md-1 pr-3 ">
                                            <div className="firstInputContact">
                                            <select type="text"  value={this.state.constituencies[index].constituency_data[indices].candidate_id} onChange={this.handleCandidateInfo(index,indices)} className={`form-control ${classes.selectField} firstInputGeneralOne`}>
                                                <option value=""   className="fontRegular12">Candidate Name*</option>
                                                {this.state.candidates.map((item, index) => {
                                                  return (
                                                    <option key={index} value={item.candidate_id}>{item.candidate_name}</option>
                                                  );
                                                }
                                                )}
                                              </select>
                                            </div>
                                          </Col>
                                          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="pl-md-1 pl-3">
                                            <div className="firstInputContact">
                                              <select type="text" value={this.state.constituencies[index].constituency_data[indices].party_id} onChange={this.handlePartyInfo(index,indices)} className={`form-control ${classes.selectField} firstInputGeneralOne`}>
                                                <option value=""  className="fontRegular12">Party Name*</option>
                                                {this.state.parties.map((item, index) => {
                                                  return (
                                                    <option key={index} value={item.party_id}>{item.party_name}</option>
                                                  );
                                                }
                                                )}
                                              </select>
                                            </div>
                                          </Col>
                                         
                                        </Row>
                                      );
                                    })
                                  }
                                  
                                    <Col sm={12}>
                                            <div className="mt-1 text-right">
                                              <Button variant="contained" size="small"
                                                className={`${classes.addButton} mt-1`}
                                                onClick={this.handleAddElection.bind(this,index)}
                                              >
                                                <img src={Add} className={classes.iconMargin}
                                                  alt="search" height="15" width="15"
                                                /> &nbsp;
                                                ADD Candidate
                                              </Button>
                                            </div>
                                          </Col>
                                  </Row>
                                </div>
                              );
                            })
                            }
                          </Col>
                          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="d-flex justify-content-center mt-3">
                            <div className="mt-1">
                              <Button variant="contained" size="small"
                                className={`${classes.addButton} w-100 p-2 pl-3 pr-3`}
                                onClick={this.handleAddConsti}
                              >
                                <img src={Add} className={classes.iconMargin}
                                  alt="search" height="15" width="15"
                                /> &nbsp;
                                ADD ANOTHER CONSTITUENCY
                              </Button>
                            </div>
                          </Col>
                          <Row className="col-xl-10 col-lg-10 col-md-10 col-sm-12 pl-0 pr-0 mt-4">
                            <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonOneBasicCol">
                              <Button variant="contained" className={classes.buttonLogin} onClick={()=>{this.setState({value:0})}}>GO BACK</Button>
                            </Col>
                            <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonBasicCol">
                              <Button variant="contained" disableRipple={true} disabled={this.state.buttonDisable ? true : false} className={classes.buttonLogin} type="submit">
                               SAVE ELECTION
                              </Button>
                            </Col>
                          </Row>
                        </Row>
                      </form>
                    </div>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
       
        <ErrorSnackBar open={this.state.openConstiError}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.constiMsg}
        />
        <ErrorSnackBar open={this.state.duplicateCand}
        anchorOrigin={{ vertical, horizontal }}
        message={this.state.duplicateCandMsg}
      />
      <ErrorSnackBar open={this.state.duplicateParty}
        anchorOrigin={{ vertical, horizontal }}
        message={this.state.duplicatePartyMsg}
      />
      <ErrorSnackBar open={this.state.duplicateElection}
        anchorOrigin={{ vertical, horizontal }}
        message={this.state.duplicateElectionMsg}
      />
      </div>
    )
  }
}

AddElection.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }],
    [{ 'align': [] }]
  ]
};

AddElection.formats = [

  'font', 'size',
  'bold', 'italic', 'underline',
  'align', 'color'

];

AddElection = withRouter(AddElection)
export default withStyles(styles)(AddElection);
