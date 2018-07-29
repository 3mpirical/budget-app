import { MDL } from "./model";


export const VIEW = (function(MDL) {

  const addBtn = (function() {
    return document.querySelector(".add__btn");
  } () );


  const deleteIncomeBtn = (function() {
    return document.querySelector(".income__list");
  } () );


  const deleteExpenseBtn = (function() {
    return document.querySelector(".expenses__list");
  } () );


  const getInput = function() {
    return new Promise((resolve) => {
      const type = document.querySelector(".add__type").value;
      const title = document.querySelector(".add__description").value;
      const value = document.querySelector(".add__value").value;

      resolve({
        type: type,
        title: title,
        value: value
      });
    });
  };


  const createNode = (element, HTMLContent, parentNode) => {
    const node = document.createElement(element);
    node.innerHTML = HTMLContent;
    parentNode.appendChild(node);
  };


  const createIncomeBlock = (incomeObj) => {
    const node = document.createElement("div");

    node.classList.add("item");
    node.classList.add("clearfix");

    node.innerHTML =
    `<div class="item__description">${incomeObj.title }</div>
      <div class="right clearfix">
        <div class="item__value">+ ${incomeObj.income}</div>
        <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline  item__delete--icon"
              id="${incomeObj._id}">
              </i>
            </button>
        </div>
    </div>`;

    document.querySelector(".income__list").appendChild(node);
  };


  const createExpenseBlock = (expenseObj) => {
    const node = document.createElement("div");

    node.classList.add("item");
    node.classList.add("clearfix");

    node.innerHTML =
    `<div class="item__description">${expenseObj.title}</div>
      <div class="right clearfix">
        <div class="item__value expense__value">- ${expenseObj.expense}</div>
        <div class="item__percentage expense__percentage">
        ${ Math.round( expenseObj.expense/MDL.getTotalExpense() * 1000)/10}%</div>
        <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline item__delete--icon"
              id="${expenseObj._id}">
              </i>
            </button>
        </div>
    </div>`;

    document.querySelector(".expenses__list").appendChild(node);
  };


  const removeIncomeBlock = (id) => {
    const incomeList = document.querySelector(".income__list");
    const listItem = document
      .getElementById(id)
      .parentNode
      .parentNode
      .parentNode
      .parentNode;
      
    incomeList.removeChild(listItem);
  };


  const removeExpenseBlock = (id) => {
    const expenseList = document.querySelector(".expenses__list");
    const listItem = document
      .getElementById(id)
      .parentNode
      .parentNode
      .parentNode
      .parentNode;

    expenseList.removeChild(listItem);
  };


  const updateTotalIncome = () => {
    document.querySelector(".budget__income--value").textContent = "+ " + MDL.getTotalIncome();
  };


  const updateTotalExpense = () => {
    document.querySelector(".budget__expenses--value").textContent = "- " + MDL.getTotalExpense();
    document.querySelector(".budget__expenses--percentage").textContent = Math.round(MDL.getTotalExpense()/(MDL.getTotalExpense() + MDL.getTotalIncome()) * 100) + "%";
  };


  const updateNetBudget = () => {
    document.querySelector(".budget__value").textContent = (MDL.getTotalIncome() - MDL.getTotalExpense());
  };


  const updatePercentages = () => {

    const expenseNodeList =  document.querySelectorAll(".expense__value");
    const percentageNodeList = document.querySelectorAll(".expense__percentage");

    for( let i = 0; i <= expenseNodeList.length; i++ ) {
      // For Each Item :
      //  * get expense value
      //  * divide by total expense value
      //  * set Node List .value to resulting percentage
      const content = expenseNodeList[i].textContent;

      const parsedContent = content.replace("- ", "");

      const newPercentage = `${Math.round( parsedContent / MDL.getTotalExpense() * 1000)/10}%`;

      percentageNodeList[i].textContent = newPercentage;

    }

  };

  return {
    addBtn: addBtn,
    deleteIncomeBtn: deleteIncomeBtn,
    deleteExpenseBtn: deleteExpenseBtn,
    getInput: getInput,
    createNode: createNode,
    createIncomeBlock: createIncomeBlock,
    createExpenseBlock: createExpenseBlock,
    removeIncomeBlock: removeIncomeBlock,
    removeExpenseBlock: removeExpenseBlock,
    updateTotalIncome: updateTotalIncome,
    updateTotalExpense: updateTotalExpense,
    updateNetBudget: updateNetBudget,
    updatePercentages: updatePercentages
  };

} (MDL) );
