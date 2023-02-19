import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getActivities } from '../utils/API';
import ActivityContent from '../components/ActivityContent';
import CreateActivityForm from '../components/CreateActivityForm';
import EditActivityForm from '../components/EditActivityForm';
import Loading from '../components/Loading';

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [token] = useOutletContext();
    const [updated, setUpdated] = useState(0);
    const [activityToEdit, setActivityToEdit] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);
    const [activitiesTotal, setActivitiesTotal] = useState(0)
    const [formEnabled, setFormEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const renderActivities = async () => {
        const allActivities = await getActivities();
        setActivitiesTotal(allActivities.length);
        const activitiesToDisplay = allActivities.reverse().slice(startIndex, endIndex);
        setActivities(activitiesToDisplay);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    
    useEffect(() => {
        renderActivities();
    }, [updated])

    return <div className="page">
        {
            loading && <Loading />
        }
        {
            token && activityToEdit &&
            <EditActivityForm
                updated={updated}
                setUpdated={setUpdated}
                token={token}
                activityToEdit={activityToEdit}
                setActivityToEdit={setActivityToEdit}
                setLoading={setLoading}
            />
        }
        <h2>Activities</h2>
        <section className="activities">
            {
                activities.map(activity => {
                    return <div key={activity.id} className="activity">
                        <ActivityContent activity={activity}/>
                        {
                            token && 
                            <button type="button" data-id={activity.id} onClick={event => {
                                const id = Number(event.target.getAttribute('data-id'));
                                const activity = activities.filter(activity => activity.id === id);
                                setActivityToEdit(activity[0]);
                            }}>Edit</button>
                        }
                    </div>
                })
            }
        </section>
        <section className="navButtons">
            {
                startIndex !== 0 &&
                <button
                    type="button"
                    className="prev"
                    onClick={() => {
                        setLoading(true);
                        setStartIndex(startIndex - 8);
                        setEndIndex(endIndex - 8);
                        setUpdated(updated + 1);
                    }}
                >{'<<'} Prev</button>
            }
            {
                activitiesTotal - endIndex > 0 &&
                <button 
                    type="button"
                    className="next"
                    onClick={() => {
                        setLoading(true);
                        setStartIndex(startIndex + 8);
                        setEndIndex(endIndex + 8);
                        setUpdated(updated + 1);
                    }}
                >Next {'>>'}</button>
            }
        </section>
        {
            token && <button type="button" className="createButton" onClick={() => {
                setFormEnabled(true);
                setUpdated(updated + 1);
            }}>Create New Activity</button>
        }
        {
            formEnabled &&
            <CreateActivityForm
                updated={updated}
                setUpdated={setUpdated}
                token={token}
                setFormEnabled={setFormEnabled}
                setLoading={setLoading}
            />
        }
    </div>

}

export default Activities;