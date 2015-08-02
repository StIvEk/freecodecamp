function sym(arg) {
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 1) {
    args = args.length > 1 ? args : args[0];
    return args.
    filter(function(value, index) {
      return (args.indexOf(value) === index);
    });
  } else if (args.length > 1) {
    return args.
    reduce(function(prev, curr) {
      return prev.
      filter(function(value, index) {
        return (curr.indexOf(value) === -1 && prev.indexOf(value) === index);
      }).
        concat(curr.filter(function(value, index) {
          return (prev.indexOf(value) === -1 && curr.indexOf(value) === index);
        }));
    });
  } else {
    return;
  }
}

console.log("sym = " + sym([1, 2, 3], [5, 2, 1, 4]));
console.log("sym = " + sym([1, 2, 5], [2, 3, 5], [3, 4, 5]));
console.log("sym = " + sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));
console.log("sym = " + sym([1, 1]));
