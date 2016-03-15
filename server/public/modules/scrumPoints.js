function scrumPoints(){
  return randomNumber(1, 9);
}

function randomNumber(min,max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};

module.exports = scrumPoints;
