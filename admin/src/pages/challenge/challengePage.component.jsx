import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomButton from "../../components/custom-button/custom-button.component";
import { selectCurrChallenge } from "../../redux/challenge/challenge.selectors";
import { editChallengeStart } from "../../redux/challenge/challenge.actions";

import FormInput from "../../components/form-input/form-input.component";
import FormInputTextArea from "../../components/form-input-textarea/form-input-textarea.component";
// import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./challengePage.styles.css";

const convertTime2 = (mongoDate) => {
  var time = new Date(mongoDate);
  var year = time.getFullYear();
  var month = time.getMonth();
  var date = time.getDate();
  var hour = time.getHours();
  var min = time.getMinutes();
  if (min <= 9) {
    min = "0" + min;
  }
  if (hour <= 9) {
    hour = "0" + hour;
  }
  if (month <= 9) {
    month = "0" + month;
  }
  if (date <= 9) {
    date = "0" + date;
  }
  var time_converted = year + "-" + month + "-" + date + "T" + hour + ":" + min; // final date with time, you can use this according your requirement
  return time_converted;
};
const convertTime = (mongoDate) => {
  var time = new Date(mongoDate);

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = time.getFullYear();
  var month = months[time.getMonth()];
  var date = time.getDate();
  var hour = time.getHours();
  var min = time.getMinutes();
  // if (min === 0) {
  //   min = "00";
  // }
  // if (hour === 0) {
  //   hour = "00";
  // }
  if (min <= 9) {
    min = "0" + min;
  }
  if (hour <= 9) {
    hour = "0" + hour;
  }

  if (date <= 9) {
    date = "0" + date;
  }

  var time_converted =
    date + " " + month + " " + year + ", " + hour + ":" + min; // final date with time, you can use this according your requirement
  return time_converted;
};

class ChallengePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      title: "",
      description: "",
      startTime: null,
      endTime: null,
    };
  }

  componentDidMount() {}

  switchToEdit = () => {
    var { title, description, startTime, endTime } = this.props.challenge;
    startTime = convertTime2(startTime);
    // endTime = convertTime2(endTime);
    // startTime = new Date(startTime);
    // startTime = startTime.toString();
    // startTime = startTime.getDate();
    // startTime.setHours(startTime.getHours() + 8);
    // console.log(endTime);
    endTime = endTime.split(":");
    endTime = endTime[0] + ":" + endTime[1];
    // startTime = startTime.split(":");
    // startTime = startTime[0] + ":" + startTime[1];
    console.log("time to displa on edit:");
    console.log(startTime);
    console.log(endTime);

    this.setState({
      title,
      description,
      startTime,
      endTime,
      edit: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, description, startTime, endTime } = this.state;

    endTime = endTime.split(":");
    endTime = endTime[0] + ":" + endTime[1];
    startTime = startTime.split(":");
    startTime = startTime[0] + ":" + startTime[1];

    const { challenge, editChallengeStart } = this.props;

    const update = {};

    if (title !== challenge.title) {
      update["title"] = title;
    }
    if (description !== challenge.description) {
      update["description"] = description;
    }
    update["startTime"] = startTime;
    update["endTime"] = endTime;
    // if (startTime !== challenge.startTime) {
    //   update["startTime"] = startTime;
    // }
    // if (endTime !== challenge.endTime) {
    //   update["endTime"] = endTime;
    // }

    editChallengeStart({
      challengeId: challenge._id,
      challenge: update,
    });

    this.setState({ edit: false });
  };

  render() {
    const { title, description, startTime, endTime } = this.props.challenge;
    console.log(typeof startTime);
    var start_time = convertTime(startTime);
    var end_time = convertTime(endTime);
    const { edit } = this.state;
    console.log(this.state);

    return (
      <div className="challengePage-overlay">
        <div className="challengePage-heading">
          <div className="title">Challenge Details</div>
          <div>
            {!edit && (
              <CustomButton onClick={this.switchToEdit}>Edit</CustomButton>
            )}
          </div>
        </div>

        {edit ? (
          <form className="challenge-form" onSubmit={this.handleSubmit}>
            {/* <label>Challenge Title: </label>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            /> */}

            <div className="challenge-edit-button">
              <CustomButton
                style={{ background: "#40C94E", marginRight: "20px" }}
                type="submit"
              >
                Save
              </CustomButton>
              <CustomButton
                type="button"
                onClick={() => this.setState({ edit: false })}
              >
                Cancel
              </CustomButton>
            </div>

            <FormInput
              name="title"
              type="text"
              value={this.state.title}
              handleChange={this.handleChange}
              label="Challenge Title:"
              required
            />

            <FormInputTextArea
              name="description"
              handleChange={this.handleChange}
              label="Challenge Description: "
              value={this.state.description}
              rows="8"
              required
              // cols="50"
            />

            {/* 
            <label>Challenge Description: </label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              rows="8"
              cols="50"
            /> */}

            {/* <label>Choose a time for your appointment:</label>

            <input
              type="datetime-local"
              id="meeting-time"
              name="startTime"
              value={this.state.startTime}
              min="2020-06-07T00:00"
              max="2022-06-14T00:00"
              onChange={this.handleChange}
            /> */}

            <FormInput
              type="datetime-local"
              id="meeting-time"
              name="startTime"
              value={this.state.startTime}
              min="2020-06-07T00:00"
              max="2022-06-14T00:00"
              handleChange={this.handleChange}
              label="Challenge Start Time: "
              required
            />

            <FormInput
              type="datetime-local"
              name="endTime"
              value={this.state.endTime}
              min="2021-01-31T00:00"
              max="2022-12-31T00:00"
              handleChange={this.handleChange}
              label="Challenge End Time: "
              required
            />
          </form>
        ) : (
          <div className="challengePage-actual-container">
            <div className="subheading1">Challenge Title:</div>
            <div className="subpara1">{title}</div>
            <div className="subheading1">Challenge Description: </div>
            <div className="subpara1">{description}</div>
            <div className="subheading1">Start Time: </div>
            <div className="subpara1">{start_time}</div>
            <div className="subheading1">End Time: </div>
            <div className="subpara1">{end_time}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editChallengeStart: (challenge) => dispatch(editChallengeStart(challenge)),
});

const mapStateToProps = createStructuredSelector({
  challenge: selectCurrChallenge,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
