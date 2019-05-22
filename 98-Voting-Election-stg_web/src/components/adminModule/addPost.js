/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Add post 
Purpose   : Add post that is visible at activity news column in candidate profile and party profile.
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core';
import ErrorSnackBar from '../../networkCall/errorSnackBar'
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PrimarySearchAppBar from './appBar/appBar'
import { withStyles } from '@material-ui/core/styles';
import Add from '../../images/add.png';
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'

import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom'
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import renderHTML from 'react-render-html';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


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
    color: '#E18F68'
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
  marginEmail: {
    border: '1px solid #ddd',
    width: '100%',
    height: '55px',
    paddingLeft: 10,
    fontFamily: 'montserratregular',
  },
  cssLabel: {
    paddingLeft: 15,
    '&$cssFocused': {
      border: '0px',
      color: '#A5A5A5',

    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      border: '0px',
      borderBottomColor: 'transparent',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      border: '0px',
      borderColor: '#A5A5A5',
    },
  },
  notchedOutline: {
    border: '0px'
  },
  resize: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '400',
    fontFamily: 'montserratregular',
    '&::placeholder': {
      color: '#3C3C3C'
    }
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
  selectBox: {
    width: '99%',
    background: 'none',
    border: '1px solid #ddd',

    '& div:focus': {
      background: 'none'
    },

    '& div:hover': {
      background: 'none'
    },

    '&>div': {
      background: 'none',
      backgroundColor: 'transparent !important'
    },

    '& div::before': {
      borderBottom: '0px solid rgba(0,0,0,0) !important'
    },

    '& div::after': {
      borderBottom: '0px solid rgba(0,0,0,0) !important'
    }
  },
  selectPopup: {
    marginTop: 60
  },
  loader: {
    position: 'absolute',
    top: 140
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: '3%',
    right: 0,
    width: '94%'
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
    border: 0,
    padding: 5,
    paddingTop: 0,
    color: '#fff',
    fontSize: 13,
    marginTop: 5,
    fontFamily: 'montserratregular',

    '&>div>div::after': {
      border: 0,
    },
  },
  chip: {
    marginTop: 5,
    padding: 0,
    marginRight: 5,
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

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const suggestions = []

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
        <span className="typeIndicatorSuggestion">{suggestion.type}</span>
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
      let keep;
      if (suggestion) {
        if (suggestion.label) {
          keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
        }
      }

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },

];

const adminToken = localStorage.getItem("accessToken");

class AddPost extends Component {

  state = {
    body: '',
    arrayItems: data,
    isLoading: false,
    arrowRef: null,
    open: false,
    apiCalls: false,
    candidateDeleteId: null,
    showPopupForPost: false,
    iconLoaded: {},
    addPost: {
      votingElection_code: constants.votingElectionCode,
      token_id: '',
      post_type: 'post',
      news_text: '',
      post_data: ''
    },
    labelWidth: 0,
    selectBoxLabel: 'Candidate Name*',
    module_type_options: [],
    suggestions: [],
    single: '',
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg: '',
    chipData: [

    ],
  }

