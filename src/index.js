import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const winningSquareStyle = {
    backgroundColor: 'cyan',
  };

  return (
    <button
      className="square"
      onClick={props.onClick}
      style={props.hightlight ? winningSquareStyle : null}>
      {props.value}
    </button>
  );
}

  class Board extends React.Component {
    renderSquare(i) {              
      if (this.props.hightlight[i] === 0) {
        this.props.hightlight[i] = 1;
      }
      return <Square 
        hightlight={this.props.hightlight[i]}
        value={this.props.squares[i] ? this.props.squares[i]: null}
        onClick={() => this.props.onClick(i)}
        />;
    }
  
    render() {
      const drawSquares = [];
      for (let row = 0; row < 3; row++) {
        const drawRow = [];
        for (let col = 0; col < 3; col++) {
          drawRow.push(<span key={(row*3)+col}>{this.renderSquare((row*3)+col)}</span>)
        }      
        drawSquares.push(<div className="board-row" key={row}>{drawRow}</div>) 
      }
      return (
        <div>
          {drawSquares}
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
        statecolor: true,
        color: [{
          winsquares: Array(9).fill(null),
        }],
      }      
    }

    handleBack(){      
      const step = this.state.stepNumber;

      if ((step-1) >= 0) {
        this.jumpTo(step-1);        
      } else {
        return
      }

    }

    handleNext(){
      const step = this.state.stepNumber;
      
      if (step === this.state.history.length-1) {
        return
      } else {
        this.jumpTo(step+1);
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
      const m = this.state.stepNumber+1;
      const stepNumber =  m + "." ;
      const y =  this.state.xIsNext ? ' X ' + mapa[i]:' O ' + mapa[i];
      const x =  stepNumber + y;
      
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      squaresnumber.push(x);
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
        statecolor: true,
        stepNumber: step,
        xIsNext: (step % 2 ) === 0,
        color: [{
          winsquares: Array(9).fill(null),
        }]
      });
    }

    colorsquares(a)
    {
      const color = this.state.color;      
      const l = color[0];
      const g = l.winsquares;
      
      const x = a[0];
      const y = a[1];
      const z = a[2];

      g[x] = x;
      g[y] = y;
      g[z] = z;            

      this.setState({
        statecolor: false,
        color: color.concat([{
          winsquares: g,
        }])
      });      
    }

    render() {
      
      const history = this.state.history;      
      const current = history[this.state.stepNumber];      
      const winner = calculateWinner(current.squares);

      const statecolor = this.state.statecolor;
      
      const historynumber = this.state.historynumber;
      const currentnumber = historynumber[historynumber.length-1];
      const p = historynumber.length-2;      
      const k = currentnumber.squaresnumber[p];


      const movesnumber = historynumber.map((step,move)=>{          
          if (currentnumber.squaresnumber[move] === k) {
            return(
              <p className="chess strong" key={move}>{currentnumber.squaresnumber[move]}</p>
            );
          }
          else{
            return(
              <p className="chess" key={move}>{currentnumber.squaresnumber[move]}</p>
            );
          }
        }
      );

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
      if (winner && statecolor) {
        alert("Congratulations, " + winner + " Won");
        status = "Winner : " + winner;
        
        this.colorsquares(calculatecolor(current.squares));
        
      } else {
        status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
      }
      //if (this.state.squares.every(endgame) &&  calculateWinner(this.state.squares) == null) {
      //  status = "Draw";
      //}   

      return (
        <div>
          <Header />
          <div className="chessb">{movesnumber}</div>  
          <div className="game">
            <div className="game-board">
              <Board 
                squares={current.squares}
                onClick={(i)=> this.handleClick(i)}
                hightlight={this.state.color[0].winsquares}/>
                <div id="switch">
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    id="btn-left" 
                    onClick={() => this.handleBack()}>
                      -
                  </button>
                  <button type="button" 
                  className="btn btn-primary" 
                  id="btn-right" 
                  onClick={() => this.handleNext()}>
                    +
                  </button>
                </div>
            </div>
            <div className="game-info">
              <div className="status">{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
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
  function calculatecolor(squares) {
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
        return lines[i];
      }
    }
    return null;
  }

  //function endgame(x) {
   // return x !== null;
  //}
