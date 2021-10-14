import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {Avatar, Caption, Drawer, Switch, Text, Title, TouchableRipple, useTheme} from "react-native-paper";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import {onUserLogout, onUserLogin, onAppLaunch, getForm, getPatient} from "../redux";


const _DrawerContent = (props) => {
  const { userReducer, onUserLogout } = props;
  const { user, isUserLogged } = userReducer;
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const role = user && user.role;

  const paperTheme = useTheme();
  const toggleTheme = useTheme();
  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {isUserLogged && (
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row-reverse" }}>
                {role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente" ?
                    //{/* ajouter le role admin ds la condition */}
                    (user.gender && user.gender[0].slice(14, -3) === "Femme" || user.gender && user.gender[0] === "Femme")? (<Avatar.Image
                        source={require("../assets/image/woman-avatar.png")}
                        size={50}
                        style={{
                          marginRight: 10,
                          backgroundColor: "gold",
                        }}
                    />): <Avatar.Image
                        source={require("../assets/image/man-avatar.png")}
                        size={50}
                        style={{
                          marginRight: 10,
                          backgroundColor: "gold",
                        }}
                    />

                    : null}
                {/*<Avatar.Image*/}
                {/*  source={require("../assets/image/woman-avatar.png")}*/}
                {/*  size={50}*/}
                {/*  style={{*/}
                {/*    marginRight: 10,*/}
                {/*    backgroundColor: "gold",*/}
                {/*  }}*/}
                {/*/>*/}
                <View
                  style={{
                    marginRight: 10,
                  }}
                >
                  <Title style={styles.title}>{user.first_name}</Title>
                  <Caption style={styles.caption}>
                    <Text>{user.first_name + " " + user.last_name}</Text>
                  </Caption>
                </View>
              </View>
            </View>
          )}
          <Drawer.Section style={styles.drawerSection} key={user && user.id}>
            <DrawerItem
              label="Bienvenida"
              icon={({ color, size }) => (
                <Ionicons name="md-home" color="#fd9854" size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
              style={[styles.drawerItem]}
            />
            {!isUserLogged && (
              <View key={user && user.id}>
                <DrawerItem
                  label="Inscribirse"
                  icon={({ color, size }) => (
                      <FontAwesome name="sign-in" size={24} color="#67b4aa" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Inscription");
                  }}
                  style={[styles.drawerItem]}
                />
                <DrawerItem
                  label="Conexion"
                  icon={({ color, size }) => (
                      <MaterialCommunityIcons name="login" size={24} color="#67b4aa" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Login");
                  }}
                  style={[styles.drawerItem]}
                />
                {/*<DrawerItem*/}
                {/*    label="AllPatients"*/}
                {/*    icon={({ color, size }) => (*/}
                {/*        <MaterialCommunityIcons name="clipboard-list" size={26} color="#67b4aa" />*/}
                {/*    )}*/}
                {/*    onPress={() => {*/}
                {/*      props.navigation.navigate("AllPatients");*/}
                {/*      getPatient();*/}
                {/*    }}*/}
                {/*    style={[styles.drawerItem]}*/}
                {/*/>*/}

              </View>
            )}
            {isUserLogged && (
              <View>
                <DrawerItem
                  label="Profile"
                  icon={({ color, size }) => (
                      <FontAwesome name="user" size={24} color="#67b4aa" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Profile");
                  }}
                  style={[styles.drawerItem]}
                />
                {role && role === "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 28) === "um_fisioterapeuta"?
                    <>
                      <DrawerItem
                        label="Datos"
                        icon={({ color, size }) => (
                            <AntDesign name="database" size={26} color="#67b4aa" />
                        )}
                        onPress={() => {
                          props.navigation.navigate("DatosScreen");
                          getPatient();
                        }}
                        style={[styles.drawerItem]}
                      />
                      <DrawerItem
                          label="AllPatients"
                          icon={({ color, size }) => (
                              <Ionicons name="list-circle" size={26} color="#67b4aa" />
                          )}
                          onPress={() => {
                            props.navigation.navigate("AllPatients");
                            // getPatient();
                          }}
                          style={[styles.drawerItem]}
                      />
                    </> :
                    <>
                      <DrawerItem
                                   label="Formulaire"
                                   icon={({ color, size }) => (
                                       <Ionicons name="md-list" color={color} size={size} />
                                   )}
                                   onPress={() => {
                                     props.navigation.navigate("Form");
                                     // getForm(user)
                                     // ; getPatient();
                                   }}
                                   style={[styles.drawerItem]}
                      />
                      <DrawerItem
                                   label="Phases"
                                   icon={({ color, size }) => (
                                       <FontAwesome5 name="layer-group" size={24} color="#67b4aa" />
                                   )}
                                   onPress={() => {
                                     // getExercice(user);
                                     props.navigation.navigate("Phases");
                                   }}
                                   style={[styles.drawerItem]}
                      />
                      {/*<DrawerItem*/}
                      {/*  label="Datos"*/}
                      {/*  icon={({ color, size }) => (*/}
                      {/*      <MaterialCommunityIcons name="clipboard-list" size={26} color="#67b4aa" />*/}
                      {/*  )}*/}
                      {/*  onPress={() => {*/}
                      {/*    props.navigation.navigate("Datos");*/}
                      {/*    getPatient();*/}
                      {/*  }}*/}
                      {/*  style={[styles.drawerItem]}*/}
                      {/*/>*/}
                    </>

                      // <DrawerItem
                      //   label="Presentation"
                      //   icon={({ color, size }) => (
                      //       <MaterialCommunityIcons name="presentation-play" size={24} color="black" />
                      //   )}
                      //   onPress={() => {
                      //     props.navigation.navigate("Presentation");
                      //   }}
                      //   style={[styles.drawerItem]}
                      // />,
                }

              </View>
            )}
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={props.toggleTheme}
              // onPress={() => {
              //   toggleTheme();
              // }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                  {/*<Switch value={isDarkTheme} />*/}
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {user !== null && (
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Sign Out"
            icon={({ color, size }) => (
              <Ionicons name="md-exit" color="red" size={size} />
            )}
            style={{
              marginLeft: 100,
            }}
            onPress={() => {
              props.navigation.navigate("Home");
              onUserLogout();
            }}
          />
        </Drawer.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    marginLeft: 100,
  },
  drawerSection: {
    marginTop: 15,
  },

  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

export const DrawerContent = connect(mapStateToProps, {
  onAppLaunch,
  onUserLogin,
  onUserLogout,
  getForm,
  getPatient
})(_DrawerContent);
