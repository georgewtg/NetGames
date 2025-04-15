import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logoSBD.png';
import './Navbar.css';

export default function Navbar() {
    const [cookies, setCookies] = useCookies(["username", "isLoggedIn", "score"]);
    
    const handleLogout = () => {
        setCookies('score', 0, { path: '/' });
        setCookies('isLoggedIn', false, { path: '/' });
    };

    return (
        <div className="topnav">
            <div className="topnav-left">
                <span className="title">NetGames</span>
                <NavLink to="/game" className={({ isActive }) => isActive ? "active" : ""}>Play</NavLink>
                <NavLink to="/post" className={({ isActive }) => isActive ? "active" : ""}>Scores</NavLink>
            </div>
            <div className="topnav-right">
                <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                <span className="username">{cookies.username}</span>
                <img src={logo} style={{width:'80px'}}></img>
            </div>
        </div>
    );
}
