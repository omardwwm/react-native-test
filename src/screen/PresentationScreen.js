import React from "react";
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import imgDos from "../assets/image/presentation-dos.png";
import {useTheme} from "@react-navigation/native";
import {colors} from "react-native-elements";


const PresentationScreen = (props)=>{
    const user = props.route.params;
    // console.log('imuserfrompresentationscreen', user);
    // console.log(user && user.user.mod6_capabilities);
    const {colors} = useTheme();
    return <View >
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>Presentación</Text>
                <Text style={styles.titleStyle}>Estadisticas de dolor de espalda baja</Text>

                <Image source={imgDos} style={styles.image}/>
                <Text style={{color:colors.text}}>
                    Prevalencia se estima en 60% a 70% en paises industrializados (prevalencia de un año 15% a 45%, incidencia de adultos 5% por año).{"\n"}
                    La prevalencia para niños y adolescentes es menor que en adultos, pero esta aumentado.{"\n"}
                    La prevalencia aumenta y alcenza su punto maximo entre las edades de 35 y 55.4 años.{"\n"}
                    Latinoamerica prevalencia 10.5%.
                </Text>
                <Image
                    source={require('../assets/image/presentation-dos2.png')}
                    style={{width: "95%", height: 290, margin:8}}
                />
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}>
                    Subsistemas de la estabilidad espinal
                </Text>
                <Text style={{color:colors.text}}>
                    ESTABILIZADORES PASIVOS (Vértebras-Fascia-ligamentos).{"\n"}ESTABILIZADORES ACTIVOS (Core muscular : tronco, pelvis y cadera).{"\n"}
                    CONTROL NEURAL (ajuste postural anticipatorio)
                </Text>
                <Image source={require('../assets/image/presentation-dos3.png')}
                       style={{width: '95%', height: 200, margin:8}}
                />
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}>
                    El Core
                </Text>
                <Text style={{color:colors.text}}>Puede ser descrito como una caja muscular con los abdominales – anterior espinales – y – posterior gluteos – , – superior diafragma – y – inferior piso pélvico -. Dentro de esta caja se encuentran 29 pares de musculos.
                </Text>
                <Image source={require('../assets/image/presentation-dos4.png')}
                       style={{width: '95%', height: 280, margin:8}}
                />
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}>
                    Evaluacion
                </Text>
                <Image  source={require('../assets/image/presentation-dos5.png')}
                        style={{width: '95%', height: 300, paddingHorizontal:5, margin:8}}
                />
                <Image  source={require('../assets/image/presentation-dos6.png')}
                        style={{width: '95%', height: 260, marginTop:10}}
                />
            </View>
            {/*{console.log('insiderender', user.user.mod6_capabilities[0].slice(11, 22))}*/}
            {user && user.user.role.slice(0,11) === "um_paciente" || user.user.mod6_capabilities[0].slice(11, 22)==="um_paciente" ? (
                <TouchableOpacity onPress={() => props.navigation.navigate("Phases")} style={styles.btnStyle}>
                    <Text style={styles.textBtn}>Acceder a vos exercices</Text>
                </TouchableOpacity>
            ) : null
            }
        </ScrollView>
    </View>

}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        padding:5,
    },

    image:{
        margin:8,
        width:'70%',
        height:330,
    },
    btnStyle: {
        backgroundColor:"#fd9854",
        margin: 10,
        borderRadius: 15,
    },
    textBtn: {
        fontSize: 20,
        color:"#ffffff",
        textAlign: "center"
    },
    titleStyle: {
        fontWeight:"bold",
        fontSize:22,
        color:"#FD9854",
        marginTop:10
    },
    myTextStyle: {
        fontWeight: "bold",
        color: "#000000",
    }
});

// const mapStateToProps = (state) => ({
//     userReducer: state.userReducer,
// });
//
// const PresentationScreen = connect(mapStateToProps)(
//     _PresentationScreen
// );

export default PresentationScreen;