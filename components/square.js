import React from "react"
import { TouchableOpacity, View, Text, Dimensions } from "react-native"

const Square = props => {
  const { height, width } = Dimensions.get("window")
  return (
    <View
      style={{
        backgroundColor: "#306835",
        width: (width - 10) / 8,
        height: (width - 10) / 8,
        borderWidth: 1
      }}
    >
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={{
          flex: 1,
          backgroundColor: props.color,
          borderRadius: 20
        }}
      />
    </View>
  )
}

export default Square
