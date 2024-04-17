import axios from "axios";
import React, { useEffect, useState } from "react";
import './Buyers.css'; // You can create your CSS file for styling
import { IoSearchSharp } from "react-icons/io5";

const Buyer = () => {
    const [buyerList, setBuyerList] = useState([]);
    const [showBuyerForm, setShowBuyerForm] = useState(false);
    const [formData, setFormData] = useState({
        buyer_type: '',
        buyer_name: '',
        buyer_address: '',
        contact_number: '',
        email: '',
        registration_date: '',
    });

    useEffect(() => {
        fetchBuyers();
    }, []);

    const fetchBuyers = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/buyers');
            setBuyerList(response.data);
        } catch (error) {
            console.error('Error fetching buyers:', error);
        }
    };

    const handleAddBuyerClick = () => {
        setShowBuyerForm(true);
    };

    const handleCloseBuyerForm = () => {
        setShowBuyerForm(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        // Perform form validation here
        // Return true if form is valid, false otherwise
        // Example: Check if required fields are filled
        if (!formData.buyer_type || !formData.buyer_name || !formData.registration_date) {
            alert('Please fill in all required fields.');
            return false;
        }

        // Add more validation rules as needed

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Perform form validation
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:7001/api/buyers', formData);
            console.log('Buyer added successfully:', response.data);
            fetchBuyers();
            setFormData({
                buyer_type: '',
                buyer_name: '',
                buyer_address: '',
                contact_number: '',
                email: '',
                registration_date: '',
            });
            setShowBuyerForm(false);
        } catch (error) {
            console.error('Error adding buyer:', error);
        }
    };

    return (
        <div className="buyer-container">
            <div className="buyer-home-and-sort-title">
                <h2 className="buyer-heading">Buyer Management</h2>
            </div>
            <div className="buyer-search-and-export">
                <div className="search-container">
                    <IoSearchSharp className="search-icon"/>
                    <input
                        id="searchInput"
                        className="buyer-search-input"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <table className="main-buyer-table">
                <thead>
                <tr>
                    <th className="buyer-thead">Buyer Type</th>
                    <th className="buyer-thead">Buyer Name</th>
                    <th className="buyer-thead">Buyer Address</th>
                    <th className="buyer-thead">Contact Number</th>
                    <th className="buyer-thead">Email</th>
                    <th className="buyer-thead">Registration Date</th>
                </tr>
                </thead>
                <tbody>
                {buyerList.map((buyer) => (
                    <tr key={buyer.buyer_id}>
                        <td className="buyer-table-fields">{buyer.buyer_type}</td>
                        <td className="buyer-table-fields">{buyer.buyer_name}</td>
                        <td className="buyer-table-fields">{buyer.buyer_address}</td>
                        <td className="buyer-table-fields">{buyer.contact_number}</td>
                        <td className="buyer-table-fields">{buyer.email}</td>
                        <td className="buyer-table-fields">{new Date(buyer.registration_date).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showBuyerForm && (
                <div className='detailed-view-buyer-form'>
                    <div className='detail-description-detailed-buyer-form'>
                        <div className='buyer-form-title'>Add Buyer</div>
                        <div className="buyer-form">
                            <label className="buyer-form-label">
                                Buyer Type:
                                <input
                                    type="text"
                                    name="buyer_type"
                                    value={formData.buyer_type}
                                    onChange={handleChange}
                                    className="buyer-form-input"
                                />
                            </label>
                            <label className="buyer-form-label">
                                Buyer Name:
                                <input
                                    type="text"
                                    name="buyer_name"
                                    value={formData.buyer_name}
                                    onChange={handleChange}
                                    className="buyer-form-input"
                                />
                            </label>
                            <label className="buyer-form-label">
                                Buyer Address:
                                <input
                                    type="text"
                                    name="buyer_address"
                                    value={formData.buyer_address}
                                    onChange={handleChange}
                                    className="buyer-form-input"
                                />
                            </label>
                            <label className="buyer-form-label">
                                Contact Number:
                                <input
                                    type="text"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    className="buyer-form-input"
                                />
                            </label>
                            <label className="buyer-form-label">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="buyer-form-input"
                                />
                            </label>
                            <label className="buyer-form-label">
                                Registration Date:
                                <input
                                    type="date"
                                    name="registration_date"
                                    value={formData.registration_date}
                                    onChange={handleChange}
                                    className="buyer-form-input"
                                />
                            </label>
                        </div>
                        <button type="button" onClick={handleSubmit} className="buyer-form-submit-btn">Submit</button>
                        <button onClick={handleCloseBuyerForm} className='buyer-form-close-button'>Close</button>
                    </div>
                </div>
            )}

            <button className="add-buyer-button" onClick={handleAddBuyerClick}>Add Buyer</button>
        </div>
    );
}

export default Buyer;
