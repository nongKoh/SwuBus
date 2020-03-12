import axios from "axios";
import env from "./config";
import { AsyncStorage, Alert } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import haversine from "haversine";
import { BREAK } from "graphql";
let station = [];
let location = {};
// let stations = 0;
let count = 0;
let id = 0;
let status = false;
let check = false
let checkid = false
const putCount = async () => {
  await getLocationAsync();
  station.map(async data => {
    if (await checkarea(data)) {
      id = data.station_id;
      status = true;
      check = true
      checkid = true
      // console.log('wqodqiwdui')
    }
    else {
      // console.log('asadassdads')
      check = true
      status = true;
      // checkid = false
    }
  })
  if (status) {
    await putid();
  }
};

const deleteCount = async () => {
  await getLocationAsync();
  if (id != 0) {
    count = 0;
    await axios.put(`${env.url}/track/${id}`, {
      count: JSON.stringify(count)
    });
    await AsyncStorage.setItem("statuswait", "false");
    status = false;
    check = false
    checkid = false
    id = 0;
  }
};
const putid = async data => {
  if (checkid && check) {
    // Alert.alert(
    //   "ไม่สามารถรอรถได้",
    //   "คุณอยู่ไกลจากสถานี",
    //   [{ text: "OK", onPress: () => deleteCount() }],
    //   { cancelable: false }
    // );
    // AsyncStorage.setItem("statuswait", "false");
    // // id = 0;
    // status = false;
    // check = false
    await AsyncStorage.getItem("statuswait", (err, result) => {
      if (JSON.parse(result)) {
        count = +1;
        axios.put(`${env.url}/track/${id}`, {
          count: JSON.stringify(count)
        });
      } else {
        console.log("noput");
      }
    });
    status = false;
    check = false
    checkid = false
  } else {
    Alert.alert(
      "ไม่สามารถรอรถได้",
      "คุณอยู่ไกลจากสถานี",
      [{ text: "OK", onPress: () => deleteCount() }],
      { cancelable: false }
    );
    AsyncStorage.setItem("statuswait", "false");
    // id = 0;
    status = false;
    check = false
    checkid = false
    // await AsyncStorage.getItem("statuswait", (err, result) => {
    //   if (JSON.parse(result)) {
    //     count = +1;
    //     axios.put(`${env.url}/track/${id}`, {
    //       count: JSON.stringify(count)
    //     });
    //   } else {
    //     console.log("noput");
    //   }
    // });
  }
};
const checkarea = async data => {
  let user = await location.coords;
  let stations = await data;
  const start = {
    latitude: parseFloat(user.longitude),
    longitude: parseFloat(user.latitude)
  };
  const end = {
    latitude: parseFloat(stations.longitude),
    longitude: parseFloat(stations.latitude)
  };
  // let km = await haversine(start, end, { unit: "meter" })
  // console.log((haversine(start, end, { unit: "meter" })))
  if (haversine(start, end, { unit: "meter" }) <= 2000) {
    return true;
  } else return false;
};
const getStation = async () => {
  try {
    let res = await axios.get(`${env.url}/station`);
    let { data } = await res;
    station = data;
  } catch (error) {
    console.log(error);
  }
};

getLocationAsync = async () => {
  try {
    let locations = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });
    location = locations;
  } catch (error) {
    console.log(error);
  }
};

export const Count = async data => {
  await getStation();
  await AsyncStorage.getItem("statuswait", async (err, result) => {
    if (data) {
      if (JSON.parse(result)) {
        deleteCount();
      } else {
        await AsyncStorage.setItem("statuswait", "false");
      }
    } else if (JSON.parse(result)) {
      putCount();
    } else {
      deleteCount();
    }
  });
};
