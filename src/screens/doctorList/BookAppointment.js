import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
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

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "600px",
    height: "560px",
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
      priorMedicalHistory: null,
      symptoms: null,
      isValidTimeSlot: "dispNone",
      bookedAppointment: "dispNone",
      openSlotUnavailable: false,
    };
  }

  priorMedicalHistoryChangeHandler = (e) => {
    this.setState({
      priorMedicalHistory: e.target.value,
      bookedAppointment: "dispNone",
    });
  };

  symptomsChangeHandler = (e) => {
    this.setState({
      symptoms: e.target.value,
      bookedAppointment: "dispNone",
    });
  };

  bookAppointmentClickHandler = () => {
    this.state.selectedTimeSlot === "" || this.state.selectedTimeSlot === "none"
      ? this.setState({ isValidTimeSlot: "dispBlock" })
      : this.setState({ isValidTimeSlot: "dispNone" });

    if (
      this.state.selectedTimeSlot !== "" &&
      this.state.selectedTimeSlot !== "none"
    ) {
      const opt = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      };

      fetch(`http://localhost:8080/users/${localStorage.getItem("uuid")}`, opt)
        .then((response) => response.json())
        .then((data) => {
          const options = {
            doctorId: this.props.dId,
            doctorName: this.props.dName,
            userId: localStorage.getItem("uuid"),
            userName: data.firstName + " " + data.lastName,
            userEmailId: localStorage.getItem("uuid"),
            timeSlot: this.state.selectedTimeSlot,
            appointmentDate: this.state.selectedDate,
            symptoms: this.state.symptoms,
            priorMedicalHistory: this.state.priorMedicalHistory,
          };

          console.log("Booking data=", options);

          const bookAppointment = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access-token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
          };

          fetch("http://localhost:8080/appointments/", bookAppointment).then(
            (response) => {
              if (response.status === 400) {
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
          );
        });
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
    this.setState({ selectedDate: date }, () => {
      var date = this.state.selectedDate.toISOString().slice(0, 10);
      fetch(
        `http://localhost:8080/doctors/${this.props.dId}/timeSlots?date=${date}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ timeSlot: data.timeSlot });
        });
    });
  };

  render() {
    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        contentLabel="Login"
        onRequestClose={this.bookAppointmentCloseHandler}
        style={customStyles}
      >
        <div className="modal-head">Book an Appointment</div>
        <div style={{ marginLeft: "10px" }}>
          <FormControl>
            <h3>
              Doctor Name: {this.props.dName} : {this.props.dId}
            </h3>
          </FormControl>
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
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Timeslot
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={this.state.selectedTimeSlot}
              onChange={this.handleChange}
              style={{ width: "150px", height: "50px" }}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {this.state.selectedDate !== new Date() &&
                this.state.timeSlot &&
                this.state.timeSlot.map((i) => {
                  return <MenuItem value={i}>{i}</MenuItem>;
                })}
              {this.state.timeSlot === null &&
                this.props.timeslot !== null &&
                this.props.timeslot.map((i) => {
                  return <MenuItem value={i}>{i}</MenuItem>;
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
              rows={3}
              id="medicalHistory"
              label="Medical History"
              type="text"
              priorMedicalHistory={this.state.priorMedicalHistory}
              onChange={this.priorMedicalHistoryChangeHandler}
              variant="standard"
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              multiline={true}
              rows={3}
              id="symptoms"
              label="Symptoms"
              type="text"
              symptoms={this.state.symptoms}
              onChange={this.symptomsChangeHandler}
              variant="standard"
            />
            <FormHelperText className={this.state.bookedAppointment}>
              <div className="red">Appointment Booked Successfully</div>
            </FormHelperText>
          </FormControl>
          <br />
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
            onClose={this.handleSlotUnavailableClose}
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
        </div>
      </Modal>
    );
  }
}

export default BookAppointment;
