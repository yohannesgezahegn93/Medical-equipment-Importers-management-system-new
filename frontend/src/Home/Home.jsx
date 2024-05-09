import React from "react";
import './Home.css';
import { FaShoppingCart } from "react-icons/fa"; // Procurement
import { IoNotificationsOutline } from "react-icons/io5"; // Calibration
import { GrSchedule } from "react-icons/gr"; // Maintenance
import { MdAssignment } from "react-icons/md"; // Specification
import { FaChalkboardTeacher } from "react-icons/fa"; // Training
import { Link } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";

import AnalyticalData from "../AnalyticalData/AnalayticalData";
import Home1 from "../Home1";



const Homee = () => {
  return (
    <div className="A">
      <div className="B">
        <div className="C"> 
          <h2 className="D"><Home1/>Dashboard</h2>
        </div>
        <AnalyticalData/>
      </div>
    </div>
  );
}

export default Homee;