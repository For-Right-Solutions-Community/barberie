import React, { Component} from "react";
import {ScrollView,StyleSheet} from 'react-native';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity,TouchableHighlight, View } from 'react-native';
import { firebase } from '../../firebase/config'
import { Button } from "react-native-elements";
const rdvs = firebase.firestore().collection('rdvs')
export default class RDV extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            //FlatListItems: [{name:'Patrick star'},{name:'Gallileo'},{name:'Einsten'},{name:'Peterson'},{name:'Schwarzenneger'},{name:'Dostoyevsky'}]
            FlatListItems: []
    });

    }

    componentDidMount(){
        rdvs
        .orderBy('salon.name', 'desc')
        .onSnapshot(
            querySnapshot => {
                const newEntities = []
                querySnapshot.forEach(doc => {
                    const entity = doc.data()
                    console.log(entity);
                    entity.id = doc.id
                    newEntities.push(entity)
                });
                this.setEntities(newEntities)
            },
            error => {
                console.log(error)
            }
        )
    }
    setEntities(newEntities){
        this.setState({FlatListItems:newEntities})
    }
    render() {
        return (
            <View style={{ marginTop: 30}}>
                <FlatList
                style={{marginTop:40}}
                data={this.state.FlatListItems}
                renderItem={({item})=>(
                <View style={{justifyContent:'center',marginBottom:10}}>
                        <Text style={{backgroundColor:'blue',color:'white',padding:10}}>
                        {item.salon.name}
                        </Text>
                        <Text style={{backgroundColor:'blue',color:'white',padding:10}}>
                        {item.user.name + item.date} 
                        </Text>
                </View>
                )}
                />
             </View >

     
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
