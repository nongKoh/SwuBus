import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Image
  // Button
} from "react-native";
import Modal from "react-native-modalbox";
import axios from "axios";
import env from "./config";

export default class App extends React.Component {
  _isMounted = false;
  static navigationOptions = {
    title: "ตารางเดินรถ"
  };
  state = {
    nowstation: {
      now_name: "",
      now_id: "",
      now_url:
        "https://i.pinimg.com/originals/43/58/14/435814f8040cc60fcadec7d07e45daae.jpg",
      route_1: false,
      route_2: false,
      route_3: false,
      route_4: false
      // route: [true,true,true,true]
    },
    nextstation: {
      next_name: "",
      next_id: "",
      next_url:
        "https://i.pinimg.com/originals/95/0d/91/950d91f08a8438df05d29a6364f7cebd.jpg",
      route_1: false,
      route_2: false,
      route_3: false,
      route_4: false
      // route: [true,true,true,true]
    },
    route: {
      one_url:
        "https://i.pinimg.com/originals/2d/8b/49/2d8b49b3cb952c9e9117da940d05a1d4.jpg",
      two_url:
        "https://i.pinimg.com/originals/9c/5c/83/9c5c836ecf2c5f6518fdf918752ca469.jpg",
      three_url:
        "https://i.pinimg.com/originals/21/be/b9/21beb9ee69c6ae7225b4ea8ae1d49534.jpg",
      express_url:
        "https://i.pinimg.com/originals/c4/b1/d9/c4b1d96cda1a2a0849daea9721fadca8.jpg"
    },
    data: [],
    time: [0, 0, 0, 0]
  };

