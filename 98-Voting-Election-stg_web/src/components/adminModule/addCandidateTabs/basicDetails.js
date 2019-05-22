/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateTabs > basic-detail - tab.
Purpose   : Add candidate's basic detail
*/
import React, { Component } from 'react';
import { Image, } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import {
  InputGroup, Input
 
}
  from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import { constants } from '../../../networkCall/constant'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';


import userOne from '../../../images/SVGs/default_userimg.svg'


const styles = theme => ({
  iconSize: {
    fontSize: 18
  },
  root: {
    '&$checked': {
      color: '#E18F68',
    },
  },
  checked: {
    color: '#E18F68',

  },
  fontLabel: {
    fontFamily: 'montserratregular',
    color: '#555555',
  },
  label: {
    fontFamily: 'montserratregular',
    color: '#555555',
  },

  textField: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    margin: 0.01,
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
    }


  }
})


class BasicDetails extends Component {

  render() {
    
    const { classes } = this.props;
    return (
      <div className="basicDetailCont mt-3">
        <div className="circleBasic mb-2">

          <div className="imageUpload d-flex justify-content-center align-items-stretch">
            <Image
              className="circle w-100"
              src={this.props.candidateImage === null ? userOne : this.props.candidateImage}
            >
            </Image>
          </div>
          <input 
           type="file"  
           className="imgUploadFunc" 
           id="preview"
           accept=".jpg, .jpeg, .png"
           onChange={this.props.fileChangedHandler} ref="input" />
          <div className="positionBasic cursorPointer">
            <Create className={classes.iconSize} onClick={this.onChange} id="file" />
          </div>
        </div>

        <Container fluid={true}>
          <Row className="ml-auto mr-auto">
            <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
              <div className="mt-3">
                <InputGroup className="firstInput">
                  <Input
                    className=" fontRegular12 noBorderRadius"
                    placeholder="Candidate Name*"
                    value={this.props.addCandidateParameter.candidate_name}
                    autoCompelete={true}
                    maxLength={25}
                    onChange={this.props.handleCandidateName}
                  />
                </InputGroup>
              </div>
              <div className="fontRegular12 text-danger position-absolute">
              {this.props.candNameVald ? <span>{constants.msg.nameEmpty}</span> : null }
                
              </div>
            </Col>
          </Row>

          <Row className="ml-auto mr-auto">
            <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
              <div className="mt-3">
                <InputGroup className="firstInput">
                  <Input
                    className=" fontRegular12 noBorderRadius"
                    placeholder="Name as in Voter ID"
                    autoCompelete={true}
                    maxLength={45}
                    defaultValue={this.props.addCandidateParameter.candidate_name_as_voter}
                    onChange={this.props.handleNameAsVoterId}
                  />
                </InputGroup>
              </div>
           
            </Col>
          </Row>

          <Row className="ml-auto mr-auto">
            <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
              <div className="mt-3">
                <InputGroup className="firstInput">
                  <select value={this.props.addCandidateParameter.candidate_relation} onChange={this.props.handleRelation} className="fontRegular12 greyFontColor">
                    <option value="D/O" className="mt-1 mb-1">D/O</option>
                    <option value="S/O" className="mt-1 mb-1">S/O</option>
                  </select>
                  <Input
                    className=" fontRegular12 noBorderRadius"
                    placeholder="Father Name *"
                    autoCompelete={true}
                    defaultValue={this.props.addCandidateParameter.candidate_relation_name}
                    onChange={this.props.handleRelationName}
                    maxLength={45}
                  />
                </InputGroup>
              </div>
              <div className="fontRegular12 text-danger position-absolute">
              {this.props.candRelName ? <span>{constants.msg.fatherNameEmpty}</span> : null }
                
              </div>
            </Col>
          </Row>

          <Row className="w-100 ml-auto mr-auto mt-3">
            <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
              <div className="form-inline">
                <div className="fontSemiBold14 mr-3">
                  Gender :
              </div>

                <div className="fontSemiBold14 mr-auto">
                  <FormGroup className={classes.fontLabel} row>
                    <FormControlLabel classes={{
                      label: classes.label
                    }}
                      control={
                        <Radio
                          checked={this.props.addCandidateParameter.candidate_gender === "Female"}
                          onChange={this.props.handleGenderChange}
                          value="Female"

                          classes={{
                            root: classes.root,
                            checked: classes.checked,
                          }}

                        />
                      }
                      label="Female"
                    />
                    <FormControlLabel classes={{
                      label: classes.label
                    }}
                      control={
                        <Radio
                          checked={this.props.addCandidateParameter.candidate_gender === "Male"}
                          onChange={this.props.handleGenderChange}
                          value="Male"
                          classes={{
                            root: classes.root,
                            checked: classes.checked,
                          }}

                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel classes={{
                      label: classes.label
                    }}
                      control={
                        <Radio
                          checked={this.props.addCandidateParameter.candidate_gender === "Other"}
                          onChange={this.props.handleGenderChange}
                          value="Other"
                          classes={{
                            root: classes.root,
                            checked: classes.checked,
                          }}

                        />
                      }
                      label="Others"
                    />
                  </FormGroup>
                </div>

              </div>
            
            </Col>
          </Row>

          <Row className="ml-auto mr-auto">
            <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
              <div className="mt-3 position-relative dateBorder addCandidate">
                <InputGroup className="firstInput datePickerCandidate">
                  
                  <Input 
                          type="date" 
                         autoCompelete={true}
                         value={this.props.addCandidateParameter.candidate_date_of_birth}
                         onChange={this.props.handleDateOfBirth}
                         onKeyDown={(e) => e.preventDefault()}
                          className="text-uppercase dateInput fontRegular12 pl-2 fontRegular14 form-control border-0 dateInput"
                           max={"2010-12-31"} placeholder="DATE OF BIRTH" 
                            min={"1947-12-31"}  />
                  
                </InputGroup>
               
              </div>
             
            </Col>
          </Row>

          <Row className="ml-auto mr-auto">
            <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
              <div className="mt-3">
                <InputGroup className="firstInput">
                  <select value={this.props.valueParty} onChange={this.props.handleChangeSelect} className="fontRegular12 greyFontColor sizeSelect noBorderRadius">
                  <option disabled value="">Select Party*</option>

                    {this.props.partyOptionArray.map((item, index) => {
                      return (
                        <option key={item.party_name} value={item.party_name}>{item.party_name}</option>
                      );
                    }
                    )}
                  </select>
                </InputGroup>
              </div>
              <div className="fontRegular12 text-danger position-absolute">
              {this.props.candParty ? <span>{constants.msg.partyCheck}</span> : null }
                
              </div>
            </Col>
          </Row>

          <Row className="w-100 mr-auto ml-auto">
            <Col Col sm={12} xs={12} lg={9} md={9} xl={9} className="mr-auto ml-auto mt-3">
              <Row>
                <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                  <Button
                    variant="contained"
                    color="grey"
                    className={classes.buttonLogin}
                    onClick={this.props.handleToCandList}
                  >
                    CANCEL
                </Button>
                </Col>
                <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                  <Button
                    variant="contained"
                    onClick={this.props.handleButtonClick}
                    className={classes.buttonLogin}
                  >
                    NEXT
                </Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </Container>
      </div>
    )
  }
}


export default withStyles(styles)(BasicDetails);