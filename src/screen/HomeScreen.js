import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity} from "react-native";
import InolamLogo from "../assets/image/logo-inolam-blanc.png";
import UscLogo from "../assets/image/logo-usc.png";
import bgImg from "../assets/image/massage.jpg";
import { onAppLaunch, getUserMeta } from "../redux";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

const _HomeScreen = (props) => {
  const { onAppLaunch, userReducer } = props;
  const { user, isUserLogged } = userReducer;
  // console.log(user);

  useEffect(() => {
    onAppLaunch();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      // console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImg} style={styles.imageBack}>
        <View style={styles.box}>
          <Text style={styles.text}>
            Seresa : SEmillero de REcherche SAnté et TECHnologie Proyecto
            Colaborativo USACA e INOLAM Docente USACA : Andrea P Calvo Proyecto
            presentado en el XVII Encuentro interno de Investigacion Facultad de
            Salud 2020
          </Text>
          <View style={styles.imageContainer}>
            <Image source={InolamLogo} style={styles.image} />
            <Image source={UscLogo} style={styles.image} />
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>
            El Grupo de investigacion Salud y Movimiento de la usaca en
            colaboration con el equipo technico de inolam pone a disposition de
            todas las personas que quieran participar a este estudio (objectivos
            del proyecto salud a definir pour los pacientes participanates)
          </Text>
          <Text style={styles.text}>
            Message pour inciter les visiteurs les visiteurs à s’inscrire au
            programme de recherche
          </Text>
        </View>
        {!isUserLogged && (
            <TouchableOpacity onPress={() => props.navigation.navigate("Login")} style={styles.homeBtnStyle}>
              <Text style={styles.textBtn}>Acceder a votre compte</Text>
            </TouchableOpacity>)
        }
        {
          isUserLogged && (
              <TouchableOpacity onPress={() => props.navigation.navigate("Presentation", {user})} style={styles.homeBtnStyle}>
                <Text style={styles.textBtn}>voir plus d'informations</Text>
              </TouchableOpacity>
          )
        }
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: 10,
    padding: 10,
    backgroundColor: "#afcfcb",
    borderRadius: 10,
    opacity:0.6
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBack: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "center",
    overflow:"hidden"
  },
  image: {
    resizeMode: "contain",
    height: 70,
    width: 140,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  homeBtnStyle: {
    backgroundColor:"#fd9854",
    margin: 10,
    borderRadius: 15,
  },
  textBtn: {
    fontSize: 20,
    color:"#ffffff",
    textAlign: "center"
  }
});
const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const HomeScreen = connect(mapStateToProps, { onAppLaunch, getUserMeta })(
  _HomeScreen
);

export default HomeScreen;
