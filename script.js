const gameboard = (function () {
  board = [];

  for (let i = 0; i < 9; i++) board[i] = "";

  const place = function (position, symbol) {
    board[position] = symbol;
  };

  const printBoard = function () {
    for (let i = 0; i < 3; i++)
      console.log(board[3 * i], board[3 * i + 1], board[3 * i + 2]);
  };

  const gameover = function () {
    for (let i = 0; i < 3; i++) {
      if (
        board[0 + i] === board[3 + i] &&
        board[3 + i] === board[6 + i] &&
        board[0 + i]
      )
        return "win";

      if (
        board[3 * i] === board[3 * i + 1] &&
        board[3 * i + 1] === board[3 * i + 2] &&
        board[3 * i]
      )
        return "win";
    }

    if (board[0] === board[4] && board[4] === board[8] && board[0])
      return "win";
    if (board[2] === board[4] && board[4] === board[6] && board[2])
      return "win";

    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        isDraw = false;
        break;
      }
    }

    return isDraw ? "draw" : "";
  };

  const clear = function () {
    board = [];
    for (let i = 0; i < 9; i++) board[i] = "";
  };

  return { place, printBoard, gameover, clear };
})();

const gameController = (function () {
  let currentPlayer = 0;
  const symbols = ["X", "O"];
  let playersNames = ["Player 1", "Player 2"];

  const getCurrentPlayerSymbol = () => symbols[currentPlayer];

  const playRound = (position) => {
    if (!gameboard.gameover()) {
      gameboard.place(position, getCurrentPlayerSymbol());

      if (gameboard.gameover() === "win") {
        displayController.updateResult(`${playersNames[currentPlayer]} wins!`);
      } else if (gameboard.gameover() === "draw") {
        displayController.updateResult("It's a draw.");
      }

      currentPlayer = currentPlayer ? 0 : 1;
    }
  };

  const setPlayersNames = (player1, player2) => {
    if (player1 !== "") playersNames[0] = player1;
    if (player2 !== "") playersNames[1] = player2;
  };

  const reset = function () {
    currentPlayer = 0;
    gameboard.clear();
  };

  return { playRound, getCurrentPlayerSymbol, setPlayersNames, reset };
})();

const displayController = (function () {
  const boardDiv = document.getElementById("board");
  const resultMessage = document.getElementById("result");
  const boardBtns = document.querySelectorAll("#board > button");
  const resetBtn = document.getElementById("reset");
  const dialog = document.querySelector("dialog");
  const startBtn = document.getElementById("start");

  window.addEventListener("load", () => dialog.showModal(), { once: true });

  boardBtns.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      if (!!gameboard.gameover()) return;
      btn.textContent = gameController.getCurrentPlayerSymbol();
      gameController.playRound(index);
      btn.disabled = true;
    });
  });

  const updateResult = (text) => {
    resultMessage.innerText = text;
  };

  resetBtn.addEventListener("click", (event) => {
    gameController.reset();
    boardBtns.forEach((btn, index) => {
      btn.disabled = false;
      btn.textContent = "\xa0";
    });
    updateResult("");
  });

  startBtn.addEventListener(
    "click",
    () => {
      const form = document.forms["start-form"];
      const fd = new FormData(form);

      gameController.setPlayersNames(
        fd.get("player1-name"),
        fd.get("player2-name")
      );
      dialog.close();
    },
    { once: true }
  );

  return { updateResult };
})();
