import { MDL } from "./model.js";
import { VIEW } from "./view.js";
import axios from "axios";

// CTRL FUNCTIONS =======================================

const CTRL = (function(MDL, VIEW) {


  const initBudget = () => {
    let initIncomes, initExpenses;

    // reset total resetTotalObj
    MDL.resetTotalObj();

    // retrieve all incomes and expenses
    // update total object
    MDL.getIncomes()
      .then((res) => {
        res.data.forEach((item) => {
          MDL.addTotalIncome(item.income);
        });
        initIncomes = res.data;
        return MDL.getExpenses();
      })
      .then((res) => {
        res.data.forEach((item) => {
          MDL.addTotalExpense(item.expense);
        });
        initExpenses = res.data;
      })
      // update budget
      // update income and expense divs
      .then(() => {
        VIEW.updateTotalIncome();
        VIEW.updateTotalExpense();
        VIEW.updateNetBudget();
      })
      // append divs one at a time
      .then(() => {
        initIncomes.forEach((item) => {
          VIEW.createIncomeBlock(item);
        });
      })
      .then(() => {
        initExpenses.forEach((item) => {
          VIEW.createExpenseBlock(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const addItem = () => {
    // 1. Get input data
    VIEW.getInput()
      .then((inputData) => {

        console.log("Form Input: ");
        console.log(inputData);
        // 2. Add data to db
        if(inputData.type === "income") {
          return MDL.createIncome(inputData.title, inputData.value);
        } else {
          return MDL.createExpense(inputData.title, inputData.value);
        }
      })
      // 3. Retrieve new item from db
      // 4. Calculate Budget
      // 4. Update View with new item and budget
      .then((res) => {
        if(res.data.income){

          MDL.addTotalIncome(res.data.income);
          VIEW.updateTotalIncome();
          VIEW.updateNetBudget();
          VIEW.createIncomeBlock(res.data);

        } else {

          MDL.addTotalExpense(res.data.expense);
          VIEW.updateTotalExpense();
          VIEW.updateNetBudget();
          VIEW.createExpenseBlock(res.data);
          VIEW.updatePercentages();

        }
        console.log("From Server: ");
        console.log(res);
      });
  };



  const deleteIncomeAndUpdateAll = (id) => {
    MDL.deleteIncome(id)
      .then((res) => {
        console.log(`DATA WAS REMOVED: ${JSON.stringify(res.data, null, 2)}`);

        // subtract Income from Total Model
        MDL.subtractTotalIncome(res.data.income);
        // Update Total Income View
        VIEW.updateTotalIncome();
        // Update Net Budget View
        VIEW.updateNetBudget();
        // Remove Income Block
        VIEW.removeIncomeBlock(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const deleteExpenseAndUpdateAll = (id) => {
    MDL.deleteExpense(id)
      .then((res) => {
        console.log(`DATA WAS REMOVED: ${JSON.stringify(res.data, null, 2)}`);

        // subtract expense from Total Model
        MDL.subtractTotalExpense(res.data.expense);
        // Update Total Expense View
        VIEW.updateTotalExpense();
        // Update Net Budget View
        VIEW.updateNetBudget();
        // Remove Expense Block
        VIEW.removeExpenseBlock(id);
        // Update Percentages (also do this in the addButton function)
        VIEW.updatePercentages();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return {
    initBudget: initBudget,
    addItem: addItem,
    deleteIncomeAndUpdateAll: deleteIncomeAndUpdateAll,
    deleteExpenseAndUpdateAll: deleteExpenseAndUpdateAll
  };
} (MDL, VIEW) );



// CTRL LOGIC ==============================================

// init //
CTRL.initBudget();



// creating incomes||expenses //
VIEW.addBtn.addEventListener("click", (event) => {
  CTRL.addItem();
});

document.addEventListener("keypress", (event) => {
  if (event.keycode === 13 || event.which === 13){
    CTRL.addItem();
  }
});



// deleting incomes||expenses //
VIEW.deleteIncomeBtn.addEventListener("click", (event) => {
  if( event.target.matches(".item__delete--icon") ) {

    const id = event.target.id;

    CTRL.deleteIncomeAndUpdateAll(id);
  }
});

VIEW.deleteExpenseBtn.addEventListener("click", (event) => {
  if( event.target.matches(".item__delete--icon") ) {

    const id = event.target.id;

    CTRL.deleteExpenseAndUpdateAll(id);
  }
});
