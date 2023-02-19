import { useState, useEffect } from 'react';
import { getRoutines } from '../utils/API';
import RoutineContent from '../components/RoutineContent';
import Loading from '../components/Loading';

const Routines = () => {
    const [routines, setRoutines] = useState([]);
    const [updated, setUpdated] = useState(0);
    const [routinesStartIndex, setRoutinesStartIndex] = useState(0);
    const [routinesEndIndex, setRoutinesEndIndex] = useState(3);
    const [routinesTotal, setRoutinesTotal] = useState(0)
    const [loading, setLoading] = useState(true);

    const renderRoutines = async () => {
        const newRoutines = await getRoutines();
        setRoutinesTotal(newRoutines.length);
        const reversedRoutines = newRoutines.reverse();
        const routinesToDisplay = reversedRoutines.slice(routinesStartIndex, routinesEndIndex);
        setRoutines(routinesToDisplay);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    
    useEffect(() => {
        renderRoutines();
    }, [updated])

    return <div className="page">
        {
            loading && <Loading />
        }
        <h2>Routines</h2>
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
    </div>
}

export default Routines;