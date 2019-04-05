/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin constituency
Purpose   : admin constituency view for lok sabha and vidhan sabha
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import WhiteSearch from '../../images/white-search.png'
import Add from '../../images/add.png'
import Download from '../../images/download.png'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { NavLink } from 'react-router-dom'

import PrimarySearchAppBar from './appBar/appBar';
import UserSearchAppBar from '../userModule/userComponents/userAppbar/userAppBar';
import { constants } from '../../networkCall/constant'
import {items} from '../../networkCall/service.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from '../userModule/userComponents/userFooter/footer.js';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
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
        borderRadius: 2,
        backgroundColor: '#E18F68',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    circularLoader: {
        color: '#E18F68',
        marginLeft: 'auto',
        marginRight: 'auto'
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
        borderRadius: 2,
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
        borderRadius: 2,
        backgroundColor: '#E18F68',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    iconMargin: {
        marginRight: '5%',
        color: 'white'
    },
    

    buttonContDailog: {
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover':{
          backgroundColor: '#b75628'
         }
      },
      dailogContent: {
        textAlign: 'center',
        fontFamily: 'montserratregular',
        fontSize: 14,
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
      dailogTitle: {
        textAlign: 'left',
        color: '#fff',
        fontFamily: 'montserratsemibold',
        fontSize: 20,
        fontWeight: 800,
        backgroundColor: '#E18F68',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },

      dailogContentStyle: {
        color: '#555555',
        fontFamily: 'montserratregular',
        fontSize: 16,
      },
      dailogButton: {
        backgroundColor: '#E18F68',
        color: 'white',
        fontFamily: 'montserratregular',
        fontSize: 14,
        boxShadow: 'none',
        borderRadius: 0,
        borderRadius: 5,
        '&:hover':{
          backgroundColor: '#b75628'
         }
      },
      dialogBox: {
        width: '100%'
      },
      
});


class ConstituencyDistrict extends Component {

    state = {
        open: false,
        stateSelect: "Madhya Pradesh",
        districtArray: [],
        districtListLoading: true,
        stateName: "",
        districtSelect: "",
        optionDistrictArray: [],
        optionStateArray: [],
         viewAllState:{
            votingElection_code: constants.votingElectionCode,
        },
        viewDistrictList: {
            votingElection_code: constants.votingElectionCode,
            token_id: null,
            state_id: null
        },
        viewAllDistrict: {
            votingElection_code: constants.votingElectionCode,
            state_id: null,
        },
        addDistrict:{
            votingElection_code: constants.votingElectionCode,
            token_id: null,
            state_id: null,
            district_id:null
        }
        };

    componentDidMount() {
        const stateId = localStorage.getItem('stateId')
        let value = localStorage.getItem('accessToken');
        let stateName = localStorage.getItem('stateName')
        this.setState({ stateName: stateName })        
        this.setState({ viewDistrictList: {...this.state.viewDistrictList, token_id: value, state_id: this.props.match.params.state_id} },function(){
            items('POST', this.state.viewDistrictList, constants.viewDistrictList)
            .then(response => {
                this.setState({ districtArray: response.data })
                this.setState({ districtListLoading: false })
            })

        });
    }

    searchFunction = (array,key,value) => {
        for (var i = 0; i < array.length; i++)
        {
        if (array[i][key] === value)
        {
        return array[i];
        }
        }
        return null;
    }
    
    handleViewAllDistrict = () => {
      const temp =  this.searchFunction(this.state.optionStateArray, "state_name",this.state.stateName)
      this.setState({ viewAllDistrict:{...this.state.viewAllDistrict, state_id: temp.state_id} }, function(){
        items('POST', this.state.viewAllDistrict, constants.viewAllDistrictList)
        .then(response => {
            if(response.status === 'Success')
            {
                if(!(response.data.length === 0 || response.data ===null))
                {
                    this.setState ({ optionDistrictArray: response.data })
                }
            }
            else if(response.status === 'Failure')
            {

            }
            else
            {

            }
        })
      })
    }

    handleDistrictName= (event) => {
        this.setState({ districtSelect: event.target.value }, function(){
        })
        items('POST', this.state.viewDistrictList, constants.viewDistrictList)
        .then(response => {
            if(response.status === 'Success')
            {
                if(!(response.data.length === 0 || response.data ===null))
                {
                    this.setState({ districtArray: response.data })
                }
            }
            else if(response.status === 'Failure')
            {

            }
            else
            {

            }
           
            
        })
    }

