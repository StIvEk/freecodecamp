var Person = function(firstAndLast) {
  this.fName = firstAndLast.split(" ")[0];
  this.lName = firstAndLast.split(" ")[1];
  this.fullName = firstAndLast;

  this.getFirstName = function() {
    return this.fName;
  };

  this.getLastName = function() {
    return this.lName;
  };

  this.getFullName = function() {
    return this.fullName;
  };
};

// Person.prototype.setFirstName() = function
Person.prototype.setFirstName = function(first) {
  this.fName = first;
};

Person.prototype.setLastName = function(last) {
  this.lName = last;
};

Person.prototype.setFullName = function(firstAndLast) {
  this.fullName = firstAndLast;
};


var bob = new Person('Bob Ross');
console.log("Full name = " + bob.getFullName());
console.log("First name = " + bob.getFirstName());
console.log("Last name = " + bob.getLastName());

bob.setFirstName("Happy");
console.log("First name = " + bob.getFirstName());
