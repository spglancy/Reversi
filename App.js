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
import SelectGame from "./pages/selectGame"

const gameNavigator = createStackNavigator({
  // GameType: { screen: SelectGame },
  GameScreen: { screen: GameScreen }
})

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: Settings,
    Game: gameNavigator
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
)

const DrawerNav = createDrawerNavigator({
  Home: { screen: MainNavigator },
  "Log in": { screen: Login },
  "How To Play": { screen: HowToPlay },
  "Sign Up": { screen: Signup }
})

const App = createAppContainer(DrawerNav)

export default App
