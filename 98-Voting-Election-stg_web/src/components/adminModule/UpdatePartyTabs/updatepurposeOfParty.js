
/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdatePartyTabs > general info - tab.
Purpose   : Update party's general info
*/

import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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
    borderRadius: 3,
    backgroundColor: '#E18F68',
    color: 'white',
    '&:hover':{
      backgroundColor: '#b75628'
     }

  }
})


class UpdatePurposeOfParty extends Component {

  
 
  render() {

    const { classes } = this.props;

    return(
      <div className="purposeCont">
        <Row className="quillRowPurpose">
         <Col sm={12} xs={12} lg={8} md={8} xl={8} className="quillColPurpose">
           <div className="quillContPurpose">
         <ReactQuill
           modules={UpdatePurposeOfParty.modules}
           formats={UpdatePurposeOfParty.formats}
           value={this.props.body}
           defaultValue={this.props.body}
           placeholder="Describe purpose of party"
           onChange={this.props.handleUpdatePartyPurpose}
           className="quillPurpose"
          />
          {this.props.UpdatePurposeVald ? null :
          <Row className="firstInputPurpose">
          <Col sm={12} xs={12} lg={12} md={12} xl={12} className="inputColAddVal NoPad">
          <div className="validationContPurp"> * This Field is required</div>
          </Col>
          </Row>
          }
          </div>
         </Col>
       </Row>
       <Row className="twoButtonRow">
         <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonOneBasicCol">
           <Button
             variant="contained"
             color="grey"
             onClick={this.props.handlePartyPurpose}
             className={classes.buttonLogin}
           >
             GO BACK
           </Button>
         </Col>
         <Col sm={12} xs={12} md={6} lg={6} xl={6} className="buttonBasicCol">
           <Button
             variant="contained"
             onClick={this.props.handleUpdatePurposePartyClick}
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

UpdatePurposeOfParty.modules = {
toolbar: [
 [{ font: [] }],
 [{ size: [] }],
 ['bold', 'italic', 'underline'],
  [{ 'color': [] }],
 [{ 'align': [] }],


]
};

UpdatePurposeOfParty.formats = [

'font',
'size',
'bold',
'italic',
'underline',
'align',
'color'

];


export default withStyles(styles)(UpdatePurposeOfParty);
