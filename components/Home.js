import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './CreateAccount';
import ViewCandidates from './ViewCandidates';
import ViewOfficials from './ViewOfficials';
import ViewElections from './ViewElections';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPersonBooth, faBullhorn, faFlagUsa, faUserCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { scale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

export default function Home({ addLike, alerts, login, navigation, user, signup, setUser, setLikedCandidates, setDislikedCandidates, likedCandidates, dislikedCandidates }) {
  const baseURL = 'http://localhost:3000'


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesomeIcon icon={ faUserCircle } style={{margin: scale(18)}} size={scale(28)} color='#FFFFFF' onPress={() => navigation.navigate('Profile')} />
      ),
    });
  }, [navigation]);
  
  return(
      <Tab.Navigator tabBarOptions={{
          style: styles.container,
          activeTintColor: '#A8DADC',
          inactiveTintColor: '#FFFFFF',
          activeBackgroundColor: '#1D3557',
          inactiveBackgroundColor: '#1D3557',
          labelStyle: {
            fontSize: scale(15),
            paddingBottom: scale(6),

          },
          style: {
            height: scale(85)
          }
      }}>

        { !user.username ? 
          (<Tab.Screen name="Sign in to get started"
          tabStyle={styles.login}
          options={{
          tabBarIcon: ({ focused }) => (
          <FontAwesomeIcon icon={ faSignInAlt } size={scale(22)} style={styles.icon} color={ focused ? '#A8DADC': '#FFFFFF'}/>)}}>
            {(props) => <CreateAccount
            user={user}
            alerts={alerts}
            setUser={setUser}
            setLikedCandidates={setLikedCandidates}
            setDislikedCandidates={setDislikedCandidates}
            signup={signup}
            login={login}
            likedCandidates={likedCandidates}
            dislikedCandidates={dislikedCandidates}
            {...props} />}
          </Tab.Screen>)
        :
        <><Tab.Screen name="Candidates"
            tabStyle={styles.tabBar}
            options={{
              tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon icon={ faBullhorn } size={scale(22)} color={ focused ? '#A8DADC': '#FFFFFF'}/>)}}>
              {(props) => <ViewCandidates
                user={user}
                addLike={addLike}
                alerts={alerts}
                setUser={setUser}
                setLikedCandidates={setLikedCandidates}
                setDislikedCandidates={setDislikedCandidates}
                signup={signup}
                login={login}
                likedCandidates={likedCandidates}
                dislikedCandidates={dislikedCandidates}
                {...props} />}
          </Tab.Screen>
        <Tab.Screen name="Officials"
          options={{ tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={ faFlagUsa } size={scale(22)} color={ focused ? '#A8DADC': '#FFFFFF'}/>)}}>
            {(props) => <ViewOfficials
              user={user}
              addLike={addLike}
              alerts={alerts}
              setUser={setUser}
              setLikedCandidates={setLikedCandidates}
              setDislikedCandidates={setDislikedCandidates}
              signup={signup}
              login={login}
              likedCandidates={likedCandidates}
              dislikedCandidates={dislikedCandidates}
              {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Elections"
          options={{ tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={ faPersonBooth } size={scale(22)} color={ focused ? '#A8DADC': '#FFFFFF'}/>)}}>
              {(props) => <ViewElections
              user={user}
              addLike={addLike}
              alerts={alerts}
              setUser={setUser}
              setLikedCandidates={setLikedCandidates}
              setDislikedCandidates={setDislikedCandidates}
              signup={signup}
              login={login}
              likedCandidates={likedCandidates}
              dislikedCandidates={dislikedCandidates}
              {...props} />}
        </Tab.Screen></>}
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(3)
  },
  login: {
    paddingBottom: scale(5)
  }

})