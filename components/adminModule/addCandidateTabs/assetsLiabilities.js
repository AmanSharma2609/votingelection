/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateTabs > assets&liability - tab.
Purpose   : Add candidate's assets and liabilites
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
import Add from '../../../images/add.png';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import {
    InputGroup, Input,
}
    from 'reactstrap';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};



const styles = theme => ({
    iconSize: {
        fontSize: 18
    },
    root: {
        '&$checked': {
            color: ' #E18F68',
        },
    },
    checked: {
        color: '#E18F68',

    },
    buttonLogin: {
        width: '100%',
        textTransform: 'capitalize',
        fontFamily: 'montserratregular',
        fontSize: 14,
        height: '15%',
        marginTop: 0.1,
        boxShadow: 'none',
        backgroundColor: '#E18F68',
        color: 'white',
        borderRadius: '3px',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    iconMargin: {
        marginRight: '5%',
        color: 'white'
    },
    tabLabelStyleAssets: {
        textTransform: 'capitalize',
        color: 'black',
        fontSize: 14,
        fontFamily: 'montserratregular',
        '&:focus': {
            outline: 'none',
        },
        'element.style': {
            width: 183,
        },
    },
    indicator: {
        backgroundColor: '#FEF8DF',
    },

    appBarStyle: {
        backgroundColor: '#E18F68',
        boxShadow: 'none',
        color: '#fff'
    },
    label: {
        color: '#555555',
    },
    addButton: {
        boxShadow: 'none',
        fontFamily: 'montserratregular',
        fontSize: 12,
        color: 'white',
        width: ' 200px',
        borderRadius: '3px',
        backgroundColor: '#E18F68',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
});

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


class AssestsLiabilities extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className="candidate_other_info">
                <Container>
                    <Row>
                        <Col>
                            <div className="">
                                <div className="mt-2" >
                                    <Row className="ml-auto mr-auto mt-3">
                                        <Col sm={12} xs={12} lg={10} md={10} xl={10} className="ml-auto mr-auto">
                                            {this.props.assets.map((item, index) => {
                                                return (
                                                    <div className="mt-4 p-3 boxShadow position-relative assetLiabilitiesIcons rounded" key={index}>
                                                        {index === 0 ? null : <i className="fa fa-times position-absolute iconsCross cursorPointer" onClick={this.props.removeAssets.bind(this, index)}></i>}
                                                        {this.props.assets[index].flag === 1 ? <i className="fa fa-minus position-absolute iconsPlus cursorPointer" onClick={this.props.assetsHide.bind(this, index)}></i> : <i className="fa fa-plus position-absolute iconsPlus cursorPointer" onClick={this.props.assetsShow.bind(this, index)}></i>}
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
                                                                                        checked={this.props.assets[index].asset_type === "Movable Assets"}
                                                                                        onChange={this.props.handleAssetType(index)}
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
                                                                                        checked={this.props.assets[index].asset_type === "Immovable Assets"}
                                                                                        onChange={this.props.handleAssetType(index)}
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
                                                                                        checked={this.props.assets[index].asset_type === "Liability"}
                                                                                        onChange={this.props.handleAssetType(index)}
                                                                                        value="Liability"
                                                                                        classes={{
                                                                                            root: classes.root,
                                                                                            checked: classes.checked,
                                                                                        }}

                                                                                    />
                                                                                }
                                                                                label="Liability"
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
                                                                            disabled={this.props.assets[index].asset_type === '' ? true : false}
                                                                            value={this.props.assets[index].asset_name}
                                                                            onChange={this.props.handleAssetDesc(index)}
                                                                            input={<BootstrapInput name="age" id="age-customized-select" />}
                                                                        >
                                                                            <MenuItem value="">{this.props.assets[index].asset_type}</MenuItem>
                                                                            {this.props.assets[index].asset_desc.map((item, indxx) => {
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

                                                        {this.props.assets[index].flag === 0 ? null :
                                                            <div>
                                                                <div className={classes.root}>
                                                                    <Row className="ml-auto mr-auto">
                                                                        <Col sm={12} xs={12} lg={12} md={12} xl={12} className="ml-auto mr-auto">
                                                                            <AppBar position="static" className={classes.appBarStyle}
                                                                            >
                                                                                <Tabs value={this.props.assets[index].assetTab} onChange={this.props.handleChangeAssetIndex(index)}
                                                                                    fullWidth={true}
                                                                                    classes={{
                                                                                        indicator: classes.indicator,
                                                                                    }}
                                                                                    scrollButtons="auto"
                                                                                    scrollable
                                                                                    selected={true}
                                                                                >
                                                                                    <Tab label="Self" className={this.props.assets[index].assetTab === 0 ? classes.active_tab : classes.tabLabelStyle} />
                                                                                    <Tab label="Spouse" className={this.props.assets[index].assetTab === 1 ? classes.active_tab : classes.tabLabelStyle} />
                                                                                    <Tab label="dep 1" className={this.props.assets[index].assetTab === 2 ? classes.active_tab : classes.tabLabelStyle} />
                                                                                    <Tab label="dep 2" className={this.props.assets[index].assetTab === 3 ? classes.active_tab : classes.tabLabelStyle} />
                                                                                    <Tab label="dep 3" className={this.props.assets[index].assetTab === 4 ? classes.active_tab : classes.tabLabelStyle} />

                                                                                </Tabs>
                                                                            </AppBar>
                                                                        </Col>
                                                                    </Row>

                                                                    {this.props.assets[index].data.map((item, indices) => {
                                                                        return (
                                                                            <div key={indices}>
                                                                                {this.props.assets[index].assetTab === 0 && <div className="mt-1" >

                                                                                    {this.props.assets[index].data[indices].asset_self.map((item, selfIndex) => {
                                                                                        return (
                                                                                            <div key={selfIndex}>
                                                                                                <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                    {selfIndex === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.props.removeData.bind(this, indices, index, selfIndex)}></i>}
                                                                                                    <Row className="w-100 ml-auto mr-auto">
                                                                                                        <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                            <div className="ml-auto mr-auto">
                                                                                                                <div className="fontSemiBold12 text-white">
                                                                                                                    <div className="mt-1">
                                                                                                                        <InputGroup className="firstInput">
                                                                                                                            <Input
                                                                                                                                className=" fontRegular12 noBorderRadius"
                                                                                                                                placeholder="Description"
                                                                                                                                onChange={this.props.handleDescSelf(index, indices, selfIndex)}
                                                                                                                                autoComplete={true}
                                                                                                                                maxLength={25}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_self[selfIndex].self_desc}
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
                                                                                                                                onChange={this.props.handleAmtSelf(index, indices, selfIndex)}
                                                                                                                                autoComplete={true}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_self[selfIndex].self_amount}
                                                                                                                            />
                                                                                                                        </InputGroup>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                </div>
                                                                                                <div className="text-right cursorPointer" onClick={this.props.addMore.bind(this, index, indices)}>
                                                                                                    + ADD MORE
                                                                                   </div>
                                                                                            </div>

                                                                                        );
                                                                                    }
                                                                                    )}
                                                                                </div>
                                                                                }

                                                                                {this.props.assets[index].assetTab === 1 && <div className="mt-1" >

                                                                                    {this.props.assets[index].data[indices].asset_spouse.map((item, spouseIndex) => {
                                                                                        return (
                                                                                            <div key={spouseIndex}>
                                                                                                <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                    {spouseIndex === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.props.removeSpouseData.bind(this, indices, index, spouseIndex)}></i>}
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
                                                                                                                                onChange={this.props.handleDescSpouse(index, indices, spouseIndex)}
                                                                                                                                autoComplete={true}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_spouse[spouseIndex].spouse_desc}

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
                                                                                                                                onChange={this.props.handleAmtSpouse(index, indices, spouseIndex)}
                                                                                                                                autoComplete={true}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_spouse[spouseIndex].spouse_amount}
                                                                                                                            />
                                                                                                                        </InputGroup>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                </div>
                                                                                                <div className="text-right cursorPointer" onClick={this.props.addMoreSpouse.bind(this, index, indices)}>
                                                                                                    + ADD MORE
                                                                                           </div>
                                                                                            </div>

                                                                                        );
                                                                                    }
                                                                                    )}
                                                                                </div>
                                                                                }
                                                                                {this.props.assets[index].assetTab === 2 && <div className="mt-1" >

                                                                                    {this.props.assets[index].data[indices].asset_depend1.map((item, dep1Index) => {
                                                                                        return (
                                                                                            <div key={dep1Index}>
                                                                                                <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                    {dep1Index === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.props.removeDep_1Data.bind(this, indices, index, dep1Index)}></i>}
                                                                                                    <Row className="w-100 ml-auto mr-auto">
                                                                                                        <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                            <div className="ml-auto mr-auto">
                                                                                                                <div className="fontSemiBold12 text-white">
                                                                                                                    <div className="mt-1">
                                                                                                                        <InputGroup className="firstInput">
                                                                                                                            <Input
                                                                                                                                className=" fontRegular12 noBorderRadius"
                                                                                                                                placeholder="Description"
                                                                                                                                onChange={this.props.handleDescDep1(index, indices, dep1Index)}
                                                                                                                                autoComplete={true}
                                                                                                                                maxLength={25}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_depend1[dep1Index].depend1_desc}
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
                                                                                                                                onChange={this.props.handleAmtDep1(index, indices, dep1Index)}
                                                                                                                                autoComplete={true}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_depend1[dep1Index].depend1_amount}
                                                                                                                            />
                                                                                                                        </InputGroup>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                </div>
                                                                                                <div className="text-right cursorPointer" onClick={this.props.addMoreDep1.bind(this, index, indices)}>
                                                                                                    + ADD MORE
                                                                                                   </div>
                                                                                            </div>

                                                                                        );
                                                                                    }
                                                                                    )}
                                                                                </div>
                                                                                }

                                                                                {this.props.assets[index].assetTab === 3 && <div className="mt-1" >

                                                                                    {this.props.assets[index].data[indices].asset_depend2.map((item, dep2Index) => {
                                                                                        return (
                                                                                            <div key={dep2Index}>
                                                                                                <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                    {dep2Index === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.props.removeDep_2Data.bind(this, indices, index, dep2Index)}></i>}
                                                                                                    <Row className="w-100 ml-auto mr-auto">
                                                                                                        <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                            <div className="ml-auto mr-auto">
                                                                                                                <div className="fontSemiBold12 text-white">
                                                                                                                    <div className="mt-1">
                                                                                                                        <InputGroup className="firstInput">
                                                                                                                            <Input
                                                                                                                                className=" fontRegular12 noBorderRadius"
                                                                                                                                placeholder="Description"
                                                                                                                                onChange={this.props.handleDescDep2(index, indices, dep2Index)}
                                                                                                                                autoComplete={true}
                                                                                                                                maxLength={25}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_depend2[dep2Index].depend2_desc}
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
                                                                                                                                onChange={this.props.handleAmtDep2(index, indices, dep2Index)}
                                                                                                                                autoComplete={true}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_depend2[dep2Index].depend2_amount}
                                                                                                                            />
                                                                                                                        </InputGroup>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                </div>
                                                                                                <div className="text-right cursorPointer" onClick={this.props.addMoreDep2.bind(this, index, indices)}>
                                                                                                    + ADD MORE
                                                                                                           </div>
                                                                                            </div>

                                                                                        );
                                                                                    }
                                                                                    )}
                                                                                </div>
                                                                                }

                                                                                {this.props.assets[index].assetTab === 4 && <div className="mt-1" >

                                                                                    {this.props.assets[index].data[indices].asset_depend3.map((item, dep3Index) => {
                                                                                        return (
                                                                                            <div key={dep3Index}>
                                                                                                <div className="border pt-2 pb-2 position-relative mt-3">
                                                                                                    {dep3Index === 0 ? null : <i className="fa fa-times position-absolute iconCrossValue cursorPointer" onClick={this.props.removeDep_3Data.bind(this, indices, index, dep3Index)}></i>}
                                                                                                    <Row className="w-100 ml-auto mr-auto">
                                                                                                        <Col sm={12} xs={12} lg={11} md={11} xl={11} className="ml-auto mr-auto">
                                                                                                            <div className="ml-auto mr-auto">
                                                                                                                <div className="fontSemiBold12 text-white">
                                                                                                                    <div className="mt-1">
                                                                                                                        <InputGroup className="firstInput">
                                                                                                                            <Input
                                                                                                                                className=" fontRegular12 noBorderRadius"
                                                                                                                                placeholder="Description"
                                                                                                                                onChange={this.props.handleDescDep3(index, indices, dep3Index)}
                                                                                                                                autoComplete={true}
                                                                                                                                maxLength={25}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_depend3[dep3Index].depend3_desc}
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
                                                                                                                                onChange={this.props.handleAmtDep3(index, indices, dep3Index)}
                                                                                                                                autoComplete={true}
                                                                                                                                defaultValue={this.props.assets[index].data[indices].asset_depend3[dep3Index].depend3_amount}
                                                                                                                            />
                                                                                                                        </InputGroup>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                </div>
                                                                                                <div className="text-right cursorPointer" onClick={this.props.addMoreDep3.bind(this, index, indices)}>
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
                                                    onClick={this.props.addAssets}
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
                                                        onClick={this.props.handleGoBackAsset}
                                                    >
                                                        GO BACK
                                                        </Button>
                                                </Col>
                                                <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                                                    <Button
                                                        variant="contained"
                                                        onClick={this.props.handleAssetNextClick}
                                                        className={classes.buttonLogin}
                                                    >
                                                        NEXT
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
        )


    }
}


AssestsLiabilities.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssestsLiabilities);