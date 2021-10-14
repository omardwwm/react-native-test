import React, {useEffect, useState} from "react";
import { View, TextInput} from "react-native";





const ListBarSearch=(props)=> {
    return (
        <View
            style={{backgroundColor: '#8fe2b3', padding: 10, marginVertical: 10, borderRadius: 15, marginHorizontal:10}}
        >
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                // value={query}
                value={props.value}
                onChangeText={queryText => props.handleSearch(queryText)}
                placeholder="Chercher un patient..."
                style={{ backgroundColor: '#ffffff', paddingHorizontal: 20 }}
            />
        </View>
    );
}

export default ListBarSearch;