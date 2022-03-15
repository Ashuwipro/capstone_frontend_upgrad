import React, { Component } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.jpeg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";

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

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

const validateUsername = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhoneNumber = (phone) => {
  return String(phone).match(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
      loggedIn: sessionStorage.getItem("access-token") == null ? true : false,
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
    this.setState({ modalIsOpen: false });
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

  loginClickHandler = () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });
    this.state.username !== "" && !validateUsername(this.state.username)
      ? this.setState({ usernameValid: "dispBlock" })
      : this.setState({ usernameValid: "dispNone" });

    if (
      this.state.username !== "" &&
      validateUsername(this.state.username) &&
      this.state.loginPassword !== ""
    ) {
      let dataLogin = null;
      let xhrLogin = new XMLHttpRequest();
      let that = this;
      xhrLogin.addEventListener("readystatechange", function () {
        if (
          this.readyState === 4 &&
          JSON.parse(this.responseText).id !== undefined
        ) {
          sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
          sessionStorage.setItem(
            "access-token",
            xhrLogin.getResponseHeader("access-token")
          );

          that.setState({
            loggedIn: true,
            isSuccessLogin: "dispBlock",
            isFailedLogin: "dispNone",
          });

          that.closeModalHandler();
        } else {
          that.setState({
            loggedIn: false,
            isSuccessLogin: "dispNone",
            isFailedLogin: "dispBlock",
          });
        }
      });

      xhrLogin.open("POST", this.props.baseUrl + "auth/login");
      xhrLogin.setRequestHeader(
        "Authorization",
        "Basic " +
          window.btoa(this.state.username + ":" + this.state.loginPassword)
      );
      xhrLogin.setRequestHeader("Content-Type", "application/json");
      xhrLogin.setRequestHeader("Cache-Control", "no-cache");
      xhrLogin.send(dataLogin);
    }
  };

  inputUsernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
      usernameRequired: "dispNone",
      usernameValid: "dispNone",
    });
  };

  inputLoginPasswordChangeHandler = (e) => {
    this.setState({
      loginPassword: e.target.value,
      loginPasswordRequired: "dispNone",
    });
  };

  registerClickHandler = () => {
    this.state.firstname === ""
      ? this.setState({ firstnameRequired: "dispBlock" })
      : this.setState({ firstnameRequired: "dispNone" });
    this.state.lastname === ""
      ? this.setState({ lastnameRequired: "dispBlock" })
      : this.setState({ lastnameRequired: "dispNone" });
    this.state.email === ""
      ? this.setState({ emailRequired: "dispBlock" })
      : this.setState({ emailRequired: "dispNone" });
    this.state.email !== "" && !validateUsername(this.state.email)
      ? this.setState({ emailValid: "dispBlock" })
      : this.setState({ emailValid: "dispNone" });
    this.state.registerPassword === ""
      ? this.setState({ registerPasswordRequired: "dispBlock" })
      : this.setState({ registerPasswordRequired: "dispNone" });
    this.state.contact === ""
      ? this.setState({ contactRequired: "dispBlock" })
      : this.setState({ contactRequired: "dispNone" });
    this.state.contact !== "" && !validatePhoneNumber(this.state.contact)
      ? this.setState({ contactValid: "dispBlock" })
      : this.setState({ contactValid: "dispNone" });

    if (
      this.state.firstname !== "" &&
      this.state.lastname !== "" &&
      this.state.email !== "" &&
      validateUsername(this.state.email) &&
      this.state.registerPassword !== "" &&
      this.state.contact !== "" &&
      validatePhoneNumber(this.state.contact)
    ) {
      let dataSignup = JSON.stringify({
        email_address: this.state.email,
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        mobile_number: this.state.contact,
        password: this.state.registerPassword,
      });

      let xhrSignup = new XMLHttpRequest();
      let that = this;
      xhrSignup.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          that.setState({
            registrationSuccess: true,
            isSuccessRegister: "dispBlock",
            isFailedRegister: "dispNone",
          });
        } else {
          that.setState({
            registrationSuccess: false,
            isSuccessRegister: "dispNone",
            isFailedRegister: "dispBlock",
          });
        }
      });

      xhrSignup.open("POST", this.props.baseUrl + "signup");
      xhrSignup.setRequestHeader("Content-Type", "application/json");
      xhrSignup.setRequestHeader("Cache-Control", "no-cache");
      xhrSignup.send(dataSignup);
    }
  };

  inputFirstNameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value, firstnameRequired: "dispNone" });
  };

  inputLastNameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value, lastnameRequired: "dispNone" });
  };

  inputEmailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
      emailRequired: "dispNone",
      emailValid: "dispNone",
    });
  };

  inputRegisterPasswordChangeHandler = (e) => {
    this.setState({
      registerPassword: e.target.value,
      registerPasswordRequired: "dispNone",
    });
  };

  inputContactChangeHandler = (e) => {
    this.setState({
      contact: e.target.value,
      contactRequired: "dispNone",
      contactValid: "dispNone",
    });
  };

  logoutHandler = (e) => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    this.setState({
      loggedIn: false,
    });
  };

  render() {
    return (
      <div>
        <header className="app-header">
          <img src={logo} className="app-logo" alt="Movies App Logo" />
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
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="username">Email</InputLabel>
                <Input
                  id="username"
                  type="email"
                  username={this.state.username}
                  onChange={this.inputUsernameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <div className="empty">Please fill out this field</div>
                </FormHelperText>
                <FormHelperText className={this.state.usernameValid}>
                  <span className="red">Enter valid Email</span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required>
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <Input
                  id="loginPassword"
                  type="password"
                  loginpassword={this.state.loginPassword}
                  onChange={this.inputLoginPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <div className="empty">Please fill out this field</div>
                </FormHelperText>
              </FormControl>
              <br />
              {this.state.loggedIn === true && (
                <FormControl>
                  <span className={this.state.isSuccessLogin}>
                    Login Successful!
                  </span>
                  <span className={this.state.isFailureLogin}>
                    Login Failed!
                  </span>
                </FormControl>
              )}
              <br />

              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}

          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  firstname={this.state.firstname}
                  onChange={this.inputFirstNameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <div className="empty">Please fill out this field</div>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  lastname={this.state.lastname}
                  onChange={this.inputLastNameChangeHandler}
                />
                <FormHelperText className={this.state.lastnameRequired}>
                  <div className="empty">Please fill out this field</div>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  email={this.state.email}
                  onChange={this.inputEmailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <div className="empty">Please fill out this field</div>
                </FormHelperText>
                <FormHelperText className={this.state.emailValid}>
                  <span className="red">Enter valid Email</span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required>
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  type="password"
                  registerpassword={this.state.registerPassword}
                  onChange={this.inputRegisterPasswordChangeHandler}
                />
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <div className="empty">Please fill out this field</div>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required>
                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                <Input
                  id="contact"
                  type="text"
                  contact={this.state.contact}
                  onChange={this.inputContactChangeHandler}
                />
                <FormHelperText className={this.state.contactRequired}>
                  <div className="empty">Please fill out this field</div>
                </FormHelperText>
                <FormHelperText className={this.state.contactValid}>
                  <span className="red">Enter valid mobile number</span>
                </FormHelperText>
              </FormControl>
              <br />
              {this.state.registrationSuccess === true && (
                <FormControl>
                  <span className={this.state.isSuccessRegister}>
                    Registration Successful. Please Login!
                  </span>
                  <span className={this.state.isFailedRegister}>
                    Registration Failed!
                  </span>
                </FormControl>
              )}
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
                onClick={this.registerClickHandler}
              >
                REGISTER
              </Button>
            </TabContainer>
          )}
        </Modal>
      </div>
    );
  }
}

export default Header;
