import { useState } from "react";
import { editActivity } from "../utils/API";

const EditActivityForm = ({ updated, setUpdated, token, activityToEdit, setActivityToEdit, setLoading }) => {
    const { name, description, id: activityId } = activityToEdit;
    const [nameToEdit, setNameToEdit] = useState(name);
    const [descriptionToEdit, setDescriptionToEdit] = useState(description);
    const [message, setMessage] = useState('');

    return <>
        <form className="forms" onSubmit={async (event) => {
            event.preventDefault();
            
            if (nameToEdit === name) {
                await editActivity(null, descriptionToEdit, token, activityId);
                setActivityToEdit(null);
                setUpdated(updated + 1);
            } else {
                const response = await editActivity(nameToEdit, descriptionToEdit, token, activityId);

                if (response.error) {
                    setMessage(response.message);
                    setLoading(false);
                } else {
                    setNameToEdit('');
                    setDescriptionToEdit('');
                    setActivityToEdit(null);
                    setUpdated(updated + 1);
                }
            }    
        }}>
            <h2>Edit Activity</h2>
            <section>
                <label htmlFor="activityName">Name:</label>
                <br/>
                <input
                    id="activityName"
                    type="text"
                    placeholder="enter activity name..."
                    maxLength="30"
                    required
                    value={nameToEdit}
                    onChange={event => setNameToEdit(event.target.value)}
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
                    value={descriptionToEdit}
                    onChange={event => setDescriptionToEdit(event.target.value)}
                />
            </section>
            <section className="formButtons">
                <button type="submit" className="submitButton">Submit Activity</button>
                <button type="button" className="cancelButton" onClick={() => {
                    setActivityToEdit(null);
                    setUpdated(updated + 1);
                }}>Cancel</button>
            </section>
            <p className="errorMessage">{message}</p>
        </form>
    </>
}

export default EditActivityForm;