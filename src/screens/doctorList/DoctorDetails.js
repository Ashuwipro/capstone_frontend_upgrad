import React, { Component } from "react";
import Modal from "react-modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TabContainer from "../../common/tabContainer/TabContainer";
import Rating from "@material-ui/lab/Rating";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "350px",
    height: "350px",
    padding: "0%",
    transform: "translate(-50%, -50%)",
    overflowY: "hidden",
  },
};

class DoctorDetails extends Component {
  render() {
    return (
      <TabContainer>
        <Modal
          ariaHideApp={false}
          isOpen={this.props.isOpen}
          contentLabel="Details"
          onRequestClose={this.props.handleClose}
          style={customStyles}
        >
          <Card style={{ height: "100%" }}>
            <CardHeader
              className="modal-head"
              title="Doctor Details"
            ></CardHeader>
            <CardContent style={{ height: "100%" }}>
              {this.props.dDetails && (
                <div>
                  Dr: {this.props.dDetails.firstName}{" "}
                  {this.props.dDetails.lastName}
                </div>
              )}
              {this.props.dDetails && (
                <div>
                  Total Experience: {this.props.dDetails.totalYearsOfExp} years
                </div>
              )}
              {this.props.dDetails && (
                <div>Speciality :{this.props.dDetails.speciality}</div>
              )}
              {this.props.dDetails && (
                <div>Date of Birth :{this.props.dDetails.dob}</div>
              )}

              {this.props.dDetails && (
                <div>City: {this.props.dDetails.address.city}</div>
              )}
              {this.props.dDetails && (
                <div>Email: {this.props.dDetails.emailId}</div>
              )}
              {this.props.dDetails && (
                <div>Mobile: {this.props.dDetails.mobile}</div>
              )}
              {this.props.dDetails && (
                <div>
                  Rating :
                  <Rating
                    name="read-only"
                    value={this.props.dDetails.rating}
                    readOnly
                  />
                </div>
              )}
            </CardContent>
          </Card>
          <br />
          <br />
        </Modal>
      </TabContainer>
    );
  }
}

export default DoctorDetails;
