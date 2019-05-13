import React, { Component } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BoardColor: "",
      Player1Color: "",
      Player2Color: ""
    }
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
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigate("Play")}
        >
          <Text style={{ fontSize: 36, color: "white" }}> Play </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigate("Settings")}
        >
          <Text style={{ fontSize: 36 }}> Settings </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    marginTop: 15,
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

  playButton: {
    borderRadius: 150,
    backgroundColor: "#1a1a1a",
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },

  settingsButton: {
    borderRadius: 150,
    width: 250,
    height: 250,
    backgroundColor: "white",
    color: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    margin: 10
  }
})

export default HomeScreen
