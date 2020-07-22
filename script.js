
let categoryName = document.querySelector("#category");
let currentWord;
let randomKeyArr = [];


let categories = {
    frutas: ["banana", "maça", "laranja", "mamao", "uva", "melancia", "melao"],
    profissões: ["engenheiro", "advogado", "medico", "professor", "pescador"],
    animais: ["papagaio", "rooster", "cachorro", "gato", "galinha", "cavalo", "porco"],
    cores: ["amarelo", "azul", "laranja", "roxo", "vermelho", "marrom"]
}

//gera um numero aleatorio. Max é o valor max. Multiplica para ficar como int
function getRandomNumber(max) {
    /*
    let randomNumber = Math.random();
    let arrayIndex  = Math.floor(randomNumber * max);
    return arrayIndex;

    */
    return Math.floor(Math.random() * max);
}

//transformar as chaves do objeto em array
//comentei esse código mas talvez ele seja usado mais na frente
function getCatagoryArray(categoriesArray) {
    /*categoriesArray = Object.keys(categories);
    return categoriesArray;
    */
    return Object.keys(categories);
}

//pega uma categoria de forma aleatoria
function getRandomCategory() {
    let categoriesArray = getCatagoryArray();
    let categoryIndex  = getRandomNumber(categoriesArray.length);
    let randomCategory  = categoriesArray[categoryIndex];
    //randomKeyArr.push(randomKey);
    return randomCategory;
}

function setCategoryName() {
    categoryName.innerHTML = getRandomCategory();
}

function setWord() {
    let wordsArray = categories[categoryName.innerHTML];
    let wordsIndex  = getRandomNumber(wordsArray.length);
    return wordsArray[wordsIndex];
}

function init(){
    setCategoryName();
    console.log(setWord());
}

window.addEventListener("load", init);
