function pairwise(arr, arg) {
  var indexesSums = [0];
  var usedIndexes = [];

  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === arg && usedIndexes.indexOf(i) === -1 && usedIndexes.indexOf(j) === -1) {
        indexesSums.push(i + j);
        usedIndexes.push(i, j);
      }
    }
  }

  return indexesSums.reduce(function(a, b) {
    return a + b;
  });
}

console.log(pairwise([1,1,1], 2));
console.log(pairwise([1,4,2,3,0,5], 7));
console.log(pairwise([], 100));
