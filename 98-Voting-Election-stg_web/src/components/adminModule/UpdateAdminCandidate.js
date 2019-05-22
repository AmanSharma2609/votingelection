/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : update admin candidate (parent component)
Purpose   : This page holds the update candidate tabs as the children
*/
import React, { Component } from 'react';
import {  Badge,  Image, FormControl, Media, Glyphicon, Button} from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardTitle, CardText, CardHeader, CardBody} from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import PrimarySearchAppBar from './appBar/appBar';
import UpdateBasicDetails from './updateCandidateAdmin/basicDetails';
import UpdateGeneralInfo from './updateCandidateAdmin/generalInfo';
import UpdateOtherInfo from './updateCandidateAdmin/otherInfo';
import UpdateCriminalRecord from './updateCandidateAdmin/criminalRecord';
import UpdateContactDetails from './updateCandidateAdmin/contactDetails';
import UpdateAssetsLiabilities from './updateCandidateAdmin/assetsLiabilities';
import { constants } from '../../networkCall/constant'



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  tabLabelStyle:{
     textTransform: 'capitalize',
     color: 'black',
     fontSize:12,
     minWidth: 0,
     paddingLeft: 0,
     paddingRight: 0,
     width: 140,
     fontFamily:'montserratregular',
     '&:focus': {
     outline: 'none',
   },
  },
active_tab:{
  textTransform: 'capitalize',
  fontFamily: 'montserratregular',
  border: 0,
  fontSize:12,
  minWidth: 0,
  paddingLeft: 0,
  paddingRight: 0,
  width: 140,
  color: 'white',
  backgroundColor: '#E18F68',
  '&:focus': {
  outline: 'none',
   },
 },
 appBarStyle: {
   backgroundColor: '#FEF8DF',
   boxShadow: 'none',
 },
 labelContainer: {
   paddingLeft: 0,
   paddingRight: 0,
 },
 labelWrapped: {
   fontSize: 12,
 },
 indicator: {
   backgroundColor: '#E18F68',
 },


});


class UpdateCandidateAdmin extends Component {

  state = {
    value: 0,
    string: null,
    selectedValue: "",
    newValue: '',
    genderFemale: 'Female',
    genderMale: 'Male',
    genderOther: 'Other',
    checkedA: 'Female',
    checkedB: false,
    checkedF: false,
    parameter: {
      votingElection_code: constants.votingElection_code,
      candidate_name :'',
      value1: '',
      candidate_name_as_voter:''
    }
  }
  handleChange = (event, value, index) => {
    this.setState({ value:value });
  };
  handleButtonClick () {
    this.setState({ value: 1 })
  }
  
  handleCandidateName (e) {
    this.setState({ candidate_name: e.target.value })
  }
  handleVoterName (e) {
    this.setState({ candidate_name_as_voter: e.target.value })
  }
  handleChangeSelect = (event) => {
 this.setState({value1: event.target.value1});
}
handleCheckboxChange = (event) =>  {
  this.setState({ selectedValue: event.target.value }, function () {
           })

 };


  render () {
    const { classes } = this.props;

    return(
      <div className="App userElection">
        <PrimarySearchAppBar />

        <div>{this.state.selectedValue}</div>

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / <NavLink className="breadCrumbs" to='/AdminCandidate'>Candidates</NavLink> / Update Candidate</p>
            </Col>
          </Row>
        </Container>
        <Container className="addCandidateContainer mt-5">
          <Row className="tabRowAdmin marginTop60">
            <Col sm={12} xs={12} lg={10} md={12} xl={8} className="tabColAdmin">
               <Card className="tabContainerAdmin" >
                 <CardHeader className="headerAdminAdd fontColor darkBackground fontRegular16">UPDATE CANDIDATE</CardHeader>
                <CardBody className="tabContainerCard">
                  <AppBar position="static"  className={classes.appBarStyle}>
                    <Tabs value={this.state.value}  onChange={this.handleChange}
                      fullWidth={true}
                      scrollButtons="auto"
                      selected={true}
                      classes={{
                        indicator: `${classes.indicator} w-auto`,
                      }}
                    >
                       <Tab   label="Basic Details" className={this.state.value===0 ?classes.active_tab :classes.tabLabelStyle }
                         classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                          }}
                       />
                       <Tab   label="General Info" className={this.state.value===1 ?classes.active_tab :classes.tabLabelStyle }
                         classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                          }}
                       />
                       <Tab   label="Other Info" className={this.state.value===2 ?classes.active_tab :classes.tabLabelStyle }
                         classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                          }}
                       />
                       <Tab   label="Assets & Liabilities" className={this.state.value===3 ?classes.active_tab :classes.tabLabelStyle }
                       classes={{
                        labelContainer: classes.labelContainer,
                        labelWrapped: classes.labelWrapped,
                        }}
                        />

                    
                       <Tab   label="Criminal Record" className={this.state.value===4 ?classes.active_tab :classes.tabLabelStyle }
                         classes={{
                          labelContainer: classes.labelContainer,
                          labelWrapped: classes.labelWrapped,
                          }}
                       />
                       <Tab   label="Contact Details" className={this.state.value===5 ?classes.active_tab :classes.tabLabelStyle }
                       classes={{
                        labelContainer: classes.labelContainer,
                        labelWrapped: classes.labelWrapped,
                        }}
                     />

                     </Tabs>
                   </AppBar>
                   {this.state.value === 0 &&   <UpdateBasicDetails 
                    
                   handleChangeSelect={this.handleChangeSelect.bind(this)}
                   handleCheckboxChange={this.handleCheckboxChange}
                   storeSelectedValue={this.storeSelectedValue}
                   handleVoterName={this.handleVoterName.bind(this)}
                   selectedValue={this.state.selectedValue}
                  />}
                   {this.state.value === 1 &&   <UpdateGeneralInfo />}
                   {this.state.value === 2 &&   <UpdateOtherInfo/>}
                   {this.state.value === 3 &&   <UpdateAssetsLiabilities/>}
                   {this.state.value === 4 &&   <UpdateCriminalRecord/>}
                   {this.state.value === 5 &&   <UpdateContactDetails/>}


                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
    </div>
    )
  }
}

UpdateCandidateAdmin = withRouter(UpdateCandidateAdmin)
export default withStyles(styles)(UpdateCandidateAdmin);
