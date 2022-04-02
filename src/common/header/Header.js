import React, { Component } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.jpeg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import { fetchUsedInHeaderForLogout } from "../../util/fetch";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
};

// const TabContainer = function (props) {
//   return (
//     <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
//       {props.children}
//     </Typography>
//   );
// };

// const validateUsername = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

// const validatePhoneNumber = (phone) => {
//   return String(phone).match(
//     /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
//   );
// };

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

//creating Header component
class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      isSuccessLogin: "dispNone",
      isSuccessRegister: "dispNone",
      isFailedLogin: "dispNone",
      isFailedRegister: "dispNone",
      usernameRequired: "dispNone",
      usernameValid: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      emailValid: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contactValid: "dispNone",
      contact: "",
      registrationSuccess: false,
      loggedIn:
        localStorage.getItem("access-token") === null ||
        localStorage.getItem("access-token") === undefined
          ? false
          : true,
    };
  }

  //creating various handlers

  openModalHandler = () => {
    this.setState({
      modalIsOpen: true,
      value: 0,
      isSuccessLogin: "dispNone",
      isSuccessRegister: "dispNone",
      isFailedLogin: "dispNone",
      isFailedRegister: "dispNone",
      usernameRequired: "dispNone",
      usernameValid: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      emailValid: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contactValid: "dispNone",
      contact: "",
    });
  };

  closeModalHandler = () => {
    this.setState({
      modalIsOpen: false,
      loggedIn:
        localStorage.getItem("access-token") === null ||
        localStorage.getItem("access-token") === undefined
          ? false
          : true,
    });
    this.props.stateChange();
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
    this.setState({
      isSuccessLogin: "dispNone",
      isSuccessRegister: "dispNone",
      isFailedLogin: "dispNone",
      isFailedRegister: "dispNone",
    });
  };

  logoutHandler = (e) => {
    // const options = {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("access-token"),
    //   },
    // };

    // fetch("http://localhost:8080/auth/logout", options);

    fetchUsedInHeaderForLogout();

    localStorage.removeItem("uuid");
    localStorage.removeItem("access-token");

    this.setState({
      loggedIn: false,
    });

    this.props.stateChange();
  };

  render() {
    return (
      <div>
        <header className="app-header">
          <img src={logo} className="app-logo" alt="BookAppointment App Logo" />
          <p className="app-label">Doctor Finder</p>
          {!this.state.loggedIn ? (
            <div className="login-button">
              <Button
                variant="contained"
                color="primary"
                onClick={this.openModalHandler}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="login-button">
              <Button
                variant="contained"
                color="secondary"
                onClick={this.logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <div className="modal-head">Authentication</div>
          <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.tabChangeHandler}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {this.state.value === 0 && (
            <Login
              baseUrl={this.props.baseUrl}
              closeModal={this.closeModalHandler}
            />
          )}

          {this.state.value === 1 && <Register baseUrl={this.props.baseUrl} />}
        </Modal>
      </div>
    );
  }
}

export default Header;
