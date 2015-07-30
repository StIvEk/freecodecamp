function palindrome(str) {
  str = str.toLowerCase().replace(/\s*\W*/g, "");
  var reversedStr = str.split("").reverse().join("");

  return (str === reversedStr);
}

palindrome("A man, a plan, a canal. Panama");
