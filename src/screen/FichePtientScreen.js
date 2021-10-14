import React, {useEffect, useState} from "react";
import {ScrollView, Text, View, Button, StyleSheet, TouchableOpacity, Alert, Modal, Linking} from "react-native";
import { connect } from "react-redux";
import {stopPatient, addPatient, getUserMeta, hideModal, getPatient, setIsLoading} from "../redux";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"; // tu update, change by getPatientFiche function , to create!!
import { Card } from 'react-native-elements'
import {ActivityIndicator} from "react-native-paper";


const _FichePatientScreen = (props)=>{
    const {userReducer, stopPatient, addPatient, getUserMeta, hideModal} = props;
    const {user, userMeta, showModal, isPatientAdded, isPatientStopped } = userReducer;
    const {item} = props.route.params;
    // console.log('itemfromlist', item);
    const paciente_id = item.paciente;
    // console.log(paciente_id);
    // console.log(user);
    // idFisio est l'id du fisio qui suit le patient dont on consulte l'actuelle fiche
    const idFisio = item['id fisio'];
    // fisio_id est l'ID du fisio connecte
    const fisio_id = user.id;
    // console.log(fisio_id);
    useEffect(() => {
        // const paciente_id = item.paciente;
        if (idFisio === fisio_id){
            getUserMeta(paciente_id);
            // console.log('patientsusermetaomar', userMeta);
        }
        if (idFisio!==0 && idFisio !== fisio_id){
            getUserMeta(idFisio);
        }
    }, []);

    const [added, setAdded] = useState(isPatientAdded);
    const [stopped, setStopped] = useState(isPatientStopped);
    // const [Fetching, setFetching] = useState(isFetching);

    const addThisPatientToMyList = ()=>{
        addPatient(paciente_id, fisio_id).then(()=>{setAdded(true)});
    }

    const removePatientFromMyList = ()=>{
        stopPatient(paciente_id, fisio_id).then(()=>{setStopped(true)});
        // getPatient();
    }
    const makeCall = ()=>{
        let phoneNumber =userMeta && userMeta.data.phone_number[0];
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
        } else {
            phoneNumber = `telprompt:${phoneNumber}`;
        }

        Linking.openURL(phoneNumber)
    }

    // console.log('isStopReducer', isPatientStopped);
    // console.log('isAaaReducer', isPatientAdded);
    // console.log('when add', added);
    // console.log('when stop is', stopped)
    return (
        <View style={styles.itemDetails}>
            <ScrollView>
                <View style={styles.itemDetailsContent}>
                    <Card>
                        <Card.Title>Privé : Fiche de la phase :  {item['phase du relevé']}{"\n"}Patient : {item.name}</Card.Title>
                    </Card>
                    <Card>
                        <Card.Title>Detail de la phase</Card.Title>
                        <Text>Validée le : {item.date}</Text>
                        <Text>Sexe : {item.sexe}</Text>
                        <Text>Age : {item['âge']}</Text>
                        {item.escala_dolor?(<Text>Escala dolor : {item.escala_dolor}</Text>):
                            (<Text>Escala dolor : {item['escala dolor']}</Text>)
                        }
                        <Text>Estar de pie : {item['Estar de pie']}</Text>
                        <Text>Intensidad de dolor : {item['Intensidad de dolor']}</Text>
                        <Text>Dormir : {item.Dormir}</Text>
                        <Text>Levantar peso : {item['Levantar peso']}</Text>
                        <Text>Actividad sexual : {item['Actividad sexual']}</Text>
                        <Text>Andar : {item.Andar}</Text>
                        <Text>Vida social : {item['Vida social']}</Text>
                        <Text>Estar sentado : {item['Estar sentado']}</Text>
                        <Text>Viajar : {item.Viajar}</Text>
                        <Text>Indice : {item.indice}</Text>
                    </Card>

                    <View  >
                        {idFisio===0 ?
                            (
                                <TouchableOpacity style={styles.btnAddStop}>
                                    <Text onPress={addThisPatientToMyList} style={styles.btnText}>Suivre ce patient</Text>
                                </TouchableOpacity>
                            ) :
                            (idFisio===user.id ?
                                (
                                    userMeta && userMeta.email && userMeta.data && userMeta.data.phone_number ?
                                            <>
                                                <Card>
                                                    <Card.Title>Contacter votre patient</Card.Title>
                                                    {/*<Text style={{justifyContent: 'center', textAlign:'center', margin: 16}}>Contacter votre patient : </Text>*/}
                                                    <TouchableOpacity onPress={()=> Linking.openURL(`mailto:${userMeta.email}`)} style={{...styles.btnAddStop, backgroundColor:'#8fe2b3'}}>
                                                        <Text style={{ fontWeight: 'bold', textAlign: 'center', padding:3}}>Write{' '}
                                                            <MaterialCommunityIcons name="email-edit-outline" size={20} color="#ffffff" /> {userMeta && userMeta.email}
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={makeCall} style={{...styles.btnAddStop, backgroundColor:'#8fe2b3'}}>
                                                        <Text style={{fontWeight: 'bold', textAlign: 'center', padding:3}}>Call{' '}
                                                            <Ionicons name="phone-portrait-outline" color="#ffffff" size={20} style={{ alignSelf: "center" }}/>
                                                            {userMeta.data.phone_number[0]}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {/*<Text style={{backgroundColor:"#66983a", marginBottom:8}}>Vous suivez deja ce patient</Text>*/}
                                                    <TouchableOpacity style={{...styles.btnAddStop, marginVertical:20}}>
                                                        <Text onPress={removePatientFromMyList} style={styles.btnText}>Arreter de suivre ce patient</Text>
                                                    </TouchableOpacity>
                                                </Card>
                                            </>:
                                                (
                                                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                                        <ActivityIndicator size="large" color="#FD9854"/>
                                                    </View>
                                                )

                                ) :
                                (
                                    userMeta && userMeta.data && userMeta.data.full_name ?
                                        (<Card>
                                            <Card.Title>Son physio</Card.Title>
                                            <Text style={{... styles.btnText}}>Ce patient est suivi par le Dr : {userMeta && userMeta.data.full_name[0]}</Text>
                                            <TouchableOpacity onPress={()=> Linking.openURL(`mailto:${userMeta.email}`)}
                                                              style={styles.contactStyle}>
                                                <Text style={{fontWeight: 'bold'}}>Write{' '}
                                                    <MaterialCommunityIcons name="email-edit-outline" size={20} color="black" />  {userMeta.email}
                                                </Text>
                                            </TouchableOpacity>
                                        </Card>):
                                        (
                                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                                <ActivityIndicator size="large" color="#FD9854"/>
                                            </View>
                                        )
                                )
                            )
                        }
                    </View>
                </View>
            </ScrollView>
            <Modal animationType="slide" transparent={true} visible={showModal}>
                <View style={styles.centeredModal}>
                    <View style={styles.modal}>
                        <View>
                            {added===true?
                                <Text style={{ marginBottom: 10 }}>
                                    vous suivez maintenant ce patient
                                </Text>:
                                stopped===true?
                                    <Text style={{ marginBottom: 10 }}>
                                        vous avez arreté de suivre ce patient !!
                                    </Text>:
                                    (<Text>TESTTTTT</Text>)
                            }
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
                                            props.navigation.navigate("MyPatients");
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Ok</Text>
                                    </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemDetails:{
        marginHorizontal: 5,
        marginVertical:6,
        borderRadius:6,
        backgroundColor:"#8fe2b3",
        shadowOffset: {width: 5, height:5},
        shadowColor:'#000',
        shadowRadius:3,
        shadowOpacity:0.4
    },
    itemDetailsContent:{
        marginHorizontal: 10,
        marginVertical: 15,
        padding:8,
    },
    btnAddStop:{
        marginVertical:12,
        alignItems:"center",
        borderRadius: 8,
    },
    btnText:{
        textAlign:"center",
        backgroundColor:"#FD9854",
        padding: 6,
        borderRadius:6
    },
    centeredModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    contactStyle: { width: '85%', padding: 5, backgroundColor: '#8fe2b3', borderRadius: 8, alignItems: 'center', marginVertical:12}
})

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const FichePatientScreen = connect(mapStateToProps, { getUserMeta, stopPatient, addPatient, hideModal, getPatient, setIsLoading })(_FichePatientScreen);

export default FichePatientScreen;