const Message = (props) => {
    if (props.winner)
        return <p>{props.winner.winner + ' won!'}</p>
    else    
        return <p>{'Your turn, ' + props.player}</p>
}        

const Board = (props) =>
    <table>
        <tbody>
            {props.board.map((row, i) =>
            <tr key={i}>{row.map ( (tile, j) => 
                <td key={i+''+j}
                    className={tile || 'blank'}
                    onClick= {() => dispatch({type:'move', x: i, y: j})}/>)
                }</tr>
            )}
        </tbody>
    </table>

const view = (model) => 
    <div> 
        <h1>Tic-tac-toe</h1>
        <Message winner={model.winner()} player={model.playerInTurn()}/>
        <Board board={model.board}/>
        <button id = 'reset' onClick = {() => dispatch({type: "reset"})}>Reset</button>
    </div>

function update(view) {
    ReactDOM.render(view, document.body)
}
