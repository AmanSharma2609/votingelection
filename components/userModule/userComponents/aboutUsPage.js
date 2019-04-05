/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : aboutUsPage.js
Purpose   : firm detail page
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import UserSearchAppBar from './userAppbar/userAppBar';
import AboutUsCover from '../../../images/aboutus_banner.jpg';
import Footer from './userFooter/footer.js';

class AboutUs extends Component {

  render() {
    return (
      <div className="candidateCardsParent">
        <UserSearchAppBar />
        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / About us</p>
            </Col>
          </Row>
        </Container>
        <div className="UnderConstructionCont mt-4">
        <Container className="row_height marginTop60">
          <Container className="candidateGridContainer">
            <Row className="">
              <div className="col-12 mt-4">
                <span className="fontBold26 greyFontColor pb-1">About us</span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontBold17 greyFontColor pb-1">Empowering people to shape the political structure of India.</span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontRegular14 greyFontColor pb-1">
                  In the largest democratic nation of the world, ApnaNeta will empower people with correct political information and connecting them with their
                  representatives so that political parties cannot misguide, misinform and mislead their voters.
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontRegular14 greyFontColor pb-1">
                  ApnaNeta is a platform for people to connect, collaborate and criticize those who govern them and those who wish to replace them so that
                  political information is not getting manipulated for their personal interests. Since public opinion is the essence of democracy, ApnaNeta will
                  catalyze shaping of the Indian Political System by making a bridge between people’s expectations and their political representatives.
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontBold17 greyFontColor pb-1">
                  ApnaNeta focuses on bringing citizens of India together so as to defend, protect and justify
                </span>
              </div>
              <div className="col-12 mt-4 mb-1">
                <div className="aboutUsBanner">
                  <img src={AboutUsCover} className="img-fluid aboutUsBannerImage"/>
                </div>
              </div>
              <div className="col-12 mt-4">
                <span className="fontBold26 greyFontColor pb-1">Mission</span>
              </div>
              <div className="col-12 mt-3 mb-1">
                <span className="fontRegular14 greyFontColor pb-1">
                  In the largest democratic nation of the world, our mission is to provide people with correct and unprejudiced political information so as to bring transparency in the Indian Political System.
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontBold26 greyFontColor pb-1">Vision</span>
              </div>
              <div className="col-12 mt-3 mb-1">
                <span className="fontRegular14 greyFontColor pb-1">
                  Apna Neta’s vision is to shape the Indian Democratic Society by empowering people with impartial political knowledge so that they can righteously choose their leader.
                </span>
              </div>
              <div className="col-12 mt-4">
                <span className="fontBold26 greyFontColor pb-1">Values</span>
              </div>
              <div className="col-12 mt-3">
                <span className="fontRegular14 greyFontColor pb-1">
                  We thrive for becoming people’s voice through -
                </span>
              </div>
              <div className="col-12 mt-3">
                <span className="d-flex justify-content-center">
                  <ul className="fontRegular14 greyFontColor pb-1 text-left">
                    <li>Integrity</li>
                    <li>Impartiality</li>
                    <li>Veracity</li>
                    <li>Political Awareness</li>
                  </ul>
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



export default withStyles(AboutUs);
