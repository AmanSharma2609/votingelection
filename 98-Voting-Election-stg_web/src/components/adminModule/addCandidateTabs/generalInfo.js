/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateTabs > general info - tab.
Purpose   : Add candidate's general info
*/
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  InputGroup, Input
}
  from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    backgroundColor: '#E18F68',
    color: 'white',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: '#b75628'
    },
  }
})


class GeneralInfo extends Component {
  state = {

    title: '',
    body: '',
    new: '',
    educationData: [],
    eduData: [''],
   
  }
  


  addInput = (event, index) => {
    event.preventDefault();
    var form = ''
    var allTasks = this.state.eduData.concat([form]);
    this.setState({ eduData: allTasks });
  }

  removeEdu = (inds) => {

    this.setState({
      eduData: this.state.eduData.filter((_, i) => i !== inds)
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="generalCont">
        <Row className="quillRow mb-3">
          <Col sm={12} xs={12} lg={9} md={9} xl={9} className="quillCol">
            <div className="quillCont">
              <ReactQuill
                id="quillData"
                ref="quill"
                modules={GeneralInfo.modules}
                formats={GeneralInfo.formats}
                value={this.props.body}
                placeholder="Write something about this candidate..."
                onChange={this.props.handleEditor}
                className="quill"
              />
            </div>
          
          </Col>
        </Row>
        <Row className="selfPRow">
          <Col sm={12} xs={12} lg={9} md={9} xl={9} className="selfPCol">
            <div className="selfPInput">
              <InputGroup className="firstInput">
                <Input
                  className="fontRegular12 noBorderRadius"
                  placeholder="Self Profession (Separated by comma)"
                  autoCompelete={true}
                  maxLength={20}
                  defaultValue={this.props.addCandidateParameter.candidate_profession}
                  onChange={this.props.handleSelfPro}
                />
              </InputGroup>
            </div>
           
          </Col>
        </Row>

        {this.props.education.map((education, index) => {
          return (

            <Row className="selfPRow" key={index}>

              <Col sm={12} xs={12} lg={9} md={9} xl={9} className="selfPCol education">

                <div className="selfPInput position-relative">

                  {index === 0 ? null : <i className="fa fa-times position-absolute crossIcon" onClick={this.props.handleRemoveShareholder(index)}></i>}
                  <InputGroup className="firstInput">
                    <Input
                      className=" fontRegular12 noBorderRadius"
                      placeholder="Education"
                      autoComplete={true}
                      maxLength={20}
                      defaultValue={education}
                      onChange={this.props.handleEducation(index)}
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
       
        </Col>
        </Row>
        <Row className="selfPRow">
          <Col sm={12} xs={12} lg={9} md={9} xl={9}>
            <div className="selfPInput">
              <Button variant="contained"
                color="grey"
                onClick={this.props.handleAddShareholder}
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
                  onClick={this.props.handleGoBackGeneral}
                >
                  GO BACK
                </Button>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={6} className="">
                <Button
                  variant="contained"
                  onClick={this.props.handleGeneralClick}
                  className={classes.buttonLogin}
                >
                  NEXT
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
GeneralInfo.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }],
    [{ 'align': [] }],


  ]
};

GeneralInfo.formats = [

  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'color'

];

export default withStyles(styles)(GeneralInfo);