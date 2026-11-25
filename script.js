let userName = "";

while (true) {
    let input = prompt("Введіть ваше ім'я (від 2 до 15 символів):", "User");

    if (input === null) {
        alert("Ім'я не може бути порожнім!");
        continue;
    }

    input = input.trim();

    if (input.length < 2 || input.length > 15) {
        alert("Помилка! Введіть ім'я довжиною від 2 до 15 символів.");
    } else {
        userName = input;
        break;
    }
}

document.getElementById("user-name").textContent = userName;

let userScore = 0;
let compScore = 0;
let roundNumber = 0;
let isGameOver = false;

const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const userNumberEl = document.getElementById("user-number");
const compNumberEl = document.getElementById("comp-number");
const statusEl = document.getElementById("round-status");
const historyListEl = document.getElementById("history-list");
const generateBtn = document.getElementById("generate-btn");

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    roundNumber = 0;
    isGameOver = false;

    userScoreEl.textContent = "0";
    compScoreEl.textContent = "0";
    userNumberEl.textContent = "?";
    compNumberEl.textContent = "?";
    statusEl.textContent = "Нова гра! Натисніть Generate";
    generateBtn.textContent = "Generate";
    historyListEl.innerHTML = "";
}

generateBtn.addEventListener("click", function () {
    if (isGameOver) {
        resetGame();
        return;
    }

    roundNumber++;

    const userNum = getRandomNumber();
    const compNum = getRandomNumber();

    userNumberEl.textContent = userNum;
    compNumberEl.textContent = compNum;

    let roundResult = "";

    if (userNum > compNum) {
        userScore++;
        userScoreEl.textContent = userScore;
        roundResult = `Переміг ${userName}`;
    } else if (compNum > userNum) {
        compScore++;
        compScoreEl.textContent = compScore;
        roundResult = "Переміг Computer";
    } else {
        roundResult = "Нічия";
    }

    statusEl.textContent = roundResult;

    const li = document.createElement("li");
    li.textContent = `Раунд ${roundNumber}: ${userName} (${userNum}) — Computer (${compNum}) | ${roundResult}`;
    historyListEl.prepend(li);

    if (userScore === 3 || compScore === 3) {
        isGameOver = true;
        const winner = userScore === 3 ? userName : "Computer";
        statusEl.textContent = `Гра завершена! Переможець: ${winner}`;
        generateBtn.textContent = "Play Again";
    }
});

const dvd = document.getElementById("dvd-logo");

const dvdImages = [
    "dvd1.png",
    "dvd2.png",
    "dvd3.png",
    "dvd4.png",
    "dvd5.png",
	"dvd6.png",
	"dvd7.png"
];

let currentImgIndex = 0;
let posX = 20;
let posY = 20;
let speedX = 3;
let speedY = 3;

function changeDvdImage() {
    currentImgIndex++;
    if (currentImgIndex >= dvdImages.length) {
        currentImgIndex = 0;
    }
    dvd.src = dvdImages[currentImgIndex];
}

dvd.src = dvdImages[0];

setInterval(function () {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const imgWidth = dvd.offsetWidth;
    const imgHeight = dvd.offsetHeight;

    let hitWall = false;

    posX += speedX;
    posY += speedY;

    if (posX + imgWidth >= screenWidth || posX <= 0) {
        speedX = -speedX;
        hitWall = true;
    }

    if (posY + imgHeight >= screenHeight || posY <= 0) {
        speedY = -speedY;
        hitWall = true;
    }

    if (hitWall) {
        changeDvdImage();
    }

    dvd.style.left = posX + "px";
    dvd.style.top = posY + "px";
}, 20);