import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Logo from '../../images/web-logo.png';
import { Image } from 'react-bootstrap';

import { Switch, Route, HashRouter, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'




const styles = theme => ({

})




class ComingSoon extends Component {

    state = {
        title: '',
        body: '',
        new: '',
        educationData: [],
        eduData: []
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="ComingSoonContainer lightBackgroundColor">
                <Container fluid={true}>
                    <Row className="">
                        <Col>
                            <div className="comingSoonPage">
                                <Row className="">
                                    <Col className="mt-3">
                                        <div className="d-flex justify-content-center mt-5">
                                            <Image
                                                src={Logo}
                                                rounded
                                                style={{ height: 80, width: 220 }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col className="">
                                        <div className="d-flex justify-content-center align-items-center mt-5 comingSoonText">
                                            COMING SOON!
                                        </div>
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

export default withStyles(styles)(ComingSoon);
