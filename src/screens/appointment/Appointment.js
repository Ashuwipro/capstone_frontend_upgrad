import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Stack from "@mui/material/Stack";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import RateAppointment from "../appointment/RateAppointment";

import Paper from "@mui/material/Paper";

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Appointment extends Component {
  constructor() {
    super();
    this.state = {
      rateAppointmentModalIsOpen: false,
      doctorName: null,
      list: null,
    };
  }

  openRateAppointmentModalHandler = (data) => {
    this.setState({
      rateAppointmentModalIsOpen: true,
      doctorName: data,
      list: data,
    });
  };

  closeRateAppointmentModalHandler = () => {
    this.setState({ rateAppointmentModalIsOpen: false });
  };

  render() {
    return (
      <TabContainer>
        {this.props.list &&
          this.props.list.map((i) => {
            return (
              <div key={i.appointmentId}>
                <div className="col-md-4" style={{ marginTop: "10px" }}>
                  <Paper
                    elevation={3}
                    style={{ width: "800px", margin: "auto" }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                        marginLeft: "10px",
                        paddingTop: "1px",
                      }}
                    >
                      <h3 style={{ marginTop: "10px" }}>
                        Doctor Name : {i.appointmentId}
                      </h3>

                      <div>Speciality : </div>
                      <div>
                        Rating : <Rating name="read-only" value="5" readOnly />
                      </div>
                    </div>
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
                        onClick={() => this.openRateAppointmentModalHandler(i)}
                      >
                        RATE APPOINTMENT
                      </Button>
                    </Stack>
                  </Paper>
                </div>
              </div>
            );
          })}
        <RateAppointment
          isOpen={this.state.rateAppointmentModalIsOpen}
          handleClose={this.closeRateAppointmentModalHandler}
          details={this.state.list}
        />
      </TabContainer>
    );
  }
}

export default Appointment;
