import axios from "axios";


export const MDL = (function() {

  const total = {
    income: 0,
    expense: 0
  };

  const resetTotalObj = () => {
    total.expense = 0;
    total.income = 0;
  };

  const addTotalIncome = (income) => {
    total.income += income;
  };

  const addTotalExpense = (expense) => {
    total.expense += expense;
  };

  const subtractTotalIncome = (income) => {
    total.income -= income;
  };

  const subtractTotalExpense = (expense) => {
    total.expense -= expense;
  };

  const getTotalIncome = () => {
    return total.income;
  };

  const getTotalExpense = () => {
    return total.expense;
  };

  const createIncome = (title, income) => {
    return axios.post("/income",{
      title: title,
      income: income
    });
  };

  const createExpense = (title, expense) => {
    return axios.post("/expense", {
      title: title,
      expense: expense
    });
  };

  const getIncomes = function() {
    return axios.get("/income");
  };

  const getExpenses = function() {
    return axios.get("/expense");
  };

  const deleteIncome = (id) => {
    return axios.delete(`/income/${id}`);
  };

  const deleteExpense = (id) => {
    return axios.delete(`/expense/${id}`);
  };

  return {
    createIncome: createIncome,
    createExpense: createExpense,
    getIncomes: getIncomes,
    getExpenses: getExpenses,
    resetTotalObj: resetTotalObj,
    addTotalIncome: addTotalIncome,
    addTotalExpense: addTotalExpense,
    subtractTotalIncome: subtractTotalIncome,
    subtractTotalExpense: subtractTotalExpense,
    getTotalIncome: getTotalIncome,
    getTotalExpense: getTotalExpense,
    deleteIncome: deleteIncome,
    deleteExpense: deleteExpense
  };

} () );
