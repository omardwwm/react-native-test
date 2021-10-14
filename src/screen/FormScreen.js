import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import {getForm, hideFormModal, sendFormData, setIsLoading} from "../redux";
import { connect } from "react-redux";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import moment from 'moment';
import CountDown from "react-native-countdown-component";
import { Card } from 'react-native-elements';
import {useTheme} from "@react-navigation/native";


const { width } = Dimensions.get("window");
const _FormScreen = (props) => {
  const {userReducer, getForm, sendFormData, setIsLoading, hideFormModal,
    } = props;
  const {form, user, isFormLoading, showFormModal, isLoading, formError
  } = userReducer;

  const {colors} = useTheme();
  useEffect(() => {
    getForm(user);
  }, [user]);

  const [checked, setChecked] = useState({
    form: {},
    showModal: false,
    modalText: "",
    errorForm: true,
  });

  const [viewLayout, setViewLayout] = useState([]);
  const [viewNumber, setViewNumber] = useState(0);

  const scrollRef = useRef();

  const handleNav = (number, step = null) => {
    if (step === "last") number = number - 2;
    scrollRef.current.scrollTo({
      x: viewLayout[number] - 10,
      animated: true,
    });
  };
//le 14/03/2021 le formulire a change depuis le back, deux formats deferents recuperes ds la mm requete, obligation de chager form par myForm;
  let myForm = form && form.data ? form.data : form;
  // console.log('yourOwnForm', myForm);

  const handleSubmit = () => {
    console.log(checked.form);
    if (
        Object.keys(checked.form).length !==
        Object.keys(myForm.json_survey.pages && myForm.json_survey.pages[0].elements).length
    ) {
      setChecked({
        ...checked,
        showModal: true,
        errorForm: true,
      });
    } else {
      setIsLoading();
      sendFormData(user, checked.form);
    }
  };
  const toggleModal = () => {
    hideFormModal(showFormModal);
    props.navigation.navigate("Phases");
  };
  /*
  if (true) {
    return (
      <View>
        <Button title="debug" onPress={() => console.log(form)} />
      </View>
    );
  }*/
  if (user && user.mod6_capabilities[0].slice(29, 30) >5){
    return (
        <View style={{justifyContent:'center', alignItems:'center', textAlign:'center', margin:10 }}>
          <Card>
            <Card.Title>Infos</Card.Title>
            <Text>
              Vous semblez finir votre proocole et vous n'avez pas de formulaire a remplir.
            </Text>
              <Text style={{marginTop:10}}>
                Pour la suite de vos soins, veuillez contacter votre physio depuis{'  '}
                <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')} style={{backgroundColor:"#8fe2b3", padding:4, borderRadius:5}}>
                  <Text>
                    <MaterialCommunityIcons name="cursor-default-click" size={20} color="black" />
                    votre espace personnel
                  </Text>
                </TouchableOpacity>
              </Text>
          </Card>
        </View>
    );

  }

  if (form !== null) {

    return (
        <View style={{ flex: 1 }}>

          <View
              style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{...styles.title, fontSize: 16, marginBottom:5, color:colors.text}}>
              Temps restant avant la prochaine phase :
            </Text>
            {user && user.mod6_capabilities[0].slice(29, 30) >=0 && user.mod6_capabilities[0].slice(29, 30)<6 ?
                (<CountDown
                    until={parseInt
                    (moment(myForm && myForm.date) - moment(new Date())) / 1000
                    }
                    size={16}
                    timeLabelStyle={{color: colors.text}}
                />):
                (
                    <>
                      <View style={{justifyContent:'center', alignItems:'center', textAlign:'center', margin:10 }}>
                        <Card>
                          <Card.Title>Infos</Card.Title>
                          <Text>
                            Vous semblez finir votre proocole et vous n'avez pas de formulaire a remplir.
                          </Text>
                          <Text style={{marginTop:10}}>
                            Pour la suite de vos soins, veuillez contacter votre physio depuis{'  '}
                            <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')} style={{backgroundColor:"#8fe2b3", padding:4, borderRadius:5}}>
                              <Text>
                                <MaterialCommunityIcons name="cursor-default-click" size={20} color="black" />
                                votre espace personnel
                              </Text>
                            </TouchableOpacity>
                          </Text>
                        </Card>
                      </View>
                    </>
                )
            }

          </View>

          <ScrollView
              horizontal
              decelerationRate={0}
              snapToInterval={width}
              snapToAlignment={"center"}
              ref={scrollRef}
              contentContainerStyle={{ marginBottom: 10 }}
              showsHorizontalScrollIndicator={false}
          >
            {myForm && myForm.json_survey.pages[0].elements.map((current, index) => {
              if (current.type === "rating") {
                const rating = [];
                for (
                    let index = current.rateMin;
                    index <= current.rateMax;
                    index++
                ) {
                  rating.push(
                      <View
                          key={index}
                          style={{
                            flexDirection: "row", flexWrap: 'wrap', height: "5%", alignItems: "center", marginBottom: 20, marginLeft:10
                          }}
                      >
                        <RadioButton
                            value={parseInt(index)}
                            status={
                              checked.form[current.name] === parseInt(index)
                                  ? "checked"
                                  : "unchecked"
                            }
                        />
                        <Text style={{marginRight:60, color:colors.text}}>{index}</Text>
                      </View>
                  );
                }
                return (
                    <View key={index}>
                      <Text style={{ ...styles.title, marginTop: 10, color:colors.text }}>
                        {current.title}
                      </Text>
                      <View
                          key={current.name}
                          style={{
                            ...styles.view,
                            flexWrap: "wrap",
                            marginTop: 0,
                            flexDirection: "row",
                            marginLeft:20,
                            width:width-35
                          }}
                          onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            setViewLayout([...viewLayout, layout.x]);
                          }}
                      >
                        <RadioButton.Group
                            onValueChange={(value) => {
                              setChecked({
                                ...checked,
                                form: {
                                  ...checked.form,
                                  [current.name]: value,
                                },
                              });
                            }}
                        >
                          {rating}
                        </RadioButton.Group>
                        <View style={{flexDirection: "row"}}>
                          <Image source={require('../assets/image/escala_dolor.png')} style={{width:150, height: "100%"}}/>
                        </View>
                      </View>
                      <View>
                        {index == 0 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index, "last")}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  left: 0,
                                }}
                            >
                              <Text style={styles.textStyle}>&#x3C;</Text>
                            </TouchableOpacity>
                        )}
                        {index === myForm.json_survey.pages[0].elements.length - 1 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index + 1)}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  right: 10,
                                }}
                            >
                              <Text style={styles.textStyle}>&gt;</Text>
                            </TouchableOpacity>
                        )}
                      </View>
                    </View>
                );
              }
              if (current.type === "radiogroup") {
                return (
                    <View
                        key={current.name}
                        style={styles.view}
                        onLayout={(event) => {
                          const layout = event.nativeEvent.layout;
                          setViewLayout([...viewLayout, layout.x]);
                        }}
                    >
                      <Text style={{...styles.title, color:colors.text}}>{current.title}</Text>
                      <RadioButton.Group
                          onValueChange={(value) => {
                            setChecked({
                              ...checked,
                              form: {
                                ...checked.form,
                                [current.name]: value,
                              },
                            });
                          }}
                      >
                        {current.choices.map((currentChoice) => {
                          return (
                              <View key={currentChoice.text} style={styles.radioBox}>
                                <RadioButton
                                    value={parseInt(currentChoice.value)}
                                    status={
                                      checked.form[current.name] ===
                                      parseInt(currentChoice.value)
                                          ? "checked"
                                          : "unchecked"
                                    }
                                />
                                <Text style={{color:colors.text}}>{currentChoice.text} </Text>
                              </View>
                          );
                        })}
                      </RadioButton.Group>
                      <View
                          style={{
                            flexDirection: "row",
                          }}
                      >
                        {index == 0 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index, "last")}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  left: 5,
                                }}
                            >
                              <Text style={styles.textStyle}>&#x3C;</Text>
                            </TouchableOpacity>
                        )}
                        {index === myForm.json_survey.pages[0].elements.length - 1 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index + 1)}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  right: 5,
                                }}
                            >
                              <Text style={styles.textStyle}>&gt;</Text>
                            </TouchableOpacity>
                        )}
                      </View>
                      <View>
                        {index=== myForm.json_survey.pages[0].elements.length -1  ?
                        <TouchableOpacity
                            style={{
                              ...styles.submitButton
                            }}
                            onPress={() => {
                              handleSubmit();
                            }}
                        >
                          {isLoading ? (
                              <ActivityIndicator size="large" color="#59ed9c" />
                          ) : (
                              <Text style={styles.textStyle}>Valider mon formulaire</Text>
                          )
                          }
                        </TouchableOpacity>: null}
                      </View>
                    </View>
                );
              }
            })}
          </ScrollView>
          {/*<View>*/}
          {/*  <TouchableOpacity*/}
          {/*      style={{*/}
          {/*        ...styles.submitButton,*/}
          {/*      }}*/}
          {/*      onPress={() => {*/}
          {/*        handleSubmit();*/}
          {/*      }}*/}
          {/*  >*/}
          {/*    {isLoading ? (*/}
          {/*          <ActivityIndicator size="large" color="white" />*/}
          {/*      ) : (*/}
          {/*          <Text style={styles.textStyle}>Okk</Text>*/}
          {/*      )*/}
          {/*    }*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
          <Modal animationType="slide" transparent={true} visible={showFormModal}>
            <View style={styles.centeredModal}>
              <View style={styles.modal}>
                <Text>
                  {formError
                      ? "Un problème à été rencontré"
                      : "Formulaire envoyé avec succès"}
                </Text>
                <Ionicons
                    name={formError ? "md-warning" : "md-checkmark-circle"}
                    color={formError ? "#ED4337" : "#59ed9c"}
                    size={60}
                    style={{ alignSelf: "center" }}
                />
                <TouchableOpacity
                    style={{
                      ...styles.openButton,
                    }}
                    onPress={() => {
                      toggleModal();
                    }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
              animationType="slide"
              transparent={true}
              visible={checked.showModal}
          >
            <View style={styles.centeredModal}>
              <View style={styles.modal}>
                <Text>Vous devez remplir tous les champs</Text>
                <Ionicons
                    name="md-warning"
                    color="#ED4337"
                    size={60}
                    style={{ alignSelf: "center" }}
                />
                <TouchableOpacity
                    style={{
                      ...styles.openButton,
                    }}
                    onPress={() => {
                      setChecked({
                        ...checked,
                        showModal: !checked.showModal,
                      });
                    }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
    );
  } else {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#8fe2b3" />
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
    backgroundColor: "#FD9854",
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    width: "80%",
  },
  radioBox: {
    flexDirection: "row",
    width: width - 50,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#FD9854",
    padding: 10,
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: 100,
  },
  stepButton: {
    backgroundColor: "#FD9854",
    padding: 12,
    borderRadius: 20,
  },
  view: {
    marginTop: 50,
    width: width - 20,
    margin: 10,
    borderRadius: 10,
    height: "80%"
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const FormScreen = connect(mapStateToProps, { getForm, sendFormData, setIsLoading, hideFormModal })(_FormScreen);

export default FormScreen;
