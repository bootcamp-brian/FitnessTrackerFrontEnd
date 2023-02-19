import { useState } from "react";
import { Link } from "react-router-dom";

const RoutineContent = ({ routine }) => {
    const { name, goal, creatorName, activities } = routine;
    const [activitiesStartIndex, setActivitiesStartIndex] = useState(0);
    const [activitiesEndIndex, setActivitiesEndIndex] = useState(2);

    return <section className="routineText">
        <h3 className="routineName">{name}</h3>
        <h3 className="routineHeader">Created By:</h3>
        <Link to={`../routinesbyuser/${creatorName}`} className="routineCreator">{creatorName}</Link>
        <h3 className="routineHeader">Goal:</h3>
        <p className="routineGoal">{goal}</p>
        <h3 className="routineHeader">Activities:</h3>
        <ul className="routineActivities">
            {
                activities.slice(activitiesStartIndex, activitiesEndIndex).map(activity => {
                    return <li key={activity.id} className="routineActivity">
                        <h4>
                            <Link to={`../routinesbyactivity/${activity.id}/${activity.name}`}>{activity.name}</Link>
                        </h4>
                        <p>{activity.description}, <b>Count:</b> {activity.count}, <b>Duration:</b> {activity.duration}</p>
                    </li>
                })
            }
        </ul>
        <section className="navButtonsOnRoutine">
            {
                activitiesStartIndex !== 0 &&
                <button
                    type="button"
                    className="prev"
                    onClick={() => {
                        setActivitiesStartIndex(activitiesStartIndex - 2);
                        setActivitiesEndIndex(activitiesEndIndex - 2);
                    }}
                >{'<<'} Prev</button>
            }
            {
                activities.length - activitiesEndIndex > 0 &&
                <button 
                    type="button"
                    className="next"
                    onClick={() => {
                        setActivitiesStartIndex(activitiesStartIndex + 2);
                        setActivitiesEndIndex(activitiesEndIndex + 2);
                    }}
                >Next {'>>'}</button>
            }
        </section>
    </section>
}

export default RoutineContent;