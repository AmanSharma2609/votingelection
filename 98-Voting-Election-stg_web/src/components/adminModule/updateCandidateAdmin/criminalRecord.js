/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : AddCandidateTabs > criminal-record - tab.
Purpose   :  candidate's criminal record
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    InputGroup, Input
}
    from 'reactstrap';
import { constants } from '../../../networkCall/constant'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import { items } from '../../../networkCall/service.js'
import { withRouter } from 'react-router-dom'
import Snackbar1 from '../../../networkCall/snackBar.js'




const styles = theme => ({
    iconSize: {
        fontSize: 18
    },
    circularLoader: {
        color: '#E18F68'
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
    },
    label: {
        fontFamily: 'montserratregular',
        fontSize: 12,
    },
    fontLabel: {
        fontFamily: 'montserratregular',
        fontSize: 12,
    }
})


class UpdateCriminalRecord extends Component {
    state = {
        title: '',
        body: '',
        new: '',
        educationData: [],
        emptyCriminal: [],
        eduData: [],
        criminalVald: false,
        isLoading: true,
        vertical: 'top',
        horizontal: 'center',
        criminalOpen: false,
        successMsg: 'Criminal records updated successfully',
        errorMsg: 'Please fill the empty fields',
        defaultCriminal: {
            votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
            candidate_id: ''
        },
        candidate_criminal_record: [{ criminal_record_id: '', 'criminal_ipc': '', 'criminal_record_desc': '', 'criminal_record_type': '' }],
        updateCriminalRecord: {
            votingElection_code: 'dm90aW5nRWxlY3Rpb258UGFzc3dvcmQjMTA1',
            token_id: '',
            candidate_id: '',
            criminal_record: '',
            delete_criminal_record: ''
        },
        deleteId: [],
        disableButton: false,
        noCriminalRecL: false,
        NoRecMsg: 'No criminal record available'

    }
    //setting the existing value in the input field 
    componentDidMount() {
        let candidateId = localStorage.getItem('candidateUpdateId')
        let value = localStorage.getItem('accessToken');
        this.setState({ updateCriminalRecord: { ...this.state.updateCriminalRecord, token_id: value, candidate_id: candidateId } })
        this.setState({ defaultCriminal: { ...this.state.defaultCriminal, candidate_id: candidateId } }, function () {
            items('POST', this.state.defaultCriminal, constants.defaultCriminal)
                .then(response => {
                    console.log(response)
                    if (response.status === "Success") {
                        if (response.data.length !== 0) {
                            this.setState({ candidate_criminal_record: response.data }, function () {
                                this.setState({ isLoading: false })
                            })
                        }
                        else {
                            this.setState({ isLoading: false })
                            this.setState({ noCriminalRec: true })
                            setTimeout(() => {
                                this.setState({ noCriminalRec: false })
                            }, 3500)
                        }
                    }
                })

        })
    }

    //getting values from the input fields start
    handleIpcSection = (index) => (evt) => {

        this.state.candidate_criminal_record[index].criminal_ipc = evt.target.value;
        this.setState({ candidate_criminal_record: this.state.candidate_criminal_record }, function () {

        })
    }
    handleCheckboxChange = (index) => (evt) => {

        this.state.candidate_criminal_record[index].criminal_record_type = evt.target.value;
        this.setState({ candidate_criminal_record: this.state.candidate_criminal_record }, function () {

        })
    }
    handleOtherDetail = (index) => (evt) => {

        this.state.candidate_criminal_record[index].criminal_record_desc = evt.target.value;
        this.setState({ candidate_criminal_record: this.state.candidate_criminal_record }, function () {

        })
    }
    //getting values from the input fields start

    // add more criminal record function with remove also - start
    addCriminalRecord = (item, index) => {
        this.state.candidate_criminal_record.push({ criminal_record_id: '', 'criminal_ipc': '', 'criminal_record_desc': '', 'criminal_record_type': '' });
        this.setState({ candidate_criminal_record: this.state.candidate_criminal_record });
    }
    removeCriminal = (index, criminal_record_id) => {
        console.log(criminal_record_id)
        let temp = { "criminal_record_id": criminal_record_id }
        this.state.deleteId.push(temp);

        this.setState({ deleteId: this.state.deleteId }, function () {
            this.setState({ updateCriminalRecord: { ...this.state.updateCriminalRecord, delete_criminal_record: this.state.deleteId } })
        });

        this.setState({
            candidate_criminal_record: this.state.candidate_criminal_record.filter((_, i) => i !== index)
        });
    }
    // add more criminal record function with remove also - end

