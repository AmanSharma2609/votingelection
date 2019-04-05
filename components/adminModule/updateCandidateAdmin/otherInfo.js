/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdateCandidateTabs > other info - tab.
Purpose   : Update candidate's other info
*/
import React, { Component } from 'react';
import { Badge, Image, Media, } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
    InputGroup, Input
   
}
    from 'reactstrap';
    import CircularProgress from '@material-ui/core/CircularProgress';


import 'react-quill/dist/quill.snow.css';
import { constants } from '../../../networkCall/constant'
import {items} from '../../../networkCall/service.js'
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
        borderRadius: '3px',
        height: '15%',
        marginTop: 0.1,
        boxShadow: 'none',
        borderRadius: 0,
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


class UpdateOtherInfo extends Component {
    state = {
        title: '',
        body: '',
        new: '',
        educationData: [],
        eduData: [],
        awards: [''],
        legislature: [''],
        isLoading: true,
        otherOpen: false,
        successMsg: "Other Info updated successfully",
        vertical: 'top',
        horizontal: 'center',
        defaultCandOther:{
            votingElection_code :'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
            token_id :'',
            candidate_id :''
        },
        updateOther:{
            votingElection_code :'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
            token_id :'',
            candidate_id :'',
            candidate_awards :'',
            candidate_interests :'',
            candidate_religious_view :'',
            candidate_legislature :'',
        },
        disableButton : false
    }
    componentDidMount () {
        let value = localStorage.getItem('accessToken');
        let candidateId = localStorage.getItem('candidateUpdateId')
        this.setState({ updateOther:{...this.state.updateOther, token_id: value, candidate_id: candidateId} })
        this.setState({ defaultCandOther:{...this.state.defaultCandOther, token_id: value, candidate_id: candidateId} }, function(){
            items('POST', this.state.defaultCandOther, constants.defaultOther)
            .then(response => {
                this.setState({ awards: response.data[0].candidate_awards.split(', ') }, function(){
                    this.setState({ updateOther: { ...this.state.updateOther, candidate_awards:  response.data[0].candidate_awards,
                    candidate_interests: response.data[0].candidate_interests,
                    candidate_religious_view:response.data[0].candidate_religious_views
                    } }, function () {
                       
                      })
                })
                this.setState({ legislature: response.data[0].candidate_legislature.split(', ') }, function(){
                    this.setState({ updateOther: { ...this.state.updateOther, candidate_legislature:  response.data[0].candidate_legislature } }, function () {
                       this.setState({ isLoading: false })
                      })
                })
            })
        })

    }

    addAwards = (event,index) => {
        event.preventDefault();
        var form = ''
        var allTasks = this.state.awards.concat([form]);
        this.setState({awards: allTasks});
       }

       addLegislature= (event, index) => {
        event.preventDefault();
        var form = ''
        var allTasks = this.state.legislature.concat([form]);
        this.setState({legislature: allTasks});
       }

       removeAwards = (indx)=>{
        this.setState({
            awards: this.state.awards.filter((_, i) => i !== indx)
          });
       }

       removeLegislature =(indx)=>{
        this.setState({
            legislature: this.state.legislature.filter((_, i) => i !== indx)
          });
       }

       handleInterests = (e) => {
        this.setState({ addCandidateParameter: { ...this.state.addCandidateParameter, candidate_interests: e.target.value } })
        if(e.target.value !== null){
          this.setState({ candInteres: false })
        }
      }
      
