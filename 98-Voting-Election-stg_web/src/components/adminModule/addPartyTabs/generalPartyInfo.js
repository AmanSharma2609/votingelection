/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddPartyTabs > general party info - tab.
Purpose   : Add party's general party info
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import { InputGroup, Input, } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { constants } from '../../../networkCall/constant'
import "react-datepicker/dist/react-datepicker.css";


import partyPic from '../../../images/SVGs/default_partyimg.svg'



const styles = theme => ({
  iconSize: {
    fontSize: 18,
    cursor: 'pointer'
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
    fontSize: 13,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    padding: 0
  },
  labelC: {
    fontFamily: 'montserratregular',
    color: '#555555',
    fontSize: 13,
    width: 105,
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
    borderRadius: 3,
    backgroundColor: '#E18F68',

    color: 'white',
    '&:hover': {
      backgroundColor: '#b75628'
    }

  }
})


class GeneralPartyInfo extends Component {





  profileImageUpload(fileList) {

    if (fileList.length > 0) {

      const headers = new Headers();
      headers.set('enctype', 'multipart/form-data');

      const data = new FormData();

      let token = 'token';

      data.append('token', token);
      data.append('filetoupload', fileList[0]);
      data.append('file_name', fileList[0].name);

    }
  }

  onChange = () => {
    document.getElementById('preview').click();
  }

  handleToPartyList = () => {
    this.props.history.push('/AdminPoliticalParties')
  }


  render() {

    const { classes } = this.props;

    return (
      <div className="basicDetailCont generalInfo">
        <div className="circleBasic">
          <div className="imageUpload d-flex justify-content-center align-items-stretch">
            <Image
              className="circlePoliticalAdmin "
              responsive
              alt={this.props.partyImage === null ? partyPic : this.props.partyImage}
              src={this.props.partyImage === null ? partyPic : this.props.partyImage}
            >
            </Image>
          </div>
          <input
            type="file"
            name="" className="imgUploadFunc"
            id="preview"
            accept=".jpg, .jpeg, .png"
            onChange={this.props.fileChangedHandler} ref="input" />
          <div className="positionBasic">
            <Create className={classes.iconSize} onClick={this.onChange} />
          </div>
        </div>

        <Row className="firstInputContGen">
          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd">
            <div className="firstInputContact ">
              <InputGroup className="firstInputContactGen ">
                <Input
                  maxLength={20}
                  invalid={this.props.partyNameVald === true ? false : true}
                  className="required fontRegular12 noBorderRadius"
                  placeholder="Party Name*"
                  onChange={this.props.handlePartyName}
                  autoCompelete={true}
                  value={this.props.parameter.party_name}
                />

              </InputGroup>
              {this.props.partyNameVald === true ?
                null : <div className="validationCont">{constants.msg.partyNameCheck}</div>
              }
              {this.props.specialCharacterPartyName === true ?
                <div className="validationCont">No special characters allowed</div> : null
              }
            </div>
          </Col>
        </Row>

        <Row className="firstInputContGen">
          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd">
            <div className="firstInputContact ">
              <InputGroup className="firstInputContactGen ">
                <Input
                  maxLength={20}

                  className="required fontRegular12 noBorderRadius"
                  placeholder="Party Code"
                  onChange={this.props.handlePartyCode}
                  autoCompelete={true}
                  value={this.props.parameter.party_code}
                />

              </InputGroup>

              {this.props.specialCharacterPartyCode === true ?
                <div className="validationCont">No special characters allowed</div> : null
              }
            </div>
          </Col>
        </Row>

        {/* <------------------Radio-Button--------------------> */}

        <div className="radioInputCheckbox row">
          <Row className="">
            <Col className="NoPad checkBoxHeight margin-left-negative" >
              <FormControlLabel classes={{
                label: classes.label
              }}
                control={
                  <Radio
                    checked={this.props.parameter.party_type === "State Party"}
                    onClick={this.props.handlePartyType}
                    value="State Party"

                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}

                  />
                }
                label="State Party"
              />
            </Col>
            <Col className="NoPad checkBoxHeight">
              <FormControlLabel classes={{
                label: classes.label
              }}
                control={
                  <Radio
                    checked={this.props.parameter.party_type === "National Party"}
                    onClick={this.props.handlePartyType}
                    value="National Party"
                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}

                  />
                }
                label="National Party"
              />
            </Col>
            <Col className="NoPad checkBoxHeight">
              <FormControlLabel classes={{
                label: classes.label
              }}
                control={
                  <Radio
                    checked={this.props.parameter.party_type === 'Unrecognized'}
                    onClick={this.props.handlePartyType}
                    value="Unrecognized"
                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}

