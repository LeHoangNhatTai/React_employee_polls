import React, { useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../actions/authedUser";
import { Navigate } from "react-router-dom";

const Login = ({ dispatch, authedUser }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    if (authedUser !== null) {
        const redirectUrl = new URLSearchParams(window.location.search).get('redirectTo') || "/";
        return <Navigate to={redirectUrl} />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLogin(userName, password));
        setPassword("");
    }

    return (
        <div className="container login-form">
            <h2 className="center">Employee Polls</h2>
            <div className="box-center">
                <div className="login-avatar"></div>
            </div>
            <h3 className="center" data-testid="login-header">Login</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="userName"
                    placeholder="Username"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    data-testid="username"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid="password"
                />
                <div className="box-center">
                    <button type="submit" className="btn center" data-testid="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(Login);
