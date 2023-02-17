import { useEffect, useState } from "react";
import { deleteRoutineActivity, editRoutine, getActivities } from "../utils/API";

const EditRoutineForm = ({ updated, setUpdated, token, routineToEdit, setEditEnabled }) => {
    const { name, goal, isPublic, activities, id: routineId } = routineToEdit;
    const [nameToEdit, setNameToEdit] = useState(name);
    const [goalToEdit, setGoalToEdit] = useState(goal);
    const [isPublicToEdit, setIsPublicToEdit] = useState(isPublic);
    const [activitiesToEdit, setActivitiesToEdit] = useState(activities);
    const [activitiesList, setActivitiesList] = useState([]);

    useEffect(() => {
        const getActivitiesList = async () => {
            const allActivities = await getActivities();
            const availableActivities = allActivities.filter(activity => {
                for (let routineActivity of activitiesToEdit) {
                    if (routineActivity.id === activity.id) {
                        return false;
                    }
                }
                return true;
            })
            setActivitiesList(availableActivities);
        }
        getActivitiesList();
    }, [activitiesList, activitiesToEdit])

    return <>
        <h2>Edit Routine</h2>
        <form className="createRoutine" onSubmit={event => {
            event.preventDefault();
            // editRoutine(nameToEdit, goalToEdit, isPublicToEdit, token, routineId);

            const activitiesToRemove = activities.filter(activity => {
                if (!activitiesToEdit.includes(activity)) {
                    return true;
                }
            })
            
            activitiesToRemove.forEach(activity => {
                deleteRoutineActivity(token, activity.routineActivityId);
            });
            // work on this next
            // const activitiesToUpdate = 

            // const activitiesToAdd = 
            // setRoutines(routines);
            // setEditEnabled(false);
        }}>
            <section>
                <label htmlFor="routineName">Name:</label>
                <br/>
                <input
                    id="routineName"
                    type="text"
                    placeholder="enter routine name..."
                    required
                    value={nameToEdit}
                    onChange={event => setNameToEdit(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="routineGoal">Goal:</label>
                <br/>
                <input
                    id="routineGoal"
                    type="text"
                    placeholder="enter routine goal..."
                    required
                    value={goalToEdit}
                    onChange={event => setGoalToEdit(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="isPublic">Public Routine</label>
                <br/>
                <input
                    id="isPublic"
                    type="checkbox"
                    checked={isPublicToEdit}
                    onChange={() => isPublicToEdit ? setIsPublicToEdit(false) : setIsPublicToEdit(true)}
                />
            </section>
            <section className="formActivities">
            <fieldset>
                <label htmlFor="select-activity">Activities <span className="activity-count">({ activitiesList.length })</span></label>
                <select 
                    name="activity"
                    id="select-activity" 
                    onChange={(event) => {
                        const activityName = event.target.value;
                        const activityToAdd = activitiesList.filter(activity => activity.name === activityName);
                        const newActivitiesToEdit = [...activitiesToEdit, activityToAdd[0]];
                        setActivitiesToEdit(newActivitiesToEdit);
                    }}>
                    <option value="activities">Activities to add</option>
                    {
                        activitiesList.map(activity => <option key={activity.id} activity={activity.name}>{activity.name}</option>)
                    }
                </select>
            </fieldset>
                {
                    activitiesToEdit.map(activity => {
                        return <div key={activity.id}>
                            <p>{activity.name}</p>
                            <label htmlFor="activityCount">Count:</label>
                            <input
                                id="activityCount"
                                type="number"
                                placeholder="enter activity count..."
                                required
                                value={activity.count}
                                onChange={event => {activity.count = event.target.value}}
                            />
                            <label htmlFor="activityDuration">Duration:</label>
                            <input
                                id="activityDuration"
                                type="number"
                                placeholder="enter activity duration..."
                                required
                                value={activity.duration}
                                onChange={event => {activity.duration = event.target.value}}
                            />
                            <button type="button" data-id={activity.id} onClick={event => {
                                const id = Number(event.target.getAttribute('data-id'));
                                const newActivities = activitiesToEdit.filter(activity => activity.id !== id);
                                setActivitiesToEdit(newActivities);
                            }}>Remove</button>
                        </div>
                    })
                }
            </section>
            <button type="submit">Submit Edits</button>
        </form>
    </>
}

export default EditRoutineForm;