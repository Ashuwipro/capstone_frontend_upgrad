import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@mui/material/TextField";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "300px",
    height: "300px",
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

class DoctorDetails extends Component {
  render() {
    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        contentLabel="Login"
        onRequestClose={this.props.handleClose}
        style={customStyles}
      >
        <div className="modal-head">Doctor Details</div>
        <div style={{ marginLeft: "10px" }}>
          <FormControl>
            <h3>Doctor Name: {this.props.dName}</h3>
            <TextField value="ashutosh" disabled={true} type="text" />
          </FormControl>
          <br />
          <br />
        </div>
      </Modal>
    );
  }
}

export default DoctorDetails;
