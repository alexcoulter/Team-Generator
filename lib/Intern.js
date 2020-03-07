
const Employee = require("./Employee.js");
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getSchool(){
    return this.school;
  }
  getRole(){
    return "Intern";
  }
}

module.exports = Intern;