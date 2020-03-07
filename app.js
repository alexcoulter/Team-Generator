const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employeeArray = [];
console.log("Let's build your software engineering team");
console.log("We'll start with the manager");

//Asks the user questions about the manager of their team
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the manager's name?",
      name: "name"
    },
    {
      type: "input",
      message: "What is the manager's Id #?",
      name: "id",
    },
    {
      type: "input",
      message: "What is the manager's Email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is the manager's Office #?",
      name: "office",
    }

  ])
  .then(function (res) {
    const emp1 = new Manager(res.name, res.id, res.email, res.office);
    employeeArray.push(emp1);
    newTeamMember();
  });


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
      
      if(res.position === "Engineer"){
        engineerBuilder();
      }
      else if(res.position === "Intern"){
        internBuilder();
      }
      else {
        console.log("done building your team!");
        printTeam();
      }
    });
  }

  //asks questions for adding an engineer to the team
  function engineerBuilder() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the Engineer's Id #?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the Engineer's Email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the Engineer's Github username?",
        name: "github"
      }
    ])
    .then(function (res) {
      let newEmployee = new Engineer(res.name, res.id, res.email, res.github);
      employeeArray.push(newEmployee);
      newTeamMember();
    });
  }


  //asks questions for adding an intern to the team
  function internBuilder() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the Intern's Id #?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the Intern's Email?",
        name: "email",
      },
      {
        type: "input",
        message: "What school did the intern go to?",
        name: "school"
      }
    ])
    .then(function (res) {
      let newEmployee = new Intern(res.name, res.id, res.email, res.school);
      employeeArray.push(newEmployee);
      newTeamMember();
    });
  }
  
  
  function printTeam() {
    const formattedTeam = render(employeeArray);

    fs.writeFile(outputPath, formattedTeam, function (err) {
      if (err) throw err;
    });

    }

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
