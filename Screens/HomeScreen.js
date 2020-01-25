import React from "react";
import { StyleSheet, Button, View } from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
    title: "",

  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.body}>

        </View>
        <View style={styles.nav}>
          <Button style={styles.StackButton} title="Timetable" onPress={() => navigate("Timetable")} />
          <Button style={styles.StackButton} title="Route" onPress={() => navigate("Route")} />
          <Button style={styles.StackButton} title="Wait" onPress={() => navigate("With")} />
          <Button style={styles.StackButton} title="Place" onPress={() => navigate("Place")} />
          <Button style={styles.StackButton} title="Info" onPress={() => navigate("Info")} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 15,
    backgroundColor: "red",
  },
  nav: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    
  },
  StackButton:{
    margin: 10
  }

});

