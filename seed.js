const mongoose = require("mongoose"),

      User     = require("./models/userModel.js"),
      Income   = require("./models/incomeModel.js"),
      Expense  = require("./models/expenseModel.js");


// CONFIGURATION

mongoose.connect("mongodb://127.0.0.1/Budget_App");
MongoClient.connect({useNewUrlParser: true });


// User.create({
//   name: "Foo User",
// });


Income.create({
  title: "Stock Dividend",
  income: 200
  })
  .then( (incomeData) => {
    return User.findOneAndUpdate(
      {"name" : "Foo User"},
      { $push: {incomes: incomeData} },
      {new: true}
    );
  })
  .then( (userData) => {
    console.log(userData);
    // mongoose.connection.close();
  })
  .catch( (err) => {
    console.log(err);
  });


Expense.create({
  title: "Plane Tickets",
  expense: 250
  })
  .then( (expenseData) => {
    return User.findOneAndUpdate(
      {"name" : "Foo User"},
      { $push: {expenses: expenseData} },
      {new: true}
    );
  })
  .then( (userData) => {
    console.log(userData);
    mongoose.connection.close();
  })
  .catch( (err) => {
    console.log(err);
  });


// User.find({"name" : "Foo User"}, (err, userData) => {
//   console.log(userData);
//   mongoose.connection.close();
// });
