/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : UpdateCandidateTabs > assets&liability - tab.
Purpose   : update candidate's assets and liabilites
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { Button } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import {
    InputGroup, Input
}
    from 'reactstrap';
import 'react-quill/dist/quill.snow.css';
import Add from '../../../images/add.png';
import produce from "immer"
import { constants } from '../../../networkCall/constant'
import { items } from '../../../networkCall/service.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar1 from '../../../networkCall/snackBar.js'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import ErrorSnackBar2 from '../../../networkCall/errorSnackBar'
import { withRouter } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';



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
        borderRadius: '3px',
        marginTop: 0.1,
        boxShadow: 'none',
        backgroundColor: '#E18F68',
        color: 'white',
        '&:hover': {
            backgroundColor: '#b75628'
        }

    },
    tabLabelStyleAssets: {
        textTransform: 'capitalize',
        color: 'black',
        fontSize: 14,
        fontFamily: 'montserratregular',

    },
    indicator: {
        backgroundColor: '#E18F68',
    },

    appBarStyleNest: {
        backgroundColor: '#FEF8DF',
        boxShadow: 'none',
    },
    label: {
        color: '#555555',
    },
    appBarStyle: {
        backgroundColor: '#E18F68',
        boxShadow: 'none',
        color: '#fff'
    },

    addButton: {
        boxShadow: 'none',
        borderRadius: 0,
        fontFamily: 'montserratregular',
        fontSize: 12,
        color: 'white',
        width: ' 200px',
        backgroundColor: '#E18F68',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    root: {
        '&$checked': {
            color: ' #E18F68',
        },
    },
    checked: {
        color: '#E18F68',

    },
    circularLoader: {
        color: '#E18F68'
    },
})

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    input: {
        borderRadius: 0,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        width: '100%',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 0,
            // borderColor: '#80bdff',
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


class UpdateAssestsLiabilities extends Component {
    state = {
        title: '',
        body: '',
        new: '',
        valueAssets: 0,
        assetOpen: false,
        errorOpen: false,
        noRecordOpen: false,
        noRecordStatus: false,
        vertical: 'top',
        horizontal: 'center',
        selfAmountVald: false,
        noRecordMsg: 'Sorry no assets to update, please add assets first',
        successMsg: 'Assets & Liabilities updated successfully',
        errorMsg: 'Something went wrong, Please try again',
        isLoading: true,
        defaultUpdateAsset: {
            votingElection_code: constants.votingElectionCode,
            candidate_id: ''
        },
        value: 0,
        updateCandidate: {
            votingElection_code: constants.votingElectionCode,
            token_id: '',
            candidate_id: '',
            candidate_assets: '',
            candidate_delete_assets: ''
        },
        educationData: [],

        newMovableAssets: [
            { 'label': 'Cash', 'symbol': 'CASH' },
            { 'label': 'Deposits in bank', 'symbol': 'DEPOSIT' },
            { 'label': 'Financial institutions', 'symbol': 'DEPOSIT' },
            { 'label': 'non-banking Financial companies', 'symbol': 'DEPOSIT' },
            { 'label': 'Bonds debentures', 'symbol': 'BONDS_SHARE' },
            { 'label': 'Shares in companies', 'symbol': 'BONDS_SHARE' },
            { 'label': 'NSS, Postal Savings etc', 'symbol': 'NSS' },
            { 'label': 'LIC or other insurance Policies', 'symbol': 'LIC' },
            { 'label': 'Motor Vehicles (details of make, etc.)', 'symbol': 'VEHICLES' },
            { 'label': 'Personal loans/advance given', 'symbol': 'PERSONAL_LOAN' },
            { 'label': 'Jewellery (give details weight value)', 'symbol': 'JEWELLARY' },
            { 'label': 'Other assets, such as values of claims / interests', 'symbol': 'OTHER_ASSETS' },
        ],
        immovableAssets: [
            { 'label': 'Agricultural Land', 'symbol': 'AGRI_LAND' },
            { 'label': 'Non Agricultural Land', 'symbol': 'NON_AGRI_LAND' },
            { 'label': 'Commercial Buildings', 'symbol': 'COMM_BUILDING' },
            { 'label': 'Residential Buildings', 'symbol': 'RESI_BUILDING' },
            { 'label': 'Others', 'symbol': 'OTHERS' },
        ],
        Liabilities: [
            { 'label': 'Loans from Banks / FIs', 'symbol': 'BANK_LOAN' },
            { 'label': 'Loans due to Individual / Entity', 'symbol': 'NETITY_LOAN' },
            { 'label': 'Any other Liability', 'symbol': 'OTHER_LIABILITY' },
            { 'label': 'Grand Total of Liabilities (as per affidavit)', 'symbol': 'GRAND_TOTAL_LIABILITY' },
            { 'label': 'Dues to departments dealing with government accommodation', 'symbol': 'DUE_GOV' },

            { 'label': 'Dues to departments dealing with supply of water', 'symbol': 'DUE_WATER' },
            { 'label': 'Dues to departments dealing with supply of electricity', 'symbol': 'DUE_ELECTRICITY' },
            { 'label': 'Dues to departments dealing with telephones', 'symbol': 'DUE_TELEPHONE' },
            { 'label': 'Dues to departments dealing with supply of transport', 'symbol': 'DUE_TRANSPORT' },
            { 'label': 'Wealth Tax Dues', 'symbol': 'DUE_WEALTH_TAX' },
            { 'label': 'Service Tax Dues', 'symbol': 'DUE_SERVICE_TAX' },
            { 'label': 'Income Tax Dues', 'symbol': 'DUE_ICNOME_TAX' },
            { 'label': 'Property Tax Dues', 'symbol': 'DUE_PROPERTY_TAX' },
            { 'label': 'Sales Tax Dues', 'symbol': 'DUE_SALES_TAX' },
            { 'label': 'Any Other Dues', 'symbol': 'OTHER_DUES' },
            { 'label': 'Grand Total of all Govt Dues (as per affidavit)', 'symbol': 'GRAND_TOTAL_DUES' },
            { 'label': 'Whether any other liabilities are in dispute, if so, mention the amount involved and the authority before which it is pending', 'symbol': 'DISPUTE_LIABILITY' },
        ],
        assets: [{
            assetTab: 0,
            'asset_type': '',
            'asset_name': '',
            'asset_range': '',
            'asset_desc': [],
            'data': [{
                'asset_self': [{
                    'self_amount': '',
                    'self_desc': ''
                }],
                'asset_spouse': [{
                    'spouse_amount': '',
                    'spouse_desc': ''
                }],
                'asset_depend1': [{
                    'depend1_amount': '',
                    'depend1_desc': ''
                }],
                'asset_depend2': [{
                    'depend2_amount': '',
                    'depend2_desc': ''
                }],
                'asset_depend3': [{
                    'depend3_amount': '',
                    'depend3_desc': ''
                }]
            }],
            'flag': 1
        }],


        disableButton: false
    }

    /* setting up the existing assets and liability if not present then adding it */

    componentDidMount() {
        const candidateUpdateId = localStorage.getItem('candidateUpdateId')
        let value = localStorage.getItem('accessToken');
        this.setState({ updateCandidate: { ...this.state.updateCandidate, token_id: value, candidate_id: candidateUpdateId } })

        this.setState({ defaultUpdateAsset: { ...this.state.defaultUpdateAsset, candidate_id: candidateUpdateId } }, function () {

            items("POST", this.state.defaultUpdateAsset, constants.assetsAndLiabilities)
                .then(response => {
                    console.log(response)
                    if (response.status === "Success" && response.data.length !== 0) {

                        let assets = [];
                        for (let i = 0; i < response.data.length; i++) {
                            let temp = {
                                assetTab: 0,
                                "asset_range": "",
                                "asset_name": "",
                                "asset_type": "",
                                "asset_desc": [],
                                'data': [{
                                    "asset_self": [],
                                    "asset_spouse": [],
                                    "asset_depend1": [],
                                    "asset_depend2": [],
                                    "asset_depend3": []
                                }],
                                'flag': 1

                            }

                            if (response.data[i].asset_type === "Movable Assets") {
                                temp.asset_desc = this.state.newMovableAssets
                            }
                            else if (response.data[i].asset_type === "Immovable Assets") {
                                temp.asset_desc = this.state.immovableAssets
                            }
                            else if (response.data[i].asset_type === "Liability") {
                                temp.asset_desc = this.state.Liabilities
                            }

                            temp.asset_name = response.data[i].asset_name
                            console.log(response.data[i].asset_type)
                            temp.asset_type = response.data[i].asset_type
                            temp.data[0].asset_self = response.data[i].asset_self
                            temp.data[0].asset_spouse = response.data[i].asset_spouse
                            temp.data[0].asset_depend1 = response.data[i].asset_depend1
                            temp.data[0].asset_depend2 = response.data[i].asset_depend2
                            temp.data[0].asset_depend3 = response.data[i].asset_depend3
                            for (let j = 0; j < temp.data.length; j++) {
                                if (temp.data[0].asset_self.length === 0) {
                                    const selfData = {
                                        'self_amount': '',
                                        'self_desc': ''
                                    }
                                    temp.data[0].asset_self.push(selfData)
                                }
                                if (temp.data[0].asset_spouse.length === 0) {
                                    const spouseData = {
                                        'spouse_amount': '',
                                        'spouse_desc': ''
                                    }
                                    temp.data[0].asset_spouse.push(spouseData)
                                }
                                if (temp.data[0].asset_depend1.length === 0) {
                                    const dep1Data = {
                                        'depend1_amount': '',
                                        'depend1_desc': ''
                                    }
                                    temp.data[0].asset_depend1.push(dep1Data)
                                }
                                if (temp.data[0].asset_depend2.length === 0) {
                                    const dep2Data = {
                                        'depend2_amount': '',
                                        'depend2_desc': ''
                                    }
                                    temp.data[0].asset_depend2.push(dep2Data)
                                }
                                if (temp.data[0].asset_depend3.length === 0) {
                                    const dep3Data = {
                                        'depend3_amount': '',
                                        'depend3_desc': ''
                                    }
                                    temp.data[0].asset_depend3.push(dep3Data)
                                }
                            }

                            assets.push(temp);

                            this.setState({ assets: assets }, function () {
                                this.setState({ isLoading: false })
                            })
                        }
                    }
                    if (response.data.length === 0) {
                        this.setState({ isLoading: false })
                        this.setState({ noRecordStatus: false })
                        this.setState({ noRecordOpen: true })
                        setTimeout(() => {
                            this.setState({ noRecordOpen: false })
                        }, 5000);
                    }

                })

        })

    }

    /* Tab navigation of the self, dependent etc start */
    handleAssetsChange = (event, valueAssets) => {
        this.setState({ valueAssets: valueAssets });
    }

    handleChange = (index) => (event, value) => {
        console.log(value)
        this.setState(produce((draft) => {
            draft.assets[index].assetTab = value
        }), function () {

        })
    };
    /* Tab navigation of the self, dependent etc. end */


//add more and remove functionality from the state array start
    removeAssets = (index) => {
        this.setState({
            assets: this.state.assets.filter((_, i) => i !== index)
        });
    }


    assetsShow = (indx) => {
        let temp = this.state.assets[indx].flag = 1;

        this.setState({
            assets: this.state.assets
        });
    }

    assetsHide = (indx) => {

        let temp = this.state.assets[indx].flag = 0;

        this.setState({
            assets: this.state.assets
        });
    }

    addMore = (index, indices) => {
        let form1 = { 'self_amount': '', 'self_desc': '' }

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_self.push(form1)
        }), function () {
        })
    }
    addMoreSpouse = (index, indices) => {
        let form = { 'spouse_amount': '', 'spouse_desc': '' }

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_spouse.push(form)
        }), function () {
        })
    }
    addMoreDep1 = (index, indices) => {
        let form = { 'depend1_amount': '', 'depend1_desc': '' }

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend1.push(form)
        }), function () {
        })
    }
    addMoreDep2 = (index, indices) => {
        let form = { 'depend2_amount': '', 'depend2_desc': '' }

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend2.push(form)
        }), function () {
        })
    }
    addMoreDep3 = (index, indices) => {
        let form = { 'depend3_amount': '', 'depend3_desc': '' }

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend3.push(form)
        }), function () {
        })
    }
    removeData = (indices, index, selfIndex) => {

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_self.splice(selfIndex, 1)
        }), function () {

        })
    }
    removeSpouseData = (indices, index, spouseIndex) => {

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_spouse.splice(spouseIndex, 1)
        }), function () {
        })
    }
    removeDep_1Data = (indices, index, dep1Index) => {

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend1.splice(dep1Index, 1)
        }), function () {
        })
    }
    removeDep_2Data = (indices, index, dep2Index) => {

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend2.splice(dep2Index, 1)
        }), function () {
        })

    }
    removeDep_3Data = (indices, index, dep3Index) => {

        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend3.splice(dep3Index, 1)
        }), function () {
        })
    }

    addAssets = (event, index) => {
        this.setState({
            assets: [
                ...this.state.assets, {
                    assetTab: 0,
                    'asset_type': '',
                    'asset_name': '',
                    'asset_range': '',
                    'asset_desc': [],
                    'data': [{
                        'asset_self': [{
                            'self_amount': '',
                            'self_desc': ''
                        }],
                        'asset_spouse': [{
                            'spouse_amount': '',
                            'spouse_desc': ''
                        }],
                        'asset_depend1': [{
                            'depend1_amount': '',
                            'depend1_desc': ''
                        }],
                        'asset_depend2': [{
                            'depend2_amount': '',
                            'depend2_desc': ''
                        }],
                        'asset_depend3': [{
                            'depend3_amount': '',
                            'depend3_desc': ''
                        }]
                    }],
                    'flag': 1
                }
            ]
        })
        console.log(this.state.assets)
    }
    //add more and remove functionality from the state array end


    //get values from the input fields function start
    handleAssetType = (index) => (e) => {
        const valueAssetType = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].asset_type = valueAssetType
        }), function () {

            if (this.state.assets[index].asset_type === "Immovable Assets") {
                this.setState(produce((draft) => {
                    draft.assets[index].asset_desc = this.state.immovableAssets
                }), function () {
                })

            }
            else if (this.state.assets[index].asset_type === "Movable Assets") {

                this.setState(produce((draft) => {
                    draft.assets[index].asset_desc = this.state.newMovableAssets
                }), function () {
                })
            }
            else if (this.state.assets[index].asset_type === "Liability") {

                this.setState(produce((draft) => {
                    draft.assets[index].asset_desc = this.state.Liabilities
                }), function () {
                })
            }
        })
    }

    handleAssetDesc = (index) => (e) => {
        const assetName = e.target.value;
        console.log(this.state.assets[index].asset_desc.symbol)
        console.log(e.target.value)
        this.setState(produce((draft) => {
            draft.assets[index].asset_name = assetName
        }), function () {

        })

    }

    handleDescSelf = (index, indices, selfIndex) => (e) => {
        const valueSelf = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_self[selfIndex].self_desc = valueSelf
        }), function () {

        })
    }

    handleAmtSelf = (index, indices, selfIndex) => (e) => {
        if (e.target.value !== null) {

            this.setState({ selfAmountVald: true })
        }
        const valueSelfAmt = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_self[selfIndex].self_amount = valueSelfAmt
        }), function () {

        })

    }

    handleDescSpouse = (index, indices, spouseIndex) => (e) => {

        const descSpouse = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_spouse[spouseIndex].spouse_desc = descSpouse
        }), function () {

        })
    }

    handleAmtSpouse = (index, indices, spouseIndex) => (e) => {

        const amtSpouse = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_spouse[spouseIndex].spouse_amount = amtSpouse
        }), function () {

        })
    }

    handleDescDep1 = (index, indices, dep1Index) => (e) => {

        const descDep1 = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend1[dep1Index].depend1_desc = descDep1
        }), function () {

        })
    }

    handleAmtDep1 = (index, indices, dep1Index) => (e) => {

        const amtDep1 = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend1[dep1Index].depend1_amount = amtDep1
        }), function () {

        })
    }

    handleDescDep2 = (index, indices, dep2Index) => (e) => {

        const descDep2 = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend2[dep2Index].depend2_desc = descDep2
        }), function () {

        })
    }

    handleAmtDep2 = (index, indices, dep2Index) => (e) => {

        const amtDep2 = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend2[dep2Index].depend2_amount = amtDep2
        }), function () {

        })
    }
    handleDescDep3 = (index, indices, dep3Index) => (e) => {

        const descDep3 = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend3[dep3Index].depend3_desc = descDep3
        }), function () {

        })
    }

    handleAmtDep3 = (index, indices, dep3Index) => (e) => {

        const amtDep3 = e.target.value
        this.setState(produce((draft) => {
            draft.assets[index].data[indices].asset_depend3[dep3Index].depend3_amount = amtDep3
        }), function () {

        })
    }
    //get values from the input fields function end

    // update candidate function
    handleUpdateCandidate = () => {
        for (let i = 0; i < this.state.assets.length; i++) {
            for (let s = 0; s < this.state.assets[i].data[0].asset_self.length; s++) {
                if (this.state.assets[i].data[0].asset_self[s].self_amount === "" || this.state.assets[i].data[0].asset_self[s].self_amount.trim() === "") {
                    this.setState({ selfAmountVald: false }, function () {
                    })
                }
            }
        }

        if (this.state.noRecordStatus === false) {

            let arr = [];
            for (let i = 0; i < this.state.assets.length; i++) {
                let temp = {
                    assetTab: 0,
                    "asset_range": "",
                    "asset_name": "",
                    "asset_type": "",
                    "asset_self": [],
                    "asset_spouse": [],
                    "asset_depend1": [],
                    "asset_depend2": [],
                    "asset_depend3": []
                }

                temp.asset_name = this.state.assets[i].asset_name
                temp.asset_type = this.state.assets[i].asset_type
                temp.asset_self = this.state.assets[i].data[0].asset_self
                temp.asset_spouse = this.state.assets[i].data[0].asset_spouse
                temp.asset_depend1 = this.state.assets[i].data[0].asset_depend1
                temp.asset_depend2 = this.state.assets[i].data[0].asset_depend2
                temp.asset_depend3 = this.state.assets[i].data[0].asset_depend3

                const selfRange = temp.asset_self.length
                const spouseRange = temp.asset_spouse.length
                const dep1Range = temp.asset_depend1.length
                const dep2Range = temp.asset_depend2.length
                const dep3Range = temp.asset_depend3.length

                const maxRange = Math.max(selfRange, spouseRange, dep1Range, dep2Range, dep3Range)
                temp.asset_range = maxRange
                arr.push(temp);
            }

            if (arr.length !== 0) {
                this.setState({ disableButton: true });
                this.setState({ updateCandidate: { ...this.state.updateCandidate, candidate_assets: JSON.stringify(arr) } }, function () {

                    items("POST", this.state.updateCandidate, constants.updateCandidateAsset)
                        .then(response => {
                            if (response.status === "Success") {
                                this.setState({ assetOpen: true })
                                setTimeout(() => {
                                    this.setState({ assetOpen: false })
                                }, 4000)
                                this.setState({ disableButton: false });
                            }
                            else if (response.status === "Failure") {
                                this.setState({ errorOpen: true })
                                setTimeout(() => {
                                    this.setState({ errorOpen: false })
                                }, 4000)
                                this.setState({ disableButton: false });
                            }
                            else {
                                this.setState({ disableButton: false });
                            }

                        })
                })
            }
        }
        else {
            this.setState({ updateCandidate: { ...this.state.updateCandidate, candidate_assets: JSON.stringify(this.state.assets) } }, function () {

                items("POST", this.state.updateCandidate, constants.updateCandidateAsset)
                    .then(response => {

                        if (response.status === "Success") {
                            this.setState({ assetOpen: true })
                            setTimeout(() => {
                                this.setState({ assetOpen: false })
                            }, 4000)
                        }
                        if (response.status === "Failure") {
                            this.setState({ errorOpen: true })
                            setTimeout(() => {
                                this.setState({ errorOpen: false })
                            }, 4000)
                        }
                    })
            })
        }
    }
    
    handleToCandList = () => {
        this.props.history.push('/AdminCandidate')
    }


    render() {

        const { classes, theme } = this.props;
        const { value } = this.state;
        const { vertical, horizontal } = this.state;

        return (
            <div className="candidate_other_info">
                {this.state.isLoading ? <CircularProgress className={classes.circularLoader} /> :
                    <div className="candidate_other_info">
                        <Container>
                            <Snackbar1 open={this.state.assetOpen}
                                anchorOrigin={{ vertical, horizontal }}
                                message={this.state.successMsg}
                            />
                            <ErrorSnackBar open={this.state.errorOpen}

                                anchorOrigin={{ vertical, horizontal }}
                                message={this.state.errorMsg}
                            />
                            <ErrorSnackBar2 open={this.state.noRecordOpen}

                                anchorOrigin={{ vertical, horizontal }}
                                message={this.state.noRecordMsg}
                            />
                            <Row>
                                <Col>
                                    <div className="">
                                        <div className="mt-2" >
                                            <Row className="ml-auto mr-auto mt-3">
                                                <Col sm={12} xs={12} lg={10} md={10} xl={10} className="ml-auto mr-auto">
                                                    {this.state.assets.map((item, index) => {
                                                        return (
                                                            <div className="mt-4 p-3 boxShadow position-relative assetLiabilitiesIcons rounded" key={index}>

                                                                {index === 0 ? null : <i className="fa fa-times position-absolute iconsCross cursorPointer" onClick={this.removeAssets.bind(this, index)}></i>}
                                                                {this.state.assets[index].flag === 1 ? <i className="fa fa-minus position-absolute iconsPlus cursorPointer" onClick={this.assetsHide.bind(this, index)}></i> : <i className="fa fa-plus position-absolute iconsPlus cursorPointer" onClick={this.assetsShow.bind(this, index)}></i>}

                                                                <Row className="ml-auto mr-auto">
                                                                    <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                        <div className="form-inline">
                                                                            <div className="fontSemiBold14 mr-auto text-left mr-3">
                                                                                Type:
                                                                            </div>
                                                                            <div>
                                                                                <FormGroup className={classes.fontLabel} row>
                                                                                    <FormControlLabel classes={{
                                                                                        label: classes.label
                                                                                    }}
                                                                                        control={
                                                                                            <Radio
                                                                                                checked={this.state.assets[index].asset_type === "Movable Assets"}
                                                                                                onChange={this.handleAssetType(index)}
                                                                                                value="Movable Assets"

                                                                                                classes={{
                                                                                                    root: classes.root,
                                                                                                    checked: classes.checked,
                                                                                                }}

                                                                                            />
                                                                                        }
                                                                                        label="Movable Assets"
                                                                                    />
                                                                                    <FormControlLabel classes={{
                                                                                        label: classes.label
                                                                                    }}
                                                                                        control={
                                                                                            <Radio
                                                                                                checked={this.state.assets[index].asset_type === "Immovable Assets"}
                                                                                                onChange={this.handleAssetType(index)}
                                                                                                value="Immovable Assets"
                                                                                                classes={{
                                                                                                    root: classes.root,
                                                                                                    checked: classes.checked,
                                                                                                }}

                                                                                            />
                                                                                        }
                                                                                        label="Immovable Assets"
                                                                                    />
                                                                                    <FormControlLabel classes={{
                                                                                        label: classes.label
                                                                                    }}
                                                                                        control={
                                                                                            <Radio
                                                                                                checked={this.state.assets[index].asset_type === "Liability"}
                                                                                                onChange={this.handleAssetType(index)}
                                                                                                value="Liability"
                                                                                                classes={{
                                                                                                    root: classes.root,
                                                                                                    checked: classes.checked,
                                                                                                }}

                                                                                            />
                                                                                        }
                                                                                        label="Liabilities"
                                                                                    />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row className="ml-auto mr-auto">
                                                                    <Col sm={12} xs={12} lg={12} md={12} xl={12} className="ml-auto mr-auto">
                                                                        <div className="mt-3 assetSelect border">
                                                                            <FormControl className={classes.margin}>
                                                                                <Select
                                                                                    disabled={this.state.assets[index].asset_type === '' ? true : false}
                                                                                    value={this.state.assets[index].asset_name}
                                                                                    onChange={this.handleAssetDesc(index)}
                                                                                    input={<BootstrapInput name="age" id="age-customized-select" />}
                                                                                >

                                                                                    {this.state.assets[index].asset_desc.map((item, indxx) => {
                                                                                        return (
                                                                                            <MenuItem value={item.symbol}>{item.label}</MenuItem>
                                                                                        );
                                                                                    }
                                                                                    )}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </div>
                                                                    </Col>
                                                                </Row>



                                                                {this.state.assets[index].flag === 0 ? null :
                                                                    <div>
                                                                        <div >
                                                                            <Row className="ml-auto mr-auto">
                                                                                <Col sm={12} xs={12} lg={12} md={12} xl={12} className="ml-auto mr-auto">
                                                                                    <AppBar position="static" className={classes.appBarStyle}
                                                                                    >
                                                                                        <Tabs value={this.state.assets[index].assetTab} onChange={this.handleChange(index)}
                                                                                            fullWidth={true}
                                                                                            classes={{
                                                                                                indicator: classes.indicator,
                                                                                            }}

                                                                                            scrollable
                                                                                            selected={true}
                                                                                        >
                                                                                            <Tab label="Self" className={classes.tabLabelStyle} />
                                                                                            <Tab label="Spouse" className={classes.tabLabelStyle} />
                                                                                            <Tab label="dep 1" className={classes.tabLabelStyle} />
                                                                                            <Tab label="dep 2" className={classes.tabLabelStyle} />
                                                                                            <Tab label="dep 3" className={classes.tabLabelStyle} />

                                                                                        </Tabs>
                                                                                    </AppBar>
                                                                                </Col>
                                                                            </Row>




                                                                            {this.state.assets[index].data.map((item, indices) => {
                                                                                return (
                                                                                    <div key={indices}>
                                                                                        {this.state.assets[index].assetTab === 0 && <div className="mt-1" >

                                                                                            {this.state.assets[index].data[indices].asset_self.map((item, selfIndex) => {
                                                                                                return (
                                                                                                    <div key={selfIndex}>
                                                                                                        <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                            {selfIndex === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.removeData.bind(this, indices, index, selfIndex)}></i>}
                                                                                                            <Row className="w-100 ml-auto mr-auto">
                                                                                                                <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                                    <div className="ml-auto mr-auto">
                                                                                                                        <div className="fontSemiBold12 text-white">
                                                                                                                            <div className="mt-1">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Description"
                                                                                                                                        maxLength={25}
                                                                                                                                        onChange={this.handleDescSelf(index, indices, selfIndex)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_self[selfIndex].self_desc}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                            <div className="mt-3">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Amount"
                                                                                                                                        type="text"
                                                                                                                                        maxLength={16}
                                                                                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }}
                                                                                                                                        onChange={this.handleAmtSelf(index, indices, selfIndex)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_self[selfIndex].self_amount}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </Col>
                                                                                                            </Row>

                                                                                                        </div>

                                                                                                    </div>

                                                                                                );
                                                                                            }
                                                                                            )}
                                                                                            <div className="text-right cursorPointer" onClick={this.addMore.bind(this, index, indices)}>
                                                                                                + ADD MORE
                                                                                                        </div>
                                                                                        </div>
                                                                                        }

                                                                                        {this.state.assets[index].assetTab === 1 && <div className="mt-1" >

                                                                                            {this.state.assets[index].data[indices].asset_spouse.map((item, spouseIndex) => {
                                                                                                return (
                                                                                                    <div key={spouseIndex}>
                                                                                                        <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                            {spouseIndex === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.removeSpouseData.bind(this, indices, index, spouseIndex)}></i>}
                                                                                                            <Row className="w-100 ml-auto mr-auto">
                                                                                                                <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                                    <div className="ml-auto mr-auto">
                                                                                                                        <div className="fontSemiBold12 text-white">
                                                                                                                            <div className="mt-1">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Description"
                                                                                                                                        maxLength={25}
                                                                                                                                        onChange={this.handleDescSpouse(index, indices, spouseIndex)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_spouse[spouseIndex].spouse_desc}

                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                            <div className="mt-3">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Amount"
                                                                                                                                        type="text"
                                                                                                                                        maxLength={16}
                                                                                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }}
                                                                                                                                        onChange={this.handleAmtSpouse(index, indices, spouseIndex)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_spouse[spouseIndex].spouse_amount}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </Col>
                                                                                                            </Row>

                                                                                                        </div>

                                                                                                    </div>

                                                                                                );
                                                                                            }
                                                                                            )}
                                                                                            <div className="text-right cursorPointer" onClick={this.addMoreSpouse.bind(this, index, indices)}>
                                                                                                + ADD MORE
                                                                                                        </div>
                                                                                        </div>
                                                                                        }
                                                                                        {this.state.assets[index].assetTab === 2 && <div className="mt-1" >

                                                                                            {this.state.assets[index].data[indices].asset_depend1.map((item, dep1Index) => {
                                                                                                return (
                                                                                                    <div key={dep1Index}>
                                                                                                        <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                            {dep1Index === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.removeDep_1Data.bind(this, indices, index, dep1Index)}></i>}
                                                                                                            <Row className="w-100 ml-auto mr-auto">
                                                                                                                <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                                    <div className="ml-auto mr-auto">
                                                                                                                        <div className="fontSemiBold12 text-white">
                                                                                                                            <div className="mt-1">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Description"
                                                                                                                                        maxLength={25}
                                                                                                                                        onChange={this.handleDescDep1(index, indices, dep1Index)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_depend1[dep1Index].depend1_desc}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                            <div className="mt-3">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Amount"
                                                                                                                                        type="text"
                                                                                                                                        maxLength={16}
                                                                                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }}
                                                                                                                                        onChange={this.handleAmtDep1(index, indices, dep1Index)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_depend1[dep1Index].depend1_amount}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </Col>
                                                                                                            </Row>

                                                                                                        </div>

                                                                                                    </div>

                                                                                                );
                                                                                            }
                                                                                            )}
                                                                                            <div className="text-right cursorPointer" onClick={this.addMoreDep1.bind(this, index, indices)}>
                                                                                                + ADD MORE
                                                                                                   </div>
                                                                                        </div>
                                                                                        }

                                                                                        {this.state.assets[index].assetTab === 3 && <div className="mt-1" >

                                                                                            {this.state.assets[index].data[indices].asset_depend2.map((item, dep2Index) => {
                                                                                                return (
                                                                                                    <div key={dep2Index}>
                                                                                                        <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                            {dep2Index === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.removeDep_2Data.bind(this, indices, index, dep2Index)}></i>}
                                                                                                            <Row className="w-100 ml-auto mr-auto">
                                                                                                                <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                                    <div className="ml-auto mr-auto">
                                                                                                                        <div className="fontSemiBold12 text-white">
                                                                                                                            <div className="mt-1">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Description"
                                                                                                                                        maxLength={25}
                                                                                                                                        onChange={this.handleDescDep2(index, indices, dep2Index)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_depend2[dep2Index].depend2_desc}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                            <div className="mt-3">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Amount"
                                                                                                                                        type="text"
                                                                                                                                        maxLength={16}
                                                                                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }}
                                                                                                                                        onChange={this.handleAmtDep2(index, indices, dep2Index)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_depend2[dep2Index].depend2_amount}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </Col>
                                                                                                            </Row>

                                                                                                        </div>

                                                                                                    </div>

                                                                                                );
                                                                                            }
                                                                                            )}
                                                                                            <div className="text-right cursorPointer" onClick={this.addMoreDep2.bind(this, index, indices)}>
                                                                                                + ADD MORE
                                                                                                           </div>
                                                                                        </div>
                                                                                        }

                                                                                        {this.state.assets[index].assetTab === 4 && <div className="mt-1" >

                                                                                            {this.state.assets[index].data[indices].asset_depend3.map((item, dep3Index) => {
                                                                                                return (
                                                                                                    <div key={dep3Index}>
                                                                                                        <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                            {dep3Index === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.removeDep_3Data.bind(this, indices, index, dep3Index)}></i>}
                                                                                                            <Row className="w-100 ml-auto mr-auto">
                                                                                                                <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                                    <div className="ml-auto mr-auto">
                                                                                                                        <div className="fontSemiBold12 text-white">
                                                                                                                            <div className="mt-1">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Description"
                                                                                                                                        maxLength={25}
                                                                                                                                        onChange={this.handleDescDep3(index, indices, dep3Index)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_depend3[dep3Index].depend3_desc}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                            <div className="mt-3">
                                                                                                                                <InputGroup className="firstInput">
                                                                                                                                    <Input
                                                                                                                                        className=" fontRegular12 noBorderRadius"
                                                                                                                                        placeholder="Amount"
                                                                                                                                        type="text"
                                                                                                                                        maxLength={16}
                                                                                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }}
                                                                                                                                        onChange={this.handleAmtDep3(index, indices, dep3Index)}
                                                                                                                                        defaultValue={this.state.assets[index].data[indices].asset_depend3[dep3Index].depend3_amount}
                                                                                                                                    />
                                                                                                                                </InputGroup>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </Col>
                                                                                                            </Row>

                                                                                                        </div>
                                                                                                        <div className="text-right cursorPointer" onClick={this.addMoreDep3.bind(this, index, indices)}>
                                                                                                            + ADD MORE
                                                                                                        </div>
                                                                                                    </div>

                                                                                                );
                                                                                            }
                                                                                            )}
                                                                                        </div>
                                                                                        }

                                                                                    </div>
                                                                                );
                                                                            }
                                                                            )}

                                                                        </div>
                                                                    </div>}
                                                            </div>

                                                        );
                                                    }
                                                    )}
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col>
                                                    <div className="mt-3">
                                                        <Button variant="contained" size="small"
                                                            className={classes.addButton}
                                                            onClick={this.addAssets}
                                                        >
                                                            <img src={Add} className={classes.iconMargin}
                                                                alt="search" height="15" width="15"
                                                            />
                                                            ADD ASSETS
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="ml-auto mr-auto mt-4">
                                                <Col sm={12} xs={12} lg={10} md={10} xl={10} className="ml-auto mr-auto">
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
                                                                onClick={this.handleUpdateCandidate}
                                                                className={classes.buttonLogin}
                                                                disabled={this.state.disableButton}
                                                            >
                                                                UPDATE
                                                    </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>


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
UpdateAssestsLiabilities = withRouter(UpdateAssestsLiabilities)
export default withStyles(styles)(UpdateAssestsLiabilities);