import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./signin.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { emailSignInStart } from "../../redux/user/user.actions";
import { selectSignInError } from "../../redux/user/user.selectors";

import ErrMessage from "../errMessage/errMessage.component";
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { emailSignInStart } = this.props;

    emailSignInStart(email, password);
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>Admin Sign In</h2>
        <span>Sign in with your email and password</span>
        {this.props.authError ? (
          <ErrMessage message={this.props.authError} />
        ) : (
          <br></br>
        )}

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />

          <div className="signin-button">
            <CustomButton type="submit"> Sign in </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});
const mapStateToProps = createStructuredSelector({
  authError: selectSignInError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
