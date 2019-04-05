/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateTabs > criminal-record - tab.
Purpose   : Add candidate's criminal record
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';

import {
    InputGroup, Input
}
    from 'reactstrap';

const styles = theme => ({
    iconSize: {
        fontSize: 18
    },
    root: {
        '&$checked': {
            color: '#E18F68',
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
        borderRadius: '3px',
        backgroundColor: '#E18F68',
        color: 'white',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    }
})


class CriminalRecord extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className="candidate_criminal_Record">
                <Container>
                    <Row>
                        <Col>
                            <div className="mt-3">
                                <div className="fontRegular12 text-danger valdMarginTop d-flex justify-content-center">
                                    {this.props.criminalVald ? <div className="">Please fill out all the fields or keep all the fields empty</div> : null}
                                </div>
                                {this.props.addCandidateParameter.candidate_criminal_record.map((item, index) => {
                                    return (
                                        <div key={index} className=" boxShadow pb-2 criminal position-relative mb-3">
                                            <i className="fa fa-times cursorPointer l-10 position-absolute crossIcon" onClick={this.props.removeCriminal.bind(this, index)}></i>

                                            <Row className="ml-auto mr-auto">
                                                <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                                    <div className="mt-3">
                                                        <InputGroup className="firstInput">
                                                            <Input className="fontRegular12 noBorderRadius"
                                                                maxLength={10}
                                                                placeholder="IPC Sections Applicable (Separated by Comma)"
                                                                value={this.props.addCandidateParameter.candidate_criminal_record[index].criminal_ipc}
                                                                onChange={this.props.handleIpcSection(index)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="w-100 ml-auto mr-auto">
                                                <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                                    <div>
                                                        <div className="fontSemiBold14 mr-auto mt-3">
                                                            <FormGroup className={classes.fontLabel} row>
                                                                <FormControlLabel classes={{
                                                                    label: classes.label
                                                                }}
                                                                    control={
                                                                        <Radio
                                                                            checked={this.props.addCandidateParameter.candidate_criminal_record[index].criminal_record_type === "Charges Framed"}
                                                                            onChange={this.props.handleCheckboxChange(index)}
                                                                            value="Charges Framed"

                                                                            classes={{
                                                                                root: classes.root,
                                                                                checked: classes.checked,
                                                                            }}
                                                                        />
                                                                    }
                                                                    label="Charges Framed"
                                                                />
                                                                <FormControlLabel classes={{
                                                                    label: classes.label
                                                                }}
                                                                    control={
                                                                        <Radio
                                                                            checked={this.props.addCandidateParameter.candidate_criminal_record[index].criminal_record_type === "Charges Convicted"}
                                                                            onChange={this.props.handleCheckboxChange(index)}
                                                                            value="Charges Convicted"
                                                                            classes={{
                                                                                root: classes.root,
                                                                                checked: classes.checked,
                                                                            }}
                                                                        />
                                                                    }
                                                                    label="Charges Convicted"
                                                                />
                                                                <FormControlLabel classes={{
                                                                    label: classes.label
                                                                }}
                                                                    control={
                                                                        <Radio
                                                                            checked={this.props.addCandidateParameter.candidate_criminal_record[index].criminal_record_type === "Cognizance Only"}
                                                                            onChange={this.props.handleCheckboxChange(index)}
                                                                            value="Cognizance Only"
                                                                            classes={{
                                                                                root: classes.root,
                                                                                checked: classes.checked,
                                                                            }}

                                                                        />
                                                                    }
                                                                    label="Cognizance Only"
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="ml-auto mr-auto">
                                                <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                                    <div className="mt-2 w-100">
                                                        <textarea type="text" className="w-100 fontRegular12 noBorderRadius p-2" rows="5"
                                                            maxLength={180}
                                                            placeholder="Other Details/Acts"
                                                            onChange={this.props.handleOtherDetail(index)}
                                                            value={this.props.addCandidateParameter.candidate_criminal_record[index].criminal_record_desc}
                                                        ></textarea>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                }
                                )}

                                <Row className="ml-auto mr-auto">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        <div className="text-right cursorPointer" onClick={this.props.addCriminalRecord}>
                                            +ADD CRIMINAL RECORD
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="ml-auto mr-auto mt-5">
                                    <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                        <Row>
                                            <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                                                <Button
                                                    variant="contained"
                                                    color="grey"
                                                    className={classes.buttonLogin}
                                                    onClick={this.props.handleGoBackCriminal}
                                                >
                                                    GO BACK
                                                </Button>
                                            </Col>
                                            <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                                                <Button
                                                    variant="contained"
                                                    onClick={this.props.handleCriminalNext}
                                                    className={classes.buttonLogin}
                                                >
                                                    NEXT
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
        )
    }
}

export default withStyles(styles)(CriminalRecord);