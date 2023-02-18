import { useState } from "react";
import { createActivity, createRoutine } from "../utils/API";

const CreateActivityForm = ({ updated, setUpdated, token }) => {
    const [nameToCreate, setNameToCreate] = useState('');
    const [descriptionToCreate, setDescriptionToCreate] = useState('');
    const [message, setMessage] = useState('');

    return <>
        <h2>Create New Activity</h2>
        <form className="createActivity" onSubmit={async (event) => {
            event.preventDefault();
            const response = await createActivity(nameToCreate, descriptionToCreate, token);

            if (response.error) {
                setMessage(response.message);
            } else {
                setNameToCreate('');
                setDescriptionToCreate('');
                setUpdated(updated + 1);
            }
        }}>
            <section>
                <label htmlFor="activityName">Name:</label>
                <br/>
                <input
                    id="activityName"
                    type="text"
                    placeholder="enter activity name..."
                    required
                    value={nameToCreate}
                    onChange={event => setNameToCreate(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="activityDescription">Description:</label>
                <br/>
                <input
                    id="activityDescription"
                    type="text"
                    placeholder="enter activity description..."
                    required
                    value={descriptionToCreate}
                    onChange={event => setDescriptionToCreate(event.target.value)}
                />
            </section>
            <button type="submit">Submit Activity</button>
            <p>{message}</p>
        </form>
    </>
}

export default CreateActivityForm;