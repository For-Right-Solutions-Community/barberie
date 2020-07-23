import React, { Component} from "react";
import {ScrollView,StyleSheet} from 'react-native';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../../firebase/config'
import { Button } from "react-native-elements";

const entityRef = firebase.firestore().collection('entities')

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name:'',
            matricule:'',
            tel:'',
            localisation:''
    });
    this.onAddButtonPress = this.onAddButtonPress.bind(this)
    }
     onAddButtonPress () {
            let self= this;
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            console.log("Adding Profile");
            const data = {                
                matricule: this.state.matricule,
                tel: this.state.tel,
                localisation: this.state.localisation,
                name:this.state.name,
                Sal_ID: 14556,
                Date_insertion: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    this.setState({name:'',
                    matricule:'',
                    tel:'',
                    localisation:''})

                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        
    }
    render() {
        return (
    
            <ScrollView style={{  backgroundColor:  "white"}} keyboardShouldPersistTaps="handled">
            <View style={{ marginTop: 30}}>

        <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onAddButtonPress} >
        <Text style={styles.buttonText} >Ajouter Salon</Text>
        </TouchableOpacity>
    <View style={styles.formContainer1}>



           <TextInput
               style={styles.Nom}
               placeholder='Nom de salon'
               placeholderTextColor="#aaaaaa"
               value={this.state.name} onChangeText={ (text) => this.setState({ name: text }) }
     
               underlineColorAndroid="transparent"
               autoCapitalize="none"
           />
           </View>
           <View style={styles.formContainer2}>
            <TextInput
               style={styles.Matricule}
               placeholder='Matricule de salon'
               placeholderTextColor="#aaaaaa"
               value={this.state.matricule} onChangeText={ (text) => this.setState({ matricule: text }) }
               underlineColorAndroid="transparent"
               autoCapitalize="none"
           />
           </View>
           <View style={styles.formContainer3}>
            <TextInput
               style={styles.Tel}
               placeholder='Telephone'
               placeholderTextColor="#aaaaaa"
               value={this.state.tel} onChangeText={ (text) => this.setState({ tel: text }) }
               underlineColorAndroid="transparent"
               autoCapitalize="none"
           /></View>
           <View style={styles.formContainer3}>
            <TextInput
               style={styles.Local}
               placeholder='Localisation'
               placeholderTextColor="#aaaaaa"
               value={this.state.localisation} onChangeText={ (text) => this.setState({ localisation: text }) }
               underlineColorAndroid="transparent"
               autoCapitalize="none"
           />
           </View>
           

      


   </View>
</View >
             </ScrollView >
     
            );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer1: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer2: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer3: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Nom: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginTop: -50
    },
    Matricule: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginTop: -50
    },
    
    Tel: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginTop: -50
    },
    
    Local: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginTop: -50
    },

    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }, 

    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
});
