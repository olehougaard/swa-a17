function controller(view, model) {
    "use strict";
    
    function showModel() {
        if (model.winner()) {
            view.showWinner(model.winner());
        } else {
            view.showInTurn(model.playerInTurn());
        }
        view.updateBoard(model.board);
    }

    function clickBoard(x, y) {
        if (model.legalMove(x, y)) {
            model.makeMove(x, y);
            showModel();
        }
    };
    
    function clickReset() {
        model.clear();
        showModel();
    };

    showModel();

    return { clickBoard, clickReset }
}
