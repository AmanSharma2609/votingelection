/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : update admin profile
Purpose   : admin can update his profile here.
*/
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import User from '@material-ui/icons/SupervisedUserCircle';
import Mobile from '@material-ui/icons/MobileFriendly';
import Location from '@material-ui/icons/GpsFixed';
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio'
import { InputGroup, Input }
    from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import { constants } from '../../networkCall/constant'
import ErrorSnackBar from '../../networkCall/errorSnackBar'
import { items } from '../../networkCall/service.js'
import Logo from '../../images/SVGs/Logo_Approved_02.svg';
import userOne from '../../images/SVGs/default_userimg.svg'


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textFieldInput1: {
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        fontSize: 20,
        display: 'flex',
        flexWrap: 'wrap',
        height: 55,
        width: 'calc(90% - 20px)',
        margin: 0.01,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 3
    },
    widthRadio : {
        width: 'calc(90% - 20px)'
    },
    textFieldInput2: {
        backgroundColor: 'white',
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: 16,
        width: 'calc(90% - 20px)',
        margin: 0.01,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    resize: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'montserratregular',
        '&::placeholder': {
            color: '#3C3C3C',
            fontWeight: 800
        }
    },
    buttonLogin: {
        width: 'calc(90% - 20px)',
        fontFamily: 'montserratregular',
        fontSize: 14,
        height: 50,
        marginTop: 0.1,
        borderRadius: 0,
        backgroundColor: '#E18F68',
        color: 'white',
        boxShadow: 'none',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    root: {
        '&$checked': {
          color: '#E18F68',
        },
      },
      checked: {
        color: '#E18F68',
    
      },
      fontLabel: {
        fontFamily: 'montserratregular',
        color: '#555555',
      },
      label: {
        fontFamily: 'montserratregular',
        color: '#555555',
        fontSize: 13,
        whiteSpace: 'nowrap',
        textAlign : 'left',
        padding : 0
      },
      labelC: {
        fontFamily: 'montserratregular',
        color: '#555555',
        fontSize: 13,
        width: 105,
      },
    calendar: {
        '& i': {
            top: 18,
            left: 3,
            color: "#A5A5A5"
        },
        '& input': {
            marginLeft: 25,
            '&:focus': {
                boxShadow: 'none'
            }
        }
    }
};

