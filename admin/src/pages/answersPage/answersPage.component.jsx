import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectAnswers,
  selectIsAnswersFetching,
  selectAnswerError,
} from "../../redux/answer/answer.selectors";

import { fetchQuestionAnswersStart } from "../../redux/answer/answer.actions";

import Spinner from "../../components/with-spinner/spinner";
import ErrMessage from "../../components/errMessage/errMessage.component";
import AnswerCard from "../../components/answerCard/answerCard.component";

class AnswersPage extends React.Component {
  componentDidMount() {
    // this.props.fetchQuestionAnswersStart(this.props.match.params.questionId);

    this.props.fetchQuestionAnswersStart(this.props.question.questionId);
  }

  render() {
    const { answers, isFetching, answerError, question } = this.props;
    console.log(this.props);
    return isFetching === false ? (
      <div>
        <div className="title">Answers</div>
        {answerError ? <ErrMessage message={answerError} /> : <br></br>}
        {answers.map((answer, idx) => (
          <div key={idx}>
            <AnswerCard ans={answer} qn={question} />
          </div>
        ))}
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsAnswersFetching,
  answers: selectAnswers,
  answerError: selectAnswerError,
  // currQuestion: (props) => selectCurrQuestion(props.match.params.questionId),
});

// const mapStateToProps = (
//   state,
//   {
//     match: {
//       params: { slug },
//     },
//   }
// ) => ({
//   qn: selectCurrQuestion(slug)(state),
//   isFetching: selectIsAnswersFetching(state),
//   answers: selectAnswers(state),
//   answerError: selectAnswerError(state),
// });

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionAnswersStart: (questionId) =>
    dispatch(fetchQuestionAnswersStart(questionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswersPage);
