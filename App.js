import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IpAdressScreen from './screens/IpAdress';
import EncryptionScreen from './screens/Encrypt';
import SaveScreen from './screens/SaveScreen';
import HomeScreen from './screens/Home';
import { StatusBar } from 'react-native';
import styles from './styles';

//Använder bottomtab navigation som navigering för appen
const Tab = createBottomTabNavigator();

export default function App ({navigation}) {

  function LogoTitle()  {
    return <Text style={styles.Text}>Home</Text>
  }
  
  return (

      <NavigationContainer>
        <StatusBar backgroundColor='#32CD32' />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: '#32CD32',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
            },
            borderTopRightRadius: 20,//add border top right radius
            borderTopLeftRadius: 20,//add border top left radius 
            borderBottomRightRadius: 20,//add border top right radius
            borderTopBottomRadius: 20,//add border top left radius 
            headerTintColor: 'white',
            headerTitleAlign: 'middle',
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home';
              } else if (route.name === 'IpAdress') {
                iconName = focused ? 'ios-cellular' : 'ios-cellular';
              } else if (route.name === "Encrypt") {
                iconName = focused ? 'lock-closed' : 'lock-open';
              }
              else if (route.name === "Save") {
                iconName = focused ? 'ios-save' : 'ios-save';
              } else if (route.name === "Login") {
                iconName = focused ? 'checkmark-circle-outline' : 'checkmark-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: 'limegreen' }
          })}

      >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: props => <LogoTitle {...props} />,
            }}
          />
          <Tab.Screen name="IpAdress" component={IpAdressScreen} />
          <Tab.Screen name="Save" component={SaveScreen} />
          <Tab.Screen name="Encrypt" component={EncryptionScreen} />
      </Tab.Navigator>

     </NavigationContainer> 
  );
}





