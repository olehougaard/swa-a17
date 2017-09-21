function model() {
    "use strict";

    function array(length, init) {
        return Array.apply(null, new Array(length)).map(init || (_ => undefined))
    }

    function createModel(board, inTurn) {
        function updateArray(a, i, f) {
            return a.map((e, j) => (i === j) ? f(e, j) : e)
        }

        function setTile(board, x, y, value) {
            return updateArray(board, x, row => updateArray(row, y, _ => value))
        }

        function tile(x, y) {
            return board[x][y];
        };

        function row(x, y, dx, dy) {
            return array(board.length, (_, i) => ({x: x + i * dx, y: y + i * dy}))
        }

        function hasWon(theRow, candidate) {
            return  theRow.every(({x, y}) => tile(x, y) === candidate)
        }
    
        function verticalRows() {
            return array(board.length, (_, i) => row(0, i, 1, 0));
        }
        
        function horizontalRows() {
            return array(board.length, (_, i) => row(i, 0, 0, 1));
        }

        function diagonalRows() {
            return [row(0, 0, 1, 1), row(0, 2, 1, -1)];
        }
        
        function allRows() {
            return verticalRows().concat(horizontalRows()).concat(diagonalRows())
        }

        function winningRow(candidate) {
            return allRows().find(x => hasWon(x, candidate))
        }
        
        function getWinner(candidate) {
            var w = winningRow(candidate);
            if (w) return { winner: candidate, row : w };
        }
        
        function winner() {
            return getWinner('X') || getWinner('O');
        }
        
        function playerInTurn() { return inTurn; }
        
        function legalMove(x, y) {
            if (x < 0 || y < 0 || x > 2 || y > 2) return false;
            if (tile(x, y)) return false;
            if (winner()) return false;
            return true;
        }
        
        function makeMove(x, y) {
            if (!legalMove(x, y)) throw 'Illegal move';
            return createModel(setTile(board, x, y, inTurn), (inTurn === 'X') ? 'O' : 'X');
        }
        
         function clear () {
            return createModel(array(3, _ => array(3)), 'X');
        }

        return { tile, winner, playerInTurn, legalMove, makeMove, clear, board };
    }

    return createModel(array(3, _ => array(3)), 'X');
}
