/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : contactUsPage.js
Purpose   : Contact Details of firm
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';

class ContactUs extends Component {

  render() {
    return (
      <div className="candidateCardsParent">
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / Contact Us</p>
            </Col>
          </Row>
        </Container>
        <div className="UnderConstructionCont mt-4">
        <Container className="marginTop60">
          <Container className="candidateGridContainer">
            <Row className="text-left">
              <div className="col-12 mt-4">
                <span className="fontBold26 greyFontColor pb-1">Contact Us</span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontRegular14 greyFontColor pb-1">
                  Reach us at
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontRegular14 greyFontColor pb-1">
                  <a href="mailto:contact@apnaneta.com" target="_top">
                    <u className="cursorPointer">contact@apnaneta.com</u>.
                  </a>
                  <br/>
                  <a href="mailto:support@apnaneta.com" target="_top">
                    <u className="cursorPointer">support@apnaneta.com</u>.
                  </a>
                </span>
              </div>
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
export default withStyles(ContactUs);
