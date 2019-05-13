import React from "react"
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation"
import Login from "./pages/login"
import HowToPlay from "./pages/howtoplay"
import Signup from "./pages/signup"
import GameScreen from "./pages/GameScreen"
import HomeScreen from "./pages/Home"
import Settings from "./pages/settings"
// import SelectGame from "./pages/selectGame"

const gameNavigator = createStackNavigator(
  {
    // GameType: { screen: SelectGame },
    GameScreen: { screen: GameScreen }
  },
  {
    initialRouteName: "GameScreen",
    defaultNavigationOptions: {
      header: null
    }
  }
)

const DrawerNav = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Play: { screen: gameNavigator },
    "Log in": { screen: Login },
    "How To Play": { screen: HowToPlay },
    "Sign Up": { screen: Signup },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
)

const App = createAppContainer(DrawerNav)

export default App
