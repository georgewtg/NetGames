import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Login.css";
import { loginUser } from '../actions/User.actions';

export default function Login() {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["user_id", "username", "isLoggedIn", "score"]);
  const [formData, setFormData] = useState({
    username: cookies.username || '',
    password: '',
  });

  useEffect(() => {
    if (cookies.isLoggedIn) {
      navigate('/game');
    }
  }, [cookies.isLoggedIn, navigate]);

  const change = e => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  }

  const submitData = (event) => {
    event.preventDefault();
    console.log("formData:", formData);
    
    loginUser(formData)
    .then((response) => {
      if (response.data) {
        console.log(response);
        setCookies("user_id", response.data._id, { path: '/' });
        setCookies("username", response.data.username, { path: '/' });
        setCookies("isLoggedIn", true, { path: '/' });
        setCookies("score", 0, { path: '/' });
        navigate("/game");
      } else {
        alert("Failed to Login!");
      }
    })
    .catch((error) => {
      console.error(error.message);
      alert("Login Failed!");
    });
  }

  
  return (
    <>
      <div className="container" style={{maxWidth: '440px'}}>
        <div className="wrapper">
          <div className="title"><span>Login Form</span></div>
          <form onSubmit={submitData}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input name="username" type="text" onChange={change} value={formData.username} placeholder="Username" required />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input name="password" type="password" onChange={change} value={formData.password} placeholder="Password" required />
            </div>
            {/* <div className="pass"><a href="#">Forgot password?</a></div> */}
            <div className="row button">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">Not a member? <a href="SignUp">Signup now</a></div>
          </form>
        </div>
      </div>
    </>
  );
}