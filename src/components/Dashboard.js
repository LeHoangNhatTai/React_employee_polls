import { connect } from "react-redux";
import { useState } from "react";
import { checkVotedPoll } from "../utils/helpers";
import Card from "./Card";

function Dashboard({ qnews, qdones }) {
    const [switchTab,setSwitchTab] = useState("new");

    return (
        <div>
            <h1 data-testid="dashboard-hearder">Dashboard</h1>
            <div className="section">
                <div className="tab-container">
                    <div className={switchTab === "new" ? "tab active" : "tab"} 
                        onClick={e => { e.preventDefault(); setSwitchTab("new");}}>
                        New Questions
                    </div>
                    <div className={switchTab === "done" ? "tab active" : "tab"}
                        onClick={e => { e.preventDefault(); setSwitchTab("done");}}>
                        Done
                    </div>
                </div>
                <div className="card-container">
                {
                    switchTab === "new" &&
                    (qnews.length > 0 ? 
                        qnews.map(id => <Card key={id} id={id} />) :
                        <div className="message-no-data">There are no question.</div>
                    )
                }
                </div>
                <div className="card-container">
                {
                    switchTab === "done" &&
                    (qdones.length > 0 ? 
                        qdones.map(id => <Card key={id} id={id} />) :
                        <div className="message-no-data">There are no question.</div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => {
    let qnews = Object.keys(questions)
                    .filter(q => !checkVotedPoll(questions[q],authedUser))
                    .sort(
                        (a, b) => questions[b].timestamp - questions[a].timestamp
                    );
    let qdones = Object.keys(questions)
                    .filter(q => checkVotedPoll(questions[q],authedUser))
                    .sort(
                        (a, b) => questions[b].timestamp - questions[a].timestamp
                    );
    return {
        qnews,
        qdones,
    }
}

export default connect(mapStateToProps)(Dashboard);