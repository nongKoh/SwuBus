import React, { useEffect } from "react";
import { AppRegistry, AsyncStorage, AppState } from "react-native";
import * as TaskManager from "expo-task-manager";
import Navigator from "./routes/homeStack";
import ErrorBoundary from "./ErrorBoundary";
export default function App() {
  return (
    <ErrorBoundary>
      <Navigator />
    </ErrorBoundary>
  );
}

AppRegistry.registerComponent("Swubus M", () => App);
