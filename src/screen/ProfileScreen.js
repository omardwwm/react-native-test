import React, {useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { connect } from "react-redux";
import { onUserLogin, hideModal, getUserMeta, getPatient } from "../redux";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import { Card } from 'react-native-elements';
import {useTheme} from "@react-navigation/native";
// import {colors} from "react-native-elements";

const _ProfileScreen = (props) => {
  const { userReducer, getUserMeta, getPatient } = props;
  const { user, userMeta, patients } = userReducer;

  if (user === null) {
    return null;
  }
  const {colors} = useTheme();
  const role = user && user.role;
  // let userId = user.id
  // console.log('userProfile', user);
  // console.log(patients);

    // const myPhysioId = currentUser && currentUser['id fisio'];
    const myKine = user && user.juiz_list_fisio && user.juiz_list_fisio[0];
    // console.log('im your kine now', myKine);
    // console.log('his ID is : ', myPhysioId);
    useEffect(()=>{
      // console.log('id inside useeffet', myPhysioId);
      if (myKine && myKine !== 0){
        getUserMeta(myKine)
      }
      if ( role === "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 28) === "um_fisioterapeuta"){
        let idPhysio = user && user.id
        getUserMeta(idPhysio);
        // console.log('userDetailMetaIsThisokkk', userMeta.data)
      }
    }, [user])
  // if (userMeta){
  //   console.log('les donnes de kinee: ', userMeta);
  // }
  const makeCall = ()=>{
    let phoneNumber = userMeta && userMeta.data.phone_number[0];
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber)
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={{...styles.profileBox, borderBottomColor:colors.text}}>
          {role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente" ?
              (
                  (user && user.gender[0].slice(14, -3) === "Femme" || user && user.gender[0] === "Femme")?
                  (<Avatar.Image
                      source={require("../assets/image/woman-avatar.png")}
                      size={120}
                      style={{
                        marginRight: 10,
                        backgroundColor: "gold",
                      }}
                    />): <Avatar.Image
                            source={require("../assets/image/man-avatar.png")}
                            size={150}
                            style={{
                              marginRight: 10,
                              backgroundColor: "gold",
                            }}
                          />
                )
              : null}
          <Text style={{...styles.username, color:colors.text}}>{user && user.nickname}</Text>
        </View>
        <Animatable.View animation="bounceInLeft" duration={500}>
          <Card>
            <Card.Title>Mes infos</Card.Title>
            {user && <Text>Firstname : {user.first_name}</Text>}
            {user && <Text>Lastname : {user.last_name}</Text>}
            {(role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente") && user.mod6_capabilities[0].slice(29, 30)<=5 ?
                (<Text>Numero de phase : {user.mod6_capabilities[0].slice(29, 30)}</Text>):
                (
                    (role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente")?
                    <Text>Numero de phase: Vous avez effectué toutes les phases</Text>:
                        null
                )
            }

            {(role && role === "um_paciente" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente") &&  <Text>Mon tel : {user.phone_number}</Text>}
            {user && user.email && <Text>Email : {user.email}</Text>}
            {/*{ (role === "um_fisioterapeuta" || user.mod6_capabilities[0].slice(11, 28) === "um_fisioterapeuta") && userMeta && <Text>Email : {userMeta.email}</Text> }*/}
            { (role === "um_fisioterapeuta" || user.mod6_capabilities[0].slice(11, 28) === "um_fisioterapeuta") && user && (user.phone_number ?
                <Text>Tel : {user.phone_number[0]}</Text> : <Text>Tel : Vous n'avez pas communique de numero</Text>)
            }
          </Card>

          {(role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente") ? (
              (myKine && myKine !== 0 ? (
                      <>
                        <Card>
                          <Card.Title>Mon physio</Card.Title>
                          <View style={{alignItems: 'center', justifyContent:'center'}}>
                            <Text>le Dr : {userMeta && userMeta.data.first_name} {userMeta && userMeta.data.last_name}</Text>
                            {userMeta && userMeta.email ? (
                                    <TouchableOpacity onPress={()=> Linking.openURL(`mailto:${userMeta.email}`)}
                                                      style={styles.contactStyle}
                                    >
                                      <Text style={{fontWeight: 'bold'}}>Send{' '}
                                        <MaterialCommunityIcons name="email-edit-outline" size={20} color="black" />  {userMeta.email}
                                      </Text>
                                    </TouchableOpacity>
                                ):
                                (<Text>Le physio n'a pas communique son Email</Text>)
                            }
                            {userMeta && userMeta.data.phone_number ? (
                                    <TouchableOpacity onPress={makeCall} style={styles.contactStyle}>
                                      <Text>Call
                                        <Ionicons name="phone-portrait-outline" color="#000000" size={20} style={{ alignSelf: "center"}}/>
                                        {userMeta && userMeta.data.phone_number[0]}
                                      </Text>
                                    </TouchableOpacity>
                                ):
                                (<Text><Ionicons name="phone-portrait-outline" color="#000000" size={20} style={{ alignSelf: "center"}}/>Le physio n'a pas communique de numero</Text>)
                            }
                          </View>
                        </Card>
                      </>
                  )
                  :(
                      <>
                        <View >
                          <Card>
                            <Card.Title>Mon physio</Card.Title>
                            <Text>Vous n'etes pas suivi, vous n'avez pas de physio traitant</Text>
                            <Text>Contacter le Dr resposable du protocole :  </Text>
                            <TouchableOpacity onPress={()=> Linking.openURL('mailto:andrea@fake.me')}
                                              style={styles.contactStyle}
                            >
                              <Text style={{fontWeight: 'bold'}}>Send{' '}
                                <MaterialCommunityIcons name="email-edit-outline" size={20} color="black" />{'  '}andrea@fake.me
                              </Text>
                            </TouchableOpacity>
                          </Card>
                        </View>
                      </>
                  ))
              ):
              null
          }

          <TouchableOpacity
            style={{...styles.buttonBox, marginVertical:48}}
            onPress={() => props.navigation.navigate("PasswordChange")}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>Changer de mot de passe</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    marginHorizontal: 20,
    backgroundColor: "#FD9854",
    padding: 5,
    borderRadius: 10,
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
  // modal: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  profileBox: {
    marginTop: 30,
    borderBottomWidth: 4,
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
  contactStyle: { width: '85%', padding: 5, backgroundColor: '#87e3b4', borderRadius: 8, alignItems: 'center', marginVertical:12

  }
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const ProfileScreen = connect(mapStateToProps, { getUserMeta })(_ProfileScreen);

export default ProfileScreen;
