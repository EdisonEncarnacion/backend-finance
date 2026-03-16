const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /expenses - Return all expenses ordered by date DESC
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM expenses ORDER BY date DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /expenses - Insert into table expenses
router.post("/", async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const newExpense = await pool.query(
            "INSERT INTO expenses (amount, category, description, date) VALUES ($1, $2, $3, $4) RETURNING *",
            [amount, category, description, date]
        );
        res.json(newExpense.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