  componentDidMount() {
    this._isMounted = true;
    this.getStation();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getStation = async () => {
    try {
      let res = await axios.get(`${env.url}/station`);
      let { data } = await res;
      if (this._isMounted) {
        this.setState({
          data: data
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  setNowstation = data => {
    this.setState({
      nowstation: {
        now_name: data.station_name,
        now_id: data.station_id,
        now_url: data.station_url,
        route_1: data.route_1,
        route_2: data.route_2,
        route_3: data.route_3,
        route_4: data.route_4
      }
    });
  };

  setNextstation = data => {
    this.setState({
      nextstation: {
        next_name: data.station_name,
        next_id: data.station_id,
        next_url: data.station_url,
        route_1: data.route_1,
        route_2: data.route_2,
        route_3: data.route_3,
        route_4: data.route_4
      }
    });
  };

  getTime = async (nowstation, nextstation) => {
    try {
      const res = await axios.get(`${env.url}/time`, {
        params: {
          now: nowstation.now_id,
          next: nextstation.next_id
        }
      });
      let { data } = await res;
      this.setState({
        time: data[0].time
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const search = this.state;
    const station = this.state;
    let TouchableNow = data =>
      data.data.map(data => {
        return (
          <TouchableOpacity
            key={data.station_id}
            style={styles.stationbutton}
            onPress={() => this.setNowstation(data)}
            underlayColor="#ff82a0"
          >
            <Text key={data.station_id}>{data.station_name}</Text>
          </TouchableOpacity>
        );
      });
    let TouchanleNext = data =>
      data.data.map(data => {
        return (
          <TouchableOpacity
            key={data.station_id}
            style={styles.stationbutton}
            onPress={() => this.setNextstation(data)}
            underlayColor="#ff82a0"
          >
            <Text key={data.station_id}>{data.station_name}</Text>
          </TouchableOpacity>
        );
      });
    const Routetime = () => {
      const item = [];
      const nowstation = station.nowstation;
      const nextstation = station.nextstation;
      if (nowstation.route_1 && nextstation.route_1) {
        item.push(
          <View style={[styles.routemodal, styles.routemodal1]} key={1}>
            <Image
              style={styles.routeimage}
              source={{
                uri: search.route.one_url
              }}
            />
            <Text style={styles.modaltext}>สาย 1</Text>
            <Text style={styles.modaltext}>{station.time[0]} นาที</Text>
          </View>
        );
      }
      if (nowstation.route_2 && nextstation.route_2) {
        item.push(
          <View style={[styles.routemodal, styles.routemodal2]} key={2}>
            <Image
              style={styles.routeimage}
              source={{
                uri: search.route.one_url
              }}
            />
            <Text style={styles.modaltext}>สาย 2</Text>
            <Text style={styles.modaltext}>{station.time[1]} นาที</Text>
          </View>
        );
      }
      if (nowstation.route_3 && nextstation.route_3) {
        item.push(
          <View style={[styles.routemodal, styles.routemodal3]} key={3}>
            <Image
              style={styles.routeimage}
              source={{
                uri: search.route.one_url
              }}
            />
            <Text style={styles.modaltext}>สาย 3</Text>
            <Text style={styles.modaltext}>{station.time[2]} นาที</Text>
          </View>
        );
      }
      if (nowstation.route_4 && nextstation.route_4) {
        item.push(
          <View style={[styles.routemodal, styles.routemodal4]} key={4}>
            <Image
              style={styles.routeimage}
              source={{
                uri: search.route.one_url
              }}
            />
            <Text style={styles.modaltext}>สาย ด่วน</Text>
            <Text style={styles.modaltext}>{station.time[3]} นาที</Text>
          </View>
        );
      }
      if (item.length == 0) {
        return (
          <View style={[]}>
            <Text style={styles.modaltext}>ไม่พบเส้นทางที่ต้องการ</Text>
          </View>
        );
      } else {
        this.getTime(nowstation, nextstation);
        return item;
      }
    };
    const Route = () => {
      return (
        <View style={[styles.modal]}>
          <View style={[styles.routemodal]}>
            <Text style={styles.modaltext}></Text>
            <Text style={styles.modaltext}>Route</Text>
            <Text style={styles.modaltext}>Time</Text>
          </View>
          <Routetime />
        </View>
      );
    };
    return (
      <View style={styles.timetable}>
        <View style={styles.viewtop}>
          <View style={styles.texttop}>
            <Text style={{ textAlign: "center" }}>สถานีต้นทาง</Text>
            <Text style={styles.textstation}>{search.nowstation.now_name}</Text>
            <Image
              style={styles.imagestation}
              source={{
                uri: search.nowstation.now_url
              }}
            />
          </View>
          <View style={styles.texttop}>
            <Text style={{ textAlign: "center" }}>สถานีปลายทาง</Text>
            <Text style={styles.textstation}>
              {search.nextstation.next_name}
            </Text>
            <Image
              style={styles.imagestation}
              source={{
                uri: search.nextstation.next_url
              }}
            />
          </View>
        </View>
        <View style={styles.scrollview}>
          <ScrollView style={styles.scroll}>
            <TouchableNow data={station.data} />
          </ScrollView>
          <ScrollView style={styles.scroll}>
            <TouchanleNext data={station.data} />
          </ScrollView>
        </View>
        <View style={styles.buttonbot}>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => this.refs.modal4.open()}
            underlayColor="#ff82a0"
          >
            <Text>ค้นหา</Text>
          </TouchableOpacity>
        </View>
        <Modal
          style={[styles.modal, styles.modal4]}
          position={"bottom"}
          ref={"modal4"}
        >
          <Route />
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  timetable: {
    flex: 1
  },
  viewtop: {
    flex: 5,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderColor: "gray",
    borderWidth: 1,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5
  },
  scrollview: {
    flex: 7.5,
    flexDirection: "row",
    marginTop: 7,
    backgroundColor: "#ffffff",
    borderColor: "gray",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5
  },
  stationbutton: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    margin: 5,
    padding: 10,
    borderColor: "gray",
    borderRadius: 5
  },
  scroll: {
    flex: 1,
    flexDirection: "column"
  },
  texttop: {
    flex: 1,
    borderColor: "black",
    borderWidth: 0.5,
    textAlign: "center",
    margin: 10,
    borderRadius: 16,
    fontSize: 13
  },
  textstation: {
    flex: 2,
    paddingTop: 5,
    textAlign: "center"
  },
  imagestation: {
    flex: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  buttonbot: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "gray",
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  submitbutton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  modal: {
    alignItems: "center",
    flex: 1
  },
  modal4: {
    flex: 0.67,
    flexDirection: "column",
    borderRadius: 50
  },
  routemodal: {
    justifyContent: "center",
    flex: 0.2,
    flexDirection: "row",
    marginBottom: 2,
    borderWidth: 0.5
  },
  Route: {
    alignItems: "center"
  },
  routemodal1: {
    backgroundColor: "rgba(0, 128, 255,0.5)"
  },
  routemodal2: {
    backgroundColor: "rgba(255, 0, 0,0.5)"
  },
  routemodal3: {
    backgroundColor: "rgba(255, 200, 0,0.5)"
  },
  routemodal4: {
    backgroundColor: "rgba(50, 200, 50,0.5)"
  },
  modaltexttop: {
    flex: 0.4,
    textAlign: "center",
    alignSelf: "center"
  },
  modaltext: {
    flex: 0.4,
    textAlign: "center",
    alignSelf: "center"
  },
  routeimage: {
    flex: 0.4
  }
});
