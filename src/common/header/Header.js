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

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

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

//creating Header component
class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      loggedIn:
        sessionStorage.getItem("access-token") === null ||
        sessionStorage.getItem("access-token") === undefined
          ? false
          : true,
    };
  }

  //creating various handlers

  openModalHandler = () => {
    this.setState({
      modalIsOpen: true,
      value: 0,
    });
  };

  closeModalHandler = () => {
    this.setState({
      modalIsOpen: false,
      loggedIn:
        sessionStorage.getItem("access-token") === null ||
        sessionStorage.getItem("access-token") === undefined
          ? false
          : true,
    });
    this.props.stateChange();
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  logoutHandler = (e) => {
    fetchUsedInHeaderForLogout();

    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

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
          <Card style={{ height: "100%" }}>
            <CardHeader
              className="modal-head"
              title="Authentication"
            ></CardHeader>
            <CardContent style={{ height: "100%" }}>
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

              {this.state.value === 1 && (
                <Register baseUrl={this.props.baseUrl} />
              )}
            </CardContent>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default Header;
