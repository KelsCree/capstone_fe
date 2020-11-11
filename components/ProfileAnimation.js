import React, { useState, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function ProfileAnimation(){


  return(
    <LottieView
    source={require('../assets/profile.json')}
    loop={false}
    autoplay={true}
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