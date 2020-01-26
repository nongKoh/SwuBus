import React from 'react';
import { AppRegistry } from 'react-native';
// import { YellowBox } from 'react-native';

import Navigator from './routes/homeStack'

// YellowBox.ignoreWarnings(['Remote debugger']);
export default function App() {
  return (
      <Navigator/>
  );
}



AppRegistry.registerComponent("Swubus M", () => App);  