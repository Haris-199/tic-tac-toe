const gameboard = (function() {
    board = [];
    
    for (let i = 0; i < 9; i++)
        board[i] = "";

    const place = function(position, symbol) {
        board[position] = symbol;
    }

    const printBoard = function() {
        for (let i = 0; i < 3; i++)
            console.log(board[3 * i], board[3 * i + 1], board[3 * i + 2]);
    }
    
    const gameover = function() {
        for (let i = 0; i < 3; i++) {
            if (board[0 + i] === board[3 + i] && board[3 + i] === board[6 + i] && board[0 + i])
                return "win";

            if (board[3 * i] === board[3 * i + 1] && board[3 * i + 1] === board[3 * i + 2] && board[3 * i])
                return "win";
        }

        if (board[0] === board[4] && board[4] === board[8] && board[0])
            return "win";
        if (board[2] === board[4] && board[4] === board[6] && board[2])
            return "win";

        let isDraw = true;
        for (let i = 0; i < board.length; i++)
            if (board[i] === "")
                isDraw = false;

        return (isDraw)? "draw" : "";
    }
    
    return {place, printBoard, gameover};
})();

const gameController = (function() {
    let currentPlayer = 0;
    const symbols = ["X", "O"];

    const playRound = (position) => {
        if (!gameboard.gameover()) {
            gameboard.place(position, symbols[currentPlayer]);

            if (gameboard.gameover() === "win")
                console.log(`Player ${currentPlayer + 1} wins!`);
            else if (gameboard.gameover() === "draw")
                console.log("It's a draw.");
            
            currentPlayer = (currentPlayer)? 0 : 1;
            gameboard.printBoard();
        }
    }

    return {playRound};
})();
