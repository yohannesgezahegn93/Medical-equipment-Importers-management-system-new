import axios from "axios";
import React, { useEffect, useState } from "react";
import './Customers.css';
import { IoSearchSharp } from "react-icons/io5";

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [formData, setFormData] = useState({
      customer_name: '',
      customer_type: '',
      customer_address: '',
      contact_number: '',
      email: '',
      registration_date: '',
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/customers');
            setCustomerList(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleAddCustomerClick = () => {
      setShowCustomerForm(true);
    };

    const handleCloseCustomerForm = () => {
      setShowCustomerForm(false);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
      if (!formData.customer_name || !formData.customer_address || !formData.contact_number || !formData.email || !formData.registration_date) {
          alert('Please fill in all required fields.');
          return false;
      }

      return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
          return;
      }

      try {
          const response = await axios.post('http://localhost:7001/api/customers', formData);
          console.log('Customer added successfully:', response.data);
          fetchCustomers();
          setFormData({
              customer_name: '',
              customer_type:'',
              customer_address: '',
              contact_number: '',
              email: '',
              registration_date: '',
          });
          setShowCustomerForm(false);
      } catch (error) {
          console.error('Error adding customer:', error);
      }
  };

    return (
        <div className="customer-container">
            <div className="customer-home-and-sort-title">
                <h2 className="customer-heading">Customer Management</h2>
            </div>
            <div className="customer-search-and-export">
                <div className="search-container">
                    <IoSearchSharp className="search-icon"/>
                    <input
                        id="searchInput"
                        className="customer-search-input"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <table className="main-customer-table">
                <thead >
                    <tr >
                        <th className="customer-thead">Customer ID</th>
                        <th className="customer-thead">Customer Name</th>
                        <th className="customer-thead">Customer Type</th>
                        <th className="customer-thead">Customer Address</th>
                        <th className="customer-thead">Contact Number</th>
                        <th className="customer-thead">Email</th>
                        <th className="customer-thead">Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td className="customer-table-fields">{customer.customer_id}</td>
                            <td className="customer-table-fields">{customer.customer_name}</td>
                            <td className="customer-table-fields">{customer.customer_type}</td>
                            <td className="customer-table-fields">{customer.customer_address}</td>
                            <td className="customer-table-fields">{customer.contact_number}</td>
                            <td className="customer-table-fields">{customer.email}</td>
                            <td className="customer-table-fields">{new Date(customer.registration_date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                            })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showCustomerForm && (
                <div className='detailed-view-customer-form'>
                    <div className='detail-description-detailed-customer-form'>
                        <div className='customer-form-title' >Add Customer</div>
                        <div className="customer-form">
                            <label className="customer-form-label">
                                Customer Name:
                                <input
                                    type="text"
                                    name="customer_name"
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                    className="customer-form-input"
                                />
                            </label>
                            <label className="buyer-form-label">
                                Customer Type:
                                <select
                                    name="customer_type"
                                    value={formData.customer_type}
                                    onChange={handleChange}
                                    className="customer-form-input"
                                >
                                    <option value="Wholesaler">Wholesaler</option>
                                    <option value="End User">End User</option>
                                </select>
                            </label>

                            <label className="customer-form-label">
                                Customer Address:
                                <input
                                    type="text"
                                    name="customer_address"
                                    value={formData.customer_address}
                                    onChange={handleChange}
                                    className="customer-form-input"
                                />
                            </label>
                            <label className="customer-form-label">
                                Contact Number:
                                <input
                                    type="text"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    className="customer-form-input"
                                />
                            </label>
                            <label className="customer-form-label">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="customer-form-input"
                                />
                            </label>
                            <label className="customer-form-label">
                                Registration Date:
                                <input
                                    type="date"
                                    name="registration_date"
                                    value={formData.registration_date}
                                    onChange={handleChange}
                                    className="customer-form-input"
                                />
                            </label>
                        </div>
                        <button type="button" onClick={handleSubmit} className="customer-form-submit-btn">Submit</button>
                        <button onClick={handleCloseCustomerForm} className='customer-form-close-button'>Close</button>
                    </div>
                </div>
            )}
            <button className="add-customer-button" onClick={handleAddCustomerClick}>Add Customer</button>
        </div>
    );
}

export default Customer;
