import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from "react-native";

import MapView from "react-native-maps";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
    title: ""
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.wait}>
          <View style={styles.body}></View>
          <TouchableHighlight
            style={styles.circle}
            onPress={() => navigate("Wait")}
            underlayColor="#ff82a0"
          >
            <Text style={styles.text}>Wait</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.map}>
          <View style={styles.body}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 14.1055315,
                longitude: 100.9836131,
                latitudeDelta: 0.001,
                longitudeDelta: 0.0085
              }}
              zoomEnabled={false}
              rotateEnabled={false}
              provider={"google"}
              showsBuildings={false}
              showsTraffic={false}
              showsIndoors={false}
              showsIndoorLevelPicker={false}
              // mapType={"mutedStandard"}
              showsMyLocationButton={true}
              showsUserLocation={true}
            />
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
              // onPress={() => navigate("Timetable")}
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
    // backgroundColor:"green"
  },
  container: {
    flex: 1
  },
  body: {
    flex: 20,
    backgroundColor: "red"
  },
  nav: {
    flex: 1.5,
    flexDirection: "row",
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
    backgroundColor: "#ffdae0",
    width: "200%",
    height: "200%"
    // marginTop:"80%",
    // padding: "10%",
    // paddingTop: "15%",
    // paddingRight: "10%",
    // paddingLeft: "10%",
    // paddingBottom: "15%",
    // height: "10%",
    // justifyContent:"flex-end",
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
