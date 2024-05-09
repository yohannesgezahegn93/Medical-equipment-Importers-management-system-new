import axios from "axios";
import React, { useEffect, useState } from "react";
import './Sales.css';
import { IoSearchSharp } from "react-icons/io5";
import Select from 'react-select';
import Home1 from "../Home1";

const Sales = () => {
    const [salesList, setSalesList] = useState([]);
    const [showSalesForm, setShowSalesForm] = useState(false);
    const [formData, setFormData] = useState({
      item_id: '',
      customer_id: '',
      sale_price: '',
      quantity_sold: '',
      sale_date: '',
      delivery_date: '',
    });

    const [stockOptions, setStockOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);

    useEffect(() => {
        fetchSales();
        fetchStockOptions();
        fetchCustomerOptions();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/sales');
            setSalesList(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const fetchStockOptions = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/stock');
            const options = response.data.map(stock => ({
                value: stock.item_id,
                label: `${stock.item_name} - ${stock.item_id}` // Display item name and ID
            }));
            setStockOptions(options);
        } catch (error) {
            console.error('Error fetching stock options:', error);
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

    const handleAddSalesClick = () => {
      setShowSalesForm(true);
    };

    const handleCloseSalesForm = () => {
      setShowSalesForm(false);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (selectedOption) => {
        setFormData({ ...formData, item_id: selectedOption.value });
    };

    const handleCustomerChange = (selectedOption) => {
        setFormData({ ...formData, customer_id: selectedOption.value });
    };

    const validateForm = () => {
      if (!formData.item_id || !formData.customer_id || !formData.sale_price || !formData.quantity_sold || !formData.sale_date || !formData.delivery_date) {
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
    
        // Get the current quantity available for the specified item_id
        try {
            const stockResponse = await axios.get(`http://localhost:7001/api/validate/${formData.item_id}`);
            const currentQuantityAvailable = stockResponse.data.quantity_available;
    
            // Check if the quantity available is greater than or equal to the quantity sold
            if (currentQuantityAvailable >= formData.quantity_sold) {
                // Proceed with submitting the sales form
                try {
                    // Subtract quantity_sold from quantity_available
                    const updatedQuantityAvailable = currentQuantityAvailable - formData.quantity_sold;
    
                    // Update the stock table with the new quantity available
                    await axios.put(`http://localhost:7001/api/stock/${formData.item_id}`, { quantity_available: updatedQuantityAvailable });
    
                    // Add the sale
                    const saleResponse = await axios.post('http://localhost:7001/api/sales', formData);
                    console.log('Sales added successfully:', saleResponse.data);
                    fetchSales();
                    setFormData({
                        item_id: '',
                        customer_id: '',
                        sale_price: '',
                        quantity_sold: '',
                        sale_date: '',
                        delivery_date: '',
                    });
                    setShowSalesForm(false);
                } catch (error) {
                    console.error('Error adding sales:', error);
                }
            } else {
                // Show an alert if the quantity available is less than the quantity sold
                alert('The quantity available is less than the quantity sold. Please adjust the quantity or choose another item.');
            }
        } catch (error) {
            console.error('Error fetching stock:', error);
        }
    };
    
    

    return (
        <div className="sales-container">
            <div className="sales-home-and-sort-title">
                <h2 className="sales-heading"><Home1/>Sales Management</h2>
            </div>
            <div className="sales-search-and-export">
                <div className="search-container">
                    <IoSearchSharp className="search-icon"/>
                    <input
                        id="searchInput"
                        className="sales-search-input"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <table className="main-sales-table">
                <thead >
                    <tr >
                        <th className="sales-thead">Sale ID</th>
                        <th className="sales-thead">Item ID</th>
                        <th className="sales-thead">Customer ID</th>
                        <th className="sales-thead">Sale Price</th>
                        <th className="sales-thead">Quantity Sold</th>
                        <th className="sales-thead">Sale Date</th>
                        <th className="sales-thead">Delivery Date</th>
                    </tr>
                </thead>
                <tbody>
                    {salesList.map((sale) => (
                        <tr key={sale.sale_id}>
                            <td className="sales-table-fields">{sale.sale_id}</td>
                            <td className="sales-table-fields">{sale.item_id}</td>
                            <td className="sales-table-fields">{sale.customer_id}</td>
                            <td className="sales-table-fields">{sale.sale_price}</td>
                            <td className="sales-table-fields">{sale.quantity_sold}</td>
                            <td className="sales-table-fields">{new Date(sale.sale_date).toLocaleString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  second: '2-digit',
                                                  hour12: true,
                            })}</td>
                            <td className="sales-table-fields">{new Date(sale.delivery_date).toLocaleString('en-US', {
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
            {showSalesForm && (
                <div className='detailed-view-sales-form'>
                    <div className='detail-description-detailed-sales-form'>
                        <div className='sales-form-title' >Add Sales</div>
                        <div className="sales-form">
                            <label className="sales-form-label">
                                Item ID:
                                <Select
                                    value={stockOptions.find(option => option.value === formData.item_id)}
                                    onChange={handleItemChange}
                                    options={stockOptions}
                                    className="t"
                                />
                            </label>
                            <label className="sales-form-label">
                                Customer ID:
                                <Select
                                    value={customerOptions.find(option => option.value === formData.customer_id)}
                                    onChange={handleCustomerChange}
                                    options={customerOptions}
                                    className="t"
                                />
                            </label>
                            <label className="sales-form-label">
                                Sale Price:
                                <input
                                    type="number"
                                    name="sale_price"
                                    value={formData.sale_price}
                                    onChange={handleChange}
                                    className="sales-form-input"
                                />
                            </label>
                            <label className="sales-form-label">
                                Quantity Sold:
                                <input
                                    type="number"
                                    name="quantity_sold"
                                    value={formData.quantity_sold}
                                    onChange={handleChange}
                                    className="sales-form-input"
                                />
                            </label>
                            <label className="sales-form-label">
                                Sale Date:
                                <input
                                    type="date"
                                    name="sale_date"
                                    value={formData.sale_date}
                                    onChange={handleChange}
                                    className="sales-form-input"
                                />
                            </label>
                            <label className="sales-form-label">
                                Delivery Date:
                                <input
                                    type="date"
                                    name="delivery_date"
                                    value={formData.delivery_date}
                                    onChange={handleChange}
                                    className="sales-form-input"
                                />
                            </label>
                        </div>
                        <button type="button" onClick={handleSubmit} className="sales-form-submit-btn">Submit</button>
                        <button onClick={handleCloseSalesForm} className='sales-form-close-button'>Close</button>
                    </div>
                </div>
            )}
            <button className="add-sales-button" onClick={handleAddSalesClick}>Add Sales</button>
        </div>
    );
}

export default Sales;
