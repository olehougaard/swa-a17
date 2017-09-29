function view(model) {
    "use strict";
    
    var messages = document.getElementById('messages'),
        table = document.getElementById('board'),
        tiles = [ new Array(3), new Array(3), new Array(3) ],
        reset = document.getElementById('reset');

    messages.textContent = 'Your turn, ' + model.playerInTurn()
    model.observe(function() {
        if (model.winner()) {
            messages.textContent = model.winner().winner + ' won!'
        } else {
            messages.textContent = 'Your turn, ' + model.playerInTurn()
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (model.board(i, j)) {
                    tiles[i][j].style['background-image'] = 'url(' + model.board(i, j) + '.png)';
                } else {
                    tiles[i][j].style.background = 'white';
                }
            }
        };
    })
    
    for (var i = 0; i < 3; i++) {
        var tr = table.appendChild(document.createElement('tr'));
        for (var j = 0; j < 3; j++) {
            tiles[i][j] = tr.appendChild(document.createElement('td'));
        }
    };
    
    function control(controller) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                tiles[i][j].onclick = controller.clickBoard.bind(controller, i, j);
            }
        }
        reset.onclick = controller.clickReset;
    };

    return { control }
}