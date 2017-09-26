function controller(initialState, updater) {
    let model = initialState
    function showModel() {
        updater(model, controller)
    }

    function clickBoard(x, y) {
        if (model.legalMove(x, y)) {
            model = model.makeMove(x, y);
            updater(model, this)
        }
    };
    
    function clickReset() {
        model = model.clear();
        updater(model, this)
    };

    return { clickBoard, clickReset, showModel }
}
