const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: String,
  incomes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Income"
  }],
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expense"
  }]
});

const User = mongoose.model("user", userSchema);

module.exports = User;
