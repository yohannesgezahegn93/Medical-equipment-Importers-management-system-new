import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './signIn.css';
import axios from 'axios';
import { MdAccountCircle } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { RxEyeOpen } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { setUser } from '../StateManagement/actions/userActions';
import { jwtDecode } from "jwt-decode";


const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      if (!userName || !email || !password) {
        alert('Please fill all fields');
        return;
      }
    
      const response = await axios.post('http://localhost:7001/api/registration/login', { userName, email, password });
     console.log(response.error);
      
      const authToken = response.data.token;
      const decoded = jwtDecode(authToken); // Use the decode function
      localStorage.setItem('authToken', authToken);
      // Dispatch the decoded token to Redux (if needed)
      dispatch(setUser(decoded));
      
      if(decoded.occupation === 'Administrator'){
        navigate('/Home');
      }else{
        navigate('/SignIn')
      }
      setUserName('');
      setEmail('');
      setPassword('');

    } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            
            alert('INVALID CREDENTIALS'); // Show the error message to the user
          } else if (error.response.status === 500) {
            alert('Internal server error. Please try again later.');
          }
        } else if (error.request) {
          // Handle request error
          alert('Error making request. Please check your network connection.');
        } else {
          // Handle other errors
          alert('An error occurred. Please try again later.');
        }
      }
    };

  return (
    <div className="container">
      <div className="mainer">
        <div className="login-icon-container"><MdAccountCircle className="account-icon"/></div>
      <h1 className="login-title">Log In</h1>
      <div className="sign-in-container">
          <div className="icon-and-input">
          <FaUser className="side-icons"/>
          <input
            className="input-login"
            type="userName"
            required
            placeholder="Enter your User Name"
            value={userName}
            onChange={handleUserName}
          ></input>
          </div>
          <div className="icon-and-input">
          <MdLocalPostOffice  className="side-icons-mail"/>
          <input
            className="input-login"
            type="email"
            required
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmail}
          ></input>
          </div>
          <div className="icon-and-input">
          <FaLock className="side-icons"/>
          <div className="password-and-eye">
            <input
            className="input-login"
            type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              required
              onChange={handlePassword}
            ></input>
            <div className="net-eye">
              {showPassword ? <RxEyeOpen  onClick={handleTogglePasswordVisibility} /> : <TbEyeClosed onClick={handleTogglePasswordVisibility} />}
            </div>
          </div>
          </div>
            <button className="sign-in-button" onClick={handleLogin}>Log In</button>
            <Link className="sign-in-button" to='/SignUp'>sign up</Link>

            
        </div>
      </div>
    </div>
  );
};
export default SignIn;
