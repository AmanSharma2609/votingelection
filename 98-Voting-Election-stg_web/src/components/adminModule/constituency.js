/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin constituency
Purpose   : admin constituency view 
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import UserSearchAppBar from '../userModule/userComponents/userAppbar/userAppBar';
import Footer from '../userModule/userComponents/userFooter/footer.js';
import PrimarySearchAppBar from './appBar/appBar';
import { constants } from '../../networkCall/constant'
import {items} from '../../networkCall/service.js'



function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    tabLabelStyle: {
        textTransform: 'capitalize',
        color: 'black',
        fontSize: 15,
        fontFamily: 'montserratregular',
        '&:focus': {
          outline: 'none',
        },
    },
    active_tab: {
        textTransform: 'capitalize',
        border: 0,
        fontSize: 15,
        fontFamily: 'montserratregular',
        color: 'white',
        backgroundColor: '#E18F68',
        '&:focus': {
          outline: 'none',
        },
    },
    indicator:{
        backgroundColor: '#E18F68',
    },
    appBarStyle: {
        backgroundColor: '#FEF8DF',
        boxShadow: 'none',
        borderBottom: '2px solid #ddd'
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
        '&:hover': {
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
        color: '#ffffff',
        fontFamily: 'montserratsemibold',
        fontSize: 20,
        fontWeight: 800,
        backgroundColor: '#E18F68',
    },

    dailogContentStyle: {
        color: 'white',
        fontFamily: 'montserratregular',
        fontSize: 16,
    },
    dailogButton: {
        backgroundColor: '#E18F68',
        color: 'white',
        fontFamily: 'montserratregular',
        fontSize: 14,
        boxShadow: 'none',
        borderRadius: 5,
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    dialogBox: {
        width: '100%'
    },
    circularLoader: {
        color: '#E18F68',
        marginLeft: 'auto',
        marginRight: 'auto'
      },

});


class StateconstituencyPageAdmin extends Component {

    state = {
        value: 0,
        open: false,
        openState: false,
        stateArray: [],
        stateArrayLokSabha: [],
        addPartyVald : true,
        stateSelect: "Madhya Pradesh",
        optionArray : [],
        stateListLoading: true,
        stateListParameter: {
            votingElection_code: constants.votingElectionCode,
            token_id: null,
            constituency_type: 'vidhan-sabha'
        },
        stateListParameterLokSabha: {
            votingElection_code: constants.votingElectionCode,
            token_id: null,
            constituency_type: 'lok-sabha'
        },
        addState: {
            votingElection_code: constants.votingElectionCode,
            token_id: null,
            state_id: null
        },
        viewAllState:{
            votingElection_code: constants.votingElectionCode
        } 

    };

