/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : careersPage.js
Purpose   : career page
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';

class Careers extends Component {
  render() {
    return (
      <div className="candidateCardsParent">
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / Careers</p>
            </Col>
          </Row>
        </Container>
        <div className="UnderConstructionCont mt-4">
        <Container className="">
          <Container className="candidateGridContainer">
            <Row className="mt-4">
              <div className="col-12 marginTop60">
                <span className="fontBold26 greyFontColor pb-1">Careers</span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontBold17 greyFontColor pb-1">Explore a career @ ApnaNeta</span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontRegular14 greyFontColor pb-1">
                  It takes an entire team working together to build something big.
                  Which is why we are looking for talented people to join our team and help in reshaping the political structure of India by bridging the gap between people and politicians.
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontRegular14 greyFontColor pb-1">
                  ApnaNeta will give you a chance to do the kind of work that adds up to something meaningful. 
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontRegular14 greyFontColor pb-1">
                  Send us your resume or email us for job inquiries at &nbsp;
                  <a href="mailto:career@apnaneta.com" target="_top">
                    <u className="cursorPointer">career@apnaneta.com</u>.
                  </a>
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontBold14 greyFontColor pb-1">
                  <a href="" target="_blank">
                    <u>Come join us</u>!
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
export default withStyles(Careers);
