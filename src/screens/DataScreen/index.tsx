import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, SafeAreaView, TextInput, FlatList, ScrollView, TouchableHighlight, Modal, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addMeasure, setMeasureError } from '../../store/actions/measureActions';
import { SET_YEASSELECTED, User } from '../../store/types';
import firebase from '../../firebase/config';
import measureReducer from '../../store/reducers/measureReducer';
import { useLinkBuilder } from '@react-navigation/native';
import {
  PieChart,
} from 'react-native-chart-kit'


const Data = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    // const { yeas } = useSelector((state: RootState) => state.measure);
    const [modalVisible, setModalVisible] = useState(false);
    const [measure, setMeasure] = useState('');
    const [description, setDescription] = useState('');
    const [yeasSelect, setyeasSelected] = useState('');
    const [id, setId] = useState('');
    const [yeas, setYeas] = useState(0);
    const [neas, setNeas] = useState(0);
    const [selected, setSelected] = useState('');
    // const [yeasSelected, setyeasSelected] = useState([]);
    const [measureList, setMeasureList] = useState(Array());
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.measure);

    const User =  firebase.auth().currentUser?.uid
    

    //dispatch adding measure error
    useEffect(() => {
        return () => {
          if(error) {
            dispatch(setMeasureError(''));
          }
        }
      }, [error, dispatch]);

      //submit handler adding new ballot measure
      const submitHandler = (measure: string, description: string, id: string, yeas: number, neas: number, createdAt: any ) => {
        if(error) {
          dispatch(setMeasureError(''));
        }
         if (measure.length > 0) {
        dispatch(addMeasure(measure, description, id, yeas, neas, createdAt, error));
        }
      }



      //get measure array items for flatlist
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


       
  
        
      
        

      
     //flatlist items structure
      const Item = ({ measure, description, yeas, neas, onNeasPress, onYeasPress, style, stylen}) => (
        <View style={styles.item} >
          <Text style={styles.title} >{measure}</Text>
            <PieChart
            data={measure}
            width={80}
            height={220}
            // chartConfig={chartConfig}
            accessor= {yeas}
            backgroundColor="transparent"
            paddingLeft="15"
            />
        </View>
      );

  
      
      //render item for flatlist, plus firebase call to update yeas and neas count
      const renderItem   =  ({ item })  => {
   
        return(
          
        <Item measure={item.measure} description={item.description} yeas={item.yeas} neas={item.neas}   />
      )
      
        }

        
   return (
        
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.headingA}>Ballot Measures</Text>
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
        <View style = {styles.modal}>
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
                placeholder="enter ballot measure name"
                style={styles.textInput}
                onChangeText={(text) => setMeasure(text)}
            />
            <TextInput
                value={description}
                placeholder="enter ballot measure description"
                style={styles.textInput}
                onChangeText={(text) => setDescription(text)}
            />
             <Text style={styles.measureButton} onPress={() => {submitHandler( measure, description, id, neas, yeas, selected ); setModalVisible(!modalVisible)}}>Add Measure</Text>
             <Text style={styles.homeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Back to Home</Text>
        </Text>
          </View>
      </Modal>
      </View>
   </SafeAreaView>
   
    )
}

export default Data

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
    headingA: {
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
    // borderColor: 'black',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // disabled: true
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
    // opacity: 0.1,
  },
  text: {
    fontSize: 20,
    paddingBottom: 20,
  },
  heading: {
    paddingTop: 40,
    textAlign: 'center',
    fontFamily: 'alex-brush',
    fontSize: 40,
    backgroundColor: '#ffffff',
},
})







