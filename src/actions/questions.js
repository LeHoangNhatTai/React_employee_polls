import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

function answerQuestion({ authedUser, qid, answer }) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText, authedUser) {
    return (dispatch) => {
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
        .then(question => dispatch(addQuestion(question)))
        .catch(rej => {
            alert(rej);
        });
    }
}

export function handleAnswerQuestion(authedUser, qid, answer) {
    return (dispatch) => {
        return saveQuestionAnswer({authedUser,qid,answer})
        .then(res => dispatch(answerQuestion({authedUser,qid,answer})))
        .catch(rej => {
            alert(rej);
        });
    }
}