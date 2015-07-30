function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var semimajorAxis;
  var orbitalPeriodTime;
  var orbitalArr = [];

  for (var i = 0; i < arr.length; i++) {
    semimajorAxis = earthRadius + arr[i].avgAlt;
    orbitalPeriodTime = Math.round(2 * Math.PI * Math.sqrt(Math.pow(semimajorAxis, 3) / GM));
    orbitalArr.push({"name": arr[i].name, "orbitalPeriod": orbitalPeriodTime});
  }
  arr = orbitalArr;
  return arr;
}

console.log(orbitalPeriod([{name: "sputkin", avgAlt: 35873.5553}]));
