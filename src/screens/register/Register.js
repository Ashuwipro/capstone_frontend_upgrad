import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { fetchUsedInRegister } from "../../util/fetch";
import TabContainer from "../../common/tabContainer/TabContainer";

// const TabContainer = function (props) {
//   return (
//     <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
//       {props.children}
//     </Typography>
//   );
// };

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

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

class Register extends Component {
  constructor() {
    super();
    this.state = {
      isSuccessRegister: "dispNone",
      isFailedRegister: "dispNone",
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
    };
  }

  registerClickHandler = async () => {
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
      let dataSignup = {
        emailId: this.state.email,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        mobile: this.state.contact,
        password: this.state.registerPassword,
      };

      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(dataSignup),
      // };
      // fetch("http://localhost:8080/users/register", requestOptions)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data !== null) {
      //       this.setState({
      //         registrationSuccess: true,
      //         isSuccessRegister: "dispBlock",
      //         isFailedRegister: "dispNone",
      //       });
      //     } else {
      //       this.setState({
      //         registrationSuccess: false,
      //         isSuccessRegister: "dispNone",
      //         isFailedRegister: "dispBlock",
      //       });
      //     }
      //   });

      const result = await fetchUsedInRegister(dataSignup);

      if (result[0] === 200) {
        this.setState({
          registrationSuccess: true,
          isSuccessRegister: "dispBlock",
          isFailedRegister: "dispNone",
        });
      } else {
        this.setState({
          registrationSuccess: false,
          isSuccessRegister: "dispNone",
          isFailedRegister: "dispBlock",
        });
      }
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

  render() {
    return (
      <TabContainer>
        <FormControl required>
          <InputLabel htmlFor="firstname">First Name</InputLabel>
          <Input
            id="firstname"
            type="text"
            firstname={this.state.firstname}
            onChange={this.inputFirstNameChangeHandler}
          />
          <div className={this.state.firstnameRequired}>
            <div className="empty">Please fill out this field</div>
          </div>
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
          <div className={this.state.lastnameRequired}>
            <div className="empty">Please fill out this field</div>
          </div>
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
          <div className={this.state.emailRequired}>
            <div className="empty">Please fill out this field</div>
          </div>
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
          <div className={this.state.registerPasswordRequired}>
            <div className="empty">Please fill out this field</div>
          </div>
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
          <div className={this.state.contactRequired}>
            <div className="empty">Please fill out this field</div>
          </div>
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
          </FormControl>
        )}

        {this.state.registrationSuccess === false && (
          <FormControl>
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
    );
  }
}

export default Register;
