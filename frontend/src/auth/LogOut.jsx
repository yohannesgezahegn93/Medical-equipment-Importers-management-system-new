import React from "react";
import { useNavigate } from "react-router-dom";
import './LogOut.css'
import { CiLogout } from "react-icons/ci";


const LogOut = () => {
    const navigate = useNavigate();
    const handleLogOut = () =>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/');
    }
    return ( 
        <div>
            <button className="Log-out-button" onClick={handleLogOut}>Log Out</button>
        </div>
     );
}
export default LogOut;