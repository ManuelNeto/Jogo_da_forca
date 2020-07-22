let categoryName = document.querySelector("#category");
let dashes = document.querySelector(".dashes");
let bodyParts = Array.from(document.querySelectorAll("#person div"));
let eyes = Array.from(document.querySelectorAll(".eyes"));

let dashesStr = "";
let classes = [];
let randomWordGlobal = [];
let answerArr = [];
let randomKeyArr = [];

bodyParts.forEach(bodyPart => {
    classes.push(bodyPart.className);
});

let categories = {
    /*frutas: ["banana", "apple", "orange", "pineaple", "grape", "watermelon", "melon"],
    profissões: ["engineer", "housekeeper", "babysister", "teacher", "fisherman"],
    animais: ["parrot", "rooster", "dog", "cat", "chicken", "horse", "pig"],
    emoções: ["anger", "envy", "love", "calm"],*/
    cores: ["amarelo", "azul", "laranja", "roxo", "vermelho", "marrom"],
}

function getRandomNumber(arr) {
    let randomNumber = Math.random();
    let arrayIndex  = Math.floor(randomNumber * arr.length);
    return arrayIndex;
}

function getCatagoryArray(categoriesArray) {
    categoriesArray = Object.keys(categories);
    return categoriesArray;
}

function getRandomKey() {
    let categoriesArray = getCatagoryArray();
    let categoryIndex  = getRandomNumber(categoriesArray);
    let randomKey  = categoriesArray[categoryIndex];
    randomKeyArr.push(randomKey);
    return randomKey;
}

function findRandomWord() {
    let randomKey = randomKeyArr[0];
    let randomValue  = categories[randomKey]; 
    let randomWord = randomValue[getRandomNumber(randomValue)];

    randomWordGlobal.push(randomWord);
    return randomWord;
}

function setCategoryName() {
    categoryName.innerHTML = getRandomKey();
}

function getCharCode(e) {
    let string = randomWordGlobal[0];
    let keyValue = String.fromCharCode(e.keyCode);
    matchKeyToWord(keyValue, string);
}

function getDashes(keyValue, string) {
    let temp = dashesStr.split();
    for (let i = 0; i < string.length; i++){
        dashesStr += "-"
        dashes.innerHTML = dashesStr;
    }  
    setLetters(keyValue, string, temp); 
}

function setLetters(keyValue, string, temp) {
    for (let i = 0; i < string.length; i++) {
        if (dashesStr[i] === "-") {
            temp[i] = string[i] === keyValue ? string[i] : "-";
        } else {
            temp[i] = string[i];
        }
    }
    dashesStr = temp.join("");
    dashes.innerHTML = dashesStr;
}

function matchKeyToWord(keyValue, string) {
    let pattern = keyValue;
    let regexp = new RegExp(`${pattern}`, "i");
    let result = string.match(regexp);

    if(result != null) {
        getDashes(keyValue, string);  
        win();
    } else {
        getBodyParts();
    }
}

let bodyCounter = 0;

function getBodyParts() {
    if(classes.length > (bodyCounter - 8)) {
        classes.pop();
        bodyParts[bodyCounter].classList.remove("hide");
        bodyCounter++;
    } else {
        dashes.innerHTML = "Você perdeu!";
        eyes.forEach((eye => {
            eye.style.opacity = 1;
            eye.style.zIndex = 10;
        }));
        window.removeEventListener("keypress", getCharCode);
    }
}

function win() {
    if(!dashesStr.includes('-')) {
        dashes.innerHTML = "Você venceu!";
        window.removeEventListener("keypress", getCharCode);
    }
}

function init() {
    setCategoryName();
    findRandomWord();
}

window.addEventListener("keypress", getCharCode);
window.addEventListener("load", init);
