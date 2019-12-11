let filteredTableContainer;
let proteins;
let fat;
let carbohydrates;
let kcal;
let prodTable = document.getElementById('productsTable');
let mTable = document.getElementById('mealTable');

let productsList = [];
let mealList = [];
let productApiList = [];


let proteinSum = 0;
let fatsSum = 0;
let carbosSum = 0;
let kcalSum = 0;

let product;


let options = {
  numberPerPage: 12,
  constNumberPerPage: 10,
  numberOfPages: 4,
  goBar: false,
  pageCounter: true,
  hasPagination: true,
};

let filterOptions = {
  el: '#searchBox'
};

function getUserData() {
  proteins = sessionStorage.getItem('proteins');
  fat = sessionStorage.getItem('fat');
  carbohydrates = sessionStorage.getItem('carbohydrates');
  kcal = sessionStorage.getItem('kcal');
  document.getElementById('proteins').innerHTML = "Białko: " + proteins + "g";
  document.getElementById('fat').innerHTML = "Tłuszcz: " + fat + "g";
  document.getElementById('carbohydrates').innerHTML = "Węglowodany: " + carbohydrates + "g";
  document.getElementById('kcal').innerHTML = "Kcal: " + kcal;
}

getUserData();

(function () {

  function onChange(event) {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event) {
    productApiList = JSON.parse(event.target.result);
    productApiList.sort((a, b) => a.name.localeCompare(b.name));
    filteredProductsList();
  }


  document.getElementById('file').addEventListener('change', onChange);

}());

function createTable() {


  proteinSum = 0;
  fatsSum = 0;
  carbosSum = 0;
  kcalSum = 0;
  let productTable =
    `

<table class="table table-bordered">
  <thead>
    <tr class="table-primary">
      <th scope="col">Nazwa</th>
      <th scope="col">Białko</th>
      <th scope="col">Tłuszcz</th>
      <th scope="col">Węglowodany</th>
      <th scope="col">Ilość</th>
      <th scope="col">Kalorie</th>
      <th scope="col">Usuń</th>
    </tr>
  </thead>
  <tbody>
    `;
  for (let product of productsList) {
    proteinSum += product.proteins;
    fatsSum += product.fat;
    carbosSum += product.carbohydrates;
    kcalSum += product.kcal;
    productTable = productTable +
      `<tr>
      <th scope="row">${product.name}</th>
      <td>${(product.proteins | 1)}</td>
      <td>${(product.fat | 1)}</td>
      <td>${(product.carbohydrates | 1)}</td>
      <td>${product.count}</td>
      <td>${(product.kcal | 1)}</td>
      <td><input type="button"  class="btn btn-danger" value="Usuń" onclick="deleteFromProductTable('${product.name}')"</td></td>
    </tr>`
  }

  productTable = productTable +
    `<tr class="table-success">
      <th scope="row">Suma</th>
      <td>${proteinSum}</td>
      <td>${fatsSum}</td>
      <td>${carbosSum}</td>
      <td></td>
      <td>${kcalSum}</td>
      <td></tr>
    </tbody>
  </table>
      <button type="button" class="btn btn-danger" id="clearProdList" onclick="clearProdList()">Wyczyść tablice
`;
  prodTable.innerHTML = productTable;
}

function deleteFromProductTable(productName) {
  productsList.splice(productsList.indexOf(productName), 1);
  createTable();
}

function addNewProduct() {
  let productCount = document.getElementById('productCount').value;
  let newProductName = document.getElementById('newProdName').value;
  let newProductProteins = (document.getElementById('newProductProteins').value);
  let newProductFat = (document.getElementById('newProductFat').value);
  let newProductCarbo = (document.getElementById('newProductCarbo').value);
  let newProduct = new Product(newProductName, parseInt(newProductProteins), parseInt(newProductFat), parseInt(newProductCarbo), parseInt(productCount));
  productsList.push(newProduct);
  createTable();
}

function clearProdList() {
  productsList = [];
  createTable();
}

createTable();


function createMeal() {
  let mealName;
  mealName = document.getElementById('mealName').value;
  let meal = new Meal(mealName, productsList, proteinSum, fatsSum, carbosSum, kcalSum);
  let checkedMeal = mealList.find(value => value.mealName === meal.mealName);
  console.log(checkedMeal);
  if (checkedMeal != undefined) {
    mealList.splice(mealList.indexOf(checkedMeal), 1);
    mealList.push(meal);
  } else {
    mealList.push(meal);
  }
  productsList = [];
  createTable();
  createMealTable();
}