const theme = createMuiTheme({
    palette: {
        primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

class UpdateAdminProfile extends Component {

    state = {
        parameter: {
            votingElection_code: constants.votingElectionCode,
            admin_email: '',
            admin_password: '',
        },
        parameterEmpty: false,
        passwordEmpty: true,
        showPassword: false,
        invalidEmail: false,
        open: false,
        vertical: 'top',
        horizontal: 'center',
        hello: "Invalid Email or Password",
        name: '',
        date: '',
        email: '',
        number: '',
        mobile: '',
        location: '',
        startDate: '',
        gender: 'Male',
        nameCheck: false,
        dobCheck: false,
        updateButton: false
    };

    componentDidMount = () => {
        this.adminProfileDetail();
    }

    handleAdmin = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    adminProfileDetail() {
        let requestedData = {
            votingElection_code: constants.votingElectionCode,
            token_id: localStorage.getItem('accessToken'),
            admin_id: 1
        }


        items('POST', requestedData, constants.adminProfile)
            .then(response => {
    
                if (response.status === "Success") {
                    if (!(response.data === null || response.data.length === 0)) {
                        this.setState({ name: response.data[0].admin_name });
                        this.setState({ date: response.data[0].admin_dob });
                        this.setState({ mobile: response.data[0].admin_mobile_no });
                        this.setState({ email: response.data[0].admin_email });
                        this.setState({ location: response.data[0].admin_location });
                        this.setState({ gender: response.data[0].admin_gender });
                        this.setState({ loading: false })
                    }
                }
                else if (response.status === "Failure") {
                    this.setState({ loading: false })
                }
                else {
                    this.setState({ loading: false })
                }

            });
    }

    onEnter = (e) => {
        if (e.key === 'Enter') {
            this.adminEditProfileAuth();
        }
    }

    adminEditProfileAuth = () => {
        if (this.state.name === '') {
            this.setState({ nameCheck: true });
            this.setState({ dobCheck: false });
        }
        else if (this.state.dob === '') {
            this.setState({ nameCheck: false });
            this.setState({ dobCheck: true });
        }
        else {
            this.setState({ updateButton: true });
            this.setState({ nameCheck: false });
            this.setState({ dobCheck: false });
            let requestedData = {
                'votingElection_code': constants.votingElectionCode,
                'token_id': localStorage.getItem('accessToken'),
                'admin_id': 1,
                'admin_name': this.state.name,
                'admin_gender': this.state.gender,
                'admin_dob': this.state.date,
                'admin_mobile_no': this.state.mobile,
                'admin_location': this.state.location
            }

            items('POST', requestedData, constants.adminUpdateProfile)
                .then(response => {
                    if (response.status === "Success") {
                        this.setState({ updateButton: false });
                        this.props.history.push('AdminProfile');
                    }
                    else if (response.status === "Failure") {
                        this.setState({ loading: false });
                        this.setState({ updateButton: false });
                    }
                    else {
                        this.setState({ loading: false });
                        this.setState({ updateButton: false });
                    }

                });
        }
    }

    handleGenderTypeMale = () => {
        this.setState({gender : "Male"});
    }

    handleGenderTypeFemale = () => {
        this.setState({gender : "Female"});
    }

    handleGenderTypeOther = () => {
        this.setState({gender : "Other"});
    }

    render() {
        const { classes } = this.props;
        const { vertical, horizontal } = this.state;
        return (
            <Container fluid={true} className="loginPage d-flex flex-column w-100 justify-content-center align-items-center lightBackgroundColor">
                <Row className="topContainerLogin d-flex  w-50 justify-content-center align-items-center">
                    <Col xs="6" sm="4" md="5" lg="5" xl="4" className="d-flex  h-50 justify-content-center align-items-center">
                        <NavLink to='/AdminLogin'>
                            <Image
                                src={Logo}
                                rounded
                                style={{ height: 70, width: 200 }}
                            />
                        </NavLink>
                    </Col>
                </Row>
                <Row className="formContainerLogin d-flex  w-100 justify-content-center align-items-start mb-5">
                    <Col xs="12" sm="12" md="8" lg="5" xl="4" className="formBoxLogin h-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="mr-3 adminProfileImageDiv position-relative position-relative">
                            <Image className="circle" width="90" src={userOne} img-fluid></Image>
                        </div>
                        <div className="loginTextBox mb-1 mt-1 d-flex  w-50 justify-content-center align-items-">
                            <span className=" fontBold fontLightColor">Admin Profile</span>
                        </div>
                        <div className="validationContAdminLogin">
                            {this.state.nameCheck ?

                                <span className="fontRegular14 validationColor">{constants.msg.nameEmpty}</span>

                                : null}
                            {this.state.dobCheck ?

                                <span className="fontRegular14 validationColor">{constants.msg.dobEmpty}</span>

                                : null}
                        </div>
                        <TextField
                            placeholder="Name *"
                            autoComplete="Name"
                            name="name"
                            value={this.state.name}
                            type="text"
                            onChange={this.handleAdmin}
                            onKeyPress={this.onEnter}
                            inputProps={{
                                maxLength: 30
                            }}
                            InputLabelProps={{
                                className: classes.textFieldFormLabel,
                            }}
                            className={classes.textFieldInput1}
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.resize,
                                },

                                startAdornment: (
                                    <MuiThemeProvider theme={theme}>
                                        <InputAdornment position="start">
                                            <User color='primary' className={classes.iconMargin} />
                                        </InputAdornment>
                                    </MuiThemeProvider>
                                ),
                            }}
                        />

                        <div className={`${classes.textFieldInput1} ${classes.calendar} d-flex justify-content-center position-relative`}>
                            <InputGroup className="firstInput datePickerCandidate h-100">
                                <i className="fa fa-calendar position-absolute iconCalender"></i>
                                <Input type="date" autoCompelete={true}
                                    onChange={(event) => this.setState({ date: event.target.value })}
                                    value={this.state.date === '0000-00-00' ? null : this.state.date}
                                    className="text-uppercase dateInput fontRegular12 pl-2 fontRegular14 form-control border-0 dateInput h-100"
                                    max={"2010-12-31"} placeholder="DATE OF BIRTH"
                                    min={"1947-12-31"} />
                            </InputGroup>
                        </div>

                        <TextField
                            placeholder="Email Address"
                            autoComplete="email"
                            name="email"
                            value={this.state.email}
                            type="email"
                            disabled
                            onChange={this.handleAdmin}
                            onKeyPress={this.onEnter}
                            inputProps={{
                                maxLength: 30
                            }}
                            InputLabelProps={{
                                className: classes.textFieldFormLabel,
                            }}
                            className={classes.textFieldInput1}
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.resize,
                                },

                                startAdornment: (
                                    <MuiThemeProvider theme={theme}>
                                        <InputAdornment position="start">
                                            <Email color='primary' className={classes.iconMargin} />
                                        </InputAdornment>
                                    </MuiThemeProvider>
                                ),
                            }}
                        />
                        <TextField
                            placeholder="Mobile"
                            name="mobile"
                            type="text"
                            value={this.state.mobile}
                            onKeyPress={this.onEnter}
                            onChange={this.handleAdmin}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0,10) }}
                            inputProps={{
                                maxLength: 30,
                            }}
                            InputLabelProps={{
                                className: classes.textFieldFormLabel,
                            }}
                            className={classes.textFieldInput1}
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.resize,
                                },

                                startAdornment: (
                                    <MuiThemeProvider theme={theme}>
                                        <InputAdornment position="start">
                                            <Mobile color='primary' className={classes.iconMargin} />
                                        </InputAdornment>
                                    </MuiThemeProvider>
                                ),
                            }}
                        />

                        <div className={classes.widthRadio}>
                            <FormControlLabel classes={{
                                label: classes.label
                            }}
                                control={
                                    <Radio
                                        checked={this.state.gender === "Male"}
                                        onClick={this.handleGenderTypeMale}
                                        value={this.state.gender}

                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}

                                    />
                                }
                                label="Male"
                            />

                            <FormControlLabel classes={{
                                label: classes.label
                            }}
                                control={
                                    <Radio
                                        checked={this.state.gender === "Female"}
                                        onClick={this.handleGenderTypeFemale}
                                        value={this.state.gender}

                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}

                                    />
                                }
                                label="Female"
                            />
                            <FormControlLabel classes={{
                                label: classes.label
                            }}
                                control={
                                    <Radio
                                        checked={this.state.gender === "Other"}
                                        onClick={this.handleGenderTypeOther}
                                        value={this.state.gender}

                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}

                                    />
                                }
                                label="Other"
                            />
                        </div>

                        
                        <TextField
                            placeholder="Location"
                            autoComplete="Name"
                            name="location"
                            onKeyPress={this.onEnter}
                            type="text"
                            value={this.state.location}
                            onChange={this.handleAdmin}
                            inputProps={{
                                maxLength: 30
                            }}
                            InputLabelProps={{
                                className: classes.textFieldFormLabel,
                            }}
                            className={classes.textFieldInput1}
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.resize,
                                },

                                startAdornment: (
                                    <MuiThemeProvider theme={theme}>
                                        <InputAdornment position="start">
                                            <Location color='primary' className={classes.iconMargin} />
                                        </InputAdornment>
                                    </MuiThemeProvider>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={this.adminEditProfileAuth}
                            className={classes.buttonLogin}
                            disabled={this.state.updateButton}
                        >
                            UPDATE PROFILE
                        </Button>
                        <ErrorSnackBar open={this.state.open}
                            onClose={this.handleClose}
                            anchorOrigin={{ vertical, horizontal }}
                            message={this.state.hello}
                        />
                    </Col>
                </Row>
            </Container>



        )
    }
}
UpdateAdminProfile = withRouter(UpdateAdminProfile)
export default withStyles(styles)(UpdateAdminProfile);


