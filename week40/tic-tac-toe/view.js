function view(document) {
    "use strict";
    
    var messages = document.getElementById('messages'),
        table = document.getElementById('board'),
        tiles = [ new Array(3), new Array(3), new Array(3) ],
        reset = document.getElementById('reset');
    
    for (var i = 0; i < 3; i++) {
        var tr = table.appendChild(document.createElement('tr'));
        for (var j = 0; j < 3; j++) {
            tiles[i][j] = tr.appendChild(document.createElement('td'));
        }
    };
    
    function showWinner(winner) {
        messages.textContent = winner.winner + ' won!'
    };
    
    function showInTurn(inTurn) {
        messages.textContent = 'Your turn, ' + inTurn;
    };
    
    function updateBoard(board) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board(i, j)) {
                    tiles[i][j].style['background-image'] = 'url(' + board(i, j) + '.png)';
                } else {
                    tiles[i][j].style.background = 'white';
                }
            }
        };
    };

    function control(controller) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                tiles[i][j].onclick = controller.clickBoard.bind(controller, i, j);
            }
        }
        reset.onclick = controller.clickReset;
    };

    return { showWinner, showInTurn, updateBoard, control }
}