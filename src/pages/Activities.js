import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getActivities } from '../utils/API';
import ActivityContent from '../components/ActivityContent';
import CreateActivityForm from '../components/CreateActivityForm';
import EditActivityForm from '../components/EditActivityForm';

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [token] = useOutletContext();
    const [updated, setUpdated] = useState(0);
    const [activityToEdit, setActivityToEdit] = useState(null);

    // function postMatches(post, text) {
    //     if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
      
    // const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    // const postsToDisplay = searchTerm.length ? filteredPosts : posts;
    
    const renderActivities = async () => {
        const newActivities = await getActivities();
        setActivities(newActivities);
    }
    
    useEffect(() => {
        renderActivities();
    }, [updated])

    return <div className="page">
        {
            token && activityToEdit && <EditActivityForm updated={updated} setUpdated={setUpdated} token={token} activityToEdit={activityToEdit} setActivityToEdit={setActivityToEdit} />
        }
        {
            token && <CreateActivityForm updated={updated} setUpdated={setUpdated} token={token} />
        }
        <h2>Activities</h2>
        {/* <SearchPosts token={token} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
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
    </div>

}

export default Activities;