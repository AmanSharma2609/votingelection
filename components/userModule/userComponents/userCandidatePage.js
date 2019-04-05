/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : UserCandidatePage.js
Purpose   : To show the list of candidates.
*/

import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import deburr from 'lodash/deburr';
import Chip from '@material-ui/core/Chip';
import queryString from 'query-string'
import userOne from '../../../images/SVGs/default_userimg.svg';
import partyPic from '../../../images/SVGs/default_partyimg.svg';
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';
import { items } from '../../../networkCall/service.js';
import { constants } from '../../../networkCall/constant'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'

// Inline classes for react material components
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textFieldInput1: {
    border: '1px solid grey',
    backgroundColor: '#FBFBFB',
    fontSize: 8,
    padding: '10px 12px',
    height: 30,
    lineHeight: 'normal',
    width: 'calc(60% - 10px)',
  },
  circularLoader: {
    color: '#E18F68',
    zIndex: 1
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
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
  searchBox: {
    width: '99%',
    height: '60px',
    marginLeft: '2px',
    marginTop: '10px'
  },
  searchBoxRed: {
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
  filterButton: {
    marginRight: 10,
    height: 'auto',
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

});

// Tooltip css classes
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

// function that returns a input field of auto suggest
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

// To fetch the value as user input
function getSuggestionValue(suggestion) {
  return suggestion.label;
}

// To highlight the render suggestion
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <div>
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500, height: 100, }}>
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

// To get the suggestion as per user input
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


class UserCandidatePage extends Component {
//  State of the class
  state = {
    arrayItems: [],
    isLoading: false,
    upvote_counts: [],
    downvote_counts: [],
    searchType: '',
    count: 0,
    loaderSpinner: false,
    filterClass: '',
    candCallStop: false,
    loadMoreCandidate: {
      votingElection_code: constants.votingElectionCode,
      count: 0
    },
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
    openDuplicate: false,
    duplicateMsg: '',
    openEmptyFilter: false,
    emptyMsg: 'Please add at least one filter option',
    candidateFilter: {
      votingElection_code: constants.votingElectionCode,
      count: '',
      user_type: 'user',
      party_id: null,
      candidate_search: ''
    },
    openNoCand: false,
    candMsg: 'No candidate present',
    startCandidateFilter: false,
    stopCandFilterCall: false,
  }

