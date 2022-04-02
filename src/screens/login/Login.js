import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { fetchUsedInLogin } from "../../util/fetch";
import TabContainer from "../../common/tabContainer/TabContainer";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      isSuccessLogin: "dispNone",
      isFailedLogin: "dispNone",
      usernameRequired: "dispNone",
      usernameValid: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      loggedIn:
        sessionStorage.getItem("access-token") === null ||
        sessionStorage.getItem("access-token") === undefined
          ? false
          : true,
    };
  }

  validateUsername = (username) => {
    return String(username)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  loginClickHandler = async () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });
    this.state.username !== "" && !this.validateUsername(this.state.username)
      ? this.setState({ usernameValid: "dispBlock" })
      : this.setState({ usernameValid: "dispNone" });

    if (
      this.state.username !== "" &&
      this.state.username !== undefined &&
      this.validateUsername(this.state.username) &&
      this.state.loginPassword !== ""
    ) {
      const data = await fetchUsedInLogin(
        this.state.username,
        this.state.loginPassword
      );
      console.log(data);
      if (data[1] === 200) {
        console.log("Data after fake login=", data);
        console.log("Data.id=", data[0].id);
        console.log("Data acces token=", data[0].accessToken);
        //set access-token when logged in successfully
        sessionStorage.setItem("uuid", data[0].id);
        sessionStorage.setItem("access-token", data[0].accessToken);

        this.setState({
          loggedIn:
            sessionStorage.getItem("access-token") === null ||
            sessionStorage.getItem("access-token") === undefined
              ? false
              : true,
          isSuccessLogin: "dispBlock",
          isFailedLogin: "dispNone",
        });
        setTimeout(() => {
          this.props.closeModal();
        }, 1000);
      } else {
        this.setState({
          loggedIn:
            sessionStorage.getItem("access-token") === null ||
            sessionStorage.getItem("access-token") === undefined
              ? false
              : true,
          isSuccessLogin: "dispNone",
          isFailedLogin: "dispBlock",
        });
      }
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
          <div className={this.state.usernameRequired}>
            <div className="empty">Please fill out this field.</div>
          </div>
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
          <div className={this.state.loginPasswordRequired}>
            <div className="empty">Please fill out this field.</div>
          </div>
        </FormControl>
        <br />
        {this.state.loggedIn === true && (
          <FormControl>
            <span className={this.state.isSuccessLogin}>Login Successful!</span>
          </FormControl>
        )}
        {this.state.loggedIn === false && (
          <FormControl>
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
