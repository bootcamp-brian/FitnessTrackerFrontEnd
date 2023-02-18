import { useState } from "react";
import { editActivity } from "../utils/API";

const EditActivityForm = ({ updated, setUpdated, token, activityToEdit, setActivityToEdit }) => {
    const { name, description, id: activityId } = activityToEdit;
    const [nameToEdit, setNameToEdit] = useState(name);
    const [descriptionToEdit, setDescriptionToEdit] = useState(description);

    return <>
        <h2>Edit Activity</h2>
        <form className="editActivity" onSubmit={async (event) => {
            event.preventDefault();
            
            if (nameToEdit === name) {
                await editActivity(null, descriptionToEdit, token, activityId);
            } else {
                await editActivity(nameToEdit, descriptionToEdit, token, activityId);
            }
            
            setActivityToEdit(null);
            setUpdated(updated + 1);
        }}>
            <section>
                <label htmlFor="activityName">Name:</label>
                <br/>
                <input
                    id="activityName"
                    type="text"
                    placeholder="enter activity name..."
                    required
                    value={nameToEdit}
                    onChange={event => setNameToEdit(event.target.value)}
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
                    value={descriptionToEdit}
                    onChange={event => setDescriptionToEdit(event.target.value)}
                />
            </section>
            <button type="submit">Submit Edits</button>
        </form>
    </>
}

export default EditActivityForm;