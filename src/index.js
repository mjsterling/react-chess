import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { unstable_concurrentAct } from "react-dom/test-utils";
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: [
            ["b", "r"],
            ["b", "n"],
            ["b", "b"],
            ["b", "q"],
            ["b", "k"],
            ["b", "b"],
            ["b", "n"],
            ["b", "r"],
            ["b", "p"],
            ["b", "p"],
            ["b", "p"],
            ["b", "p"],
            ["b", "p"],
            ["b", "p"],
            ["b", "p"],
            ["b", "p"],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            ["w", "p"],
            ["w", "p"],
            ["w", "p"],
            ["w", "p"],
            ["w", "p"],
            ["w", "p"],
            ["w", "p"],
            ["w", "p"],
            ["w", "r"],
            ["w", "n"],
            ["w", "b"],
            ["w", "q"],
            ["w", "k"],
            ["w", "b"],
            ["w", "n"],
            ["w", "r"],
          ],
        },
      ],
      wIsNext: true,
      turnNumber: 0,
      highlights: Array(64).fill("square"),
      selected: null,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.turnNumber];
    return (
      <div className="game">
        <div className="board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            sqclass={this.state.highlights}
          />
        </div>
        <button onClick={() => this.toggleTurn()} className="toggleturn">
          {"Move: "}
          {history.length}
          {" - "}
          {this.state.wIsNext ? "White to move" : "Black to move"}
        </button>
      </div>
    );
  }

  toggleTurn() {
    this.setState({
      wIsNext: !this.state.wIsNext,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const highlights = this.state.highlights;
    const t = this.state.wIsNext ? "w" : "b";
    //if active
    if (highlights.includes("active")) {
      //move piece
      if (highlights[i] === "legal" || highlights[i] === "capture") {
        function active(active) {
          return active === "active";
        }
        let activesq = highlights.findIndex(active);
        console.log("activesq =", activesq);
        squares[i] = squares[activesq];
        squares[activesq] = [null, null];
        highlights.fill("square");
        this.setState({
          history: history.concat([
            {
              squares: squares,
            },
          ]),
          turnNumber: history.length,
          wIsNext: !this.state.wIsNext,
        });
        return;
      } else {
        //clear highlights
        highlights.fill("square");
      }
      // if square empty return
      if (!squares[i][0]) {
        this.setState({
          highlights: highlights,
        });
        return;
      }
    }
    //if no active
    if (!highlights.includes("active")) {
      //if white clicks on white piece, highlight legal moves
      if (this.state.wIsNext && squares[i][0] === t) {
        this.pieceHL(t, i, squares, highlights);
      }
      //if black clicks on black piece, highlight legal moves
      if (!this.state.wIsNext && squares[i][0] === t) {
        this.pieceHL(t, i, squares, highlights);
      }
      this.setState({
        highlights: highlights,
      });
      return;
    }
  }

  pieceHL(t, i, squares, highlights) {
    if (squares[i][1] === "p") {
      this.pawnHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "r") {
      this.rookHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "n") {
      this.knightHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "b") {
      this.bishopHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "q") {
      this.rookHL(t, i, squares, highlights);
      this.bishopHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "k") {
      this.kingHL(t, i, squares, highlights);
    }
  }

  pawnHL(t, i, squares, highlights) {
    //moves only, no captures yet
    highlights[i] = "active";
    if (t === "w") {
      let n = i - 8;
      for (n; n > i - 17 && squares[n] && !squares[n][0]; n = n - 8) {
        highlights[n] = "legal";
      }
      n = i - 9;
      if (squares[n]) {
        if (squares[n][0] === "b" && n % 8 !== 7) {
          highlights[n] = "capture";
        }
      }
      n = i - 7;
      if (squares[n]) {
        if (squares[n][0] === "b" && n % 8 !== 0) {
          highlights[n] = "capture";
        }
      }
    }

    if (t === "b") {
      let n = i + 8;
      for (n; n < i + 17 && squares[n] && !squares[n][0]; n = n + 8) {
        highlights[n] = "legal";
      }
      n = i + 7;
      if (squares[n]) {
        if (squares[n][0] === "w" && n % 8 !== 7) {
          highlights[n] = "capture";
        }
      }
      n = i + 9;
      if (squares[n]) {
        if (squares[n][0] === "w" && n % 8 !== 0) {
          highlights[n] = "capture";
        }
      }
    }
  }

  rookHL(t, i, squares, highlights) {
    highlights[i] = "active";
    let n = i - 8; //up
    for (n; squares[n] && !squares[n][0]; n = n - 8) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] && squares[n][0] !== t && highlights[n + 8] !== "capture";
      n = n - 8
    ) {
      highlights[n] = "capture";
    }
    n = i + 8; //down
    for (n; squares[n] && !squares[n][0]; n = n + 8) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] && squares[n][0] !== t && highlights[n - 8] !== "capture";
      n = n + 8
    ) {
      highlights[n] = "capture";
    }
    n = i - 1; //left
    for (n; squares[n] && !squares[n][0] && n % 8 !== 7; n = n - 1) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] &&
      squares[n][0] !== t &&
      n % 8 !== 7 &&
      highlights[n + 1] !== "capture";
      n = n - 1
    ) {
      highlights[n] = "capture";
    }
    n = i + 1; //right
    for (n; squares[n] && !squares[n][0] && n % 8 !== 0; n = n + 1) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] &&
      squares[n][0] !== t &&
      n % 8 !== 0 &&
      highlights[n - 1] !== "capture";
      n = n + 1
    ) {
      highlights[n] = "capture";
    }
  }

  knightHL(t, i, squares, highlights) {
    highlights[i] = "active";
    console.log(i);
    let nmoves;
    if (i % 8 === 0) {
      nmoves = [-15, -6, 6, 15];
    } else if (i % 8 === 1) {
      nmoves = [-17, -15, -6, 10, 15, 17];
    } else if (i % 8 === 6) {
      nmoves = [-17, -15, -10, 6, 15, 17];
    } else if (i % 8 === 7) {
      nmoves = [-17, -10, 10, 17];
    } else {
      nmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
    }
    for (let n = 0; n < nmoves.length; n++) {
      let e = i + nmoves[n];
      if (squares[e]) {
        if (!squares[e][0]) {
          highlights[e] = "legal";
          console.log(e);
        } else if (squares[e][0] !== t) {
          highlights[e] = "capture";
          console.log(e);
        }
      }
    }
  }

  bishopHL(t, i, squares, highlights) {
    highlights[i] = "active";
    let n = i - 9; //up-left
    for (n; squares[n] && !squares[n][0] && n % 8 !== 7; n = n - 9) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] &&
      squares[n][0] !== t &&
      highlights[n + 9] !== "capture" &&
      n % 8 !== 7;
      n = n - 9
    ) {
      highlights[n] = "capture";
    }
    n = i + 9; //down-right
    for (n; squares[n] && !squares[n][0] && n % 8 !== 0; n = n + 9) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] &&
      squares[n][0] !== t &&
      highlights[n - 9] !== "capture" &&
      n % 8 !== 0;
      n = n + 9
    ) {
      highlights[n] = "capture";
    }
    n = i - 7; //up-right
    for (n; squares[n] && !squares[n][0] && n % 8 !== 0; n = n - 7) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] &&
      squares[n][0] !== t &&
      n % 8 !== 0 &&
      highlights[n + 7] !== "capture";
      n = n - 7
    ) {
      highlights[n] = "capture";
    }
    n = i + 7; //down-left
    for (n; squares[n] && !squares[n][0] && n % 8 !== 7; n = n + 7) {
      highlights[n] = "legal";
    }
    for (
      n;
      squares[n] &&
      squares[n][0] !== t &&
      n % 8 !== 7 &&
      highlights[n - 9] !== "capture";
      n = n + 9
    ) {
      highlights[n] = "capture";
    }
  }

  kingHL(t, i, squares, highlights) {
    highlights[i] = "active";
    let nmoves;
    if (i % 8 === 0) {
      nmoves = [-8, -7, 1, 8, 9];
    } else if (i % 8 === 7) {
      nmoves = [-9, -8, -1, 7, 8];
    } else {
      nmoves = [-9, -8, -7, -1, 1, 7, 8, 9];
    }
    for (let n = 0; n < nmoves.length; n++) {
      let e = i + nmoves[n];
      if (squares[e]) {
        if (!squares[e][0]) {
          highlights[e] = "legal";
          console.log(e);
        } else if (squares[e][0] !== t) {
          highlights[e] = "capture";
          console.log(e);
        }
      }
    }
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        // value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        class1={this.props.sqclass[i]}
        class2={this.props.squares[i][0] + this.props.squares[i][1]}
      />
    );
  }

  render() {
    let squares = new Array(64);
    for (let i = 0; i < 64; i++) {
      squares[i] = this.renderSquare(i);
    }
    return squares;
  }
}

function Square(props) {
  if (props.class2) {
    return (
      <button className={props.class1}>
        <div className={props.class2}  onClick={() => props.onClick()} />
      </button>
    );
  } else {
    return <button className={props.class1} onClick={() => props.onClick()} />;
  }
}

// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));
