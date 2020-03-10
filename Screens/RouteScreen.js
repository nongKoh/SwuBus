import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";
    const img1 = require("../assets/Route10.png")
    const img2 = require("../assets/Route2.png")
    const img3 = require("../assets/Route3.png")
    const img4 = require("../assets/RouteEx.png")
export default class RouteScreen extends React.Component {
  static navigationOptions = {
    title: "เส้นทางเดินรถ"
  };

  constructor(props) {
    super(props);
    this.state = {
      url: img1
    };
  }
  onPress = (id) => {
    // console.log(this.state.url)
    this.setState({
      url: id == '1' ? img1 : id == '2' ? img2 : id == '3' ? img3 : img4
    })
  }
  render() {

    this.onPress = this.onPress.bind(this)
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{width: "100%", height: "100%", justifyContent: "center" }}>
                  <Image
                  style={{ width: "100%", height: "70%"}}
                  source={this.state.url}
                />
                </View>
                
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.row}>
                  <TouchableHighlight
                    style={[styles.StackButton,{backgroundColor: "rgba(0, 128, 255,0.5)",}]}
                    onPress={() => {this.onPress("1")}}
                    underlayColor="#ffffff"
                  >
                    <Text style={{fontSize: 18, color: "rgba(0,0,0,1)"}}>สาย 1</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[styles.StackButton,{backgroundColor: "rgba(255, 0, 0,0.5)",}]}
                    onPress={() => {this.onPress("2")}}
                    underlayColor="#ffffff"
                  >
                    <Text style={{fontSize: 18, color: "rgba(0,0,0,1)"}}>สาย 2</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.row}>
                  <TouchableHighlight
                    style={[styles.StackButton,{backgroundColor: "rgba(255, 200, 0,0.5)",}]}
                    onPress={() => {this.onPress("3")}}
                    underlayColor="#ffffff"
                  >
                    <Text style={{fontSize: 18, color: "rgba(0,0,0,1)"}}>สาย 3</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[styles.StackButton,{backgroundColor: "rgba(50, 200, 50,0.5)",}]}
                    onPress={() => {this.onPress("4")}}
                    underlayColor="#ffffff"
                  >
                    <Text style={{fontSize: 18, color: "rgba(0,0,0,1)"}}>สายด่วน</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flex: 1
    // backgroundColor: "red"
  },
  StackButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 20
  }
});
