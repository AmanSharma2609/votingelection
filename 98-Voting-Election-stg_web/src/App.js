/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : App.js
Purpose   : App js file to store route component and routes.
*/

import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter, MemoryRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faHandPaper,
  faCoffee,
  faFlag,
  faMapMarkedAlt,
  faHandRock,
  faUsers,
  faPowerOff,
  faMale,
  faFemale,
}
  from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { constants } from '../src/networkCall/constant';
import './App.css'
import LoginPage from '../src/components/adminModule/loginPage'
import AdminOtp from '../src/components/adminModule/adminOtp'
import AdminProfile from '../src/components/adminModule/adminProfile';
import ForgotPasswordPage from '../src/components/adminModule/forgotPasswordAdmin'
import ResetPasswordPage from '../src/components/adminModule/resetPasswordPage'
import PrimarySearchAppBar from '../src/components/adminModule/appBar/appBar'
import HomePage from '../src/components/adminModule/homePage'
import CandidatePage from '../src/components/adminModule/candidatePage'
import UpdateCandidateAdmin from '../src/components/adminModule/UpdateAdminCandidate'
import UserSignupPage from '../src/components/userModule/userComponents/userSignup'
import UserProfile from '../src/components/userModule/userComponents/userProfile'
import EditUserProfile from '../src/components/userModule/userComponents/editUserProfile'
import AddUserInfo from '../src/components/userModule/userComponents/addUserInfo'
import UserHomePage from '../src/components/userModule/userComponents/userHomePage'
import UserOtpPage from '../src/components/userModule/userComponents/userOtp'
import UserCandidatePage from '../src/components/userModule/userComponents/userCandidatePage'
import UserCandidateProfile from '../src/components/userModule/userComponents/userCandidateProfilePage'
import PoliticalParties from '../src/components/userModule/userComponents/politicalParties'
import PoliticalPartyProfile from '../src/components/userModule/userComponents/politicalPartyProfile'
import UserElectionPage from '../src/components/userModule/userComponents/userElectionPage'
import AdminElectionPage from '../src/components/adminModule/adminElectionPage'
import AdminUsersList from '../src/components/adminModule/adminUsersList'
import userConstituencyPage from '../src/components/userModule/userComponents/userConstituency'
import AddCandidateAdmin from '../src/components/adminModule/addCandidateAdmin'
import AdminPoliticalParties from '../src/components/adminModule/adminPoliticalParties'
import AddParty from '../src/components/adminModule/addParty'
import AddPost from '../src/components/adminModule/addPost'
import DetailsAddedSuccess from '../src/components/adminModule/detailsAddedSuccess'
import UpdateSuccessDetailParty from '../src/components/adminModule/updateSuccessDetailParty'
import AdminCandidateProfile from '../src/components/adminModule/adminCandidateProfile'
import AdminPoliticalProfile from '../src/components/adminModule/adminPoliticalProfile';
import UpdateAdminParty from '../src/components/adminModule/updateAdminParty';
import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';
import StateconstituencyPageAdmin from '../src/components/adminModule/constituency';
import ConstituencyDistrict from '../src/components/adminModule/constituencyDistrict'
import ConstituencyPage from '../src/components/adminModule/constituencies'
import SuccessCandidate from '../src/components/adminModule/successCandidate';
import UserForgotPage from '../src/components/userModule/userComponents/userForgotPassword';
import ComingSoon from '../src/components/ComingSoon/comingSoonPage'
import updateAdminProfile from '../src/components/adminModule/updateAdminProfile'
import userLogin from '../src/components/userModule/userComponents/userLogin';
import UserSearchResultPage from '../src/components/userModule/userComponents/userSearchResultPage';
import AdminSearchResultPage from '../src/components/adminModule/adminSearchResultPage';
import UserDashboard from '../src/components/userModule/userComponents/userDashboard';
import ResetPasswordUser from '../src/components/userModule/userComponents/resetPassword';
import UnderConstruction from '../src/components/userModule/userComponents/underConstructionPage';
import UserConstituencyDetails from '../src/components/userModule/userComponents/userConstituencyDetails';
import AddElection from '../src/components/adminModule/addElection';
import SuccessElection from '../src/components/adminModule/successElection'
import AboutUs from '../src/components/userModule/userComponents/aboutUsPage';
import Careers from '../src/components/userModule/userComponents/careersPage';
import TermsOfUse from '../src/components/userModule/userComponents/termsOfUse';
import PrivacyPolicy from '../src/components/userModule/userComponents/privacyPolicyPage';
import ContactUs from '../src/components/userModule/userComponents/contactUsPage';
import NotFound from '../src/components/userModule/userComponents/notFoundPage';

