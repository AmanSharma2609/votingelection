/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdateCandidateTabs > contact detail - tab.
Purpose   : Update candidate's contact detail
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
    InputGroup, Input,
}
    from 'reactstrap';
    import CircularProgress from '@material-ui/core/CircularProgress';

    import { constants } from '../../../networkCall/constant'
    
    import { items } from '../../../networkCall/service.js'
    import { withRouter } from 'react-router-dom'
    import Snackbar1 from '../../../networkCall/snackBar.js'

    


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
        borderRadius: 0,
        backgroundColor: '#E18F68',
        color: 'white',
        borderRadius: '3px',
        '&:hover': {
            backgroundColor: '#b75628'
          }
    },
    circularLoader: {
        color: '#E18F68',
        zIndex: 1
      },
})


class UpdateContactDetails extends Component {
    state = {
        title: '',
        body: '',
        new: '',
        isLoading: true,
        educationData: [],
        eduData: [],
        vertical: 'top',
        horizontal: 'center',
        contactOpen: false,
        successMsg: 'Contact details updated successfully',
        defaultContact:{
            votingElection_code :'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
            token_id :'',
            candidate_id :''
        },
        updateContactDetail:{
            votingElection_code :'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
            token_id :'',
            candidate_id :'',
            candidate_email :'',
            candidate_phone_no :'',
            candidate_address :'',
            candidate_home_town :''
        },
        
        disableButton : false
    }


    //setting the existing value to the input fields
    componentDidMount () {
        let candidateId = localStorage.getItem('candidateUpdateId')
        let value = localStorage.getItem('accessToken');
        this.setState({ updateContactDetail:{...this.state.updateContactDetail, token_id: value, candidate_id: candidateId} })
        this.setState({ defaultContact:{...this.state.defaultContact, token_id: value, candidate_id: candidateId} }, function(){
            items('POST', this.state.defaultContact, constants.defaultContact)
            .then(response => {
                if(response.status === "Success"){
                    this.setState({ updateContactDetail:{...this.state.updateContactDetail,
                         candidate_address: response.data[0].candidate_address.trim() === '' ? '' :response.data[0].candidate_address.trim() ,
                        candidate_email: response.data[0].candidate_email.trim(),
                    candidate_home_town: response.data[0].candidate_home_town.trim() ==='' ? '' : response.data[0].candidate_home_town.trim(),
                     candidate_phone_no: response.data[0].candidate_phone_no} }, function(){
                    })
                    this.setState({ isLoading: false })
                }
            })
        })
    }
    handleToCandList = () => {

        this.props.history.push('/AdminCandidate')
      }

      //updating contact details function
      handleContactDetails = () => {    
            this.setState({disableButton : true});
                items("POST", this.state.updateContactDetail, constants.updateContact)
                .then(response => {
                    if(response.status === "Success"){
                        this.setState({ contactOpen: true })
                        setTimeout(() => {
                            this.setState({ contactOpen: false })
                        }, 4000)
                        this.setState({disableButton : false});
                    }
                    else{
                        this.setState({disableButton : false});
                    }
                })
        
      }

      //getting values from the input fields start
      handleHomeTown = (e) => {
          this.setState({ updateContactDetail:{...this.state.updateContactDetail, candidate_home_town: e.target.value} })
      }
      handleEmailAddress = (e) => {
        this.setState({ updateContactDetail:{...this.state.updateContactDetail, candidate_email: e.target.value} })
      }
      handlePhoneNumber = (e) => {
        this.setState({ updateContactDetail:{...this.state.updateContactDetail, candidate_phone_no: e.target.value} })
      }
      handleCurrentAddress = (e) => {
        this.setState({ updateContactDetail:{...this.state.updateContactDetail, candidate_address: e.target.value} })
      }
       //getting values from the input fields starts

    render() {
        const { classes } = this.props;
        const { vertical, horizontal } = this.state; 

        return (
            <div className="candidate_contact_details">
            {this.state.isLoading ? <CircularProgress className={classes.circularLoader} /> :
            <div className="candidate_contact-details">
            <Snackbar1 open={this.state.contactOpen}
            anchorOrigin={{ vertical, horizontal }}
            message={this.state.successMsg}
          />
              <Container>
                    <Row>
                        <Col>
                            <div className="mt-3">
                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        <div className="mt-3">
                                            <InputGroup className="firstInput">
                                                <Input
                                                    className="fontRegular12 noBorderRadius"
                                                    placeholder="Hometown"
                                                    defaultValue={this.state.updateContactDetail.candidate_home_town}
                                                    onChange={this.handleHomeTown}
                                                />
                                            </InputGroup>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        <div className="mt-3">
                                            <InputGroup className="firstInput">
                                                <Input
                                                    className="fontRegular12 noBorderRadius"
                                                    placeholder="Email Address"
                                                    maxLength={40}
                                                    onChange={this.handleEmailAddress}
                                                    defaultValue={this.state.updateContactDetail.candidate_email}
                                                />
                                            </InputGroup>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        <div className="mt-3">
                                            <InputGroup className="firstInput">
                                                <Input
                                                    type="text"
                                                    // maxlength={10}
                                                    onInput={(e)=>{
                                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0,12)
                                                    }}
                                                    className="fontRegular12 noBorderRadius"
                                                    placeholder="Phone Number"
                                                    onChange={this.handlePhoneNumber}
                                                    defaultValue={this.state.updateContactDetail.candidate_phone_no}
                                                />
                                            </InputGroup>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        <div className="mt-3 w-100">
                                            <textarea type="text" 
                                            className="w-100 fontRegular12 noBorderRadius p-2" 
                                            rows="5" 
                                            maxLength="70"
                                            placeholder="Current Address"
                                            onChange={this.handleCurrentAddress}
                                            defaultValue={this.state.updateContactDetail.candidate_address}
                                            ></textarea>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="ml-auto mr-auto mt-4">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
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
                                                    onClick={this.handleContactDetails}
                                                    className={classes.buttonLogin}
                                                    disabled = {this.state.disableButton}
                                                >
                                                    UPDATE
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
                </div>
        }
            </div>
        )
    }
}
UpdateContactDetails = withRouter(UpdateContactDetails)
export default withStyles(styles)(UpdateContactDetails);