import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Button, Image, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faHome, faBriefcase, faVoteYea, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Collapsible from 'react-native-collapsible';
import LottieView from 'lottie-react-native';


export default function CandidateBio ({ id, user, setBioVisible, addLike }) {

  const animation = useRef(null)
  const animation2 = useRef(null)

  const [candidateInfo, setCandidateInfo] = useState({})
  const [isOfficeCollapsed, setIsOfficeCollapsed] = useState(true)
  const [isPersonalCollapsed, setIsPersonalCollapsed] = useState(true)
  const [isElectionCollapsed, setIsElectionCollapsed] = useState(true)

  const baseURL = 'http://localhost:3000'
  const [justLiked, setJustLiked] = useState(false)
  const [justDisliked, setJustDisliked] = useState(false)

  useEffect(() => {
    fetch(`${baseURL}/candidates/bio/${id}`)
      .then(response => response.json())
      .then((results) => setCandidateInfo(results))
  }, [])


  const handleLike = () => {
    addLike(id)
    console.log('like handled')
  }

  const handleDislike = () => {
    addDislike(id)

  }

  const renderBio = (candidateInfo) => {
    return(
    <View style={styles.infoContainer}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => setBioVisible(false)}
        accessibilityLabel="Press to go back.">
        <FontAwesomeIcon icon={ faChevronLeft } size={scale(22)} color='#1D3557'/>
      </TouchableOpacity>
      {candidateInfo.bio.candidate.photo 
        ? <Image style={styles.headshot} resizeMode='contain' source={{ uri: candidateInfo.bio.candidate.photo ,}}/> 
        : <Text>"No photo provided"</Text>}
        <Text style={styles.ballotName}>{candidateInfo.bio.candidate.firstName} {candidateInfo.bio.candidate.lastName}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', margin: scale(8)}}>
          <TouchableWithoutFeedback
            style={styles.thumbsup}
            onPress={(loadedAnimation) => {
              loadedAnimation = animation2.current.play()
              handleLike()
            }}>
            <LottieView
              ref={animation2}
              source={require('../assets/thumbsup3.json')}
              loop={false}
              style={styles.lottieview}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={styles.thumbsdown}
            onPress={(loadedAnimation) => {
              loadedAnimation = animation.current.play()
            }}>
            <LottieView
              ref={animation}
              source={require('../assets/thumbsup3.json')}
              loop={false}
              style={styles.lottieview}
            />
          </TouchableWithoutFeedback>
        </View>
      <SafeAreaView>
        <ScrollView>
      {candidateInfo.bio.office ? 
        <>
        <TouchableOpacity onPress={() => setIsOfficeCollapsed(!isOfficeCollapsed)}>
          <View style={styles.headerRow} flexDirection='row'>
            <FontAwesomeIcon icon={ faBriefcase } size={scale(15)} color='#1D3557'/>
            <Text style={styles.heading}>  Office Information </Text>
            {isOfficeCollapsed 
            ? <FontAwesomeIcon icon={ faChevronRight } size={scale(12)} style={styles.icon} color='#457B9D'/>
            : <FontAwesomeIcon icon={ faChevronDown } size={scale(12)} style={styles.icon} color='#457B9D'/>}
          </View>
        </TouchableOpacity>
          <Collapsible collapsed={isOfficeCollapsed}>
            <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Title:</Text><Text style={styles.info}> {candidateInfo.bio.office.title} - {candidateInfo.bio.office.type} </Text></View>
            <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>District:</Text><Text style={styles.info}> {candidateInfo.bio.office.district} </Text></View>
            <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Party:</Text><Text style={styles.info}>{candidateInfo.bio.office.parties} </Text></View>
            <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Status:</Text><Text style={styles.info}> {candidateInfo.bio.office.status} </Text></View>
            <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Last Elected:</Text><Text style={styles.info}> {candidateInfo.bio.office.lastElect} </Text></View>
          </Collapsible>
        </>
       : null }
      {candidateInfo.bio.election ?
          <>
            <TouchableOpacity onPress={() => setIsElectionCollapsed(!isElectionCollapsed)}>
              <View flexDirection='row' style={styles.headerRow}>
                <FontAwesomeIcon icon={ faVoteYea } size={scale(16)} color='#1D3557'/>
                <Text style={styles.heading}>  Election Information </Text>
                {isElectionCollapsed 
            ? <FontAwesomeIcon icon={ faChevronRight } size={scale(12)} style={styles.icon} color='#457B9D'/>
            : <FontAwesomeIcon icon={ faChevronDown } size={scale(12)} style={styles.icon} color='#457B9D'/>}
              </View>
            </TouchableOpacity>
              <Collapsible collapsed={isElectionCollapsed}>
              <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Office:</Text><Text style={styles.info}>{candidateInfo.bio.election.office} </Text></View>
              <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Party:</Text><Text style={styles.info}>{candidateInfo.bio.election.parties} </Text></View>
              <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Status:</Text><Text style={styles.info}> {candidateInfo.bio.election.status} </Text></View>
            </Collapsible>
          </>
      : null }
      <TouchableOpacity onPress={() => setIsPersonalCollapsed(!isPersonalCollapsed)}>
        <View flexDirection='row' style={styles.headerRow}>
          <FontAwesomeIcon icon={ faHome } size={scale(16)} color='#1D3557'/>
          <Text style={styles.heading}>  Personal Information </Text>
          {isPersonalCollapsed 
            ? <FontAwesomeIcon icon={ faChevronRight } size={scale(12)} style={styles.icon} color='#457B9D'/>
            : <FontAwesomeIcon icon={ faChevronDown } size={scale(12)} style={styles.icon} color='#457B9D'/>}
        </View>
      </TouchableOpacity>
        <Collapsible collapsed={isPersonalCollapsed}>
          <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Birthdate:</Text><Text style={styles.info}> {candidateInfo.bio.candidate.birthDate}</Text></View>
          <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Family:</Text><Text style={styles.info}> {candidateInfo.bio.candidate.family}</Text></View>
          <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Hometown:</Text><Text style={styles.info}>{candidateInfo.bio.candidate.homeCity}, {candidateInfo.bio.candidate.homeState}</Text></View>
          <View style={{flexDirection:'row'}}><Text style={styles.infoTitle}>Religion:</Text><Text style={styles.info}>{candidateInfo.bio.candidate.religion}</Text></View>
        </Collapsible>
        </ScrollView>
      </SafeAreaView>
    </View>
    )}

  return(
      <>
      {candidateInfo.bio
      ? renderBio(candidateInfo)
      : <LottieView
          source={require('../assets/loading.json')}
          loop={true}
          autoplay={true}
          style={styles.loading}
        />}
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  back: {
    margin: scale(10)
  },
  headshot: {
    alignSelf: 'center',
    width: scale(110),
    height: scale(135),
    margin: scale(8),
    borderColor: '#1D3557',
    borderWidth: scale(4),
    borderRadius: scale(5),
  },
  infoContainer: {
    flex: 1,
    width: scale(300)
  },
  ballotName: {
    fontSize: scale(25),
    fontWeight: 'bold',
    padding: scale(3),
    color: '#1D3557',
    textAlign: 'center'
  },
  info: {
    fontSize: scale(15),
    color: '#1D3557',
    marginTop: scale(3),
    flex: 1,
    flexWrap: 'wrap'
  },
  infoTitle: {
    fontSize: scale(15),
    color: '#1D3557',
    margin: scale(3),
    fontWeight: 'bold',
  },
  heading: {
    fontSize: scale(17),
    fontWeight: 'bold',
    // padding: scale(3),
    // margin: scale(5),
    color: '#457B9D',
    textAlign: 'left'
  },
  headerRow: {
    margin: scale(8),
    alignItems: 'center',
  },
  thumbsup: {
    minWidth: scale(90),
    minHeight: scale(90),
  },
  thumbsdown: {
    transform: [{ rotate: '180deg' }],
    minWidth: scale(90),
    minHeight: scale(90)
  },
  lottieview: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  loading: {
    width: scale(150)
  }
});
