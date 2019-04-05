/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin  profile
Purpose   : admin profile view
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import PrimarySearchAppBar from './appBar/appBar';
import userOne from '../../images/SVGs/default_userimg.svg'
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Add from '../../images/add.png';
import {items} from '../../networkCall/service.js';
import { constants } from '../../networkCall/constant';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

const styles = theme => ({

    buttonLogin: {
        width: 'calc(90% - 20px)',
        fontFamily: 'montserratregular',
        fontSize: 14,
        height: '20%',
        marginTop: 0.1,
        borderRadius: 0,
        backgroundColor: '#E18F68',
        color: 'white',
        boxShadow: 'none'
    },
    button: {
        margin: theme.spacing.unit,
    },
    searchButton: {
        marginRight: '2%',
        boxShadow: 'none',
        borderRadius: 0,
        fontFamily: 'montserratregular',
        fontSize: 12,
        color: 'white',
        backgroundColor: '#E18F68',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    importButton: {
        marginLeft: '2%',
        boxShadow: 'none',
        borderRadius: 0,
        fontFamily: 'montserratregular',
        fontSize: 12,
        color: 'white',
        width: 160,
        backgroundColor: '#E18F68',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    addButton: {
        boxShadow: 'none',
        borderRadius: 0,
        fontFamily: 'montserratregular',
        fontSize: 12,
        color: 'white',
        width: 160,
        backgroundColor: '#E18F68',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    circularLoader: {
        color: '#E18F68'
      },
    iconMargin: {
        marginRight: '5%',
        color: 'white'
    },
});


class AdminProfile extends Component {

    state = {
        data : [],
        loading : true,
        adminName : '',
        adminGender : '',
        adminLocation : '',
        adminEmail : '',
        adminDOB : '',
        adminMobile : ''
    }

    componentDidMount(){
        this.adminProfileDetail();
    }

    adminProfileDetail()
    {
        let requestedData = {
          votingElection_code: constants.votingElectionCode,
          token_id :localStorage.getItem('accessToken'),
          admin_id : 1
        }

        items('POST', requestedData, constants.adminProfile)
          .then(response => {
            if(response.status === "Success"){
                this.setState({adminName : response.data[0].admin_name});
                this.setState({adminDOB : response.data[0].admin_dob});
                this.setState({adminGender : response.data[0].admin_gender});
                this.setState({adminMobile : response.data[0].admin_mobile_no});
                this.setState({adminEmail : response.data[0].admin_email});
                this.setState({adminLocation : response.data[0].admin_location});
                this.setState({loading:false})
           }           
           else if(response.status === "Failure"){
            this.setState({loading:false})
           }
           else {
            this.setState({loading:false})
           }
          });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="candidateCardsParent">
                <PrimarySearchAppBar />

                <Container fluid={true} className="">
                    <Row className="">
                        <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
                            <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / Admin Profile </p>
                        </Col>
                    </Row>
                </Container>

               
                <Container fluid={true} className="AdminPoliticalPartyContainer w-90 mt-5">
                    <Row className="">
                        <Col xs={12} sm={12} lg={3} md={3} xl={3} className="mt-4 text-left">
                            <div className="form-inline">
                                <h5 className="fontSemiBold18 greyFontColor mr-3">Admin Profile</h5>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} lg={9} md={9} xl={9} className="mt-3 text-right form-inline d-flex justify-content-end">
                            <div className="mt-1">
                            <NavLink to='/AdminUpdateProfile' activeClassName={classes.buttonActive} className="linkRouter">
                                <Button variant="contained" size="small"
                                    className={classes.addButton}
                                >
                                    <img src={Add} className={classes.iconMargin}
                                        alt="search" height="15" width="15"
                                    />
                                    EDIT PROFILE
                                </Button>
                            </NavLink>
                               
                            </div>
                        </Col>
                    </Row>
                </Container>
                
                {this.state.loading === true ? <CircularProgress className={classes.circularLoader}></CircularProgress> :
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={8} lg={6}>
                            <div className="mt-3 boxShadow p-4 rounded form-inline">
                                <div>
                                    <div className="mr-3 adminProfileImageDiv position-relative position-relative">
                                        <Image
                                            className="circle"
                                            src={userOne}
                                            img-fluid
                                        >
                                        </Image>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="fontSemiBold14 text-left">
                                        {this.state.adminName}
                                    </div>
                                    <div className="fontRegular12 mt-2 text-left">
                                        <div>Gender : {this.state.adminGender}</div>
                                        <div>D.O.B : {this.state.adminDOB === '0000-00-00' ? null : this.state.adminDOB}</div>
                                        <div>Email : {this.state.adminEmail}</div>
                                        <div>Mobile : {this.state.adminMobile}</div>
                                        <div>Location : {this.state.adminLocation}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                }
            </div>
        )
    }
}
AdminProfile = withRouter(AdminProfile)
export default withStyles(styles)(AdminProfile);
