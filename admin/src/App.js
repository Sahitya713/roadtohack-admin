import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
// import { compose } from "redux";

import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./redux/user/user.actions";
import { isUserFetching, selectCurrentUser } from "./redux/user/user.selectors";

import "./App.css";
import MainPageContainer from "./pages/main/main.container";
import SignInPage from "./pages/signinpage/signinpage.component";
import Spinner from "./components/with-spinner/spinner";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.props.checkUserSession();
  }

  render() {
    const { currentUser, isLoading } = this.props;
    return isLoading ? (
      <Spinner />
    ) : (
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={SignInPage} /> */}
          <Route
            exact
            path="/"
            render={(props) =>
              currentUser ? <MainPageContainer {...props} /> : <SignInPage />
            }
          />

          <Route
            path="/"
            render={(props) =>
              currentUser ? (
                <MainPageContainer {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: isUserFetching,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
