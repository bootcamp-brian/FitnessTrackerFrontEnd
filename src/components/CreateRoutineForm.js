import { useState } from "react";
import { createRoutine } from "../utils/API";

const CreateRoutineForm = ({ updated, setUpdated, token }) => {
    const [nameToCreate, setNameToCreate] = useState('');
    const [goalToCreate, setGoalToCreate] = useState('');
    const [isPublicToCreate, setIsPubhlicToCreate] = useState(false);

    return <>
        <h2>Create New Routine</h2>
        <form className="createRoutine" onSubmit={async (event) => {
            event.preventDefault();
            const response = await createRoutine(nameToCreate, goalToCreate, token, isPublicToCreate);

            if (response.error) {
                console.log(response.message)
            } else {
                setNameToCreate('');
                setGoalToCreate('');
                setIsPubhlicToCreate(false);
                setUpdated(updated + 1);
            }
        }}>
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
                <input
                    id="routineGoal"
                    type="text"
                    placeholder="enter routine goal..."
                    required
                    value={goalToCreate}
                    onChange={event => setGoalToCreate(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="isPublic">Public Routine</label>
                <br/>
                <input
                    id="isPublic"
                    type="checkbox"
                    checked={isPublicToCreate}
                    onChange={() => isPublicToCreate ? setIsPubhlicToCreate(false) : setIsPubhlicToCreate(true)}
                />
            </section>
            <button type="submit">Submit Routine</button>
        </form>
    </>
}

export default CreateRoutineForm;