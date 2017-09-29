function controller(view, model) {
    "use strict";
    
    function clickBoard(x, y) {
        if (model.legalMove(x, y))
            model.makeMove(x, y);
    };
    
    function clickReset() {
        model.clear();
    };

    view.control( { clickBoard, clickReset })
}
