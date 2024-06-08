import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import PollPage from "./PollPage";
import NewPoll from "./NewPoll";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";

function App({dispatch, authedUser}) {
  useEffect(() => {
    dispatch(handleInitialData());
  },[dispatch]);

  return (
    <Fragment>
      <div className="container">
      { authedUser === null ? <Login /> :
        <>
          <NavBar/>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/questions/:id" exact element={<PollPage />} />
            <Route path="/add" exact element={<NewPoll />} />
            <Route path="/leaderboard" exact element={<LeaderBoard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      }
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(App);