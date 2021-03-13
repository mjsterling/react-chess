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
            ["B", "R"],
            ["B", "N"],
            ["B", "B"],
            ["B", "Q"],
            ["B", "K"],
            ["B", "B"],
            ["B", "N"],
            ["B", "R"],
            ["B", "P"],
            ["B", "P"],
            ["B", "P"],
            ["B", "P"],
            ["B", "P"],
            ["B", "P"],
            ["B", "P"],
            ["B", "P"],
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
            ["W", "R"],
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
            ["W", "P"],
            ["W", "P"],
            ["W", "P"],
            ["W", "P"],
            ["W", "P"],
            ["W", "P"],
            ["W", "P"],
            ["W", "P"],
            ["W", "R"],
            ["W", "N"],
            ["W", "B"],
            ["W", "Q"],
            ["W", "K"],
            ["W", "B"],
            ["W", "N"],
            ["W", "R"],
          ],
        },
      ],
      wIsNext: true,
      turnNumber: 0,
      highlights: Array(64).fill("square"),
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
          {" "}
          {this.state.wIsNext ? "White's turn" : "Black's turn"}
        </button>
      </div>
    );
  }

  toggleTurn() {
    let whoIsNext = this.state.wIsNext;
    if (whoIsNext) {
      this.setState({
        wIsNext: false,
      });
    } else {
      this.setState({
        wIsNext: true,
      });
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const highlights = this.state.highlights;
    //if active, clear highlights
    if (highlights.includes("active")) {
      highlights.fill("square");
    }
    // if square empty return
    if (!squares[i][0]) {
      console.log("squares i null");
      this.setState({
        highlights: highlights,
      });
      return;
    }
    const t = this.state.wIsNext ? "W" : "B";
    //check if white's turn

    if (this.state.wIsNext) {
      if (squares[i][0] === "W") {
        this.pieceHL(t, i, squares, highlights);
      }
    }

    if (!this.state.wIsNext) {
      if (squares[i][0] === "B") {
        this.pieceHL(t, i, squares, highlights);
      }
    }
    this.setState({
      highlights: highlights,
    });
    return;
  }

  pieceHL(t, i, squares, highlights) {
    if (squares[i][1] === "P") {
      this.pawnHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "R") {
      this.rookHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "N") {
      this.knightHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "B") {
      this.bishopHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "Q") {
      this.rookHL(t, i, squares, highlights);
      this.bishopHL(t, i, squares, highlights);
    }
    if (squares[i][1] === "K") {
      this.kingHL(t, i, squares, highlights);
    }
  }

  pawnHL(t, i, squares, highlights) {
    highlights[i] = "active";
    if (t === "W") {
      for (
        let n = i - 8;
        n > i - 17 && squares[n] && !squares[n][0];
        n = n - 8
      ) {
        highlights[n] = "legal";
      }
    }
    if (t === "B") {
      for (
        let n = i + 8;
        n < i + 17 && squares[n] && !squares[n][0];
        n = n + 8
      ) {
        highlights[n] = "legal";
      }
    }
  }

  rookHL(t, i, squares, highlights) {
    highlights[i] = "active";
    //up
    for (let n = i - 8; n > 0 && squares[n]; n = n - 8) {
      if (!squares[n][0]) {
        highlights[n] = "legal";
      }
      if (t === "W" && squares[n][0] === "B" && highlights[n + 8] === "legal") {
        highlights[n] = "capture";
      }
      if (t === "B" && squares[n][0] === "W" && highlights[n + 8] === "legal") {
        highlights[n] = "capture";
      }
    }
    //down
    for (let n = i + 8; n < 64 && !squares[n][0]; n = n + 8) {
      if (squares[n]) {
        if (!squares[n][0]) {
          highlights[n] = "legal";
        }
        if (
          t === "W" &&
          squares[n][0] === "B" &&
          highlights[n - 8] === "legal"
        ) {
          highlights[n] = "capture";
        }
        if (t === "B" && squares[n][0] === "W") {
          highlights[n] = "capture";
        }
      }
    }
    //left
    for (let n = i - 1; n % 8 !== 7 && !squares[n][0]; --n) {
      if (squares[n]) {
        if (!squares[n][0]) {
          console.log(squares[n]);
          highlights[n] = "legal";
        }
        if (
          t === "W" &&
          squares[n][0] === "B" &&
          !highlights.includes("capture")
        ) {
          highlights[n] = "capture";
        }
        if (t === "B" && squares[n][0] === "W") {
          highlights[n] = "capture";
        }
      }
    }
    //right
    for (let n = i + 1; n % 8 !== 0 && !squares[n][0]; ++n) {
      if (squares[n]) {
        if (!squares[n][0]) {
          console.log(squares[n]);
          highlights[n] = "legal";
        }
        if (
          t === "W" &&
          squares[n][0] === "B" &&
          !highlights.includes("capture")
        ) {
          highlights[n] = "capture";
        }
        if (t === "B" && squares[n][0] === "W") {
          highlights[n] = "capture";
        }
      }
    }
  }

  knightHL(t, i, squares, highlights) {
    highlights[i] = "active";
    const nmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
    let n = 0;
    let e = i + nmoves[n];
    //a file
    if (i % 8 === 0) {
      for (n = 1; n < 8; n = n + 2) {
        if (squares[e]) {
          if (!squares[e][0]) {
            console.log(squares[e]);
            highlights[e] = "legal";
          }
          if (
            t === "W" &&
            squares[e][0] === "B" &&
            !highlights.includes("capture")
          ) {
            highlights[e] = "capture";
          }
          if (t === "B" && squares[e][0] === "W") {
            highlights[e] = "capture";
          }
        }
      }
      //b file
    } else if (i % 8 === 1) {
      for (n = 0; n < 8; n++) {
        if (n !== 2 && n !== 4) {
          if (squares[e]) {
            if (!squares[e][0]) {
              console.log(squares[e]);
              highlights[e] = "legal";
            }
            if (
              t === "W" &&
              squares[e][0] === "B" &&
              !highlights.includes("capture")
            ) {
              highlights[e] = "capture";
            }
            if (t === "B" && squares[e][0] === "W") {
              highlights[e] = "capture";
            }
          }
        }
      }
      //g file
    } else if (i % 8 === 6) {
      for (n = 0; n < 8; n++) {
        if (n !== 3 && n !== 5) {
          if (squares[e]) {
            if (!squares[e][0]) {
              console.log(squares[e]);
              highlights[e] = "legal";
            }
            if (
              t === "W" &&
              squares[e][0] === "B" &&
              !highlights.includes("capture")
            ) {
              highlights[e] = "capture";
            }
            if (t === "B" && squares[e][0] === "W") {
              highlights[e] = "capture";
            }
          }
        }
      }
      //h file
    } else if (i % 8 === 7) {
      for (n = 0; n < 8; n = n + 2) {
        if (squares[e]) {
          if (!squares[e][0]) {
            console.log(squares[e]);
            highlights[e] = "legal";
          }
          if (
            t === "W" &&
            squares[e][0] === "B" &&
            !highlights.includes("capture")
          ) {
            highlights[e] = "capture";
          }
          if (t === "B" && squares[e][0] === "W") {
            highlights[e] = "capture";
          }
        }
      }
      //other files
    } else {
      for (n = 0; n < 8; n++) {
        if (squares[e]) {
          if (!squares[e][0]) {
            console.log(squares[e]);
            highlights[e] = "legal";
          }
          if (
            t === "W" &&
            squares[e][0] === "B" &&
            !highlights.includes("capture")
          ) {
            highlights[e] = "capture";
          }
          if (t === "B" && squares[e][0] === "W") {
            highlights[e] = "capture";
          }
        }
      }
    }
    console.log("i % 8 =", i % 8);
  }

  bishopHL(t, i, squares, highlights) {
    highlights[i] = "active";
    //up-left
    for (let n = i - 9; n % 8 !== 7 && !squares[n]; n = n - 9) {
      if (squares[n]) {
        if (!squares[n][0]) {
          console.log(squares[n]);
          highlights[n] = "legal";
        }
        if (
          t === "W" &&
          squares[n][0] === "B" &&
          !highlights.includes("capture")
        ) {
          highlights[n] = "capture";
        }
        if (t === "B" && squares[n][0] === "W") {
          highlights[n] = "capture";
        }
      }
    }
    //up-right
    for (let n = i - 7; n % 8 !== 0 && !squares[n]; n = n - 7) {
      if (squares[n]) {
        if (!squares[n][0]) {
          console.log(squares[n]);
          highlights[n] = "legal";
        }
        if (
          t === "W" &&
          squares[n][0] === "B" &&
          !highlights.includes("capture")
        ) {
          highlights[n] = "capture";
        }
        if (t === "B" && squares[n][0] === "W") {
          highlights[n] = "capture";
        }
      }
    }
    //down-left
    for (let n = i + 7; n % 8 !== 7 && !squares[n]; n = n + 7) {
      if (squares[n]) {
        if (!squares[n][0]) {
          console.log(squares[n]);
          highlights[n] = "legal";
        }
        if (
          t === "W" &&
          squares[n][0] === "B" &&
          !highlights.includes("capture")
        ) {
          highlights[n] = "capture";
        }
        if (t === "B" && squares[n][0] === "W") {
          highlights[n] = "capture";
        }
      }
    }
    //down-right
    for (let n = i + 9; n % 8 !== 0 && !squares[n]; n = n + 9) {
      if (squares[n]) {
        if (!squares[n][0]) {
          console.log(squares[n]);
          highlights[n] = "legal";
        }
        if (
          t === "W" &&
          squares[n][0] === "B" &&
          !highlights.includes("capture")
        ) {
          highlights[n] = "capture";
        }
        if (t === "B" && squares[n][0] === "W") {
          highlights[n] = "capture";
        }
      }
    }
  }

  kingHL(t, i, squares, highlights) {
    highlights[i] = "active";
    const nmoves = [-9, -8, -7, -1, 100, 1, 7, 8, 9];
    //a file
    for (let n = 0; n < 9 && squares[i]; n = n++) {
      let e = i + nmoves[n];
      if (i % 8 === 0) {
        if (n % 3 !== 0) {
          if (squares[e]) {
            if (!squares[e][0]) {
              console.log(squares[e]);
              highlights[e] = "legal";
            }
            if (
              t === "W" &&
              squares[e][0] === "B" &&
              !highlights.includes("capture")
            ) {
              highlights[e] = "capture";
            }
            if (t === "B" && squares[e][0] === "W") {
              highlights[e] = "capture";
            }
          } //h file
        }
      } else if (i % 8 === 7) {
        if (n % 3 !== 2) {
          if (squares[e]) {
            if (!squares[e][0]) {
              console.log(squares[e]);
              highlights[e] = "legal";
            }
            if (
              t === "W" &&
              squares[e][0] === "B" &&
              !highlights.includes("capture")
            ) {
              highlights[e] = "capture";
            }
            if (t === "B" && squares[e][0] === "W") {
              highlights[e] = "capture";
            }
          }
        }
        //other files
      } else {
        for (let n = 0; n < 9; ++n) {
          if (squares[e]) {
            if (!squares[e][0]) {
              console.log(squares[e]);
              highlights[e] = "legal";
            }
            if (
              t === "W" &&
              squares[e][0] === "B" &&
              !highlights.includes("capture")
            ) {
              highlights[e] = "capture";
            }
            if (t === "B" && squares[e][0] === "W") {
              highlights[e] = "capture";
            }
          }
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
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        class={this.props.sqclass[i]}
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
  return (
    <button className={props.class} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));
