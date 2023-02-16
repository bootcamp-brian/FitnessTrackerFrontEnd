import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getRoutines } from '../utils/API';
import RoutineContent from '../components/RoutineContent';

const Routines = () => {
    const [routines, setRoutines] = useState([]);
    const [token] = useOutletContext();
    const { username } = token ? jwt_decode(token) : '';

    // function postMatches(post, text) {
    //     if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
      
    // const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    // const postsToDisplay = searchTerm.length ? filteredPosts : posts;
    
    useEffect(() => {
        const renderRoutines = async () => {
            const newRoutines = await getRoutines();
            setRoutines(newRoutines);
        }
        renderRoutines();
    }, [routines])

    return <div className="page">
        <h2>Routines</h2>
        {/* <SearchPosts token={token} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        <section className="posts">
            {
                routines.map(routine => {
                    return <div key={routine.id} className="routine">
                        <RoutineContent routine={routine}/>
                    </div>}
                )
            }
        </section>
    </div>
}

export default Routines;