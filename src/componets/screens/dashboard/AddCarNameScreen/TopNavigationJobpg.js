import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeNavigation/HomeGround'
import SettingsScreen from './reservar/Reservar'
import Horaios from './horarios/Horarios'
import Actividades from './actividades/Actividades'
const Tab = createMaterialTopTabNavigator();

function MyTabs({Feilds,Item}) {
  console.log('navigation',Item)
  return (
    <Tab.Navigator
   
    screenOptions={{
      tabBarActiveTintColor: "#408639",
      tabBarInactiveTintColor: "black",
      tabBarPressOpacity: 0,
      tabBarLabelStyle: { textTransform: 'capitalize' },
      tabBarIndicatorStyle: { backgroundColor: "#408639" },
      tabBarStyle: { borderTopWidth: 0 }
    }}
      
    >
      <Tab.Screen options={{ tabBarLabel: 'Inicio', headerShown: false , headerTitleStyle: {
         
        },
      }} name="Home" component={HomeScreen} initialParams={{Item:Item,Feilds}}  />
         <Tab.Screen options={{
          tabBarLabel: 'Reservar',
         headerShown: false , headerTitleStyle: {
         
        },
      }}
       name="Reservar" component={SettingsScreen} initialParams={ {Feilds,Item:Item}} />
      
        <Tab.Screen options={{
          tabBarLabel: 'Torneos',
         headerShown: false , 
      }}
      
       name="Actividades" component={Actividades} />
    </Tab.Navigator>
  );
}
export default  MyTabs