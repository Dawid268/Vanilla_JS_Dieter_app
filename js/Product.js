class Product {

  constructor(name, proteins, fat, carbohydrates, count) {
    this._proteins = proteins;
    this._fat = fat;
    this._carbohydrates = carbohydrates;
    this._name = name;
    this._count = count;
    this.kcal = ((proteins * 4) + (carbohydrates * 4) + (fat * 9));
  }


  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get kcal() {
    return this._kcal;
  }

  set kcal(value) {
    this._kcal = value;
  }

  get proteins() {
    return this._proteins;
  }

  set proteins(value) {
    this._proteins = value;
  }

  get fat() {
    return this._fat;
  }

  set fat(value) {
    this._fat = value;
  }

  get carbohydrates() {
    return this._carbohydrates;
  }

  set carbohydrates(value) {
    this._carbohydrates = value;
  }
}
