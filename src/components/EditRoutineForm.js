import { useEffect, useState } from "react";
import { attachActivity, deleteRoutineActivity, editRoutine, editRoutineActivity, getActivities } from "../utils/API";

const EditRoutineForm = ({ updated, setUpdated, token, routineToEdit, setRoutineToEdit }) => {
    const { name, goal, isPublic, activities, id: routineId } = routineToEdit;
    const [nameToEdit, setNameToEdit] = useState(name);
    const [goalToEdit, setGoalToEdit] = useState(goal);
    const [isPublicToEdit, setIsPublicToEdit] = useState(isPublic);
    const [activitiesToEdit, setActivitiesToEdit] = useState([...activities]);
    const [activitiesList, setActivitiesList] = useState([]);

    useEffect(() => {
        console.log('test')
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
    }, [updated])

    return <>
        <h2>Edit Routine</h2>
        <form className="editRoutine" onSubmit={async (event) => {
            event.preventDefault();

            const submitEdits = async () => {
                const activitiesToRemove = activities.filter(activity => {
                // in case .includes doesn't work
                // activitiesToEdit.forEach(submittedActivity => {
                //     if (submittedActivity.name === activity.name) {
                //         return false;
                //     }
                // })
                // return true;
                    if (!activitiesToEdit.includes(activity)) {
                        return true;
                    }
                })
                
                activitiesToRemove.forEach(async (activity) => {
                    await deleteRoutineActivity(token, activity.routineActivityId);
                });

                const activitiesToAdd = activitiesToEdit.filter(activity => {
                    if (!activities.includes(activity)) {
                        return true;
                    }
                })

                activitiesToAdd.forEach(async (activity) => {
                    const count = Number(activity.count);
                    const duration = Number(activity.duration);
                    const id = Number(activity.id);
                    await attachActivity(id, count, duration, routineId);
                });

                const activitiesToUpdate = activities.filter(activity => {
                    if (activitiesToEdit.includes(activity)) {
                        return true;
                    }
                })

                activitiesToUpdate.forEach(async (activity) => {
                    const { count, duration, routineActivityId } = activity;
                    await editRoutineActivity(count, duration, token, routineActivityId);
                });

                await editRoutine(nameToEdit, goalToEdit, isPublicToEdit, token, routineId);
            }

            await submitEdits();
            setRoutineToEdit(null);
            setUpdated(updated + 1);
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
                        setUpdated(updated + 1);
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
                                onChange={event => {
                                    activity.count = event.target.value;
                                    setUpdated(updated + 1);
                                }}
                            />
                            <label htmlFor="activityDuration">Duration:</label>
                            <input
                                id="activityDuration"
                                type="number"
                                placeholder="enter activity duration..."
                                required
                                value={activity.duration}
                                onChange={event => {
                                    activity.duration = event.target.value;
                                    setUpdated(updated + 1)
                                }}
                            />
                            <button type="button" data-id={activity.id} onClick={event => {
                                const id = Number(event.target.getAttribute('data-id'));
                                const newActivities = activitiesToEdit.filter(activity => activity.id !== id);
                                setActivitiesToEdit(newActivities);
                                setUpdated(updated + 1);
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