import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'


export default function HomeScreen(props) {


    const [entityNom, setEntityNom] = useState('')
    const [entityMatricule, setEntityMatricule] = useState('')
    const [entityTel, setEntityTel] = useState('')
    const [entityLocal, setEntityLocal] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {
        entityRef
            .where("Sal_ID", "==", userID)
            .orderBy('Date_insertion', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityNom && entityNom.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                
                Matricule_sal: entityMatricule,
                Tel_sal: entityTel,
                Local_sal: entityLocal,
                No_sal: entityNom,
                Sal_ID: userID,
                Date_insertion: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityNom('')
                    setEntityMatricule('')
                    setEntityTel('')
                    setEntityLocal('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityNom}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
         <View style={styles.formContainer}>
                <TextInput
                    style={styles.Nom}
                    placeholder='Nom de salon'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityNom(text)}
                    value={entityNom}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                </View>
                <View style={styles.formContainer1}>
                 <TextInput
                    style={styles.Matricule}
                    placeholder='Matricule de salon'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityMatricule(text)}
                    value={entityMatricule}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                </View>
                <View style={styles.formContainer2}>
                 <TextInput
                    style={styles.Tel}
                    placeholder='Telephone'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityTel(text)}
                    value={entityTel}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /></View>
                <View style={styles.formContainer3}>
                 <TextInput
                    style={styles.Local}
                    placeholder='Localisation'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityLocal(text)}
                    value={entityLocal}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                </View>
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Ajouter</Text>
                </TouchableOpacity>
           
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
        
    )
}
const routeConfiguration = {
    FirstPage: {
      screen: FirstPage,
      navigationOptions: ({ navigation }) => ({
        headerRight: () => <Button onPress={() => navigation.navigate('FirstPage') } />
      }),
    },
    // ...
  };