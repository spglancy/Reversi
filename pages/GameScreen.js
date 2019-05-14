import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native"
import Square from "../components/square"

class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, 0, 1, null, null, null],
        [null, null, null, 1, 0, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ],
      turn: 1,
      p1Score: 2,
      p2Score: 2,
      P1Color: "black",
      P2Color: "white",
      illegalMove: false,
      winner: null
    }
  }

  handlePlay(col, row) {
    const { p1Score, p2Score } = this.state
    let { board, turn } = this.state
    if (board[row][col] == null) {
      if (this.checkMove(row, col)) {
        board[row][col] = this.state.turn % 2
        turn += 1
        this.setState({ board, turn })
      }
    }
    this.updateScore()
    if (!this.checkState()) {
      let winner = null
      if (p1Score > p2Score) {
        winner = "Player 1"
      } else {
        winner = "Player 2"
      }
      this.setState({ winner })
    }
  }

  checkMove(row, col) {
    let { board, turn, illegalMove } = this.state
    const ops = [-1, 0, 1]
    illegalMove = true
    ops.forEach(x => {
      ops.forEach(y => {
        const checked = []
        const initX = x
        const initY = y
        if (
          board[row + x] !== undefined &&
          board[row + x][col + y] !== undefined
        ) {
          while (board[row + x][col + y] == (turn + 1) % 2) {
            checked.push({ rowIndex: row + x, colIndex: col + y })
            x += initX
            y += initY
            if (
              board[row + x] === undefined ||
              board[row + x][col + y] === undefined
            ) {
              break
            }
          }
          if (board[row + x] !== undefined && board[col + y] !== undefined) {
            if (board[row + x][col + y] == turn % 2) {
              if (checked.length != 0) {
                checked.forEach(item => {
                  board[item.rowIndex][item.colIndex] = turn % 2
                })
                illegalMove = false
              }
            }
          }
          x = initX
          y = initY
        }
      })
    })
    this.setState({ board, illegalMove })
    return illegalMove ? false : true
  }

  checkState() {
    const { p1Score, p2Score } = this.state
    if (p1Score + p2Score >= 63) {
      return false
    }
    return true
  }

  updateScore() {
    let p1Score = 0
    let p2Score = 0
    this.state.board.forEach(row => {
      row.forEach(square => {
        if (square == 1) {
          p1Score += 1
        } else if (square == 0) {
          p2Score += 1
        }
      })
    })
    this.setState({ p1Score, p2Score })
  }

  renderBoard() {
    //temp vals
    const { P1Color, P2Color } = this.state
    const board = this.state.board.map((row, index) => {
      return row.map((square, rowIndex) => {
        if (square == null) {
          return (
            <Square
              key={index + "-" + rowIndex}
              onPress={() => this.handlePlay(rowIndex, index)}
              color="#306835"
            />
          )
        } else if (square == 1) {
          return (
            <Square
              key={index + "-" + rowIndex}
              onPress={() => this.handlePlay(rowIndex, index)}
              color={P1Color}
            />
          )
        } else if (square == 0) {
          return (
            <Square
              key={index + "-" + rowIndex}
              onPress={() => this.handlePlay(rowIndex, index)}
              color={P2Color}
            />
          )
        }
      })
    })
    return board
  }

  resetGame() {
    this.setState({
      board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, 0, 1, null, null, null],
        [null, null, null, 1, 0, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ],
      turn: 1,
      p1Score: 2,
      p2Score: 2,
      P1Color: "black",
      P2Color: "white",
      illegalMove: false,
      winner: null
    })
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{ width: 52, height: 52, position: "absolute", left: -55 }}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Image
              style={{ width: 52, height: 52 }}
              source={require("../assets/burger.png")}
            />
          </TouchableOpacity>

          <Text style={styles.title}>REVERSI</Text>
        </View>
        {this.state.winner != null ? (
          <View style={styles.gameOver}>
            <Text style={{ color: "white", fontSize: 18 }}>
              {this.state.winner} Wins!
            </Text>
          </View>
        ) : null}
        <View style={styles.boardContainer}>{this.renderBoard()}</View>
        {this.state.winner != null ? (
          <TouchableOpacity
            style={styles.playAgain}
            onPress={() => this.resetGame()}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Play Again</Text>
          </TouchableOpacity>
        ) : null}
        {this.state.illegalMove ? (
          <View style={styles.illegalMove}>
            <Text style={{ color: "white", fontSize: 18 }}>Illegal Move</Text>
          </View>
        ) : null}
        <View style={styles.playerContainer}>
          <View style={styles.player}>
            <Text style={styles.playerText}>Player 1</Text>
            <Text style={styles.playerText}>Score: {this.state.p1Score}</Text>
          </View>
          <View style={styles.player}>
            <Text style={styles.playerText}>Player 2</Text>
            <Text style={styles.playerText}>Score: {this.state.p2Score}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const { height, width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    marginTop: 5,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#eee"
  },

  title: {
    fontFamily: "Roboto",
    fontSize: 48,
    letterSpacing: 5
  },

  boardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: width - 8,
    height: width - 8,
    borderColor: "black",
    borderWidth: 1
  },

  playerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: width - 12
  },

  player: {
    width: width / 4,
    height: width / 4,
    borderWidth: 1,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },

  playerText: {
    fontSize: width / 4 / 6,
    margin: 3
  },

  illegalMove: {
    backgroundColor: "red",
    width: width / 3 + width / 10,
    height: height / 10,
    borderRadius: 10,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  gameOver: {
    backgroundColor: "black",
    width: width / 2 + width / 6,
    height: height / 11,
    borderRadius: 10,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  playAgain: {
    backgroundColor: "blue",
    width: width / 2,
    height: height / 11,
    borderRadius: 10,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default GameScreen
