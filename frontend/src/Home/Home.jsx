import React from "react";
import './Home.css';
import { FaShoppingCart } from "react-icons/fa"; // Procurement
import { IoNotificationsOutline } from "react-icons/io5"; // Calibration
import { GrSchedule } from "react-icons/gr"; // Maintenance
import { MdAssignment } from "react-icons/md"; // Specification
import { FaChalkboardTeacher } from "react-icons/fa"; // Training
import { Link } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';
import { MdPeople } from "react-icons/md";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";

import AnalyticalData from "../AnalyticalData/AnalayticalData";



const Home = () => {
  return (
    <div className="main-class-request-options">
      <div className="right-part">
        <div className="the-navigation-main-class-requestss">
         
          <h2 className="the-request-title">Medical equipment Importers management system</h2>
          
        </div>
        <div className="sub-class-requestss">
          <Link to="stock" className="my-link">
            <div className="procurementt">
              <FaShoppingCart className="Request_options-icons" />
              Stock
            </div>
          </Link>
           {/*<Link to="buyers" className="my-link">
           <div className="calibrationn">
              <IoNotificationsOutline className="Request_options-icons" />
               Buyers
            </div>
          </Link>
        */}
          <Link to="customers" className="my-link">
            <div className="maintenancee">
              <MdPeople className="Request_options-icons" />
              Customers
            </div>
          </Link>
          

          <Link to="suppliers" className="my-link">
            <div className="specificationn">
              <MdAssignment className="Request_options-icons" />
              Suppliers
            </div>
          </Link>
          <Link to="sales" className="my-link">
            <div className="trainingg">
              <FaShopify className="Request_options-icons" />
              Sales
            </div>
          </Link>
          <Link to="payment" className="my-link">
            <div className="installationn">
              <FaCcAmazonPay  className="Request_options-icons" />
              Payment
            </div>
          </Link>
          
        </div>
        <AnalyticalData/>
      </div>
    </div>
  );
}

export default Home;