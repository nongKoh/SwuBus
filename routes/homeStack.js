import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from "../Screens/HomeScreen";
import TimetableScreen from "../Screens/TimetableScreen"
import RouteScreen from "../Screens/RouteScreen"
import PlaceScreen from "../Screens/PlaceScreen"
import InfoScreen from "../Screens/InfoScreen"
import WithScreen from "../Screens/WithScreen";

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Timetable: TimetableScreen,
    Route: RouteScreen,
    Wait: WithScreen,
    Place: PlaceScreen,
    Info: InfoScreen,
  }
);

const Navigator = createAppContainer(MainNavigator); 
export default Navigator;
