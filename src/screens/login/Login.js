import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

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

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      // modalIsOpen: false,
      // value: 0,
      isSuccessLogin: "dispNone",
      // isSuccessRegister: "dispNone",
      isFailedLogin: "dispNone",
      // isFailedRegister: "dispNone",
      usernameRequired: "dispNone",
      usernameValid: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      // firstnameRequired: "dispNone",
      // firstname: "",
      // lastnameRequired: "dispNone",
      // lastname: "",
      // emailRequired: "dispNone",
      // emailValid: "dispNone",
      // email: "",
      // registerPasswordRequired: "dispNone",
      // registerPassword: "",
      // contactRequired: "dispNone",
      // contactValid: "dispNone",
      // contact: "",
      // registrationSuccess: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
    };
  }

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
      // let dataLogin = null;
      // let xhrLogin = new XMLHttpRequest();
      // let that = this;
      // xhrLogin.addEventListener("readystatechange", function () {
      //   if (
      //     this.readyState === 4 &&
      //     JSON.parse(this.responseText).id !== undefined
      //   ) {
      //     sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
      //     sessionStorage.setItem(
      //       "access-token",
      //       xhrLogin.getResponseHeader("access-token")
      //     );

      //     that.setState({
      //       loggedIn: true,
      //       isSuccessLogin: "dispBlock",
      //       isFailedLogin: "dispNone",
      //     });

      //     that.closeModalHandler();
      //   } else {
      //     that.setState({
      //       loggedIn: false,
      //       isSuccessLogin: "dispNone",
      //       isFailedLogin: "dispBlock",
      //     });
      //   }
      // });

      // xhrLogin.open("POST", this.props.baseUrl + "auth/login");
      // xhrLogin.setRequestHeader(
      //   "Authorization",
      //   "Basic " +
      //     window.btoa(this.state.username + ":" + this.state.loginPassword)
      // );
      // xhrLogin.setRequestHeader("Content-Type", "application/json");
      // xhrLogin.setRequestHeader("Cache-Control", "no-cache");
      // xhrLogin.send(dataLogin);

      let dataSignup = {
        emailId: this.state.username,
        password: this.state.loginPassword,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization:
            "Basic" +
            btoa(`${this.state.username}:${this.state.loginPassword}`),
        },
      };
      fetch("http://localhost:8080/auth/login", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log("Data=", data));
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

  render() {
    return (
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
            <span className={this.state.isSuccessLogin}>Login Successful!</span>
            <span className={this.state.isFailedLogin}>Login Failed!</span>
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
    );
  }
}

export default Login;
