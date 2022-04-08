import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  TextInput,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  Animated,
  SafeAreaView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';



// Min app hämtar information om ip adresser genom ett API.
const ipApp = ({navigation}, props) => {

 

  const [tagIp, setTagIp] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  //state för värden från API
  const [ipValue, setIPvalue] = useState([]);
  //state för skicka in IP adress
  const [getIP, setIP] = useState();
  //state för laddning  
  const [isLoading, setLoading] = useState(true);

//#region fade

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.95,
      duration: 3000,
      useNativeDriver: true 
    }).start();
  };
//#endregion

//#region Fetch API

  //Funktion fetchar API, kollar om värdet på newIP som skickades in är null, om det är det visar meddelande. 
  //Om värdet inte är null, kallar på API med fetch sedan sparar värden inuti states 
  //och använder try,catch som alarmerar om något går fel under processen. Tillslut 
  //sätter setLoading till false. Jag använder inte loading den är endast för demonstration.
  const fetchIP = async () => {

    if (getIP == null) {
      
      Alert.alert('You did not enter an Ip-adress', 'Please enter a valid Ip-adress', [
        {
          
          text: 'Ok',
          
          onPress: () => console.log('No Pressed'),
          
        },
        
      ]);

    }else if(ipValue !== null){
      
      //testar om något går fel
      try {
        
        //skapar variabel för URL
        const APIURL = 'https://ipinfo.io/' + getIP + '?token=47dac9880b37fa';

        //hämtar api data
        const response = await fetch(APIURL);
        
        const json = await response.json();
        
        
        //Lagrar värdet genom setState
        setIPvalue(json);

        setTagIp(json.ip);

        console.log('This object'+ ipValue);

        //kollar efter error
      } catch (error) {

        console.error( "Something went wrong " + error); 

      } 
      finally {

        //Kommer hit om inget går fel
        setLoading(false);
        
        console.log("Fetch completed sucessfully");

      }
    }
  }

//#endregion

//#region store searched ips

    //funktion som sparar ipadresser asynct. sparar värdet från ipValue i en lokal variabel,
    //skapar en lokal tom array, skapar en till array som sparar värdet från asyncstorage inuti.
    //Kollar om värdet inte lika med null sedan parsar och sparar värdet i den lokala arrayen.
    //Pushar sedan värdet från state ipValue till arrayen gör sparar värdet i AsyncStorage som
    //en sträng.
    //Om något går fel catchar den det på rad 120.
   _storeSearchedIps = async () => {
      let data = ipValue;

     let numberArray = [];

     try {
       let storedArrays = await AsyncStorage.getItem("Key");
       if (storedArrays !== null) {
         numberArray = JSON.parse(storedArrays);
       }
       numberArray.push(data);
       await AsyncStorage.setItem("Key", JSON.stringify(numberArray));
       console.log(numberArray);
     } catch (error) {
       alert(e);
     }
   };

   
   //changeHandler  kallas på från textInput, tar emot en parameter som är värdet på det nya IP
   //sätter det i värdet useState till newIP.
   const changeHandler = (getIP) => {
     setIP(getIP);
     console.log(getIP);
     
    }
    
    //#endregion

//#region alertmenu

  //Sparar ip adressen på enheten med asyncstorage, kallas på via knapptryck. ger två val Ja/Nej, om användare väljer Ja
  //kallar den på storeValue.
  const alertMenu = () =>

    Alert.alert('Save info', 'Do you want to save information on device?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
      },
      {
        //settar data i async storage
        text: 'Yes',
        onPress: () => _storeSearchedIps(),     
      },    
    ]);


    useEffect(() => {
      fadeIn();
    }, [])
    
      //Pressable: props till onPress
      const { onPressIp, titleIP = 'Find' } = props;
      const { onPressSave, titleSave = 'Save' } = props;
      const { onPressNew, titleNew = 'Send' } = props;

//#endregion



  return (
    //Anpassar tangentbordet efter skärmen så den inte överlappar med element på skärmen
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.TopLevelView}>
        {/* bakgrundsbild */}
        <ImageBackground
          style={styles.image}
          source={require("../assets/bakgrund.jpg")}
          resizeMode="cover"
        >
          <View style={styles.TextInputView}>
            
            <TextInput
              style={styles.TextInput}
              onChangeText={changeHandler}
              value={getIP}
              placeholder="ex 155.144.33.22"
              placeholderTextColor="white"  
            />

            {/* passar in värde från textinput till funktionen */}
            <View style={{ flexDirection: "row" }}>
              {/* find knapp skickar med nya IP*/}
              <Pressable
                style={styles.button}
                onPress={fetchIP.bind(this, getIP)}
                // onPressIn={fadeIn()}
                android_ripple={{ color: "white" }}
              >
                <Text onPress={onPressIp} style={styles.ButtonText}>
                  {titleIP}
                </Text>
              </Pressable>

              {/* save */}
              <Pressable
                // Kallar på alertmenu och skickar med state
                onPress={alertMenu}
                style={styles.button}
                android_ripple={{ color: "lightblue" }}
              >
                <Text style={styles.ButtonText} onPress={onPressSave}>
                  {titleSave}
                </Text>
              </Pressable>

              {/* send skickar objektet till newScreen */}
              <Pressable
                onPress={() => navigation.navigate("Save")}
                style={styles.button}
                android_ripple={{ color: "lightblue" }}
              >
                <Text style={styles.ButtonText} onPress={onPressNew}>
                  {titleNew}
                </Text>
              </Pressable>
            </View>
          </View>

          <Animated.View
            style={[
              styles.TextOutput,
              {
                
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.Text}>ip: {ipValue.ip}</Text>
            <Text style={styles.Text}>country: {ipValue.country}</Text>
            <Text style={styles.Text}>city: {ipValue.city}</Text>
            <Text style={styles.Text}>postcode: {ipValue.postal}</Text>
            <Text style={styles.Text}>location: {ipValue.loc}</Text>
            <Text style={styles.Text}>timezone: {ipValue.timezone}</Text>
            <Text style={styles.Text}>hostname: {ipValue.hostname}</Text>

          </Animated.View>

        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );

}


export default ipApp;