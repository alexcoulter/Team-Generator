const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const chalk = require("chalk");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employeeArray = [];
var thisRole = "Manager";

console.clear();
console.log(chalk.bgBlue.bold("Let's build your software engineering team "));
console.log(chalk.bgBlue.bold("We'll start with the Manager:              "));
console.log(chalk.bgBlack("                                           "));
employeeBuilder();

//Asks the user questions about the manager of their team
function employeeBuilder() {
  inquirer
    .prompt([
      {
        type: "input",
        message: `What is the ${thisRole}'s name?`,
        name: "name",
        validate: onlyLetters
      },
      {
        type: "input",
        message: `What is the ${thisRole}'s Id #?`,
        name: "id",
        validate: isNumber
      },
      {
        type: "input",
        message: `What is the ${thisRole}'s Email?`,
        name: "email",
        validate: validateEmail
      },
    ])
    .then(function (res) {
      let newEmployee = new Employee(res.name, res.id, res.email);
      if (thisRole === "Manager") {
        managerBuilder(newEmployee);
      }
      if (thisRole === "Engineer") {
        engineerBuilder(newEmployee);
      }
      if (thisRole === "Intern") {
        internBuilder(newEmployee);
      }
    });
}


//Asks user if they want to add a team member and if so they specify what type 
function newTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What position do you want to add next?",
        choices: ["Engineer", "Intern", "I'm done adding team members"],
        name: "position"
      }
    ])
    .then(function (res) {

      if (res.position === "Engineer" || res.position === "Intern") {
        thisRole = res.position;
        employeeBuilder();
      }
      
      else {
        printTeam();
      }
    });
}


//asks manager specific question and constructs new manager
function managerBuilder(emp) {
  inquirer
    .prompt([
      {
        type: "input",
        message: `What is the ${thisRole}'s Office #?`,
        name: "office",
        validate: isNumber
      },

    ])

    .then(function (res) {
      const emp1 = new Manager(emp.name, emp.id, emp.email, res.office);
      employeeArray.push(emp1);
      newTeamMember();
    });
}


//asks engineer specific question and constructs new engineer
function engineerBuilder(emp) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Engineer's Github username?",
        name: "github"
      },
    ])
    .then(function (res) {
      let newEmployee = new Engineer(emp.name, emp.id, emp.email, res.github);
      employeeArray.push(newEmployee);
      newTeamMember();
    });
}


//asks intern specific question and constructs new intern
function internBuilder(emp) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What school did the intern go to?",
        name: "school",
        validate: onlyLetters
      }
    ])
    .then(function (res) {
      let newEmployee = new Intern(emp.name, emp.id, emp.email, res.school);
      employeeArray.push(newEmployee);
      newTeamMember();
    });
}

//Validation to see if input is a number
function isNumber(name) {
  if(isNaN(name)) {
    return chalk.red("please input a number");
  }
  return true;
}


//validation to ensure input is only letters
function onlyLetters(name) {
  var pattern = new RegExp(/[~`!0123456789#$%\^&@*+=\\[\]\\';,./{}|\\":<>\?]/); //unacceptable characters
    if (pattern.test(name)) {
        return chalk.red("please input letters only");
    }
    return true;
}

//validation for email
function validateEmail(name) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name))
  {
    return (true);
  }
    return chalk.red("please enter a valid email address");
}



//formats employee info and creates html page with their info
function printTeam() {
  const formattedTeam = render(employeeArray);

  fs.writeFile(outputPath, formattedTeam, function (err) {
    if (err) throw err;
  });
  console.log(chalk.green("Your team information page has been built!"));
  console.log(chalk.green("Check out the team.html file in your ouput folder"));
}
