import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { getExercice } from "../redux";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import { Video } from 'expo-av';
import {Card} from "react-native-elements";


const _PhasesScreen = (props) => {
  const { userReducer, getExercice } = props;
  const { user, exercice } = userReducer;
  useEffect(() => {
    getExercice(user);
  }, []);
  const { width } = Dimensions.get('window');
  const {colors} = useTheme();
  if (exercice !== null) {
    if (user && user.mod6_capabilities[0].slice(29, -7) > 5){
      return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin:8 }}>
            <Card>
              <Card.Title>Infos exercices</Card.Title>
              <Text>Vous avez fini votre parcours et vous n'avez pas d'exercices a faire pour le moment, veuillez contacter votre physio, ses coordonnes sont dans {' '}
                <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')} style={{backgroundColor:"#8fe2b3", padding:4, borderRadius:5}}>
                  <Text >
                    <MaterialCommunityIcons name="cursor-default-click" size={20} color="black" />
                    votre espace personnel
                  </Text>
                </TouchableOpacity>
              </Text>
            </Card>
          </View>
      )
    }
    else if (exercice.url === false) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{color:colors.text}}>Veuillez remplir le formulaire</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color:colors.text}}>La phase N { user && user.mod6_capabilities[0].slice(29, -7)}</Text>
            <Image source={{uri:`${exercice.url[0]}`}} style={{width:250, height:250}}/>
            <View style={{margin:10}}>
              <Video
                  source={{uri:"https://sans-filtre.fr/wp-content/uploads/2020/03/51426439_233047627628437_2347714357619589120_n.mp4?_=1"}}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="contain"
                  useNativeControls
                  // shouldPlay
                  style={{width, height: 300}}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FD9854" />
      </View>
    );
  }
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const PhasesScreen = connect(mapStateToProps, {
  getExercice,
})(_PhasesScreen);

export default PhasesScreen;
