function controller(model) {
    function showModel() {
        update(view(model, controller))
    }

    function clickBoard(x, y) {
        if (model.legalMove(x, y)) {
            model = model.makeMove(x, y);
            update(view(model, this))
        }
    };
    
    function clickReset() {
        model = model.clear();
        update(view(model, this))
    };

    return { clickBoard, clickReset, showModel }
}
