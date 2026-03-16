require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expensesRoutes = require("./routes/expenses");
const incomesRoutes = require("./routes/incomes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/expenses", expensesRoutes);
app.use("/incomes", incomesRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "finance-api",
        time: new Date()
    });
});

app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});