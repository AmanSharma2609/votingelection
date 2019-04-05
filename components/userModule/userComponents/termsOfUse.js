/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : termsOfUse.js
Purpose   : Terms of use
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';

class TermsOfUse extends Component {
  render() {
    const { classes, theme } = this.props;
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
        <div className="mt-4">
          <Container className="row_height marginTop60">
            <Row>
              <Col>
                <div className="col-12 mt-4">
                  <span className="fontBold26 greyFontColor pb-1 text-center">Terms Of Service</span>
                </div>
              </Col>
            </Row>
            <Container className="candidateGridContainer">
              <Row className="text-left">
                <div className="col-12 mt-4">
                  <span className="fontBold17 greyFontColor pb-1">Acceptance of Terms Of Use</span>
                </div>
                <div className="col-12 mt-4 textAlignJustify">
                  <span className="fontRegular14 greyFontColor pb-1">
                    These terms of use are entered into by and between You and Apna Neta (<b className="fontSemiBold14">&quot;Company&quot;</b>,
                    <b className="fontSemiBold14">&quot;we&quot;</b>; or <b className="fontSemiBold14">&quot;us&quot;</b>). The following terms and conditions, together with any documents they
                    expressly incorporate by reference (collectively, these <b className="fontSemiBold14">&quot;Terms of Use&quot;</b>), govern your
                    access to and use of www.apnaneta.com, including any content, functionality, and
                    services offered on or through <a href="http://devvec.apnaneta.com" target="_blank">www.apnaneta.com</a> (the <b className="fontSemiBold14">&quot;Website&quot;</b>), whether as a guest
                    or a registered user.
                    <br />
                    Please read the Terms of Use carefully before you start to use the Website. By using
                    the Website, you accept and agree to be bound and abide by these Terms of Use
                    and our Privacy Policy, found at <a href="http://devvec.apnaneta.com" target="_blank">www.apnaneta.com/privacyPolicy</a>, incorporated herein
                    by reference. If you do not want to agree to these Terms of Use or the Privacy Policy,
                    do not access or use the Website.
                    <br />
                    This Website is offered and available to users who are 18 years of age or older. By
                    using this Website, you represent and warrant that you are of legal age to form a
                    binding contract with the Company and meet all of the foregoing eligibility requirements.
                    If you do not meet all of these requirements, do not access or use the Website.
                </span>
                </div>
                <div className="col-12 mt-4">
                  <span className="fontBold17 greyFontColor pb-1">Changes to the Terms Of Use</span>
                </div>
                <div className="col-12 mt-4 textAlignJustify">
                  <span className="fontRegular14 greyFontColor pb-1">
                    We may revise and update these Terms of Use from time to time in our sole discretion.
                    All changes are effective immediately when we post them and apply to all access to and
                    use of the Website thereafter. However, any changes to the dispute resolution
                    provisions set forth in Governing Law and Jurisdiction will not apply to any disputes
                    about which the parties have actual notice prior to the date the change is posted on the
                    Website.  <br />
                    Your continued use of the Website following the posting of revised Terms of Use means
                    that you accept and agree to the changes. You are expected to check this page each
                    time you access this Website so you are aware of any changes, as they are binding on
                    you.
                </span>
                </div>
                <div className="col-12 mt-4">
                  <span className="fontBold17 greyFontColor pb-1">Accessing the Website and Account Security</span>
                </div>
                <div className="col-12 mt-4  textAlignJustify">
                  <span className="fontRegular14 greyFontColor pb-1">
                    We reserve the right to withdraw or amend this Website, and any service or material we
                        provide on the Website, in our sole discretion without notice. We will not be liable if for
                        any reason all or any part of the Website is unavailable at any time or for any period.
                        From time to time, we may restrict access to some parts of the Website, or the entire
                        Website, to users, including registered users.
                    <br />
                    You are responsible for:
                    <br />
                    <br />
                    <ul>
                      <li>
                        Making all arrangements necessary for you to have access to the Website.
                      </li>
                      <li>
                        Ensuring that all persons who access the Website through your internet connection
                        are aware of these Terms of Use and comply with them.
                      </li>
                    </ul>
                    To access the Website or some of the resources it offers, you may be asked to agree to
                    certain conditions or provide certain registration details or other information. It is a
                    condition of your use of the Website that all the information you provide on the Website
                    is correct, current and complete. You agree that all information you provide to register
                    with this Website or otherwise, including but not limited to through the use of any
                    interactive features on the Website, is governed by our Privacy Policy, and you consent
                    to all actions we take with respect to your information consistent with our <a href="http://devvec.apnaneta.com" target="_blank">Privacy Policy</a>Privacy Policy.
                    If you choose or are provided with, a username, password or any other piece of
                    information as part of our security procedures, you must treat such information as
                    confidential, and you must not disclose it to any other person or entity. You also
                    acknowledge that your account is personal to you and agree not to provide any other

                    person with access to this Website or portions of it using your username, password or
                    other security information. You agree to notify us immediately of any unauthorized
                    access to or use of your username or password or any other breach of security. You
                    also agree to ensure that you exit from your account at the end of each session. You
                    should use particular caution when accessing your account from a public or shared
                    computer so that others are not able to view or record your password or other personal
                    information. \n
                    We have the right to disable any username, password or other identifiers, whether
                    chosen by you or provided by us, at any time in our sole discretion for any or no reason,
                    including if, in our opinion, you have violated any provision of these Terms of Use.```
                </span>
                </div>
                <div className="col-12 mt-4  textAlignJustify">
                  <span className="fontBold17 greyFontColor pb-1">Intellectual Property Rights</span>
                </div>
                <div className="col-12 mt-4">
                  <span className="fontRegular14 greyFontColor pb-1">
                    The Website and its entire contents, features and functionality (including but not limited
                    to all information, software, text, displays, images, video and audio, and the design,
                    selection and arrangement thereof), are owned by the Company, its licensors or other
                    providers of such material and are protected by intellectual property or proprietary rights
                    laws. These Terms of Use permit you to use the Website for your personal,
                    non­commercial use only. You must not reproduce, distribute, modify, create derivative
                    works of, publicly display, publicly perform, republish, download, store or transmit any of
                    the material on our Website, except as follows:
                    <br />
                    <br />
                    <ul>
                      <li>
                        Your computer may temporarily store copies of such materials in RAM incidental to
                        your accessing and viewing those materials.
                      </li>
                      <li>
                        You may store files that are automatically cached by your Web browser for display
                        enhancement purposes.
                      </li>
                      <li>
                        You may print or download one copy of a reasonable number of pages of the Website
                        for your own personal, non-commercial use and not for further reproduction, publication
                        or distribution.
                      </li>
                      <li>
                        If we provide desktop, mobile or other applications for download, you may download a
                        single copy to your computer or mobile device solely for your own personal, non-
                        commercial use, provided you agree to be bound by our end user license agreement for
                        such applications.
                      </li>
                      <li>
                        If we provide social media features with certain content, you may take such actions as
                        are enabled by such features.
                      </li>
                      <li>
                        Modify copies of any materials from this site.
                      </li>
                      <li>
                        Use any illustrations, photographs, video or audio sequences or any graphics
                       separately from the accompanying text.
                      </li>
                      <li>
                        Delete or alter any copyright, trademark or other proprietary rights notices from copies
                        of materials from this site.
                      </li>
                    </ul>
                    You must not access or use for any commercial purposes any part of the Website or
                    any services or materials available through the Website.
                    <br />
                    If you wish to make any use of material on the Website other than that set out in this
                    section, please address your request to legal@apnaneta.com
                    <br />
                    If you print, copy, modify, download or otherwise use or provide any other person with
                    access to any part of the Website in breach of the Terms of Use, your right to use the
                    Website will cease immediately and you must, at our option, return or destroy any
                    copies of the materials you have made. No right, title or interest in or to the Website or
                    any content on the Website is transferred to you, and all rights not expressly granted
                    are reserved by the Company. Any use of the Website not expressly permitted by these
                    Terms of Use is a breach of these Terms of Use and may violate copyright, trademark
                    and other laws.
                </span>
                </div>
                <div className="col-12 mt-4  textAlignJustify">
                  <span className="fontBold17 greyFontColor pb-1">Trademarks</span>
                </div>
                <div className="col-12 mt-4">
                  <span className="fontRegular14 greyFontColor pb-1">
                    The Company name, the Company logo and all related names, logos, product and
                    service names, designs and slogans are trademarks of the Company or its affiliates or
                    licensors. You must not use such marks without the prior written permission of the
                    Company. All other names, logos, product and service names, designs and slogans on
                    this Website are the trademarks of their respective owners.
                </span>
                </div>
                <div className="col-12 mt-4">
                  <span className="fontBold17 greyFontColor pb-1">Prohibited Uses</span>
                </div>
                <div className="col-12 mt-4  textAlignJustify">
                  <span className="fontRegular14 greyFontColor pb-1">
                    You may use the Website only for lawful purposes and in accordance with these Terms
                    of Use. You agree not to use the Website:
                    <br />
                    <br />
                    <ul>
                      <li>
                        In any way that violates any applicable federal, state, local or international law or
                        regulation (including, without limitation, any laws regarding the export of data or
                        software to and from the US or other countries).
                    </li>
                      <li>
                        For the purpose of exploiting, harming or attempting to exploit or harm minors in any
                        way by exposing them to inappropriate content, asking for personally identifiable
                        information or otherwise.
                    </li>
                      <li>
                        To send, knowingly receive, upload, download, use or re-use any material which does
                        not comply with the Content Standards set out in these Terms of Use.
                    </li>
                      <li>
                        To transmit, or procure the sending of, any advertising or promotional material,
                        including any &quot;junk mail&quot;, &quot;chain letter&quot; or &quot;spam&quot; or any other similar solicitation.
                    </li>
                      <li>
                        For the purpose of exploiting, harming or attempting to exploit or harm minors in any
                        way by exposing them to inappropriate content, asking for personally identifiable
                        information or otherwise.
                    </li>
                      <li>
                        To impersonate or attempt to impersonate the Company, a Company employee,
                        another user or any other person or entity (including, without limitation, by using e-mail
                        addresses or screen names associated with any of the foregoing).
                    </li>
                      <li>
                        To engage in any other conduct that restricts or inhibits anyone&#39;s use or enjoyment of
                        the Website, or which, as determined by us, may harm the Company or users of the
                        Website or expose them to liability.
                    </li>
                    </ul>
                    Additionally, you agree not to:
                    <br />
                    <br />
                    <ul>
                      <li>
                        Use the Website in any manner that could disable, overburden, damage, or impair the
                        site or interfere with any other party&#39;s use of the Website, including their ability to
                        engage in real time activities through the Website.
                      </li>
                      <li>
                        Use any robot, spider or other automatic device, process or means to access the
                        Website for any purpose, including monitoring or copying any of the material on the
                        Website.
                      </li>
                      <li>
                        Use any manual process to monitor or copy any of the material on the Website or for
                        any other unauthorized purpose without our prior written consent.
                      </li>
                      <li>
                        Use any device, software or routine that interferes with the proper working of the
                       Website.
                      </li>
                      <li>
                        Introduce any viruses, trojan horses, worms, logic bombs or other material which is
                        malicious or technologically harmful.
                      </li>
                      <li>
                        Attempt to gain unauthorized access to, interfere with, damage or disrupt any parts of
                        the Website, the server on which the Website is stored, or any server, computer or
                        database connected to the Website.
                      </li>
                      <li>
                        Attack the Website via a denial-of-service attack or a distributed denial-of-service
                        attack.
                      </li>
                      <li>
                        Otherwise attempt to interfere with the proper working of the Website.
                    </li>
                    </ul>
                  </span>
                </div>
                <div className="col-12 mt-4">
                  <span className="fontBold17 greyFontColor pb-1">User Contributions</span>
                </div>
                <div className="col-12 mt-4 mb-4  textAlignJustify">
                  <span className="fontRegular14 greyFontColor pb-1">
                    The Website may contain message boards, chat rooms, personal web pages or profiles,
                    forums, bulletin boards, APIs and other interactive features (collectively, <b className="fontSemiBold14">&quot;Interactive
                    Services&quot;</b>) that allow users to post, submit, publish, display or transmit to other users or
                    other persons (hereinafter, <b className="fontSemiBold14">&quot;post&quot;</b>) content or materials (collectively, <b className="fontSemiBold14"> &quot;User
                    Contributions&quot;</b>) on or through the Website. <br />
                    All User Contributions must comply with the Content Standards set out in these Terms
                    of Use. Any User Contribution you post to the site will be considered non-confidential
                    and non-proprietary. By providing any User Contribution on the Website, you grant us
                    and our affiliates and service providers, and each of their and our respective licensees,
                    successors and assigns the right to use, reproduce, modify, perform, display, distribute
                    and otherwise disclose to third parties any such material for any purpose.
                    <br />
                    You represent and warrant that:
                    <br />
                    <br />
                    <ul>
                      <li>
                        You own or control all rights in and to the User Contributions and have the right to
                        grant the license granted above to us and our affiliates and service providers, and each
                        of their and our respective licensees, successors and assigns.
                      </li>
                      <li>
                        All of your User Contributions do and will comply with these Terms of Use.
                        You understand and acknowledge that you are responsible for any User Contributions
                        you submit or contribute, and you, not the Company, have full responsibility for such
                        content, including its legality, reliability, accuracy, and appropriateness.
                      </li>
                      <li>
                        We are not responsible, or liable to any third party, for the content or accuracy of any
                        User Contributions posted by you or any other user of the Website.
                      </li>
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



export default withStyles(TermsOfUse);
