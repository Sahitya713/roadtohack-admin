import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import {
  selectQuestionError,
  selectQuestions,
} from "../../redux/question/question.selectors";

import { deleteQuestionStart } from "../../redux/question/question.actions";
import ErrMessage from "../../components/errMessage/errMessage.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./questionsPage.styles.css";

const QuestionsPage = ({ questions, questionError, deleteQuestionStart }) => {
  console.log(questions);
  return (
    <div className="questionsPage-container">
      <div className="title">Questions</div>
      {questionError ? <ErrMessage message={questionError} /> : <br></br>}
      {questions.map((question) => (
        <div key={question._id} className="qn-container">
          <div className="questionsPage-title">{question.title}</div>
          <div className="questionsPage-location">
            Location: {question.location.name}
          </div>
          <div className="questionsPage-type">
            question Type: {question.questionType}
          </div>

          <Link
            className="link"
            style={{ padding: "5px 10px" }}
            to={`/question-detail/${question.slug}`}
          >
            View
          </Link>
          <Delete
            onClick={() => {
              console.log(question._id);
              deleteQuestionStart(question._id);
            }}
            style={{ fontSize: "20px", color: "red", marginLeft: "20px" }}
          />
        </div>
      ))}
      {/* <CustomButton> */}
      <Link className="link" to={"/create-question"}>
        Add
      </Link>
      {/* </CustomButton> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectQuestions,
  questionError: selectQuestionError,
});

const mapDispatchToProps = (dispatch) => ({
  deleteQuestionStart: (questionId) =>
    dispatch(deleteQuestionStart(questionId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
