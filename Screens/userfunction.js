import axios from "axios";
import env from "./config";
import { AsyncStorage, Alert } from "react-native";
import * as Location from "expo-location";

import haversine from "haversine";
let station = [];
let location = {};
// let stations = 0;
let id = 0;
let status = false;
let check = false
let checkid = false
let putstatus = false
const putCount = async () => {
  await getLocationAsync();
  station.map(async data => {
    if (await checkarea(data)) {
      console.log(data.station_id)
      id = data.station_id;
      status = true;
      check = true
      checkid = true
    }
    else {
      check = true
      status = true;
    }
  })
  if (status) {
    // console.log("เข้าput")
    await putid();
  }
};

const deleteCount = async () => {
  await getLocationAsync();
  if (id != 0) {
    await axios.put(`${env.urltest}/station/count/${id}`, {
      status: "1"
    });
    console.log("ลบแล้ว")
    await AsyncStorage.setItem("statuswait", "false");
    status = false;
    check = false
    checkid = false
    id = 0;
    putstatus = false
  }
  // console.log('ไม่ลบ')
};
const putid = async data => {
  if (checkid && check) {
    await AsyncStorage.getItem("statuswait", async (err, result) => {
      if (JSON.parse(result) && !putstatus) {
        await axios.put(`${env.urltest}/station/count/${id}`, {
          status: "0"
        });
        console.log("เพิ่มแล้ว")
        putstatus = true
      } else {
        console.log("ไม่เพิ่ม");
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
    status = false;
    check = false
    checkid = false
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
  if (haversine(start, end, { unit: "meter" }) <= 10) {
    return true;
  } else return false;
};
const getStation = async () => {
  console.log('test')
  try {
    let res = await axios.get(`${env.urltest}/station/all`);
    let { data } = await res;
    station = data;
  } catch (error) {
    console.log(error);
  }
};
getStation();
getLocationAsync = async () => {
  try {
    let locations = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });
    location = locations;
  } catch (error) {
    console.log(error);
  }
};

export const Count = async data => {
  
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
