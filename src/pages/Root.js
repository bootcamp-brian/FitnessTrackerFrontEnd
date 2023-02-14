import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    function logout() {
        localStorage.removeItem('token');
        setToken('');
    }

    return (
        <>
            <header>
                <nav>
                    <ul>
                            <Link to="activities">Activities</Link>
                            <Link to="routines">Routines</Link>
                        {
                            token && <>
                                <Link to="myroutines">My Routines</Link>
                                <Link className ="lastNav" onClick={logout} to="/">Logout</Link>
                            </>
                        }
                        {
                            !token && <>
                                <Link to="register">Register</Link>
                                <Link className="lastNav" to="login">Login</Link>
                            </>
                        }
                    </ul>
                </nav>
                <section className="logo">
                    <h1>Fitness Trac.kr</h1>
                </section>
            </header>
            <Outlet context={[token, setToken]}/>
        </> 
    );
}