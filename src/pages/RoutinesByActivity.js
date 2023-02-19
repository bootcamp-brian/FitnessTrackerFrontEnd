import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRoutinesByActivity } from '../utils/API';
import RoutineContent from '../components/RoutineContent';
import Loading from "../components/Loading";

const RoutinesByActivity = () => {
    const [routines, setRoutines] = useState([]);
    const params = useParams();
    const activityId = Number(params.activityId);
    const activityName = params.activityName;
    const [message, setMessage] = useState(null);
    const [updated, setUpdated] = useState(0);
    const [routinesStartIndex, setRoutinesStartIndex] = useState(0);
    const [routinesEndIndex, setRoutinesEndIndex] = useState(3);
    const [routinesTotal, setRoutinesTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const renderRoutines = async () => {
        const newRoutines = await getRoutinesByActivity(activityId);

        if (newRoutines.error) {
            setRoutines([]);
            setMessage('There are no routines with that activity')
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            setRoutinesTotal(newRoutines.length);
            const { activities } = newRoutines[0];
            let namesMatch = false;
    
            for (let activity of activities) {
                if (activity.id === activityId) {
                    if (activity.name === activityName) {
                        namesMatch = true;
                    }
                    break;
                }
            }
            if (!namesMatch) {
                setRoutines([]);
                setMessage('Activity name & id do not match')
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } else {
                const reversedRoutines = newRoutines.reverse();
                const routinesToDisplay = reversedRoutines.slice(routinesStartIndex, routinesEndIndex);
                setRoutines(routinesToDisplay);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
    }
    
    useEffect(() => {
        renderRoutines();
    }, [activityId, updated])

    return <div className="page">
        {
            loading && <Loading />
        }
        {
            !message && <h2>Routines With {activityName}</h2>
        }
        {        
            message ? <h2>{message}</h2>
            : 
            <>
                <section className="routines">
                    {
                        routines.map(routine => {
                            return <div key={routine.id} className="routine">
                                <RoutineContent routine={routine}/>
                            </div>}
                        )
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
            </>
        }
    </div>
}

export default RoutinesByActivity;