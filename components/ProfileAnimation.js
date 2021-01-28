import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export default function ProfileAnimation(){

  return(
    <LottieView
    source={require('../assets/loading.json')}
    autoPlay
    loop={false}
    style={styles.profilepic}
/>
  )
}

const styles = StyleSheet.create({
  profilepic: {
    width: scale(70),
    alignSelf: 'center',
  }
})