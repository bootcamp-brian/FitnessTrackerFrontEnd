import { useState, useEffect } from 'react';
import { loginUser } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {    
        if (token) {
            navigate('/home');
        }
    }, [token]);

    const submitLogin = async (event) => {
        event.preventDefault();
        const data = await loginUser({ username, password });
            if (!data.error) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUsername('');
                setPassword('');
                setErrorMessage('');
            } else {
                setErrorMessage(data.message);
            }
    }

    return <div className="page">
        <h2>Login</h2>
        <form className="login" onSubmit={submitLogin}>
            <section>
                <label htmlFor="username">Username:</label>
                <br/>
                <input
                    id="username"
                    type="text"
                    placeholder="enter username..."
                    autoComplete="username"
                    required
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <br/>
                <input
                    id="password"
                    type="password"
                    placeholder="enter password..."
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </section>
            <button type="submit">Login</button>
            <p>{errorMessage}</p>
        </form>
    </div>
}


export default Login;