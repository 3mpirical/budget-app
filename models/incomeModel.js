const mongoose = require("mongoose");


const incomeSchema = new mongoose.Schema({
  title: String,
  income: Number
});

const Income = mongoose.model("income", incomeSchema);

module.exports = Income;
