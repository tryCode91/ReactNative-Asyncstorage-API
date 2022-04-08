import React, {useEffect} from 'react';
import { View, ImageBackground } from 'react-native';
import TextAnimator from './TextAnimator';
import styles from '../styles';
import * as Brightness from 'expo-brightness';


export default function App() {

//#region brightness

  //https://docs.expo.dev/versions/v44.0.0/sdk/brightness/
  //Android hårdvaru funktion som manipulerar ljusintensiteten för mobilen när den är inne på appen.
  //frågar först om tillåtelse från användaren sedan ändrar ljusstyrkan(0 till 1).
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(0.8);
      }
    })();
  }, []);

  //#endregion

  return (
    <View style={styles.TopLevelView}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/bakgrund2.jpg")}
        resizeMode="cover"
      >
        {/* animerad text */}
        <TextAnimator
          content="Välkommen till min app skapad av Petrus Dughem"
          textStyle={styles.textStyle}
          style={styles.containerStyle}
          duration={600}
        />
 
      </ImageBackground>
    </View>
  );
}

