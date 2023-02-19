import { useState } from "react";
import { createRoutine } from "../utils/API";

const CreateRoutineForm = ({ updated, setUpdated, token, setFormEnabled, setLoading }) => {
    const [nameToCreate, setNameToCreate] = useState('');
    const [goalToCreate, setGoalToCreate] = useState('');
    const [isPublicToCreate, setIsPubhlicToCreate] = useState(false);
    const [message, setMessage] = useState('');

    return <>
        <form className="forms" onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            const response = await createRoutine(nameToCreate, goalToCreate, token, isPublicToCreate);

            if (response.error) {
                setMessage(response.message + ", there may already be a routine with that name.");
                setLoading(false);
            } else {
                setNameToCreate('');
                setGoalToCreate('');
                setIsPubhlicToCreate(false);
                setFormEnabled(false);
                setUpdated(updated + 1);
            }
        }}>
            <h2>Create New Routine</h2>
            <section>
                <label htmlFor="routineName">Name:</label>
                <br/>
                <input
                    id="routineName"
                    type="text"
                    placeholder="enter routine name..."
                    required
                    value={nameToCreate}
                    onChange={event => setNameToCreate(event.target.value)}
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
                    value={goalToCreate}
                    onChange={event => setGoalToCreate(event.target.value)}
                />
            </section>
            <section className="publicOption">
                <label htmlFor="isPublic">Public</label>
                <br/>
                <input
                    id="isPublic"
                    type="checkbox"
                    checked={isPublicToCreate}
                    onChange={() => isPublicToCreate ? setIsPubhlicToCreate(false) : setIsPubhlicToCreate(true)}
                />
            </section>
            <section className="formButtons">
                <button type="submit" className="submitButton">Submit Routine</button>
                <button type="button" className="cancelButton" onClick={() => {
                    setFormEnabled(false);
                    setUpdated(updated + 1);
                }}>Cancel</button>
            </section>
            <p className="errorMessage">{message}</p>
        </form>
    </>
}

export default CreateRoutineForm;