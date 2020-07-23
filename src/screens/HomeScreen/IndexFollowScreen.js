import React, { Component,useEffect, useState} from 'react';
import {ScrollView,StyleSheet,View} from 'react-native';

import { Container, Header, Tab, Tabs, TabHeading, Icon, Text,Button } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';
import ProfileScreen from '../ScreenApp/ProfileScreen'
import CalendrieScreen from '../ScreenApp/CalendrieScreen'
import SalonsScreens from '../ScreenApp/SalonsScreens'
import RDV from '../ScreenApp/RDV'
export default class IndexFollowScreen extends Component {

  constructor(props) {

    super(props)

  }

 render() {


    return (

   
      <Container>
  
        <Tabs  initialPage={0} tabBarPosition="top">
          <Tab heading={ <TabHeading style={{backgroundColor: '#2196F3'}}><Text>Profil</Text></TabHeading>}> 
          <Grid>
           <ProfileScreen >
                 </ProfileScreen>
          </Grid>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#2196F3'}}><Text>Rendez-Vous</Text></TabHeading>}> 
           <Grid>
            <RDV>
           </RDV>
          </Grid>
          </Tab>

          <Tab heading={ <TabHeading style={{backgroundColor: '#2196F3'}}><Text>Salons</Text></TabHeading>}> 
           <Grid>
            <SalonsScreens>
            </SalonsScreens>
          </Grid>
          </Tab>
          
   
        </Tabs>
   
      </Container>
  
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