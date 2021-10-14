import React, {useEffect, useState} from "react";
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, StatusBar, RefreshControl} from "react-native";
import { Fontisto } from '@expo/vector-icons';
import ListBarSearch from "../components/ListSearchBar";
import { connect, useDispatch, useSelector } from "react-redux";
import {getPatient} from "../redux";
import {ActivityIndicator} from "react-native-paper";

// const mapStateToProps = (state) => ({
//     userReducer: state.userReducer,
// });
const AllPatientsScreen = (props)=> {
    const dispatch = useDispatch();
    // const {userReducer, getPatient} = props;
    // const {patients, isFetching} = userReducer;
    const patients = useSelector(state => state.userReducer.patients);
    const isFetching = useSelector(state => state.userReducer.isFetching);
    const [Fetching, setFetching] = useState(isFetching);
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([])
    const [query, setQuery] = useState('');
    useEffect(() => {
        dispatch(getPatient());
    }, [dispatch]);

    // console.log('objectPatientsFromReduxUseSelector', patients);
    // console.log(allPatientsArray);

    const fetchAllData = ()=>{
        let allPatientsArray = patients && Object.keys(patients).map(function (i) {
            return patients[i];
        });
        setFetching(true)
        // console.log('allPatientArrayIs:', allPatientsArray);
        setData(allPatientsArray);
        setFullData(allPatientsArray);
        setTimeout(()=>{setFetching(false)}, 1200);
    }

    useEffect(()=>{
       fetchAllData();
    }, [patients]);
    // console.log('dataAfterUseEffectOutside', data);
    const renderItem=({ item }) => (
        <View style={styles.item} key={item.id}>
            <View style={styles.itemContent}>
                <Text>
                    {item.date}  {item.name}
                </Text>
                <Text>Indice Oswestry: {item.indice}</Text>
                <View style={{marginVertical:3}}>
                    {item['id fisio']===0?
                        (
                            <Text><Fontisto name="doctor" size={24} color="grey" />{'  '}Non Suivi</Text>
                        ):
                        <Text><Fontisto name="doctor" size={24} color="green" />{'  '}Suivi</Text>
                    }
                </View>
                <TouchableOpacity onPress={()=>props.navigation.navigate('FichePatient', {item})} style={{alignItems: "center"}}>
                    <Text style={styles.btnDetails}>Lire la suite</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
        // console.log(isFetching);
        const keyExtractor = (item, index) => index.toString();
        ////////////////////// search bar
        const handleSearch = text => {
            if (text===''){
                setData(fullData);
            }
            const filteredData = fullData.filter(function (user){
                return user.name.substring(0, text.length).toLowerCase() === text.toLowerCase();
            });
            setQuery(text);
            setData(filteredData);
        };
        //////////// end search bar
        const onRefresh = ()=>{
            setFetching(true);
            dispatch(getPatient()).then(()=>{setData(patients && Object.keys(patients).map(function (i) {
                return patients[i];
            }))}).then(()=>{ setFetching(false)}).finally(()=>setQuery(''));
        }


        return (
            <SafeAreaView>
                {Fetching ? <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator size="large" color="#FD9854"/>
                    </View> : null }
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor = { keyExtractor }
                    ListHeaderComponent={<ListBarSearch handleSearch={handleSearch} value={query}/>}
                    maxToRenderPerBatch={10}
                    windowSize={20}
                    refreshControl={
                        <RefreshControl
                            refreshing={Fetching}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </SafeAreaView>
        )
    // else {
    //     return (
    //         <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //             <ActivityIndicator size="large" color="#FD9854"/>
    //         </View>
    //     );
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item:{
        marginHorizontal: 10,
        marginVertical:8,
        borderRadius:6,
        backgroundColor:"#d39f56",
        shadowOffset: {width: 3, height:3},
        shadowColor:'#232422',
        shadowRadius:3,
        shadowOpacity:0.5
    },
    itemContent:{
        marginHorizontal: 15,
        marginVertical: 10
    },

    btnDetails:{
        alignItems: "center",
        textAlign:"center",
        justifyContent:"center",
        backgroundColor: "#8fe2b3",
        borderRadius: 6,
        width: 120,
        padding: 5,
    }
});



// const AllPatientsScreen = connect(mapStateToProps, { getPatient })(_AllPatientsScreen);

export default AllPatientsScreen;