import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
// import Select from "react-select";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Stack from "@mui/material/Stack";
import BookAppointment from "../../screens/doctorList/BookAppointment";
import DoctorDetails from "../../screens/doctorList/DoctorDetails";

import Paper from "@mui/material/Paper";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
      doctorId: null,
      selectedSpeciality: "",
      doctorList: null,
      speciality: null,
      timeSlot: null,
      doctorDetails: null,
      withoutLoginAppointment: false,
    };
    this.closeBookAppointmentModalHandler =
      this.closeBookAppointmentModalHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const url1 = "http://localhost:8080/doctors/";
    const url2 = "http://localhost:8080/doctors/speciality";
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const data1 = await response1.json();
    const data2 = await response2.json();
    this.setState({ doctorList: data1, speciality: data2 });
  }

  async fetchingDoctorsWithSpeciality(urlPassed) {
    const response3 = await fetch(urlPassed);
    const data3 = await response3.json();
    this.setState({ doctorList: data3 });
  }

  handleChange = (event) => {
    this.setState({ selectedSpeciality: event.target.value }, () => {
      const url3 = `http://localhost:8080/doctors/?speciality=${this.state.selectedSpeciality}`;
      this.fetchingDoctorsWithSpeciality(url3);
    });
  };

  handleWithoutLoginAppointmentClose = () => {
    this.setState({
      withoutLoginAppointment: false,
    });
  };

  openBookAppointmentModalHandler = (data1, data2) => {
    if (
      localStorage.getItem("access-token") !== null &&
      localStorage.getItem("access-token") !== undefined
    ) {
      this.setState(
        {
          bookAppointmentModalIsOpen: true,
          doctorName: data1,
          doctorId: data2,
        },
        () => {
          var date = new Date().toISOString().slice(0, 10);
          fetch(
            `http://localhost:8080/doctors/${this.state.doctorId}/timeSlots?date=${date}`
          )
            .then((response) => response.json())
            .then((data) => {
              this.setState({ timeSlot: data.timeSlot });
            });
        }
      );
    } else {
      this.setState({
        withoutLoginAppointment: true,
      });
    }
  };

  closeBookAppointmentModalHandler = () => {
    this.setState({ bookAppointmentModalIsOpen: false });
  };

  openDoctorDetailModalHandler = (data1, data2) => {
    this.setState(
      {
        doctorDetailModalIsOpen: true,
        doctorName: data1,
        doctorId: data2,
      },
      () => {
        fetch(`http://localhost:8080/doctors/${this.state.doctorId}`)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ doctorDetails: data });
            // console.log("Doctor Details=", data);
          });
      }
    );
  };

  closeDoctorDetailModalHandler = () => {
    this.setState({ doctorDetailModalIsOpen: false });
  };

  render() {
    return (
      <TabContainer>
        <div className="container">
          <div className="row">
            <div className="col-md-3" style={{ marginRight: "155px" }}>
              Select Speciality:
            </div>
            <div
              className="col-md-6"
              style={{
                width: "300px",
                margin: "auto",
              }}
            >
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={this.state.selectedSpeciality}
                  onChange={this.handleChange}
                  style={{ width: "300px" }}
                >
                  <MenuItem value="none">
                    <em style={{ opacity: "0" }}>None</em>
                  </MenuItem>
                  {this.state.speciality &&
                    this.state.speciality.map((i) => {
                      return <MenuItem value={i}>{i}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </div>

            {this.state.doctorList &&
              this.state.doctorList
                .filter(
                  (item) => item.speciality === this.state.selectedSpeciality
                )
                .map((i) => {
                  return (
                    <div key={i.doctorId}>
                      <div className="col-md-4" style={{ marginTop: "10px" }}>
                        <Paper
                          elevation={3}
                          style={{ width: "40%", margin: "auto" }}
                        >
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                              paddingTop: "1px",
                            }}
                          >
                            <h3 style={{ marginTop: "10px" }}>
                              Doctor Name : {i.firstName}
                            </h3>

                            <div>Speciality : {i.speciality}</div>
                            <div>
                              Rating :{" "}
                              <Rating
                                name="read-only"
                                value={i.rating}
                                readOnly
                              />
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
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openBookAppointmentModalHandler(
                                  i.firstName,
                                  i.id
                                )
                              }
                            >
                              BOOK APPOINTMENT
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openDoctorDetailModalHandler(i.firstName)
                              }
                            >
                              VIEW DETAILS
                            </Button>
                          </Stack>
                        </Paper>
                      </div>
                    </div>
                  );
                })}
            {this.state.doctorList &&
              this.state.doctorList
                .filter(
                  (item) =>
                    this.state.selectedSpeciality === "" ||
                    this.state.selectedSpeciality === "none"
                )
                .map((i) => {
                  return (
                    <div key={i.doctorId}>
                      <div className="col-md-4" style={{ marginTop: "10px" }}>
                        <Paper
                          elevation={3}
                          style={{ width: "40%", margin: "auto" }}
                        >
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                              paddingTop: "1px",
                            }}
                          >
                            <h3 style={{ marginTop: "10px" }}>
                              Doctor Name : {i.firstName}
                            </h3>

                            <div>Speciality : {i.speciality}</div>
                            <div>
                              Rating :
                              <Rating
                                name="read-only"
                                value={i.rating}
                                readOnly
                              />
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
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openBookAppointmentModalHandler(
                                  i.firstName,
                                  i.id
                                )
                              }
                            >
                              BOOK APPOINTMENT
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openDoctorDetailModalHandler(
                                  i.firstName,
                                  i.id
                                )
                              }
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
            dId={this.state.doctorId}
            timeslot={this.state.timeSlot}
          />

          <Dialog
            open={this.state.withoutLoginAppointment}
            onClose={this.handleWithoutLoginAppointmentClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"localhost:3000"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please login to book an appointment!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  width: "5vw",
                }}
                variant="contained"
                onClick={this.handleWithoutLoginAppointmentClose}
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>

          <DoctorDetails
            isOpen={this.state.doctorDetailModalIsOpen}
            handleClose={this.closeDoctorDetailModalHandler}
            dName={this.state.doctorName}
            dDetails={this.state.doctorDetails}
          />
        </div>
      </TabContainer>
    );
  }
}

export default DoctorList;
