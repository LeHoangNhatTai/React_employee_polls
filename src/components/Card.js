import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const Card = ({ card }) => {
    const navigate = useNavigate();

    const handleShow = (e) => {
        e.preventDefault();
        navigate(`/questions/${card.id}`);
    }

    return (
        <div className="card">
            <div className="card-part">
                <label>{card.author}</label>
                <div className="time">{formatDate(card.timestamp)}</div>
            </div>
            <div className="card-part">
                <button className="card-btn" onClick={handleShow}>Show</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({questions}, {id}) => ({ card: questions[id] });

export default connect(mapStateToProps)(Card);