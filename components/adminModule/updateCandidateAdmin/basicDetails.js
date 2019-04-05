/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdateCandidateTabs > basic-detail - tab.
Purpose   : Update candidate's basic detail
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import { withRouter } from 'react-router-dom'
import {
  InputGroup, Input
}
  from 'reactstrap';
  import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';

import {ImageUpload} from '../../../networkCall/imageUpload.js'
import { constants } from '../../../networkCall/constant'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import Snackbar1 from '../../../networkCall/snackBar.js'
import {items} from '../../../networkCall/service.js'

import userOne from '../../../images/SVGs/default_userimg.svg'

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
  },

  textField: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    margin: 0.01,
  },
  circularLoader: {
    color: '#E18F68'
  },
  buttonLogin: {
    width: '100%',
    textTransform: 'capitalize',
    fontFamily: 'montserratregular',
    fontSize: 14,
    height: '15%',
    borderRadius: '3px',
    marginTop: 0.1,
    boxShadow: 'none',
    backgroundColor: '#E18F68',
    color: 'white',
    '&:hover': {
        backgroundColor: '#b75628'
    }


  }
})

class UpdateBasicDetails extends Component {
  state = {
    parameterGeneral: {
      votingElection_code: constants.votingElectionCode,
      candidate_name: '',
      candidate_relation: '',
      candidate_relation_name: '',
      candidate_gender: '',
      admin_password: '',
    },
    candNameVald: false,
    candVoterName: false,
    candRelName: false,
    candGender: false,
    candDob: false,
    candParty: false,
    startDate:'',
    isLoading: true,
    selectedValue: '',
    basicDetail:{
      votingElection_code : constants.votingElectionCode,
      candidate_DOB: '',
      candidate_gender: "",
      candidate_name: "",
      candidate_name_as_voter: "",
      candidate_party_id: '',
      candidate_party_name: "",
      candidate_relation: "",
      candidate_relation_name: "",
      candidate_id: ''

    },
    partyOptionArray:[],
    selectedOption: null,
    date: "1990-06-05",
    format: "YYYY-MM-DD",
    inputFormat: "DD/MM/YYYY",
    valueParty:'',
    valueRelation:'',
    errorMsg:"Something went wrong, Please try again",
    mode: "date",
    successMsg:"Basic detail updated successfully",
    basicOpen: false,
    vertical: 'top',
    horizontal: 'center',
    basicDetailDefault: {
      votingElection_code : constants.votingElectionCode,
      token_id :'',
      candidate_id :'',
    },
    partyList: {
      votingElection_code: constants.votingElectionCode,
      type:'admin'
    },
    dateHold : null,
    candidateImage: null,
    disableButton : false,
    imageProfileData : ''
  };

