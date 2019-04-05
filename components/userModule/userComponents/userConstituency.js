/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userConstituency.js
Purpose   : Election detail page
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Collapse } from 'reactstrap';
import PrimarySearchAppBar from '../../adminModule/appBar/appBar';
import { constants } from '../../../networkCall/constant';
import { items } from '../../../networkCall/service.js';
import { NavLink } from 'react-router-dom';
import userOne from '../../../images/SVGs/default_userimg.svg'
import partyPic from '../../../images/SVGs/default_partyimg.svg'
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js';
import ErrorSnackBar from '../../../networkCall/errorSnackBar';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const suggestions = []

// inline styling to apply a class to react material component
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  list: {
    width: '100%',
  },
  fullList: {
    width: 'auto',
  },
  textFieldInput1: {
    borderRadius: 50,
    border: '1px solid grey',
    backgroundColor: '#F4F2F0',
    fontSize: 16,
    height: 50,
    padding: '10px 12px',
    width: 'calc(100% - 10px)',
    marginTop: '2%',
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: '7%',
    right: 0,
    width: '85%'
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  container: {
    border: '1px solid #ddd',
    width: '100%',
    borderRadius: 5,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 45,
    color: '#fff',
    backgroundColor: '#F4F2F0',
    '&>div>div::before': {
      border: '0px'
    },
    '&>div>div:focus': {
      border: 0
    },
    '&>div>div input:focus': {
      border: 0,
      boxShadow: 'none'
    },
    '&>div>div input:placeholder': {
      fontSize: 10
    },
    '&>div>div input': {
      border: 0,
      fontSize: 12,
      boxShadow: 'none'
    },
    '&>div>div::after': {
      border: 0,
    },
    '&>div>div:before:hover': {
      border: 0,
      display: 'none',
      content: ''
    }
  }
});

const dataParty = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }];

const dataCandidate = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  { key: 'A' }, { key: 'B' }, { key: 'C' },
];

// Render input of auto suggestion
function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

// Render suggestion to show it in a suggestion box
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

// To fetch the suggestion as per user input
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

// To get the value of suggestion
function getSuggestionValue(suggestion) {
  return suggestion.label;
}


class userConstituencyPage extends Component {
  // state of the class
  state = {
    PartyList: [],
    CandidateList: [],
    collapse: false,
    stateList: [],
    totalCandidatePartyArr: [],
    hideShowVar: 'filterCandidateContainer',
    allConstituencyList: [],
    single: '',
    popper: '',
    suggestions: [],
    vertical: 'top',
    horizontal: 'center',
    open: false,
    msg: '',
    constituencyId: ''
  }

  // Load the function when this components load
  componentDidMount() {
    this.stateReturn();
    this.returnCandidate('');
    this.totalCandidateParty('');
    this.allConstituencyList()
  }

