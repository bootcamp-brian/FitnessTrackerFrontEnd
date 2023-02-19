import { useEffect, useState } from "react";
import { attachActivity, deleteRoutineActivity, editRoutine, editRoutineActivity } from "../utils/API";

const EditRoutineForm = ({ updated, setUpdated, token, routineToEdit, setRoutineToEdit, allActivities, setLoading }) => {
    const { name, goal, isPublic, activities, id: routineId } = routineToEdit;
    const [nameToEdit, setNameToEdit] = useState(name);
    const [goalToEdit, setGoalToEdit] = useState(goal);
    const [isPublicToEdit, setIsPublicToEdit] = useState(isPublic);
    const [activitiesToEdit, setActivitiesToEdit] = useState([...activities]);
    const [activitiesList, setActivitiesList] = useState([]);
    const [message, setMessage] = useState('');

    const getActivitiesList = () => {
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

    useEffect(() => {
        getActivitiesList();
    }, [updated])

    return <>
        <form className="forms" onSubmit={event => {
            event.preventDefault();
            setLoading(true);

            const submitEdits = async () => {
                const activitiesToRemove = activities.filter(activity => {
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

                const response = await editRoutine(nameToEdit, goalToEdit, isPublicToEdit, token, routineId);

                if (response.error) {
                    setMessage(response.message + ", there may already be a routine with that name.");
                    setLoading(false);
                } else {
                    setRoutineToEdit(null);
                    setUpdated(updated + 1);
                }
            }

            submitEdits();
        }}>
        <h2>Edit Routine</h2>
            <div className="formFields">
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
                    <textarea
                        id="routineGoal"
                        rows="5"
                        cols="25"
                        placeholder="enter routine goal..."
                        maxLength="125"
                        required
                        value={goalToEdit}
                        onChange={event => setGoalToEdit(event.target.value)}
                    />
                </section>
                <section className="publicOption">
                    <label htmlFor="isPublic">Public</label>
                    <br/>
                    <input
                        id="isPublic"
                        type="checkbox"
                        checked={isPublicToEdit}
                        onChange={() => isPublicToEdit ? setIsPublicToEdit(false) : setIsPublicToEdit(true)}
                    />
                </section>
            </div>
            <section className="formActivitiesSection">
                <fieldset>
                    <label htmlFor="select-activity">Activities (Max 10)</label>
                    <section>
                    <select 
                            name="activity"
                            id="select-activity" 
                            onChange={(event) => {
                                if (activitiesToEdit.length < 10) {
                                    setLoading(true);
                                    const activityName = event.target.value;
                                    const activityToAdd = activitiesList.filter(activity => activity.name === activityName);
                                    const newActivitiesToEdit = [...activitiesToEdit, activityToAdd[0]];
                                    setActivitiesToEdit(newActivitiesToEdit);
                                    setUpdated(updated + 1);
                                }
                            }}>
                            <option value="activities">Activities to add</option>
                            {
                                activitiesList.map(activity => <option key={activity.id} activity={activity.name}>{activity.name}</option>)
                            }
                        </select>
                        <span className="activity-count">({ activitiesList.length })</span>
                    </section>
                </fieldset>
                <div className="formActivities">
                    {
                        activitiesToEdit.map(activity => {
                            return <div key={activity.id}>
                                <p className="routineFormActivity">{activity.name}</p>
                                <section>
                                    <label htmlFor="activityCount">Count:</label>
                                    <input
                                        id="activityCount"
                                        type="number"
                                        placeholder="--"
                                        min="1"
                                        required
                                        value={activity.count}
                                        onChange={event => {
                                            setLoading(true);
                                            activity.count = event.target.value;
                                            setUpdated(updated + 1);
                                        }}
                                    />
                                    <label htmlFor="activityDuration">Duration:</label>
                                    <input
                                        id="activityDuration"
                                        type="number"
                                        placeholder="--"
                                        min="1"
                                        required
                                        value={activity.duration}
                                        onChange={event => {
                                            setLoading(true);
                                            activity.duration = event.target.value;
                                            setUpdated(updated + 1)
                                        }}
                                    />
                                    <span>mins</span>
                                    <button
                                        className="removeActivityButton"
                                        type="button"
                                        data-id={activity.id}
                                        onClick={event => {
                                            setLoading(true);
                                            const id = Number(event.target.getAttribute('data-id'));
                                            const newActivities = activitiesToEdit.filter(activity => activity.id !== id);
                                            setActivitiesToEdit(newActivities);
                                            setUpdated(updated + 1);
                                        }}
                                    >Remove</button>
                                </section>
                            </div>
                        })
                    }
                </div>
            </section>
            <section className="formButtons">
                <button type="submit" className="submitButton">Submit Routine</button>
                <button type="button" className="cancelButton" onClick={() => {
                    setRoutineToEdit(null);
                    setUpdated(updated + 1);
                }}>Cancel</button>
            </section>
            <p className="errorMessage">{message}</p>
        </form>
    </>
}

export default EditRoutineForm;