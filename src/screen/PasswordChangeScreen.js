import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import { connect } from "react-redux";
import { onUserLogin, hideModal, changePassword } from "../redux";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, TextInput, Portal } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import {useTheme} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

const _PasswordChangeScreen = (props) => {
  const { userReducer, changePassword } = props;
  const { user } = userReducer;
  const {colors} = useTheme();
  const [passwordForm, setPasswordForm] = useState({
    isPasswordFieldOn: false,
    password: "",
    passwordConfirm: "",
    secureTextEntry: false,
    isValidPassword: true,
    isValidPasswordConfirm: true,
    secondSecureTextEntry: false,
    // showModal: false,
  });
  const [showModal, setShowModal] = useState(false)
  const updateSecureTextEntry = () => {
    setPasswordForm({
      ...passwordForm,
      secureTextEntry: !passwordForm.secureTextEntry,
    });
  };

  const updateSecondSecureTextEntry = () => {
    setPasswordForm({
      ...passwordForm,
      secondSecureTextEntry: !passwordForm.secondSecureTextEntry,
    });
  };

  const handleValidData = (value, field) => {
    if (field === "password") {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        setPasswordForm({
          ...passwordForm,
          isValidPassword: false,
        });
      } else {
        setPasswordForm({
          ...passwordForm,
          isValidPassword: true,
        });
      }
    }

    if (field === "passwordConfirm") {
      if (passwordForm.password !== value) {
        setPasswordForm({
          ...passwordForm,
          isValidPasswordConfirm: false,
        });
      } else {
        setPasswordForm({
          ...passwordForm,
          isValidPasswordConfirm: true,
        });
      }
    }
  };

  const handleChange = (value, stateName) => {
    setPasswordForm({
      ...passwordForm,
      [stateName]: value,
    });
  };

  const handleSubmit = () => {
    if (
      passwordForm.password.length === 0 ||
      passwordForm.passwordConfirm.length === 0
    ) {
      Alert.alert("Warning", "Tous les champs doivent être rempli");
      return;
    }

    if (passwordForm.isValidPassword && passwordForm.isValidPasswordConfirm) {
      changePassword(passwordForm.password, user).then(()=>{setShowModal(true)});
    } else {
      setPasswordForm({
        ...passwordForm,
        password: "",
        passwordConfirm: "",
      });
      Alert.alert("Certains champs ne sont pas valide");
    }
  };
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            label="Contraseña"
            mode="outlined"
            style={{...styles.TextInput, backgroundColor:colors.background, color:colors.text}}
            onChangeText={(text) => handleChange(text, "password")}
            onEndEditing={(e) =>
              handleValidData(e.nativeEvent.text, "password")
            }
            value={passwordForm.password}
            textContentType="password"
            secureTextEntry={passwordForm.secureTextEntry}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                name={passwordForm.secureTextEntry ? "eye" : "eye-off"}
                onPress={() => updateSecureTextEntry()}
              />
            }
          />
          {passwordForm.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Su contraseña debe tener al menos una mayúscula, una minúscula y
                un número
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.inputBox}>
          <TextInput
            label="Confirmar la contraseña"
            mode="outlined"
            style={{...styles.TextInput, backgroundColor:colors.background, color:colors.text}}
            onChangeText={(text) => handleChange(text, "passwordConfirm")}
            onEndEditing={(e) =>
              handleValidData(e.nativeEvent.text, "passwordConfirm")
            }
            value={passwordForm.passwordConfirm}
            textContentType="newPassword"
            secureTextEntry={passwordForm.secondSecureTextEntry}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                name={passwordForm.secondSecureTextEntry ? "eye" : "eye-off"}
                onPress={() => updateSecondSecureTextEntry()}
              />
            }
          />
          {passwordForm.isValidPasswordConfirm ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Sus contraseñas no son iguales
              </Text>
            </Animatable.View>
          )}
        </View>
        <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => handleSubmit()}
          activeOpacity={0.8}
        >
          <Text style={styles.submitText}>Changer le mot de passe</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  style={styles.buttonBox}*/}
        {/*  onPress={() => props.navigation.navigate("Profile")}*/}
        {/*  activeOpacity={0.8}*/}
        {/*>*/}
        {/*  <Text style={styles.submitText}>Retourner sur le profile</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredModal}>
          <View style={styles.modal}>
            <View>
                  <Text style={{ marginBottom: 10 }}>
                    PassWord changed !
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
                    props.navigation.navigate("Profile");
                  }}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>


  );
};

const styles = StyleSheet.create({
  buttonBox: {
    marginTop: 20,
    backgroundColor: "#FD9854",
    padding: 10,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "crimson",
    fontWeight: "bold",
  },
  inputBox: {
    margin: 10,
    width: "80%",
  },
  modal: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    padding: 35,
    borderRadius: 20,
  },
  profileBox: {
    marginTop: 30,
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  scrollContainer: {
    width: "100%",
    flex: 1,
  },
  submitText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
  username: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const PasswordChangeScreen = connect(mapStateToProps, {
  onUserLogin,
  hideModal,
  changePassword,
})(_PasswordChangeScreen);

export default PasswordChangeScreen;
