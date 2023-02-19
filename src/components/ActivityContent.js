import { Link } from "react-router-dom";

const ActivityContent = ({ activity }) => {
    const { id, name, description } = activity;

    return <div className="activityText">
        <h4>
            <Link to={`../routinesbyactivity/${id}/${name}`}>{name}</Link>
        </h4>
        <p>{description}</p>
    </div>
}

export default ActivityContent;