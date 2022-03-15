import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Stack from "@mui/material/Stack";
import BookAppointment from "../../screens/doctorList/BookAppointment";
import DoctorDetails from "../../screens/doctorList/DoctorDetails";

import Paper from "@mui/material/Paper";

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

const Countries = [
  { label: "Albania", value: 355 },
  { label: "Argentina", value: 54 },
  { label: "Austria", value: 43 },
  { label: "Cocos Islands", value: 61 },
  { label: "Kuwait", value: 965 },
  { label: "Sweden", value: 46 },
  { label: "Venezuela", value: 58 },
];

const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class DoctorList extends Component {
  constructor() {
    super();
    this.state = {
      bookAppointmentModalIsOpen: false,
      doctorDetailModalIsOpen: false,
      doctorName: null,
    };
    this.closeBookAppointmentModalHandler =
      this.closeBookAppointmentModalHandler.bind(this);
  }

  openBookAppointmentModalHandler = (data) => {
    this.setState({ bookAppointmentModalIsOpen: true, doctorName: data });
  };

  closeBookAppointmentModalHandler = () => {
    this.setState({ bookAppointmentModalIsOpen: false });
  };

  openDoctorDetailModalHandler = (data) => {
    this.setState({ doctorDetailModalIsOpen: true, doctorName: data });
  };

  closeDoctorDetailModalHandler = () => {
    this.setState({ doctorDetailModalIsOpen: false });
  };

  render() {
    return (
      <TabContainer>
        <div className="container">
          <div className="row">
            <div className="col-md-3">Select Speciality:</div>
            <div
              className="col-md-6"
              style={{
                width: "300px",
                margin: "auto",
              }}
            >
              <Select options={Countries} />
            </div>

            {n.map((i) => {
              return (
                <div>
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
                        <h3 style={{ marginTop: "10px" }}>Doctor Name : </h3>

                        <div>Speciality : </div>
                        <div>
                          Rating :{" "}
                          <Rating name="read-only" value="5" readOnly />
                        </div>
                      </div>
                      <Stack
                        spacing={2}
                        direction="row"
                        style={{
                          marginLeft: "20px",
                          marginTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            width: "25vw",
                          }}
                          variant="contained"
                          onClick={() =>
                            this.openBookAppointmentModalHandler(i)
                          }
                        >
                          BOOK APPOINTMENT
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            width: "25vw",
                          }}
                          variant="contained"
                          onClick={() => this.openDoctorDetailModalHandler(i)}
                        >
                          VIEW DETAILS
                        </Button>
                      </Stack>
                    </Paper>
                  </div>
                </div>
              );
            })}
          </div>
          <BookAppointment
            isOpen={this.state.bookAppointmentModalIsOpen}
            handleClose={this.closeBookAppointmentModalHandler}
            dName={this.state.doctorName}
          />
          <DoctorDetails
            isOpen={this.state.doctorDetailModalIsOpen}
            handleClose={this.closeDoctorDetailModalHandler}
            dName={this.state.doctorName}
          />
        </div>
      </TabContainer>
    );
  }
}

export default DoctorList;
