import React from "react";
import { Button, View, Text } from "react-native";

export default class WithScreen extends React.Component {
  static navigationOptions = {
    title: "รอรถ",
    
  };
  render() {
    //   const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>With</Text>
      </View>
    );
  }
}
