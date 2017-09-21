const Message = props => {
    if (props.winner) return React.createElement(
        'p',
        null,
        props.winner.winner + ' won!'
    );else return React.createElement(
        'p',
        null,
        'Your turn, ' + props.player
    );
};

const Board = props => React.createElement(
    'table',
    null,
    React.createElement(
        'tbody',
        null,
        props.board.map((row, i) => React.createElement(
            'tr',
            { key: i },
            row.map((tile, j) => React.createElement('td', { key: i + '' + j,
                className: tile || 'blank',
                onClick: () => dispatch({ type: 'move', x: i, y: j }) }))
        ))
    )
);

const view = model => React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        'Tic-tac-toe'
    ),
    React.createElement(Message, { winner: model.winner(), player: model.playerInTurn() }),
    React.createElement(Board, { board: model.board }),
    React.createElement(
        'button',
        { id: 'reset', onClick: () => dispatch({ type: "reset" }) },
        'Reset'
    )
);

function update(view) {
    ReactDOM.render(view, document.body);
}

