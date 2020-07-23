import React, { Component } from "react";
import {ScrollView,StyleSheet,View} from 'react-native';
import {Text} from 'native-base';

export default class CalendrieScreen extends Component {
    render() {
        return (
    
            <ScrollView style={{  backgroundColor:  "white"}} keyboardShouldPersistTaps="handled">
            <View style={{ marginTop: 30}}>
    <Text style={styles.textlabel1}>
    hello 
    </Text>

</View >
             </ScrollView >
            );
    }
}
const styles = StyleSheet.create({
textlabel1: {
    fontSize: 18,
    paddingRight:30,
    left:10,
  }
});