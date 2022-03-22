import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import FormControl from "@mui/material/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@mui/material/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "600px",
    height: "520px",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
};

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

class BookAppointment extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(),
      age: "",
    };
  }

  handleChange = (event) => {
    this.setState({ age: event.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        contentLabel="Login"
        onRequestClose={this.props.handleClose}
        style={customStyles}
      >
        <div className="modal-head">Book an Appointment</div>
        <div style={{ marginLeft: "10px" }}>
          <FormControl>
            <h3>Doctor Name: {this.props.dName}</h3>
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
              value={this.state.age}
              onChange={this.handleChange}
              style={{ width: "150px", height: "50px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl>
            <TextField
              multiline={true}
              rows={3}
              id="medicalHistory"
              label="Medical History"
              type="text"
              defaultValue=""
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
              defaultValue=""
              variant="standard"
            />
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
          >
            BOOK APPOINTMENT
          </Button>
        </div>
      </Modal>
    );
  }
}

export default BookAppointment;
