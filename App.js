import "react-native-gesture-handler";
import React, {useState} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, } from "react-native-paper";
import { store } from "./src/redux";
import {enableScreens} from 'react-native-screens';
import TabScreen, {ProfileStackScreen, FormStackScreen, DatosStackScreen,} from "./src/screen/MainTabScreen";
import { DrawerContent } from "./src/components/DrawerContent";
import {LogBox} from "react-native";

LogBox.ignoreLogs(['Remote debugger']);
enableScreens();

const Drawer = createDrawerNavigator();


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: "#ffffff",
    text: "#000000"
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: "#373434",
    text: "#ffffff"
  },
};

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  function toggleTheme() {
    setIsDarkTheme(isDark => !isDark);
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerPosition="right"
            drawerContent={(props) => <DrawerContent {...props} toggleTheme={toggleTheme} />}
          >
            <Drawer.Screen name="Tab" component={TabScreen} />
            <Drawer.Screen name="Form" component={FormStackScreen} />
            <Drawer.Screen name="DatosScreen" component={DatosStackScreen} />
            {/*<Drawer.Screen name="AllPatients" component={AllPatientsStackScreen} />*/}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
