import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './UserInfo.css';
import axios from 'axios';


const UserInfo = () => {
  const { user } = useSelector(state => state.user);
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    if (user && JSON.stringify(user) !== JSON.stringify(userData)) {
      setUserData(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user, userData]);
  useEffect(() => {
    if (!userData && user && user.id) {
      getUserById(user.id);
    }
  }, [userData, user]);

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:7001/api/registration/${userId}`);
      setUserData(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  console.log('User:', user);
  console.log('UserData:', userData);

  return (
    <div className='logged-in-user-information'>
      {userData && (
        <div className='logged-in-description'>
          <img className='profile-image' src={`http://localhost:7001/${userData.profilePicture}`} alt='profile' />
          <div className='log-in'>
            <p className='name-and-lastname'>{userData.name}</p>
            <p className='user-name'>{userData.occupation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
