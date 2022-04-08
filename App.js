import * as React from 'react';
import { useReducer, useEffect } from 'react'
import { Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import IpAdressScreen from './screens/IpAdress';
import EncryptionScreen from './screens/Encrypt';
import SaveScreen from './screens/SaveScreen';
import HomeScreen from './screens/Home';
import { StatusBar } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import styles from './styles';

//auth
import { AuthContext } from './components/Context';
//async
import AsyncStorage from '@react-native-async-storage/async-storage';

//Använder bottomtab navigation som navigering för appen
const Tab = createBottomTabNavigator();


export default function App ({navigation}) {

  function LogoTitle()  {
    return <Text style={styles.Text}>Home</Text>
  }

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

    const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);


  // if( loginState.isLoading ) {
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // }
  return (
      // <Signup />
      <Login />
  //   <AuthContext.Provider value={authContext}>
     

  //     <NavigationContainer>
  //       <StatusBar backgroundColor='#32CD32' />

  //       <Tab.Navigator

  //         screenOptions={({ route }) => ({
  //           headerStyle: {
  //             backgroundColor: '#32CD32',
  //             borderBottomWidth: 1,
  //             borderBottomColor: 'lightgrey',
  //           },
  //           borderTopRightRadius: 20,//add border top right radius
  //           borderTopLeftRadius: 20,//add border top left radius 
  //           borderBottomRightRadius: 20,//add border top right radius
  //           borderTopBottomRadius: 20,//add border top left radius 
  //           headerTintColor: 'white',
  //           headerTitleAlign: 'middle',
  //           tabBarIcon: ({ focused, color, size }) => {
  //             let iconName;
  //             if (route.name === 'Home') {
  //               iconName = focused
  //                 ? 'ios-home'
  //                 : 'ios-home';
  //             } else if (route.name === 'IpAdress') {
  //               iconName = focused ? 'ios-cellular' : 'ios-cellular';
  //             } else if (route.name === "Encrypt") {
  //               iconName = focused ? 'lock-closed' : 'lock-open';
  //             }
  //             else if (route.name === "Save") {
  //               iconName = focused ? 'ios-save' : 'ios-save';
  //             } else if (route.name === "Login") {
  //               iconName = focused ? 'checkmark-circle-outline' : 'checkmark-circle-outline';
  //             }
  //             return <Ionicons name={iconName} size={size} color={color} />;
  //           },
  //           tabBarActiveTintColor: 'white',
  //           tabBarInactiveTintColor: 'gray',
  //           tabBarStyle: { backgroundColor: 'limegreen' }
  //         })}

  //     >
  //         <Tab.Screen
  //           name="Home"
  //           component={HomeScreen}
  //           options={{
  //             headerTitle: props => <LogoTitle {...props} />,
  //             headerRight: ({navigation}) => (
  //               <TouchableOpacity
  //               title="Logout"
  //               style={styles.ButtonSignOut}
  //               onPress={() => navigation.navigate('Home')}
  //               >
  //                 <Text style={styles.ButtonSignOutText}>Sign out</Text>
  //               </TouchableOpacity>
  //             ),
  //           }}
  //         />
  //         <Tab.Screen name="IpAdress" component={IpAdressScreen} />
  //         <Tab.Screen name="Save" component={SaveScreen} />
  //         <Tab.Screen name="Encrypt" component={EncryptionScreen} />
  //     </Tab.Navigator>

  //    </NavigationContainer> 
  //     </AuthContext.Provider>

  );

}