function createMealTable() {
  let dailyProteinSum = 0;
  let dailyFatSum = 0;
  let dailyCarboSum = 0;
  let dailyKcalSum = 0;
  let mealTable =
    `<table class="table table-bordered" id="mealsTable">
    `;
  for (let meal of mealList) {
    dailyKcalSum += meal.sumKcal;
    mealTable = mealTable +
      `
    <thead>
    <tr class="table-success">
      <th colspan="1"> Nazwa posiłku :${meal.mealName}</th>
      <th colspan="1">Suma białka ${meal.sumProteins}</th>
      <th colspan="1">Suma tłuszczy ${meal.sumFat}</th>
      <th colspan="1">Suma węglowodanów ${meal.sumCarbo}</th>
      <th colspan="1">Suma kalorii ${meal.sumKcal}</th>
      <th colspan="1">Ilość</th>
      <th colspan="1"><input type="button"  class="btn btn-primary" value="Edytuj Posiłek" onclick="editMeal('${meal.mealName}')"></th>
      <th colspan="1"><input type="button"  class="btn btn-danger" value="Usuń Posiłek" onclick="deleteMeal('${meal.mealName}')"></th>
     </tr>
    </thead>
    <tbody>
     `
    mealTable = mealTable +
      `
      <tr class="table-active" style="font-size: 0.8rem">
       <th scope="col">Nazwa Produktu</th>
    <th scope="col">Białko</th>
    <th scope="col">Tłuszcz</th>
    <th scope="col">Węglowodany</th>
    <th scope="col">Kalorie</th>
    <th scope="col">Ilość</th>
</tr>
   `;
    for (let product of meal.productsList) {
      dailyCarboSum += product.carbohydrates;
      dailyFatSum += product.fat;
      dailyProteinSum += product.proteins;
      ;

      mealTable = mealTable +
        `
     <tr class="table-active" style="font-size: 0.8rem" >
      <td scope="row">${product.name}</td>
      <td scope="row">${(product.proteins | 1)}</td>
      <td scope="row">${(product.fat | 1)}</td>
      <td scope="row">${(product.carbohydrates | 1)}</td>
      <td scope="row">${(product.kcal | 1)}</td>
      <td scope="row">${(product.count | 1)}</td>
    </tr>`;
    }
  }

  mealTable = mealTable +
    `<tr class="table-danger">
 <th scope="col">Suma z posiłków</th>
    <th scope="col">Całkowita Suma Białka</th>
    <th scope="col">Całkowita Suma Tłuszczy</th>
    <th scope="col">Całkowita Suma Węglowodanów</th>
    <th scope="col">Całkowita Suma Kalorii</th>
</tr>

    <tr class="table-info">
      <td scope="row"></td>
      <td scope="row">${dailyProteinSum}</td>
      <td scope="row">${dailyFatSum}</td>
      <td scope="row">${dailyCarboSum}</td>
      <td scope="row">${dailyKcalSum}</td>
    </tr>`;
  mealTable = mealTable +
    `<tr class="table-warning">
 <th scope="col">Potrzeba jeszcze</th>
    <th scope="col">Białka ${proteins - dailyProteinSum}</th>
    <th scope="col">Tłuszczy ${fat - dailyFatSum}</th>
    <th scope="col">Węglowodanów ${carbohydrates - dailyCarboSum}</th>
    <th scope="col">Kalorii ${kcal - dailyKcalSum}</th>
</tr>
   </tbody>
  </table>`;
  mTable.innerHTML = mealTable;
}

function editMeal(meal) {
  let mealName;
  mealName = document.getElementById('mealName');
  let editedMeal = mealList.find(value => value.mealName = meal);
  console.log(editedMeal.mealName);
  mealName.value = editedMeal.mealName;
  for (let product of editedMeal.productsList) {
    productsList.push(product);
  }
  createTable();
}

function deleteMeal(mealName) {
  console.log(mealName);
  let meal = mealList.find(value => value.mealName === mealName);
  mealList.splice(mealList.indexOf(meal), 1);
  createMealTable();
}

function filteredProductsList() {
  filteredTableContainer = document.getElementById('filteredProdList');
  let filteredTable =
    ` <input type="search" id="searchBox" placeholder="Filter..." class="form-control">
      <table class="table table-hover" id="importedProdList">
        <thead>
        <tr>
          <th scope="col">Nazwa</th>
          <th scope="col">Białko</th>
          <th scope="col">Tłuszcz</th>
          <th scope="col">Węglowwodany</th>
          <th scope="col">Kalorie</th>
          <th scope="col">Dodaj</th>
        </tr>
        </thead>
        <tbody>`;
  for (let product of productApiList) {
    filteredTable = filteredTable +
      `
     <tr style="font-size: 0.8rem" >
      <td scope="row">${product.name}</td>
      <td scope="row">${(product.proteins | 1)}</td>
      <td scope="row">${(product.fat | 1)}</td>
      <td scope="row">${(product.carbohydrates | 1)}</td>
      <td scope="row">${(product.kcal | 1)}</td>
      <td class="addButton"><input type="button"  class="btn btn-success" value="Dodaj" onclick="getProd('${product.name}','${(product.proteins | 1)}','${(product.fat | 1)}','${(product.carbohydrates | 1)}')"></td>
    </tr>`;
  }
  ;
  filteredTable = filteredTable +
    `
  </tbody>
</table>
    `;
  filteredTableContainer.innerHTML = filteredTable;

  paginate.init('#importedProdList', options, filterOptions);
}


function getProd(productName, productProteins, productFat, productCarbo) {
  product = new Product(productName, productProteins, productFat, productCarbo, 100);
  let newProductCount = document.getElementById('productCount');
  let newProductFat = document.getElementById('newProductFat');
  let newProductCarbo = document.getElementById('newProductCarbo');
  let newProductName = document.getElementById('newProdName');
  let newProductProteins = document.getElementById('newProductProteins');
  newProductCount.value = product.count;
  newProductName.value = product.name;
  newProductProteins.value = (product.proteins * (newProductCount.value / 100) | 1);
  newProductFat.value = (product.fat * (newProductCount.value / 100) | 1);
  newProductCarbo.value = (product.carbohydrates * (newProductCount.value / 100) | 1);
}

function calcMacros() {
  let newProductCount = document.getElementById('productCount');
  let newProductFat = document.getElementById('newProductFat');
  let newProductCarbo = document.getElementById('newProductCarbo');
  let newProductName = document.getElementById('newProdName');
  let newProductProteins = document.getElementById('newProductProteins');
  newProductName.value = product.name;
  newProductProteins.value = (product.proteins * (newProductCount.value / 100) | 1);
  newProductFat.value = (product.fat * (newProductCount.value / 100) | 1);
  newProductCarbo.value = (product.carbohydrates * (newProductCount.value / 100) | 1);

}
