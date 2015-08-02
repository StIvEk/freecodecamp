// Design a cash register drawer function that accepts purchase price as the first argument, payment as the second argument, and cash-in-drawer (cid) as the third argument.
//
// cid is a 2d array listing available currency.
//
// Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.
//
// Otherwise, return change in coin and bills, sorted in highest to lowest order.

function drawer(price, cash, cid) {
  var currencyAmounts = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  };
  var change = "";
  var changeDue = cash - price;

  var cidTotal = cid.
    map(function(currency) { // get currences values only
      return currency[1];
    }).
      reduce(function(prev, curr) { // sum values
        return parseFloat((prev + curr).toFixed(2));
      });

  function calcChange() {
    var changeRemaining = changeDue;
    var currencyItemsNeeded = 0;
    var currencyAmountNeeded = 0;
    var currencyAmountReturned = 0;
    return cid.
      filter(function(currency) {
        return currencyAmounts[currency[0]] <= changeDue;
      }).
      reverse().
        map(function(currency) {
          currencyItemsNeeded = Math.floor(changeRemaining / currencyAmounts[currency[0]]);
          if (!currencyItemsNeeded) return;

          currencyAmountNeeded = currencyItemsNeeded * currencyAmounts[currency[0]];
          currencyAmountReturned = Math.min(currencyAmountNeeded, currency[1]);
          changeRemaining -= currencyAmountReturned;
          changeRemaining = parseFloat(changeRemaining.toFixed(2));
          return [currency[0], parseFloat(currencyAmountReturned)];
        }).
          filter(function(currency) { // filter undefined from returned array
            return Boolean(currency);
          });
  }

  if (cidTotal > changeDue) {
    change = calcChange();
  } else if (cidTotal < changeDue) {
    change = "Insufficient Funds";
  } else {
    change = "Closed";
  }

  return change;
}

console.log(drawer(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));
console.log(drawer(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));
console.log(drawer(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(drawer(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
