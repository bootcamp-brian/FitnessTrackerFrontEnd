import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getRoutinesByUser } from '../utils/API';
import RoutineContent from '../components/RoutineContent';
import CreateRoutineForm from '../components/CreateRoutineForm';
import RoutineHeaders from '../components/RoutineHeaders';
import EditRoutineForm from '../components/EditRoutineForm';

const MyRoutines = () => {
    const [routines, setRoutines] = useState([]);
    const [token] = useOutletContext();
    const [editEnabled, setEditEnabled] = useState(false);
    const [routineToEdit, setRoutineToEdit] = useState(null)
    const { username } = token ? jwt_decode(token) : '';
    const navigate = useNavigate();
    const [updated, setUpdated] = useState(0);

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
        const newRoutines = await getRoutinesByUser(username, token);
        setRoutines(newRoutines);
    }

    useEffect(() => {
        console.log('test')
        if (!token) {
            navigate('/home');
        }
        renderRoutines();
    }, [token, updated])


    return <div className="page">
        {
            routineToEdit ? <EditRoutineForm updated={updated} setUpdated={setUpdated} token={token} routineToEdit={routineToEdit} setRoutineToEdit={setRoutineToEdit} />
            : <CreateRoutineForm updated={updated} setUpdated={setUpdated} token={token} />
        }
        <h2>My Routines</h2>
        {/* <SearchPosts token={token} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        <section className="routines">
            <RoutineHeaders />
            {
                routines.map(routine => {
                    return <div key={routine.id} className="routine">
                        <RoutineContent routine={routine} />
                        <button type="button" data-id={routine.id} onClick={event => {
                            const id = Number(event.target.getAttribute('data-id'));
                            const routine = routines.filter(routine => routine.id === id);
                            setRoutineToEdit(routine[0]);
                        }}>Edit</button>
                    </div>}
                )
            }
        </section>
    </div>
}
export default MyRoutines;