var Person = function(firstAndLast) {
  this.setFirstName = function(first) {
    this.firstName = firstAndLast.substring(0, first.indexOf(" "));
  };

  this.setLastName = function(last) {
    this.lastName = firstAndLast.substring(last.indexOf(" ") + 1);
  };

  this.setFullName = function(firstAndLast) {
    this.fullName = firstAndLast;
  };

  this.getFirstName = function() {
    return this.firstName;
  };

  this.getLastName = function() {
    return this.lastName;
  };

  this.getFullName = function() {
    return this.fullName;
  };
};

var bob = new Person("Bob Ross");
bob.getFullName();
bob.setFirstName("Happy");


// Tests
console.log("Full name = " + bob.getFullName());
console.log("First name = " + bob.getFirstName());
console.log("Last name = " + bob.getLastName());