    /* setting up the existing basic detail info of candidate */
  componentDidMount () {
    
    let value = localStorage.getItem('accessToken');
    let candidateId = localStorage.getItem('candidateUpdateId')
    this.setState({  basicDetail: {...this.state.basicDetail,token_id: value, candidate_id: candidateId}})
    items('POST', this.state.partyList, constants.getPartiesList)
    .then(response => {
      if(response.status === "Success"){
        this.setState({ partyOptionArray: response.data }, function(){
          setTimeout(() => {
            this.setState({ basicDetailDefault:{...this.state.basicDetailDefault, token_id: value, candidate_id: candidateId} }, function(){
              items('POST', this.state.basicDetailDefault, constants.defaultBasicDetail)
              .then(response=> {
                if(response.status === "Success"){
                  if(response.data[0].candidate_party_name !== null){
                    this.setState({ valueParty: response.data[0].candidate_party_name }, function(){
                      this.setState({ basicDetail:{...this.state.basicDetail, candidate_party_name:response.data[0].candidate_party_name } }, function(){
                        console.log(this.state.basicDetail.candidate_party_name)
                        console.log(this.state.partyOptionArray)
                       const temp = this.searchFunction(this.state.partyOptionArray, "party_name", this.state.basicDetail.candidate_party_name)
                        console.log(temp)
                       setTimeout(() => {
                         this.setState({ basicDetail:{...this.state.basicDetail, candidate_party_id: temp.party_id} })
                       },100)
                       
                       
         
                      })
                    })
                   }
                  this.setState({ basicDetail:{...this.state.basicDetail, candidate_name:response.data[0].candidate_name,
                    candidate_name_as_voter: response.data[0].candidate_name_as_voter.trim() === '' ? '' :response.data[0].candidate_name_as_voter.trim(),
                    candidate_date_of_birth: response.data[0].candidate_date_of_birth,
                    candidate_relation_name:response.data[0].candidate_relation_name.trim() ==='' ? '':response.data[0].candidate_relation_name.trim(),
                    
                    
                   } })
                   this.setState({ candidateImage: response.data[0].candidate_img_url })
                   this.setState({ valueRelation: response.data[0].candidate_relation }, function(){

                     this.setState({ basicDetail: {...this.state.basicDetail, candidate_relation:response.data[0].candidate_relation } })
                   })
                   this.setState({ selectedValue :response.data[0].candidate_gender }, function(){
                     this.setState({ basicDetail:{...this.state.basicDetail, candidate_gender:response.data[0].candidate_gender} })
                   })
                  
                  this.setState({ isLoading: false })
                }
              })
            })
          },10)
        })
      }
      else if(response.status === "Failure"){
        this.setState({ errorOpen: true })
        setTimeout(() => {
          this.setState({ errorOpen: false })
        },2000)
      }
    })
    
  }
  searchFunction = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  //get value form the input fields start
  handleChangeSelect = (e) => {
    this.setState({ valueRelation: e.target.value },function(){
       this.setState({ basicDetail:{...this.state.basicDetail, candidate_relation: this.state.valueRelation} })
    })
  }
  handleChangeSelectParty = (e) => {
    this.setState({ candParty: false })
    this.setState({ valueParty: e.target.value },function(){
       this.setState({ basicDetail:{...this.state.basicDetail, candidate_party_name: this.state.valueParty} } , function(){
         
        const temp =this.searchFunction(this.state.partyOptionArray, "party_name", this.state.valueParty)
        this.setState({ basicDetail:{...this.state.basicDetail, candidate_party_id: temp.party_id} })
       })
    })
  }
  handleDateOfBirth = (event) => {
    let date = event.target.value;
    this.setState({
      startDate: date
    });
    this.setState({ basicDetail: { ...this.state.basicDetail, candidate_date_of_birth: date } }, function () {
      if(this.state.basicDetail.candidate_date_of_birth !== null){
        this.setState({ candDob: false })
      }
    })
    
  }
  
  handleCandidateName = (e) => {
    this.setState({ basicDetail: {...this.state.basicDetail, candidate_name: e.target.value} },() => {
      this.setState({ basicDetail:{...this.state.basicDetail, candidate_name: this.state.basicDetail.candidate_name.trim()} })
    })
    this.setState({ candNameVald: false })

  }
  handleRelationName = (e) => {
    this.setState({ basicDetail: {...this.state.basicDetail, candidate_relation_name: e.target.value} })
    this.setState({ candRelName: false })

  }
  handleVoterName = (e) => {
    this.setState({ basicDetail:{...this.state.basicDetail, candidate_name_as_voter: e.target.value} },function(){
    })
    this.setState({ candVoterName: false })

  }
  //get value form the input fields start

  //empty input field valdations
  checkEmpty = () => {
    let isError = false
    if(this.state.basicDetail.candidate_name.trim() === '' ||this.state.basicDetail.candidate_name === '' ){
      isError = true
      this.setState({ candNameVald: true })
    }
    if(this.state.basicDetail.candidate_relation_name.trim() === '' || this.state.basicDetail.candidate_relation_name==='' ){
      isError = true
      this.setState({ candRelName: true })
    }
    if(this.state.valueParty === ''){
      isError = true
      this.setState({ candParty: true })
    }
    return isError
  }

