require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expensesRoutes = require("./routes/expenses");
const incomesRoutes = require("./routes/incomes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/expenses", expensesRoutes);
app.use("/incomes", incomesRoutes);

app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});
