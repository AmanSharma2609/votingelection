
/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdateCandidateTabs > general info - tab.
Purpose   : Update candidate's general info
*/
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  InputGroup, Input,
}
  from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { constants } from '../../../networkCall/constant'
import { items } from '../../../networkCall/service.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar1 from '../../../networkCall/snackBar.js'
import { withRouter } from 'react-router-dom'



const styles = theme => ({
  iconSize: {
    fontSize: 18
  },
  buttonLogin: {
    width: '100%',
    textTransform: 'capitalize',
    fontFamily: 'montserratregular',
    fontSize: 14,
    height: '15%',
    marginTop: 0.1,
    boxShadow: 'none',
    borderRadius: '3px',
    backgroundColor: '#E18F68',
    color: 'white',
    '&:hover': {
      backgroundColor: '#b75628'
    }

  },
  circularLoader: {
    color: '#E18F68'
  },
})


class UpdateGeneralInfo extends Component {
  state = {

    title: '',
    body: '',
    new: '',
    educationData: [],
    isLoading: true,
    eduData: [],
    education: [''],
    candInfo: false,
    candProf: false,
    candEdu: false,
    successMsg: "General Info updated successfully",
    vertical: 'top',
    horizontal: 'center',
    defaultGeneral: {
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      token_id: "",
      candidate_id: ""
    },
    updateGeneral: {
      votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
      token_id: '',
      candidate_id: '',
      candidate_profession: '',
      candidate_about: '',
      candidate_education_record: ''
    },
    disableButton: false
  }
  onHandleChange = (html, content, delta, source, ) => {

    this.setState({ body: html });

  }

  addInput = (event, index) => {
    event.preventDefault();
    var form = 'hello'
    var allTasks = this.state.eduData.concat([form]);
    this.setState({ eduData: allTasks });
  }
  componentDidMount() {

    let value = localStorage.getItem('accessToken');
    let candidateId = localStorage.getItem('candidateUpdateId')
    this.setState({ updateGeneral: { ...this.state.updateGeneral, token_id: value, candidate_id: candidateId } })
    this.setState({ defaultGeneral: { ...this.state.defaultGeneral, candidate_id: candidateId, token_id: value } }, function () {
      items('POST', this.state.defaultGeneral, constants.defaultGeneralDetail)
        .then(response => {

          if (response.status === "Success") {

            this.setState({ education: response.data[0].candidate_education_rec.split(', ') }, function () {
              this.setState({ updateGeneral: { ...this.state.updateGeneral, candidate_education_record: response.data[0].candidate_education_rec } }, function () {


              })
            })
            this.setState({ updateGeneral: { ...this.state.updateGeneral, candidate_profession: response.data[0].candidate_profession } })
            this.setState({ body: response.data[0].candidate_about }, function () {
              this.setState({ isLoading: false })
            })
          }
        })
    })
  }
  handleEditor = (html, content, delta, editor, source) => {
    this.setState({ body: html });

    this.setState({ updateGeneral: { ...this.state.updateGeneral, candidate_about: this.state.body } }, function () {

      if (this.state.body !== null) {
        this.setState({ candInfo: false })
      }
    })
  }
  handleSelfPro = (event) => {
    this.setState({ updateGeneral: { ...this.state.updateGeneral, candidate_profession: event.target.value } }, function () {

    })
    if (event.target.value !== null) {
      this.setState({ candProf: false })
    }
  }
  handleEducation = (index) => (evt) => {


    this.state.education[index] = evt.target.value;

    if (evt.target.value !== null) {
      this.setState({ candEdu: false })
    }


    this.setState({ updateGeneral: { ...this.state.updateGeneral, candidate_education_record: this.state.education.join(',') } }, function () {


    })
  }
  handleAddShareholder = () => {
    this.state.education.push("")
    this.setState({ education: this.state.education })
    // this.setState({ education: this.state.education.concat([{ name: '' }]) });
  }


  handleRemoveShareholder = (index) => () => {

    this.setState({
      education: this.state.education.filter((_, i) => i !== index)
    });
  }
  handleGeneralUpdate = () => {
    this.setState({ disableButton: true });

    items('POST', this.state.updateGeneral, constants.updateGeneral)
      .then(response => {

        if (response.status === "Success") {
          this.setState({ generalOpen: true })
          setTimeout(() => {
            this.setState({ generalOpen: false })
          }, 4000)
          this.setState({ disableButton: false });
        }
        else {
          this.setState({ disableButton: false });
        }

      })

  }
  handleToCandList = () => {
    this.props.history.push('/AdminCandidate')
  }


