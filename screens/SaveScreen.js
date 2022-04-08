import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState , useEffect } from "react";
import { View, SafeAreaView, Text, Pressable, Alert, ImageBackground, FlatList, ScrollView } from 'react-native';
import styles from '../styles';
import { useFocusEffect } from '@react-navigation/native';


const savedScreen = (props ) => {

  const [ipValue, setIpValue] = useState([]);
  const [foo, setFoo] = useState('');
  const [loading, setLoading] = useState(false);


//#region load/remove

  //funktion som laddar in värde från AsyncStorage.
  //skapar en tom variabel, hämtar värde från asyncstorage med tillhörande key
  //och spara värdet i variabeln.
  //Kollar om värdet inte är tomt, hämtar alla tillhörande keys.
  //Kollar om array i asyncstorage inte är tomt. Sparar värdet i state.
  //Tillslut kallar på removeUnwantedCharactersFromString();
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
              // console.log("stored value is null");
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
          
      setLoading(true)

      removeUnwantedCharactersFromString();

    }
  };

  //kallar på loadValueFromAsyncStorage med useFocusEffect för att visa värden direkt när sidan startar. 
  useFocusEffect(
    
    React.useCallback(() => {
      
        loadValueFromAsyncStorage();
     
    } , [ipValue] )
  );


  //Funktionen använder en forEach loop, Object -> keys, som letar efter värden som tillhör nycklar.
  //i detta fall har varje nyckel en tillhörande array, som tillhandahåller information om ip-adressen,
  //för att värdet som sparas i asyncstorage är en array. 
  //Huvuduppgiften för denna funktion är att formatera strängen som ligger inuti den nestade arrayen. 
  //Det gör den med replace funktionen där den byter ut konstiga tecken mot " " och ny rad.  
  //Värdet får den från asyncstorage som sparas i en state som heter ipValue som får sitt värde från asyncStorage.
  const removeUnwantedCharactersFromString = () => {

    ipValue.forEach(function (object) {
    
      var key = Object.keys(object)[1];
    
      // console.log(object[key]);
      
      const tell = object[key]

      const newstring = tell.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, " ").replace(/,/g, ',\n');
      
      // console.log("data" + newstring);
      
      setFoo(newstring);
      
      // console.log(foo);

    });

  }

//#endregion


//#region Ta bort från AsyncStorage



  //Funktion som använder AsyncStorage inbyggda funktion clear
  //Tar bort Allt som sparats, och tillslut clearar states.
  removeValuesFromAsyncStorage = async () => {

    try {

      await AsyncStorage.clear();

    } catch (e) {

      alert(e + "Det går inte att cleara storage");

    } finally {

      setIpValue('');

      setFoo('');

      console.log("ipvale is not empty"+ipValue);
    }

    // console.log("Done.");
  };

  const {onPressRemove, titleRemove = 'Remove' } = props;


//#endregion

 
  return (

    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}
    >
      <ImageBackground
        source={require("../assets/SaveHome.jpg")}
        style={styles.TextSaveScreen}
        imageStyle={{ borderRadius: 25 }}
        resizeMode="cover"
      >
        <ScrollView style={{ flex: 1, margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue', }}>{foo}</Text>


        </ScrollView>
      </ImageBackground>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

        {/* remove from asyncstorage */}
        <Pressable
          style={styles.buttonSave}
          android_ripple={{ color: "lightblue" }}
          onPress={removeValuesFromAsyncStorage}
        >

          <Text onPress={onPressRemove} style={styles.ButtonText}>
            Remove
          </Text>
        </Pressable>


      </View>

    </View>

  );
};

export default savedScreen;