  // To return the list of all constituency available
  allConstituencyList() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      election_id: this.props.match.params.id
    }
    items('POST', requestedData, constants.allConstituencyApi)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            if (this.props.match.params.type === 'vidhan_sabha') {
              for (let i of response.data) {
                let temp = {
                  'id': i.constituency_id,
                  'label': i.vs_constituency_name
                }
                suggestions.push(temp)
              }
            }
            else {
              for (let i of response.data) {
                let temp = {
                  'id': i.constituency_id,
                  'label': i.ls_constituency_name
                }
                suggestions.push(temp)
              }
            }
          }
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      });
  }

  // To return the list of all states
  stateReturn() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      election_id: this.props.match.params.id
    }
    items('POST', requestedData, constants.electionDetailDistrictReturn)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            if (this.props.match.params.type === 'vidhan_sabha') {
              for (let i of response.data) {
                let temp = {
                  'election_state_id': i.election_district_id,
                  'state_name': i.district_name,
                  'constituency_detail': [],
                  'collapse': false
                }
                this.state.stateList.push(temp);
              }
              this.setState({ stateList: this.state.stateList });
            }
            else {
              for (let i of response.data) {
                let temp = {
                  'election_state_id': i.election_state_id,
                  'state_name': i.state_name,
                  'constituency_detail': [],
                  'collapse': false
                }
                this.state.stateList.push(temp);
              }
              this.setState({ stateList: this.state.stateList });
            }
          }
          this.setState({ circularLoader: false });
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      })
  }

  // handle the input string to get suggestions
  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  // Handle the suggestion selected
  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    this.returnCandidate(suggestion.id);
  }

  // On enter press show the constituency wise list detail
  onEnter = (e) => {
    if (e.key === 'Enter') {
      if (this.state.single.trim() !== '') {
        let temp = this.searchFunction(this.state.suggestions, 'label', this.state.single);
        if (temp !== null) {
          this.returnCandidate(temp.id);
        }
        else {
          this.setState({ msg: constants.msg.noRecordFound });
          this.setState({ open: true });
          setTimeout(() => {
            this.setState({ open: false });
          }, 4000);
        }
      }
      else {
        this.setState({ msg: constants.msg.searchEmpty });
        this.setState({ open: true });
        setTimeout(() => {
          this.setState({ open: false });
        }, 4000);
      }
    }
  }

  // To find a value from array using key
  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key].toLowerCase() === value.toLowerCase()) {
        return array[i];
      }
    }
    return null;
  }

  // To return the list of a candidate
  candidatelist() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
    }
    items('POST', requestedData, constants.candidateList)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ CandidateList: response.data });
          }
        }
        else if (response.status === "Failure") {
        }
        else {
        }
      });
  }

  // Tota candidate in a party API calling
  totalCandidateParty(item) {
    this.setState({ totalCandidatePartyArr: [] });
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      election_id: this.props.match.params.id,
      constituency_id: item
    }
    items('POST', requestedData, constants.totalCandidateParty)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ totalCandidatePartyArr: response.data });
          }
          this.setState({ circularLoader: false });
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      })
  }

  // To return the constituency wise data
  constituencyReturn = (item, index) => {
    let requestedData;
    if (this.props.match.params.type === 'vidhan_sabha') {
      requestedData = {
        votingElection_code: constants.votingElectionCode,
        election_id: this.props.match.params.id,
        state_id: '',
        district_id: item
      }
    }
    else {
      requestedData = {
        votingElection_code: constants.votingElectionCode,
        election_id: this.props.match.params.id,
        state_id: item,
        district_id: ''
      }
    }
    items('POST', requestedData, constants.electionDetailConstituencyReturn)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.state.stateList[index].constituency_detail = response.data
            this.setState({ stateList: this.state.stateList });
          }
          this.setState({ circularLoader: false });
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      })
  }

  // Toggle the accordion of constituency
  toggle = (item, index) => {
    if (this.state.stateList[index].collapse === false) {
      this.state.stateList[index].collapse = true;
      this.setState({ stateList: this.state.stateList });
      this.constituencyReturn(item, index)
    }
    else {
      this.state.stateList[index].collapse = false;
      this.setState({ stateList: this.state.stateList });
    }
  }

  // To hide the constituency nav and return candidate
  allCandidate = () => {
    this.setState({ hideShowVar: 'filterCandidateContainer' });
    this.returnCandidate('');
  }

  // Return the candidate 
  returnCandidate = (item) => {
    this.setState({ constituencyId: item });
    this.setState({ candidateList: [] });
    this.totalCandidateParty(item);
    this.setState({ hideShowVar: 'filterCandidateContainer' });
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      election_id: this.props.match.params.id,
      constituency_id: item
    }
    items('POST', requestedData, constants.candidateAsPerElection)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ CandidateList: response.data });
          }
          this.setState({ circularLoader: false });
        }
        else if (response.status === "Failure") {
          this.setState({ circularLoader: false });
        }
        else {
          this.setState({ circularLoader: false });
        }
      });
  }

  // To mark a candidatde as winner
  markAsWinner(id, index, consId) {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      token_id: localStorage.getItem('accessToken'),
      election_id: this.props.match.params.id,
      constituency_id: consId,
      candidate_id: id
    }
    items('POST', requestedData, constants.electionWinnerApi)
      .then(response => {
        if (response.status === "Success") {
          for (let i of this.state.CandidateList) {
            if (i.score === 'winner') {
              i.score = null;
            }
          }
          this.state.CandidateList[index].score = 'winner';
          this.setState({ CandidateList: this.state.CandidateList })
        }
        else if (response.status === "Failure") {
          this.setState({ msg: response.msg });
          this.setState({ open: true });
          setTimeout(() => {
            this.setState({ open: false });
          }, 4000);
        }
        else {
          this.setState({ msg: response.msg });
          this.setState({ open: true });
          setTimeout(() => {
            this.setState({ open: false });
          }, 4000);
        }
      });
  }

  // TO hide and show the side nav
  hideShow = () => {
    if (this.state.hideShowVar === 'filterCandidateContainer') {
      this.setState({ hideShowVar: 'filterCandidateContainerHideShow' });
    }
    else {
      this.setState({ hideShowVar: 'filterCandidateContainer' });
    }
  }

  openDropDown = () => {
    this.setState({ drawer: true })
  }

  // To move to candidate profile on click of a card
  handleProfileClick = (candidate_id, candidate_name) => {
    this.props.history.push('/AdminCandidate/:/:/AdminCandidateProfile/' + candidate_name + '/' + candidate_id);
  }

  // To fetch the suggestion and show it to user
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

  // To move to the party profile on clik to party card
  handleProfileClickParty = (party_id, party_name) => {
    if (localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'admin') {
      this.props.history.push('/AdminPoliticalParties/:/:/AdminPoliticalProfile/' + party_name + '/' + party_id);
    }
    else {
      this.props.history.push({
        pathname: '/Political-Parties/Political-Parties-Profile/',
        search: `?name=${party_name}&&id=${party_id}`
      })
    }
  }

  // To handle the broken images and chnage it from default images of candidate
  handleCandidateImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png';
  }


  // To handle the broken images and chnage it from default images of party
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  // To render a HTML of a class
  render() {
    const { vertical, horizontal } = this.state;
    const { classes, theme } = this.props;
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
      <div className="AppUserLogin userElection">
        {localStorage.getItem('userType') === 'admin' ?
          <PrimarySearchAppBar />
          :
          <UserSearchAppBar />
        }
        <Container fluid={true} className="">
          {localStorage.getItem('userType') === 'admin' ?
            <Row className="homeArea">
              <div className="text-left col-9">
                <div className="fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / <NavLink className="breadCrumbs" to="/AdminElectionList">Election List</NavLink> / {this.props.match.params.name} / Constituency</div>
              </div>
              <div className="text-right col-3">
                <button className="showHide fa fa-ellipsis-h" onClick={this.hideShow}></button>
              </div>
            </Row>
            :
            <Row className="homeArea">
              <div className="text-left col-9">
                <div className="fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / <NavLink className="breadCrumbs" to="/Election-List/All">Election List</NavLink> / {this.props.match.params.name} / Constituency</div>
              </div>
              <div className="text-right col-3">
                <button className="showHide fa fa-ellipsis-h" onClick={this.hideShow}></button>
              </div>
            </Row>
          }
        </Container>
        <div className="constituencyContainer  ml-auto mr-auto mt-5">
          <Container fluid={true} className="marginTop80">
            <Row className="">
              <Col sm={12} xs={12} className="">
                <div className={this.state.hideShowVar}>
                  <div className="filterCandidate rounded pb-3">
                    <div className="pt-3 pb-3 pl-2 pr-2">
                      <h4 className="fontSemiBold16 greyFontColor">CONSTITUENCIES</h4>
                      <div className="w-80 searchBoxParent">
                        <Autosuggest
                          {...autosuggestProps}
                          inputProps={{
                            classes,
                            placeholder: 'Type Constituency Name to Search...',
                            value: this.state.single,
                            onChange: this.handleChange('single'),
                            onKeyPress: this.onEnter
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
                    </div>
                    <div className="">
                      <div className="pl-3 pr-3 border-top border-bottom pt-2 pb-2 fontSemiBold16 greyFontColor text-left cursorPointer" onClick={this.allCandidate}>
                        All Candidates
                        <ChevronRight className="cursorPointer greyFontColor caretRightIcon" />
                      </div>
                      {this.props.match.params.type === 'vidhan_sabha' ?
                        <div>
                          {this.state.stateList.map((item, index) => {
                            return (
                              <div>
                                <div key={item.election_state_id} className="pl-3 pr-3 border-top border-bottom pt-2 pb-2 fontSemiBold16 greyFontColor text-left cursorPointer" onClick={this.toggle.bind(this, item.election_state_id, index)}>
                                  {item.state_name}
                                </div>
                                <Collapse isOpen={item.collapse}>
                                  {item.constituency_detail.map((itemSub, indx) => {
                                    return (
                                      <div key={indx} className="pl-4 pr-4 pt-2 pb-2 border-top border-bottom fontRegular14 greyFontColor text-left cursorPointer lightBackgroundColor" onClick={this.returnCandidate.bind(this, itemSub.constituency_id)}>
                                        {itemSub.vs_constituency_name}
                                        <ChevronRight className="cursorPointer greyFontColor caretRightIcon" />
                                      </div>
                                    )
                                  })}
                                </Collapse>
                              </div>
                            )
                          })}
                        </div>
                        :
                        <div>
                          {this.state.stateList.map((item, index) => {
                            return (
                              <div>
                                <div key={item.election_state_id} className="pl-3 pr-3 border-top border-bottom pt-2 pb-2 fontSemiBold16 greyFontColor text-left cursorPointer" onClick={this.toggle.bind(this, item.election_state_id, index)}>
                                  {item.state_name}
                                </div>
                                <Collapse isOpen={item.collapse}>
                                  {item.constituency_detail.map((itemSub, indx) => {
                                    return (
                                      <div key={indx} className="pl-4 pr-4 border-top border-bottom fontRegular14 greyFontColor text-left cursorPointer lightBackgroundColor" onClick={this.returnCandidate.bind(this, itemSub.constituency_id)}>
                                        {itemSub.ls_constituency_name}
                                        <ChevronRight className="cursorPointer greyFontColor caretRightIcon" />
                                      </div>
                                    )
                                  })}
                                </Collapse>
                              </div>
                            )
                          })}
                        </div>
                      }
                    </div>
                  </div>
                </div>

                <div className="allCandidateContainer">
                  <div className="rounded partyIconContainer lightBackgroundColor">
                    <Row className="mb-4 tab">
                      {this.state.totalCandidatePartyArr.map((item, index) => {
                        return (
                          <Col xs={6} sm={6} md={4} lg={3} xl={2} id={index}>
                            <div className="pl-2 pr-2 mt-4 cursorPointer" onClick={this.handleProfileClickParty.bind(this, item.dis_party, item.party_name)}>
                              <div className="imageUploadElectionDetail d-flex justify-content-center align-items-stretch">
                                <Image
                                  className="img-fluid" onError={this.handlePartyImgError}
                                  src={item.party_img_url === null || item.party_img_url === '' ? partyPic : item.party_img_url}
                                >
                                </Image>
                              </div>
                              <div className="greyFontColor fontRegular14 mt-1 noSpace">{item.party_name}</div>
                              <span className="fontRegular14 pt-1 pl-3 pr-3 pb-1 noCandidates">{item.total_candidate}</span>
                            </div>
                          </Col>
                        )
                      }
                      )}
                    </Row>
                  </div>
                  <div className="constituencyCandidateContainer">
                    <Row className="">
                      {this.state.CandidateList.map((item, index) => {
                        return (
                          <Col sm={6} xs={6} lg={4} md={6} xl={3} className="candidateCards overlayHover">
                            <NavLink className="breadCrumbs" to={{
                              pathname: `/Candidate/Candidate-Profile/`,
                              search: `?name=${item.candidate_name}&&id=${item.candidate_id}`
                            }}>
                              <div className="flex_card_design border lightBackgroundColor position-relative">
                                <div className="circleImage cursorPointer">
                                  <div className="imageUpload">
                                    {item.score === 'winner' ?
                                      <div className="position-absolute fontSemiBold12 darkBackground text-white winnerText">WINNER</div>
                                      : null}
                                    <Image
                                      className="imageCandidatePartyProfile"
                                      onError={this.handleCandidateImgError}
                                      src={item.candidate_img_url === null || item.candidate_img_url === '' ? userOne : item.candidate_img_url}
                                      responsive
                                    >
                                    </Image>
                                  </div>
                                  <div className="badgeIconElectionDetail"> <Image
                                    className="circlePartyIconCandidateElectionDetail"
                                    src={item.party_img_url === null || item.party_img_url === '' ? partyPic : item.party_img_url}
                                    responsive
                                    onError={this.handlePartyImgError}
                                  >
                                  </Image>
                                  </div>
                                </div>
                                <span className="fontSemiBold16 greyFontColor mt-3 heading_height">{item.candidate_name}</span>
                                <span className="fontRegular12 greyFontColor mb-3 mt-1"><i>{item.candidate_profession}</i></span>
                                <div className="form-inline alignBottom mt-2 fontRegular12">
                                  {item.upvote_count}
                                  <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                                  <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                                  {item.downvote_count}
                                </div>
                              </div>
                            </NavLink>
                            {localStorage.getItem('userType') === 'admin' ?
                              <div className="overlayElectionCandidate position-absolute overlay d-flex align-items-center justify-content-center flex-column" >
                                <div className="position-relative">
                                  <i className="fa fa-user-circle iconButtonElectionDetail"></i>
                                  <Button
                                    bssize="large"
                                    color="inherit"
                                    className="buttonElectionDetail button"
                                    onClick={this.handleProfileClick.bind(this, item.candidate_id, item.candidate_name)}
                                  >
                                    View Profile
                                  </Button>
                                </div>

                                {item.score === 'winner' ?
                                  <div className="position-relative">
                                    <i className="fa fa-star iconButtonElectionDetail"></i>
                                    <Button
                                      bssize="large"
                                      color="inherit"
                                      className="buttonElectionDetail button"
                                      onClick={this.markAsWinner.bind(this, item.candidate_id, index, item.constituency_id)}
                                    >
                                      Winner
                                  </Button>
                                  </div>
                                  :
                                  <div className="position-relative">
                                    <i className="fa fa-star iconButtonElectionDetail"></i>
                                    <Button
                                      bssize="large"
                                      color="inherit"
                                      className="buttonElectionDetail button"
                                      onClick={this.markAsWinner.bind(this, item.candidate_id, index, item.constituency_id)}
                                    >
                                      Mark as Winner
                                  </Button>
                                  </div>
                                }
                              </div>
                              :
                              null
                            }
                          </Col>
                        )
                      }
                      )}
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <-------------Footer-starts-here--------------------------> */}
        {localStorage.getItem('userType') === 'admin' ?
          null
          :
          <Footer />
        }
        <ErrorSnackBar open={this.state.open}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.msg}
        />
      </div>
    )
  }
}

export default withStyles(styles)(userConstituencyPage);
