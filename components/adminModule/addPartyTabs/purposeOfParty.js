/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddPartyTabs > purpose of party  - tab.
Purpose   : Add party's purpose
*/
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { withRouter } from 'react-router-dom'
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
    borderRadius: 3,
    backgroundColor: '#E18F68',
    color: 'white',
    '&:hover': {
      backgroundColor: '#b75628'
    }

  }
})


class PurposeOfParty extends Component {



  render() {

    const { classes } = this.props;

    return (
      <div className="purposeCont">
        <Row className="quillRowPurpose">
          <Col sm={12} xs={12} lg={8} md={8} xl={8} className="quillColPurpose">
            <div className="quillContPurpose">
              <ReactQuill
                modules={PurposeOfParty.modules}
                formats={PurposeOfParty.formats}
                value={this.props.body}
                placeholder="Describe purpose of party"
                onChange={this.props.handlePartyPurpose}
                className="quillPurpose fontRegular12"
              />
              {this.props.partyPurposeVald === true ? null :
                <Row className="firstInputPurpose">
                  <Col sm={12} xs={12} lg={12} md={12} xl={12} className="inputColAddVal NoPad">
                    <div className="validationContPurp">This Field is required*</div>
                  </Col>
                </Row>
              }
            </div>
          </Col>
        </Row>
        <Row className="twoButtonRow pb-4">
          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonOneBasicCol">
            <Button
              variant="contained"
              color="grey"
              className={classes.buttonLogin}
              onClick={this.props.goToGeneralTab}
            >
              GO BACK
           </Button>
          </Col>
          <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonBasicCol">
            <Button
              variant="contained"
              onClick={this.props.handlePurposePartyClick}
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

PurposeOfParty.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }],
    [{ 'align': [] }],


  ]
};

PurposeOfParty.formats = [

  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'color'

];

PurposeOfParty = withRouter(PurposeOfParty)
export default withStyles(styles)(PurposeOfParty);
