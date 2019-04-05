/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : snackBar.js
Purpose   : Snackbar component to show a success message
*/

import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
const styles = {
  root: {
    background: '#4BB543',
    marginTop: 130,
    fontFamily: 'montserratregular'
  },
  root1: {
    background: '#4BB543',

  },
  bodyStyle: {
    background: '#4BB543',
  },
  myCustomBackground: {
    background: '#4BB543',
  }
}
class Snackbar1 extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={this.props.anchorOrigin}
        open={this.props.open}
        bodyStyle={classes.bodyStyle}
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
export default withStyles(styles)(Snackbar1);
