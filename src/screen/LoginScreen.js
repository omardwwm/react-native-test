import React, { useState } from "react";
import {Text, View, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, Button} from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { onUserLogin, hideModal, setIsLoading } from "../redux";
import { Ionicons } from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";

const _LoginScreen = (props) => {
  const { onUserLogin, userReducer, hideModal, setIsLoading } = props;
  const { showModal, isUserLogged, isLoading } = userReducer;
  const {colors} = useTheme();
  const [login, setLogin] = useState({
    username: "",
    password: "",
    secureTextEntry: true,
  });

  const handleChange = (value, stateName) => {
    setLogin({
      ...login,
      [stateName]: value,
    });
  };

  const updateSecureTextEntry = () => {
    setLogin({
      ...login,
      secureTextEntry: !login.secureTextEntry,
    });
  };

  const handleLogin = (email, password) => {
    setIsLoading();
    onUserLogin({ email, password });
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.inputBox, }}>
        <TextInput
          label="nombre del usuario"
          mode="outlined"
          style={{...styles.textInput, backgroundColor:colors.background ,color:colors.text}}
          onChangeText={(text) => handleChange(text, "username")}
          value={login.username}
          textContentType="nickname"
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          label="Contraseña"
          mode="outlined"
          style={{...styles.textInput, backgroundColor:colors.background ,color:colors.text}}
          onChangeText={(text) => handleChange(text, "password")}
          value={login.password}
          textContentType="newPassword"
          secureTextEntry={login.secureTextEntry}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              name={login.secureTextEntry ? "eye" : "eye-off"}
              onPress={() => updateSecureTextEntry()}
            />
          }
        />
      </View>
      <TouchableOpacity
        style={styles.buttonBox}
        onPress={() => handleLogin(login.username, login.password)}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={styles.submitText}>Conectarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.buttonReset}
          onPress={()=>props.navigation.navigate("PasswordRecuperation")}
      >
        <Text style={styles.submitText}>Mot de passe oublie ?!</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.buttonReset}
          onPress={()=>props.navigation.navigate("Inscription")}
      >
        <Text style={styles.submitText}>Vous n'avez pas de compte ?!</Text>
      </TouchableOpacity>


      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredModal}>
          <View style={styles.modal}>
            {isUserLogged ? (
              <View>
                <Text style={{ marginBottom: 10 }}>
                  Vous êtes actuellement connecté
                </Text>
                <Ionicons
                  name="md-checkmark-circle"
                  color="#59ed9c"
                  size={60}
                  style={{ alignSelf: "center" }}
                />
                <TouchableOpacity
                  style={{
                    ...styles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={() => {
                    hideModal(showModal);
                    props.navigation.navigate("Home");
                  }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text>Identifiant ou mot de passe incorrect</Text>
                <Ionicons
                  name="md-warning"
                  color="#ED4337"
                  size={60}
                  style={{ alignSelf: "center" }}
                />
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    hideModal(showModal);
                  }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
      {/*<View style={{marginTop:30}}>*/}
      {/*  <Button title="Retour accueil" color="#FD9854" onPress={() => props.navigation.navigate("Home")}  />*/}
      {/*</View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    marginTop: 20,
    backgroundColor: "#FD9854",
    padding: 5,
    borderRadius: 20,
  },
  buttonReset:{
    marginTop: 20,
    backgroundColor: "#67b4aa",
    padding: 6,
    borderRadius: 20,
  },
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputBox: {
    margin: 10,
    width: "80%",
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  submitText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "white",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const LoginScreen = connect(mapStateToProps, {
  onUserLogin,
  hideModal,
  setIsLoading,
})(_LoginScreen);

export default LoginScreen;
