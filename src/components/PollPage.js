import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import withRouter from "../router/withRouter";
import { checkVotedPoll } from "../utils/helpers";
import { handleAnswerQuestion } from "../actions/questions";

const PollPage = (props) => {
    const { dispatch, user, question, authedUser, autheLogin } = props;

    if(!user || !question || !authedUser){
        return <Navigate to="*"/>
    }

    const answered = checkVotedPoll(question,authedUser);

    const handleClick = (e, option) => {
        e.preventDefault();
        dispatch(handleAnswerQuestion(authedUser, question.id, option));
    }

    const calculatePercentage = (votes) => {
        const totalValue = question.optionOne.votes.length + question.optionTwo.votes.length
        return `${((100 * votes) / totalValue).toFixed(0)}%`;
    }

    return (
        <div className="container">
            <h2 className="center">Poll by {user.name}</h2>
            <div className="box-center"><img alt={user.id} src={user.avatarURL} className="poll-author-avatar" /></div>
            <h2 className="center">Would You Rather</h2>
            <div className="poll-option-container">
                <div className={answered === true && autheLogin.answers[question.id] === "optionOne" ? "poll-option answered" : "poll-option"}>
                    <div className="poll-option-text">{question["optionOne"].text}</div>
                    {answered === false && <div className="answer-poll-btn" onClick={(e) => handleClick(e, "optionOne")}>Click</div>}
                    {
                        answered === true && 
                        <div className="poll-option-text" data-testid="poll-option-info">
                            <span>{question.optionOne.votes.length} votes | {calculatePercentage(question.optionOne.votes.length)}</span>
                        </div>
                    }
                </div>
                <div className={answered === true && autheLogin.answers[question.id] === "optionTwo" ? "poll-option answered" : "poll-option"}>
                    <div className="poll-option-text">{question["optionTwo"].text}</div>
                    {answered === false && <div className="answer-poll-btn" onClick={(e) => handleClick(e, "optionTwo")}>Click</div>}
                    {
                        answered === true && 
                        <div className="poll-option-text" data-testid="poll-option-info">
                            <span>{question.optionTwo.votes.length} votes | {calculatePercentage(question.optionTwo.votes.length)}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ users, questions, authedUser }, props) => {
    try{
        const { id } = props.router.params;
        return {
            user: users[questions[id].author],
            question: questions[id],
            authedUser,
            autheLogin: users[authedUser],
        }
    }
    catch(e) {
        return <Navigate to="" />
    }
}

export default withRouter(connect(mapStateToProps)(PollPage));