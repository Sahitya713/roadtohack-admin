import React from "react";
import { Route } from "react-router-dom";

import LeaderBoard from "../leaderboard/leaderboard.component";
import Header from "../../components/header/header.component";
import QuestionsPage from "../questions/questionsPage.component";
import GroupsPage from "../groups/groupsPage.component";
import ChallengePage from "../challenge/challengePage.component";
import QuestionCreatePage from "../questionCreate/questionCreate.component";
import QuestionDetailPage from "../questionDetail/questionDetail.component";
import AnswersPage from "../answersPage/answersPage.component";
// import FaqPage from "../faq/faq.component";
// import LeaderBoardContainer from "../leaderboard/leaderboard.container";

import "./main.styles.css";
function Main(props) {
  console.log("HELLO HELLO");
  const { match } = props;

  return (
    <div className="main-app">
      <Header />
      <Route exact path={`${match.path}`} component={ChallengePage} />
      <Route exact path={`/leaderboard`} component={LeaderBoard} />
      <Route exact path={`/groups`} component={GroupsPage} />
      {/* <Route exact path={`/`} component={FaqPage} /> */}
      <Route exact path={`/questions`} component={QuestionsPage} />
      <Route exact path="/create-question" component={QuestionCreatePage} />
      <Route
        exact
        path="/question-detail/:questionId"
        component={QuestionDetailPage}
      />
      <Route exact path="/answers/:slug/:questionId" component={AnswersPage} />
    </div>
  );
}

export default Main;
