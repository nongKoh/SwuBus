import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableHighlight,
  // Dimensions,
  Platform,
  AsyncStorage
} from "react-native";

import { Count } from "./userfunction"

import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import Map from "./component/map";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
    title: ""
  };

  state = {
    location: null,
    errorMessage: null,
    statuswait: false
  };
  componentDidMount= async () => {
    AsyncStorage.setItem('stationid','0')
    await AsyncStorage.getItem('statuswait', (err, result)=>{
      this.setState({
        statuswait: JSON.parse(result)
      })
    })
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this.getLocationAsync();
    }
  }
  componentDidUpdate = async () => {
    await AsyncStorage.getItem('statuswait', (err, result)=>{
      this.setState({
        statuswait: JSON.parse(result)
      })
    })
  }
  onPress = async (data) => {
    await AsyncStorage.setItem('statuswait', JSON.stringify(!data))
    await AsyncStorage.getItem('statuswait', (err, result) => {
      this.setState({
        statuswait: JSON.parse(result)
      })
    })
    await Count()
  }
  componentWillUnmount = async ()=>{
    await AsyncStorage.getItem('statuswait', (err, result)=>{
      this.setState({
        statuswait: JSON.parse(result)
      })
    })
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    await Location.getCurrentPositionAsync({});
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.wait}>
          <View style={styles.body}></View>
          <TouchableHighlight
            style={this.state.statuswait ? styles.circle : styles.true}
            onPress={() => {this.onPress(this.state.statuswait)}}
            underlayColor="rgba(255, 255, 255,0.5)"
          >
            <Text style={styles.text}>Wait</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.map}>
          <View style={styles.body}>
            <Map style={styles.map} />
          </View>
          <View style={styles.nav}>
            <TouchableHighlight
              style={styles.StackButton}
              onPress={() => navigate("Timetable")}
              underlayColor="#ff82a0"
            >
              <Text>Timetable</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.StackButton}
              onPress={() => navigate("Route")}
              underlayColor="#ff82a0"
            >
              <Text>Route</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.StackButton}
              underlayColor="#ff82a0"
            >
              <Text></Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.StackButton}
              onPress={() => navigate("Place")}
              underlayColor="#ff82a0"
            >
              <Text>Place</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.StackButton}
              onPress={() => navigate("Info")}
              underlayColor="#ff82a0"
            >
              <Text>Info</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    position: "relative",
    flex: 1,
    zIndex: 0
  },
  wait: {
    flex: 1,
    position: "absolute",
    bottom: "7%",
    right: "50%",
    zIndex: 1
  },
  container: {
    flex: 1
  },
  body: {
    flex: 20
  },
  nav: {
    flex: 1.5,
    flexDirection: "row"
  },
  StackButton: {
    flex: 1,
    backgroundColor: "#ffffff",

    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "rgba(50, 200, 50,0.8)",
    width: "200%",
    height: "200%"
  },
  true: {
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 50,
    backgroundColor: "#ffdae0",
    width: "200%",
    height: "200%"
  },
  text: {
    fontSize: 25
  },
  mapStyle: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

