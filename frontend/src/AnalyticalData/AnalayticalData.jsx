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
            console.log("topsolditems",response.data)
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
        <div className="main">
            <div className="AA">
                <div className="CC">
                    <div>
                        <label  className="EE" htmlFor="year">Select Year</label>
                        <select className="input-date" id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                   <div>
                    <label className="EE" htmlFor="month">Select Month</label>
                        <select className="input-date" id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                   </div>
                </div>
                <h2 className="DD">Profit: ${profit.toFixed(2)}</h2>
            </div>
            
            <div className="BB">
            
    
    <div className="analytical-icons">
        <h4>Top Sold Items</h4>
        <div className="profit-inputss">
            <label htmlFor="year">Select Year:</label>
            <select className="II" id="year" value={selectedYearTopSold} onChange={(e) => setSelectedYearTopSold(e.target.value)}>
                {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
        <table className="top-sold-items-table">
            <thead>
                <tr className="FF">
                    <th className="GG">Item Name</th>
                    <th className="GG">Total Quantity Sold</th>
                </tr>
            </thead>
            <tbody>
                {topSoldItems.map(item => (
                    <tr key={item.item_id}>
                        <td className="HH">{item.item_name}</td>
                        <td  className="HH">{item.total_quantity_sold}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <div className="analytical-icons">
        <h4>Least Sold Items</h4>
        <div className="profit-inputss">
            <label htmlFor="year">Select Year</label>
            <select className="II" id="year" value={selectedYearLeastSold} onChange={(e) => setSelectedYearLeastSold(e.target.value)}>
                {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
        <table className="least-sold-items-table">
            <thead>
                <tr>
                    <th className="GG">Item Name</th>
                    <th className="GG">Total Quantity sold</th>
                </tr>
            </thead>
            <tbody>
                {leastSoldItems.map(item => (
                    <tr key={item.item_id}>
                        <td className="HH">{item.item_name}</td>
                        <td className="HH">{item.total_quantity_sold}</td>
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
                    <th className="GG">Item ID</th>
                    <th className="GG">Item Name</th>
                    <th className="GG">Quantity Available</th>
                    <th className="GG">Buy Threshold Quantity</th>
                </tr>
            </thead>
            <tbody>
                {stocksToBuy.map(stock => (
                    <tr key={stock.item_id}>
                        <td className="HH">{stock.item_id}</td>
                        <td className="HH">{stock.item_name}</td>
                        <td className="HH">{stock.quantity_available}</td>
                        <td className="HH">{stock.buy_threshold_quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
            </div>
        </div>
    );
    
}

export default AnalyticalData;
