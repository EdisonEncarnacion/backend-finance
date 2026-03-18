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

// DELETE /expenses/:id - Delete an expense by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM expenses WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
