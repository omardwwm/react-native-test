import React, { useState } from "react";
import Conditions from "./ConditionsModalScreen";
import {Alert, Modal, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, TouchableHighlight} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import {RadioButton, TextInput, List, Switch} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";
import {userRegister, hideRegisterModal, checkEmail, checkUsername, setIsLoading, hideModal} from "../redux";
import { Ionicons } from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";
import {colors} from "react-native-elements";


const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
};

const _RegisterScreen = (props) => {
  const {colors} = useTheme();
  const {
    userRegister,
    userReducer,
    hideRegisterModal,
    checkEmail,
    checkUsername,
    setIsLoading,
  } = props;
  const {
    isLoading,
    isUserCreated,
    showRegisterModal,
    error,
    isEmailAvailable,
    isUsernameAvailable,
  } = userReducer;
  const [form, setForm] = useState({
    username: "",
    isValidUsername: true,
    phoneNumber: "",
    isValidPhoneNumber: true,
    email: "",
    isValidEmail: true,
    name: "",
    isValidName: true,
    lastname: "",
    isValidLastname: true,
    password: "",
    isValidPassword: true,
    passwordConfirm: "",
    isValidPasswordConfirm: true,
    secureTextEntry: true,
    secondSecureTextEntry: true,
    dateOfBirthString: new Date().toLocaleDateString(),
    dateOfBirth: new Date(),
    dateOfBirthToSend: formatDate(new Date()),
    showDateForm: false,
    showAlertModal: false,
    alertModalMessage: "",
    gender: "",
    isValidGender: false,
  });

  const handleChange = (value, stateName) => {
    setForm({
      ...form,
      [stateName]: value,
    });
  };

  const handleDateChange = (event, date) => {
    if (date === undefined) {
      return;
    }
    setForm({
      ...form,
      dateOfBirth: date,
      dateOfBirthString: date.toLocaleDateString(),
      dateOfBirthToSend: formatDate(date),
      showDateForm: false,
    });
  };

  const handleSubmit = () => {
    if (form.dateOfBirthToSend === null) {
      console.log("faut choisir une date a ajouter!!");
      setTodayDate();
    }
    console.log(form);
    if (
        form.email.length === 0 ||
        form.lastname.length === 0 ||
        form.name.length === 0 ||
        form.password.length === 0 ||
        form.passwordConfirm.length === 0 ||
        form.phoneNumber.length === 0 ||
        form.username.length === 0 ||
        form.gender.length === 0
    ) {
      setForm({
        ...form,
        alertModalMessage: "Tous les champs doivent être rempli",
        showAlertModal: true,
      });
      return;
    }
    if (
        form.isValidEmail &&
        form.isValidLastname &&
        form.isValidName &&
        form.isValidPassword &&
        form.isValidPasswordConfirm &&
        form.isValidPhoneNumber &&
        form.isValidUsername &&
        form.isValidGender
    ) {
      setIsLoading();
      userRegister(form);
    } else {
      setForm({
        ...form,
        alertModalMessage: "Certains champs ne sont pas valide",
        showAlertModal: true,
      });
    }
  };

  const handleValidData = (value, field) => {
    if (field === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setForm({
          ...form,
          isValidEmail: false,
        });
      } else {
        setForm({
          ...form,
          isValidEmail: true,
        });
      }
    }

    if (field === "username") {
      if (value.length > 16 || value.length < 6) {
        setForm({
          ...form,
          isValidUsername: false,
        });
      } else {
        setForm({
          ...form,
          isValidUsername: true,
        });
      }
    }

    if (field === "name") {
      if (value.length === 0) {
        setForm({
          ...form,
          isValidName: false,
        });
      } else {
        setForm({
          ...form,
          isValidName: true,
        });
      }
    }

    if (field === "lastname") {
      if (value.length === 0) {
        setForm({
          ...form,
          isValidLastname: false,
        });
      } else {
        setForm({
          ...form,
          isValidLastname: true,
        });
      }
    }

    if (field === "gender") {
      if (value.length === 0){
        setForm({
          ...form,
          isValidGender: false
        });
      }else {
        setForm({
          ...form,
          isValidGender: true
        });
      }
    }

    if (field === "phoneNumber") {
      if (!/^(0|57)(\d{9,9})$/.test(value)) {
        setForm({
          ...form,
          isValidPhoneNumber: false,
        });
      } else {
        setForm({
          ...form,
          isValidPhoneNumber: true,
        });
      }
    }

    if (field === "password") {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        setForm({
          ...form,
          isValidPassword: false,
        });
      } else {
        setForm({
          ...form,
          isValidPassword: true,
        });
      }
    }

    if (field === "passwordConfirm") {
      if (form.password !== value) {
        setForm({
          ...form,
          isValidPasswordConfirm: false,
        });
      } else {
        setForm({
          ...form,
          isValidPasswordConfirm: true,
        });
      }
    }
  };
  const showDate = () => {
    setForm({
      ...form,
      showDateForm: true,
    });
  };

  const toggleAlertModal = () => {
    setForm({
      ...form,
      showAlertModal: !form.showAlertModal,
    });
  };
  const updateSecureTextEntry = () => {
    setForm({
      ...form,
      secureTextEntry: !form.secureTextEntry,
    });
  };

  const updateSecondSecureTextEntry = () => {
    setForm({
      ...form,
      secondSecureTextEntry: !form.secondSecureTextEntry,
    });
  };


  const [checked, setChecked] = useState('');

  const [isCheckedConditions, setCheckedConditions] = useState(false);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            label="Nombre del usuario"
            mode="outlined"
            style={styles.textInput}
            onChangeText={(text) => handleChange(text, "username")}
            onEndEditing={(e) => {
              handleValidData(e.nativeEvent.text, "username");
              checkUsername(e.nativeEvent.text);
            }}
            value={form.username}
            textContentType="username"
            error={!form.isValidUsername}
          />
          {form.isValidUsername ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Su nombre de usuario debe tener al menos 6 caracteres y hasta 16
                caracteres
              </Text>
            </Animatable.View>
          )}
          {isUsernameAvailable ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Ce nom d'utilisateur est déjà utilisé
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.inputBox}>
          <TextInput
            label="Nombre "
            mode="outlined"
            style={styles.textInput}
            onChangeText={(text) => handleChange(text, "name")}
            onEndEditing={(e) => handleValidData(e.nativeEvent.text, "name")}
            value={form.name}
            textContentType="name"
            error={!form.isValidName}
          />
          {form.isValidName ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Este campo no puede estar vacío
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.inputBox}>
          <TextInput
            mode="outlined"
            label="Apellido "
            style={styles.textInput}
            onChangeText={(text) => handleChange(text, "lastname")}
            onEndEditing={(e) =>
              handleValidData(e.nativeEvent.text, "lastname")
            }
            value={form.lastname}
            textContentType="familyName"
            error={!form.isValidLastname}
          />
          {form.isValidLastname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Este campo no puede estar vacío
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.inputBox}>
          <TextInput
            mode="outlined"
            label="Número de teléfono"
            style={styles.textInput}
            onChangeText={(text) => handleChange(text, "phoneNumber")}
            onEndEditing={(e) =>
              handleValidData(e.nativeEvent.text, "phoneNumber")
            }
            value={form.phoneNumber}
            textContentType="telephoneNumber"
            error={!form.isValidPhoneNumber}
          />
          {form.isValidPhoneNumber ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                No es un número de teléfono valido
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.inputBox}>
          <TextInput
            label="E-mail"
            mode="outlined"
            style={styles.textInput}
            onChangeText={(text) => handleChange(text, "email")}
            onEndEditing={(e) => {
              handleValidData(e.nativeEvent.text, "email");
              checkEmail(e.nativeEvent.text);
            }}
            value={form.email}
            textContentType="emailAddress"
            autoCapitalize="none"
            error={!form.isValidEmail}
          />
          {form.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>No es un Email valido</Text>
            </Animatable.View>
          )}
          {isEmailAvailable ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Cet email est déjà utilisé
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.inputBox}>
          <TextInput
            label="Contraseña "
            mode="outlined"
            style={styles.textInput}
            onChangeText={(text) => handleChange(text, "password")}
            onEndEditing={(e) =>
              handleValidData(e.nativeEvent.text, "password")
            }
            value={form.password}
            textContentType="newPassword"
            secureTextEntry={form.secureTextEntry}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                name={form.secureTextEntry ? "eye" : "eye-off"}
                onPress={() => updateSecureTextEntry()}
              />
            }
          />
          {form.isValidPassword ? null : (
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
            style={styles.textInput}
            onChangeText={(text) => handleChange(text, "passwordConfirm")}
            onEndEditing={(e) =>
              handleValidData(e.nativeEvent.text, "passwordConfirm")
            }
            value={form.passwordConfirm}
            textContentType="newPassword"
            secureTextEntry={form.secondSecureTextEntry}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                name={form.secondSecureTextEntry ? "eye" : "eye-off"}
                onPress={() => updateSecondSecureTextEntry()}
              />
            }
          />
          {form.isValidPasswordConfirm ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMessage}>
                Sus contraseñas no son iguales
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={{flexDirection:"row", backgroundColor:colors.background,}}>
          <RadioButton
            value={form.gender}
            status={checked === 'Femme' ? 'checked' : 'unChecked'}
            onPress={()=>setChecked('Femme',
                setForm({
                  ...form,
                  gender: "Femme",
                  isValidGender: true
                }))}
            // error={!form.isValidGender}
           />
           <Text style={{color:colors.text}}>Femme</Text>
          <RadioButton
              value={form.gender}
              status={checked === 'Homme' ? 'checked' : 'unChecked'}
              onPress={()=>setChecked('Homme',
                  setForm({
                    ...form,
                    gender: "Homme",
                    isValidGender: true
                  })
                  )}
              // error={!form.isValidGender}
          />
          <Text style={{color:colors.text}}>Homme</Text>
        </View>
        <View>
          {form.isValidGender ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMessage}>
                  Vous devez cocher votre sexe !
                </Text>
              </Animatable.View>
          )}
        </View>

        <View
          style={[
            styles.inputBox,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            },
          ]}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15, color:colors.text }}>
            Fecha de nacimiento :
          </Text>
          <TouchableOpacity style={styles.buttonBox} onPress={() => showDate()}>
            <Text style={styles.submitText}>{form.dateOfBirthString}</Text>
          </TouchableOpacity>
        </View>
        {form.showDateForm && (
          <DateTimePicker
            value={form.dateOfBirth}
            onChange={(event, date) => handleDateChange(event, date)}
            display="spinner"
            maximumDate={new Date()}
          />
        )}
        <Conditions/>

        <View style={{ flexDirection: 'row' }}>
          <CheckBox
              disabled={false}
              value={isCheckedConditions}
              onValueChange={setCheckedConditions}
              tintColors={{true: colors.text, false: colors.text}}
          />
          <Text style={{marginTop: 5, textAlign:"center", color:colors.text}}>Veuillez confirmer que vous acceptez notre politique{"\n"}de confidentialité</Text>
        </View>
        <TouchableOpacity disabled={!isCheckedConditions}
          style={isCheckedConditions? styles.submitButton : {...styles.submitButton, opacity:0.5}}
          onPress={() => handleSubmit()}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={{...styles.submitText, color:colors.text}}>Inscribirse</Text>
          )}
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showRegisterModal}
        >
          <View style={styles.centeredModal}>
            <View style={styles.modal}>
              {isUserCreated ? (
                <View>
                  <Text style={{ marginBottom: 10 }}>
                    Votre compte à bien été créé
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
                      hideRegisterModal(showRegisterModal);
                      props.navigation.navigate("Login");
                    }}
                  >
                    <Text style={styles.textStyle}>Ok</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {error.hasOwnProperty("login") ? (
                    <Text>Ce nom d'utilisateur est déjà utilisé</Text>
                  ) : error.hasOwnProperty("user_email") ? (
                    <Text>Cet email est déjà utilisé</Text>
                  ) : (
                    <Text>Un problème à été rencontré</Text>
                  )}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={form.showAlertModal}
        >
          <View style={styles.centeredModal}>
            <View style={styles.modal}>
              <View>
                <Text>{form.alertModalMessage}</Text>
                <Ionicons
                  name="md-warning"
                  color="#ED4337"
                  size={60}
                  style={{ alignSelf: "center" }}
                />
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    toggleAlertModal();
                  }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  dateBox: {
    width: "80%",
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
  scrollContainer: {
    width: "100%",
    flex: 1,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#8fe2b3",
    padding: 10,
    borderRadius: 20,
    marginBottom: 100,
  },
  submitText: {
    backgroundColor:colors.background,
    textAlign: "center",
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    // backgroundColor: colors.background,
    marginTop: 10,
  },
  textStyle: {
    color: colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const RegisterScreen = connect(mapStateToProps, {
  userRegister,
  hideRegisterModal,
  checkEmail,
  checkUsername,
  setIsLoading,
})(_RegisterScreen);

export default RegisterScreen;
