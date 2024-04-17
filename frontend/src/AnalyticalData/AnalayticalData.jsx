import axios from "axios";
import React, { useEffect, useState } from "react";
import './AnalayticalData.css';

const AnalyticalData = () => {
    const [topSoldItems, setTopSoldItems] = useState([]);
    const [leastSoldItems, setLeastSoldItems] = useState([]);
    const [stocksToBuy, setStocksToBuy] = useState([]);
    const [selectedYearTopSold, setSelectedYearTopSold] = useState(new Date().getFullYear()); // Default to current year for top sold items
    const [selectedYearLeastSold, setSelectedYearLeastSold] = useState(new Date().getFullYear()); // Default to current year for least sold items
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        findTopSoldItems(selectedYearTopSold);
        findLeastSoldItems(selectedYearLeastSold);
        fetchStocksToBuy();
        calculateProfit(selectedYear, selectedMonth); // Pass selected year and month to calculateProfit

    }, [selectedYear,selectedMonth,selectedYearTopSold,selectedYearLeastSold]);
    const findTopSoldItems = async (year) => {
        try {
            const response = await axios.get(`http://localhost:7001/api/top-sold-items?year=${year}`);
            setTopSoldItems(response.data);
        } catch (error) {
            console.error('Error fetching top sold items:', error);
        }
    };

    const findLeastSoldItems = async (year) => {
        try {
            const response = await axios.get(`http://localhost:7001/api/least-sold-items?year=${year}`);
            setLeastSoldItems(response.data);
        } catch (error) {
            console.error('Error fetching least sold items:', error);
        }
    };

    const fetchStocksToBuy = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/stocks-to-buy');
            setStocksToBuy(response.data);
        } catch (error) {
            console.error('Error fetching stocks to buy:', error);
        }
    };

    const calculateProfit = async (year, month) => { // Accept year and month as parameters
        try {
            const response = await axios.get(`http://localhost:7001/api/profit/${year}/${month}`); // Use year and month in the API call
            setProfit(response.data.profit);
        } catch (error) {
            console.error('Error calculating profit:', error);
        }
    };


    return ( 
        <div className="main-analysis">
            <div className="profit-inputs">
                <label htmlFor="year">Select Year:</label>
                <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>
            <h2>Profit: ${profit.toFixed(2)}</h2>
    
            <div className="analytical-icons">
                <h4>Top Sold Items</h4>
                <div className="profit-inputs">
                    <label htmlFor="year">Select Year:</label>
                    <select id="year" value={selectedYearTopSold} onChange={(e) => setSelectedYearTopSold(e.target.value)}>
                        {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <table className="top-sold-items-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topSoldItems.map(item => (
                            <tr key={item.item_id}>
                                <td>{item.item_name}</td>
                                <td>{item.total_sales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            <div className="analytical-icons">
                <h4>Least Sold Items</h4>
                <div className="profit-inputs">
                    <label htmlFor="year">Select Year:</label>
                    <select id="year" value={selectedYearLeastSold} onChange={(e) => setSelectedYearLeastSold(e.target.value)}>
                        {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <table className="least-sold-items-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leastSoldItems.map(item => (
                            <tr key={item.item_id}>
                                <td>{item.item_name}</td>
                                <td>{item.total_sales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            <div className="analytical-icons">
                <h4>Stocks To Buy</h4>
                <table className="stocks-to-buy-table">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Quantity Available</th>
                            <th>Buy Threshold Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocksToBuy.map(stock => (
                            <tr key={stock.item_id}>
                                <td>{stock.item_id}</td>
                                <td>{stock.item_name}</td>
                                <td>{stock.quantity_available}</td>
                                <td>{stock.buy_threshold_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

export default AnalyticalData;
