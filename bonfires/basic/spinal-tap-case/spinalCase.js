function spinalCase(str) {
  var rex = /([a-z])([A-Z])|([\s_])/g;
  str = str.replace(rex, function(match, p1, p2, p3) {
    if (p1 && p2) return p1 + "-" + p2;
    else return "-";
  }).toLowerCase();
  return str;
}

console.log(spinalCase("This Is Spinal Tap"));
console.log(spinalCase("thisIsSpinalTap"));
console.log(spinalCase("The_Andy_Griffith_Show"));
console.log(spinalCase("Teletubbies say Eh-oh"));
