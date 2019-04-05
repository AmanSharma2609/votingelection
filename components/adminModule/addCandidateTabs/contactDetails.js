/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateTabs > contact detail - tab.
Purpose   : Add candidate's contact detail
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
    InputGroup, Input
}
    from 'reactstrap';

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
        backgroundColor: '#E18F68',
        color: 'white',
        borderRadius: '3px',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    }
})


class ContactDetails extends Component {
    state = {
        title: '',
        body: '',
        new: '',
        educationData: [],
        eduData: [],
        addCandidateDisabled: []
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="candidate_contact_details">
                <Container>
                    <Row>
                        <Col>
                            <form>
                                <div className="mt-3">
                                    <Row className="ml-auto mr-auto">
                                        <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                            <div className="mt-3">
                                                <InputGroup className="firstInput">
                                                    <Input
                                                        className="fontRegular12 noBorderRadius"
                                                        placeholder="Hometown"
                                                        maxLength={60}
                                                        onChange={this.props.handleHometown}
                                                        defaultValue={this.props.addCandidateParameter.candidate_home_town}
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
                                                        onChange={this.props.handleCandEmail}
                                                        defaultValue={this.props.addCandidateParameter.candidate_email}
                                                    />
                                                </InputGroup>
                                            </div>
                                            <div className="fontRegular12 text-danger position-absolute">
                                                {this.props.candInvalidEmail ? <span>Invalid Email</span> : null}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="ml-auto mr-auto">
                                        <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                            <div className="mt-3">
                                                <InputGroup className="firstInput">
                                                    <Input
                                                        className="fontRegular12 noBorderRadius"
                                                        placeholder="Phone Number"
                                                        maxLength={10}
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 12)
                                                        }}
                                                        onChange={this.props.handlePhoneNumber}
                                                        defaultValue={this.props.addCandidateParameter.candidate_phone_no}
                                                    />
                                                </InputGroup>
                                            </div>
                                            <div className="fontRegular12 text-danger position-absolute">
                                                {this.props.candPhone ? <span>This field is required</span> : null}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="ml-auto mr-auto">
                                        <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                            <div className="mt-3 w-100">
                                                <textarea type="text" className="w-100 fontRegular12 noBorderRadius p-2" rows="5"
                                                    placeholder="Current Address"
                                                    maxLength={180}
                                                    defaultValue={this.props.addCandidateParameter.candidate_address}
                                                    onChange={this.props.handleCurrentAddress}
                                                ></textarea>
                                            </div>
                                            <div className="fontRegular12 text-danger position-absolute">
                                                {this.props.candCurrentAdd ? <span>This field is required</span> : null}
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
                                                        onClick={this.props.handleGoBackContact}
                                                    >
                                                        GO BACK
                                                </Button>
                                                </Col>
                                                <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                                                    <Button
                                                        disabled={this.props.addCandidateDisabled}
                                                        variant="contained"
                                                        onClick={this.props.handleAddCandidate}
                                                        className={classes.buttonLogin}
                                                    >
                                                        ADD CANDIDATE
                                                </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(ContactDetails);