      handleAwards = (index) => (evt) => {
        this.state.awards[index] = evt.target.value;
        if(evt.target.value !== "") {
          this.setState({ candAwards: false })
        }
        this.setState({ awards: this.state.awards });
        this.setState({ updateOther: { ...this.state.updateOther, candidate_awards: this.state.awards.join(',') } }, function () {
        })
      }
      handleLegislature = (index) => (evt) => {
        this.state.legislature[index] = evt.target.value;
        if(evt.target.value !== ""){
          this.setState({ candLegis: false })
        }
        this.setState({ legislature: this.state.legislature });
        this.setState({ updateOther: { ...this.state.updateOther, candidate_legislature: this.state.legislature.join(',') } }, function () {
        })
      }
      handleInterests = (e) => {
          this.setState({ updateOther:{...this.state.updateOther,candidate_interests: e.target.value } })
      }
      handleReligiousView =(e) =>{
        this.setState({ updateOther:{...this.state.updateOther,candidate_religious_views: e.target.value } })
        this.setState({ updateOther:{...this.state.updateOther,candidate_religious_view: e.target.value } })
      }
      handleOtherInfoClick= () => {
          this.setState({disableButton : true});
        items('POST', this.state.updateOther, constants.updateOther)
        .then(response =>{
            if(response.status === "Success"){
                this.setState({ otherOpen: true })
                setTimeout(() => {
                    this.setState({ otherOpen: false })     
                }, 4000)
                this.setState({disableButton : false});
            }
            else
            {
                this.setState({disableButton : false});
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
            <div className="candidate_other_info">
            {this.state.isLoading ?   <CircularProgress  className={classes.circularLoader} /> : 

            <div className="candidate_other_info">
                <Container>
                    <Row>
                        <Col>
                            <div className="mt-3">
                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        <div className="mt-3">
                                            <InputGroup className="firstInput">
                                                <Input
                                                    className=" fontRegular12 noBorderRadius"
                                                    placeholder="Interests (Separated by Commas)"
                                                    maxLength={40}
                                                    defaultValue={this.state.updateOther.candidate_interests}
                                                    onChange={this.handleInterests}
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
                                                    className=" fontRegular12 noBorderRadius"
                                                    placeholder="Religious View"
                                                    maxLength={40}
                                                    defaultValue={this.state.updateOther.candidate_religious_view}
                                                    onChange={this.handleReligiousView}
                                                />
                                            </InputGroup>
                                        </div>
                                      
                                    </Col>
                                </Row>
                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        {this.state.awards.map((awards,index) => {
                                            return(
                                                <div className="mt-3 position-relative education" key={index}>
                                                    
                                                    { index===0 ? null : <i className="fa fa-times position-absolute crossIcon" onClick={this.removeAwards.bind(this, index)}></i>}
                                                   
                                                    <InputGroup className="firstInput">
                                                        <Input
                                                            className=" fontRegular12 noBorderRadius"
                                                            placeholder="Awards"
                                                            defaultValue={awards}
                                                            maxLength={20}
                                                            onChange={this.handleAwards(index)}
                                                        />
                                                    </InputGroup>
                                                   
                                                </div>
                                            );
                                        }
                                        )}
                                        <div className="fontRegular12  text-danger  position-absolute  ">
                                        {this.props.candAwards ? <span>This Field is required</span> : null }
                                        </div>
                                        <div className="text-right cursorPointer" onClick={this.addAwards}>
                                            + ADD AWARDS
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                    {this.state.legislature.map((legislature,index)=> {
                                    return(
                                        <div className="mt-3 position-relative education"  key={index}>
                                            { index===0 ? null : <i className="fa fa-times position-absolute crossIcon" onClick={this.removeLegislature.bind(this, index)}></i>}
                                            <InputGroup className="firstInput">
                                                <Input
                                                    className=" fontRegular12 noBorderRadius"
                                                    placeholder="Legislature"
                                                    defaultValue={legislature}
                                                    maxLength={20}
                                                    onChange={this.handleLegislature(index)}
                                                />
                                            </InputGroup>
                                          
                                        </div>
                                    );
                                    }
                                    )}
                                    <div className="fontRegular12  text-danger  position-absolute  ">
                                    {this.props.candLegis ? <span>This Field is required</span> : null }
                                    </div>
                                        <div className="text-right cursorPointer" onClick={this.addLegislature}>
                                            + ADD LEGISLATURE
                                        </div>
                                    </Col>
                                </Row>
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
                                        disabled = {this.state.disableButton}
                                        variant="contained"
                                        onClick={this.handleOtherInfoClick}
                                        className={classes.buttonLogin}
                                    >
                                        UPDATE
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
                </div>
                                }
                                <Snackbar1 open={this.state.otherOpen}
                                anchorOrigin={{ vertical, horizontal }}
                                message={this.state.successMsg}
                              />
            </div>
        )


    }
}
UpdateOtherInfo = withRouter(UpdateOtherInfo)
export default withStyles(styles)(UpdateOtherInfo);