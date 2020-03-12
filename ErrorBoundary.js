import React, { useEffect } from "react";
import { AppState } from "react-native";
import { Count } from "./Screens/userfunction";
class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    appState: AppState.currentState
  };
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount = () => {
    AppState.removeEventListener("change", this._handleAppStateChange);
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    } else {
      console.log("Close App");
      Count(true);
    }
    this.setState({ appState: nextAppState });
  };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? <FallbackComponent /> : this.props.children;
  }
}

export default ErrorBoundary;