library.add(faCheckSquare, faCoffee, faHandPaper, faFlag, faMapMarkedAlt, faHandRock,
  faUsers, faPowerOff, faFemale, faMale)

// function to fetch the access Token
const accessToken = () => {
  global.value = localStorage.getItem('accessToken');
  return global.value;
}

// function to fetch the User type
const userType = () => {
  global.userType = localStorage.getItem('userType')
  return global.userType
}

// <------------------admin-session-management------------>
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(...props) => (
    accessToken() && userType() === 'admin' ? <Component {...props} /> :
      <Redirect to='/AdminLogin' />
  )} />
)

// Guard for admin dashboard
const PrivateLogin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(...props) => (
    userType() === 'admin' && accessToken() ? <Redirect to="/AdminHomePage" /> : <Component {...props} />
  )} />
)

// <---------------user-session-management------------------->
const UserPrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(...props) => (
    userType() === 'user' && accessToken() ? <Redirect to='/' /> : <Component {...props} />
  )} />
)

// Guard for user dashboard
const UserRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(...props) => (
    accessToken() && userType() === 'user' ? <Component {...props} /> : <Redirect to='/' />
  )} />
)

const userCheck = () => {
  const userCheckType = constants.checkUserValidity
  return userCheckType
}

class App extends Component {
  state = {
    vertical: 'top',
    horizontal: 'center',
    resendOpen: false,
    resendMsg: ''
  };

  componentDidUpdate() {
    accessToken()
    userType()
    userCheck()
  }

  componentDidMount() {
    accessToken()
    userType()
    userCheck()
  }

