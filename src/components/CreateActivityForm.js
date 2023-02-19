import { useState } from "react";
import { createActivity } from "../utils/API";

const CreateActivityForm = ({ updated, setUpdated, token, setFormEnabled, setLoading }) => {
    const [nameToCreate, setNameToCreate] = useState('');
    const [descriptionToCreate, setDescriptionToCreate] = useState('');
    const [message, setMessage] = useState('');

    return <>
        <form className="forms" onSubmit={async (event) => {
            event.preventDefault();
            const response = await createActivity(nameToCreate, descriptionToCreate, token);

            if (response.error) {
                setMessage(response.message);
                setLoading(false);
            } else {
                setNameToCreate('');
                setDescriptionToCreate('');
                setFormEnabled(false);
                setUpdated(updated + 1);
            }
        }}>
            <h2>Create New Activity</h2>
            <section>
                <label htmlFor="activityName">Name:</label>
                <br/>
                <input
                    id="activityName"
                    type="text"
                    placeholder="enter activity name..."
                    maxLength="30"
                    required
                    value={nameToCreate}
                    onChange={event => setNameToCreate(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="activityDescription">Description:</label>
                <br/>
                <textarea
                    id="activityDescription"
                    rows="5"
                    cols="25"
                    placeholder="enter activity description..."
                    maxLength="125"
                    required
                    value={descriptionToCreate}
                    onChange={event => setDescriptionToCreate(event.target.value)}
                />
            </section>
            <section className="formButtons">
                <button type="submit" className="submitButton">Submit Activity</button>
                <button type="button" className="cancelButton" onClick={() => {
                    setFormEnabled(false);
                    setUpdated(updated + 1);
                }}>Cancel</button>
            </section>
            <p className="errorMessage">{message}</p>
        </form>
    </>
}

export default CreateActivityForm;