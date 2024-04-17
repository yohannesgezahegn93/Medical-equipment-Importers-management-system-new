const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const app = express();
const stockRouter= require('./routes/All');
app.use(express.json()); // Body parser middleware
app.use(cors());


app.use('/api', stockRouter);


// Start server
const PORT = process.env.PORT || 7001;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);

  // Sync database models
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync(); // Sync models to the DB
    console.log('All models have been synchronized.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});

