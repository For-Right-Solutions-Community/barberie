import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import IndexFollowScreen  from './src/screens/HomeScreen/IndexFollowScreen'

import {decode, encode} from 'base-64'
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }



export default class App extends React.Component {
  
  render() {
   return (
<IndexFollowScreen>
</IndexFollowScreen>
   );
 }
 }
 
