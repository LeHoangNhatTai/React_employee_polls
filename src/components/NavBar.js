import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const NavBar = (props) => {
    const { dispatch, user } = props;

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
    }

    return (
        <nav className="nav">
            <ul className="nav-left">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/leaderboard">LeaderBoard</Link>
                </li>
                <li>
                    <Link to="/add">New</Link>
                </li>
            </ul>
            <ul className="nav-right">
                <li>
                    <img alt="avatar" src={user.avatarURL} className="avatar" />
                    <strong data-testid="user-info">{user.id}</strong>
                </li>
                <li><div className="btn-logout" onClick={handleClick}>Logout</div></li>
            </ul>
        </nav>
    )
}

const mapStateToProps = ({ authedUser, users }) => ({
    user: users[authedUser],
});

export default connect(mapStateToProps)(NavBar);