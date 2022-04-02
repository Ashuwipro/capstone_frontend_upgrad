import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import DoctorList from "../../screens/doctorList/DoctorList";
import Appointment from "../../screens/appointment/Appointment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContainer from "../../common/tabContainer/TabContainer";
import { fetchAppointmentsForAppointmentTab } from "../../util/fetch";
import "../../common/common.css";

// const TabContainer = function (props) {
//   return (
//     <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
//       {props.children}
//     </Typography>
//   );
// };

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

  async componentDidMount() {
    if (this.state.loggedIn) {
      const data = await fetchAppointmentsForAppointmentTab();
      this.setState({ appointmentList: data });
    }
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
      async () => {
        if (this.state.loggedIn) {
          const data = await fetchAppointmentsForAppointmentTab();
          this.setState({ appointmentList: data });
        }
      }
    );
  };

  tabChangeHandler = async (event, value) => {
    this.setState({ value });
    const data = await fetchAppointmentsForAppointmentTab();
    this.setState({ appointmentList: data });
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
