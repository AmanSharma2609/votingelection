/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : notFoundPage.js
Purpose   : If component is not found this page will displayed.
*/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import Logo from '../../../images/SVGs/Logo_Approved_02.svg';

class UnderConstruction extends Component {
  render() {
    return (
      <div className="notFoundContainer ComingSoonContainer d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col-12 text-center">
            <img src={Logo} alt='logo' width='200'/>
          </div>
          <div className="col-12 notFoundText text-center mt-5">
              <span>Oops! The page you are looking for could not be found.</span>
          </div>
          <div className="col-12 text-center mt-5">
            <NavLink to='/' className="notFoundText fontRegular16"><u>Go to Home</u></NavLink>
          </div>
        </div>
      </div>
    )
  }
}
export default withStyles(UnderConstruction);
