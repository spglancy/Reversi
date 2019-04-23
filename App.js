import React from "react"
import { createStackNavigator, createAppContainer } from "react-navigation"
import HomeScreen from "./pages/Home"
import NewGame from "./pages/NewGame"
import GameScreen from "./pages/GameScreen"

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  NewGame: { screen: NewGame },
  GameScreen: { screen: GameScreen }
})

const App = createAppContainer(MainNavigator)

export default App
