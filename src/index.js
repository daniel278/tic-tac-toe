import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

  class Board extends React.Component {
    renderSquare(i) {
      return <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} 
        />;
    }
  
    render() {
      return (
        <div>
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


  class Header extends React.Component {
      render(){
          return(
            <div className="header">Tic Tac Toe</div>
          );
      }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
        historynumber: [{
          squaresnumber: Array(0),
        }],
      }      
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice();

      const historynumber = this.state.historynumber.slice(0, this.state.stepNumber + 1);
      const currentnumber = historynumber[historynumber.length-1];
      const squaresnumber = currentnumber.squaresnumber.slice();

      if(calculateWinner(squares) || squares[i]){
        return;
      } 
      
      const mapa = ["1:1", "1:2", "1:3", "2:1", "2:2", "2:3", "3:1", "3:2", "3:3"];
      const stepNumber = " Movimiento "+ this.state.stepNumber + ".";
      const y =  this.state.xIsNext ? ' X ' + mapa[i] + " ":' O ' + mapa[i] + " ";
      const x =  stepNumber + y;
      
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      squaresnumber.push(x);
      console.log(squaresnumber);


      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
        historynumber: historynumber.concat([{
          squaresnumber: squaresnumber,
        }]),
      });
      //if (squares.every(endgame) &&  calculateWinner(squares) == null) {
      //  alert("Draw");
      //}      
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2 ) === 0,
      });
    }

    render() {
      
      const history = this.state.history;      
      const current = history[this.state.stepNumber];      
      const winner = calculateWinner(current.squares); 
      
      const historynumber = this.state.historynumber;
      const currentnumber = historynumber[historynumber.length-1];

      const moves = history.map(( step, move)=>{
        const desc = move ? 
          "Go to  move # " + move :
          "Go to game start";                    

          return (
          <li key={move}>
            <button  type="button" className="btn btn-primary" onClick={()=> this.jumpTo(move)}>{desc}</button>
          </li>
          );
        }
      );
      
      let status;
      if (winner) {
        alert("Congratulations, " + winner + " Won");
        status = "Winner : " + winner;
      } else {
        status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
      }
      //if (this.state.squares.every(endgame) &&  calculateWinner(this.state.squares) == null) {
      //  status = "Draw";
      //}   

      return (
        <div>
          <Header />  
          <div className="game">
            <div className="game-board">
              <Board 
                squares={current.squares}
                onClick={(i)=> this.handleClick(i)}/>
            </div>
            <div className="game-info">
              <div className="status">{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
          <footer>{currentnumber.squaresnumber}</footer>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
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
