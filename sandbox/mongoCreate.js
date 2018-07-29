const mongoose = require("mongoose"),

      Income   =  require("../models/incomeModel"),
      Expense  =  require("../models/expenseModel");

mongoose.connect("mongodb://127.0.0.1/Budget_App");

Income.create({
  title: "xTest1",
  income: 89
  })
  .then((incomeData) => {
    console.log(incomeData);
    mongoose.connection.close();
  });
