const gameboard = (function() {
    board = [];
    
    for (let i = 0; i < 9; i++)
        board[i] = " ";

    const place = function(position, symbol) {
        board[position] = symbol;
    }

    const printBoard = function() {
        for (let i = 0; i < 3; i++)
            console.log(board[3 * i], board[3 * i + 1], board[3 * i + 2]);
    }
    
    return {place, printBoard};
})();

const gameController = (function() {
    
})();
