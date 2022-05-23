import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){ //cuando no tiene estado puedo transformar la clase a funcion
    return(
        <button className= "square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props){
        super(props); //esto es obligariorio por react
        this.state = {
            squares: Array(9).fill(null),
            // un arreglo para los estados de los cuadrados inicializados
            //en null
            xSigue: true, //para poder poner X y O
        };
    }
    handleClick(i){ //funcion que maneja el evento onclick
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xSigue ? 'X' : 'O'; //intercambia segun true o false de xsigue
        this.setState({
            squares: squares,
            xSigue: !this.state.xSigue, //al setear el estado cambia el xsigue
        });
    }
    renderSquare(i) {
        return <Square 
            value={this.state.squares[i]} //retorna la posicion del cuadrado
            onClick={()=> this.handleClick(i)} //hace clic y llama a la func handleClick
        />;
    }

    render() {
        const ganador = calculateWinner(this.state.squares);

        let status;

        if(ganador){
            status = 'Ganador: '+ ganador;
        } else {
            status = 'Siguiente jugador: '+(this.state.xSigue ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }