const express = require("express");

const{ 
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController.js");

const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

//add expense
router.post("/add", protect, addExpense);

//get all expense
router.get("/get", protect, getAllExpense);

//delete expense
router.delete("/:id", protect, deleteExpense);

//download expense excel file
router.get("/downloadexcel", protect, downloadExpenseExcel);

module.exports = router