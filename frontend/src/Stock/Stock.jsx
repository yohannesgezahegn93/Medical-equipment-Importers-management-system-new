import axios from "axios";
import React, { useEffect, useState } from "react";
import './Stock.css';
import { IoSearchSharp } from "react-icons/io5";
import Select from 'react-select';
import Home1 from "../Home1";

const Stock = () => {
    const [stockList, setStockList] = useState([]);
    const [averageSellingPrices, setAverageSellingPrices] = useState({});
    const [averageTimeOnMarkets, setAverageTimeOnMarkets] = useState({});
    const [showStockForm, setShowStockForm] = useState(false);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [formData, setFormData] = useState({
      item_name: '',
      model: '',
      serialNumber: '',
      description: '',
      quantity_available: '',
      unit_cost: '',
      buy_threshold_quantity: '',
      expiry_date: '',
      purchased_date:'',
      supplier_id:'',
    });

    useEffect(() => {
        fetchStock();
        fetchSupplierOptions();
    }, []);

    useEffect(() => {
        const fetchAverages = async () => {
            const averageSellingPrices = {};
            const averageTimeOnMarkets = {};

            await Promise.all(stockList.map(async (stock) => {
                const avgSellingPrice = await fetchAverageSellingPrice(stock.item_id);
                const avgTimeOnMarket = await fetchAverageTimeOnMarket(stock.item_id);

                averageSellingPrices[stock.item_id] = avgSellingPrice;
                averageTimeOnMarkets[stock.item_id] = avgTimeOnMarket;
            }));

            setAverageSellingPrices(averageSellingPrices);
            setAverageTimeOnMarkets(averageTimeOnMarkets);
        };

        fetchAverages();
    }, [stockList]);

    const fetchStock = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/stock');
            setStockList(response.data);
        } catch (error) {
            console.error('Error fetching stock:', error);
        }
    };
    const fetchSupplierOptions = async () => {
      try {
          const response = await axios.get('http://localhost:7001/api/suppliers');
          const options = response.data.map(supplier => ({
              value: supplier.supplier_id,
              label: `${supplier.supplier_id} - ${supplier.supplier_name}`
          }));
          setSupplierOptions(options);
      } catch (error) {
          console.error('Error fetching supplier options:', error);
      }
  };
    const handleAddStockClick = () => {
      setShowStockForm(true);
  };

  const handleCloseStockForm = () => {
      setShowStockForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSupplierChange = (selectedOption) => {
    setFormData({ ...formData, supplier_id: selectedOption.value });
};

  const validateForm = () => {
    // Perform form validation here
    // Return true if form is valid, false otherwise
    // Example: Check if required fields are filled
    if (!formData.item_name || !formData.model || !formData.purchased_date) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Add more validation rules as needed

    return true;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('koko', formData);
    // Perform contract-form validation
    if (!validateForm()) {
        return;
    }
    

    try {
        const response = await axios.post('http://localhost:7001/api/stock', formData);
        console.log('Stock added successfully:', response.data);
        fetchStock();
        setFormData({
            item_name: '',
            model: '',
            serialNumber: '',
            description: '',
            quantity_available: '',
            unit_cost: '',
            buy_threshold_quantity: '',
            expiry_date: '',
            purchased_date:'',
            supplier_id:'',
        });
        setShowStockForm(false);
    } catch (error) {
        console.error('Error adding stock:', error);
    }
};

// Function to fetch average selling price for a specific item
const fetchAverageSellingPrice = async (itemId) => {
    try {
        const response = await axios.get(`http://localhost:7001/api/average-selling-price/${itemId}`);
        console.log("check",response.data[0].avg_sale_price);
        return response.data[0].avg_sale_price;
        
    } catch (error) {
        console.error('Error fetching average selling price:', error);
        return null;
    }
};

// Function to fetch average time on market for a specific item
const fetchAverageTimeOnMarket = async (itemId) => {
    try {
        const response = await axios.get(`http://localhost:7001/api/average-time-on-market/${itemId}`);
        return response.data[0].avg_time_on_market;
    } catch (error) {
        console.error('Error fetching average time on market:', error);
        return null;
    }
};

return (
        <div className="stock-container">
          <div className="stock-home-and-sort-title">
        
            <h2 className="stock-heading"><Home1/>Stock Management</h2>
          </div>
          <div className="stock-search-and-export">
            <div className="search-container">
              <IoSearchSharp  className="search-icon"/>
              <input
                id="searchInput"
                className="stock-search-input"
                type="text"
                placeholder="Search..."
              />

            </div>
          </div>
            <table className="main-stock-table">
              <thead >
                <tr >
                  <React.Fragment >
                    <th className="stock-thead">Item ID</th>
                    <th className="stock-thead">Item Name</th>
                    <th className="stock-thead">Model</th>
                    <th className="stock-thead">Serial Number</th>
                    <th className="stock-thead">Description</th>
                    <th className="stock-thead">Quantity Available</th>
                    <th className="stock-thead">Unit Cost</th>
                    <th className="stock-thead">Buy Threshold Quantity</th>
                    <th className="stock-thead">Purchased Date</th>
                    <th className="stock-thead">Supplier ID</th>
                    <th className="stock-thead">Avg. Selling Price</th> {/* New column for average selling price */}
                    <th className="stock-thead">Avg. Time on Market</th> {/* New column for average time on market */}
                  </React.Fragment>
                </tr>
              </thead>
              <tbody>
                {stockList.map((stock) => (
                    <tr key={stock.item_id}>
                        <td className="stock-table-fields">{stock.item_id}</td>
                        <td className="stock-table-fields">{stock.item_name}</td>
                        <td className="stock-table-fields">{stock.model}</td>
                        <td className="stock-table-fields">{stock.serialNumber}</td>
                      
                        <td className="stock-table-fields">{stock.description}</td>
                        <td className="stock-table-fields">{stock.quantity_available}</td>
                        <td className="stock-table-fields">{stock.unit_cost}</td>
                        <td className="stock-table-fields">{stock.buy_threshold_quantity}</td>
                        <td className="stock-table-fields">{new Date(stock.purchased_date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                        })}</td>
                        <td className="stock-table-fields">{stock.supplier_id}</td>
                        <td className="stock-table-fields">{averageSellingPrices[stock.item_id] !== (undefined || null) ? averageSellingPrices[stock.item_id] : '-'}</td> {/* Display average selling price */}
                        <td className="stock-table-fields">{averageTimeOnMarkets[stock.item_id] !== (undefined || null) ? averageTimeOnMarkets[stock.item_id] : '-'}</td> {/* Display average time on market */}
                    </tr>
                ))}
            </tbody>

            </table>
            {showStockForm && (
                <div className='detailed-view-stock-form'>
                    <div className='detail-description-detailed-stock-form'>
                    <div className='stock-form-title' >Add Stock</div>
                        
                        <div  className="stock-form">
                          <label className="stock-form-label">
                            Item Name:
                            <input
                              type="text"
                              name="item_name"
                              value={formData.item_name}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                          <label className="stock-form-label">
                            Model:
                            <input
                              type="text"
                              name="model"
                              value={formData.model}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                          <label className="stock-form-label">
                            Serial Number:
                            <input
                              type="text"
                              name="serialNumber"
                              value={formData.serialNumber}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                        
                          <label className="stock-form-label">
                            Description:
                            <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              className="stock-form-textarea"
                            />
                          </label>
                          <label className="stock-form-label">
                            Quantity Available:
                            <input
                              type="number"
                              name="quantity_available"
                              value={formData.quantity_available}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                          <label className="stock-form-label">
                            Unit Cost:
                            <input
                              type="number"
                              name="unit_cost"
                              value={formData.unit_cost}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                          <label className="stock-form-label">
                            Buy Threshold Quantity:
                            <input
                              type="number"
                              name="buy_threshold_quantity"
                              value={formData.buy_threshold_quantity}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                          <label className="stock-form-label">
                            Purchased Date:
                            <input
                              type="date"
                              name="purchased_date"
                              value={formData.purchased_date}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                          <label className="stock-form-label">
                            Expiry Date:
                            <input
                              type="date"
                              name="expiry_date"
                              value={formData.expiry_date}
                              onChange={handleChange}
                              className="stock-form-input"
                            />
                          </label>
                          <label className="stock-form-label">
                                Supplier ID:
                                <Select
                                    value={supplierOptions.find(option => option.value === formData.supplier_id)}
                                    onChange={handleSupplierChange}
                                    options={supplierOptions}
                                    className="stock-form-select"
                                    
                                />
                            </label>
                        </div>
                    <button type="button" onClick={handleSubmit}className="stock-form-submit-btn">Submit</button>
                    <button onClick={handleCloseStockForm} className='stock-form-close-button'>Close</button>
                    </div>
                </div>
            )}

             <button className="add-stock-button" onClick={handleAddStockClick}>Add Stock</button>

        </div>
    );
}

export default Stock;
