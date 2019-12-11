class Meal {

  constructor(mealName, productsList, sumProteins, sumFat, sumCarbo, sumKcal) {
    this._productsList = productsList;
    this._sumProteins = sumProteins;
    this._sumFat = sumFat;
    this._sumCarbo = sumCarbo;
    this._mealName = mealName;
    this.sumKcal = sumKcal;
  }


  get sumKcal() {
    return this._sumKcal;
  }

  set sumKcal(value) {
    this._sumKcal = value;
  }

  get mealName() {
    return this._mealName;
  }

  set mealName(value) {
    this._mealName = value;
  }

  get productsList() {
    return this._productsList;
  }

  set productsList(value) {
    this._productsList = value;
  }

  get sumProteins() {
    return this._sumProteins;
  }

  set sumProteins(value) {
    this._sumProteins = value;
  }

  get sumFat() {
    return this._sumFat;
  }

  set sumFat(value) {
    this._sumFat = value;
  }

  get sumCarbo() {
    return this._sumCarbo;
  }

  set sumCarbo(value) {
    this._sumCarbo = value;
  }
}
