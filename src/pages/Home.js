import { Link, useOutletContext } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const Home = () => {
    const [token] = useOutletContext();
    const { username } = token ? jwt_decode(token) : '';

    return <div className="page">
        <p className="welcome">
            Welcome to
            <br/>
            <span className="fitnesstrackr">FITNESS TRACK.R</span>
            <br/>
            The site for all your fitness tracking needs.
            <br/>
            <br/>
            <br/>
            {
                !token ? <>
                    If you'd like to sign up to use our services, please head over to the <Link to="/register">Register</Link> page.
                    <br/>
                    Already a member? Login <Link to="/login">here</Link>.
                </>
                :
                <>
                    Hi {username}!
                    <br/>
                    <br/>
                    Want to see a list of activities? Check out our <Link to="/activities">Activities</Link> page.
                    <br/>
                    <br/>
                    Interested in what kind of routines people have come up with? Head over to <Link to="/routines">Routines</Link>.
                    <br/>
                    <br/>
                    Need to manage your own routines? Everything you need is at <Link to="/myroutines">My Routines</Link>.
                </>
            }
        </p>
    </div>
}

export default Home;