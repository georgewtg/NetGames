import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './SignUp.css';
import { signUpUser } from "../actions/User.actions";

export default function SignUp() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['isLoggedIn']);

  useEffect(() => {
    if (cookies.isLoggedIn) {
      navigate('/game');
    }
  }, [cookies.isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const change = e => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  }

  const submitData = (event) => {
    event.preventDefault();
    console.log("formData:", formData);
    
    signUpUser(formData)
    .then((response) => {
      if (response.data != null) {
        alert("Successfully registered account");
        navigate("/");
      } else {
        alert("Failed to register account!");
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

  return (
    <>
      <div className="container" style={{maxWidth: '440px'}}>
        <div className="wrapper">
          <div className="title"><span>Register Form</span></div>
          <form onSubmit={submitData}>
          <div className="row">
              <i className="fas fa-user"></i>
              <input name="username" type="text" onChange={change} value={formData.username} placeholder="Username" required />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input name="password" type="password" onChange={change} value={formData.password} placeholder="Password" required />
            </div>
            <div className="row button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
