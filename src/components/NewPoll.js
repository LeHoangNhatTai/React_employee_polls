import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

const NewPoll = ({ dispatch, authedUser }) => {
    const navigate = useNavigate();
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))
        .then(() => { 
            navigate("/");
        });
    }

    return (
        <div>
            <h2 className="center">Would You Rather</h2>
            <div className="center time">Create Your Own Poll</div>
            <form onSubmit={handleSubmit}>
                <label className="center" data-testid="optionOneLabel">Option One</label>
                <input type="text" value={optionOne} placeholder="Option One" onChange={e => setOptionOne(e.target.value)}  data-testid="optionOneValue"/>
                <label className="center" data-testid="optionTwoLabel">Option Two</label>
                <input type="text" value={optionTwo} placeholder="Option Two" onChange={e => setOptionTwo(e.target.value)}  data-testid="optionTwoValue"/>
                <div className="box-center">
                    <button type="submit" className="btn center" disabled={optionOne === "" || optionTwo === ""} data-testid="buttonSubmit">Submit</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = ({authedUser}) => ({authedUser});

export default connect(mapStateToProps)(NewPoll);