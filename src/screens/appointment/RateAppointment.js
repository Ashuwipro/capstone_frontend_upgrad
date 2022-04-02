import React, { Component } from "react";
import Modal from "react-modal";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { appointmentRatedOrNot, rateAppointment } from "../../util/fetch";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // width: "800px",
    // height: "400px",
    width: "50%",
    height: "60%",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
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

  // rateAppointmentClickHandler = () => {
  //   const opt1 = {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("access-token"),
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   fetch(
  //     `http://localhost:8080/ratings/${this.props.details.appointmentId}`,
  //     opt1
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         this.setState({
  //           isValidRating: "dispNone",
  //           isAlreadyRated: "dispBlock",
  //           ratedSuccessfully: "dispNone",
  //         });
  //       } else {
  //         this.state.ratingValue === "" || this.state.ratingValue === 0
  //           ? this.setState({
  //               isValidRating: "dispBlock",
  //             })
  //           : this.setState({
  //               isValidRating: "dispNone",
  //             });

  //         if (this.state.ratingValue !== "" && this.state.ratingValue !== 0) {
  //           let data = {
  //             appointmentId: this.props.details.appointmentId,
  //             comments: this.state.comments,
  //             doctorId: this.props.details.doctorId,
  //             rating: this.state.ratingValue,
  //           };

  //           const opt2 = {
  //             method: "POST",
  //             headers: {
  //               Authorization: "Bearer " + sessionStorage.getItem("access-token"),
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(data),
  //           };

  //           fetch("http://localhost:8080/ratings", opt2).then(
  //             this.setState({
  //               ratedSuccessfully: "dispBlock",
  //             })
  //           );
  //         }
  //       }
  //     });
  // };

  rateAppointmentClickHandler = async () => {
    const data = await appointmentRatedOrNot(this.props.details.appointmentId);

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

        const response = await rateAppointment(data);
        if (response) {
          this.setState({
            ratedSuccessfully: "dispBlock",
          });
        }
      }
    }
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
        <Card style={{ height: "100%" }}>
          <CardHeader
            title="Rate an Appointment"
            className="modal-head"
          ></CardHeader>
          <CardContent style={{ height: "100%" }}>
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
            <FormControl required>
              <div>
                Rating:
                <Rating
                  name="simple-controlled"
                  value={this.state.ratingValue}
                  onChange={this.ratingChangeHandler}
                />
              </div>
              <div className={this.state.isValidRating}>
                <div className="red">Submit a rating</div>
              </div>
              <div className={this.state.isAlreadyRated}>
                <div className="red">
                  You have already rated for this appointment
                </div>
              </div>
            </FormControl>
            <br />
            <br />
            <FormControl>
              <div className={this.state.ratedSuccessfully}>
                Rated Successfully
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
              onClick={this.rateAppointmentClickHandler}
            >
              RATE APPOINTMENT
            </Button>
          </CardContent>
        </Card>
      </Modal>
    );
  }
}

export default RateAppointment;
