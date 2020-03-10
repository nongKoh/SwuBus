import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modalbox";
import axios from "axios";
import haversine from "haversine";
import env from "./config";
export default class PlaceScreen extends React.Component {
  static navigationOptions = {
    title: "สถานีรถ"
  };
  _isMounted = false;
  state = {
    station: {
      name: "สถานีปัจจุบัน",
      id: "",
      longitude: 0,
      latitude: 0,
      route_1: false,
      route_2: false,
      route_3: false,
      route_4: false
    },
    data: [],
    driver: []
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

  getDriver = async () => {
    try {
      let res = await axios.get(`${env.url}/coordinate`);
      let { data } = await res;
      this.setState({
        driver: data
      });
    } catch (error) {
      console.log(error);
    }
  };

  setStation = data => {
    this._isMounted = false;
    this.setState({
      station: {
        name: data.station_name,
        id: data.station_id,
        longitude: data.longitude,
        latitude: data.latitude,
        route_1: data.route_1,
        route_2: data.route_2,
        route_3: data.route_3,
        route_4: data.route_4
      }
    });
  };
  getDistance = (start_long, start_lat, end_long, end_lat) => {
    const start = {
      latitude: parseFloat(start_lat),
      longitude: parseFloat(start_long)
    };
    const end = {
      latitude: parseFloat(end_lat),
      longitude: parseFloat(end_long)
    };
    let time = haversine(start, end, { unit: "meter" }) / 283.333;
    return <Text style={{color:"red"}} >{parseInt(time)} Min</Text>;
  };
  render() {
    const station = this.state;
    let GetTime = () => {
      this.getDriver();
      const data = station.station;
      const driver = station.driver;
      const view1 = driver
        .filter(driver => driver.Status == 1)
        .filter(driver => driver.Route == 1)
        .map(driver => {
          return (
            <View key={driver.Id} style={styles.driver}>
              <View style={styles.row}>
                <View style={styles.status}>
                  <Text> Online </Text>
                </View>
                <View style={styles.count}>
                  <Text>คันที่ {driver.id} </Text>
                </View>
                <View style={styles.time}>
                  {this.getDistance(
                    driver.longitude,
                    driver.latitude,
                    data.longitude,
                    data.latitude
                  )}
                </View>
              </View>
            </View>
          );
        });
      const view2 = driver
        .filter(driver => driver.Status == 1)
        .filter(driver => driver.Route == 2)
        .map(driver => {
          return (
            <View key={driver.Id} style={styles.driver}>
              <View style={styles.row}>
                <View style={styles.status}>
                  <Text> Online </Text>
                </View>
                <View style={styles.count}>
                  <Text>คันที่ {driver.id} </Text>
                </View>
                <View style={styles.time}>
                  {this.getDistance(
                    driver.longitude,
                    driver.latitude,
                    data.longitude,
                    data.latitude
                  )}
                </View>
              </View>
            </View>
          );
        });
      const view3 = driver
        .filter(driver => driver.Status == 1)
        .filter(driver => driver.Route == 3)
        .map(driver => {
          return (
            <View key={driver.Id} style={styles.driver}>
              <View style={styles.row}>
                <View style={styles.status}>
                  <Text> Online </Text>
                </View>
                <View style={styles.count}>
                  <Text>คันที่ {driver.id} </Text>
                </View>
                <View style={styles.time}>
                  {this.getDistance(
                    driver.longitude,
                    driver.latitude,
                    data.longitude,
                    data.latitude
                  )}
                </View>
              </View>
            </View>
          );
        });
      const view4 = driver
        .filter(driver => driver.Status == 1)
        .filter(driver => driver.Route == 4)
        .map(driver => {
          return (
            <View key={driver.Id} style={styles.driver}>
              <View style={styles.row}>
                <View style={styles.status}>
                  <Text> Online </Text>
                </View>
                <View style={styles.count}>
                  <Text>คันที่ {driver.id} </Text>
                </View>
                <View style={styles.time}>
                  {this.getDistance(
                    driver.longitude,
                    driver.latitude,
                    data.longitude,
                    data.latitude
                  )}
                </View>
              </View>
            </View>
          );
        });
      return (
        <View style={styles.route_1}>
          <View>
            <View style={[styles.route]}>
              <View style={styles.rowroute}>
                <Text style={[styles.textroute, styles.colorroute1]}>
                  สาย 1
                </Text>
                <View>
                  {data.route_1 ? (
                    driver
                      .filter(driver => driver.Route == 1)
                      .filter(driver => driver.Status == 1).length == 0 ? (
                      <View>
                        <Text>รถสายนี้หยุดทำงาน</Text>
                      </View>
                    ) : (
                      <View style={styles.rowdriver}>
                        <View style={styles.rowroute}>{view1}</View>
                      </View>
                    )
                  ) : (
                    <View>
                      <Text>ไม่มีรถสายนี้ผ่านสถานีที่ท่านเลือก</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={[styles.route]}>
              <View style={styles.rowroute}>
                <Text style={[styles.textroute, styles.colorroute2]}>
                  สาย 2
                </Text>
                <View>
                  {data.route_2 ? (
                    driver
                      .filter(driver => driver.Route == 2)
                      .filter(driver => driver.Status == 1).length == 0 ? (
                      <View>
                        <Text>รถสายนี้หยุดทำงาน</Text>
                      </View>
                    ) : (
                      <View style={styles.rowdriver}>
                        <View style={styles.rowroute}>{view2}</View>
                      </View>
                    )
                  ) : (
                    <View>
                      <Text>ไม่มีรถสายนี้ผ่านสถานีที่ท่านเลือก</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={[styles.route]}>
              <View style={styles.rowroute}>
                <Text style={[styles.textroute, styles.colorroute3]}>
                  สาย 3
                </Text>
                <View>
                  {data.route_3 ? (
                    driver
                      .filter(driver => driver.Route == 3)
                      .filter(driver => driver.Status == 1).length == 0 ? (
                      <View>
                        <Text>รถสายนี้หยุดทำงาน</Text>
                      </View>
                    ) : (
                      <View style={styles.rowdriver}>
                        <View style={styles.rowroute}>{view3}</View>
                      </View>
                    )
                  ) : (
                    <View>
                      <Text>ไม่มีรถสายนี้ผ่านสถานีที่ท่านเลือก</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={[styles.route]}>
              <View style={styles.rowroute}>
                <Text style={[styles.textroute, styles.colorroute4]}>
                  สาย ด่วน
                </Text>
                <View>
                  {data.route_1 ? (
                    driver
                      .filter(driver => driver.Route == 4)
                      .filter(driver => driver.Status == 1).length == 0 ? (
                      <View>
                        <Text>รถสายนี้หยุดทำงาน</Text>
                      </View>
                    ) : (
                      <View style={styles.rowdriver}>
                        <View style={styles.rowroute}>{view4}</View>
                      </View>
                    )
                  ) : (
                    <View>
                      <Text>ไม่มีรถสายนี้ผ่านสถานีที่ท่านเลือก</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    };
    let Touchable = data =>
      data.data.map(data => {
        return (
          <TouchableOpacity
            key={data.station_id}
            style={styles.stationbutton}
            onPress={() => {
              this.setStation(data);
              this.refs.modal4.open();
            }}
            underlayColor="#ff82a0"
          >
            <Text key={data.station_id}>{data.station_name}</Text>
          </TouchableOpacity>
        );
      });
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          <Touchable data={station.data} />
        </ScrollView>
        <Modal style={styles.modal} position={"bottom"} ref={"modal4"}>
          <View style={styles.bgmodal}>
            <GetTime />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  ScrollView: {
    flex: 1,
    flexDirection: "column",
    marginTop: 7
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
    margin: 10,
    marginLeft: 70,
    marginRight: 70,
    padding: 10,
    borderColor: "gray",
    borderRadius: 5
  },
  modal: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    opacity: 1
  },
  bgmodal: {
    flex: 1,
    width: "100%"
  },
  route: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  },
  route_1: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 2
  },
  rowroute: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5
  },
  textroute: {
    fontSize: 18,
    borderWidth: 0.2,
    padding: 4,
    borderRadius: 5,
    width: "25%",
    textAlign: "center"
  },
  colorroute1: {
    backgroundColor: "rgba(0, 128, 255,0.5)"
  },
  colorroute2: {
    backgroundColor: "rgba(255, 0, 0,0.5)"
  },
  colorroute3: {
    backgroundColor: "rgba(255, 200, 0,0.5)"
  },
  colorroute4: {
    backgroundColor: "rgba(50, 200, 50,0.5)"
  },
  rowdriver: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    // alignItems: "center",
    marginTop: 5
  },
  driver: {
    display: "flex",
    alignItems: "center",
    // backgroundColor: "red",
    width: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    marginBottom: 3,
    padding: 0.2,
    width: "80%",
    borderRadius: 5
  },
  status: {
    flex: 2,
    // textAlign: "center",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 128,0.2)",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  count: {
    flex: 1,
    // textAlign: "center",
    display: "flex",
    alignItems: "center"
  },
  time: {
    flex: 3,
    // textAlign: "center",
    display: "flex",
    alignItems: "center"
  }
});
