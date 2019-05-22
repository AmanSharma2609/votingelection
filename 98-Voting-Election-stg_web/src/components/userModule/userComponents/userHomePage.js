/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : userHomePage.js
Purpose   : Home page
*/

import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import { Container, Row, Col, } from 'reactstrap';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import UserUpvoted from '../../../images/SVGs/default_userimg.svg';
import PartyUpvoted from '../../../images/SVGs/default_partyimg.svg'
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js'
import { constants } from '../../../networkCall/constant';
import { items } from '../../../networkCall/service.js';

let suggestions = []

// React material theme
const theme = createMuiTheme({
  palette: {
    primary: { main: '#8c8c8c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

// inline styling for react material components
const styles = theme => ({
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
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
    borderRadius: 20,
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
    '&>div>div input': {
      border: 0,
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
})

// Render the suggestion texxt field
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

// Render the suggestions
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

// To get the suggestions as per input value
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

// To get suggestion value as per input
function getSuggestionValue(suggestion) {
  return suggestion.label;
}

class UserHomePage extends Component {
  // state of the class
  state = {
    search: '',
    showPassword: true,
    single: '',
    popper: '',
    vertical: 'top',
    horizontal: 'center',
    open : false,
    msg : 'Please enter something to search.',
    suggestions: [],
    electionList: [],
    topParties: [],
    topCandidates: [],
  };

  // Render when component load
  componentDidMount() {
    this.globalSearchAutoSuggest();
    this.electionList();
    this.getTopParties();
    this.getTopCandidates();
    if(localStorage.getItem(btoa('search_data')))
    {
      suggestions = JSON.parse(localStorage.getItem(btoa('search_data')));
    }
  }

  // To show the password in input field
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  // Handle the suggestion fetch and store it in suggestions array
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // To clear the array of suggestion
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // To get the value of input for auto suggest
  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
    if (newValue.length == 2) {
    }
  };

  // To move to the candidate and party profile while cilck on suggestion
  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    if (suggestion.type === 'party') {
      this.props.history.push({
        pathname: '/Political-Parties/Political-Parties-Profile/' ,
        search:`?name=${suggestion.label}&&id=${suggestion.id}`
      });
    }
    else if (suggestion.type === 'candidate') {
      this.props.history.push({
        pathname: '/Candidate/Candidate-Profile/',
        search: `?name=${suggestion.label}&&id=${suggestion.id}`
      });
    }
    else {
    }
  }

  // Push to the candidate and party profile while clicking on the party or candidate
  pushToprofile = (type, id, name) => {
    if(type === 'candidate')
    {
      this.props.history.push({
        pathname: '/Candidate/Candidate-Profile/',
        search: `?name=${name}&&id=${id}`
      });
    }
    else
    {
      this.props.history.push({
        pathname: '/Political-Parties/Political-Parties-Profile/' ,
        search: `?name=${name}&&id=${id}`
      })
    }
  }

  // On click of search icon search the global results
  onClickSearch = () => {
    if (this.state.single.trim().length !== 0) {
      this.props.history.push({
          pathname: '/searchResult',
          search: `?search=${this.state.single}`
        });
    }
    else
    {
      this.setState({open : true});
      setTimeout(() => {
        this.setState({ open: false });
      }, 4000)
    }
  }

  // To put the value in suggestion array to used it as auto suggestion
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

  // Retrun the value of suggetions from local storage
  returnValue()
  {
    suggestions = JSON.parse(localStorage.getItem(btoa('search_data')));
  }

  // move to the election detail while clicking on election list
  pushToElectionDetail = (election_id, election_type, election_name) => {
    this.props.history.push('/UserElectionDetail/' + election_id + '/' + election_type + '/' + election_name);
  }

  // To show the list of elections
  electionList() {
    let requestedData = {
      votingElection_code: constants.votingElectionCode,
    }
    items('POST', requestedData, constants.browseElection)
      .then(response => {
        if (response.status === "Success") {
          if (!(response.data === null || response.data.length === 0)) {
            this.setState({ electionList: response.data });
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

  // Get top 3 parties in a list
  getTopParties = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode
    }
    items('POST', requestedData, constants.topParties)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ isLoading: false });
          if (response.data.length != 0) {
            this.setState({ topParties: response.data })
          }
        }
        else if (response.status === "Failure") {
          this.setState({ topParties: [] })
        }
        else {
        }
      })
  }

  // get top 3 candidates
  getTopCandidates = () => {
    let requestedData = {
      votingElection_code: constants.votingElectionCode
    }
    items('POST', requestedData, constants.topCandidates)
      .then(response => {
        if (response.status === "Success") {
          this.setState({ isLoading: false });
          if (response.data.length != 0) {
            this.setState({ topCandidates: response.data })
          }
        }
        else if (response.status === "Failure") {
          this.setState({ topCandidates: [] })
        }
        else {
        }
      })
  }

  // On enter search globally for party, candidate, and election
  onEnter = (e) => {
    if(e.key === 'Enter')
    {
      this.onClickSearch()
    }
  }

  // handle broken image by replacing it by default image of candidate
  handleCandidateImgError = (ev) =>  {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/candidate/defaultImage.png'
  }

  // handle broken image by replacing it by default image of party
  handlePartyImgError = (ev) => {
    ev.target.src = 'https://storage.googleapis.com/98-vec-bucket/dev/political_party/defaultImage.png'
  }

  // Render HTML of a class
  render() {
    const { vertical, horizontal } = this.state;
    const { classes } = this.props;
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
      <div className="AppUserLogin">
        <UserSearchAppBar />
        <Container fluid={true} className="topContainerUserTop">
          <Row className="userHomeWelcomTextRow mb-4 mt-5">
            <Col xs="12" sm="12" md="12" lg="12" xl="12" className="UserhomeWelcomTextCol">
              <h3 className="fontBold40 fontColor">EXPLORE THE POLITICS</h3>
              <p className="fontRegular14 fontColor">Search, explore and share opinion on Indian Political parties, leaders and election</p>
            </Col>
          </Row>
          <Row className="inputRowUser">
            <Col xs="10" sm="10" md="7" lg="5" xl="5" className="SearchBoxColUserHome">
              <h5 className="fontBold20 greyFontColor">I want to search for a</h5>
              <div className="searchBoxParent mt-xl-3 mt-lg-3 mt-md-2 mt-2">
                <Autosuggest
                  {...autosuggestProps}
                  inputProps={{
                    classes,
                    placeholder: 'Search here',
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
                <div className="float-right searchButton" onClick={this.onClickSearch}>
                  <i className="fa fa-search darkBackground searchHome cursorPointer"></i>
                </div>
                {this.state.suggestions.length === 0 && this.state.single.length >= 3?
                  <div className="fontSemiBold14 text-left mt-1 p-3 bg-white boxShadow position-absolute suggestBoxHeight">
                    No record found
                  </div>
                  : null
                }
              </div>
            </Col>
          </Row>
        </Container>
        <h3 className="checkMajorityMargin fontBold28 greyFontColor">CHECK THE MAJORITY</h3>
        <Container fluid={true} className="fourItemTopContainer lightBackgroundColor">
          <Row className="fourItemContainer">
            <Col xs="12" sm="12" md="12" lg="3" xl="3" className="exploreCandidateCol lineHeight18 text-xl-left text-lg-left text-center">
              <h4 className="fontSemiBold greyFontColor">Explore Candidates</h4>
              <p className="fontRegular14 greyFontColor m-0">Browse the detailed profile of more than 5000 Indian Political Candidates</p>
              <p className="fontRegular14 greyFontColor m-0">Check the user, opinion, comment, upvots and downvotes for each candiates</p>
            </Col>
            <Col xs="12" sm="12" md="6" lg="3" xl="3" className="upvotedCandidateCol lightBackgroundColor pr-xl-2 pr-lg-2 pr-md-2 pr-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
              <Card className="borderRadiusCard overflow_x">
                <CardHeader className="cardHeaderUser darkBackground fontBold20">Most Upvoted Candidates</CardHeader>
                <CardBody>
                  {
                    this.state.topCandidates.map((item, index) => {
                      return (
                        <Media className="mediaCenter cursorPointer" onClick={this.pushToprofile.bind(this, 'candidate', item.candidate_id, item.candidate_name)}>
                          <div className="rounded-circle cardImgCont">
                            <img className="" width={30} src={item.candidate_img_url === undefined || item.candidate_img_url === null || item.candidate_img_url === '' ? UserUpvoted : item.candidate_img_url} alt=""
                              onError={this.handleCandidateImgError}
                            />
                          </div>
                          <div className="cardContent">
                            <Media.Heading className="fontBoldItalic greyFontColor lineHeight16">
                              <div className="topPartiesList">
                                {item.candidate_name}

                                  <div className="fontRegular10 greyFontColor topList text-capitalize">
                                    <i>{item.party_name.toLowerCase()}</i>
                                  </div>
                              </div>
                            </Media.Heading>
                          </div>
                          <p className="likesStyle greyFontColor spaceTextUserHome mt-1 ml-auto mr-1 m-0">{item.upvote_count}</p>
                          <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                          <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                          <p className="likesStyle greyFontColor mt-1">{item.downvote_count}</p>
                        </Media>
                      )
                    })
                  }
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="12" md="6" lg="3" xl="3" className="upvotedPartiesCol lightBackgroundColor pl-xl-2 pl-lg-2 pl-md-2 pl-0">
              <Card className="borderRadiusCard overflow_x">
                <CardHeader className="cardHeaderUser darkBackground fontBold20">Most Upvoted Parties</CardHeader>
                <CardBody>
                  {
                    this.state.topParties.map((item, index) => {
                      return (
                        <Media className="mediaCenter cursorPointer" onClick={this.pushToprofile.bind(this, 'party', item.party_id, item.party_name)}>
                          <div className="rounded-circle cardImgCont">
                            <img width={30} src={item.party_img_url === null || item.party_img_url === undefined || item.party_img_url === '' ? PartyUpvoted : item.party_img_url}
                             className="" alt="" onError={this.handlePartyImgError}/>
                          </div>
                          <div className="cardContent">
                            <Media.Heading className="fontBoldItalic greyFontColor lineHeight18">
                              <div className="topPartiesList">
                                {item.party_name}
                                  <div className="fontRegular10 greyFontColor topList text-capitalize">
                                    <i>{item.party_type === '' || item.party_type === null ? item.party_name.toLowerCase() : item.party_type.toLowerCase()}</i>
                                  </div>
                              </div>
                            </Media.Heading>
                          </div>
                            <p className="likesStyle greyFontColor spaceTextUserHome mt-1 ml-auto mr-1 m-0">{item.upvote_count}</p>
                            <span className={item.upvote_count === 0 || item.upvote_count === '0' ? 'icon-up_unfill' : 'icon-up_fill'}></span>
                            <span className={item.downvote_count === 0 || item.downvote_count === '0' ? 'icon-down_unfill' : 'icon-down_fill'}></span>
                            <p className="likesStyle greyFontColor mt-1">{item.downvote_count}</p>
                        </Media>
                      );
                    })
                  }
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3" className="explorePartiesCol lightBackgroundColor lineHeight18 text-xl-right text-lg-right text-center">
              <h4 className="fontSemiBold greyFontColor">Explore Parties</h4>
              <p className="fontRegular14 greyFontColor m-0">Browse the detailed profile of more than 5000  national and state parties</p>
              <p className="fontRegular14 greyFontColor m-0">Check the party's opinion, comment, downvotes and upvotes of party</p>
            </Col>
          </Row>
        </Container>
        <h3 className="browseElectionMargin fontBold28 greyFontColor">BROWSE THE ELECTIONS</h3>
        <Container fluid={true} className="lastFourItemsContainer">
          <Row className="lastFourItems ml-auto mr-auto">
            {this.state.electionList.map((item, index) => {
              return (
                <Col xs="12" sm="12" md="3" lg="3" xl="3" className="lastFourCol1 cursorPointer" onClick={this.pushToElectionDetail.bind(this, item.election_id, item.election_type, item.election_name)}>
                  <div className="innerContainerUserHome lightBackgroundColor">
                    <h4 className="fontBold greyFontColor mt-3 mb-0">{this.state.electionList[index].election_name}</h4>
                    <p className="fontRegular16 greyFontColor">{this.state.electionList[index].current_status}</p>
                  </div>
                </Col>
              )
            })}
            <Col xs="12" sm="12" md="3" lg="3" xl="3" className="lastFourCol1 cursorPointer">
            <NavLink to='/Election-List/All'>
              <div className="innerContainerUserHome lightBackgroundColor">
                <span to='/Election-List/All' className="fontBold greyFontColor hoverEffect">VIEW ALL</span>
              </div>
              </NavLink>
            </Col>
          </Row>
        </Container>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
        <ErrorSnackBar open={this.state.open}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.msg}
          />
      </div>
    )
  }
}
export default withStyles(styles)(UserHomePage);