  //update basic detail function
 handleUpdateBasicDetail = () => {
   const check = this.checkEmpty()
   if(check === true ){
     
   }
   else{  
    this.setState({disableButton : true});
   items('POST', this.state.basicDetail, constants.updateBasicDetail)
   .then(response =>{
    ImageUpload(constants.votingElectionCode,
      localStorage.getItem('accessToken'), 'candidate', localStorage.getItem('candidateUpdateId'), this.state.imageProfileData, constants.imageUpload)
      .then(response => {
      });

     if(response.status === "Success"){
       this.setState({ basicOpen: true })
        this.globalSearchAutoSuggest()
       setTimeout(() => {
        this.setState({ basicOpen: false })
      
       }, 2000)
       
       this.setState({disableButton : false});
     }
     else if(response.status === "Failure"){
      this.setState({ errorOpen: true })
      setTimeout(() => {
        this.setState({ errorOpen: false })
      })
      this.setState({disableButton : false});
    }
   })

   }
   
 }
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
        localStorage.setItem(btoa('search_data_admin'), JSON.stringify(val));
        localStorage.setItem(btoa('search_data'), JSON.stringify(val));
      }
      else if (response.status === "Failure") {

      }
      else {

      }
    });
}

 handleCheckboxChange= (e) => {
   this.setState({ selectedValue: e.target.value })
   this.setState({ basicDetail: {...this.state.basicDetail, candidate_gender: e.target.value} }, function(){
   })
 }

 handleToCandList = () => {
  this.props.history.push('/AdminCandidate')
}

//Image upload function start
fileChangedHandler = (event) => {
  var reader = new FileReader();
  reader.onload = this.profilePic.bind(this);
  reader.readAsBinaryString(event.target.files[0]);
  this.setState({imageProfileData :  event.target.files[0]});
}

profilePic(readerEvt) {
  var binaryString = readerEvt.target.result;
  let filestring = btoa(binaryString);  // Converting binary string data.
  this.setState({ candidateImage: 'data:image/jpeg;base64,' + filestring });
}

