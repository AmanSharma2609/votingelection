/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin candidate page
Purpose   : admin candidate list view
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import deburr from 'lodash/deburr';
import Chip from '@material-ui/core/Chip';

import PrimarySearchAppBar from './appBar/appBar'
import userOne from '../../images/SVGs/default_userimg.svg'
import partyPic from '../../images/01-party-pic.png'
import Add from '../../images/add.png';
import Download from '../../images/download.png'
import { constants } from '../../networkCall/constant'
import ErrorSnackBar from '../../networkCall/errorSnackBar'
import { items } from '../../networkCall/service.js'



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  searchButton: {
    marginRight: '2%',
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  importButton: {
    marginLeft: '2%',
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    width: 160,
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  addButton: {
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    width: 160,
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
  iconMargin: {
    marginRight: '5%',
    color: 'white'
  },
  circularLoader: {
    color: '#E18F68',
    marginBottom: 20,
    marginTop: 20,
   
  },
  root: {
    backgroundColor: 'rgba(127, 127, 127, 0.2)',
  },
  paper: {
    backgroundColor: '#f2f2f2',
    boxShadow: 'none',
    position: 'absolute',
    borderRadius: 0,
    top: '30%',
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
    textAlign: 'left',
    color: '#fff',
    fontFamily: 'montserratsemibold',
    fontSize: 20,
    backgroundColor: '#E18F68',
    padding: '5px 15px',
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

  link: {
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: '#555555',
    '&:hover': {
      color: '#E18F68'
    }
  },
  arrowPopper: arrowGenerator(theme.palette.common.black),

  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  bootstrapPopper: arrowGenerator(theme.palette.common.black),
  bootstrapTooltip: {
    backgroundColor: theme.palette.common.black,
    fontFamily: 'montserratregular',
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
    height: '60px',
    marginLeft: '2px',
    marginTop: '10px'
  },
  searchBoxRed:{
    width: '99%',
    height: '60px',
    marginLeft: '2px',
    border: '2px solid #ff3547',
    borderRadius: '5px',
    marginTop: '10px'
  },
  chip: {
    marginTop: 5,
    fontFamily: 'montserratregular',
    
    padding: 0,
    marginRight: 5,
  },
  filterButton:{
    marginRight: 10,
    height:'auto',
    boxShadow: 'none',
    borderRadius: 0,
    fontFamily: 'montserratregular',
    fontSize: 12,
    color: 'white',
    width: 100,
    whiteSpace: 'nowrap',
    backgroundColor: '#E18F68',
    '&:hover': {
      backgroundColor: '#b75628'
    }
  },
});
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

let suggestions = [];
let noCandidateAvailable = false;

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      className={noCandidateAvailable ? classes.searchBoxRed : classes.searchBox}
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

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
   
      <div>
      <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 , height: 100, }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300, height: 100 }}>
                {part.text}
              </strong>
            ),
        )}
        <span className="typeIndicatorSuggestion">{suggestion.type}</span>
      </div>
    </MenuItem>
       
    </div>
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



class CandidatePage extends Component {

