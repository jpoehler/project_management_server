function generateSkills(data){
  return data.skillset[randomNumber(0, data.skillset.length - 1)];
}

function randomNumber(min,max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = generateSkills;
