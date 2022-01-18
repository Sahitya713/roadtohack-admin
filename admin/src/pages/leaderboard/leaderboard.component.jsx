import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectScores,
  selectIsLeaderboardFetching,
} from "../../redux/leaderboard/leaderboard.selectors";

import { fetchLeaderboardStart } from "../../redux/leaderboard/leaderboard.actions";
import ScoreCard from "../../components/scoreCard/scoreCard.component";

import Spinner from "../../components/with-spinner/spinner";

import "./leaderboard.styles.css";

class LeaderBoard extends React.Component {
  componentDidMount() {
    const { fetchLeaderboardStart } = this.props;

    fetchLeaderboardStart("1234567");
  }
  render() {
    const { scores, isFetching } = this.props;
    return isFetching === false ? (
      <div className="lb-container">
        <h1 className="title">LEADERBOARD</h1>
        <span className="lb-note">
          * Please note that the points awarded are not final and may be
          modified upon review of submitted solutions
        </span>
        <div className="lb-scores-wrap">
          {scores.map(({ group, totalPoints }, idx) => (
            <ScoreCard
              key={idx}
              group={group}
              score={totalPoints}
              rank={idx + 1}
            />
          ))}
        </div>
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  scores: selectScores,
  isFetching: selectIsLeaderboardFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeaderboardStart: (hackCode) =>
    dispatch(fetchLeaderboardStart(hackCode)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
