import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRoutinesByActivity } from '../utils/API';
import RoutineContent from '../components/RoutineContent';
import RoutineHeaders from '../components/RoutineHeaders';

const RoutinesByActivity = () => {
    const [routines, setRoutines] = useState([]);
    const params = useParams();
    const activityId = Number(params.activityId);
    const activityName = params.activityName;
    const [message, setMessage] = useState(null);

    // function postMatches(post, text) {
    //     if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
      
    // const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    // const postsToDisplay = searchTerm.length ? filteredPosts : posts;
    
    const renderRoutines = async () => {
        const newRoutines = await getRoutinesByActivity(activityId);
        
        if (newRoutines.error) {
            setRoutines([]);
            setMessage('There are no routines with that activity')
        } else {
            setRoutines(newRoutines);
        }
    }
    
    useEffect(() => {
        renderRoutines();
    }, [activityId])

    return <div className="page">
        {
            !message && <h2>Routines With {activityName}</h2>
        }
        {/* <SearchPosts token={token} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        {        
            message ? <h2>{message}</h2> : <section className="routines">
                <RoutineHeaders />
                {
                    routines.map(routine => {
                        return <div key={routine.id} className="routine">
                            <RoutineContent routine={routine}/>
                        </div>}
                    )
                }
            </section>
        }
    </div>
}

export default RoutinesByActivity;