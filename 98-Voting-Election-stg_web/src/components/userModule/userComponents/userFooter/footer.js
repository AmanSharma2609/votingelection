/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : footer.js
Purpose   : footer
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import facebook from '../../../../images/SVGs/facebook_footer.svg';
import linkedin from '../../../../images/SVGs/linkedin_footer.svg';
import twitter from '../../../../images/SVGs/twitter_footer.svg';
import instagram from '../../../../images/SVGs/insta_footer.svg';

class Footer extends Component {
    render() {
        return (
            <div>
            {this.props.match.path === '/' || this.props.match.path === '/aboutUs' || this.props.match.path === '/careers' ||  this.props.match.path === '/contactUs'?
            <div className="footerContainer">
                <Row className="innerFooter">
                    <Col xs="12" sm="12" md="12" lg="8" xl="8" className="TextCol">
                        <Row className="TextRow">
                            <Col xs="4" sm="3" md="3" lg="3" xl="3" className="aboutUsCol">
                                <div className="footerTxtContLogin">
                                <NavLink to={{
                                    pathname: '/Candidate',
                                  }}
                                   className="text-white"><p className="footerSmallTextTop text-center">Candidate</p></NavLink>
                                    <p className="footerSmallText fontColor text-center">
                                        <NavLink to={{
                                            pathname: '/Candidate',
                                            
                                          
                                          }} className="text-white">
                                            View All Candidates
                                        </NavLink>
                                        <br />
                                        <NavLink to={{
                                            pathname: '/Candidate',
                                            search: '?sort=top',
                                          
                                          }} className="text-white">
                                            Most Upvoted
                                        </NavLink>
                                    </p>
                                </div>
                            </Col>
                            <Col xs="4" sm="3" md="3" lg="3" xl="3" className="aboutUsCol">
                                <div className="footerTxtContLogin">
                                    <NavLink to='/Political-Parties' className="text-white"><p className="footerSmallTextTop text-center">Parties</p></NavLink>
                                    <p className="footerSmallText fontColor text-center">
                                        <NavLink to={{
                                            pathname: '/Political-Parties',
                                          }} className="text-white">
                                            View All Parties
                                        </NavLink>
                                        <br />
                                        <NavLink to={{
                                            pathname: '/Political-Parties',
                                            search: '?sort=top'
                                          }} className="text-white">
                                            Most Upvoted
                                        </NavLink>
                                        <br />
                                        <NavLink to={{
                                            pathname: '/Political-Parties',
                                            search: '?sort=national'
                                          
                                          }} className="text-white">
                                            National Parties
                                        </NavLink>
                                    </p>
                                </div>
                            </Col>
                            <Col xs="4" sm="3" md="3" lg="3" xl="3" className="aboutUsCol">
                                <div className="footerTxtContLogin">
                                <NavLink to='/Election-List/All' className="text-white"><p className="footerSmallTextTop text-center">Election</p></NavLink>
                                    
                                    <p className="footerSmallText fontColor text-center">
                                        <NavLink to={{
                                            pathname:'/Election-List',
                                            search: '?sort=completed'
                                        }}
                                         className="text-white">
                                            Completed Election
                                        </NavLink>
                                        <br />
                                        <NavLink to={{
                                            pathname:'/Election-List',
                                            search: '?sort=running'
                                        }} className="text-white">
                                            Running Election
                                        </NavLink>
                                        <br />
                                        <NavLink to={{
                                            pathname:'/Election-List',
                                            search: '?sort=upcoming'
                                        }} className="text-white">
                                            Upcoming Election
                                        </NavLink>
                                    </p>
                                </div>
                            </Col>
                            <Col xs="4" sm="3" md="3" lg="3" xl="3" className="aboutUsCol">
                                <div className="footerTxtContLogin">
                                <NavLink to='/aboutUs' className="text-white"><p className="footerSmallTextTop text-center">About Us</p></NavLink>
                                    <p className="footerSmallText fontColor text-center">
                                        <a href="https://apnaneta.blog" target="blank" className="text-white">Blog</a>
                                         <br />
                                        <NavLink to='/careers' className="text-white">Careers</NavLink>
                                         <br />
                                        <NavLink to='/contactUs' className="text-white">Contact Us</NavLink>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="3" xl="3" className="ml-auto">
                        <Row className="">
                        <Col xs="12" sm="12" md="12" lg="10" xl="10" className="text-white">
                            <div className="text-white fontSemiBold14">
                                Follow Us
                            </div>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="10" xl="10" className="d-flex justify-content-center ml-2">
                            <div className="form-inline mb-2 mt-1">
                                <a href="https://www.facebook.com/apnanetaapp/" target="blank">
                                    <img src={facebook} className="footerIconImg"/>
                                </a>
                                <a href="https://www.instagram.com/apnaneta/" target="blank">
                                    <img src={instagram} className="footerIconImg"/>
                                </a>
                                <a href="https://twitter.com/apna_neta" target="blank">
                                    <img src={twitter} className="footerIconImg"/>
                                </a>
                                <a href="https://www.linkedin.com/company/apnanetaapp/" target="blank">
                                 <img src={linkedin} className="footerIconImg"/>
                                </a>
                            </div>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            : null}
                <Container fluid={true} className="lastFooterContent">
                    <Row className="lastRow">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12" className="lastCol text-center">
                            <span className="fontRegular12 lastText">
                                Copyright © {new Date().getFullYear()} by Team Apna Neta |
                                <NavLink to='/privacyPolicy' className="text-white"> Cookies & Privacy Policy</NavLink> |
                                <NavLink to='/termsOfService' className="text-white"> Terms Of Service</NavLink>
                            </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
Footer = withRouter(Footer)
export default withStyles(Footer);
