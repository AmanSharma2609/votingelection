/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu.
File Name : details Added success
Purpose   : the success msg when the party is added from admin successfully.
*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Card, CardHeader, CardBody} from 'reactstrap';
import { withRouter } from 'react-router-dom'

import PrimarySearchAppBar from './appBar/appBar'
import Checked  from '../../images/checked.png'


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    buttonLogin: {
      width: '100%',
      textTransform: 'capitalize',
      fontFamily: 'montserratregular',
      fontSize: 14,
      height: '15%',
      marginTop: 0.1,
      boxShadow: 'none',
      borderRadius: 0,
      backgroundColor: '#E18F68',
      color: 'white',
      '&:hover':{
        backgroundColor: '#b75628'
       }

    }
})


class DetailsAddedSuccess extends Component {
  handlePartyList = () => {
    this.props.history.push('/AdminPoliticalParties')
  }
  handleAddAnother = () => {
    this.props.history.push('/AdminPoliticalParties/:AddParty')
  }
    render() {

      const { classes } = this.props;

        return (
            <div className="App userElection">
         <Container fluid={true} className="appbarAdmin"> 
        <PrimarySearchAppBar />
         </Container> 

        <Container fluid={true} className="">
          <Row className="">
            <Col className="homeArea" sm={12} xs={12} lg={12} md={12} xl={12} >
              <p className="mt-3 fontRegular12 greyFontColor headingPage">Home / Election List / Add Election</p>
            </Col>
          </Row>
        </Container>

        <Container className="partyAddedContainer mt-4">
          <Row className="tabRowAdmin marginTop60">
            <Col sm={12} xs={12} lg={10} md={12} xl={8} className="tabColAdmin">
               <Card className="tabContainerAdmin" >
                 <CardHeader className="headerAdminAdd fontColor darkBackground fontRegular16">PARTY ADDED</CardHeader>
                <CardBody className="tabContainerCardSuccess">
                <Container className="checkedCont">
                <Row className="checkedRow">
                <Col className="checkedCol" sm={12} xs={12} md={10} lg={10} xl={10}>
                <img src={Checked} alt="Checked" height="80" width="80">
                </img>
                </Col>
                </Row>
                </Container>
                <div className="fontMedium16 greyFontColor addedText">PARTY ADDED SUCCESSFULLY</div>
                <Container>
                <Row className="twoButtonRowParty mb-4 d-flex justify-content-center">
                <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonOneBasicCol">
                  <Button
                    variant="contained"
                    color="grey"
                    className={classes.buttonLogin}
                    onClick={this.handlePartyList}
                  >
                   GO TO LIST
                  </Button>
                </Col>
                <Col sm={12} xs={12} md={4} lg={4} xl={4} className="buttonBasicCol">
                  <Button
                    variant="contained"
                    className={classes.buttonLogin}
                    onClick={this.handleAddAnother}
                  >
                  ADD ANOTHER
                  </Button>
                </Col>
              </Row>
              </Container>
         
                  
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
    </div>
        )
    }
}
DetailsAddedSuccess = withRouter(DetailsAddedSuccess)
export default withStyles(styles)(DetailsAddedSuccess);