  // Outisde click functionality
  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return null
    }
    else {
      this.handleAlert()
    }
  }

  // To remove the filter box
  handleAlert = () => {
    this.setState({ filterClass: '' });
  }

  // call ths function when component render
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    if (!(localStorage.getItem(btoa('search_data')))) {
      this.globalSearchAutoSuggest();
    }
    let partyData = JSON.parse(localStorage.getItem(btoa('search_data')));
    for (let i of partyData) {
      if (i.type === 'party')
        suggestions.push(i)
    }
    document.addEventListener('mousedown', this.handleClick, false);
    this.setState({ count: 0 });
    this.setState({ arrayItems: [] });
    window.addEventListener('scroll', this.onScroll, false);
    if (values.sort === 'top') {
      this.setState({ searchType: 'upvote' },
        () => {
          this.candidatelist();
        }
      );
    }
    else {
      this.setState({ searchType: '' }, () => {
        this.candidatelist();
      }
      );
    }
  }

  // call this function when component unload
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  // To handle the route params and assign it to functions
  componentWillReceiveProps = (newProps) => {
    const values = queryString.parse(newProps)
    this.setState({ count: 0 });
    this.setState({ arrayItems: [] });
    if (values.sort === 'top') {
      this.setState({ searchType: 'upvote' },
        () => {
          this.candidatelist();
        }
      );
    }
    else {
      this.setState({ searchType: '' }, () => {
        this.candidatelist();
      }
      );
    }
  }

  // To move to the profile of a candidate on click of a  card
  handleProfileClick = (candidate_id, candidate_name) => {
    this.props.history.push({
      pathname: 'Candidate/Candidate-Profile/',
      search: `?name=${candidate_name}&&id=${candidate_id}`
    });
  }

  // To point out the node on tooltip will show
  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  // candidate list API calling
  candidatelist() {
    if (this.state.count === 0) {
      this.setState({ isLoading: true });
    }

    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_type: this.state.searchType,
      count: this.state.count
    }
    items('POST', requestedData, constants.candidateList)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            for (let i of response.data) {
              this.state.arrayItems.push(i);
            }
            this.setState({ arrayItems: this.state.arrayItems })
            this.setState({ count: this.state.count + 1 });
            this.setState({ isLoading: false });
          }
          this.setState({ isLoading: false });
        }
        else if (response.status === "Failure") {
          this.setState({ isLoading: false });
        }
        else {
          this.setState({ isLoading: false });
        }
      });
  }
  callback = () => {
    if (this.state.count !== 0) {
      this.candidatelist();
    }
  }

  // To show and hide a filter box
  filterBoxShowHide = () => {
    if (this.state.filterClass === '') {
      this.setState({ filterClass: 'flip' });
    }
    else {
      this.setState({ filterClass: '' });
    }
  }

  // Load more functionlity on scroll down
  candLoadMore = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      if (this.state.startCandidateFilter === true) {
        if (this.state.stopCandFilterCall === false) {
          this.setState({ loaderSpinner: true })
          this.setState({ candidateFilter: { ...this.state.candidateFilter, count: this.state.candidateFilter.count + 1 } }, function () {
            items('POST', this.state.candidateFilter, constants.candidateFilter)
              .then(response => {
                if (response.status === "Success" && (response.data !== null || response.data.length !== 0)) {
                  this.setState({ arrayItems: this.state.arrayItems.concat(response.data) })
                  this.setState({ loaderSpinner: false })
                }
                else {
                  this.setState({ stopCandFilterCall: true })
                  this.setState({ loaderSpinner: false })
                }
              })
          })
        }
      }
      else {
        if (this.state.candCallStop === false) {
          this.setState({ loaderSpinner: true })
          this.setState({ loadMoreCandidate: { ...this.state.loadMoreCandidate, count: this.state.loadMoreCandidate.count + 1 } }, function () {
            items('POST', this.state.loadMoreCandidate, constants.candidateList)
              .then(response => {
                if (response.status === "Success" && response.data !== null && response.data.length !== 0) {
                  this.setState({ arrayItems: this.state.arrayItems.concat(response.data) })
                  this.setState({ loaderSpinner: false })
                }
                else {
                  this.setState({ candCallStop: true })
                  this.setState({ loaderSpinner: false })
                }
              })
          })
        }
      }
    }
  }

  // TO push the suggestion in suggestion array to show the list of auto suggest
  globalSearchAutoSuggest(newValue) {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_key: ''
    }
    items('POST', requestedData, constants.filterGlobalSearch)
      .then(response => {
        if (response.status === "Success") {
          let val = [];
          if (response.data.political_party.length !== 0) {
            for (let i of response.data.political_party) {
              let temp = { label: i.party_name, id: i.party_id, type: 'party', }
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

  // To return a suggestion array with local storage
  returnValue() {
    suggestions = JSON.parse(localStorage.getItem(btoa('search_data')));
  }

  // To search a array value by its key
  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  // To handle the suggestion if that is already presenyt in a array
  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    const temp = {
      suggestionLable: suggestion.label,
      suggestionId: suggestion.id,
      candidateValue: suggestion.candidateValue,
      partyValue: suggestion.partyValue
    }
    if (this.state.chipData.length !== 0) {

      let check = this.searchFunction(this.state.chipData, 'suggestionId', suggestion.id)
      if (check !== null) {
        if (check.suggestionLable !== suggestion.label) {
          if (suggestion.candidateValue === 1) {
            this.state.chipData.push(temp);
            this.setState({ candidateArray: [...this.state.candidateArray, suggestion.id] }, function () {
              this.setState({ single: '' })
            })
          }
        }
        else {
          this.setState({ duplicateMsg: 'This ' + suggestion.type + ' is already added.' }, function () {
            this.setState({ openDuplicate: true })
            setTimeout(() => {
              this.setState({ openDuplicate: false })
            }, 2500)
          })
        }
      }
      else {
        if (suggestion.candidateValue === 1) {
          this.state.chipData.push(temp);
          this.setState({ candidateArray: [...this.state.candidateArray, suggestion.id] }, function () {
            this.setState({ single: '' })
          })
        }
      }

    }
    else {
      this.state.chipData.push(temp);
      if (suggestion.candidateValue === 1) {
        this.setState({ candidateArray: [...this.state.candidateArray, suggestion.id] }, function () {
          this.setState({ single: '' })
        })
      }
      this.setState({ partyArray: [...this.state.partyArray, suggestion.id] }, function () {
        this.setState({ single: '' })
      })
    }
    if (this.state.chipData.length !== 0) {
      let check = this.searchFunction(this.state.chipData, 'suggestionId', suggestion.id)
      if (check !== null) {
        if (check.suggestionLable !== suggestion.label) {
          if (suggestion.partyValue === 2) {
            this.state.chipData.push(temp);
            this.setState({ partyArray: [...this.state.partyArray, suggestion.id] }, function () {
              this.setState({ single: '' })
            })
          }
        }
      }
      else {
        this.state.chipData.push(temp);
        this.setState({ partyArray: [...this.state.partyArray, suggestion.id] }, function () {
          this.setState({ single: '' })
        })
      }
    }
  }

  // To handle the input value of filter
  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
    if (newValue.length > 2) {
      if (getSuggestions(newValue).length === 0) {
        noCandidateAvailable = true
      }
      else {
        noCandidateAvailable = false;
      }
    }
    else {
      noCandidateAvailable = false;
    }
  };

  // TO fetch the suggestion as requested
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // To clear the array of suggestions
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Handle the candidate string to filter the data on that basis
  handleCandidateString = (e) => {
    this.setState({ candidateFilter: { ...this.state.candidateFilter, candidate_search: e.target.value } }, function () {
    })
  }

  // To delete the chip taht is maintained in a filte box
  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
    this.setState({
      partyArray: this.state.partyArray.filter(function (partyArray) {
        return partyArray !== data.suggestionId
      })
    }, function () {
      this.setState({ single: '' })
    });
  };

  // On enter select the selected suggestion
  onEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSuggestionSelected();
    }
  }

  // Submit function for applying a filter
  handleApplyFilter = () => {
    if (noCandidateAvailable === true) {
      this.setState({ single: '' })
      this.setState({ openNoCand: true })
      noCandidateAvailable = false
      setTimeout(() => {
        this.setState({ openNoCand: false })
      }, 2000)
    }
    if (this.state.candidateFilter.candidate_search.trim() === '' && this.state.partyArray.length === 0) {
      this.setState({ openEmptyFilter: true })
      setTimeout(() => {
        this.setState({ openEmptyFilter: false })
      }, 2500)
    }
    else {
      this.setState({
        candidateFilter: {
          ...this.state.candidateFilter, party_id: this.state.partyArray.length === 0 ? '' : JSON.stringify(this.state.partyArray)
        }
      }, function () {
        this.setState({ isLoading: true });
        items('POST', this.state.candidateFilter, constants.candidateFilter)
          .then(response => {
            if (response.status === "Success") {
              if (!(response.data === null || response.data.length === 0)) {
                this.setState({ arrayItems: response.data }, function () {
                  this.setState({ filterClass: '' });
                  this.setState({ startCandidateFilter: true })
                });
              }
              else {
                this.setState({ openNoCand: true })
                this.setState({ filterClass: '' });
                setTimeout(() => {
                  this.setState({ openNoCand: false })
                }, 2500)
              }
              this.setState({ isLoading: false });
            }
            else {
              this.setState({ isLoading: false });
            }
          })
      })
    }
  }

  // Submit function for resetting a filter
  handleResetFilter = () => {
    this.setState({ isLoading: true });
    this.setState({ single: '' })
    this.setState({ candidateFilter: { ...this.state.candidateFilter, candidate_search: '' } })
    this.setState({ chipData: [] })
    this.setState({ partyArray: [] })
    this.setState({ candidateArray: [] }, function () {
      let requestedData = {
        votingElection_code: constants.votingElectionCode,
        search_type: '',
        count: 0
      }
      this.setState({ startCandidateFilter: false })
      items('POST', requestedData, constants.candidateList)
        .then(response => {
          if (response.status === "Success") {
            if (!(response.data !== null || response.data.length !== 0)) {
              this.setState({ arrayItems: response.data })
            }
            this.setState({ isLoading: false });
          }
          else {
            this.setState({ isLoading: false });
          }
        })
    })
  }

  // To handle a broken image and replace it by default image of candidate
  handleCandidateImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }

  // To handle a broken image and replace it by default image of candidate
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }


  // Render function to render a HTML code
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
      <div className="candidateCardsParent temp" onScroll={this.candLoadMore}>
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / Candidates</p>
            </Col>
          </Row>
        </Container>
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
        <Container fluid={true} className="w-90 AdminPoliticalPartyContainer mt-4">
          <Row className="mb-3 marginTop60">
            <Col xs={12} sm={12} lg={12} md={12} xl={12} className="mt-4 text-left">
              <div className="form-inline">
                <div className="form-inline">
                  <h5 className="fontSemiBold18 greyFontColor mr-3 pb-1 headingPage">Candidates</h5>
                </div>
                <div className="position-relative filterBox">
                  <i className="fa fa-filter cursorPointer" onClick={this.filterBoxShowHide}></i>
                  <div className={`hover card_panel ${this.state.filterClass}`}>
                    <div className="back">
                      <div ref={node => this.node = node} className="box2">
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
                          <div class="w-100">
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
                                onKeyPress: this.onEnter,
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
                            {noCandidateAvailable ? <div className="fontReglar14 cursorDefault d-flex align-items-center  darkBackground w-100 position-absolute text-center pl-2 fontColor z-indexUp">No Records Available.</div> : <div className="fontReglar14 cursorDefault d-flex align-items-center  darkBackground w-100 position-absolute text-center pl-2 fontColor z-indexUp ">Selected parties</div>}
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
          </Row>
        </Container>
        <div className="contheight">
          {this.state.isLoading === true ? <CircularProgress className={classes.circularLoader} />
            :
            <Container fluid={true} className="">
              <Container fluid={true} className="candidateGridContainer">
                {this.state.arrayItems === undefined || this.state.arrayItems.length === 0 ?
                  <Row className="rowCandidate">
                    <Col xl={12} className="text-center">No candidates to show</Col>
                  </Row>
                  :
                  <Row className="rowCandidate">
                    {this.state.arrayItems.map((item, index) => {
                      return (
                        <Col className="candidateCards" xs={6} sm={4} lg={3} md={3} xl={2}>
                          <div className="flex_card_design cursorPointer border lightBackgroundColor" onClick={this.handleProfileClick.bind(this, item.candidate_id, item.candidate_name)} >
                            <div className="circleImage " >
                              <div className="imageUpload">
                                <Image
                                  className="imageCandidatePartyProfile"
                                  src={item.candidate_img_url === null || item.candidate_img_url === '' ? userOne : item.candidate_img_url}
                                  responsive
                                  onError={this.handleCandidateImgError}
                                >
                                </Image>
                              </div>
                              <div className="badgeIcon">
                                <Image
                                  className="circlePartyIconCandidate"
                                  src={item.party_img_url === null || item.party_img_url === '' ? partyPic : item.party_img_url}
                                  responsive
                                  onError={this.handlePartyImgError}
                                >
                                </Image>
                              </div>
                            </div>
                            <span className="fontSemiBold16 greyFontColor mt-3 heading_height">{item.candidate_name}</span>
                            <span className="fontRegular12 greyFontColor mb-3 mt-1 text-capitalize">
                              <i>
                                {item.candidate_profession}</i>
                            </span>
                            <div className="form-inline alignBottom mt-2 fontRegular12">
                              {item.upvote_count}
                              <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                              <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                              {item.downvote_count}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    )}
                  </Row>
                }
              </Container>
              {this.state.loaderSpinner ?
                <CircularProgress
                  size={30}
                  thickness={4.6}
                  className={classes.circularLoader} />
                : null
              }
            </Container>
          }
        </div>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}



export default withStyles(styles)(UserCandidatePage);
