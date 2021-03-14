import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import { unstable_concurrentAct } from "react-dom/test-utils";
const coords = [
  "a8",
  "b8",
  "c8",
  "d8",
  "e8",
  "f8",
  "g8",
  "h8",
  "a7",
  "b7",
  "c7",
  "d7",
  "e7",
  "f7",
  "g7",
  "h7",
  "a6",
  "b6",
  "c6",
  "d6",
  "e6",
  "f6",
  "g6",
  "h6",
  "a5",
  "b5",
  "c5",
  "d5",
  "e5",
  "f5",
  "g5",
  "h5",
  "a4",
  "b4",
  "c4",
  "d4",
  "e4",
  "f4",
  "g4",
  "h4",
  "a3",
  "b3",
  "c3",
  "d3",
  "e3",
  "f3",
  "g3",
  "h3",
  "a2",
  "b2",
  "c2",
  "d2",
  "e2",
  "f2",
  "g2",
  "h2",
  "a1",
  "b1",
  "c1",
  "d1",
  "e1",
  "f1",
  "g1",
  "h1",
];

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
          notation: "",
          wkmoved: false,
          wkmoved: false,
        },
      ],
      wIsNext: true,
      turnNumber: 0,
      highlights: Array(64).fill(null),
    };
  }
  jumpTo(step) {
    this.setState({
      turnNumber: step,
      wIsNext: step % 2 === 0,
    });
  }
  clearHighlights() {
    this.setState({
      highlights: [
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
        "lightsquare",
        "darksquare",
      ],
    });
  }
  render() {
    if (!this.state.highlights[0]) {
      this.clearHighlights();
    }
    const history = this.state.history;
    const current = history[this.state.turnNumber];
    const moves = history.map((step, move) => {
      const notation = history[move].notation;
      const desc = move
        ? Math.floor(move / 2 + 0.5) + ". " + notation
        : "Start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let turn;
    if (this.state.wIsNext) {
      turn = "White to move";
    } else {
      turn = "Black to move";
    }
    return (
      <div className="game">
        <div className="header">React Chess</div>
        <div className="whoseturn">{turn}</div>
        <div className="board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            sqclass={this.state.highlights}
          />
        </div>
        <ol className="movelist">{moves}</ol>
        <div className="footer">
          &copy; <a href="https://matthew-sterling.netlify.app">Matthew Sterling</a> 2021. Built entirely in React as a learning exercise. Partially inspired by the <a href="https://reactjs.org/">reactjs.org</a> Tic Tac Toe tutorial. <a href="https://commons.wikimedia.org/w/index.php?curid=1499803">Chess pieces licensed under CC3.0</a><br />
          Disclaimer: I know this isn't how chess works, but I didn't want to
          spend a week trying to program check mechanics.
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const highlights = this.state.highlights;
    const t = this.state.wIsNext ? "w" : "b";
    //if active
    if (highlights.includes("active")) {
      //move piece if clicked square is a legal move
      let x = "";
      if (highlights[i] === "capture") {
        x = "x";
      }
      if (highlights[i] === "canCastle") {
        let activesq = highlights.indexOf("active");
        let m;
        //wqsc
        if (i === 58) {
          squares[56] = [null, null];
          squares[58] = ["w", "k"];
          squares[59] = ["w", "r"];
          squares[60] = [null, null];
          m = "O-O-O";
        }
        //wksc
        if (i === 62) {
          squares[60] = [null, null];
          squares[61] = ["w", "r"];
          squares[62] = ["w", "k"];
          squares[63] = [null, null];
          m = "O-O";
        }
        //bqsc
        if (i === 2) {
          squares[0] = [null, null];
          squares[2] = ["b", "k"];
          squares[3] = ["b", "r"];
          squares[4] = [null, null];
          m = "O-O-O";
        }
        //bksc
        if (i === 6) {
          squares[4] = [null, null];
          squares[5] = ["b", "r"];
          squares[6] = ["b", "k"];
          squares[7] = [null, null];
          m = "O-O";
        }
        //clear highlights
        this.clearHighlights();
        //update history array with most recent board state
        this.setState({
          history: history.concat([
            {
              squares: squares,
              notation: m,
            },
          ]),
          turnNumber: history.length,
          wIsNext: !this.state.wIsNext,
        });
        return;
      }
      if (highlights[i] === "legal" || highlights[i] === "capture") {
        //find the active square
        let activesq = highlights.indexOf("active");
        //replace clicked square with contents of active square
        squares[i] = squares[activesq];
        squares[activesq] = [null, null];
        //auto queen
        if (squares[i][1] === "p") {
          if (t === "w" && i < 8) {
            squares[i][1] = "q";
          }
          if (t === "b" && i > 55) {
            squares[i][1] = "q";
          }
        }

        //calculate chess notation and concenate strings to var
        let piece = squares[i][1];
        if (piece === "p") {
          piece = "";
        }
        let notation = piece + x + coords[i];
        console.log(notation);
        //clear highlights
        this.clearHighlights();

        //update history array with most recent board state
        this.setState({
          history: history.concat([
            {
              squares: squares,
              notation: notation,
            },
          ]),
          turnNumber: history.length,
          wIsNext: !this.state.wIsNext,
        });
        return;
      } else {
        //clear highlights
        this.clearHighlights();
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
      if (i > 47 && i < 56) {
        for (n; n > i - 17 && squares[n] && !squares[n][0]; n = n - 8) {
          highlights[n] = "legal";
        }
      } else {
        n = i - 8;
        if (squares[n] && !squares[n][0]) {
          highlights[n] = "legal";
        }
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
      if (i > 7 && i < 16) {
        for (n; n < i + 17 && squares[n] && !squares[n][0]; n = n + 8) {
          highlights[n] = "legal";
        }
      } else {
        n = i + 8;
        if (squares[n] && !squares[n][0]) {
          highlights[n] = "legal";
        }
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
    const history = this.state.history;
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
    if (t === "w" && i === 60) {
      //white queenside castle
      if (
        !history.wkmoved &&
        !squares[57][0] &&
        !squares[58][0] &&
        !squares[59][0] &&
        squares[56][0] === "w" &&
        squares[56][1] === "r"
      ) {
        highlights[58] = "canCastle";
      }
      //white kingside castle
      if (
        !history.wkmoved &&
        !squares[61][0] &&
        !squares[62][0] &&
        squares[63][0] === "w" &&
        squares[63][1] === "r"
      ) {
        highlights[62] = "canCastle";
      }
    }
    if (t === "b" && i === 4) {
      //black queenside castle
      if (
        !history.bkmoved &&
        !squares[3][0] &&
        !squares[2][0] &&
        !squares[1][0] &&
        squares[0][0] === "b" &&
        squares[0][1] === "r"
      ) {
        highlights[2] = "canCastle";
      }
      //black kingside castle
      if (
        !history.bkmoved &&
        !squares[5][0] &&
        !squares[6][0] &&
        squares[7][0] === "b" &&
        squares[7][1] === "r"
      ) {
        highlights[6] = "canCastle";
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
        <div className={props.class2} onClick={() => props.onClick()} />
      </button>
    );
  } else {
    return <button className={props.class1} onClick={() => props.onClick()} />;
  }
}

// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));
