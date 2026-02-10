"use strict";

// Information areas

const globalScope = "value";
console.log("global", globalScope);
function funcScope(someArg) {
  let value = "test";
  // console.log("func scope", test);
  if (someArg) {
    const test = 2026;
    value = globalScope;
  }
  return value;
}
funcScope();

// Namespaces

const myNamespace = {
  someFunction: function () {
    // some code
  },
  someVariable: "value",
};

const FinancialApp = {
  Accounts: {
    getAllAccounts: function () {
      // get all bills
    },
    addAccount: function (account) {
      // add a new bill
      console.log("new account is", account);
    },
    // other functions for working with invoices
  },
  Transactions: {
    getAllTransactions: function () {
      // get all transactions
    },
    addTransaction: function (transaction) {
      // add a new transaction
    },
    // other functions for working with transactions
  },
  Reports: {
    generateReport: function () {
      // generate a report
    },
    // other functions for working with reports
  },
};

// Using namespaces:
FinancialApp.Accounts.addAccount({ name: "John" });
// FinancialApp.Transactions.addTransaction(newTransaction);
// FinancialApp.Reports.generateReport();

function addAccount() {
  console.log("separate function");
}

// Template Module

export const myModule = (function () {
  // Private data and features that are not accessible from the outside
  const privateData = "This is private data";

  function privateFunction() {
    console.log("This is a private function");
  }

  // Public interface (methods and properties accessible from outside)
  return {
    publicMethod: function () {
      // Using private functions or data
      privateFunction();
      console.log("This is a public method");
    },
    publicData: "This is public data",
  };
})();
// console.log('my Module', myModule);

// Using the module
// myModule.publicMethod();
// console.log("myModule.publicData: ", myModule.publicData);
// console.log("myModule.privateData: ", myModule.privateData);
// myModule.privateFunction();
// export default myModule;

// Inheritance patterns

// Parent class
export class Animal {
  constructor(name) {
    this.name = name;
  }

  // Parent class method
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  getAnimalName() {
    console.log('name is', this.name)
  }
}
// export default Animal;