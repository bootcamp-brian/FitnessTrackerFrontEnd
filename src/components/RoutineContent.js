import { useState } from "react";
import { Link } from "react-router-dom";

const RoutineContent = ({ routine }) => {
    const { name, goal, creatorName, activities } = routine;

    return <>
        <p>{name}</p>
        <p>{creatorName}</p>
        <p>{goal}</p>
        <ul>
            {
                activities.map(activity => {
                    return <li key={activity.id} className="routineActivities">
                        <h4>{activity.name}</h4>
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