  state = {
    arrayItems: [],
    isLoading: true,
    arrowRef: null,
    open: false,
    openDuplicate: false,
    duplicateMsg: '',
    apiCalls: false,
    candidateDeleteId: null,
    candidate_hide_flag: null,
    iconLoaded: {},
    parameter: {
      votingElection_code: constants.votingElectionCode,

    },
    deleteParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      candidate_id: ''
    },
    hideParameter: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      candidate_id: ''
    },
    loaderSpinner: false,
    loadMore: false,
    count: 0,
    filterClass : '',
    deleteCandidateIndex: -1,
    stopCandCall: false,
    loadMoreCandidate : {
      votingElection_code : constants.votingElectionCode,
      count : 0
    },
    value: '',
    suggestions: [],
    search: '',
    single: '',
    popper: '',
    vertical: 'top',
    horizontal: 'center',
    chipData: [],
    partyArray: [],
    candidateArray: [],
    duplicateParty: false,
    msg: '',
    openEmptyFilter: false,
    emptyMsg: 'Please add at least one filter option',
    candidateFilter:{
      votingElection_code :constants.votingElectionCode,
      count :'',
      user_type :'admin',
      party_id :null,
      candidate_search :''
    },
    openNoCand: false,
    candMsg:'No candidate present',
    startCandidateFilter: false,
    stopCandFilterCall: false
  }

  handleAddClick = () => {
    this.props.history.push('AddCandidate')
  }
 
  
  handleClick =(e) => {
    if(this.node.contains(e.target)){
      return null
    }
    else{
      this.handleAlert()
    }
  }
  handleAlert = () => {
    this.setState({filterClass : ''});
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    if (!(localStorage.getItem(btoa('search_data_admin')))) {
      this.globalSearchAutoSuggest('');
    }
    let partyData = JSON.parse(localStorage.getItem(btoa('search_data_admin')));
    for(let i of partyData  ){
      if(i.type === 'party')
      suggestions.push(i)
    }
    this.setState({ count: 0 });
    this.setState({ arrayItems: [] });
    let value = localStorage.getItem('accessToken');
    this.setState({ deleteParameter: { ...this.state.deleteParameter, token_id: value } })
    this.setState({ hideParameter: { ...this.state.hideParameter, token_id: value } })
    this.handleCandidateList()
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleCandidateList = () => {
    if (this.state.count === 0) {
      this.setState({ isLoading: true });
    }
    else
    {
      this.setState({loadMore : true})
    }

    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_type: this.state.searchType,
      count: this.state.count
    }

    items('POST', requestedData, constants.adminCandidateListApi)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            for (let i of response.data) {
              this.setState({ arrayItems: [...this.state.arrayItems, i] })
            }
            this.setState({ isLoading: false });
            this.setState({ count: this.state.count + 1 });
            this.setState({loadMore : false})
          }
              else
              {
                this.setState({loadMore : false});
                this.setState({ isLoading: false });
              }
            }
              else if (response.status === "Failure") {
                this.setState({ isLoading: false });
                this.setState({loadMore : false})
              }
              else {
                this.setState({ isLoading: false });
                this.setState({loadMore : false})
              }

      });
  }

  callback = () => {
    if(this.state.count !==0)
    {
      this.handleCandidateList();
    }
  }

  handleToCandProfile = (candidate_id, candidate_name) => {
    this.props.history.push('AdminCandidate/:/:/AdminCandidateProfile/' + candidate_name + '/' + candidate_id);
  }

  handleOpenDailogue = (candidate_id, index) => {
    this.setState({ candidateDeleteId: candidate_id }, function () {
      this.setState({ deleteParameter: { ...this.state.deleteParameter, candidate_id: this.state.candidateDeleteId } })
    });
    this.setState({deleteCandidateIndex: index})
    this.setState({ open: true })

  }
  handleDeleteCand = () => {

    items('POST', this.state.deleteParameter, constants.deleteCandidate)
      .then(response => {
        if (response.status === "Success") {
          this.state.arrayItems.splice(this.state.deleteCandidateIndex, 1);
          this.setState({ arrayItems: this.state.arrayItems })
          this.globalSearchAutoSuggest('');
          this.setState({open: false})
        }
      })
  }

  handleHideAndUnhideApi = (candidate_id, index, candidate_hide_flag) => {
    console.log(candidate_hide_flag)
    this.setState({ hideParameter: { ...this.state.hideParameter, candidate_id: candidate_id } }, function () {

    })


    if (candidate_hide_flag === 1) {
      this.setState({ candidate_hide_flag: 0 })
    }
    if (candidate_hide_flag === 0) {
      this.setState({ candidate_hide_flag: 1 })
    }

    setTimeout(() => {
      console.log(this.state.candidate_hide_flag)
      if (this.state.candidate_hide_flag === 0) {
        items('POST', this.state.hideParameter, constants.hideCandidate)
          .then(response => {

            this.setState((state) => ({
              iconLoaded: !state.iconLoaded
            }))
            this.componentDidMount();
            if (response.status === "Success") {
              this.globalSearchAutoSuggest('');
            }
          })
      }

      if (this.state.candidate_hide_flag === 1) {
        items('POST', this.state.hideParameter, constants.unHideCandidate)
          .then(response => {

            this.setState((state) => ({
              iconLoaded: !state.iconLoaded
            }))
            this.componentDidMount()

            if (response.status === "Success") {
              this.globalSearchAutoSuggest('');
            }
          })
      }
    }, 10)

  }
  handleToUpdateCandidate = (candidate_id) => {
    localStorage.setItem('candidateUpdateId', candidate_id)
    this.props.history.push('/AdminUpdateCandidate')
  }

  handleCandListCall = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    
    if (bottom) {

      if(this.state.startCandidateFilter === true){
        
        if(this.state.stopCandFilterCall === false) {
          
          this.setState({ loaderSpinner: true })
          this.setState({ candidateFilter:{...this.state.candidateFilter, count: this.state.candidateFilter.count + 1} }, function() {
            items('POST', this.state.candidateFilter, constants.candidateFilter)
            .then(response => {
              console.log(response)
              if(response.status === "Success" && (response.data !== null || response.data.length !== 0)){
                this.setState({ arrayItems:this.state.arrayItems.concat(response.data) })
                this.setState({ loaderSpinner: false })
              } 
              else{
                this.setState({ stopCandFilterCall: true })
                this.setState({ loaderSpinner: false })
              }
          })
        })
      }
    }
    else{
      
      if(this.state.stopCandCall === false) {
        
        this.setState({ loaderSpinner: true })
        this.setState({ loadMoreCandidate:{...this.state.loadMoreCandidate, count: this.state.loadMoreCandidate.count + 1} }, function (){
          items('POST' , this.state.loadMoreCandidate , constants.adminCandidateListApi)
          .then( response => {
            console.log(response)
            if(response.status === "Success" && response.data !== null && response.data.length !==0 ){
              this.setState({ arrayItems: this.state.arrayItems.concat(response.data) })
              this.setState({ loaderSpinner: false })
            }
            else{
             this.setState({ stopCandCall: true }) 
             this.setState({ loaderSpinner: false })
            }
          })
        })
      }
    }
  }
}

  filterBoxShowHide = () =>
  {
    if(this.state.filterClass === '')
    {
      this.setState({filterClass : 'flip'});
    }
    else
    {
      this.setState({filterClass : ''});
    }
  }

  globalSearchAutoSuggest(newValue) {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_key: '',
      user_type : 'user'
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

  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    console.log(suggestion.candidateValue, suggestion.partyValue)
    
    const temp = {
      suggestionLable: suggestion.label,
      suggestionId: suggestion.id,
      candidateValue: suggestion.candidateValue,
      partyValue: suggestion.partyValue
    } 
    if(this.state.chipData.length !== 0) {
      
      let check = this.searchFunction(this.state.chipData, 'suggestionId', suggestion.id)
    if(check !== null){
      if(check.suggestionLable !== suggestion.label){
        if(suggestion.candidateValue === 1){
        this.state.chipData.push(temp);
        this.setState({ candidateArray:[...this.state.candidateArray, suggestion.id] }, function() {
          console.log(this.state.candidateArray)
          this.setState({ single: '' })
        })
      }
       }
       else{
         this.setState({ duplicateMsg: 'This '+suggestion.type+' is already added.' }, function() {
           this.setState({ openDuplicate: true })
           setTimeout(()  => {
            this.setState({ openDuplicate: false })
           },2500)
         })
       }
    }
     else{
      if(suggestion.candidateValue === 1){
        this.state.chipData.push(temp);
        this.setState({ candidateArray:[...this.state.candidateArray, suggestion.id] }, function() {
          console.log(this.state.candidateArray)
          this.setState({ single: '' })
        })
      }   
     }
    
    }
    else{
      
      this.state.chipData.push(temp);
      if(suggestion.candidateValue === 1){
        this.setState({ candidateArray:[...this.state.candidateArray, suggestion.id] }, function() {
          console.log(this.state.candidateArray)
          this.setState({ single: '' })
        })
      }
      
        
        this.setState({ partyArray:[...this.state.partyArray , suggestion.id] }, function() {
          console.log(this.state.partyArray)
          this.setState({ single: '' })
        })
      
    
    }
    if(this.state.chipData.length !== 0) {
      let check = this.searchFunction(this.state.chipData, 'suggestionId', suggestion.id)
      if(check !== null){
        console.log(suggestion.label)
        if(check.suggestionLable !== suggestion.label){
          if(suggestion.partyValue === 2){
            
            this.state.chipData.push(temp);
            this.setState({ partyArray:[...this.state.partyArray , suggestion.id] }, function() {
              console.log(this.state.partyArray)
              this.setState({ single: '' })
            })
          }
    }
  }
  else{
    
      
      this.state.chipData.push(temp);
      this.setState({ partyArray:[...this.state.partyArray , suggestion.id] }, function() {
        console.log(this.state.partyArray)
        this.setState({ single: '' })
      })
    
  }
}
    
    
  
  }
  handleChange = name => (event, { newValue }) => {

    this.setState({
      [name]: newValue,
    });
   
    if(newValue.length > 2)
    {
      if(getSuggestions(newValue).length === 0)
      {
        noCandidateAvailable = true;
      }
      else
      {
        noCandidateAvailable = false;
      }
    }
    else
    {
      noCandidateAvailable = false;
    }

   
  };
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
  handleCandidateString = (e) => {
    this.setState({ candidateFilter:{...this.state.candidateFilter, candidate_search: e.target.value} }, function() {
        
    })
  }
  handleDelete = data => () => {
    console.log(data.candidateValue , data.partyValue)
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
      
    });
    console.log(this.state.chipData)
    console.log(this.state.partyArray) 
   
    
      this.setState({partyArray: this.state.partyArray.filter(function(partyArray) { 
        return partyArray !==  data.suggestionId
  
    })}, function(){
      console.log(this.state.partyArray)
      this.setState({ single: '' })
    });
    
    
  };
  onEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSuggestionSelected();
    }
  }

  handleApplyFilter = () => {
    
    if(this.state.candidateFilter.candidate_search.trim() === '' && this.state.partyArray.length === 0){
      this.setState({ openEmptyFilter: true })
      setTimeout(() => {
        this.setState({ openEmptyFilter: false })
      },2500)
    }
    else{
      
      this.setState({ candidateFilter:{...this.state.candidateFilter, party_id: this.state.partyArray.length === 0? '': JSON.stringify(this.state.partyArray)
      
    } }, function() {
      this.setState({isLoading : true});
      items('POST', this.state.candidateFilter, constants.candidateFilter)
      .then(response => {
        if(response.status === "Success"){
          if(!(response.data === null || response.data.length === 0))
          {
            this.setState({ arrayItems: response.data }, function() {
              this.setState({filterClass : ''});
              this.setState({ startCandidateFilter: true })
            })
          }
          else
          {
            this.setState({ openNoCand: true })
           
           
            this.setState({filterClass : ''});
           
            setTimeout(() => {
              this.setState({ openNoCand: false })
            },2500)
          }
          this.setState({isLoading : false});
        }
        else
        {
          this.setState({isLoading : false});
        }
       
      })
    })
    }
  }

  handleResetFilter = () => {
    this.setState({isLoading : true});
      noCandidateAvailable = false;
      this.setState({single : ''});
      this.setState({ candidateFilter:{...this.state.candidateFilter, candidate_search:''} })
      this.setState({ chipData : [] })
      this.setState({ partyArray: [] })
      this.setState({ candidateArray: [] }, function() {
        let requestedData = {
          votingElection_code: constants.votingElectionCode,
          search_type: '',
          count: 0
        }
        this.setState({ startCandidateFilter: false })
    
        items('POST', requestedData, constants.adminCandidateListApi)
          .then(response => {
            if(response.status === "Success"){
              if(!(response.data === null || response.data.length === 0))
              {
                this.setState({ arrayItems: response.data })
              }
              this.setState({isLoading : false});
            }
            else{
              this.setState({isLoading : false});
            }
          })
      })
  }

  handleCandidateImgError = (ev) =>  {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  render() {
    const { classes, ...other } = this.props;
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
      <div className="candidateCardsParent temp position-relative" onScroll={this.handleCandListCall}>
        {this.state.apiCalls ? <div className="position-absolute Circular">
          <CircularProgress
          
           className={classes.circularLoader} />
        </div> : null}
        <div className=" w-100">
          <PrimarySearchAppBar />
        </div>
        <ErrorSnackBar open={this.state.openDuplicate}
          onClose={this.handleClose}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.duplicateMsg}
        />
        <ErrorSnackBar open={this.state.openEmptyFilter}
          onClose={this.handleClose}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.emptyMsg}
        />
        <ErrorSnackBar open={this.state.openNoCand}
        onClose={this.handleClose}
        anchorOrigin={{ vertical, horizontal }}
        message={this.state.candMsg}
      />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / Candidates </p>
            </Col>
          </Row>
        </Container>

        

        <Container fluid={true} className="AdminPoliticalPartyContainer w-90 mt-4">
          <Row className="marginTop80">
            <Col xs={12} sm={12} lg={3} md={3} xl={3} className="mt-4 text-left">
              <div  className="form-inline">
              <div>
                <h5 className="fontSemiBold18 greyFontColor mr-3">Candidates</h5>
              </div>
              <div className="position-relative filterBox" ref={node => this.node = node}>
                  <i className="fa fa-filter cursorPointer" onClick={this.filterBoxShowHide}></i>
                  <div className={`hover card_panel ${this.state.filterClass}`}>
                    <div ref={node => this.node = node} className="back">
                      <div className="box2">
                        <form>
                        <div className="form-inline">
                          <div className="fontSemiBold14 mr-auto">
                            Filters :
                          </div>
                          <div className="form-inline ml-auto">
                            <Button 
                            onClick={this.handleResetFilter}
                            className={classes.filterButton}>
                              RESET
                            </Button>
                            <Button
                             onClick={this.handleApplyFilter}
                             className={classes.filterButton}>
                              APPLY
                            </Button>
                          </div>
                        </div>
                        <hr />
              
                            <div className="w-100">
                            <TextField
                              className={noCandidateAvailable ? classes.searchBox : classes.searchBox}
                              variant='outlined'
                              type='text'
                              value={this.state.candidateFilter.candidate_search}
                              onChange={this.handleCandidateString}
                              placeholder='Filter candidate on name'
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
                                
                                classes: {
                                  root: classes.cssOutlinedInput,
                                  focused: classes.cssFocused,
                                  notchedOutline: classes.notchedOutline,
                                  outlined: classes.resize,
                                  input: classes.resize
                                },
                              }}
                              
                            />
                            <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                              classes,
                              placeholder: 'Filter candidate on party',
                              value: this.state.single,
                              onChange: this.handleChange('single'),
                              onKeyPress : this.onEnter,
                              
                            }}
                          
                            theme={{
                              container: classes.container,
                              suggestionsContainerOpen: classes.suggestionsContainerOpen,
                              suggestionsList: classes.suggestionsList,
                              suggestion: classes.suggestion,
                            }}
                            renderSuggestionsContainer={options => (
                              <Paper {...options.containerProps} square>
                                {options.children}
                              </Paper>
                            )}
                          />
                            </div>
                  
                       
                        <div className=" NewchipsContainer position-relative" id="chips">
                        {noCandidateAvailable ? <div className="fontReglar14 cursorDefault d-flex align-items-center  darkBackground w-100 position-absolute text-center pl-2 fontColor z-indexUp">No Records Available.</div> : <div className="fontReglar14 d-flex align-items-center  darkBackground w-100 position-absolute text-center pl-2 fontColor z-indexUp ">Selected parties</div>}
                        <div className='chipBox cursorDefault w-100'>
                        
                          {this.state.chipData.map(data => {
                            let icon = null;
                            return (
                              <Chip
                                key={data.key}
                                icon={icon}
                                label={data.suggestionLable}
                                onDelete={this.handleDelete(data)}
                                className={`${classes.chip} text-capitalize`}
                              />
                            );
                          })}
                            
                          </div>
                       </div>

                        <div>
                          
                        </div>
                      </form>
                    </div>
                    </div>
                  </div>
                </div>
                </div>
            </Col>
            <Col xs={12} sm={12} lg={9} md={9} xl={9} className="mt-3 text-right form-inline d-flex justify-content-end">
              <div className="mt-1">
                <Button variant="contained" size="small"
                  className={classes.addButton}
                  onClick={this.handleAddClick.bind(this)}
                >
                  <img src={Add} className={classes.iconMargin}
                    alt="search" height="15" width="15"
                  />
                  ADD Candidate
                </Button>
              </div>

              <div className="mt-1 mr-1">
                <Button variant="contained" size="small" className={classes.importButton}>
                  <img src={Download} className={classes.iconMargin}
                    alt="search" height="18" width="18"
                  />
                  IMPORT LIST
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

      
          <div>
            {this.state.isLoading === true ? <CircularProgress 
              thickness={4.6}
              className={classes.circularLoader} />
              :
              <Container fluid={true} className="mt-3 candidateGridContainer pl-3 pr-2" >
              {this.state.arrayItems === undefined || this.state.arrayItems.length === 0 ?
                  <Row className="rowCandidate">
                    <Col xl={12} className="text-center">No candidates to show</Col>
                  </Row>
                  :
                <Row className="rowCandidate">
                  {this.state.arrayItems.map((item, index) => {
                    return (

                      <Col key={index} className="candidateCards" xs={6} sm={4} lg={3} md={3} xl={2}>
                        <div className="flex_card_design border lightBackgroundColor">
                         
                            <div className="circleImage cursorPointer" onClick={this.handleToCandProfile.bind(this, item.candidate_id, item.candidate_name)}>
                              <div className="imageUpload">
                                <Image
                                  className="imageCandidatePartyProfile"
                                  src={item.candidate_img_url === null || item.candidate_img_url === undefined || item.candidate_img_url === '' ? userOne : item.candidate_img_url}
                                  responsive
                                  onError={this.handleCandidateImgError}
                                >
                                </Image>
                              </div>
                              <div className="bg-white candidateIconCircle  badgeIcon">
                                <Image
                                  className=" circlePartyIconCandidate"
                                  src={item.party_img_url === null || item.party_img_url === undefined || item.party_img_url === '' ? partyPic : item.party_img_url}
                                  responsive
                                  onError={this.handlePartyImgError}
                                ></Image>
                              </div>
                         

                            </div>
                         

                          <div className='maxBoxHeight wordBreakAll'>
                            <div className="fontSemiBold16 greyFontColor mt-3">{item.candidate_name}</div>
                           
                            <div className="fontRegular12  greyFontColor mt-1 candidateAddressProf">{item.candidate_profession}</div>
                          </div>

                          <div className="form-inline">
                            <div className="cursorPointer icon_styling" key={index} onClick={this.handleHideAndUnhideApi.bind(this, item.candidate_id, index, item.candidate_hide_flag)}>
                              {!this.state.iconLoaded[index] && item.candidate_hide_flag === 0 ?
                              
                                  <VisibilityOff className="greyFontColor icon" /> :
                               
                                  <Visibility className="greyFontColor icon" />
                              
                              }

                            </div>
                            <div className="ml-3 icon_styling">
                              
                                <Create className="greyFontColor cursorPointer icon" onClick={this.handleToUpdateCandidate.bind(this, item.candidate_id)} />
                              

                            </div>
                            <div className="ml-3 icon_styling cursorPointer" onClick={this.handleOpenDailogue.bind(this, item.candidate_id, index)}>
                            
                                <Delete className="greyFontColor cursorPointer icon" />
                              

                            </div>
                          </div>

                        </div>

                      </Col>                    
                    );
                  }
                  )}
                </Row>
              }
                <Dialog
                  transition={Collapse}
                  open={this.state.open}
                  onClose={this.handleClose}
                  PaperProps={{
                    classes: {
                      root: classes.paper
                    }
                  }}
                  {...other}
                  BackdropProps={{
                    classes: {
                      root: classes.root
                    }
                  }
                  }
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Confirmation"}</DialogTitle>
                  <DialogContent className={classes.dailogContent}>
                    <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                      <div className="fontSemiBold16 mt-4">
                        Are You sure you want to delete this candidate?
                      </div>
                      <div className="fontRegular12 mt-3">
                        All data will be deleted and this process cannot be undone.
                      </div>

                      <div className="mt-3 form-inline d-flex justify-content-center">
                        <div className="mr-2 mt-3">
                          <Button onClick={this.handleClose} variant="contained"
                            className={classes.dailogButton}
                          >
                            CANCEL
                          </Button>
                        </div>
                        <div className="mt-3">
                          <Button onClick={this.handleDeleteCand} variant="contained"
                            className={classes.dailogButton}
                          >
                            DELETE
                          </Button>
                        </div>
                      </div>
                    </DialogContentText>
                  </DialogContent>

                </Dialog>

              </Container>
            }
            {this.state.loaderSpinner === true ?
              <CircularProgress
               size={30}
               thickness={4.6}
               className={classes.circularLoader} />
              : null
            }
    
          </div>
        

        {this.state.loadMore ?
          <div className="loaderSpinner mt-3 mb-3 mr-auto ml-auto"></div>
          : null}
      </div>




    )
  }
}


CandidatePage = withRouter(CandidatePage)
export default withStyles(styles)(CandidatePage);
