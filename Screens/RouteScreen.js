import React from "react";
import { Button, View, Text } from "react-native";
import { MapView } from 'expo'
export default class RouteScreen extends React.Component {
  static navigationOptions = {
    title: "เส้นทางเดินรถ",
    
  };
  render() {
    //   const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>Route</Text>
      </View>
    );
  }
}
