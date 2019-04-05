/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : Admin constituency
Purpose   : admin constituency view for lok sabha and vidhan sabha
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorSnackBar from '../../networkCall/errorSnackBar';
import Add from '../../images/add.png';
import Minus from '../../images/minus.png';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { withRouter } from 'react-router-dom';
import { constants } from '../../networkCall/constant'
import { items } from '../../networkCall/service.js'
import Snackbar1 from '../../networkCall/snackBar.js';
import PrimarySearchAppBar from './appBar/appBar'
import UserSearchAppBar from '../userModule/userComponents/userAppbar/userAppBar';
import Footer from '../userModule/userComponents/userFooter/footer.js';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    followButton: {
        width: 160,
        backgroundColor: '#E18F68',
        color: 'white',
        fontFamily: 'montserratregular',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    descButton: {
        width: 180,
        backgroundColor: '#E18F68',
        color: 'white',
        fontSize: '12px',
        fontFamily: 'montserratregular',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    iconMarginImg: {
        color: 'white',
        zIndex: 1,
        left: 10,
        position: 'absolute',
        marginTop: 0
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
    searchButton: {
        marginRight: '2%',
        boxShadow: 'none',
        borderRadius: 0,
        fontFamily: 'montserratregular',
        fontSize: 12,
        color: 'white',
        borderRadius: 2,
        backgroundColor: '#E18F68',
        whiteSpace: 'nowrap',
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
        whiteSpace: 'nowrap',
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
        whiteSpace: 'nowrap',
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
    circularLoader: {
        color: '#E18F68',
        marginLeft: 'auto',
        marginRight: 'auto'
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
        color: '#fff',
        fontFamily: 'montserratsemibold',
        fontSize: 20,
        backgroundColor: '#E18F68',
        padding: '5px 15px',
    },
    dailogContentStyle: {
        color: '#555555',
        fontFamily: 'montserratregular',
        fontSize: 16,
    },

});


class ConstituencyAdmin extends Component {

    state = {
        open: false,
        constiListArray: [],
        contiListLoading: true,
        stateName: "",
        districtName: "",
        followStatus: null,
        constituencyList: {
            votingElection_code: constants.votingElectionCode,
            token_id: null,
            district_id: null,
            user_id: ''
        },
        viewAllConstiList: {
            votingElection_code: constants.votingElectionCode,
            district_id: null
        },
        msg: '',
        open: false,
        dialog: false,
        vertical: 'top',
        horizontal: 'center',
        constituencyDesc: '',
        consId: '',
        consType: '',
        consIndex: ''
    }

    handleOpen = (id, type, desc, index) => {
        this.setState({ constituencyDesc: desc })
        this.setState({ consId: id });
        this.setState({ consType: type });
        this.setState({ dialog: true });
        this.setState({ consIndex: index })
    };


    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleClose = () => {
        this.setState({ dialog: false })
    }

    isAdmin = () => {
        return (localStorage.getItem('accessToken') && localStorage.getItem('userType') === 'admin');
    }

    state_const() {
        let requestedData = {
            votingElection_code: constants.votingElectionCode,
            token_id: localStorage.getItem('accessToken'),
            state_id: this.props.match.params.state_id,
            user_id: localStorage.getItem('userId')
        }
        items('POST', requestedData, constants.lokSabhaConst)
            .then(response => {
                console.log(response)
                if (response.status === "Success") {
                    if (!(response.data.length === 0 || response.data === null)) {

                        this.setState({ constiListArray: response.data })
                    }
                    this.setState({ contiListLoading: false })
                }
                else if (response.status === "Failure") {

                }
                else {

                }
            })
    }

    vidhanConst() {
        let districtId = localStorage.getItem('districtId')
        let value = localStorage.getItem('accessToken')
        let stateName = localStorage.getItem('stateName')
        let districtName = localStorage.getItem('districtName')
        this.setState({ stateName: stateName, districtName: districtName });
        // this.setState({  })
        this.setState({ constituencyList: { ...this.state.constituencyList, district_id: this.props.match.params.state_id, token_id: value, user_id: localStorage.getItem('userId') } }, function () {
            items('POST', this.state.constituencyList, constants.viewConstituencyList)
                .then(response => {
                    if (response.status === 'Success') {
                        if (!(response.data.length === 0 || response.data === null)) {

                            this.setState({ constiListArray: response.data })
                        }
                        this.setState({ contiListLoading: false })
                    }
                    else if (response.status === 'Failure') {

                    }
                    else {

                    }

                })
        })
    }

    componentDidMount() {
        let temp = localStorage.getItem('statusSabha');
        if (this.props.match.params.status === '0') {
            this.vidhanConst();
        }
        else if (this.props.match.params.status === '1') {
            this.state_const();
        }
        else {

        }
    }

    follow = (value, id, index, type) => {
        if (localStorage.getItem('accessToken') && localStorage.getItem('userType')) {
            let requestedData = {
                votingElection_code: constants.votingElectionCode,
                token_id: localStorage.getItem('accessToken'),
                user_id: localStorage.getItem('userId'),
                follow_type: type,
                follow_id: id,
                status: value
            }

            items('POST', requestedData, constants.followUnfollow)
                .then(response => {
                    if (response.status === "Success") {

                        if (this.state.constiListArray[index].follow_id === null) {
                            this.state.constiListArray[index].follow_id = 'FOLLOW'
                            this.setState({ constiListArray: this.state.constiListArray });
                        }
                        else {
                            this.state.constiListArray[index].follow_id = null
                            this.setState({ constiListArray: this.state.constiListArray });
                        }

                    }
                    else if (response.status === "Failure") {
                    }
                    else {
                    }
                });
        }
        else {
            this.setState({ msg: "Please login to continue." });
            this.setState({ open: true });
            setTimeout(() => {
                this.setState({ open: false });
            }, 2500);
        }
    }

    handleConstituencyDesc = (e) => {
        this.setState({ constituencyDesc: e.target.value })
    }

    addConstituencyDesc = () => {
        if (this.state.constituencyDesc === '' || this.state.constituencyDesc === null || this.state.constituencyDesc.trim() === '') {
            this.setState({ msg: "Please enter something to continue." });
            this.setState({ open: true });
            setTimeout(() => {
                this.setState({ open: false });
            }, 2500);
        }
        else {
            let requestedData = {
                votingElection_code: constants.votingElectionCode,
                token_id: localStorage.getItem('accessToken'),
                constituency_type: this.state.consType,
                constituency_id: this.state.consId,
                constituency_desc: this.state.constituencyDesc
            }
            items('POST', requestedData, constants.addConstituencyDesc)
                .then(response => {
                    if (response.status === "Success") {
                        this.setState({ dialog: false });
                        this.setState({ successMsg: response.msg });
                        this.setState({ successOpen: true });
                        if (this.state.consType === 'vidhan_sabha') {
                            this.state.constiListArray[this.state.consIndex].vs_constituency_desc = this.state.constituencyDesc;
                            this.setState({ constiListArray: this.state.constiListArray });
                        }
                        else {
                            this.state.constiListArray[this.state.consIndex].ls_constituency_desc = this.state.constituencyDesc;
                            this.setState({ constiListArray: this.state.constiListArray })
                        }
                        setTimeout(() => {
                            this.setState({ successOpen: false });
                        }, 2500);

                    }
                    else if (response.status === "Failure") {

                    }
                    else {

                    }
                })
        }
    }


    handleContiOpen = () => {
        this.setState({ open: true })
    }

    pushToConstituencyDetail = (id, desc) => {
        localStorage.setItem('consDesc', desc); 
        if(localStorage.getItem('userType') === 'admin')
        {
            this.props.history.push('/AdminConstituencyDetails/lok_sabha/' + this.props.match.params.state_id + '/' + this.props.match.params.state_name + '/' + id + '/' + 'desc')
        }
        else{
           this.props.history.push('/UserConstituencyDetails/lok_sabha/' + this.props.match.params.state_id + '/' + this.props.match.params.state_name + '/' + id + '/' + 'desc')
        }
    }

    pushToVidhan = (id,desc) => {
        localStorage.setItem('consDesc', desc); 
        if(localStorage.getItem('userType') === 'admin')
        {
            this.props.history.push('/AdminConstituencyDetails/vidhan_sabha/' + this.props.match.params.state_id + '/' + this.props.match.params.state_name + '/' + id + '/' + 'desc')
        }
        else{
           this.props.history.push('/UserConstituencyDetails/vidhan_sabha/' + this.props.match.params.state_id + '/' + this.props.match.params.state_name + '/' + id + '/' + 'desc')
        }
    }

    render() {
        const { vertical, horizontal } = this.state;
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
                                    <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/AdminHomePage'>Home</NavLink> / <NavLink className="breadCrumbs" to='/AdminStateConstituency'>Constituencies</NavLink> / State Assembly</p>
                                    :
                                    <p className="mt-3 fontRegular12 greyFontColor headingPage"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / <NavLink className="breadCrumbs" to='/UserStateConstituency'>Constituencies</NavLink> / State Assembly</p>
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

                <Dialog
                    transition={Collapse}
                    open={this.state.dialog}

                    onClose={this.handleClose}
                    PaperProps={{
                        classes: {
                            root: classes.paper
                        }
                    }}
                    {...other}
                    BackdropProps={{
                        classes: {
                            root: classes.root
                        }
                    }
                    }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" disableTypography className={classes.dailogTitle}>{"Description"}</DialogTitle>
                    <DialogContent className={classes.dailogContent}>
                        <DialogContentText id="alert-dialog-description" className={classes.dailogContentStyle}>
                            <div className="fontSemiBold16 mt-4">
                                Add description for Constituency:
                            </div>
                            <div className="fontRegular12 mt-3">
                                <textarea className="form-control" rows="4" cols="50" value={this.state.constituencyDesc} onChange={this.handleConstituencyDesc} />
                            </div>

                            <div className="mt-3 form-inline d-flex justify-content-center">
                                <div className="mr-2 mt-3">
                                    <Button onClick={this.handleClose} variant="contained"
                                        className={classes.dailogButton}
                                    >
                                        CANCEL
                                    </Button>
                                </div>
                                <div className="mt-3">
                                    <Button onClick={this.addConstituencyDesc} variant="contained"
                                        className={classes.dailogButton}
                                    >
                                        SUBMIT
                                    </Button>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Container className="mb-5 minHeight55vh">
                    {this.state.contiListLoading ? <CircularProgress className={classes.circularLoader} /> :
                        <Container className="mb-5">
                            {this.props.match.params.status === '0' ?
                                <Row className="">
                                    <Col>
                                        <div className="mt-3 boxShadow constituencyTable rounded width90 ml-auto mr-auto">
                                            <table className="table table-striped text-left">
                                                <thead className="lightBackgroundColor fontSemiBold18">
                                                    <tr>
                                                        <th className="fontSemiBold14 text-center" scope="col">S.No.</th>
                                                        <th className="fontSemiBold14 text-center" scope="col">Constituencies</th>
                                                        <th className="fontSemiBold14 text-center" scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.constiListArray === null || this.state.constiListArray.length === 0 ? <tr className="text-center"><td colSpan="4" className=" fontSemiBold16 text-center">No records available</td></tr> : null}
                                                    {this.state.constiListArray.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td className="fontRegular13 text-center widthTable10 cursorPointer" onClick={this.pushToVidhan.bind(this, item.vs_constituency_id, item.vs_constituency_desc)}>{index + 1}</td>
                                                                <td className="fontRegular13 text-center widthTable60 cursorPointer" onClick={this.pushToVidhan.bind(this, item.vs_constituency_id, item.vs_constituency_desc)}>
                                                                    <span className="cursorPointer" >
                                                                        {item.vs_constituency_name}
                                                                    </span>
                                                                </td>
                                                                <td className="fontRegular13 text-center widthTable30">
                                                                    <div className="form-inline icon_styling actions d-flex justify-content-center position-relative">


                                                                        {this.isAdmin() ?
                                                                            <Button
                                                                                bssize="large"
                                                                                color="inherit"
                                                                                className={classes.descButton}
                                                                                onClick={this.handleOpen.bind(this, item.vs_constituency_id, 'vidhan_sabha', item.vs_constituency_desc, index)}
                                                                            >
                                                                                {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                    <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                    :
                                                                                    <img src={this.isAdmin() ? Add : Minus} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                }
                                                                                Add DESCRIPTION
                                                                            </Button>
                                                                            :
                                                                            <div className="w-100">
                                                                                {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                    <Button
                                                                                        bssize="large"
                                                                                        color="inherit"
                                                                                        className={classes.followButton}
                                                                                        onClick={this.follow.bind(this, 'FOLLOW', item.vs_constituency_id, index, 'vidhan_sabha')}
                                                                                    >
                                                                                        {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                            <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                            :
                                                                                            <img src={this.isAdmin() ? Add : Minus} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                        }
                                                                                        Follow
                                                                                    </Button>
                                                                                    :
                                                                                    <Button
                                                                                        bssize="large"
                                                                                        color="inherit"
                                                                                        className={classes.followButton}
                                                                                        onClick={this.follow.bind(this, 'UNFOLLOW', item.vs_constituency_id, index, 'vidhan_sabha')}
                                                                                    >
                                                                                        {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                            <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                            :
                                                                                            <img src={this.isAdmin() ? Add : Minus} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                        }
                                                                                        {/* <Add /> */}
                                                                                        Unfollow
                                                                                    </Button>

                                                                                }

                                                                            </div>
                                                                        }
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


                                </Row>
                                :
                                <Row className="">
                                    <Col>
                                        <div className="mt-4 boxShadow constituencyTable rounded width90 ml-auto mr-auto">
                                            <table className="table table-striped text-left">
                                                <thead className="lightBackgroundColor fontSemiBold18">
                                                    <tr>
                                                        <th className="fontSemiBold14 text-center" scope="col">S.No.</th>
                                                        <th className="fontSemiBold14 text-center" scope="col">Constituencies</th>
                                                        <th className="fontSemiBold14 text-center" scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.constiListArray === null || this.state.constiListArray.length === 0 ? <tr className="text-center"><td colSpan="4" className="text-center fontSemiBold16">No districts available</td></tr> : null}
                                                    {this.state.constiListArray.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td className="fontRegular13 text-center widthTable10">{index + 1}</td>
                                                                <td className="fontRegular13 text-center widthTable60">
                                                                    <span className="cursorPointer" onClick={this.pushToConstituencyDetail.bind(this, item.ls_constituency_id, item.ls_constituency_desc)}>
                                                                        {item.ls_constituency_name}
                                                                    </span>
                                                                </td>
                                                                <td className="fontRegular13 text-center w-30">
                                                                    <div className="form-inline icon_styling actions d-flex justify-content-center position-relative">



                                                                        {this.isAdmin() ?
                                                                            <Button
                                                                                bssize="large"
                                                                                color="inherit"
                                                                                className={classes.descButton}
                                                                                onClick={this.handleOpen.bind(this, item.ls_constituency_id, 'lok_sabha', item.ls_constituency_desc, index)}
                                                                            >
                                                                                {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                    <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                    :
                                                                                    <img src={this.isAdmin() ? Add : Minus} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                }
                                                                                Add DESCRIPTION
                                                                            </Button>
                                                                            :
                                                                            <div className="w-100">
                                                                                {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                    <Button
                                                                                        bssize="large"
                                                                                        color="inherit"
                                                                                        className={classes.followButton}
                                                                                        onClick={this.follow.bind(this, 'FOLLOW', item.ls_constituency_id, index, 'lok_sabha')}
                                                                                    >
                                                                                        {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                            <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                            :
                                                                                            <img src={this.isAdmin() ? Add : Minus} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                        }
                                                                                        Follow
                                                                                    </Button>
                                                                                    :
                                                                                    <Button
                                                                                        bssize="large"
                                                                                        color="inherit"
                                                                                        className={classes.followButton}
                                                                                        onClick={this.follow.bind(this, 'UNFOLLOW', item.ls_constituency_id, index, 'lok_sabha')}
                                                                                    >
                                                                                        {item.follow_id === null || item.follow_id === 'UNFOLLOW' ?
                                                                                            <img src={Add} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                            :
                                                                                            <img src={this.isAdmin() ? Add : Minus} className={classes.iconMarginImg} alt="search" height="15" width="15" />
                                                                                        }
                                                                                        Unfollow
                                                                                     </Button>
                                                                                }

                                                                            </div>
                                                                        }
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


                                </Row>
                            }
                        </Container>

                    }
                </Container>

                {
                    (this.isAdmin()) ?
                        null
                        :
                        <Footer />
                }

                <ErrorSnackBar open={this.state.open}
                    anchorOrigin={{ vertical, horizontal }}
                    message={this.state.msg}
                />
                <Snackbar1 open={this.state.successOpen}
                    anchorOrigin={{ vertical, horizontal }}
                    message={this.state.successMsg}
                />

            </div>

        )
    }
}
ConstituencyAdmin = withRouter(ConstituencyAdmin)
export default withStyles(styles)(ConstituencyAdmin);