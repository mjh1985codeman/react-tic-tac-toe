import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// By inspecting the code, you’ll notice that we have three React components: Square, Board and Game.
// The Square Component renders a single <button> and the Board renders 9 squares.
// The Game component renders a board with placeholder values

// Here Square is a React component CLASS or React Component Type.  A component takes in parameters called PROPS (short for 'properties'), and returns
// a hierchy of views to display via the render() method.  We use these components to tell React what we want to see on the screen.  When our
// data changes React will efficiently update and re-render our components.
function Square(props) {
  // showing the value being passed from the value prop from the renderSquare method.
  return (
    //In React, function components are a simpler way to write components that only contain a render method and don’t have their own state.
    //Instead of defining a class which extends React.Component, we can write a function that takes props as input and returns what should be rendered.
    //Function components are less tedious to write than classes, and many components can be expressed this way.
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  //The Board component can tell each Square what to display by passing a prop
  //passing a PROP called value which is passing data from our Board component to our Square component.
  //To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. The parent component can pass the state
  // back down to the children by using props; this keeps the child components in sync with each other and with the parent component.

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      //Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.
      xIsNext: true,
    };
  }

  //handleClick Definition:
  //Note how in handleClick, we call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
  //There are generally two approaches to changing data. The first approach is to mutate the data by directly changing the data’s values.
  //The second approach is to replace the data with a new copy which has the desired changes.

  //Example: Data Change WITH Mutation:

  // var player = {score: 1, name: 'Jeff'};
  // player.score = 2;
  // Now player is {score: 2, name: 'Jeff'}

  //Example: Data Change WITHOUT Mutation:
  //var player = {score: 1, name: 'Jeff'};

  // var newPlayer = Object.assign({}, player, {score: 2});
  // Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

  // Or if you are using object spread syntax proposal, you can write:
  // var newPlayer = {...player, score: 2};

  handleClick(i) {
    //changed the Board’s handleClick function to return early by ignoring a click if someone has won the game or if a Square is already filled:
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    // we’ll pass down a function from the Board to the Square, and we’ll have Square call that function when a square is clicked
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    //We will call calculateWinner(squares) in the Board’s render function to check if a player has won.
    // If a player has won, we can display text such as “Winner: X” or “Winner: O”.
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
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

//Helper Function: calculateWinner.

//Given an array of 9 squares, this function will check for a winner and return 'X', 'O', or null as appropriate.
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
