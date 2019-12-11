class User {


  constructor(age, height, weight, gender, target, strengthTrainingCounter, cardioTrainingCounter, strengthTrainingTimer, cardioTrainingTimer) {
    this._height = height;
    this._weight = weight;
    this._age = age;
    this._gender = gender;
    this._strengthTrainingCounter = strengthTrainingCounter;
    this._strengthTrainingTimer = strengthTrainingTimer;
    this._cardioTrainingCounter = cardioTrainingCounter;
    this._cardioTrainingTimer = cardioTrainingTimer;
    this._target = target;
  }


  calculateCaloricDemand() {
    let bmr;
    let kcal;
    if (this.gender = 'men') {
      bmr = (9.99 * this.weight) + (6.25 * this.height) - (4.92 * this.age) + 5;
    } else {
      bmr = (9.99 * this.weight) + (6.25 * this.height) - (4.92 * this.age) - 161;
    }
    let eat = ((this.strengthTrainingCounter * this.strengthTrainingTimer) * 0 + (this.cardioTrainingCounter * this.cardioTrainingTimer) * 8) / 7 + bmr + 400;
    let tdee = (eat * 0.1) + eat;

    if (this._target === 'reduction') {
      kcal = tdee - 300;
    } else if (this._target === 'grow') {
      kcal = tdee + 500;
    } else kcal = tdee;

    return (kcal|0);
  }


  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }

  get weight() {
    return this._weight;
  }

  set weight(value) {
    this._weight = value;
  }

  get gender() {
    return this._gender;
  }

  set gender(value) {
    this._gender = value;
  }

  get target() {
    return this._target;
  }

  set target(value) {
    this._target = value;
  }

  get strengthTrainingCounter() {
    return this._strengthTrainingCounter;
  }

  set strengthTrainingCounter(value) {
    this._strengthTrainingCounter = value;
  }

  get cardioTrainingCounter() {
    return this._cardioTrainingCounter;
  }

  set cardioTrainingCounter(value) {
    this._cardioTrainingCounter = value;
  }

  get strengthTrainingTimer() {
    return this._strengthTrainingTimer;
  }

  set strengthTrainingTimer(value) {
    this._strengthTrainingTimer = value;
  }

  get cardioTrainingTimer() {
    return this._cardioTrainingTimer;
  }

  set cardioTrainingTimer(value) {
    this._cardioTrainingTimer = value;
  }
}
