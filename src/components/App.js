import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import PollPage from "./PollPage";
import NewPoll from "./NewPoll";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import CheckLogin from "./CheckLogin";

function App() {
  const authedUser = useSelector(state => !!state.authedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  },[dispatch]);

  return (
    <Fragment>
      <div className="container">
        <>
          { authedUser && <NavBar /> }
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<CheckLogin><Dashboard /></CheckLogin>} />
            <Route path="/leaderboard" exact element={<CheckLogin><LeaderBoard /></CheckLogin>} />
            <Route path="/questions/:id" element={<CheckLogin><PollPage /></CheckLogin>} />
            <Route path="/add" exact element={<CheckLogin><NewPoll /></CheckLogin>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </div>
    </Fragment>
  );
}

export default (App);