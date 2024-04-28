import React, { useState } from "react";
import './SignUp.css';
import axios from "axios";
import { TbEyeClosed } from "react-icons/tb";
import { RxEyeOpen } from "react-icons/rx";
import Home1 from "../Home1";

const SignUp = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); // New state for profile picture
  const [users, setUsers] = useState([]); // State to store fetched users

  const handleName =(e)=>{
    setName(e.target.value);
  };
  const handleLastName =(e)=>{
    setLastName(e.target.value);
  };
  const handleEmail =(e)=>{
    setEmail(e.target.value);
  };
  const handleUserName =(e)=>{
    setUserName(e.target.value);
  };
  const handleOccupation = (e)=>{
    setOccupation(e.target.value)
  };
  const handlePhoneNumber =(e)=>{
    setPhoneNumber(e.target.value);
  };
  const handlePassword =(e)=>{
    setPassword(e.target.value);
    setPasswordError('');
  };
  const handleConfirmPassword =(e)=>{
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]); // Set the selected file
  };

  const handlePost = async () => {
    try {
      if(name.length > 0 && lastName.length > 0 &&
        userName.length > 0 && phoneNumber.length > 0 && 
        email.length > 0 && password.length > 0 &&
        occupation.length > 0
        ){
            // Validate email address format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
              alert('Please enter a valid email address');
              return;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('lastName', lastName);
            formData.append('userName', userName);
            formData.append('phoneNumber', phoneNumber);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('occupation', occupation)
            formData.append('profilePicture', profilePicture);

          await axios.post('http://localhost:7001/api/registration', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart form data
            },
          });
          
          alert('Registration Completed');
          // Reset form fields
          setName("");
          setLastName("");
          setUserName("");
          setPhoneNumber("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setOccupation("");
          setProfilePicture(null);
          
        }else{
          alert('please fill all fields')
        }  
    } catch (error) {
  
      console.error('Error in Registration:', error);
      if(error.message==='Request failed with status code 400'){
        alert('Invalid E-mail, Please Enter the correct E-mail');
      }else if(error.message==='Request failed with status code 500') {
        alert('Taken User-Name, E-mail or Phone-Number')
      }   
    
    }
  };

  return (
    <div className="createAccount-section">
      <div className="create-account-title-icon"> <Home1/><h2 className="account-title-section">Create Account Form</h2></div>
      <div className="main-create-account">
      <div className="sub-create-account">
       <div className="create-label-and-input">
        <label className="create-account-labels">Name*</label>
            <input 
            className="account-inputs" 
            type="text"
            required
            value={name}
            onChange={handleName}
            />
       </div>
        <div className="create-label-and-input">
            <label className="create-account-labels">Last Name*</label>
            <input 
            className="account-inputs" 
            type="text" 
            required
            value={lastName}
            onChange={handleLastName}
            />
        </div>
       <div className="create-label-and-input">
        <label className="create-account-labels">UserName*</label>
            <input 
            className="account-inputs" 
            type="text"
            required
            value={userName}
            onChange={handleUserName}
            />
       </div>
       <div className="create-label-and-input">
        <label className="account-labels">Phone Number*</label>
            <input 
            className="account-inputs" 
            type="text" 
            required
            value={phoneNumber}
            onChange={handlePhoneNumber}
            />
       </div>
        <div className="create-label-and-input">
            <label className="create-account-labels">Email Adress*</label>
            <input 
            className="account-inputs" 
            type="text" 
            required
            value={email}
            onChange={handleEmail}
            />
        </div>
        <div className="create-label-and-input">
            <label >Occupation*</label>
            <select className="occupation-input" value={occupation} type='text' onChange={handleOccupation}>
            <option value="" className="select-occupation-ph">Select an Occupation</option>
            <option value="Administrator">Administrator</option>
            </select>
        </div>
        <div className="create-label-and-input">
            <label className="create-account-labels">Password*</label>
            <div className="password-input-container">
            <input 
                className="password-input" 
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={handlePassword}
            />
             <div className="eye">
                {showPassword ? <RxEyeOpen  onClick={handleTogglePasswordVisibility} /> : <TbEyeClosed onClick={handleTogglePasswordVisibility} />}
             </div>
        </div >
            <label className="descriptions-for-password">
                <p className="password-description-title">Password should contain:</p>
                <p className="password-description">- at least one letter</p>
                <p className="password-description">- at least one number</p>
                <p className="password-description">- at least one special character</p>
                <p className="password-description">- and have length of 8 characters</p>
            </label>
        </div>
        <div className="create-label-and-input">
            <label className="create-account-labels">Confirm Password*</label>
            <input 
            className="account-inputs" 
            type="password" 
            required
            value={confirmPassword}
            onChange={handleConfirmPassword}
            />
        </div>
        <div className="create-label-and-input">
            {passwordError && <p className="error-message">{passwordError}</p>}
            <label className="create-account-labels">Profile Picture</label>
            <input 
            className="create-account-picture" 
            type="file" 
            onChange={handleProfilePicture}
            />
        </div>
        <button onClick={handlePost} className="create-account-buttonn" >Create Account</button>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
