import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRoutinesByUser } from '../utils/API';
import RoutineContent from '../components/RoutineContent';
import RoutineHeaders from '../components/RoutineHeaders';

const RoutinesByUser = () => {
    const [routines, setRoutines] = useState([]);
    const params = useParams();
    const username = params.username;
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
        const newRoutines = await getRoutinesByUser(username, null);
                
        if (newRoutines.error) {
            setRoutines([]);
            setMessage("That user doesn't exist")
        } else {
            setRoutines(newRoutines);
        }
    }
    
    useEffect(() => {
        renderRoutines();
    }, [username])

    return <div className="page">
        {
            !message && <h2>Routines created by {username}</h2>
        }
        {/* <SearchPosts token={token} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        {
            message ? <h2>{message}</h2> : <section className="routines">
                <RoutineHeaders />
                {
                    message ? <h2>{message}</h2> :
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

export default RoutinesByUser;