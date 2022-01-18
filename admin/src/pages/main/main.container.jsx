import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsChallengeInitialised } from "../../redux/challenge/challenge.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Main from "./main.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsChallengeInitialised(state),
});

const MainPageContainer = compose(connect(mapStateToProps), WithSpinner)(Main);

export default MainPageContainer;
