/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdatePartyTabs > general info - tab.
Purpose   : Update party's general info
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import {
  InputGroup, Input
}
  from 'reactstrap';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { withRouter } from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";
import partyPic from '../../../images/SVGs/default_partyimg.svg'
import { constants } from '../../../networkCall/constant'



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
    textAlign: 'left',
    whiteSpace: 'nowrap'
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
var date = new Date();

class UpdateGeneralPartyInfo extends Component {
  state = {
    startDate: '',
  };
  componentDidMount () {
  }

  handleToPartyList = () => {
    this.props.history.push('/AdminPoliticalParties')
  }


  onChange = () => {
    document.getElementById('updatePartyProfile').click();
  }

  render() {

    const { classes } = this.props;

    return (
      <div className="basicDetailCont generalInfo pb-3">
        <div className="circleBasic">
          <div className="imageUpload d-flex justify-content-center align-items-stretch">
            <Image
              className="circlePoliticalAdmin img-fluid "
              src={this.props.partyImage === null || this.props.partyImage === '' ? partyPic : this.props.partyImage }
              responsive
              rounded
            >
            </Image>
            </div>
            <div className="positionBasic">
              <Create className={classes.iconSize} onClick={this.onChange} />
            </div>
        </div>
        <input
          type="file"
           className="imgUploadFunc"
          id="updatePartyProfile"
          accept=".jpg, .jpeg, .png"
          onChange={this.props.fileChangedHandler}
          ref="input"
        />
        <Row className="firstInputContGen">
          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd">
            <div className="firstInputContact ">
              <InputGroup className="firstInputContactGen ">
                <Input
                  className=" fontRegular12 noBorderRadius"
                  placeholder="Party Name"
                  maxLength={20}
                  invalid={this.props.UpdateNameVald === true ? false : true}
                  onChange={this.props.handleUpdatePartyName}
                  defaultValue={this.props.parameter.party_name}
                />
              </InputGroup>
              {this.props.UpdateNameVald === true ?
                null : <div className="validationCont">{constants.msg.partyNameCheck}</div>
              }
            </div>
          </Col>
        </Row>

        <Row className="firstInputContGen">
          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd">
            <div className="firstInputContact ">
              <InputGroup className="firstInputContactGen ">
                <Input
                  className=" fontRegular12 noBorderRadius"
                  placeholder="Party Code"
                  maxLength={20}

                  onChange={this.props.handleUpdatePartyCode}
                  defaultValue={this.props.parameter.party_code}
                />
              </InputGroup>

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
                    onClick={this.props.handleUpdatePartyType}
                    value="State Party"
                    defaultValue={this.props.parameter.party_type}

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
                    onClick={this.props.handleUpdatePartyType}
                    value="National Party"
                    defaultValue={this.props.parameter.party_type}
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
                    onClick={this.props.handleUpdatePartyType}
                    value="Unrecognized"
                    defaultValue={this.props.parameter.party_type}
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
          <Col sm={12} xs={12} lg={5} md={5} xl={5} className="inputColAdd newMargin">
            <div className="firstInputTwo ">
              <InputGroup className="firstInput">
                <select value={this.props.valueOfParty} onChange={this.props.handleUpdateRegistrationState} className="fontRegular12 greyFontColor sizeSelect noBorderRadius">
                  <option disabled value="">State</option>

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
                         onChange={this.props.handleUpdateDateChange}
                         value={this.props.parameter.party_year_of_establishment}
                          className="text-uppercase dateInput fontRegular12 pl-2 fontRegular14 form-control noBorderRadius dateInput"
                           placeholder="Date of Registration"
                            min={"1947-12-31"}  />

                </InputGroup>           
            </div>
          </Col>
        </Row>

        <Row className="firstInputContP">
          <Col sm={12} xs={12} lg={10} md={10} xl={10} className="inputColAdd">
            <div className="firstInputContactP ">
              <InputGroup className="firstInputContactP ">
                <Input
                  className=" fontRegular12 noBorderRadius"
                  placeholder="President"
                  maxLength={20}
                  invalid={this.props.presidentVald === true ? false : true}
                  onChange={this.props.handleUpdatePresidentName}
                  defaultValue={this.props.parameter.party_chairperson}
                />
              </InputGroup>          
            </div>
          </Col>
        </Row>

        {/* <----------------------Radio-2----------------------> */}

        <div className="radioInputCheckbox row">
          <Row className="">
            <Col className="NoPad checkBoxHeight margin-left-negative">
              <FormControlLabel classes={{
                label: classes.label
              }}
                control={
                  <Radio
                    checked={this.props.parameter.party_status === "Not Active"}
                    onClick={this.props.handleUpdatePartyStatus}
                    value="Not Active"
                    defaultValue={this.props.parameter.party_status}

                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}

                  />
                }
                label="Not Active"
              />
            </Col>
            <Col className="NoPad checkBoxHeight">
              <FormControlLabel classes={{
                label: classes.labelC
              }}
                control={
                  <Radio
                    checked={this.props.parameter.party_status === "Currently Active"}
                    onClick={this.props.handleUpdatePartyStatus}
                    value="Currently Active"
                    defaultValue={this.props.parameter.party_status}
                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}

                  />
                }
                label="Currently Active"
              />
            </Col>
          </Row>

        </div>

        <Row className="twoButtonRow">
          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonOneBasicCol">
            <Button
              variant="contained"
              onClick={this.handleToPartyList}
              className={classes.buttonLogin}
            >
              CANCEL
             </Button>
          </Col>
          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonBasicCol">
            <Button
              variant="contained"
              onClick={this.props.handleUpdateGeneralPartyClick}
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
UpdateGeneralPartyInfo = withRouter(UpdateGeneralPartyInfo)
export default withStyles(styles)(UpdateGeneralPartyInfo);
