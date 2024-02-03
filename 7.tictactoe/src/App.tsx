import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icons from './components/Icons'
import Snackbar from 'react-native-snackbar'
import { StatusBar } from 'react-native'

const App = () => {
  const [isCross, setIsCross] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkIsWinner = () => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (gameState[a] !== 'empty' && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        setGameWinner(`${gameState[a]} won the game! 🥳`);
        return;
      }
    }

    if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: "#FFFFFF"
      })
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      })
    }

    checkIsWinner()
  }


  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[classes.playerInfo, classes.winnerInfo]}>
          <Text style={[classes.winnerTxt]}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[classes.playerInfo, isCross ? classes.playerX : classes.playerO]}>
          <Text style={[classes.gameTurnTxt]}>
            Player {isCross ? 'X' : '0'}'s Turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
        data={gameState}
        numColumns={3}
        style={classes.grid}
        renderItem={({ item, index }) => (
          <Pressable key={index} style={classes.card} onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />
      {/* Game Actions */}
      <Pressable onPress={reloadGame} style={classes.gameBtn}>
        <Text style={classes.gameBtnText}>
          {gameWinner ? 'Start new Game' : 'Reload the Game'}
        </Text>
      </Pressable>

    </SafeAreaView>
  )
}

export default App

const classes = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});