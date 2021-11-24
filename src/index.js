import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// By inspecting the code, you’ll notice that we have three React components: Square, Board and Game.
// The Square Component renders a single <button> and the Board renders 9 squares.
// The Game component renders a board with placeholder values

// Here Square is a React component CLASS or React Component Type.  A component takes in parameters called PROPS (short for 'properties'), and returns
// a hierchy of views to display via the render() method.  We use these components to tell React what we want to see on the screen.  When our
// data changes React will efficiently update and re-render our components.
class Square extends React.Component {
  // the render method returns a description of what you want to see on the screen.  React takes the description and displays the result.
  // In particular render return a REACT ELEMENT, which is a lightweight description of what to render.
  render() {
    // showing the value being passed from the value prop from the renderSquare method.
    return <button className="square">{this.props.value}</button>;
  }
}

class Board extends React.Component {
  //passing a PROP called value which is passing data from our Board component to our Square component.
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = "Next player: X";

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

ReactDOM.render(<Game />, document.getElementById("root"));