    //update candidate criminal records
    handleCriminalNext = () => {

        for (let i = 0; i < this.state.candidate_criminal_record.length; i++) {
            if (this.state.candidate_criminal_record[i].criminal_ipc !== "" &&
                this.state.candidate_criminal_record[i].criminal_record_desc !== "" &&
                this.state.candidate_criminal_record[i].criminal_record_type !== "") {

                this.setState({ criminalVald: false })

            }
            else {
                this.setState({ criminalVald: true })
            }
        }

        for (let i = 0; i < this.state.candidate_criminal_record.length; i++) {
            if (this.state.candidate_criminal_record[i].criminal_ipc === "") {
                this.setState({ criminalVald: true })
            }
            if (this.state.candidate_criminal_record[i].criminal_record_desc === "") {
                this.setState({ criminalVald: true })
            }
            if (this.state.candidate_criminal_record[i].criminal_record_type === "") {
                this.setState({ criminalVald: true })
            }
        }

        setTimeout(() => {


            if (this.state.criminalVald === false) {
                this.setState({ disableButton: true });
                this.setState({
                    updateCriminalRecord: {
                        ...this.state.updateCriminalRecord,
                        delete_criminal_record: this.state.deleteId.length === 0 ? '' : JSON.stringify(this.state.deleteId),
                        criminal_record: this.state.candidate_criminal_record.length === 0 ? '' : JSON.stringify(this.state.candidate_criminal_record)
                    }
                }, function () {
                    console.log(this.state.updateCriminalRecord)
                    items('POST', this.state.updateCriminalRecord, constants.updateCandCriminal)
                        .then(response => {
                            console.log(response)
                            if (response.status === "Success") {
                                this.setState({ criminalOpen: true })
                                setTimeout(() => {
                                    this.setState({ criminalOpen: false })
                                }, 4000);
                                this.setState({ disableButton: false });
                            }
                            else {
                                this.setState({ disableButton: false });
                            }
                        })
                })



            }
        }, 100)
    }
    handleToCandList = () => {
        this.props.history.push('/AdminCandidate')
    }
    handleClose = () => {
        this.setState({ criminalVald: false })
    }

    render() {
        const { classes } = this.props;
        const { vertical, horizontal } = this.state;

        return (
            <div className="candidate_criminal_Record">


                {this.state.isLoading ? <CircularProgress className={classes.circularLoader} /> :
                    <div className="candidate_criminal_Record">
                        <Snackbar1 open={this.state.criminalOpen}
                            anchorOrigin={{ vertical, horizontal }}
                            message={this.state.successMsg}
                        />
                        <ErrorSnackBar open={this.state.criminalVald}
                            onClose={this.handleClose}
                            anchorOrigin={{ vertical, horizontal }}
                            message={this.state.errorMsg}
                        />
                        <ErrorSnackBar open={this.state.noCriminalRec}
                            onClose={this.handleClose}
                            anchorOrigin={{ vertical, horizontal }}
                            message={this.state.NoRecMsg}
                        />

                        <Container>
                            <Row>
                                <Col>
                                    <div className="mt-3">
                                        <Row className="w-100 ml-auto mr-auto">
                                            <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                                <div className="fontRegular12 text-danger position-absolute valdMarginTop">

                                                </div>
                                            </Col>
                                        </Row>
                                        {this.state.candidate_criminal_record.map((item, index) => {
                                            return (
                                                <div key={index} className=" boxShadow pb-2 criminal position-relative mb-3">
                                                    <i className="fa fa-times cursorPointer position-absolute  crossIcon" onClick={this.removeCriminal.bind(this, index, item.criminal_record_id)}></i>
                                                    <Row className="ml-auto mr-auto">
                                                        <Col sm={12} xs={12} lg={9} md={9} xl={9} className="ml-auto mr-auto">
                                                            <div className="mt-3">
                                                                <InputGroup className="firstInput">
                                                                    <Input
                                                                        className="fontRegular12 noBorderRadius"
                                                                        maxLength={10}
                                                                        placeholder="IPC Sections Applicable (Separated by Comma)"
                                                                        defaultValue={this.state.candidate_criminal_record[index].criminal_ipc}
                                                                        onChange={this.handleIpcSection(index)}
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
                                                                                    checked={this.state.candidate_criminal_record[index].criminal_record_type === "Charges Framed"}
                                                                                    onChange={this.handleCheckboxChange(index)}
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
                                                                                    checked={this.state.candidate_criminal_record[index].criminal_record_type === "Charges Convicted"}
                                                                                    onChange={this.handleCheckboxChange(index)}
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
                                                                                    checked={this.state.candidate_criminal_record[index].criminal_record_type === "Cognizance Only"}
                                                                                    onChange={this.handleCheckboxChange(index)}
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
                                                                    placeholder="Other Details/Acts"
                                                                    maxLength={180}
                                                                    defaultValue={this.state.candidate_criminal_record[index].criminal_record_desc}
                                                                    onChange={this.handleOtherDetail(index)}
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
                                                <div className="text-right cursorPointer" onClick={this.addCriminalRecord}>
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
                                                            onClick={this.handleToCandList}

                                                        >
                                                            CANCEL
                                            </Button>
                                                    </Col>
                                                    <Col sm={6} xs={12} md={6} lg={6} xl={6} className="">
                                                        <Button
                                                            variant="contained"
                                                            onClick={this.handleCriminalNext}
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
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
            </div>
        )
    }
}
UpdateCriminalRecord = withRouter(UpdateCriminalRecord)
export default withStyles(styles)(UpdateCriminalRecord);