import React, { useEffect, useState, useRef } from 'react';
import { Alert, View, Text, Pressable, ImageBackground, Animated } from 'react-native';
import * as Crypto from 'expo-crypto';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../styles';

const Encryption = (props) => {

  
  const [ipValue, setIpValue] = useState([]);
  const [foo, setFoo] = useState('');
  const [checksum, setSHA256] = useState('');
  const { onPressEncrypt, titleEncrypt = 'Go'} = props;

  //useref liknar useState men triggar inte en ny render när sidan laddas om.
  const fadeAnim = useRef(new Animated.Value(0)).current;

//#region Load values

  //Funktion som bestämmer att något ska hända under ett tidsintervall av 3 s.
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.95,
      duration: 5000,
      useNativeDriver: true 
    }).start();
  };

  //Finns förklarad på IpAdress.js med en liten skillnad här på denna sida att i slutet kallar loadValueFromAsyncStorage
  //på en funktion som rensar konstiga tecken från utskriften.
  const loadValueFromAsyncStorage = async () => {
    try {
      let nullValue = await AsyncStorage.getItem("Key");
      if (nullValue !== null) {
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (error, stores) => {
            if (stores !== null) {
              stores.map((result, i, store) => {
                // console.log({ [store[i][0]]: store[i][1] });
                //sparar allt i useState                
                setIpValue(store);
                return true;
              });
            } else {
              console.log("stored value is null");
            }
          });
        });
      } //end if
      else {
        Alert.alert("Array is empty", "please store values to proceed");
      }
    } catch (e) {
      alert(e);
    }finally{
      removeUnwantedCharactersFromString();
    }
  };

  //Finns förklarad på saveScreen.js
  const removeUnwantedCharactersFromString = () => {

    ipValue.forEach(function (object) {
      var key = Object.keys(object)[1];
      console.log(object[key]);
      const tell = object[key]
      const newstring = tell.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, " ").replace(/,/g, ',\n');
      console.log("data" + newstring);
      setFoo(newstring);
      console.log(foo);
    });
  }

//#endregion

//#region Encrypt 

  //UseEffect kallar på loadValueFromAsyncStorage endast en gång när sidan startas.
  useEffect(() => {
    loadValueFromAsyncStorage();
  }, [foo]);
  
  //Funktionen använder expo-crypto från https://docs.expo.dev/versions/v44.0.0/sdk/crypto/
  //som tillåter att kryptera(hasha) data. I mitt fall skickar jag in det formaterade 
  //värdet från state foo och får ut en checksumma och tillslut kallar på fadeIn 
  //funktion för animeringen. Checksumman går inte att avkryptera utan det är en
  //hash. Det går att se med checksumman om någon förändring skett på krypterade informationen
  //för att se om den är legitim.
  const EncryptValues = () => {

    (async () => {
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        foo
      );
      Alert.alert('Data encrypted successfully!', );
      console.log('Digest: ', digest);
      setSHA256(digest);
      fadeIn();
     
    })();

  }


  //#endregion
 
  return (
    //bakgrundsfärg, i fallet om bilden inte laddar.
    <View style={{ flex: 1, backgroundColor: 'rgba(100,22,2,0.5)' }}>
      
      <ImageBackground
        source={require("../assets/B-Enc2.jpg")}
        style={styles.ImgSaveE3}
        resizeMode="cover"
      >

    <View style={{justifyContent: 'center', alignItems: 'center'}}>

      <View style={styles.ImgSaveE}>


      <View style={{marginBottom: 20, marginTop: 20, marginLeft: 10,}}>

            <Text style={styles.DisplayText}>Press Here to Encrypt data stored on device </Text>
        
        <Pressable
          onPress={EncryptValues}
          style={styles.btnEnc}
          android_ripple={{ color: "lightblue" }}
        >

          <Text style={styles.ButtonText}>{titleEncrypt}</Text>

        </Pressable>

      </View>

      </View>


    </View>

    {/* animering vid knapptryck */}
    <Animated.View style={[ styles.TextFadeEnc, { opacity: fadeAnim }]}>


      <View style = {styles.ImgSaveE}>

      <View style={{marginTop: 30, marginLeft: -22}}>
        
        <Text style={{color: 'blue', fontWeight: 'bold', marginRight: 50, marginLeft: 50, fontSize: 22}}>Checksum {'>'} {checksum}</Text>
      
      </View>

      </View>
 
    
    </Animated.View>

    </ImageBackground>

    </View>
  );
}
export default Encryption;
