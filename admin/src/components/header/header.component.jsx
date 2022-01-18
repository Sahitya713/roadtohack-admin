import React from "react";
import { Link } from "react-router-dom";
import { withRouter, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import "./header.styles.css";
import { signOutStart } from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";

const Header = ({ signOutStart, toggleEdit, match }) => {
  const location = useLocation();
  const route = location.pathname.split("/").pop();
  return (
    <div className="header">
      <div className="options">
        <Link
          className={`home-opt ${match.isExact ? "option-selected" : "option"}`}
          to={`${match.url}`}
        >
          Challenge
        </Link>
        <Link
          className={route === "groups" ? "option-selected" : "option"}
          to={`/groups`}
        >
          Groups
        </Link>
        <Link
          className={route === "questions" ? "option-selected" : "option"}
          to={`/questions`}
        >
          Questions
        </Link>
        <Link
          className={route === "leaderboard" ? "option-selected" : "option"}
          to={`/leaderboard`}
        >
          Leaderboard
        </Link>
      </div>
      <div className="buttons">
        {/* {route === "" ? (
          <CustomButton
            style={{ backgroundColor: "rgb(40, 175, 40)" }}
            onClick={toggleEdit}
          >
            Edit
          </CustomButton>
        ) : (
          <div></div>
        )} */}
        <CustomButton onClick={signOutStart}>Sign Out</CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
