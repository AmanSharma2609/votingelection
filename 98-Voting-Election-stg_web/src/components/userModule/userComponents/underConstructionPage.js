/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : underConstructionPage.js
Purpose   : Under Construction Page view
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textFieldInput1: {
    border: '1px solid grey',
    backgroundColor: '#FBFBFB',
    fontSize: 8,
    padding: '10px 12px',
    height: 30,
    lineHeight: 'normal',
    width: 'calc(60% - 10px)',
  },
  circularLoader: {
    color: '#E18F68',
    zIndex: 1
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderColor: 'grey',
      boxShadow: '0 0 0 0.2rem grey',
    },
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  bootstrapTooltip: {
    backgroundColor: theme.palette.common.black,
    fontFamily: 'montserratregular',
  },
});

class UnderConstruction extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <div className="candidateCardsParent">
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink></p>
            </Col>
          </Row>
        </Container>
        <div className="ComingSoonContainer UnderConstructionCont mt-5">
        <Container fluid={true} className="row_height">
          <Container fluid={true} className="candidateGridContainer ComingSoonContainer ">
            <Row className="">
              <Col className="">
                  <div className="d-flex justify-content-center align-items-center mt-5 comingSoonText">
                      Under Construction
                  </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
        {/* <-------------Footer-starts-here--------------------------> */}
        <Footer />
      </div>
    )
  }
}



export default withStyles(styles)(UnderConstruction);
