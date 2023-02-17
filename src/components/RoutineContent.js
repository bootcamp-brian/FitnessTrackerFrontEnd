const RoutineContent = ({ routine }) => {
    const { name, goal, creatorName, activities } = routine;

    return <>
        <p className="routineName">{name}</p>
        <p className="routineCreator">{creatorName}</p>
        <p className="routineGoal">{goal}</p>
        <ul className="routineActivities">
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