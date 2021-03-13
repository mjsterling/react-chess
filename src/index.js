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
            "BR","BN","BB","BQ","BK","BB","BN","BR",
            "BP","BP","BP","BP","BP","BP","BP","BP",
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            "WP","WP","WP","WP","WP","WP","WP","WP",
            "WR","WN","WB","WQ","WK","WB","WN","WR",
          ],
        },
      ],
      wIsNext: true,
      turnNumber: 0,
      highlights: Array(64).fill("square"),
    };
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
    if (!squares[i]) {
      this.setState({
        highlights: highlights,
      });
      return;
    }

    //check if white's turn
    if (this.state.wIsNext) {
      if (squares[i] === "WP") {
        highlights[i] = "active";
        for (let n = i - 8; n > i - 17 && !squares[n]; n = n - 8) {
          highlights[n] = "legal";
        }
      }
      if (squares[i] === "WR") {
        highlights[i] = "active";
        //forwards
        for (let n = i - 8; !squares[n]; n = n - 8) {
          highlights[n] = "legal";
        }
        //backwards
        for (let n = i + 8; n > -1 && !squares[n]; n = n + 8) {
          highlights[n] = "legal";
        }
        //left
        for (let n = i - 1; n % 8 !== 7 && !squares[n]; --n) {
          highlights[n] = "legal";
        }
        //right
        for (let n = i + 1; n % 8 !== 0 && !squares[n]; ++n) {
          highlights[n] = "legal";
        }
      }
      if (squares[i] === "WN") {
        highlights[i] = "active";
        const nmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
        if (i % 8 === 0) {
          for (let n = 1; n < 8; n = n + 2) {
            let e = i + nmoves[n];
            if (!squares[e]) {
              highlights[e] = "legal";
            }
          }
        } else if (i % 8 === 1) {
          for (let n = 0; n < 8; ++n) {
            let e = i + nmoves[n];
            if (n !== 2 && n !== 4) {
              if (!squares[e]) {
                highlights[e] = "legal";
              }
            }
          }
        } else if (i % 8 === 6) {
          for (let n = 0; n < 8; ++n) {
            let e = i + nmoves[n];
            if (n !== 3 && n !== 5) {
              if (!squares[e]) {
                highlights[e] = "legal";
              }
            }
          }
        } else if (i % 8 === 7) {
          for (let n = 0; n < 8; n = n + 2) {
            let e = i + nmoves[n];
            if (!squares[e]) {
              highlights[e] = "legal";
            }
          }
        } else {
          for (let n = 0; n < 8; ++n) {
            let e = i + nmoves[n];
            if (!squares[e]) {
              highlights[e] = "legal";
            }
          }
        }
      }
      if (squares[i] == 'WB') {
            //up-left
        for (let n = i - 9; n % 8 !== 7 && !squares[n]; n = n - 9) {
            highlights[n] = "legal";
          }
          //up-right
          for (let n = i - 7 ; n % 8 !== 0 && !squares[n]; n = n - 7) {
            highlights[n] = "legal";
          }
          //down-left
          for (let n = i + 7; n % 8 !== 7 && !squares[n]; n = n + 7) {
            highlights[n] = "legal";
          }
    //       //down-right
    //       for (let n = i + 1; n % 8 !== 0 && !squares[n]; ++n) {
    //         highlights[n] = "legal";
    //       }
    //     }
      }

      this.setState({
        highlights: highlights,
      });
      console.log(highlights);
      return;
    }
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
      </div>
    );
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
