const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /incomes - Return all incomes ordered by date DESC
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM incomes ORDER BY date DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /incomes - Insert into table incomes
router.post("/", async (req, res) => {
    try {
        const { amount, source, description, date } = req.body;
        const newIncome = await pool.query(
            "INSERT INTO incomes (amount, source, description, date) VALUES ($1, $2, $3, $4) RETURNING *",
            [amount, source, description, date]
        );
        res.json(newIncome.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
