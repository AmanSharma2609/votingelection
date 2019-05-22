/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateTabs > other-info - tab.
Purpose   : Add candidate's other info
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
    InputGroup, Input,
}
    from 'reactstrap';

import 'react-quill/dist/quill.snow.css';


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


class OtherInfo extends Component {

    render() {
        const { classes } = this.props;

        return (
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
                                                    onChange={this.props.handleInterests}
                                                    maxLength={40}
                                                    defaultValue={this.props.addCandidateParameter.candidate_interests}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="fontRegular12  text-danger  position-absolute  ">
                                            {this.props.candInteres ? <span>This Field is required</span> : null}
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
                                                    defaultValue={this.props.addCandidateParameter.candidate_religious_view}
                                                    onChange={this.props.handleReligiousView}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="fontRegular12  text-danger  position-absolute  ">
                                            {this.props.candRelView ? <span>This Field is required</span> : null}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        {this.props.awards.map((awards, index) => {
                                            return (
                                                <div className="mt-3 position-relative education" key={index}>

                                                    {index === 0 ? null : <i className="fa fa-times position-absolute crossIcon" onClick={this.props.removeAwards.bind(this, index)}></i>}

                                                    <InputGroup className="firstInput">
                                                        <Input
                                                            className=" fontRegular12 noBorderRadius"
                                                            placeholder="Awards"
                                                            defaultValue={awards}
                                                            maxLength={20}
                                                            onChange={this.props.handleAwards(index)}
                                                        />
                                                    </InputGroup>

                                                </div>
                                            );
                                        }
                                        )}
                                        <div className="fontRegular12  text-danger  position-absolute  ">
                                            {this.props.candAwards ? <span>This Field is required</span> : null}
                                        </div>
                                        <div className="text-right cursorPointer" onClick={this.props.addAwards}>
                                            + ADD AWARDS
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        {this.props.legislature.map((legislature, index) => {
                                            return (
                                                <div className="mt-3 position-relative education" key={index}>
                                                    {index === 0 ? null : <i className="fa fa-times position-absolute crossIcon" onClick={this.props.removeLegislature.bind(this, index)}></i>}
                                                    <InputGroup className="firstInput">
                                                        <Input
                                                            className=" fontRegular12 noBorderRadius"
                                                            placeholder="Legislature"
                                                            defaultValue={legislature}
                                                            maxLength={20}
                                                            onChange={this.props.handleLegislature(index)}
                                                        />
                                                    </InputGroup>

                                                </div>
                                            );
                                        }
                                        )}
                                        <div className="fontRegular12  text-danger  position-absolute  ">
                                            {this.props.candLegis ? <span>This Field is required</span> : null}
                                        </div>
                                        <div className="text-right cursorPointer" onClick={this.props.addLegislature}>
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
                                        onClick={this.props.handleGoBackOther}
                                    >
                                        GO BACK
                                    </Button>
                                </Col>
                                <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                                    <Button
                                        variant="contained"
                                        onClick={this.props.handleOtherInfoClick}
                                        className={classes.buttonLogin}
                                    >
                                        NEXT
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </div>
        )


    }
}

export default withStyles(styles)(OtherInfo);