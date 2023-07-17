const BOARD = document.getElementById("board");
const SQUARES = document.querySelectorAll("td");
const PLAYER_SCORE = document.getElementById("player-score");
const TIES_SCORE = document.getElementById("ties-score");
const COMPUTER_SCORE = document.getElementById("computer-score");
const NEW_GAME_BUTTON = document.getElementById("new-game-button");
const WAYS_TO_WIN = [
  // Rows.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns.
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals.
  [0, 4, 8],
  [2, 4, 6],
];

let boardArray = [...Array(9)];
let player_wins = 0;
let computer_wins = 0;
let ties = 0;
let gameFinish;

function computerMove() {
  if (gameFinish) return;

  const AVAILABLE_SPOTS = openSpots();
  const RANDOM_INDEX = Math.floor(Math.random() * AVAILABLE_SPOTS.length);
  const INDEX = AVAILABLE_SPOTS[RANDOM_INDEX];
  const SPAN = SQUARES[INDEX].querySelector("span");

  boardArray[INDEX] = "O";
  SPAN.textContent = "O";
  SPAN.classList.add("o-letter");

  if (checkWin("O")) {
    gameFinish = true;
    computer_wins++;
    COMPUTER_SCORE.textContent = computer_wins;
    NEW_GAME_BUTTON.classList.remove("hidden");
    return;
  }

  if (!boardArray.includes()) {
    gameFinish = true;
    ties++;
    TIES_SCORE.textContent = ties;
    NEW_GAME_BUTTON.classList.remove("hidden");
  }
}

function player_move(td) {
  if (gameFinish) return;

  const INDEX = td.getAttribute("data-index");
  const SPAN = td.querySelector("span");

  boardArray[INDEX] = "X";
  SPAN.textContent = "X";
  SPAN.classList.add("x-letter");

  if (checkWin("X")) {
    gameFinish = true;
    player_wins++;
    PLAYER_SCORE.textContent = player_wins;
    NEW_GAME_BUTTON.classList.remove("hidden");
    return;
  }

  if (!boardArray.includes()) {
    gameFinish = true;
    ties++;
    TIES_SCORE.textContent = ties;
    NEW_GAME_BUTTON.classList.remove("hidden");
  }
}

function openSpots() {
  let indexes = [];

  boardArray.forEach((cell, i) => {
    if (!cell) {
      indexes.push(i);
    }
  });

  return indexes;
}

function applyLineStyle(a, b, c, letter) {
  const SQUARE_A = SQUARES[a].querySelector("div");
  const SQUARE_B = SQUARES[b].querySelector("div");
  const SQUARE_C = SQUARES[c].querySelector("div");
  const LINE_COLOR = letter === "X" ? "x-line-color" : "o-line-color";

  if (a % 3 === b % 3 && a % 3 === c % 3) {
    SQUARE_A.classList.add("vertical-line", LINE_COLOR);
    SQUARE_B.classList.add("vertical-line", LINE_COLOR);
    SQUARE_C.classList.add("vertical-line", LINE_COLOR);
  } else if (
    (a === 0 && c === 2) ||
    (a === 3 && c === 5) ||
    (a === 6 && c === 8)
  ) {
    SQUARE_A.classList.add("horizontal-line", LINE_COLOR);
    SQUARE_B.classList.add("horizontal-line", LINE_COLOR);
    SQUARE_C.classList.add("horizontal-line", LINE_COLOR);
  } else if (a === 0 && c === 8) {
    SQUARE_A.classList.add("diagonal-line-left-to-right", LINE_COLOR);
    SQUARE_B.classList.add("diagonal-line-left-to-right", LINE_COLOR);
    SQUARE_C.classList.add("diagonal-line-left-to-right", LINE_COLOR);
  } else if (a === 2 && c === 6) {
    SQUARE_A.classList.add("diagonal-line-right-to-left", LINE_COLOR);
    SQUARE_B.classList.add("diagonal-line-right-to-left", LINE_COLOR);
    SQUARE_C.classList.add("diagonal-line-right-to-left", LINE_COLOR);
  }
}

function checkWin(letter) {
  for (const [A, B, C] of WAYS_TO_WIN) {
    if (
      boardArray[A] === letter &&
      boardArray[B] === letter &&
      boardArray[C] === letter
    ) {
      applyLineStyle(A, B, C, letter);

      return true;
    }
  }

  return false;
}

function new_game() {
  boardArray = [...Array(9)];
  gameFinish = false;

  SQUARES.forEach((td) => {
    const SPAN = td.querySelector("span");
    const DIV = td.querySelector("div");

    SPAN.textContent = "";
    SPAN.classList.value = "";
    DIV.classList.value = "";
  });
}

document.addEventListener("click", (event) => {
  const TARGET = event.target;

  if (TARGET.tagName === "TD") {
    player_move(TARGET);
    computerMove();
  } else if (TARGET === NEW_GAME_BUTTON) {
    new_game();
    NEW_GAME_BUTTON.classList.add("hidden");
  }
});
