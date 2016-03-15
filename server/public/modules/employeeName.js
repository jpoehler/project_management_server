function generateEmployee(data){

  var randomFirstName = data.firstname[randomNumber(0, data.firstname.length - 1)];
  var randomLastName = data.lastname[randomNumber(0, data.lastname.length - 1)];
  var randomEmployee = randomFirstName + ' ' + randomLastName;
  return randomEmployee;
}

var randomNumber = function(min,max){
return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = generateEmployee;
