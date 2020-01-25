import React from 'react';
import { AppRegistry } from 'react-native';
import Navigator from './routes/homeStack'
export default function App() {
  return (
      <Navigator/>
  );
}



AppRegistry.registerComponent("Swubus M", () => App);  