const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: String,
  expense: Number
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
