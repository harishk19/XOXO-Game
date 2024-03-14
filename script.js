const selectBox = document.querySelector(".select-box");
const selectBtnX = selectBox.querySelector(".options .playerX");
const selectBtnO = selectBox.querySelector(".options .playerO");
const playBoard = document.querySelector(".play-board");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

window.onload = () => {
    allBox.forEach(box => box.addEventListener("click", clickedBox));
}

function clickedBox() {
    if (players.classList.contains("player")) {
        playerSign = "O";
        this.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
    } else {
        playerSign = "X";
        this.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
    }
    selectWinner();
    this.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    setTimeout(bot, (Math.random() * 1000) + 200);
}

function bot() {
    let emptyBoxes = Array.from(allBox).filter(box => box.childElementCount === 0);
    if (runBot && emptyBoxes.length > 0) {
        playerSign = "O";
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        selectWinner();
        randomBox.style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign;
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 1000);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        if (Array.from(allBox).every(box => box.childElementCount > 0)) {
            runBot = false;
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 1000);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

selectBtnX.onclick = selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    if (this === selectBtnO) {
        players.classList.add("active", "player");
        playerSign = "O";
    }
}

replayBtn.onclick = () => window.location.reload();
