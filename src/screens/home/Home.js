import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import DoctorList from "../../screens/doctorList/DoctorList";
import Appointment from "../../screens/appointment/Appointment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import "bootstrap/dist/css/bootstrap.min.css";

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

//creating Home component
class Home extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      loggedIn:
        localStorage.getItem("access-token") === null ||
        localStorage.getItem("access-token") === undefined
          ? false
          : true,
      appointmentList: null,
    };
  }

  loggedInStateChange = () => {
    this.setState(
      {
        loggedIn:
          localStorage.getItem("access-token") === null ||
          localStorage.getItem("access-token") === undefined
            ? false
            : true,
      },
      () => {
        if (this.state.loggedIn) {
          const opt = {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access-token"),
              "Content-Type": "application/json",
            },
          };
          fetch(
            `http://localhost:8080/users/${localStorage.getItem(
              "uuid"
            )}/appointments`,
            opt
          )
            .then((response) => response.json())
            .then((data) => this.setState({ appointmentList: data }));
        }
      }
    );
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Header
          baseUrl={this.props.baseUrl}
          stateChange={this.loggedInStateChange}
        />
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
          <Appointment list={this.state.appointmentList} />
        )}
      </div>
    );
  }
}

export default Home;
