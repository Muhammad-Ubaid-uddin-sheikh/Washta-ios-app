import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnGoing from './OnGoing'
import Cencel from './Cencel'
import Completed from './Completed'
import { StyleSheet } from 'react-native';
import { FontsGeneral } from '../style';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
   
    screenOptions={{
        tabBarActiveTintColor: "#747EEF",
        tabBarInactiveTintColor: "black",
        tabBarPressOpacity: 0,
        tabBarLabelStyle: { textTransform: 'capitalize', ...styles.tabBarLabel,fontSize:15 },
        tabBarIndicatorStyle: { backgroundColor: "#747EEF" },
        tabBarStyle: { borderTopWidth: 0 },
       
      }}
      
    >
      <Tab.Screen options={{ tabBarLabel: 'On-Going', headerShown: false , headerTitleStyle: {
         
        },
      }} name="OnGoing" component={OnGoing}   />
      <Tab.Screen options={{
          tabBarLabel: 'Completed',
         headerShown: false , 
      }}
      
       name="Completed" component={Completed} />
         <Tab.Screen options={{
           headerStyle: {
            backgroundColor: 'white', 
            borderBottomWidth: 0, 
            shadowOpacity: 0, 
            elevation: 0, 
          },
          tabBarLabel: 'Cancelled',
         headerShown: false , headerTitleStyle: {
         
        },
      }}
       name="Cencel" component={Cencel}  />
      
        
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
    tabBarLabel: {
        fontFamily: FontsGeneral.MEDIUMSANS
      },

})
export default  MyTabs