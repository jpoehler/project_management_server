var dataArray;
var companyScrumArray;
var employeeSprintArray = [0, 0, 0];
var totalTime;

$(document).ready(function(){

  // Calls out to the server to get all of our data
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      dataArray = data;
    }
  });

  // Hides DOM elements until they are ready for use
  $(".company-info").hide();
  $(".employee-info").hide();

  // Creates our "Generate" button and sets our click listeners
  $(".container").append('<button class="center-block btn generator" type="button">Generate</button>')
  $(".generator").on("click", appendCompany);
  $(".assign").on("click", appendEmployees);
  $(".add").on("click", addEmployee);

});

// Random company name generator
function randomCompanyName(name){
  var companyName = name.companies[randomNumber(0, name.companies.length - 1)];
  return companyName;
}

// Appends our randomly generated company information to the DOM
function appendCompany(){

  // Empties out any company fields and employee variables before filling them
  $(".company-header").empty();
  $(".front-end").empty();
  $(".client-side").empty();
  $(".server-side").empty();

  // Hides the employee info pane on new generation and clears its array
  $(".employee-info").hide();
  employeeSprintArray = [0, 0, 0];

  // Generates a random company name and scrum values
  var companyName = randomCompanyName(dataArray);
  newCompanyScrum();

  // Populates the company name and information fields
  $(".company-name").text(companyName);
  $(".company-header").append('<th>Projects:</th>');
  $(".company-header").append('<th>Scrum Points:</th>');
  $(".front-end").append('<td>Front End</td>');
  $(".front-end").append('<td><span class="badge">' + companyScrumArray[0] + '</td>');
  $(".client-side").append('<td>Client Side Logic</td>');
  $(".client-side").append('<td><span class="badge">' + companyScrumArray[1] + '</td>');
  $(".server-side").append('<td>Server Side Logic</td>');
  $(".server-side").append('<td><span class="badge">' + companyScrumArray[2] + '</td>');

  // Fades in the populated information to the DOM
  $(".company-info").fadeIn(1000);
  $(".assign").show();
};

// Appends employee information to the DOM
function appendEmployees(){

  // Empties out any employee fields before filling them
  $(".employee-header").empty();
  $(".employee-body").empty();

  // Populates the employee name and information fields
  $(".employee-header").append('<th>Employee Name</th>');
  $(".employee-header").append('<th>Skillset</th>');
  $(".employee-header").append('<th>Sprint Points</th>');

  // Fades in the populated information to the DOM
  $(".employee-info").fadeIn(1000);
  getEmployee();
}

// Gets employees from the server
function getEmployee(){
  $.ajax({
    type: "POST",
    url: "/employee",
    data: dataArray,
    success: function(data){
      verifyEmployee(data);
    }
  });
}

// Verifies the employee data matches what is needed and applies it to the DOM
function verifyEmployee(data) {
  if (data.skill == "Front End Magician" && employeeSprintArray[0] < companyScrumArray[0]) {
    employeeSprintArray.splice(0, 1, (employeeSprintArray[0] + data.scrumPoints));
    $(".employee-body").append('<tr><td>' + data.name + '</td>' +
    '<td>' + data.skill + '</td><td><span class="badge">' + data.scrumPoints + '</td></tr>');
    getEmployee();
  } else if (data.skill == "Client Side Inquisitor" && employeeSprintArray[1] < companyScrumArray[1]) {
      employeeSprintArray.splice(1, 1, (employeeSprintArray[1] + data.scrumPoints));
      $(".employee-body").append('<tr><td>' + data.name + '</td>' +
      '<td>' + data.skill + '</td><td><span class="badge">' + data.scrumPoints + '</td></tr>');
      getEmployee();
  } else if (data.skill == "Server Side Sorcerer" && employeeSprintArray[2] < companyScrumArray[2]) {
      employeeSprintArray.splice(2, 1, (employeeSprintArray[2] + data.scrumPoints));
      $(".employee-body").append('<tr><td>' + data.name + '</td>' +
      '<td>' + data.skill + '</td><td><span class="badge">' + data.scrumPoints + '</td></tr>');
      getEmployee();
  } else {
    sprintTime();
    $(".assign").hide();
  }
}

// Gets employee from the server
function addEmployee() {
  $.ajax({
    type: "POST",
    url: "/employee",
    data: dataArray,
    success: function(data){
      assignEmployee(data);
    }
  });
}

// Adds a new employee, recalculates the Sprint Time and appends to DOM
function assignEmployee(data) {
  if (data.skill == "Front End Magician") {
    employeeSprintArray.splice(0, 1, (employeeSprintArray[0] + data.scrumPoints));
    $(".employee-body").append('<tr><td>' + data.name + '</td>' +
    '<td>' + data.skill + '</td><td><span class="badge">' + data.scrumPoints + '</td></tr>');
    sprintTime();
  } else if (data.skill == "Client Side Inquisitor") {
    employeeSprintArray.splice(0, 1, (employeeSprintArray[0] + data.scrumPoints));
    $(".employee-body").append('<tr><td>' + data.name + '</td>' +
    '<td>' + data.skill + '</td><td><span class="badge">' + data.scrumPoints + '</td></tr>');
    sprintTime();
  } else if (data.skill == "Server Side Sorcerer") {
    employeeSprintArray.splice(0, 1, (employeeSprintArray[0] + data.scrumPoints));
    $(".employee-body").append('<tr><td>' + data.name + '</td>' +
    '<td>' + data.skill + '</td><td><span class="badge">' + data.scrumPoints + '</td></tr>');
    sprintTime();
  }
}

// Randomly generates the scrum points for the company
function newCompanyScrum(){
  companyScrumArray = [];
  for (var i = 0; i < 3; i++) {
    companyScrumArray.push(randomNumber(10, 60));
  }
}

// Calculates the sprints left after employees have been populated
function sprintTime(){
  var sprintPoints = employeeSprintArray[0] + employeeSprintArray[1] + employeeSprintArray[2];
  var totalScrumPoints = companyScrumArray[0] + companyScrumArray[1] + companyScrumArray[2];
  totalTime = totalScrumPoints / sprintPoints;
  $(".sprint-time").text("Sprints Left: " + totalTime.toFixed(2));
}

// Random number generator
var randomNumber = function(min,max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}
