const express    = require("express"),
      router     = express.Router(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),

      Income     = require("../models/incomeModel"),
      Expense    = require("../models/expenseModel");



//create expense
router.post("/expense", (req, res) => {
  const title = req.body.title;
  const expense = req.body.expense;

  Expense.create({
    title: title,
    expense: expense
  })
  .then((expenseData) => {
    console.log(expenseData);
    res.json(expenseData);
  })
  .catch( (err) => {
    console.log(err);
  });

});

// get expenses
router.get("/expense", (req, res) => {
  Expense.find()
    .then((expenseData) => {
      res.json(expenseData);
    });
});

// delete expenses
router.delete("/expense/:id", (req, res) => {
  Expense.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