                  />
                }
                label="Unrecognized"
              />
            </Col>

          </Row>
        </div>

        <Row className="twoInputRowGen">
          <Col sm={12} xs={12} lg={10} md={5} xl={5} className="inputColAdd newMargin">
            <div className="firstInputTwo ">
              <InputGroup className="firstInput">
                <select value={this.props.valueParty} onChange={this.props.handleRegistrationState} className="fontRegular12 pl-2 greyFontColor sizeSelect noBorderRadius">
                  <option disabled value="">Select Registration State*</option>
                  {this.props.stateOptionArray.map((item, index) => {
                    return (
                      <option key={item.state_id} value={item.state_name}>{item.state_name}</option>
                    );
                  }
                  )}
                </select>

              </InputGroup>
              {this.props.registrationStateVald === true ?
                null : <div className="validationCont">{constants.msg.registrationStateCheck}</div>
              }
            </div>
          </Col>
          <Col sm={12} xs={12} lg={5} md={5} xl={5} className="inputColAdd newMargin">
            <div className="firstInputTwo position-relative addCandidate">
              <InputGroup className="firstInputGeneralOne datePickerCandidate">

                <Input
                  type="date"
                  autoCompelete={true}
                  selected={this.props.startDate}
                  onChange={this.props.handleDateChange}
                  value={this.props.parameter.party_year_of_establishment}
                  className="text-uppercase dateInput fontRegular12 pl-2 fontRegular14 form-control noBorderRadius dateInput"
                  placeholder="Date of Registration"
                  min={"1947-12-31"} />

              </InputGroup>
              {/* {this.props.registrationDateVald === true ?
                null : <div className="validationCont"> * This Field is required</div>
              } */}
            </div>
          </Col>
        </Row>

        <Row className="firstInputContP">
          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd">
            <div className="firstInputContactP ">
              <InputGroup className="firstInputContactP ">
                <Input
                  invalid={this.props.presidentVald === true ? false : true}
                  className=" fontRegular12 noBorderRadius"
                  placeholder="President"
                  maxLength={20}
                  onChange={this.props.handlePresidentName}
                  autoCompelete={true}
                  value={this.props.parameter.party_chairperson}
                />
              </InputGroup>
              {/* {this.props.presidentVald === true ?
                null : <div className="validationCont"> * This Field is required</div>
              } */}
            </div>
          </Col>
        </Row>

        {/* <----------------------Radio-2----------------------> */}

        <div className="radioInputCheckbox row">
          <Row className="">
            <Col className="NoPad checkBoxHeight margin-left-negative">
              <FormControlLabel classes={{
                label: classes.labelC
              }}
                control={
                  <Radio
                    checked={this.props.parameter.party_status === "Currently Active"}
                    onClick={this.props.handlePartyStatus}
                    value="Currently Active"
                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}

                  />
                }
                label="Currently Active"
              />
            </Col>
            <Col className="NoPad checkBoxHeight">
              <FormControlLabel classes={{
                label: classes.label
              }}
                control={
                  <Radio
                    checked={this.props.parameter.party_status === "Not Active"}
                    onClick={this.props.handlePartyStatus}
                    value="Not Active"

                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}

                  />
                }
                label="Not Active"
              />
            </Col>

            <Col sm={12} xs={12} lg={12} md={12} xl={12} className="NoPad " >

            </Col>
          </Row>
        </div>{this.props.partyActiveVald === true ? null :
          <Row className="firstInputVal">
            <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAddVal">
              <div className="validationCont"> * This Field is required</div>
            </Col>
          </Row>
        }
        <Row className="twoButtonRow mb-3">
          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonOneBasicCol">
            <Button
              variant="contained"
              color="grey"
              className={classes.buttonLogin}
              onClick={this.handleToPartyList}
            >
              CANCEL
             </Button>
          </Col>
          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonBasicCol">
            <Button
              variant="contained"
              disableRipple={true}
              onClick={this.props.handleGeneralPartyClick}
              className={classes.buttonLogin}
            >
              NEXT
             </Button>
          </Col>
        </Row>


      </div>
    )
  }
}
GeneralPartyInfo = withRouter(GeneralPartyInfo)
export default withStyles(styles)(GeneralPartyInfo);
