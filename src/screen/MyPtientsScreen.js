import React, {useEffect, useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StatusBar,
    RefreshControl,
    ScrollView
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import {getPatient} from "../redux";
import {useTheme} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";


const MyPatientsScreen = (props)=>{
    const dispatch = useDispatch();
    const patients = useSelector(state => state.userReducer.patients);
    const isFetching = useSelector(state => state.userReducer.isFetching);
    const user = useSelector(state => state.userReducer.user);
    const {colors} = useTheme();
    // const { userReducer, getPatient } = props;
    // const { patients, user, isFetching } = userReducer;
    // console.log('insideMyPatientsScreen', isFetching);
    const [fetching, setFetching] = useState(isFetching);
    const [myListData, setMyListData] = useState([])
    useEffect(() => {
        dispatch(getPatient());
    }, [dispatch]);
    // console.log(patients);

    const allPatientsArray = patients && Object.keys(patients).map(function (i) {
        return patients[i];
    });

    useEffect(()=>{
        let myList = (allPatientsArray && allPatientsArray.filter(function (item){
            return item['id fisio'] === user.id;
        }));
        const myListLength = myList && myList.length
        console.log(myListLength);
        setFetching(true);
        setMyListData(myList);
        setTimeout(()=>{setFetching(false)}, 1000);
    },[])

    const renderMyList = ({ item }) => (
        <View style={styles.item} key={item.id}>
            <View style={styles.itemContent}>
                <Text>
                    {item.date}  {item.name}
                </Text>
                <Text>Indice Oswestry: {item.indice}</Text>
                <TouchableOpacity onPress={()=>props.navigation.navigate('FichePatient', {item})} style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.btnDetails}>Lire la suite</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    const keyExtractor = (item, index) => index.toString();
    const onRefresh = ()=>{
        setFetching(true);
        dispatch(getPatient()).then(()=>{setMyListData(allPatientsArray && allPatientsArray.filter(function (item){
            return item['id fisio'] === user.id;}))}).then(()=>{ setFetching(false)});
    }
    // console.log('isFetching', fetching);
    return (
            <SafeAreaView>
                {myListData.length === 0?
                    (<>
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={fetching}
                                onRefresh={onRefresh}
                            />
                        } >
                            <Text style={{color:colors.text, padding:20}}>Vous ne suivez aucun patient, veuillez consulter la liste de tous les patient pour suivre des patients non suivis</Text>
                            <TouchableOpacity onPress={()=>setTimeout(()=>{onRefresh()}, 1500)}>
                                <Text style={{textAlign:'center', padding:5, color:colors.text}}>
                                    If you added patients, actualise to load {' '}
                                    <MaterialCommunityIcons name="refresh-circle" size={40} color="#8fe2b3" />
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </>) :
                    (<FlatList
                        data={myListData}
                        renderItem={renderMyList}
                        // keyExtractor={item => item.id}
                        keyExtractor = { keyExtractor }
                        maxToRenderPerBatch={10}
                        windowSize={20}
                        extraData={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={fetching}
                                onRefresh={onRefresh}
                            />
                        }
                    />)
                }
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item:{
        marginHorizontal: 10,
        marginVertical:10,
        borderRadius:6,
        backgroundColor:'#8fe2b3',
        shadowOffset: {width: 4, height:4},
        shadowColor:"#000",
        shadowRadius:2,
        shadowOpacity:0.2
    },
    itemContent:{
        marginHorizontal: 15,
        marginVertical: 10
    },
    btnDetails:{
        alignItems: "center",
        textAlign:"center",
        justifyContent:"center",
        backgroundColor: "#d39f56",
        borderRadius: 6,
        width: 120,
        padding: 5
    }
});


// const mapStateToProps = (state) => ({
//     userReducer: state.userReducer,
// });
//
// const MyPatientsScreen = connect(mapStateToProps, { getPatient, setIsLoading, addPatient, stopPatient})(_MyPatientsScreen);

export default MyPatientsScreen;