    isAdmin = () => {
        return (localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'admin');
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleCloseState = () => {
        this.setState({ openState: false });
    }
    openStateDailogue = () => {
        this.setState({ openState: true });

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    componentDidMount () {
        let value = localStorage.getItem('accessToken');
        items('POST', this.state.viewAllState, constants.viewAllState)
        .then(response => {
            this.setState({ optionArray: response.data })
        })
        this.setState({ addState: {...this.state.addState, token_id: value  } })

        this.setState({ stateListParameter: {...this.state.stateListParameter, token_id: value  } }, function(){
           this.stateList();
        })

        this.setState({ stateListParameterLokSabha: {...this.state.stateListParameterLokSabha, token_id: value  } }, function(){
            this.stateListLokSabha();
         })

       

    }

    

    stateList = () => {
        items('POST', this.state.stateListParameter, constants.stateList)
        .then(response => {
            if(response.status === 'Success')
            {
                if(!(response.data.length === 0 || response.data ===null))
                {
                    this.setState({ stateArray: response.data })
                }
                this.setState({ stateListLoading: false })  
            }
            else if(response.status === 'Failure')
            {

            }
            else
            {

            }
          });
    }

    stateListLokSabha = () => {
        items('POST', this.state.stateListParameterLokSabha, constants.stateList)
        .then(response => {
            if(response.status === 'Success')
            {
                if(!(response.data.length === 0 || response.data ===null))
                {
                    this.setState({ stateArrayLokSabha: response.data })
                }
                this.setState({ stateListLoading: false })
            }
            else if(response.status === 'Failure')
            {

            }
            else
            {

            }
           
          })
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
    handleAddStateName = (event) => {
        this.setState({ stateSelect: event.target.value }, function(){
        })
        
    }

    handleAddState = () => {
        const temp = this.searchFunction(this.state.optionArray, "state_name", this.state.stateSelect)
        this.setState({ addState:{...this.state.addState , state_id: temp.state_id}}, function(){
            items('POST', this.state.addState, constants.addState)
            .then(response => {
                this.stateList();
            })
        })
    }
    
    handleAddStateCountry = (e ,state_id) =>{
    
    }

    handleToDistrict = (state_id, state_name) => {
        localStorage.setItem('stateId',state_id)
        localStorage.setItem('stateName', state_name)
        if(this.isAdmin()){
            this.props.history.push({
                pathname: '/AdminConstituencyPageDistrict/0/'+state_name+'/'+state_id,
                state: { state_id, state_name }
            })
        }else{
            this.props.history.push({
                pathname: '/UserConstituencyPageDistrict/0/'+state_name+'/'+state_id,
                state: { state_id, state_name }
            })
        }
    }


    handleToDistrictLokSabha = (state_id, state_name) => {
        localStorage.setItem('statusSabha', 1)
        localStorage.setItem('stateId',state_id)
        localStorage.setItem('stateName', state_name)
        if(this.isAdmin()){
            this.props.history.push({
                pathname: '/ConstituencyPage/1/'+state_name+'/'+state_id,
                state: { state_id, state_name }
            })
        }else{
            this.props.history.push({
                pathname: '/UserConstituencyPage/1/'+state_name+'/'+state_id,
                state: { state_id, state_name }
            })
        }        
    }


    handleChangeApp = (event, value, index) => {
        this.setState({ value: value });
      };

    render() {
        const { classes, ...other } = this.props;
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
                                    <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / Constituencies</p>
                                :
                                    <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / Constituencies</p>
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

                <Container className="mt-3 mb-5 userProfileContainer">
                    <div className="boxShadow row_height width90 ml-auto mr-auto">
                        <AppBar position="static" className={classes.appBarStyle}>
                            <Tabs value={this.state.value} onChange={this.handleChangeApp}
                            fullWidth={true}
                            classes={{
                                indicator: classes.indicator,
                            }}
                            scrollButtons="auto"
                            selected={true}
                            >
                            <Tab label="Lok Sabha constituencies " className={this.state.value===0 ? classes.active_tab : classes.tabLabelStyle} />
                            <Tab label="Vidhan Sabha constituencies" className={this.state.value === 1 ? classes.active_tab : classes.tabLabelStyle} />

                            </Tabs>
                        </AppBar>
                        <Row className="">
                            {this.state.stateListLoading ? <CircularProgress className={classes.circularLoader}/> :
                            <Col>
                                <div className="constituencyTable rounded">
                                {this.state.value === 1 && <div className="" >
                                    <table className="table table-striped text-left">
                                        <thead className="lightBackgroundColor fontSemiBold18">
                                            <tr>
                                                <th className="fontSemiBold14 text-center" scope="col">S.No.</th>
                                                <th className="fontSemiBold14 text-center" scope="col">State Assemblies</th>
                                                <th className="fontSemiBold14 text-center" scope="col">District</th>
                                                <th className="fontSemiBold14 text-center" scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.stateArray === null ||this.state.stateArray.length === 0 ? <tr className="text-center"><td colSpan="4" className=" fontSemiBold16 text-center">No records available</td></tr> : null}
                                        {this.state.stateArray.map((item, index) => {
                                            return (
                                            <tr className="cursorPointer" onClick={this.handleToDistrict.bind(this,item.state_id, item.state_name)}>
                                                <td className="fontRegular13 widthTable10 text-center ">{index+1}</td>
                                                <td className="fontRegular13 widthTable40 text-center"><span onClick={this.handleToDistrict.bind(this,item.state_id, item.state_name)}
                                                className="cursorPointer">{item.state_name}</span></td>
                                                <td className="fontRegular13 widthTable40 text-center">{item.district_count}</td>
                                                <td className="fontRegular13 widthTable10 ">
                                                    <div className="form-inline d-flex justify-content-center icon_styling border-0 actions" onClick={this.handleToDistrict.bind(this,item.state_id, item.state_name)}>
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
                                }

                                {this.state.value === 0 && <div className="" >
                                    <table className="table table-striped text-left">
                                        <thead className="lightBackgroundColor fontSemiBold18">
                                            <tr>
                                                <th className="fontSemiBold14 text-center" scope="col">S.No.</th>
                                                <th className="fontSemiBold14 text-center" scope="col">State Assemblies</th>
                                                <th className="fontSemiBold14 text-center" scope="col">Constituency</th>
                                                <th className="fontSemiBold14 text-center" scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.stateArray === null ||this.state.stateArray.length === 0 ? <tr className="text-center"><td colSpan="4" className=" fontSemiBold16 text-center">No records available</td></tr> : null}
                                        {this.state.stateArrayLokSabha.map((item, index) => {
                                            return (
                                            <tr className="cursorPointer" onClick={this.handleToDistrictLokSabha.bind(this,item.state_id, item.state_name)}>
                                                <td className="fontRegular13 widthTable10 text-center">{index+1}</td>
                                                <td className="fontRegular13 widthTable40 text-center"><span onClick={this.handleToDistrictLokSabha.bind(this,item.state_id, item.state_name)}
                                                className="cursorPointer">{item.state_name}</span></td>
                                                <td className="fontRegular13 widthTable40 text-center">{item.constituency_count}</td>
                                                <td className="fontRegular13 widthTable10 text-center">
                                                    <div className="d-flex justify-content-center form-inline icon_styling border-0 actions" onClick={this.handleToDistrictLokSabha.bind(this,item.state_id, item.state_name)}>
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
                                }

                                </div>

                            </Col>
                                    }
                        </Row>
                    </div>
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
StateconstituencyPageAdmin = withRouter(StateconstituencyPageAdmin)

export default withStyles(styles)(StateconstituencyPageAdmin);