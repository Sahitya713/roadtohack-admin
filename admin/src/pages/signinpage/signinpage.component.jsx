import React from "react";
import { withRouter } from "react-router-dom";
import SignIn from "../../components/signin/signin.component";

import "./signinpage.styles.css";
const SignInPage = ({ history }) => {
  return (
    <div className="signin-overlay">
      <h1>Welcome to Tiong Bahru Code-X Challenge!</h1>

      <SignIn />
      {/* <SignUp /> */}
      {/* <button>Sign Up!</button> */}
    </div>
  );
};

export default withRouter(SignInPage);
