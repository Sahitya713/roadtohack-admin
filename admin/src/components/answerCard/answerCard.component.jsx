import React from "react";
import { Edit, Check, Close } from "@material-ui/icons";

import { connect } from "react-redux";

import {
  updateScoreStart,
  downloadCodeStart,
} from "../../redux/answer/answer.actions";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./answerCard.styles.css";
class AnswerCard extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      edit: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateScoreStart({
      score: this.state.score,
      answerId: this.props.ans._id,
      questionId: this.props.qn.questionId,
    });

    this.setState({ edit: false });
  };
  render() {
    const { ans, qn, downloadCodeStart } = this.props;
    return (
      <div
        className="answerCard-container"
        style={
          qn.questionType === "code"
            ? { borderColor: "orange" }
            : ans.isAnswerCorrect
            ? { borderColor: "green" }
            : ans.score > 0
            ? { borderColor: "orange" }
            : { borderColor: "red" }
        }
      >
        <div>Group: {ans.groupName}</div>
        <div>Answered by {ans.user}</div>
        <br />

        {(qn.questionType === "code" || qn.questionType === "input") && (
          <div>
            <span>Download the user's uploaded code here.</span>
            <br />
            <span>User Code: </span>
            <CustomButton onClick={() => downloadCodeStart(ans._id)}>
              Download
            </CustomButton>
            <br />
            <br />
          </div>
        )}

        {qn.questionType === "input" && (
          <div>
            <div>User Answers to the given inputs: </div>
            {ans.userAnswers.map((userAns, idx) => (
              <div key={idx}>
                <span>
                  Input {idx + 1}: {userAns.userAnswer}{" "}
                </span>
                <span>
                  {userAns.correct ? (
                    <Check style={{ fontSize: "20px", color: "green" }} />
                  ) : (
                    <Close style={{ fontSize: "20px", color: "red" }} />
                  )}
                </span>
              </div>
            ))}
            <br />
          </div>
        )}

        {(qn.questionType === "mcq" || qn.questionType === "msq") && (
          <div>
            <h3>
              {qn.questionType === "mcq" ? "Option" : "Options"} selected by
              User
            </h3>
            {ans.userOptions.map((option, idx) => (
              <div key={idx}>
                {option.userAnswer && (
                  <div className="answerCard-option-container">
                    <div>
                      {option.option.startsWith("http") ? (
                        <img
                          className="answerCard-option-img"
                          src={option.option}
                          alt="item"
                        />
                      ) : (
                        option.option
                      )}
                    </div>
                    <span>
                      {option.actual ? (
                        <Check
                          className="answerCard-icon"
                          style={{ color: "green" }}
                        />
                      ) : (
                        <Close
                          className="answerCard-icon"
                          style={{ color: "red" }}
                        />
                      )}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {qn.questionType === "msq" && (
              <div>
                <br />
                <h3>Correct Options not selected by User</h3>
                {ans.userOptions.map((option, idx) => (
                  <div key={idx}>
                    {!option.userAnswer && option.actual && (
                      <div>
                        {option.option.startsWith("http") ? (
                          <img
                            src={option.option}
                            className="answerCard-option-img"
                            alt="item"
                          />
                        ) : (
                          option.option
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <br />
          </div>
        )}

        <div>Comments from Group: </div>
        <div>{ans.comment}</div>

        <br />

        {this.state.edit ? (
          <div className="answerCard-option-container">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="score">New Score:</label>
              <input
                type="number"
                id="score"
                name="score"
                min="0"
                max={JSON.stringify(qn.points)}
                value={this.state.score}
                onChange={this.handleChange}
                required
                style={{ marginRight: "10px" }}
              />
              <CustomButton type="submit">Update</CustomButton>
            </form>
            <div
              onClick={() => {
                this.setState({ edit: false });
              }}
              className="answerCard-icon"
            >
              x
            </div>
          </div>
        ) : (
          <div className="answerCard-option-container">
            <div>score: {ans.score}</div>
            <Edit
              onClick={() => {
                this.setState({ edit: true, score: ans.score });
              }}
              className="answerCard-icon"
              style={{ color: "green" }}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateScoreStart: (score) => dispatch(updateScoreStart(score)),
  downloadCodeStart: (id) => dispatch(downloadCodeStart(id)),
});

export default connect(null, mapDispatchToProps)(AnswerCard);
