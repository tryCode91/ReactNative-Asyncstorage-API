import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default class TextAnimator extends React.Component {

//#region animation

  //skapar en tom array
  animatedValues = [];

  //konstruktor som tar emot props som argument
  //tar emot array sedan och splittar och trimmar den
  constructor(props) {
    super(props);

    const textArr = props.content.trim().split(' ');

  
    //initierar animering för index
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.textArr = textArr;
  }

  //Startar animering vid sidladdning.
  componentDidMount() {
    this.animated();
  }

   //loopar igenom array och animerar varje värde i textArr.
  animated = (toValue = 1) => {
    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: this.props.duration,
        useNativeDriver: true
      });
    });

    //Använder stagger, dividerar tidsspannet med 5, tills värdet nått 0.
    //Animeringstid på 1 sekund. När animering är klar återgår till startposition.
    Animated.stagger(
      this.props.duration / 5,
      toValue === 0 ? animations.reverse() : animations
    ).start(() => {
      setTimeout(() => this.animated(toValue === 0 ? 1 : 0), 1000);
      if (this.props.onFinish) {
        this.props.onFinish();
      }
    });
  };
  
//#endregion

  render() {
    return (
      <View style={[this.props.style, styles.textWrapper]}>
        {this.textArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                this.props.textStyle,
                {
                  opacity: this.animatedValues[index],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        this.animatedValues[index],
                        new Animated.Value(-5)
                      )
                    }
                  ]
                }
              ]}
            >
              {word}
              {`${index < this.textArr.length ? ' ' : ''}`}
            </Animated.Text>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textWrapper: {
      flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});