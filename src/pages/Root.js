import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const location = useLocation();
    const page = location.pathname;

    useEffect(() => {    
        if (page === "/") {
            navigate("/home");
        }
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setToken('');
    }

    return (
        <>
            <header>
                <nav>
                    <ul>
                        {
                            page !== "/home" && <Link to="home">Home</Link>
                        }
                        {
                            page !== "/activities" && <Link to="activities">Activities</Link>
                        }
                        {
                            page !== "/routines" && <Link to="routines">Routines</Link>
                        }
                        {
                            token && page !== "/myroutines" && <Link to="myroutines">My Routines</Link>
                        }
                        {
                            token && <Link onClick={logout} to="/home">Logout</Link>
                        }
                        {
                            !token && page !== "/register" && <Link to="register">Register</Link>
                        }
                        {
                            !token && page !== "/login" && <Link to="login">Login</Link>
                        }
                        
                    </ul>
                </nav>
            </header>
            <section className="logo">
                <h1>FITNESS TRACK.R</h1>
            </section>
            <Outlet context={[token, setToken]}/>
        </> 
    );
}