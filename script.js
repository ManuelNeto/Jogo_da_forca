
let categoryName = document.querySelector("#category");
let wrongletters = document.querySelector(".wrongletters");
let dashes = document.querySelector(".dashes");
let eyes = Array.from(document.querySelectorAll(".eyes"));
let bodyParts = Array.from(document.querySelectorAll("#person div"));
// let numTry = 0;
let currentWord;
let randomKeyArr = [];
let wronglettersArray = [];
let correctletters = [];
let bodyCounter;



let classes = [];
bodyParts = bodyParts.slice(2, bodyParts.length);

let categories = {
    frutas: ["banana", "maça", "laranja", "mamao", "uva", "melancia", "melao"],
    profissões: ["engenheiro", "advogado", "medico", "professor", "pescador"],
    animais: ["papagaio", "galo", "cachorro", "gato", "galinha", "cavalo", "porco"],
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
    currentWord = wordsArray[wordsIndex];
    correctletters = currentWord.split(''); // Lista de verificação
    //console.log(correctletters);
    return wordsArray[wordsIndex];
}

//Oculta a palavra
function hideWord(word) {
    console.log(word);
    let hideWord = "";
    for (const iterator of word) {
        hideWord += "-"
    }
    dashes.innerHTML = hideWord;
    wrongletters.innerHTML = "Letras erradas: ";
    return hideWord;
}


function getCharCode(e){
    //numTry +=1;
    /* let string = randomWordGlobal[0];
    let keyValue = String.fromCharCode(e.keyCode);
    matchKeyToWord(keyValue, string); */
    game(e.key);
    return e.key
}

function updateDashes(letter){
    let algumaword = "";
    for (let i = 0; i < currentWord.length; i++) {
        if(currentWord[i] === letter){
            algumaword += letter;
            //classes.pop();
            //bodyParts[0].classList.remove("hide");
            console.log('entrei');
        } else if(dashes.innerHTML[i] != "-"){
            algumaword += dashes.innerHTML[i];
            //bodyParts[0].style.opacity = 1;
            //bodyParts[0].style.zIndex = 10;
        } else{
            algumaword += "-";
        }        
    }
    dashes.innerHTML = algumaword;
}

//let bodyCounter = 0;

function getBodyParts(){
    if(bodyParts.length > bodyCounter){
        classes.pop();
        bodyParts[bodyCounter].classList.remove("hide");
        console.log('desenhei');
        bodyCounter++;
    }
}

function game(letter){
    if(correctletters.includes(letter)){
        updateDashes(letter);
    } else {
        wronglettersArray.push(letter);
        wrongletters.innerHTML = "Letras erradas: " + wronglettersArray;
        getBodyParts();
    }
    checkEndGame();
}

function checkEndGame(){
    if(win()) {
        dashes.innerHTML = "Você venceu!";
        window.removeEventListener("keypress", getCharCode);
    }else if(wronglettersArray.length > bodyParts.length){
        eyes.forEach((eye => {
            eye.style.opacity = 1;
            eye.style.zIndex = 10;
        }));
        dashes.innerHTML = "Você perdeu!";
        window.removeEventListener("keypress", getCharCode);
    }
}

function win() {
    if(!dashes.innerHTML.includes('-')) {
        return true;
    }else{
        return false;
    }
}

function initDoll(){
    eyes.forEach((eye => {
        eye.style.opacity = 0.3;
    }));
    bodyParts.forEach(bodyPart => {
        bodyPart.classList.add("hide");
    });
    console.log(bodyParts);

}

function init(){
    classes = [];
    bodyCounter = 0;
    wronglettersArray =[];
    setCategoryName();
    //Coloquei só para testar
    hideWord(setWord());
    initDoll();
}

function newGame() {
    window.addEventListener("keypress", getCharCode);
    init();
}

window.addEventListener("keypress", getCharCode);
window.addEventListener("load", init);
