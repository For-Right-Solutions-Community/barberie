import * as React from 'react';
import {Text, View,StyleSheet,AsyncStorage } from 'react-native';
import { Container, Item, Form, Input, Label,Button} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IndexFollowScreen  from './src/screens/HomeScreen/IndexFollowScreen'
import { firebase } from './src/firebase/config';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
class SignInScreen extends React.Component  {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    _signInAsync = async () => {
      console.log("User "+this.state.pseudo);
      await AsyncStorage.setItem('userToken', 'token');
      await AsyncStorage.setItem('userPseudo', this.state.pseudo);
      await AsyncStorage.setItem('userMail', this.state.email);
      //this.props.navigation.navigate('IndexFollowScreen');
      console.log("azazazaz");
      this.props.navigation.navigate('IndexFollowScreen')
    };
  
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        pseudo:"",
        accessToken: ""
      };
    }
    componentDidMount() {
      console.log(this.state.accessToken);
      this.getToken();
    }
    async storeToken(actk) {
      try {
        await AsyncStorage.setItem(AccessToken, actk);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    async getToken(actk) {
      try {
        let token = await AsyncStorage.getItem(AccessToken);
        console.log(token);
      } catch (error) {
        console.log("Something went wrong");
      }
    }
    SignIn = (email, password) => {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{  firebase.auth().onAuthStateChanged(user => {
                if(user ){
                  this._signInAsync();
                }
                else{
                }
        })}).catch((error)=>{
            console.log("Cannot signin");
            console.log(error.toString(error));
            alert("Imposssible de se connecter "+(error.toString(error)));
          });
  } catch (error) {
        console.log(error.toString(error));
      }
    };
  
    SignUp = (email, password) => {
      firebase.auth().sendSignInLinkToEmail
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
          alert('Nouveau compte crée avec succes , you cans sign in now');
        }).catch ((error)=>{
        console.log("Cannot signup");
        alert("Impossible de creér un nouveau compte"+(error.toString(error)));
      })    
    };
  
    changepassword = (email) => {
      firebase.auth().sendPasswordResetEmail(email).then(function (user) {
        alert('Please check your email...')
      }).catch ((error)=>{
      console.log("Cannot change passowrd");
      alert("Impossible de changer le mot de passe "+(error.toString(error)));
    })    
  };
    render() {
      return (
        <Container style={stylessign.container}>
          <Form>
            <Item floatingLabel>
              <Label>Pseudo</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={pseudo => this.setState({ pseudo })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button
              full
              rounded
              style={{ marginTop: 20 }}
              onPress={() => this.SignIn(this.state.email, this.state.password)}
            >
              <Text>SignIn</Text>
            </Button>
            <Button
              full
              rounded
              success
              style={{ marginTop: 20 }}
              onPress={() => this.SignUp(this.state.email, this.state.password)}
            >
              <Text>Signup</Text>
            </Button>
  
            <Button
              full
              rounded
              success
              style={{ marginTop: 20 }}
              onPress={() => this.changepassword(this.state.email)}
            >
              <Text>Change Password</Text>
            </Button>
          </Form>
        </Container>
      );
    }
  }

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={SignInScreen} />
      <Stack.Screen name="IndexFollowScreen" component={IndexFollowScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
const stylessign = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      justifyContent: "center",
      padding: 10
    }
  });