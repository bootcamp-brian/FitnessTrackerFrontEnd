import { Link } from "react-router-dom";

const ActivityContent = ({ activity }) => {
    const { id, name, description } = activity;

    return <>
        <h4>
            <Link to={`../routinesbyactivity/${id}/${name}`}>{name}</Link>
        </h4>
        <p>{description}</p>
    </>
}

export default ActivityContent;