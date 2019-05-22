/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : privacyPolicyPage.js
Purpose   : Privacy policy of website.
*/

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import UserSearchAppBar from './userAppbar/userAppBar';
import Footer from './userFooter/footer.js';

class PrivacyPolicy extends Component {

	render() {
		const { classes, theme } = this.props;
		return (
			<div className="candidateCardsParent">
				<UserSearchAppBar />
				<Container fluid={true} className="">
					<Row className="">
						<Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
							<p className="mt-3 fontRegular12 greyFontColor"><NavLink className="breadCrumbs" to='/'>Home</NavLink> / Cookies & Privacy Policy</p>
						</Col>
					</Row>
				</Container>
				<div className="UnderConstructionCont mt-4">
					<Container className="marginTop60">
						<Container className="candidateGridContainer">
							<Row className="text-justify">
								<div className="col-12 mt-4 text-center">
									<span className="fontBold26 greyFontColor pb-1">Cookies & Privacy Policies</span>
								</div>
								<div className="col-12 mt-4">
									<span className="fontRegular12 greyFontColor pb-1">
										Apna Neta ("Company" or "We") respects your privacy and is committed to protecting it through our compliance with this policy.
										This policy describes the types of information we may collect from you or that you may provide when you visit the website .......... (our "Website") and our practices for collecting, using, maintaining, protecting and disclosing that information.  By submitting personal information through the site or Services, you agree to the terms of this Privacy Policy, and you expressly consent to the collection, use, and disclosure of your personal information in accordance with this Privacy Policy.
										As we update, improve and expand the Services, this policy may change, so please refer back to it periodically. By accessing the Company website or this Application or otherwise using the Services, you consent to collection, storage, and use of the personal information you provide (including any changes thereto as provided by you) for any of the services that we offer.
										The Company respects the privacy of the users of the Services and is committed to reasonably protect it in all respects. The information about the user as collected by the Company is: (a) information supplied by users and (b) information automatically tracked while navigation (c) information collected from any other source (collectively referred to as Information).
                					</span>
									<br />
									<span className="fontRegular12 greyFontColor pb-1">
										This policy applies to information we collect:
										<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li>On our Website.</li>
											<li>In email, text and other electronic messages between you, Apna Neta and other users of the Apna Neta platform.</li>
											<li>When you interact with our APIs and applications on our website or third-party websites and services if those applications or advertising include links to this policy.</li>
										</ul>
										It does not apply to information collected by:
										<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li>Us offline or through any other means, including on any other website operated by Company or any third party; or </li>
											<li>Any third party, including through any application or content (including advertising) that may link to or be accessible from or on the Website.</li>
										</ul>
										Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Website. By accessing or using this Website, you agree to this privacy policy. This policy may change from time to time (see Changes to Our Privacy Policy). Your continued use of this Website after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontBold14 greyFontColor pb-1">
										Information We Collect Through Automatic Data Collection Technologies
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontRegular12 greyFontColor pb-1">
										As you navigate through and interact with our Website, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions and patterns, including:
              						</span>
									<br />
									<span className="fontRegular12 greyFontColor pb-1">
										<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li>Details of your visits to our Website, including traffic data, location data, logs, and other communication data and the resources that you access and use on the Website.</li>
											<li>Information about your computer and internet connection, including your IP address, operating system, and browser type.</li>
										</ul>
									</span>
									<span className="fontRegular12 greyFontColor pb-1">
										We also may use these technologies to collect information about your online activities over time and across third-party websites or other online services (behavioral tracking).
										on we collect automatically may include personal information, and we may maintain it or associate it with personal information we collect in other ways or receive from third parties. Collecting usage information helps us to improve our Website and to deliver a better and more personalized service, including by enabling us to:
                						<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li>Estimate our audience size and usage patterns.</li>
											<li>Store information about your preferences, allowing us to customize our Website according to your individual interests.</li>
											<li>Speed up your searches.</li>
											<li>Recognize you when you return to our Website.</li>
										</ul>
										The technologies we use for this automatic data collection may include:
										<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li><span className="fontBold12 greyFontColor text-justify">Cookies (or browser cookies).</span> A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website.</li>
											<li><span className="fontBold12 greyFontColor text-justify">Flash Cookies.</span> Certain features of our Website may use locally stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from and on our Website. Flash cookies are not managed by the same browser settings as are used for browser cookies. For information about managing your privacy and security settings for Flash cookies, see Choices About How We Use and Disclose Your Information.</li>
											<li><span className="fontBold12 greyFontColor text-justify">Web Beacons.</span>Pages of our the Website and our e-mails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity).</li>
										</ul>
										We do not collect personal information automatically, but we may tie this information to personal information about you that we collect from other sources or that you provide to us.
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontBold14 greyFontColor pb-1">
										How We Use Your Information
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontRegular12 greyFontColor pb-1">
										We use information that we collect about you or that you provide to us, including any personal information:
	              						<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li>To present our Website and its contents to you.</li>
											<li>To provide you with information, products or services that you request from us.</li>
											<li>To fulfill any other purpose for which you provide it.</li>
											<li>To provide you with notices about your account/subscription, including expiration and renewal notices.</li>
											<li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including the Terms of Use and this Privacy Policy.</li>
											<li>To notify you about changes to our Website or any products or services we offer or provide through it.</li>
											<li>In any other way, we may describe when you provide the information.</li>
											<li>For any other purpose with your consent.</li>
										</ul>
										We may also use your information to contact you about things that may be of interest to you. If you do not want us to use your information in this way, please send an email to privacy@apnaneta.com.
										<br />
										We may use the information we have collected from you to enable us to display advertisements to our advertisers' target audiences. Even though we do not disclose your personal information for these purposes without your consent, if you click on or otherwise interact with an advertisement, the advertiser may assume that you meet its target criteria.
								</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontBold14 greyFontColor pb-1">
										Disclosure of Your Information
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontRegular12 greyFontColor pb-1">
										We may disclose aggregated information about our users, and information that does not identify any individual, without restriction.
										We may disclose personal information that we collect or you provide as described in this privacy policy:
										<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li>To our subsidiaries, affiliates, contractors, service providers and other third parties we use to support our business and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.</li>
											<li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution or other sale or transfer of some or all of Apna Neta’ assets, whether as a going concern or as part of bankruptcy, liquidation or similar proceeding, in which personal information held by us about our Website users is among the assets transferred.</li>
											<li>To third parties to market their products or services to you if you have not opted out of these disclosures. We contractually require these third parties to keep personal information confidential and use it only for the purposes for which we disclose it to them.</li>
											<li>To fulfill the purpose for which you provide it.</li>
											<li>For any other purpose disclosed by us when you provide the information with your consent.</li>
										</ul>
										We may also disclose your personal information:
										<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li>To comply with any court order, law or legal process, including to respond to any government or regulatory request.</li>
											<li>To enforce or apply the contracts between us including our terms of use and other agreements, including for billing and collection purposes, if applicable.</li>
											<li>If we believe disclosure is necessary or appropriate to protect the rights, property or safety of Po.et, our customers or others.</li>
										</ul>
									</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontBold14 greyFontColor pb-1">
										Choices About How We Use and Disclose Your Information
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontRegular12 greyFontColor pb-1">
										We strive to provide you with choices regarding the personal information you provide to us. We have created mechanisms to provide you with the following control over your information:
              							<ul className="fontRegular12 greyFontColor pb-1 text-justify">
											<li><span className="fontBold12 greyFontColor text-justify">Tracking Technologies and Advertising.</span>You can set your browser to refuse all or some browser cookies or to alert you when cookies are being sent. To learn how you can manage your Flash cookie settings, visit the Flash Player settings page on Adobe's website. If you disable or refuse cookies, please note that some parts of this site may then be inaccessible or not function properly.</li>
											<li><span className="fontBold12 greyFontColor text-justify">Disclosure of Your Information for Third-Party Advertising.</span>If you do not want us to share your personal information with unaffiliated or non-agent third parties for promotional purposes, you can opt-out by sending an email stating your request to privacy@apnaneta.com.</li>
											<li><span className="fontBold12 greyFontColor text-justify">Promotional Offers From the Company.</span>If you do not wish to have your email address/contact information used by the Company to promote our own or third parties' products or services, you can opt-out by sending us an email stating your request to privacy@apnaneta.com. If we have sent you a promotional email, you may send us a return email asking to be omitted from future email distributions. This opts out does not apply to information provided to the Company as a result of a product service experience or other transactions.</li>
											<li><span className="fontBold12 greyFontColor text-justify">Targeted Advertising.</span>If you do not want us to use information that we collect or that you provide to us to deliver advertisements according to our advertisers' target-audience preferences, you can opt-out by sending us an email stating your request to privacy@apnaneta.com.</li>
										</ul>
										We do not control third parties' collection or use of your information to serve interest-based advertising. However, these third parties may provide you with ways to choose not to have your information collected or used in this way.
              						</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontBold14 greyFontColor pb-1">
										Data Security
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontRegular12 greyFontColor pb-1">
										We have implemented measures, designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. Any payment transactions and transfers will be encrypted using SSL technology.
										<br />
										Where we have given you (or where you have chosen) a password for access to certain parts of our Website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
										<br />
										Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Website. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Website.
              						</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontBold14 greyFontColor pb-1">
										Changes to Our Privacy Policy
                					</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontRegular12 greyFontColor pb-1">
										It is our policy to post any changes we make to our privacy policy on this page with a notice that the privacy policy has been updated on the Website home page. If we make material changes to how we treat our users' personal information, we will notify you by email to the email address specified in your account and/or through a notice on the Website home page. The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our Website and this privacy policy to check for any changes.
              						</span>
								</div>
								<div className="col-12 mt-3 mb-1">
									<span className="fontBold14 greyFontColor pb-1">
										Contact Information
                					</span>
								</div>
								<div className="col-12 mt-3 mb-3">
									<span className="fontRegular12 greyFontColor pb-1">
										To ask questions or comment about this privacy policy and our privacy practices, contact us at:
              							<br />
										privacy@apnaneta.com
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



export default withStyles(PrivacyPolicy);
