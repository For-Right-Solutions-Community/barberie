import React, { Component} from "react";
import {ScrollView,StyleSheet} from 'react-native';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity,TouchableHighlight, View ,AsyncStorage} from 'react-native';
import { firebase } from '../../firebase/config'
import { Button } from "react-native-elements";
import CalendarPicker from 'react-native-calendar-picker';
const entityRef = firebase.firestore().collection('entities')
const rdvs = firebase.firestore().collection('rdvs')
export default class SalonsScreens extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            //FlatListItems: [{name:'Patrick star'},{name:'Gallileo'},{name:'Einsten'},{name:'Peterson'},{name:'Schwarzenneger'},{name:'Dostoyevsky'}]
            FlatListItems: [],
            pseudo:'',
            mail:''
    });
      
    }

    async setuser(){
    
        //alert("Reading users")
        let pseudo = await AsyncStorage.getItem('userPseudo');
        let mail= await AsyncStorage.getItem('userMail');
        //alert("Reading users"+mail)
        this.setState({pseudo:pseudo,mail:mail})    
    }
    componentDidMount(){
        this.setuser();
        entityRef
        .orderBy('Date_insertion', 'desc')
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
    prendrerndezvous(salon,user){
        let date= salon.date.toString();
        delete salon.date;
        const data = {                
            salon: salon,
            user: user,
            date:date
        };
        rdvs
            .add(data)
            .then(_doc => {
                alert("Le rendez-vous est effectué avec succès")
            })
            .catch((error) => {
                alert(error)
            });
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
                        {item.name}
                        </Text>
                        <CalendarPicker  onDateChange={(date)=>{item.date=date}} />
                        <TouchableOpacity style={styles.button}  onPress={() => {this.prendrerndezvous(item,{"name":this.state.mail,"mail":this.state.mail});}} >                        
                        <Text style={styles.buttonText} >Prendre un RDV </Text>
                        </TouchableOpacity>

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
