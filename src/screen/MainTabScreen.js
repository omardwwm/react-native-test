import React, {useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Image } from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import FormScreen from "./FormScreen";
import PhasesScreen from "./PhasesScreen";
import PasswordChangeScreen from "./PasswordChangeScreen";
import logo from "../assets/image/Logo-Seresa-Tech.png";
import DatosScreen from "./DatosScreen";
import MyPatientsScreen from "./MyPtientsScreen";
import FichePatientScreen from "./FichePtientScreen";
import PresentationScreen from "./PresentationScreen";
import PasswordRecuperationScreen from "./PasswordReuperationScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { connect } from "react-redux";
import { onAppLaunch, getUserMeta, onUserLogin, onUserLogout} from "../redux";
import AllPatientsScreen from "./AllPatientsScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";


const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
// function to get the name of route and show it in the header title with navigation with tabButtonNavigation (https://reactnavigation.org/)
function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    switch (routeName) {
        case 'Home':
            return 'Welcome';
        case 'Profile':
            return 'My profile';
        case 'Phases':
            return 'My Phases';
        case 'Form':
            return 'My Form';
        case 'Inscription':
            return 'Register-form';

    }
}
//the composantes of our TabButtonNavigation in function if user isLogged or not
const _TabScreen = (props) => {
    const { userReducer, onAppLaunch, getUserMeta, onUserLogin } = props;
    const { user, isUserLogged } = userReducer;
    // console.log(user && user.role);

    useEffect(()=>{
        onAppLaunch();
    }, [])

    const role = user && user.role;

    // console.log('userfromtabnavigation', user);
    // console.log(user && user.mod6_capabilities[0].slice(11, 28))
    if (isUserLogged){
        return (
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#fff"
                inactiveColor="#3e2465"
                barStyle={{ backgroundColor: '#009387' }}
            >
                <Tab.Screen
                    name="Home"
                    component={MainStackScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: '#009387',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26}/>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileStackScreen}
                    options={{
                        tabBarLabel: 'perfil',
                        tabBarColor: '#f4a63a',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="account-details" color={color} size={26}/>
                        ),
                    }}
                />

                {role && role === "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 28) === "um_fisioterapeuta" ?
                    <>
                        <Tab.Screen
                            name="AllPatients"
                            component={AllPatientsStackScreen}
                            options={{
                                tabBarLabel: 'AllPatients',
                                tabBarColor: '#009387',
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="clipboard-list" color={color} size={26}/>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="MyPatients"
                            component={MyPatientsStackScreen}
                            options={{
                                tabBarLabel: 'MyPatients',
                                tabBarColor: '#009387',
                                tabBarIcon: ({color}) => (
                                    <Ionicons name="list-circle" color={color} size={26}/>
                                ),
                            }}
                        />
                    </>
                    :
                    <>
                    <Tab.Screen
                        name="Phases"
                        component={PhasesStackScreen}
                        options={{
                            tabBarLabel: 'Phases',
                            tabBarColor: '#009387',
                            tabBarIcon: ({color}) => (
                                <MaterialCommunityIcons name="run" color={color} size={26}/>
                            ),
                        }}
                    />
                    </>
                }
            </Tab.Navigator>
        )
    } else {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#fff"
                inactiveColor="#3e2465"
                barStyle={{ backgroundColor: '#009387' }}
            >
                <Tab.Screen
                    name="Home"
                    component={MainStackScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: '#009387',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Inscription"
                    component={RegisterStackScreen}
                    options={{
                        tabBarLabel: 'Register',
                        tabBarColor: '#009387',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="account-plus" color={color} size={26}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});
const TabScreen = connect(mapStateToProps, {
    onAppLaunch,
    onUserLogin,
    getUserMeta
})(_TabScreen);
export default TabScreen;



//establishment of our StackNavigation (components)
// Header bar
const ScreenOption = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: "#67b4aa"
    },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 24, marginRight:25
    },

    // headerLeft: () => (
    //   <Image
    //     source={logo}
    //     style={{
    //         height: "100%",
    //         // width:30,
    //         resizeMode: "contain",
    //         position: "absolute",
    //         left: -60,
    //     }}
    //   />
    // ),
    headerRight: () => (
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={{
          marginRight: 10,
        }}
      >
        <Ionicons name="md-menu" size={45} />
          <Image
              source={logo}
              style={{
                  height: "100%",
                  // width:30,
                  resizeMode: "contain",
                  position: "absolute",
                  right: -30,
              }}
          />
      </Pressable>
    ),
  };
};

