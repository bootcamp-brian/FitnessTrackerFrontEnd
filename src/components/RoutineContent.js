import { Link } from "react-router-dom";

const RoutineContent = ({ routine }) => {
    const { name, goal, creatorName, activities } = routine;

    return <>
        <p className="routineName">{name}</p>
        <Link to={`../routinesbyuser/${creatorName}`} className="creatorName">{creatorName}</Link>
        <p className="routineGoal">{goal}</p>
        <ul className="routineActivities">
            {
                activities.map(activity => {
                    return <li key={activity.id} className="routineActivities">
                        <h4>
                            <Link to={`../routinesbyactivity/${activity.id}/${activity.name}`}>{activity.name}</Link>
                        </h4>
                        <p>{activity.description}</p>
                        <p>Count: {activity.count}</p>
                        <p>Duration: {activity.duration}</p>
                    </li>
                })
            }
        </ul>
    </>
}

export default RoutineContent;