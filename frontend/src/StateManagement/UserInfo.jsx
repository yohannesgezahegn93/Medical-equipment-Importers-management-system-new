import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './UserInfo.css';
import axios from 'axios';

const UserInfo = () => {
  const { user } = useSelector(state => state.user);
  const [userData, setUserData] = useState(() => {
    // Retrieve user data from local storage on component mount
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    if (user && JSON.stringify(user) !== JSON.stringify(userData)) {
      // Update userData state when user changes
      setUserData(user);

      // Update local storage with new user data
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user, userData]);

  useEffect(() => {
    // Fetch user data from server when userData is null (component mounts)
    if (!userData && user && user.id) {
      getUserById(user.id);
    }
  }, [userData, user]);

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:7001/api/registration/${userId}`);
      setUserData(response.data);
      // Update local storage with fetched user data
      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user:', error);
      // Optionally, you can set userData to null here to trigger a retry or display an error message in the UI
    }
  };

  // Debugging statements
  console.log('User:', user);
  console.log('UserData:', userData);

  return (
    <div className='logged-in-user-information'>
      {userData && (
        <div className='logged-in-description-section'>
          <img className='profile-image' src={`http://localhost:7001/${userData.profilePicture}`} alt='Profile' />
          <div className='log-in-description'>
            <p className='name-and-lastname'>{userData.name}</p>
            <p className='user-name'>{userData.occupation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
