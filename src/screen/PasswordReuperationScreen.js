import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Modal } from "react-native-paper";
import {checkEmail, checkUsername} from "../redux";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";


const _PasswordRecuperationScreen = (props) => {
    const {checkEmail} = props

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
    }

    const [form, setForm] = useState({
        email: "",
        isValidEmail:true,
    });


    const handleChange = (value, stateName) => {
        setForm({
            ...form,
            [stateName]: value,
        });
    };

    const handleSubmit =()=>{
        console.log("function reset password test");
    }
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <Text style={{textAlign:"center", marginTop:10}}>Restablecer la contraseña</Text>
                    <Text style={{marginTop:20}}>Pour réinitialiser votre mot de passe, veuillez saisir votre adresse de messagerie ou votre identifiant ci-dessous</Text>
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
                    <TouchableOpacity
                        // disabled={!form.isValidEmail}
                        style={styles.buttonResetEmail}
                        onPress={() => handleSubmit()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.textResetEmail}>Restablecer la contraseña</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    inputBox: {
        margin: 10,
        width: "80%",
    },
    textInput: {
        backgroundColor: "white",
        marginTop: 10,
    },
    errorMessage: {
        fontSize: 16,
        textAlign: "center",
        color: "crimson",
        fontWeight: "bold",
    },
    buttonResetEmail:{
        backgroundColor: "#e89746",
        borderRadius:20,
        padding:10,
        marginTop: 20,
    },
    textResetEmail:{
        fontSize: 16,
        textAlign: "center",
        color: "#f9fcf8",
        fontWeight: "bold",
    }
})

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});

const PasswordRecuperationScreen = connect(mapStateToProps, {
    checkEmail,
})(_PasswordRecuperationScreen);

export default PasswordRecuperationScreen;