  handleAddClick = () => {
    this.props.history.push('AddCandidate')
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

  handleChange = name => (event, { newValue }) => {

    this.setState({
      [name]: newValue,
    });

    if (newValue.length == 2) {
      this.searchAutoSuggest(newValue);
    }
  };

  searchAutoSuggest(newValue) {

    let requestedData = {
      votingElection_code: constants.votingElectionCode,
      search_key: newValue
    }

    items('POST', requestedData, constants.commonSearch)
      .then(response => {
        if (response.status === "Success") {
          suggestions.length = 0;
          // Store candidates list
          if (response.data.candidate.length !== 0) {
            for (let i of response.data.candidate) {
              let temp = { label: i.candidate_name, id: i.candidate_id, type: 'candidate' }
              suggestions.push(temp);
            }
          }
          // Store parties list
          if (response.data.political_party.length !== 0) {
            for (let i of response.data.political_party) {
              let temp = { label: i.party_name, id: i.party_id, type: 'party' }
              suggestions.push(temp);
            }
          }
          // Store elections list
          if (response.data.election.length !== 0) {
            for (let i of response.data.election) {
              let temp = { label: i.election_name, id: i.election_id, type: 'election' }
              suggestions.push(temp);
            }
          }
          // Store lok sabha list
          if (response.data.lok_sabha.length !== 0) {
            for (let i of response.data.lok_sabha) {
              let temp = { label: i.ls_constituency_name, id: i.ls_constituency_id, type: 'lok sabha' }
              suggestions.push(temp);
            }
          }
          // Store vidhan sabha list
          if (response.data.vidhan_sabha.length !== 0) {
            for (let i of response.data.vidhan_sabha) {
              let temp = { label: i.vs_constituency_name, id: i.vs_constituency_id, type: 'vidhan sabha' }
              suggestions.push(temp);
            }
          }
        }
        else if (response.status === "Failure") {

        }
        else {

        }
      })
  }

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      let tempPostData = this.setPostData(chipData);
      this.setState({ addPost: { ...this.state.addPost, post_data: JSON.stringify(tempPostData) } }, function () {

      });
      return { chipData };
    });
  };

  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  handleSuggestionSelected = name => (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, click }) => {
    const temp = {
      news_category_type: suggestion.type,
      category_item_id: suggestion.id,
      category_item_name: suggestion.label.toLowerCase()
    }
    console.log(this.state.chipData)
    let indexOfData = this.state.chipData.indexOf(this.searchFunction(this.state.chipData, 'category_item_id', parseInt(suggestion.id, 10)));
    console.log(indexOfData)
    if (indexOfData == -1) {
      this.state.chipData.push(temp);
    } else if (indexOfData != -1) {
      this.setState({ msg: 'This ' + suggestion.type + ' is already added.' })
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false });
      }, 2500)
    }
    this.setState({ single: '' })
    let tempPostData = this.setPostData(this.state.chipData);
    this.setState({ addPost: { ...this.state.addPost, post_data: JSON.stringify(tempPostData) } });
  }

  setPostData = (chipData) => {
    let temp = [];
    for (let item of chipData) {
      let type = '';
      if (item.news_category_type === 'party') {
        type = 'political_party';
      } else if (item.news_category_type === 'lok sabha') {
        type = 'lok_sabha';
      } else if (item.news_category_type === 'vidhan sabha') {
        type = 'vidhan_sabha';
      } else {
        type = item.news_category_type;
      }

      let data = {
        news_category_type: type,
        category_item_id: item.category_item_id,
        category_item_name: item.category_item_name
      }

      temp.push(data);
    }
    return temp;
  }

  componentDidMount() {
    suggestions.length = 0;
    let value = localStorage.getItem('accessToken');
    this.setState({ addPost: { ...this.state.addPost, token_id: value } }, function () {
      this.paramsValueFunc();
    })
    this.setState({ theme: 'snow' });
    this.state.addPost.post_type = 'post'
  }

  componentWillReceiveProps() {
    let value = localStorage.getItem('accessToken');
    this.setState({ addPost: { ...this.state.addPost, token_id: value } }, function () {
      this.paramsValueFunc();
    });
    this.setState({ theme: 'snow' });
  }

  paramsValueFunc() {
    if (this.props.match.params.id.trim() !== '') {
      let value = localStorage.getItem('accessToken');
      this.setState({ addPost: { ...this.state.addPost, token_id: value } })
      const temp = {
        news_category_type: this.props.match.params.type,
        category_item_id: parseInt(this.props.match.params.id.trim(), 10),
        category_item_name: this.props.match.params.name.toLowerCase()
      }
      this.state.chipData.push(temp);
      this.setState({ single: '' })
      console.log(this.state.chipData)
      let tempPostData = this.setPostData(this.state.chipData);
      this.setState({ addPost: { ...this.state.addPost, post_data: JSON.stringify(tempPostData) } });
    }
  }



  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditor = (html, content, delta, editor, source) => {
    this.setState({ body: html });
    this.setState({ addPost: { ...this.state.addPost, news_text: this.state.body } }, function () {
    })
  }


  changePostType = event => {
    this.setState({ addPost: { ...this.state.addPost, post_type: event.target.value } });

    this.setState({ module_type_name: '' });
  }

  handleChangePostForName = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ addPost: { ...this.state.addPost, module_type_id: event.target.value } })
  }

  submitPost = () => {

    console.log(this.state.addPost)

    if (this.state.addPost.post_data != '[]' && this.state.addPost.post_data.length != 0 && (!(this.state.addPost.news_text.trim() === '' || this.state.addPost.news_text.trim() === '<p><br></p>'))) {
      this.setState({ isLoading: true });
      items('POST', this.state.addPost, constants.addPost)
        .then(response => {
          console.log(this.state.addPost)
          console.log(response)
          this.setState({ isLoading: false });
          if (response.status === "Success") {
            this.setState({ showPopupForPost: true })
          }
          else if (response.status === "Failure") {

          }
          else {

          }

        })
    }
    else {
      if (this.state.addPost.post_data === '[]' || this.state.addPost.post_data.length == 0) {
        this.setState({ msg: 'Please add in list to post.' })
        this.setState({ open: true });
        setTimeout(() => {
          this.setState({ open: false });
        }, 2500)
      } else if (this.state.addPost.news_text.trim() === '' || this.state.addPost.news_text.trim() === '<p><br></p>') {
        this.setState({ msg: 'Please enter post detail.' })
        this.setState({ open: true });
        setTimeout(() => {
          this.setState({ open: false });
        }, 2500)
      }
    }

  }

  handleClearPost = () => {
    this.state.addPost.news_text = '';
    this.setState({ body: '' });
    this.setState({ addPost: { ...this.state.addPost, post_data: [] } });
    this.setState({ chipData: [] })

    this.setState({ showPopupForPost: false });
  }

  handleClosePopup = () => {
    this.setState({ showPopupForPost: false });
  }

  render() {
    const { vertical, horizontal } = this.state;
    const { classes, ...other } = this.props;

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
      <div className="candidateCardsParent position-relative">
        <div className=" w-100">
          <PrimarySearchAppBar />
        </div>

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor headingPage text-capitalize"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / New {this.state.addPost.post_type}</p>
            </Col>
          </Row>
        </Container>
        {this.state.isLoading === true ? <CircularProgress className={`${classes.circularLoader} loader`} /> : null}

        <Container fluid={true} className="AdminPoliticalPartyContainer mt-4">
          <Row className="marginTop60">
            <Col xs={12} sm={12} lg={3} md={3} xl={3} className="mt-4 text-left">
              <div className="form-inline">
                <h5 className="fontSemiBold18 greyFontColor mr-3 text-uppercase">Add New {this.state.addPost.post_type}</h5>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid={true} className="mt-3 postContainer mb-3">
          <Row className="">
            <Col lg={12} xl={6} className="mb-3">
              <div className="boxShadow p-3">
                <Col xs={12} className="text-left pl-0 pr-0">
                  <FormControl className="flex-row align-items-center">
                    <FormLabel component="span" className="fontSemiBold13 greyFontColor mr-4 text-capitalize ml-1">Select type</FormLabel>
                    <RadioGroup
                      aria-label="post-for"
                      name="post-for"
                      className="inlineButtons pt-2"
                      value={this.state.addPost.post_type}
                      onChange={this.changePostType}
                    >
                      <FormControlLabel value="post" control={<Radio className="primaryColorText" />} label="Post" className="fontSemiBold13 greyFontColor mr-3" />
                      <FormControlLabel value="poll" control={<Radio className="primaryColorText" />} label="Poll" className="fontSemiBold13 greyFontColor mr-3" />
                    </RadioGroup>
                  </FormControl>
                </Col>
                {this.state.addPost.post_type === 'post' ?
                  <Row>
                    <Col xs={12} className="mb-3">
                      <div className="w-100 searchBoxParent form-inline chipsInputContainer">
                        <div className="chipsContainer" id="chips">
                          {this.state.chipData.map(data => {
                            let icon = null;
                            return (
                              <Chip
                                key={data.key}
                                icon={icon}
                                label={data.category_item_name}
                                onDelete={this.handleDelete(data)}
                                className={`${classes.chip} text-capitalize`}
                              />
                            );
                          })}
                          <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                              classes,
                              placeholder: 'Select to post',
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
                      </div>
                    </Col>
                    <Col xs={12} className="text-left">
                      <div className="quillCol quillContAddPost boxShadow">
                        <ReactQuill
                          id="quillDataPost"
                          ref="quill"
                          theme={this.state.theme}
                          modules={AddPost.modules}
                          formats={AddPost.formats}
                          value={this.state.body}
                          placeholder="Write something here*"
                          onChange={this.handleEditor}
                          className="fontRegular12 mt-0"
                        />
                      </div>
                    </Col>
                    <Col xs={12} sm={12} className="mt-3 mb-3 text-right form-inline d-flex justify-content-center">
                      <div className="mt-1 mr-1">
                        <Button variant="contained" size="small" className={classes.importButton} onClick={this.submitPost}>
                          <img src={Add} className={classes.iconMargin}
                            alt="search" width="15"
                          />
                          <span className="text-uppercase">Post Now</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  :

                  null
                }
              </div>
            </Col>
            <Col lg={12} xl={6} className="mb-3 text-left">
              <div className="boxShadow row mr-0 ml-0 addPostContainer h-100 position-relative">
                <span className="col-12 cardHeaderUser darkBackground p-2 previewHeader">Preview</span>
                <div className=" w-100 col-12 p-2 ql-editor previewContainer" id="previewCont">
                  {renderHTML(this.state.body)}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Dialog
          TransitionComponent={Transition}
          open={this.state.showPopupForPost}
          onClose={this.handleCloseDelOpi}
          PaperProps={{
            classes: {
              root: classes.paperOpi
            }
          }}
          {...other}
          BackdropProps={{
            classes: {
              root: classes.rootBackDrop
            }
          }
          }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>
            <div className="p-2 text-center">Your post has been submitted</div>
          </DialogTitle>

          <DialogContent className={classes.dailogContent}>
            <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
              <Row>
                <div className="col-12 mb-4 mt-4">
                  Do you want to clear the post?
                </div>
                <div className="col-12 form-inline d-flex justify-content-center">
                  <div className="ml-2 mr-2">
                    <Button onClick={this.handleClearPost} variant="contained" className={classes.dailogButton}>Yes</Button>
                  </div>
                  <div className="ml-2 mr-2">
                    <Button onClick={this.handleClosePopup} variant="contained" className={classes.dailogButton}>No</Button>
                  </div>
                </div>
              </Row>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <ErrorSnackBar open={this.state.open}
          onClose={this.handleClose}
          anchorOrigin={{ vertical, horizontal }}
          message={this.state.msg}
        />

      </div>


    )
  }
}

AddPost.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    [{ 'color': [] }],
    [{ 'align': [] }],
    ['clean']


  ]
};

AddPost.formats = [

  'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'align', 'color'

];


AddPost = withRouter(AddPost)
export default withStyles(styles)(AddPost);
