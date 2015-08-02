// Compare and update inventory stored in a 2d array against a second 2d array of a fresh delivery. Update current inventory item quantity, and if an item cannot be found, add the new item and quantity into the inventory array in alphabetical order.

function inventory(curInv, newInv) {
  var curInvBeforeUpdate = curInv.slice();
  newInv.forEach(function(newInvItem) {
    curInv.forEach(function(curInvItem) {
      if (curInvItem[1] === newInvItem[1]) {
        curInvItem[0] += newInvItem[0];
        newInv.splice(newInv.indexOf(newInvItem), 1);
      }
    });
  });
  return curInv.
    concat(newInv).
      sort(function(a, b) {
        if (a[1] > b[1]) return 1;
        if (a[1] < b[1]) return -1;
        return 0;
      });
}

// Example inventory lists
var curInv = [
    [21, 'Bowling Ball'],
    [2, 'Dirty Sock'],
    [1, 'Hair Pin'],
    [5, 'Microphone']
];

var newInv = [
    [2, 'Hair Pin'],
    [3, 'Half-Eaten Apple'],
    [67, 'Bowling Ball'],
    [7, 'Toothpaste']
];

console.log(inventory(curInv, newInv));
