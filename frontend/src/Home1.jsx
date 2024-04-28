//Home.jsx
import React, { useState } from 'react';
import './Home1.css';
import { IoIosHome } from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import UserInfo from './StateManagement/UserInfo';
import LogOut from './auth/LogOut';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { FaFileContract,FaFileAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaMicrophone } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa"; // Procurement
import { IoNotificationsOutline } from "react-icons/io5"; // Calibration
import { GrSchedule } from "react-icons/gr"; // Maintenance
import { MdAssignment } from "react-icons/md"; // Specification
import { FaChalkboardTeacher } from "react-icons/fa"; // Training
import { Link } from "react-router-dom";
import { MdPeople } from "react-icons/md";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";





const Home1 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return ( 
    <div className='dodo'>
      <FaBars onClick={toggleSidebar}  className='hum-button-head'/>
      <div className={`main-manu-head ${sidebarOpen ? 'open' : ''}`}>
        <div className='section-one'>
          <div onClick={toggleSidebar}><CiLogout className='close-button'/></div>
          <div className='profile-picture'>
            <UserInfo/>
          </div>
        </div>
        <nav className='home-nav-bar'>
        <Link className='link' to='/Home'><div className='main-lists'><MdDashboard className='icons'/><div>Dashboard</div></div></Link> 
          <Link className='link' to='/stock'><div className='main-lists'><FaShoppingCart className='icons'/><div>Stock</div></div></Link> 
          <Link className='link' to='/customers'><div className='main-lists'><MdPeople className='icons'/><div>Customers</div></div></Link> 
          <Link className='link' to='/suppliers'><div className='main-lists'><MdAssignment className='icons'/><div>Suppliers</div></div></Link> 
          <Link className='link' to='/sales'><div className='main-lists'><FaShopify className='icons'/><div>Sales</div></div></Link>
          <Link className='link' to='/payment'><div className='main-lists'><FaCcAmazonPay className='icons'/><div>Payment</div></div></Link>
          <Link className='link' to='/SignUp'><div className='main-lists'><MdAccountBox className='icons'/><div>Create Account</div></div></Link>
        </nav>
         <LogOut/>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Home1;