  render() {
    const { classes } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <div className="generalCont">
        {this.state.isLoading ? <CircularProgress className={classes.circularLoader} /> :

          <div className="generalCont">
            <Row className="quillRow mb-3">
              <Col sm={12} xs={12} lg={9} md={9} xl={9} className="quillCol">
                <div className="quillCont">
                  <ReactQuill
                    id="quillData"
                    ref="quill"
                    modules={UpdateGeneralInfo.modules}
                    formats={UpdateGeneralInfo.formats}
                    value={this.state.body}
                    placeholder="Write something about this candidate..."
                    onChange={this.handleEditor}
                    className="fontRegular12"
                  />
                </div>
                <div className="fontRegular12 text-danger position-absolute">
                  {this.state.candInfo ? <span>This Field is required</span> : null}

                </div>
              </Col>
            </Row>
            <Row className="selfPRow">
              <Col sm={12} xs={12} lg={9} md={9} xl={9} className="selfPCol">
                <div className="selfPInput">
                  <InputGroup className="firstInput">
                    <Input
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Self Profession (Separated by comma)"
                      autoCompelete={true}
                      maxLength={20}
                      defaultValue={this.state.updateGeneral.candidate_profession}
                      onChange={this.handleSelfPro}
                    />
                  </InputGroup>
                </div>
                <div className="fontRegular12 text-danger position-absolute valdMarginTop">
                  {this.state.candProf ? <span>This Field is required</span> : null}

                </div>
              </Col>
            </Row>

            {this.state.education.map((education, index) => {
              return (

                <Row className="selfPRow" key={index}>

                  <Col sm={12} xs={12} lg={9} md={9} xl={9} className="selfPCol education">

                    <div className="selfPInput position-relative">

                      {index === 0 ? null : <i className="fa fa-times position-absolute crossIcon" onClick={this.handleRemoveShareholder(index)}></i>}
                      <InputGroup className="firstInput">
                        <Input
                          className=" fontRegular12 noBorderRadius"
                          placeholder="Education"
                          autoComplete={true}
                          maxLength={20}
                          defaultValue={education}
                          onChange={this.handleEducation(index)}
                        />
                      </InputGroup>

                    </div>

                  </Col>
                </Row>
              );
            }
            )}
            <Row className="w-75">
              <Col sm={12} xs={12} lg={9} md={9} xl={9}>
                <div className="fontRegular12  text-danger text-left valdMarginTop">
                  {this.state.candEdu ? <span>This Field is required</span> : null}
                </div>
              </Col>
            </Row>
            <Row className="selfPRow">
              <Col sm={12} xs={12} lg={9} md={9} xl={9}>
                <div className="selfPInput">
                  <Button variant="contained"
                    color="grey"
                    onClick={this.handleAddShareholder}
                    className={classes.buttonLogin}>
                    ADD EDUCATION
              </Button>
                </div>
              </Col>
            </Row>
            <Row className="w-100 mr-auto ml-auto">
              <Col sm={12} xs={12} lg={9} md={9} xl={9} className="mr-auto ml-auto mt-3">
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6} xl={6} className="">
                    <Button
                      variant="contained"
                      color="grey"
                      className={classes.buttonLogin}
                      onClick={this.handleToCandList}
                    >
                      CANCEL
                </Button>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6} xl={6} className="">
                    <Button
                      variant="contained"
                      onClick={this.handleGeneralUpdate}
                      disabled={this.state.disableButton}
                      className={classes.buttonLogin}
                    >
                      UPDATE
                </Button>
                  </Col>
                </Row>
                <Snackbar1 open={this.state.generalOpen}
                  anchorOrigin={{ vertical, horizontal }}
                  message={this.state.successMsg}
                />
              </Col>
            </Row>
          </div>
        }
      </div>
    )
  }
}
UpdateGeneralInfo.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }],
    [{ 'align': [] }],


  ]
};

UpdateGeneralInfo.formats = [

  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'color'

];
UpdateGeneralInfo = withRouter(UpdateGeneralInfo)
export default withStyles(styles)(UpdateGeneralInfo);