onChange = () => {
  document.getElementById('updateCandidateImage').click();
}
//Image upload function end

  render() {
    const { vertical, horizontal } = this.state; 
    const { classes } = this.props;
    return (
      <div className="basicDetailCont mt-3">
      {this.state.isLoading ?   <CircularProgress  className={classes.circularLoader} /> : 
      <div className="basicDetailCont mb-4">

        <div className="circleBasic mb-2">
        <div className="imageUpload d-flex justify-content-center align-items-stretch">
          <Image
            className="circlePoliticalAdmin "
            src={this.state.candidateImage === null || this.state.candidateImage === '' ? userOne : this.state.candidateImage}
          >
          </Image>

          </div>
          <div className="positionBasic">
            <Create className={classes.iconSize} onClick={this.onChange} />
          </div>
        </div>
        <input  
        type="file"
        name="" className="imgUploadFunc" 
        id="updateCandidateImage"
        accept=".jpg, .jpeg, .png"
          onChange={this.fileChangedHandler} ref="input" />
        <Row className="firstInputCont">
          <Col sm={12} xs={12} lg={9} md={9} xl={9} className="inputColAdd">
            <div className="firstInput">
              <InputGroup className="firstInput">
                <Input
                  className=" fontRegular12 noBorderRadius"
                  placeholder="Candidate Name*"
                  defaultValue={this.state.basicDetail.candidate_name}
                  maxLength={45}
                  onChange={this.handleCandidateName}
                />
              </InputGroup>
            </div>
            <div className="fontRegular12 text-danger position-absolute">
            {this.state.candNameVald ? <span>{constants.msg.nameEmpty}</span> : null }
              
            </div>
          </Col>
        </Row>

        <Row className="firstInputContSelect">
          <Col sm={12} xs={12} lg={9} md={9} xl={9} className="inputColAdd">
            <div className="firstInput">
              <InputGroup className="firstInput">
                <Input
                  className=" fontRegular12 noBorderRadius"
                  placeholder="Name as in Voter ID"
                  defaultValue={this.state.basicDetail.candidate_name_as_voter}
                  maxLength={45}
                  onChange={this.handleVoterName}
                />
              </InputGroup>
            </div>
            <div className="fontRegular12 text-danger position-absolute">
            {this.state.candVoterName ? <span>This Field is required</span> : null }
              
            </div>
          </Col>
        </Row>

        <Row className="firstInputContSelect">
          <Col sm={12} xs={12} lg={9} md={9} xl={9} className="inputColAdd">
            <div className="firstInput">

              <InputGroup className="firstInput">
                <select value={this.state.valueRelation} onChange={this.handleChangeSelect} className="fontRegular12 greyFontColor">
                  <option value="D/o" className="mt-1 mb-1">D/o</option>
                  <option value="S/o" className="mt-1 mb-1">S/o</option>
                </select>
                <Input
                  className=" fontRegular12 noBorderRadius"
                  placeholder="Father Name*"
                  onChange={this.handleRelationName}
                  defaultValue={this.state.basicDetail.candidate_relation_name}
                  maxLength={25}
                />
              </InputGroup>
            </div>
            <div className="fontRegular12 text-danger position-absolute">
            {this.state.candRelName ? <span>{constants.msg.fatherNameEmpty}</span> : null }
              
            </div>
          </Col>
        </Row>

        <Row className="w-100">
          <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
            <div className="form-inline">
              <div className="mr-3 fontSemiBold14">
                Gender :
              </div>

              <div className="fontSemiBold14 mr-auto">
                <FormGroup className={classes.fontLabel} row>
                  <FormControlLabel classes={{
                    label: classes.label
                  }}
                    control={
                      <Radio
                        checked={this.state.selectedValue === "Female"}
                        onChange={this.handleCheckboxChange}
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
                        checked={this.state.selectedValue === "Male"}
                        onChange={this.handleCheckboxChange}
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
                        checked={this.state.selectedValue === "Other"}
                        onChange={this.handleCheckboxChange}
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
            <div className="fontRegular12 text-danger position-absolute">
            {this.state.candGender ? <span>This Field is required</span> : null }
              
            </div>
          </Col>
        </Row>

        <Row className="firstInputContSelect mb-4">
        <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
        <div className="mt-3 dateBorder position-relative addCandidate">
          <InputGroup className="firstInput datePickerCandidate">
            
            <Input 
            type="date" 
            autoCompelete={true}
            onKeyDown={(e) => e.preventDefault()}
            onChange={this.handleDateOfBirth}
            value={this.state.basicDetail.candidate_date_of_birth}
            className="text-uppercase dateInput fontRegular12 pl-2 fontRegular14 form-control border-0 dateInput"
            max={"2010-12-31"} placeholder="DATE OF BIRTH" 
            min={"1947-12-31"}  />
          </InputGroup>
          
        </div>
        <div className="fontRegular12 text-danger position-absolute">
        {this.state.candDob ? <span>This Field is required</span> : null }
          
        </div>
      </Col>
        </Row>

        <Row className="firstInputContSelect">
          <Col sm={12} xs={12} lg={9} md={9} xl={9} className="inputColAdd">
            <div className="inputColAdd">
              <InputGroup className="firstInput">
                <select value={this.state.valueParty} onChange={this.handleChangeSelectParty} className="fontRegular12 greyFontColor sizeSelect noBorderRadius">
                <option disabled value="">Select Party*</option>

                {this.state.partyOptionArray.map((item, index) => {
                  return (
                    <option key={item.party_name} value={item.party_name}>{item.party_name}</option>
                  );
                }
                )}
                </select>

              </InputGroup>
            </div>
            <div className="fontRegular12 text-danger position-absolute">
            {this.state.candParty ? <span>{constants.msg.partyCheck}</span> : null }
              
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
                  onClick={this.handleToCandList}
                >
                
                  CANCEL
                </Button>
              </Col>
              <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                <Button
                  variant="contained"
                  onClick={this.handleUpdateBasicDetail}
                  className={classes.buttonLogin}
                  disabled = {this.state.disableButton}
                >
                  UPDATE 
                </Button>
              </Col>
              <Snackbar1 open={this.state.basicOpen}
              anchorOrigin={{ vertical, horizontal }}
              message={this.state.successMsg}
            />
            <ErrorSnackBar open={this.state.errorOpen}
            onClose={this.handleClose}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.errorMsg}
          />
            </Row>
          </Col>
        </Row>
       </div>
      }
      </div>
    
    )
  }
}

UpdateBasicDetails = withRouter(UpdateBasicDetails)
export default withStyles(styles)(UpdateBasicDetails);