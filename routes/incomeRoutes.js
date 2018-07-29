const express    = require("express"),
      router     = express.Router(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),

      Income     = require("../models/incomeModel"),
      Expense    = require("../models/expenseModel");


// Create
router.post("/income", (req, res) => {
  const title = req.body.title;
  const income = req.body.income;

  Income.create({
    title: title,
    income: income
  })
  .then( (incomeData) => {
    console.log(incomeData);
    res.json(incomeData);
  })
  .catch( (err) => {
    console.log(err);
  });

});

// get incomes
router.get("/income", (req, res) => {
  Income.find()
    .then((incomeData) => {
      res.json(incomeData);
    });
});

// delete incomes
router.delete("/income/:id", (req,res) => {
  Income.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
