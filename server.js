const express    = require("express"),
      app        = express(),
      colors     = require("colors"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),

      Income     = require("./models/incomeModel"),
      Expense    = require("./models/expenseModel"),

      incomeRoutes  = require("./routes/incomeRoutes"),
      expenseRoutes = require("./routes/expenseRoutes");



// CONFIGURATION ==========
mongoose.connect("mongodb://127.0.0.1/Budget_App");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(incomeRoutes);
app.use(expenseRoutes);



// ROUTES ====================

// default route //
app.get("*", (req, res) => {
  const data = {};

  Income.find()
    .then((incomeData) => {
      data.incomes = incomeData;
      return Expense.find();
    })
    .then((expenseData) => {
      data.expenses = expenseData;
    })
    .then(() => {
      res.render("index.ejs", {data: data});
      // res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});



// SERVER START ==========
app.listen(3000, () => {
  console.log("The server has begun taking requests".green);
});
