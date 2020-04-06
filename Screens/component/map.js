import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
  Animation
} from "react-native";
import env from "../config";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker, MarkerIcon } from "react-native-maps";
import axios from "axios";
import mark1 from "../../assets/50x50Line1.png";
import mark2 from "../../assets/50x50Line2.png";
import mark3 from "../../assets/50x50Line3.png";
import mark4 from "../../assets/50x50LineEx.png";
import { Count } from "../userfunction"

function Map(props) {
  const [initialRegion, setinitialRegion] = useState({
    latitude: 14.1035315,
    longitude: 100.9836131,
    latitudeDelta: 0.001,
    longitudeDelta: 0.0135
  });
  const [marker, setMarker] = useState([]);
  const getMark = async () => {
    try {
      let res = await axios.get(`${env.urltest}/track/all`);
      let data = res;
      setMarker(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMark();
    const interval = setInterval(() => {
      getMark();
      Count()
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const Mark = data => {
    const mark = data
      .filter(data => data.Status == 1)
      .map(data => {
        let longitude = parseFloat(data.longitude);
        let latitude = parseFloat(data.latitude);
        return (
          <Marker
            key={data.Driverid}
            ref={marker => {
              marker = marker;
            }}
            coordinate={{
              longitude: longitude,
              latitude: latitude
            }}
            title={data.Id}
            tracksViewChanges={false}
            image={
              Platform.OS === "android"
                ? data.Route == 1
                  ? mark1
                  : data.Route == 2
                  ? mark2
                  : data.Route == 3
                  ? mark3
                  : mark4
                : undefined
            }
            icon={
              Platform.OS === "ios"
                ? data.Route == 1
                  ? mark1
                  : data.Route == 2
                  ? mark2
                  : data.Route == 3
                  ? mark3
                  : mark4
                : undefined
            }
          >
          </Marker>
        );
      });
    return mark;
  };
  return (
    <MapView
      style={props.style}
      provider={"google"}
      initialRegion={initialRegion}
      zoomEnabled={false}
      rotateEnabled={false}
      showsUserLocation={true}
    >
      {Mark(marker)}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({});
