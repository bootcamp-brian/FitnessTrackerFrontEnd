import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { deleteRoutine, getActivities, getRoutinesByUser } from '../utils/API';
import RoutineContent from '../components/RoutineContent';
import CreateRoutineForm from '../components/CreateRoutineForm';
import EditRoutineForm from '../components/EditRoutineForm';
import Loading from '../components/Loading';

const MyRoutines = () => {
    const [routines, setRoutines] = useState([]);
    const [token] = useOutletContext();
    const [routineToEdit, setRoutineToEdit] = useState(null)
    const { username } = token ? jwt_decode(token) : '';
    const navigate = useNavigate();
    const [updated, setUpdated] = useState(0);
    const [routinesStartIndex, setRoutinesStartIndex] = useState(0);
    const [routinesEndIndex, setRoutinesEndIndex] = useState(3);
    const [routinesTotal, setRoutinesTotal] = useState(0)
    const [formEnabled, setFormEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allActivities, setAllActivities] = useState([]);

    const renderRoutines = async () => {
        const activities = await getActivities();
        setAllActivities(activities);
        const newRoutines = await getRoutinesByUser(username, token);
        setRoutinesTotal(newRoutines.length);
        const reversedRoutines = newRoutines.reverse();
        const routinesToDisplay = reversedRoutines.slice(routinesStartIndex, routinesEndIndex);
        setRoutines(routinesToDisplay);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        if (!token) {
            navigate('/home');
        }
        renderRoutines();
    }, [updated])


    return <div className="page">
        {
            loading && <Loading />
        }
        {/* {
            !routineToEdit && <> */}
                <h2>My Routines</h2>
                <section className="routines">
                    {/* <RoutineHeaders /> */}
                    {
                        routines.map(routine => {
                            return <div key={routine.id} className="routine">
                                <RoutineContent routine={routine} />
                                <section className="routineButtons">
                                    <button
                                        className="editButton"
                                        type="button"
                                        data-id={routine.id}
                                        onClick={event => {
                                            const id = Number(event.target.getAttribute('data-id'));
                                            const routine = routines.filter(routine => routine.id === id);
                                            setRoutineToEdit(routine[0]);
                                            setUpdated(updated + 1);
                                        }}
                                    >Edit</button>
                                    <button
                                        className="deleteButton"
                                        type="button"
                                        data-id={routine.id}
                                        onClick={async (event) => {
                                            setLoading(true);
                                            const routineId = Number(event.target.getAttribute('data-id'));
                                            await deleteRoutine(token, routineId);
                                            setUpdated(updated + 1);
                                        }}
                                    >Delete</button>
                                </section>
                            </div>
                        })
                    }
                </section>
                <section className="navButtons">
                    {
                        routinesStartIndex !== 0 &&
                        <button
                            type="button"
                            className="prev"
                            onClick={() => {
                                setLoading(true);
                                setRoutinesStartIndex(routinesStartIndex - 3);
                                setRoutinesEndIndex(routinesEndIndex - 3);
                                setUpdated(updated + 1);
                            }}
                        >{'<<'} Prev</button>
                    }
                    {
                        routinesTotal - routinesEndIndex > 0 &&
                        <button 
                            type="button"
                            className="next"
                            onClick={() => {
                                setLoading(true);
                                setRoutinesStartIndex(routinesStartIndex + 3);
                                setRoutinesEndIndex(routinesEndIndex + 3);
                                setUpdated(updated + 1);
                            }}
                        >Next {'>>'}</button>
                    }
                </section>
                {
                    token && <button type="button" className="createButton" onClick={() => {
                        setFormEnabled(true);
                        setUpdated(updated + 1);
                    }}>Create New Routine</button>
                }
            {/* </>
        } */}
        {
            formEnabled && <CreateRoutineForm
                updated={updated}
                setUpdated={setUpdated}
                token={token}
                setFormEnabled={setFormEnabled}
                setLoading={setLoading}
            />
        }
        {
            routineToEdit && <EditRoutineForm
                updated={updated}
                setUpdated={setUpdated}
                token={token}
                routineToEdit={routineToEdit}
                setRoutineToEdit={setRoutineToEdit}
                allActivities={allActivities} 
                setLoading={setLoading}
            />
        }
    </div>
}
export default MyRoutines;