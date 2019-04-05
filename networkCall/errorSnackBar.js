/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : errorSnackBar.js
Purpose   : Snackbar component to show a error message
*/

import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
const styles = {
  root: {
    background: '#ff0033',
    marginTop: 130,
    fontFamily: 'montserratregular',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  bodyStyle: {
    textAlign: 'center',
  }
}
class ErrorSnackBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={this.props.anchorOrigin}
        open={this.props.open}
        bodyStyle={classes.bodyStyle}
        TransitionComponent={Zoom}
        className={classes.text}
        autoHideDuration={4000}
      >
        <SnackbarContent
          message={this.props.message}
          classes={{
            root: classes.root
          }}
        >
        </SnackbarContent>
      </Snackbar>
    )
  }
}
export default withStyles(styles)(ErrorSnackBar);
