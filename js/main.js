let user;
let kcal;
let proteinValue;
let fatValue;
let carbohydratesValue;

function getUserData() {
  let age = document.getElementById('age').value;
  let height = document.getElementById('height').value;
  let weight = document.getElementById('weight').value;
  let gender = document.getElementById('gender').value;
  let target = document.getElementById('target').value;
  let strengthTrainingCounter = document.getElementById('strengthTrainingCounter').value;
  let cardioTrainingCounter = document.getElementById('cardioTrainingCounter').value;
  let strengthTrainingTimer = document.getElementById('strengthTrainingTimer').value;
  let cardioTrainingTimer = document.getElementById('cardioTrainingTimer').value;
  let proteins = document.getElementById('proteins').value;
  let fat = document.getElementById('fat').value;
  user = new User(age, height, weight, gender, target, strengthTrainingCounter, cardioTrainingCounter, strengthTrainingTimer, cardioTrainingTimer);

  kcal = user.calculateCaloricDemand();
  proteinValue = ((user.weight * proteins) | 0);
  fatValue = (((kcal * fat / 100) / 9) | 0);
  carbohydratesValue = ((kcal - fatValue * 9 - proteinValue * 4) / 4 | 0);

  sessionStorage.setItem('proteins', proteinValue);
  sessionStorage.setItem('fat', fatValue);
  sessionStorage.setItem('carbohydrates', carbohydratesValue);
  sessionStorage.setItem('kcal', kcal);

}
