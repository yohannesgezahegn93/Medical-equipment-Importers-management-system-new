import axios from "axios";
import React, { useEffect, useState } from "react";
import './Payment.css';
import { IoSearchSharp } from "react-icons/io5";
import Select from 'react-select';

const Payment = () => {
    const [paymentList, setPaymentList] = useState([]);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [formData, setFormData] = useState({
      amount: '',
      payment_date: '',
      status: '',
      customer_id: '',
    });

    useEffect(() => {
        fetchPayments();
        fetchCustomerOptions();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/payments');
            setPaymentList(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };
    const fetchCustomerOptions = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/customers');
            const options = response.data.map(customer => ({
                value: customer.customer_id,
                label: `${customer.customer_name} - ${customer.customer_id}` // Display customer name and ID
            }));
            setCustomerOptions(options);
        } catch (error) {
            console.error('Error fetching customer options:', error);
        }
    };

    const handleAddPaymentClick = () => {
      setShowPaymentForm(true);
    };

    const handleClosePaymentForm = () => {
      setShowPaymentForm(false);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleCustomerChange = (selectedOption) => {
        setFormData({ ...formData, customer_id: selectedOption.value });
    };
    

    const validateForm = () => {
      if (!formData.amount || !formData.payment_date || !formData.status) {
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
          const response = await axios.post('http://localhost:7001/api/payments', formData);
          console.log('Payment added successfully:', response.data);
          fetchPayments();
          setFormData({
              amount: '',
              payment_date: '',
              status: '',
              customer_id: '',
          });
          setShowPaymentForm(false);
      } catch (error) {
          console.error('Error adding payment:', error);
      }
  };

    return (
        <div className="payment-container">
            <div className="payment-home-and-sort-title">
                <h2 className="payment-heading">Payment Management</h2>
            </div>
            <div className="payment-search-and-export">
                <div className="search-container">
                    <IoSearchSharp className="search-icon"/>
                    <input
                        id="searchInput"
                        className="payment-search-input"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <table className="main-payment-table">
                <thead >
                    <tr >
                        <th className="payment-thead">Payment ID</th>
                        <th className="payment-thead">Amount</th>
                        <th className="payment-thead">Payment Date</th>
                        <th className="payment-thead">Status</th>
                        <th className="payment-thead">Customer ID</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentList.map((payment) => (
                        <tr key={payment.payment_id}>
                            <td className="payment-table-fields">{payment.payment_id}</td>
                            <td className="payment-table-fields">{payment.amount}</td>
                            <td className="payment-table-fields">{new Date(payment.payment_date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                            })}</td>
                            <td className="payment-table-fields">{payment.status}</td>
                            <td className="payment-table-fields">{payment.customer_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPaymentForm && (
                <div className='detailed-view-payment-form'>
                    <div className='detail-description-detailed-payment-form'>
                        <div className='payment-form-title' >Add Payment</div>
                        <div className="payment-form">
                            <label className="payment-form-label">
                                Amount:
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="payment-form-input"
                                />
                            </label>
                            <label className="payment-form-label">
                                Payment Date:
                                <input
                                    type="date"
                                    name="payment_date"
                                    value={formData.payment_date}
                                    onChange={handleChange}
                                    className="payment-form-input"
                                />
                            </label>
                            <label className="payment-form-label">
                                Status:
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="payment-form-input"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </label>
                            <label className="payment-form-label">
                                Customer ID:
                                <Select
                                    value={customerOptions.find(option => option.value === formData.customer_id)}
                                    onChange={handleCustomerChange}
                                    options={customerOptions}
                                    className="payment-form-input"
                                />
                            </label>
                        </div>
                        <button type="button" onClick={handleSubmit} className="payment-form-submit-btn">Submit</button>
                        <button onClick={handleClosePaymentForm} className='payment-form-close-button'>Close</button>
                    </div>
                </div>
            )}
            <button className="add-payment-button" onClick={handleAddPaymentClick}>Add Payment</button>
        </div>
    );
}

export default Payment;