  render() {
    return (
      <div className="outerContainer">
        <BrowserRouter>
          <Switch>

            {/* User Route Detail */}

            <Route exact path='/' component={UserHomePage} />
            <Route exact path='/UserHomePage' component={UserHomePage} />
            <UserPrivateRoute exact path='/UserSignup' component={UserSignupPage} />
            <Route exact path='/UserOtp/:id/:status/:page/:email' component={UserOtpPage} />
            <UserRoute exact path='/EditUserProfile' component={EditUserProfile} />
            <UserRoute exact path='/UserProfile' component={UserProfile} />
            <UserRoute exact path='/AddInfo/:token' component={AddUserInfo} />
            <Route exact path='/Candidate' component={UserCandidatePage} />
            <Route exact path='/ResetPasswordPage/:email' component={ResetPasswordUser} />
            <Route exact path={`/Candidate/Candidate-Profile/`} component={UserCandidateProfile} />
            <Route exact path='/Political-Parties' component={PoliticalParties} />
            <Route exact path={'/Political-Parties/Political-Parties-Profile/'} component={PoliticalPartyProfile} />
            <Route exact path={`/UserStateConstituency`} component={StateconstituencyPageAdmin} />
            <Route exact path={`/UserConstituencyPageDistrict/:status/:state_name/:state_id`} component={ConstituencyDistrict} />
            <Route exact path={`/UserConstituencyPage/:status/:state_name/:state_id`} component={ConstituencyPage} />
            <Route exact path={`/UserConstituencyDetails/:type/:id/:name/:consId/:consDesc`} component={UserConstituencyDetails} />
            <Route exact path={`/AdminConstituencyDetails/:type/:id/:name/:consId/:consDesc`} component={UserConstituencyDetails} />
            <Route exact path={`/underConstruction`} component={UnderConstruction} />
            <Route exact path={`/aboutUs`} component={AboutUs} />
            <Route exact path={`/careers`} component={Careers} />
            <Route exact path={`/termsOfService`} component={TermsOfUse} />
            <Route exact path={`/privacyPolicy`} component={PrivacyPolicy} />
            <Route exact path={`/contactUs`} component={ContactUs} />
            <PrivateLogin exact path='/AdminLogin' component={LoginPage} />

            {/* Admin route detail */}

            <Route exact path='/AdminAppBar' component={PrimarySearchAppBar} />
            <PrivateRoute exact path='/AddCandidate' component={AddCandidateAdmin} />
            <PrivateRoute exact path='/AdminCandidate' component={CandidatePage} />
            <PrivateRoute exact path='/SuccessAdd' component={DetailsAddedSuccess} />
            <PrivateRoute exact path='/SuccessUpdate' component={UpdateSuccessDetailParty} />
            <PrivateRoute exact path={`/AdminCandidate/:/:/AdminCandidateProfile/:name/:id`} component={AdminCandidateProfile} />
            <PrivateRoute exact path={`/AdminPoliticalParties/:/:/AdminPoliticalProfile/:name/:id`} component={AdminPoliticalProfile} />
            <Route exact path='/Election-List' component={UserElectionPage} />
            <Route exact path='/UserElectionDetail/:id/:type/:name' component={userConstituencyPage} />
            <Route exact path='/searchResult' component={UserSearchResultPage} />
            <UserPrivateRoute exact path='/UserLogin' component={userLogin} />
            <Route exact path='/UserForgotPassword' component={UserForgotPage} />
            <UserRoute exact path='/dashboard' component={UserDashboard} />
            <Route exact path='/PasswordAdmin' component={ForgotPasswordPage} />
            <Route exact path='/AdminOtp' component={AdminOtp} />
            <Route exact path='/coming-soon' component={ComingSoon} />
            <Route exact path='/ResetPasswordAdmin' component={ResetPasswordPage} />
            <PrivateRoute exact path='/AdminProfile' component={AdminProfile} />
            <PrivateRoute exact path='/AdminUpdateProfile' component={updateAdminProfile} />
            <PrivateRoute exact path='/searchResultAdmin/:name' component={AdminSearchResultPage} />
            <PrivateRoute exact path='/AdminUpdateCandidate' component={UpdateCandidateAdmin} />
            <PrivateRoute exact path='/CandidateAdded' component={SuccessCandidate} />
            <PrivateRoute exact path='/AdminElectionList' component={AdminElectionPage} />
            <PrivateRoute exact path='/AdminUsersList' component={AdminUsersList} />
            <PrivateRoute exact path='/AddPost/:type/:id/:name' component={AddPost} />
            <PrivateRoute exact path='/AdminHomePage' component={HomePage} />
            <PrivateRoute exact path={`/AdminPoliticalParties/:AddParty`} component={AddParty} />
            <PrivateRoute exact path={`/AdminPoliticalParties//UpdateParty`} component={UpdateAdminParty} />
            <PrivateRoute exact path={`/AdminStateConstituency`} component={StateconstituencyPageAdmin} />
            <PrivateRoute exact path={`/AdminConstituencyPageDistrict/:status/:state_name/:state_id`} component={ConstituencyDistrict} />
            <PrivateRoute exact path={`/ConstituencyPage/:status/:state_name/:state_id`} component={ConstituencyPage} />
            <PrivateRoute exact path='/AdminPoliticalParties' component={AdminPoliticalParties} />
            <Route exact path='/AdminElectionDetail/:id/:type/:name' component={userConstituencyPage} />
            <PrivateRoute exact path='/AddElection' component={AddElection} />
            <PrivateRoute exact path='/ElectionAdded' component={SuccessElection} />
            <Route exact path='/notFound' component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
