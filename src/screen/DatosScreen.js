import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell,} from "react-native-table-component";
import { connect } from "react-redux";
import { getPatient } from "../redux";


const _DatosScreen = (props) => {
  const { userReducer, getPatient } = props;
  const { patients } = userReducer;
    useEffect(() => {
        getPatient();
    }, []);
  // console.log(patients);

    let tableHeadArray = [];
  let tableDataArray = [];
  let widthArr = [
      70, 100, 90, 80, 60, 60, 100, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
  ];

  if (patients !== null) {
    Object.keys(patients[0]).forEach((element) => {
      tableHeadArray.push(element);
    });

    Object.keys(patients).forEach((element) => {
      let currentArray = [];
      Object.values(patients[element]).forEach((element) => {
        currentArray.push(element);
      });
      tableDataArray.push(currentArray);
      // console.log(tableDataArray);
    });

    return (
      <ScrollView>
        <ScrollView horizontal>
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={tableHeadArray}
                style={styles.head}
                textStyle={styles.text}
                widthArr={widthArr}
              />

                <Rows
                    data={tableDataArray}
                    textStyle={styles.text}
                    widthArr={widthArr}
                />
            </Table>
          </View>
        </ScrollView>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FD9854" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 60, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const DatosScreen = connect(mapStateToProps, { getPatient })(_DatosScreen);

export default DatosScreen;
