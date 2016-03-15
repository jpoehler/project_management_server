var employeeGen = require('./employeeName.js');
var skillSetGen = require('./skillSet.js');
var scrumGen = require('./scrumPoints.js');

function employee(data){
  return {name: employeeGen(data), skill: skillSetGen(data), scrumPoints: scrumGen(data)};
}

module.exports = employee;