    handleAddDistrict = () => {
        const temp = this.searchFunction(this.state.optionDistrictArray,"district_name",this.state.districtSelect )
        this.setState({ addDistrict:{...this.state.addDistrict, district_id: temp.district_id} }, function(){
            items('POST', this.state.addDistrict, constants.addDistrict)
            .then(response=> {
                items('POST', this.state.viewDistrictList, constants.viewDistrictList)
                .then(response => {
                    this.setState({ districtArray: response.data })
                })
            })
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    isAdmin = () => {
        return (localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'admin');
    }

    handleDistrictOpen = () => {
        this.setState({ open: true });
    }

    handleToConstituency = (district_id, district_name) => {
        localStorage.setItem('districtName',district_name )
        localStorage.setItem('districtId',district_id)
        localStorage.setItem('statusSabha', 0)
        if(this.isAdmin()){
            this.props.history.push('/ConstituencyPage/0/'+district_name+'/'+district_id);
        }else{
            this.props.history.push('/UserConstituencyPage/0/'+district_name+'/'+district_id);
        }

    }

   
    render() {
        const { classes } = this.props;
        return (
            <div className="candidateCardsParent adminConstituencyPage">
                { 
                    (this.isAdmin()) ? 
                        <PrimarySearchAppBar /> 
                    :
                        <UserSearchAppBar />
                }

                <Container fluid={true} className="">
                    <Row className="">
                        <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
                        { 
                            (this.isAdmin()) ? 
                                <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / <NavLink className="breadCrumbs" to='/AdminStateConstituency'>Constituencies</NavLink> / {this.state.stateName}</p>
                            :
                                <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / <NavLink className="breadCrumbs" to='/UserStateConstituency'>Constituencies</NavLink> / {this.state.stateName}</p>
                        }
                        </Col>
                    </Row>
                </Container>

                <Container fluid={true} className="AdminPoliticalPartyContainer w-90 mt-4">
                    <Row className="">
                        <Col xs={12} sm={12} lg={3} md={3} xl={3} className="mt-4 text-left">
                            <div className="form-inline">
                                <h5 className="fontSemiBold18 greyFontColor mr-3">Constituencies</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container className="mb-5 minHeight55vh">
                    <Row>
                    {this.state.districtListLoading ? <CircularProgress className={classes.circularLoader}/> :

                        <Col>
                            <div className="mt-3 boxShadow constituencyTable rounded width90 ml-auto mr-auto">
                                <table className="table table-striped text-left">
                                    <thead className="lightBackgroundColor fontSemiBold18">
                                        <tr>
                                            <th className="fontSemiBold14 text-center" scope="col">S.No.</th>
                                            <th className="fontSemiBold14 text-center" scope="col">Constituency Districts</th>
                                            <th className="fontSemiBold14 text-center" scope="col">Constituencies</th>
                                            <th className="fontSemiBold14 text-center" scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    {this.state.districtArray === null ||this.state.districtArray.length === 0 ? <tr className="text-center"><td colSpan="4" className=" fontSemiBold16 text-center">No records available</td></tr> : null}
                                    <tbody>
                                    {this.state.districtArray.map((item, index) => {
                                        return (
                                        <tr className="cursorPointer" onClick={this.handleToConstituency.bind(this,item.district_id, item.district_name)}>
                                            <td className="fontRegular13 text-center widthTable10">{index+1}</td>
                                            <td className="fontRegular13 text-center widthTable40"><span className="cursorPointer" onClick={this.handleToConstituency.bind(this,item.district_id, item.district_name)}>{item.district_name}</span></td>
                                            <td className="fontRegular13 text-center widthTable40">{item.constituency_count}</td>
                                            <td className="fontRegular13 text-center widthTable10">
                                                <div className="d-flex justify-content-center form-inline icon_styling actions" onClick={this.handleToConstituency.bind(this,item.district_id, item.district_name)}>
                                                    <i className="fa fa-eye noHover icon mt-1 ml-1 mr-1 border-0 mb-1 greyFontColor cursorPointer"></i>
                                                </div>
                                            </td>
                                        </tr>
                                        );
                                    }
                                    )}
                                       
                                    </tbody>
                                </table>
                               
                            </div>

                        </Col>
                                }
                    </Row>
                </Container>

                { 
                    (this.isAdmin()) ? 
                        null
                    :
                        <Footer />
                }

            </div>

        )
    }
}
ConstituencyDistrict = withRouter(ConstituencyDistrict)
export default withStyles(styles)(ConstituencyDistrict);