import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, SafeAreaView, TextInput, FlatList, ScrollView, TouchableHighlight, Modal, Alert, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addMeasure, setMeasureError } from '../../store/actions/measureActions';
import { User } from '../../store/types';
import firebase from '../../firebase/config';
import measureReducer from '../../store/reducers/measureReducer';

const Home = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    // const { yeas } = useSelector((state: RootState) => state.measure);
    const [modalVisible, setModalVisible] = useState(false);
    const [measure, setMeasure] = useState('');
    const [id, setId] = useState('');
    const [yeas, setYeas] = useState(0);
    const [neas, setNeas] = useState(0);
    const [pressed, setPress] = useState(false);
    const [measureList, setMeasureList] = useState(Array());
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.measure);

    // console.log(measure);
    useEffect(() => {
        return () => {
          if(error) {
            dispatch(setMeasureError(''));
          }
        }
      }, [error, dispatch]);


      useEffect(() => {
        const subscriber = firebase.firestore()
          .collection('measures')
          .onSnapshot(querySnapshot => {
            const measureList = Array();
            querySnapshot.forEach(documentSnapshot => {
              measureList.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setMeasureList(measureList);
            // console.log(measureList);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, Array());



      const submitHandler = (measure: string, id: string, yeas: number, neas: number ) => {
        if(error) {
          dispatch(setMeasureError(''));
        }
         if (measure.length > 0) {
        dispatch(addMeasure(measure, id, yeas, neas, error));
        
        
        }
      }
      
     
     
      const Item = ({ measure, yeas, neas, onNeasPress, onYeasPress}) => (
       
        
        <View style={styles.item} >
          <Text style={styles.title} >{measure}</Text>
          <View style={{flexDirection: "row"}}>
          <Text style={{paddingRight: 5}}>Yeas</Text>

          <TouchableOpacity onPress={onYeasPress}  >
          <View style={pressed == true ? styles.pressedMyButton : styles.myButton}>
            
          </View>
          </TouchableOpacity>
         <Text style={{paddingLeft: 5}}>{yeas}</Text>
         <Text style={{marginLeft: 20, paddingRight: 5}}>Neas</Text>

          <TouchableOpacity onPress={onNeasPress} >
          <View style={pressed == true ? styles.pressedMyButton : styles.myButton}>
            
          </View>
          </TouchableOpacity>
         <Text style={{paddingLeft: 5}}>{neas}</Text>
         </View>
        </View>
         
        
      );
      

      const renderItem = ({ item })  => {
        const updateYeas = () =>  { if(item.neas === 0) { firebase.firestore().collection('/measures').doc(item.id).update({yeas: firebase.firestore.FieldValue.increment(1)})}
          // firebase.firestore().collection('/measures').doc(item.id).update({neas: firebase.firestore.FieldValue.increment(0)})} 
          else {firebase.firestore().collection('/measures').doc(item.id).update({yeas: firebase.firestore.FieldValue.increment(1)}), 
          firebase.firestore().collection('/measures').doc(item.id).update({neas: firebase.firestore.FieldValue.increment(-1)})}};
    
        const updateNeas = () => { if(item.yeas === 0) {firebase.firestore().collection('/measures').doc(item.id).update({neas: firebase.firestore.FieldValue.increment(1)})} else { firebase.firestore().collection('/measures').doc(item.id).update({neas: firebase.firestore.FieldValue.increment(1)}), firebase.firestore().collection('/measures').doc(item.id).update({yeas: firebase.firestore.FieldValue.increment(-1)})}};
        // const backgroundColor = item.id === id ? updateYeas : "#f9c2ff";
        return(
          
        <Item measure={item.measure} yeas={item.yeas} neas={item.neas} onYeasPress={() => {setId(item.id), updateYeas() }} onNeasPress={() => {setId(item.id), updateNeas() }}  />
        
      )
      
        }

      
   return (
        
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.heading}>Ballot Measures</Text>
        <FlatList style={{ width: 375 }}
          data={measureList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={setId}
    />
    
    </View>
        <Text style={styles.button}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text>Add a ballot measure</Text>
        </Text>

    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        >
        
        
        <View style={styles.txtHomeScreenContainer}>
        <Text style={[styles.heading]}>We The People</Text>
        
        {/* <Text style={styles.txtError}>{error} </Text> */}
        <TextInput
                value={measure}
                placeholder="enter a ballot measure"
                style={styles.textInput}
                onChangeText={(text) => setMeasure(text)}
            />
             <Text style={styles.measureButton} onPress={() => {submitHandler( measure, id, neas, yeas ); setModalVisible(!modalVisible)}}>Add Measure</Text>
             <Text style={styles.homeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Back to Home</Text>
        </Text>
          </View>
      </Modal>
   </SafeAreaView>
   
    )
}

export default Home

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        color: 'black',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 0,
        backgroundColor: '#ffffff',
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 2,
        marginBottom: 10,
        padding: 10,
        width: '70%',
        
    },
    textInputContainer: {
        width: '100%',
        marginTop: 0
    },
    button: {
        marginTop: 20,
        borderColor: '#d00909',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 100,
    },
    measureButton: {
      marginTop: 0,
      borderColor: '#d00909',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
  },
    homeButton: {
      marginTop: 0,
      borderColor: '#d00909',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
  },
    txtHomeScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        width: '100%',
        marginBottom: 250,
    },
    txtError: {
        color: '#d00909',
        marginTop: 15,
        marginBottom: 10
    },
    list: {
      flex: 1,
    },
    listItems: {
      height: 20, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    item: {
      backgroundColor: '#ffffff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 2,
      borderColor: 'grey',
      borderStyle: 'solid',
      borderWidth: 1,
      alignItems: 'center', 
      justifyContent: 'center',
    },
    title: {
      fontSize: 22,
      paddingBottom: 20,
    },
    heading: {
      paddingTop: 0,
      textAlign: 'center',
      fontSize: 25,
      backgroundColor: '#ffffff',
  },
  myButton:{
    padding: 5,
    height: 20,
    width: 40,  //The Width must be the same as the height
    borderRadius:1000, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  pressedMyButton:{
    padding: 5,
    height: 20,
    width: 40,  //The Width must be the same as the height
    borderRadius:1000, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'black',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  
})







