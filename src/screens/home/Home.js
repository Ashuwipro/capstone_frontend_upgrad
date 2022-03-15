import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import DoctorList from "../../screens/doctorList/DoctorList";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Stack from "@mui/material/Stack";
// import "bootstrap/dist/css/bootstrap.min.css";

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//creating Home component
class Home extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      loggedIn: true,
    };
  }

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Header baseUrl={this.props.baseUrl} />
        <Tabs
          className="tabs"
          value={this.state.value}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          onChange={this.tabChangeHandler}
        >
          <Tab label="DOCTORS" />
          <Tab label="APPOINTMENT" />
        </Tabs>

        {this.state.value === 0 && <DoctorList />}
        {this.state.value === 1 && this.state.loggedIn === false && (
          <TabContainer>
            <h4>Login to see appointments</h4>
          </TabContainer>
        )}
        {this.state.value === 1 && this.state.loggedIn === true && (
          <TabContainer>
            {n.map((i) => {
              return (
                <div>
                  <div className="col-md-4" style={{ marginTop: "10px" }}>
                    <Card style={{ width: "97vw", margin: "auto" }}>
                      <CardContent style={{ textAlign: "left" }}>
                        <h3>Dr: </h3>

                        <div>Date : </div>
                        <div>Symptoms :</div>
                        <div>priorMedicalHistory:</div>
                      </CardContent>
                      <CardActions>
                        <Stack
                          spacing={2}
                          direction="row"
                          style={{
                            marginLeft: "10px",
                            marginTop: "-10px",
                            paddingBottom: "10px",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                              width: "fit-content",
                              marginTop: "20px",
                            }}
                            variant="contained"
                          >
                            RATE APPOINTMENT
                          </Button>
                        </Stack>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              );
            })}
          </TabContainer>
        )}
      </div>
    );
  }
}

export default Home;
