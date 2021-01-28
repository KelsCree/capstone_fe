import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import CandidateBio from './CandidateBio';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function ViewCandidates({ addLike, user }) {

  const [zipCode5, setZipCode5] = useState()
  const [zipCode4, setZipCode4] = useState()
  const [candidateList, setCandidateList] = useState([])
  const [candidateId, setCandidateId] = useState(0)
  const [bioVisible, setBioVisible] = useState(false)
  const baseURL = 'http://localhost:3000'

  const Item = ({ item }) => (
    <TouchableOpacity
    style={styles.item}
    key={item.id}
    onPress={() => selectCandidate(item)}>
      <Text style={styles.ballotName}>{item.ballotName}</Text>
      <Text style={styles.info}>{item.electionParties} Party</Text>
      <Text style={styles.info}>{item.electionOffice}</Text>
    </TouchableOpacity>
  )

  const selectCandidate = (item) => {
    setCandidateId(item.candidateId)
    setBioVisible(true)
  }

  const renderItem = ({item}) => {
    return(
      <Item key={item.id} item={item}/>
    )
  }

  const getCandidates = (zipCode5, zipCode4) => {
    (zipCode4 ? 
    fetch(`${baseURL}/candidates/zipfull/${zipCode5}/${zipCode4}`) :
    fetch(`${baseURL}/candidates/zip/${zipCode5}`))
      .then(response => response.json())
      .then(data => setCandidateList(data.candidateList.candidate))
  }

  return(
    <View style={styles.container}>
      {bioVisible && candidateId !==0 
      ? <CandidateBio id={candidateId} setBioVisible={setBioVisible} user={user} addLike={addLike}/> 
      :<>
      <Text style={styles.heading}>Candidates</Text>
      <Text style={styles.directions}>Enter zip code to see who's running for office:</Text>
      <View style={styles.zipContainer}>
        <TextInput style={styles.input1} onChangeText={setZipCode5} value={zipCode5} placeholder={'5 Digit Zip'}/>
        <TextInput style={styles.input2} onChangeText={setZipCode4} value={zipCode4} placeholder={'+ 4'}/>
        <TouchableOpacity
          onPress={(event) => getCandidates(event, zipCode5, zipCode4)}
          style={styles.button}
          accessibilityLabel="Enter your zip code to view your candidates.">
            <FontAwesomeIcon style={styles.icon} icon={ faSearch } size={scale(23)} color='#FFFFFF'/>
          </TouchableOpacity>
        </View>
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          title
          style={styles.list}
          extraData={candidateList}
          data={candidateList}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={renderItem}/>
      </SafeAreaView>
      </>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input1: {
    borderStyle: 'solid',
    borderColor: '#1D3557',
    borderRightWidth: scale(1),
    width: scale(100),
    fontSize: scale(15),
    textAlign: 'center',
    color: '#1D3557',
    height: scale(35),
    padding: scale(5)
    },
  input2: {
    borderStyle: 'solid',
    borderLeftWidth: scale(1),
    borderColor: '#1D3557',
    width: scale(80),
    fontSize: scale(15),
    textAlign: 'center',
    color: '#1D3557',
    height: scale(35),
    padding: scale(5)
  },
  item: {
    borderRadius: scale(8),
    backgroundColor: '#FFFFFF',
    padding: scale(15),
    margin: scale(5),
    alignItems: 'center',
    shadowOffset:{  width: 2,  height: 2,  },
    shadowColor: '#1D3557',
    shadowOpacity: scale(.4),
  },
  heading: {
    fontSize: scale(25),
    fontWeight: 'bold',
    margin: scale(10),
    color: '#1D3557'
  },
  button: {
    padding: scale(6),
    backgroundColor:'#1D3557',
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(15),
    padding: scale(1),
    marginLeft: scale(5)
  },
  zipContainer: {
    borderRadius: scale(5),
    flexDirection: 'row',
    margin: scale(15),
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset:{  width: 2,  height: 2,  },
    shadowColor: '#1D3557',
    shadowOpacity: scale(.4),
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderColor: '#1D3557',
    borderWidth: scale(1),
  },
  listContainer: {
    width: scale(250),
    padding: scale(10)
  },
  ballotName: {
      fontSize: scale(15),
      fontWeight: 'bold',
      padding: scale(3),
      color: '#1D3557',
      textAlign: 'center'
  },
  info: {
    fontSize: scale(12),
    color: '#1D3557'
  },
  directions: {
    fontSize: scale(15),
    color: '#1D3557'
  },
  buttonRow: {
    flexDirection: 'row',
  },
  icon: {
    margin: scale(0),
    alignSelf: 'flex-end'
  }
})