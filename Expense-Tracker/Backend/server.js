require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));



const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');



// Connect DB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
