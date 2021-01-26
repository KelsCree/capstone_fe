import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons'

export default function CreateAccount({ signup, alerts, login }) {
  const baseURL = 'http://localhost:3000'
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loginScreen, setLoginScreen] = useState(false)


  const handleSubmit = (event) => {
    let user = {
      username,
      password
    }
    !loginScreen ?
    login(user) 
    : signup(user)
  }

  const image = { uri: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1482&q=80" }

  const handleLoginForm = () => {
    setLoginScreen(!loginScreen)
  }


  const showAlerts = () => alerts.map(alert => <Text style={styles.alert}>{alert}</Text>)

  return(
    <View style={styles.container}>
      <ImageBackground style= {styles.backgroundImage} source={image}>
      <View style={styles.form}>
      { loginScreen
        ? <Text style={styles.heading}>Sign Up</Text>
        : <Text style={styles.heading}>Log In</Text>}
        <View style={styles.inputView}>
          <FontAwesomeIcon icon={ faUser } size={scale(20)} style={styles.icon} color='#1D3557'/>
          <TextInput style={styles.input} placeholder='Username' placeholderTextColor='#457B9D' onChangeText={setUserName} value={username}/>
        </View>
        <View style={styles.inputView}>
          <FontAwesomeIcon icon={ faUnlockAlt } size={scale(20)} style={styles.icon} color='#1D3557'/>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholderTextColor='#457B9D' placeholder='Password' secureTextEntry={true}/>
        </View>
        {alerts ? showAlerts() : null}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          color="#841584">
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        { loginScreen ? 
        <View style={styles.question}>
          <Text style={styles.labels}>Already registered?</Text>
          <TouchableOpacity style={styles.switchButton} onPress={handleLoginForm}>
            <Text style={styles.switchButtonText}>Log In</Text>
          </TouchableOpacity></View>
        : <View style={styles.question}>
            <Text style={styles.labels}>Not Registered?</Text>
            <TouchableOpacity style={styles.switchButton} onPress={handleLoginForm}>
              <Text style={styles.switchButtonText}>Create an Account</Text>
            </TouchableOpacity>
          </View>}
      </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  input: {
    borderStyle: 'solid',
    borderBottomWidth: scale(1),
    borderBottomColor: '#1D3557'
  },
  heading: {
    fontSize: scale(30),
    fontWeight: 'bold',
    margin: scale(15),
    marginLeft: scale(45),
    marginBottom: scale(60),
    color: '#1D3557',
    alignSelf: 'flex-start'
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#A8DADC',
    minWidth: scale(200),
    marginLeft: scale(5),
    margin: scale(5),
    borderRadius: scale(5),
    minHeight: scale(20),
    fontSize: scale(20),
    textAlign: 'left',
    padding: scale(5),
    color: '#1D3557',
    },
    button: {
      padding: scale(5),
      backgroundColor:'#1D3557',
      borderRadius: scale(5),
      margin: scale(15),
      marginTop: scale(50),
      minWidth: scale(250),
      height: scale(50),
      justifyContent: 'center',
      shadowOffset:{  width: 2,  height: 2,  },
      shadowColor: '#1D3557',
      shadowOpacity: scale(.4),
    },
    switchButton: {
      padding: scale(8),
      borderRadius: scale(5),
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: scale(20),
      padding: scale(1),
      textAlign: 'center'
    },
    switchButtonText: {
      color: '#457B9D',
      fontSize: scale(15),
      fontWeight: 'bold',
      textAlign: 'center'
    },
    labels: {
      fontSize: scale(20),
      color: '#1D3557'
    },
    alert: {
      color: '#E63946',
      fontSize: scale(15),
      margin: scale(10)
    },
    form: {
      alignItems: 'center',
      // justifyContent: 'center',
      // margin: scale(5),
      // shadowOffset:{  width: 10,  height: 10,  },
      // shadowColor: '#1D3557',
      // shadowOpacity: scale(.5),
      margin: scale(8)
    },
    icon: {
      margin: scale(8),
      shadowOffset:{  width: 2,  height: 2,  },
      shadowColor: '#1D3557',
      shadowOpacity: scale(.4),
    },
    inputView: {
      flexDirection: 'row', 
      alignItems: 'center', 
      margin: scale(8),
      borderBottomColor: '#1D3557',
      borderBottomWidth: scale(1),
    },
    question: {
      margin: scale(5),
      justifyContent: 'center',
      alignItems: 'center'
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      resizeMode: "cover",
      justifyContent: "center"
    }
})