export const TabStackScreen = ({navigation}) =>(
    <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
        <Stack.Screen
            name="SERESA"
            component={TabScreen}
            options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
            })}
        />
    </Stack.Navigator>
);

export const MainStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Bienvenida" }}
    />
    <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Conexion" }}
    />
      <Stack.Screen
          name="PasswordRecuperation"
          component={PasswordRecuperationScreen}
          options={{title: "reset password"}}
      />
      <Stack.Screen name="Presentation"
                                component={PresentationScreen}
                                options={{title: "espalda baja"}}
      />
  </Stack.Navigator>
);

export const PresentationStackScreen = ({navigation})=>(
    <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
        <Stack.Screen name="Presentation"
                                  component={PresentationScreen}
                                  options={{title: "espalda baja"}}
        />
    </Stack.Navigator>
);

export const PasswordRecuperationStackScreen = ({navigation})=>(
    <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
        <Stack.Screen name="PasswordRecuperation"
                                  component={PasswordRecuperationScreen}
                                  options={{title: "reset password"}}
        />
    </Stack.Navigator>
);

export const RegisterStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
      name="Inscription"
      component={RegisterScreen}
      options={{ title: "Inscribirse" }}
    />
  </Stack.Navigator>
);

export const LoginStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Conexion" }}
    />
  </Stack.Navigator>
);

export const ProfileStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
    />
    <Stack.Screen
        name="PasswordChange"
        component={PasswordChangeScreen}
        options={{ title: "PasswordChange" }}
    />
  </Stack.Navigator>
);

export const FormStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
      name="Form"
      component={FormScreen}
      options={{ title: "Formulaire" }}
    />
  </Stack.Navigator>
);

export const PhasesStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
      name="Phases"
      component={PhasesScreen}
      options={{ title: "Phases" }}
    />
  </Stack.Navigator>
);

export const PasswordChangeStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
      name="PasswordChange"
      component={PasswordChangeScreen}
      options={{ title: "PasswordChange" }}
    />
  </Stack.Navigator>
);

export const DatosStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
        <Stack.Screen
            name="DatosScreen"
            component={DatosScreen}
            options={{ title: "Datos" }}
        />
    </Stack.Navigator>
)

export const AllPatientsStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
    <Stack.Screen
      name="AllPatients"
      component={AllPatientsScreen}
      options={{ title: "AllPatients" }}
    />
      <Stack.Screen
          name="FichePatient"
          component={FichePatientScreen}
          options={{title: "FichePatient"}}
      />
  </Stack.Navigator>
);
// export const FichePatientStackScreen = ({navigation}) =>(
//     <FichePatientStack.Navigator screenOptions={ScreenOption({ navigation })}>
//         <FichePatientStack.Screen
//             name="FichePatient"
//             component={FichePatientScreen}
//             options={{title: "FichePatient"}}
//         />
//     </FichePatientStack.Navigator>
// )
export const MyPatientsStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={ScreenOption({ navigation })}>
        <Stack.Screen
            name="MyPatients"
            component={MyPatientsScreen}
            options={{title: "MyPatients"}}
        />
        <Stack.Screen
            name="FichePatient"
            component={FichePatientScreen}
            options={{title: "FichePatient"}}
        />
    </Stack.Navigator>
)
