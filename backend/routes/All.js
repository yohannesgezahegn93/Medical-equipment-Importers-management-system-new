const express = require('express');
const router = express.Router();
const {  Op  } = require('sequelize');
const { fn, col } = require('sequelize');
const { literal } = require('sequelize');
const sequelize = require('../db');
const { QueryTypes } = require('sequelize');



const Sales = require('../models/Sales');
const Stock = require('../models/Stock');
const Suppliers = require('../models/Suppliers'); // Import the Suppliers model
const Payments = require('../models/Payments'); // Import the Payments model
const Customers = require('../models/Customers'); // Import the Customers model

// GET all stock items
router.get('/stock', async (req, res) => {
    try {
      const stockItems = await Stock.findAll();
      res.json(stockItems);
    } catch (error) {
      console.error('Error fetching stock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Add a new stock item
  router.post('/stock', async (req, res) => {
    const formData = req.body;

    try {
      const createdStockItem = await Stock.create(formData);
      res.status(201).json(createdStockItem);
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 

// GET all buyers


// Route to fetch all suppliers
router.get('/suppliers', async (req, res) => {
    try {
        const suppliers = await Suppliers.findAll();
        res.json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new supplier
router.post('/suppliers', async (req, res) => {
    const { supplier_name, supplier_address, contact_number, email, registration_date } = req.body;
    try {
        const newSupplier = await Suppliers.create({
            supplier_name,
            supplier_address,
            contact_number,
            email,
            registration_date
        });
        res.status(201).json(newSupplier);
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch all payments
router.get('/payments', async (req, res) => {
    try {
        const payments = await Payments.findAll();
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new payment
router.post('/payments', async (req, res) => {
    const { amount, payment_date, status, customer_id } = req.body;
    try {
        const newPayment = await Payments.create({
            amount,
            payment_date,
            status,
            customer_id
        });
        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to fetch all customers
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customers.findAll();
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new customer
router.post('/customers', async (req, res) => {
    const { customer_name, customer_address, contact_number, email, registration_date,customer_type } = req.body;
    try {
        const newCustomer = await Customers.create({
            customer_name,
            customer_type,
            customer_address,
            contact_number,
            email,
            registration_date
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch all sales
router.get('/sales', async (req, res) => {
    try {
        const sales = await Sales.findAll();
        res.json(sales);
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new sale
router.post('/sales', async (req, res) => {
    const { item_id, customer_id, sale_price, quantity_sold, sale_date, delivery_date } = req.body;
    try {
        const newSale = await Sales.create({
            item_id,
            customer_id,
            sale_price,
            quantity_sold,
            sale_date,
            delivery_date
        });
        res.status(201).json(newSale);
    } catch (error) {
        console.error('Error adding sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/stock/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const { quantity_available } = req.body;

    try {
        // Find the stock item by item ID
        const stockItem = await Stock.findOne({
            where: { item_id: itemId }
        });

        if (stockItem) {
            // Update the quantity available
            stockItem.quantity_available = quantity_available;
            await stockItem.save();
            res.status(200).json({ message: 'Quantity available updated successfully' });
        } else {
            res.status(404).json({ error: 'Item not found in stock' });
        }
    } catch (error) {
        console.error('Error updating quantity available:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/top-sold-items', async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear(); // Get the year from the query parameter
        const topSoldItems = await Sales.findAll({
            attributes: [
                'item_id',
                [sequelize.fn('sum', sequelize.col('quantity_sold')), 'total_quantity_sold']
            ],
            group: ['item_id'],
            where: {
                sale_date: {
                    [Op.between]: [`${year}-01-01`, `${year}-12-31`] // Filter sales for the given year
                }
            },
            order: [[sequelize.literal('total_quantity_sold'), 'DESC']],
            limit: 10, // Change the limit as per requirement
            raw: true // Get raw data from SQL query
        });
        // Fetch item details for most sold items
        const mostSoldItemsWithData = await Promise.all(topSoldItems.map(async (item) => {
            const stockData = await Stock.findOne({ where: { item_id: item.item_id } });
            return {
                item_id: item.item_id,
                item_name: stockData.item_name,
                total_quantity_sold: item.total_quantity_sold
            };
        }));
        console.log("topsolditems",mostSoldItemsWithData)
        res.send(mostSoldItemsWithData);
    } catch (error) {
        console.error('Error fetching top sold items:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Find the least sold items for a given year 
router.get('/least-sold-items', async (req, res) => {
    const year = req.query.year|| new Date().getFullYear(); // Get the year from the query parameter
    try {
        const leastSoldItems = await Sales.findAll({
            attributes: [
                'item_id',
                [sequelize.fn('sum', sequelize.col('quantity_sold')), 'total_quantity_sold']
            ],
            group: ['item_id'],
            where: {
                sale_date: {
                    [Op.between]: [`${year}-01-01`, `${year}-12-31`] // Filter sales for the given year
                }
            },
            order: [[sequelize.literal('total_quantity_sold'), 'ASC']], // Sort by total sales in ascending order
            limit: 10, // Change the limit as per requirement
            raw: true // Get raw data from SQL query
        });

        // Fetch item details for least sold items
        const leastSoldItemsWithData = await Promise.all(leastSoldItems.map(async (item) => {
            const stockData = await Stock.findOne({ where: { item_id: item.item_id } });
            return {
                item_id: item.item_id,
                item_name: stockData.item_name,
                total_quantity_sold: item.total_quantity_sold
            };
        }));
        console.log("leastsolditems",leastSoldItemsWithData)
        res.json(leastSoldItemsWithData);
    } catch (error) {
        console.error('Error fetching least sold items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/stocks-to-buy', async (req, res) => {
    try {
        const stocksToBuy = await Stock.findAll({
            where: {
                quantity_available: {
                    [Op.lt]: sequelize.col('buy_threshold_quantity') // Use Op directly
                },
                buy_threshold_quantity: {
                    [Op.ne]: null // Use Op directly
                }
            }
        });
        res.json(stocksToBuy);
    } catch (error) {
        console.error('Error fetching stocks to buy:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to calculate profit for a specific month
router.get('/profit/:year/:month', async (req, res) => {
    const { year, month } = req.params;
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;
    try {
        const salesData = await Sales.findAll({
            where: {
                sale_date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: Stock // Include the Stock model to access unit price
        });
        // Calculate total sales revenue
        const totalSalesRevenue = salesData.reduce((total, sale) => total + sale.sale_price * sale.quantity_sold, 0);
        // Calculate total cost of goods sold (COGS)
        const totalCOGS = salesData.reduce((total, sale) => total + sale.Stock.unit_cost * sale.quantity_sold, 0);
        // Calculate profit
        const profit = totalSalesRevenue - totalCOGS;
        res.json({ profit });
    } catch (error) {
        console.error('Error calculating profit:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to compute the average selling price for each item in the stock
router.get('/average-selling-price/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        // Perform calculation for average selling price for the given item_id
        const averageSellingPrice = await Sales.findAll({
            attributes: [
                [sequelize.fn('avg', sequelize.col('sale_price')), 'avg_sale_price']
            ],
            where: {
                item_id: itemId
            }
        });
        console.log('yoyo:',averageSellingPrice );

        res.json(averageSellingPrice);
    } catch (error) {
        console.error('Error computing average selling price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to compute the average time on market for each item in the stock
// Route to compute the average time on market for each item in the stock
router.get('/average-time-on-market/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        // Perform calculation for average time on market for the given item_id
        const averageTimeOnMarket = await Sales.findAll({
            attributes: [
                [sequelize.literal('AVG(DATEDIFF(sales.sale_date, stock.purchased_date))'), 'avg_time_on_market']
            ],
            include: [{
                model: Stock,
                where: { item_id: itemId },
                required: true
            }],
            raw: true
        });

        res.json(averageTimeOnMarket);
    } catch (error) {
        console.error('Error computing average time on market:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to get the quantity available for a specific item from the stock table
router.get('/validate/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    try {
        const stockItem = await Stock.findOne({
            where: { item_id: itemId },
            attributes: ['quantity_available']
        });
        if (stockItem) {
            res.json(stockItem);
        } else {
            res.status(404).json({ error: 'Item not found in stock' });
        }
    } catch (error) {
        console.error('Error fetching stock item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;
