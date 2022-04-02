import React, { Component } from "react";
import Modal from "react-modal";
import FormControl from "@mui/material/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@mui/material/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import {
  fetchHandleDateChangeFetchingTimeSlots,
  fetchBookAppointmentClickHandler,
  fetchBookingAppointmenWithDetails,
} from "../../util/fetch";
import TabContainer from "../../common/tabContainer/TabContainer";

import "../../common/common.css";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // width: "600px",
    // height: "560px",
    width: "50%",
    height: "90%",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
};

class BookAppointment extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(),
      selectedTimeSlot: "",
      timeSlot: null,
      priormedicalhistory: null,
      symptoms: null,
      isValidTimeSlot: "dispNone",
      bookedAppointment: "dispNone",
      openSlotUnavailable: false,
    };
  }

  priorMedicalHistoryChangeHandler = (e) => {
    this.setState({
      priormedicalhistory: e.target.value,
      bookedAppointment: "dispNone",
    });
  };

  symptomsChangeHandler = (e) => {
    this.setState({
      symptoms: e.target.value,
      bookedAppointment: "dispNone",
    });
  };

  bookAppointmentClickHandler = async () => {
    this.state.selectedTimeSlot === "" || this.state.selectedTimeSlot === "none"
      ? this.setState({ isValidTimeSlot: "dispBlock" })
      : this.setState({ isValidTimeSlot: "dispNone" });

    if (
      this.state.selectedTimeSlot !== "" &&
      this.state.selectedTimeSlot !== "none"
    ) {
      const result = await fetchBookAppointmentClickHandler();

      const options = {
        doctorId: this.props.dId,
        doctorName: this.props.dName,
        userId: sessionStorage.getItem("uuid"),
        userName: result,
        userEmailId: sessionStorage.getItem("uuid"),
        timeSlot: this.state.selectedTimeSlot,
        appointmentDate: this.state.selectedDate,
        symptoms: this.state.symptoms,
        priormedicalhistory: this.state.priormedicalhistory,
      };

      console.log("Booking data=", options);

      const responsesse = await fetchBookingAppointmenWithDetails(options);

      console.log("responsesse = ", responsesse);
      if (responsesse >= 400) {
        this.setState({
          openSlotUnavailable: true,
          bookedAppointment: "dispNone",
        });
      } else {
        this.setState({
          bookedAppointment: "dispBlock",
        });
      }
    }
  };

  handleChange = (event) => {
    this.setState({
      selectedTimeSlot: event.target.value,
      isValidTimeSlot: "dispNone",
      bookedAppointment: "dispNone",
    });
  };

  handleSlotUnavailableClose = () => {
    this.setState({
      openSlotUnavailable: false,
    });
  };

  bookAppointmentCloseHandler = () => {
    this.setState({
      selectedDate: new Date(),
      selectedTimeSlot: "",
      timeSlot: null,
      medicalHistory: null,
      symptoms: null,
      isValidTimeSlot: "dispNone",
      bookedAppointment: "dispNone",
    });

    this.props.handleClose();
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date }, async () => {
      var date = this.state.selectedDate.toISOString().slice(0, 10);

      const response = await fetchHandleDateChangeFetchingTimeSlots(
        this.props.dId,
        date
      );
      console.log("asaf = ", this.props);
      this.setState({ timeSlot: response.timeSlot });
    });
  };

  render() {
    return (
      <TabContainer>
        <Modal
          ariaHideApp={false}
          isOpen={this.props.isOpen}
          contentLabel="Login"
          onRequestClose={this.bookAppointmentCloseHandler}
          style={customStyles}
        >
          <Card style={{ height: "100%" }}>
            <CardHeader
              className="modal-head"
              title="Book an Appointment"
            ></CardHeader>
            <CardContent style={{ height: "100%" }}>
              <FormControl>
                <TextField
                  value={this.props.dName}
                  type="text"
                  variant="standard"
                  label="DoctorName"
                  required
                  disabled
                />
              </FormControl>
              <br />
              <br />
              <FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label="Date Picker Inline"
                    value={this.state.selectedDate}
                    onChange={(date) => this.handleDateChange(date)}
                    format="MM/dd/yyyy"
                    minDate={new Date()}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
              <br />
              <br />
              <FormControl variant="standard">
                <InputLabel
                  style={{ fontSize: "15px" }}
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Timeslot
                </InputLabel>
                <Select
                  id="demo-simple-select-standard"
                  label="Timeslot"
                  value={this.state.selectedTimeSlot}
                  onChange={this.handleChange}
                  style={{ width: "150px", height: "50px", marginTop: "-10px" }}
                >
                  <MenuItem value="none" key="none">
                    <em>None</em>
                  </MenuItem>
                  {this.state.selectedDate !== new Date() &&
                    this.state.timeSlot &&
                    this.state.timeSlot.map((i) => {
                      return (
                        <MenuItem value={i} key={i}>
                          {i}
                        </MenuItem>
                      );
                    })}
                  {this.state.timeSlot === null &&
                    this.props.timeslot !== null &&
                    this.props.timeslot.map((i) => {
                      return (
                        <MenuItem value={i} key={i}>
                          {i}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText className={this.state.isValidTimeSlot}>
                  <span className="red">Select a time slot</span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl>
                <TextField
                  multiline={true}
                  rows={2}
                  id="medicalHistory"
                  label="Medical History"
                  type="text"
                  priormedicalhistory={this.state.priormedicalhistory}
                  onChange={this.priorMedicalHistoryChangeHandler}
                  variant="standard"
                />
              </FormControl>
              <br />
              <FormControl>
                <TextField
                  multiline={true}
                  rows={2}
                  id="symptoms"
                  label="Symptoms"
                  type="text"
                  placeholder="Ex. Symptoms"
                  symptoms={this.state.symptoms}
                  onChange={this.symptomsChangeHandler}
                  variant="standard"
                />
              </FormControl>
              <br />
              <br />
              <FormControl>
                <div className={this.state.bookedAppointment}>
                  Appointment Booked Successfully
                </div>
              </FormControl>
              <br />

              <Button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  width: "15vw",
                }}
                variant="contained"
                onClick={this.bookAppointmentClickHandler}
              >
                BOOK APPOINTMENT
              </Button>
              <Dialog
                open={this.state.openSlotUnavailable}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"localhost:3000"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Either the slot is already booked or not available
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{
                      backgroundColor: "lightblue",
                      color: "white",
                      width: "5vw",
                    }}
                    variant="contained"
                    onClick={this.handleSlotUnavailableClose}
                    autoFocus
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Modal>
      </TabContainer>
    );
  }
}

export default BookAppointment;
