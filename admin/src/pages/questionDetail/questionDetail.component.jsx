import React from "react";
import "./questionDetail.styles.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/custom-button.component";
import { selectCurrQuestion } from "../../redux/question/question.selectors";
import { downloadInputStart } from "../../redux/question/question.actions";
import { questionTypes } from "../../redux/question/question.types";
import AnswersPage from "../answersPage/answersPage.component";

import { Check, Close } from "@material-ui/icons";

const QuestionDetailPage = ({ qn, downloadInputStart }) => {
  const { questionType, question, title, points, location, image, rationale } =
    qn;

  return (
    <div className="questionDetail-container">
      <h1 className="title">{title}</h1>
      <div className="questionDetail-points">{points} points</div>
      <div className="questionDetail-question">{questionType}</div>
      <div className="questionDetail-location">{location.name}</div>
      {/* <div className="questionDetail-question">{question}</div> */}

      {question.split(/\\r\\n|\\n|\\r/).map((item, idx) => {
        return (
          <span key={idx} className="questionDetail-question">
            {`${item}`}
            <br />
          </span>
        );
      })}

      {image ? (
        <img src={image} className="questionDetail-image" alt="suppImage" />
      ) : (
        <div />
      )}

      {questionType === questionTypes.CODE && (
        <div className="questionDetail-container">
          <h2>Input</h2>
          <span>
            Download the following file to see an example outputs of your
            Application.
          </span>
          <span>Example Outputs: </span>

          {/* <Link to={input} target="_blank" download>
          Download
        </Link> */}
          <CustomButton onClick={() => downloadInputStart(qn._id)}>
            Download
          </CustomButton>
        </div>
      )}

      {questionType === questionTypes.INPUT && (
        <div>
          {qn.sampleInput.map((input, idx) => (
            <div key={idx}>
              <div className="sample-title">Sample Input {`${idx + 1}`}</div>
              <div className="sample-box">{input}</div>
              <div className="sample-title">Sample Output {`${idx + 1}`}</div>
              <div className="sample-box">{qn.sampleOutput[idx]}</div>
              <br />
            </div>
          ))}
          <h1>Test Case Inputs</h1>
          {qn.inputs.map((input, idx) => (
            <div key={idx}>
              <div className="sample-title">Input {`${idx + 1}`}</div>
              <div className="sample-box">{input}</div>
              <div className="sample-title">Correct Answer</div>
              <div className="sample-box">{qn.correctAnswers[idx]}</div>
            </div>
          ))}
        </div>
      )}

      {(questionType === questionTypes.MCQ ||
        questionType === questionTypes.MSQ) && (
        <div>
          <div className="sample-title">Options: </div>
          {qn.options.map(({ option, type, correct }, idx) => (
            <div key={idx} className="qnDetail-options">
              <span style={{ marginRight: "10px" }}>{idx + 1}.</span>
              <span>
                {type === "image" ? (
                  <img className="option-img" src={option} alt="item" />
                ) : (
                  option
                )}
              </span>
              {/* <div>{correct ? "correct" : "incorrect"}</div> */}
              <span>
                {correct ? (
                  <Check
                    style={{
                      fontSize: "20px",
                      color: "green",
                      marginLeft: "10px",
                    }}
                  />
                ) : (
                  <Close
                    style={{
                      fontSize: "20px",
                      color: "red",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {rationale && (
        <div className="sample-box" style={{ marginTop: "30px" }}>
          <h3>Rationale for solution:</h3>
          {rationale.split(/\\r\\n|\\n|\\r|\r|\n/).map((item, idx) => {
            return (
              <div key={idx} className="questionDetail-question">
                {`${item}`}
                {/* <br /> */}
              </div>
            );
          })}
        </div>
      )}

      {/* <CustomButton>
        <Link to={`/answers/${qn.slug}/${qn._id}`}>View Answers</Link>
      </CustomButton> */}
      <AnswersPage
        questionId={qn._id}
        points={qn.points}
        question={{
          questionId: qn._id,
          points: qn.points,
          questionType: qn.questionType,
        }}
      />
    </div>
  );
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { questionId },
    },
  }
) => ({
  qn: selectCurrQuestion(questionId)(state),
});

const mapDispatchToProps = (dispatch) => ({
  downloadInputStart: (id) => dispatch(downloadInputStart(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage);
