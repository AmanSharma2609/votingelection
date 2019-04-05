/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : resetPassword.js
Purpose   : To reser the password of user
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Eye from '@material-ui/icons/Lock';
import UserSearchAppBar from './userAppbar/userAppBar'
import Footer from './userFooter/footer.js'
import { constants } from '../../../networkCall/constant'
import ErrorSnackBar from '../../../networkCall/errorSnackBar'
import { items } from '../../../networkCall/service.js'
import Snackbar1 from '../../../networkCall/snackBar.js'

// Inline css for react material components

const styles = theme => ({
    textFieldInput1: {
        borderRadius: 0,
        backgroundColor: '#FBFBFB',
        height: '8%',
        paddingLeft: '13px',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'calc(80% - 24px)',
        margin: 0,
        borderBottom: '0.5px solid  #f2f2f2',
        '&:focus': {
            borderColor: 'grey',
            boxShadow: '0 0 0 0.2rem grey',
        },
    },
    resize: {
        fontSize: 14,
        color: '#555555',
        fontFamily: 'montserratregular',
        '&::placeholder': {
            color: '#555555',
            fontFamily: 'montserratregular',
        }
    },
    textFieldFormLabel: {
        fontSize: 11,
        marginLeft: 37,
        marginTop: 5,
        fontFamily: 'montserratregular',
    },
    textFieldInput2: {
        height: '8%',
        backgroundColor: 'white',
        paddingLeft: 5,
        width: 'calc(80% - 24px)',
        margin: 0,
        borderBottom: '0.5px solid  #f2f2f2',
        '&:focus': {
            borderColor: 'grey',
            boxShadow: '0 0 0 0.2rem grey',
        },
    },
    buttonLogin: {
        width: 'calc(80% - 24px)',
        height: 50,
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: '#E18F68',
        color: 'white',
        fontSize: 12,
        fontFamily: 'montserratregular',
        marginBottom: '4%',
        '&:hover': {
            backgroundColor: '#b75628'
        }
    },
    extendedIcon: {
        marginRight: 8
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    margin: {
        margin: theme.spacing.unit,
        width: '100%',
        padding: '0px'
    },
    cssLabel: {
        '&$cssFocused': {
            border: '0px',
            color: '#A5A5A5',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            border: '0px',
            borderBottomColor: '#A5A5A5',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            border: '0px',
            borderColor: '#A5A5A5',
        },
    },
    notchedOutline: {
        border: '0px'
    },
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: '#fff',
        border: '0px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: 0,
        height: '30px',
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
            borderColor: '#A5A5A5',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
        backgroundColor: '#fff'
    },
});
const theme = createMuiTheme({
    palette: {
        primary: { main: '#A5A5A5' }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});



class ResetPasswordPage extends Component {
    // State of the class
    state = {
        password: '',
        openSuccess: false,
        showPassword: false,
        resendOpen: false,
        parameterEmpty: false,
        invalidOtp: false,
        successMsg: "",
        resendMsg: "OTP resent successfully! Please enter OTP",
        vertical: 'top',
        horizontal: 'center',
        password: '',
        confirmPassword: '',
        otpButton: false,
        passwordCheck: false,
        confirmPasswordCheck: false,
        sameCheck: false,
        parameterEmpty: false,
        open : false
    };

    //Component did mount to initiate the component while component loading
    componentDidMount() {
        const userId = this.props.match.params.id
        const userEmail = localStorage.getItem('userEmail')
    }

    // To handle the input password
    handlePassword = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // To submit the password
    handleSubmitPassword = () => {
        if (this.state.password === '' || this.state.confirmPassword === '') {
            this.setState({ parameterEmpty: true });
            this.setState({ confirmPasswordCheck: false });
            this.setState({ passwordCheck: false });
            this.setState({ sameCheck: false });
        }
        else if (this.state.password.length < 6) {
            this.setState({ passwordCheck: true });
            this.setState({ parameterEmpty: false });
            this.setState({ confirmPasswordCheck: false });
            this.setState({ sameCheck: false });
        }
        else if (this.state.confirmPassword.length < 6) {
            this.setState({ confirmPasswordCheck: true });
            this.setState({ passwordCheck: false });
            this.setState({ parameterEmpty: false });
            this.setState({ sameCheck: false });
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ confirmPasswordCheck: false });
            this.setState({ passwordCheck: false });
            this.setState({ sameCheck: true });
            this.setState({ parameterEmpty: false });
        }
        else {
            this.setState({otpButton : true});
            this.setState({ confirmPasswordCheck: false });
            this.setState({ passwordCheck: false });
            this.setState({ sameCheck: false });
            this.setState({ parameterEmpty: false });

            let requestedData = {
                votingElection_code: constants.votingElectionCode,
                user_email: this.props.match.params.email,
                user_password: this.state.password
            }
            items('POST', requestedData, constants.resetPasswordUser)
                .then(response => {
                    if (response.status === "Success") {
                        this.setState({successMsg : response.msg})
                        this.setState({ openSuccess: true });
                        setTimeout(() => {
                          this.setState({ openSuccess: false });
                          this.props.history.push('/UserLogin');
                        }, 3000);
                        this.setState({ otpButton: false });
                    }
                    else if (response.status === "Failure") {
                        this.setState({msg : response.msg})
                        this.setState({ open: true });
                        setTimeout(() => {
                          this.setState({ open: false });
                        }, 3000);
                        this.setState({ otpButton: false });
                    }
                    else {
                        this.setState({successMsg : response.msg})
                        this.setState({ openSuccess: true });
                        setTimeout(() => {
                          this.setState({ open: false });
                        }, 3000);
                        this.setState({ otpButton: false });
                    }
                });
        }
    }

    // Submit the password on key press
    onEnter = (e) => {
        if(e.key === 'Enter')
        {
          this.handleSubmitPassword();
        }
      }


    // Render the Html of class
    render() {
        const { classes, } = this.props;
        const { vertical, horizontal } = this.state;
        return (
            <div className="AppUserLogin">
                <UserSearchAppBar />
                <Container className="loginCont otpContainer" >
                    <Row className="formContainerLogin">
                        <Col xs="12" sm="8" md="8" lg="6" xl="6" className="formBoxLoginLogin lightBackgroundColor">
                            <div className="loginTextBox">
                                <p className="greyFontColor fontBold22">Reset Password</p>
                            </div>
                            <div className="validationContAdminLogin">
                                {this.state.passwordCheck === true ?
                                    <span className="fontRegular14 validationColor">{constants.msg.passwordLength}</span>
                                    : null}
                                {this.state.confirmPasswordCheck === true ?
                                    <span className="fontRegular14 validationColor">{constants.msg.passwordLength}</span>
                                    : null}
                                {this.state.sameCheck === true ?
                                    <span className="fontRegular14 validationColor">{constants.msg.samePasswordCheck}</span>
                                    : null}
                                {this.state.parameterEmpty === true ?
                                    <span className="fontRegular14 validationColor">{constants.msg.parameterEmpty}</span>
                                    : null}
                            </div>

                            <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                                <div>
                                    <MuiThemeProvider theme={theme}>
                                        <InputAdornment position="start">
                                            <Eye color='primary' className={classes.iconMargin} />
                                        </InputAdornment>
                                    </MuiThemeProvider>
                                </div>
                                <TextField
                                    className={classes.margin}
                                    type="text"
                                    name="password"
                                    onChange={this.handlePassword}
                                    onKeyPress={this.onEnter}
                                    InputLabelProps={{

                                        classes: {
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                            outlined: classes.resize
                                        },
                                    }}
                                    InputProps={{
                                        maxLength: 13,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            input: classes.resize,
                                            outlined: classes.resize
                                        },
                                    }}
                                    label="Password"
                                    variant="outlined"
                                    id="custom-css-outlined-input"
                                />
                            </div>
                            <div className="bg-white inputWidth1 ml-auto mr-auto d-flex pl-2 align-items-center">
                                <div>
                                    <MuiThemeProvider theme={theme}>
                                        <InputAdornment position="start">
                                            <Eye color='primary' className={classes.iconMargin} />
                                        </InputAdornment>
                                    </MuiThemeProvider>
                                </div>
                                <TextField
                                    className={classes.margin}
                                    type="text"
                                    name="confirmPassword"
                                    onKeyPress={this.onEnter}
                                    onChange={this.handlePassword}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                            outlined: classes.resize
                                        },
                                    }}
                                    InputProps={{
                                        maxLength: 13,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            input: classes.resize,
                                            outlined: classes.resize
                                        },
                                    }}
                                    label="Confirm Password"
                                    variant="outlined"
                                    id="custom-css-outlined-input"
                                />
                            </div>
                            <Button
                                variant="contained"
                                color="grey"
                                className={classes.buttonLogin}
                                onClick={this.handleSubmitPassword}
                                
                                disabled={this.state.otpButton ? true : null}
                            >
                                RESET PASSWORD
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <Snackbar1 open={this.state.openSuccess}
                    anchorOrigin={{ vertical, horizontal }}
                    message={this.state.successMsg}
                />
                <ErrorSnackBar open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                anchorOrigin={{ vertical, horizontal }}
                message={this.state.msg}
                />
                {/* <-------------Footer-starts-here--------------------------> */}
                <Footer/>
            </div>
        )
    }
}
export default withStyles(styles)(ResetPasswordPage);
