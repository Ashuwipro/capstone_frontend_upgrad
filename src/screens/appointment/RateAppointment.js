import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "600px",
    height: "400px",
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

class RateAppointment extends Component {
  constructor() {
    super();
    this.state = {
      comments: null,
      ratingValue: 0,
      isValidRating: "dispNone",
      isAlreadyRated: "dispNone",
      ratedSuccessfully: "dispNone",
    };
  }

  commentsChangeHandler = (e) => {
    this.setState({
      comments: e.target.value,
    });
  };

  ratingChangeHandler = (event, newValue) => {
    this.setState({ ratingValue: newValue, isValidRating: "dispNone" });
  };

  rateAppointmentCloseHandler = () => {
    this.setState({
      comments: null,
      ratingValue: 0,
      isValidRating: "dispNone",
      isAlreadyRated: "dispNone",
      ratedSuccessfully: "dispNone",
    });

    this.props.handleClose();
  };

  rateAppointmentClickHandler = () => {
    const opt1 = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    };

    fetch(
      `http://localhost:8080/ratings/${this.props.details.appointmentId}`,
      opt1
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({
            isValidRating: "dispNone",
            isAlreadyRated: "dispBlock",
            ratedSuccessfully: "dispNone",
          });
        } else {
          this.state.ratingValue === "" || this.state.ratingValue === 0
            ? this.setState({
                isValidRating: "dispBlock",
              })
            : this.setState({
                isValidRating: "dispNone",
              });

          if (this.state.ratingValue !== "" && this.state.ratingValue !== 0) {
            let data = {
              appointmentId: this.props.details.appointmentId,
              comments: this.state.comments,
              doctorId: this.props.details.doctorId,
              rating: this.state.ratingValue,
            };

            const opt2 = {
              method: "POST",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access-token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };

            fetch("http://localhost:8080/ratings", opt2).then(
              this.setState({
                ratedSuccessfully: "dispBlock",
              })
            );
          }
        }
      });
  };

  render() {
    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        contentLabel="Login"
        onRequestClose={this.rateAppointmentCloseHandler}
        style={customStyles}
      >
        <div className="modal-head">Rate an Appointment</div>
        <div style={{ marginLeft: "10px" }}>
          <FormControl>
            <TextField
              multiline={true}
              rows={3}
              id="comments"
              label="Comments"
              type="text"
              comments={this.state.comments}
              onChange={this.commentsChangeHandler}
              variant="standard"
            />
          </FormControl>
          <br />
          <br />
          <FormControl>
            <div>
              Rating:
              <Rating
                name="simple-controlled"
                value={this.state.ratingValue}
                onChange={this.ratingChangeHandler}
              />
            </div>
            <FormHelperText className={this.state.isValidRating}>
              <div className="red">Submit a rating</div>
            </FormHelperText>
            <FormHelperText className={this.state.isAlreadyRated}>
              <div className="red">
                You have already rated for this appointment
              </div>
            </FormHelperText>
            <FormHelperText className={this.state.ratedSuccessfully}>
              <div className="red">Rated successfully</div>
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
            onClick={this.rateAppointmentClickHandler}
          >
            RATE APPOINTMENT
          </Button>
        </div>
      </Modal>
    );
  }
}

export default RateAppointment;
