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
import { PieChart } from 'react-native-svg-charts'



const Data = () => {
  //user root state
    const { user } = useSelector((state: RootState) => state.auth);
    //measure id state
    const [id, setId] = useState('');
    //measure array list
    const [measureList, setMeasureList] = useState(Array());
    //dispatch
    const dispatch = useDispatch();
    //error root state
    const { error } = useSelector((state: RootState) => state.measure);
    //get current user
    const User =  firebase.auth().currentUser?.uid
    

      //get measure array items for pie charts
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


       
  
        
      
        

      
     //piechart items structure
      const Item = ({ measure}) => (
        <View style={styles.item} >
          <Text style={styles.title} >{measure}</Text>
      </View>
        
      );

  
      
      //render item and pie chart settings
      const renderItem   =  ({ item })  => {
        const data = [item.yeas,item.neas]
        const colors = ['#d00909', '#000000']
        const pieData = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                  fill: colors[index] ,
                    
                },
               
                key: `pie-${index}`,
            }))

          
        return(
          //return item and piechart views
          <>
          <Item measure={item.measure} />
          <PieChart style={{ height: 250,marginTop:0, marginBottom:50, shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,}} data={pieData} outerRadius={'70%'}
                innerRadius={10}  />
       
        </>
      )
      
        }

        
   return (
       //main data page view structure 
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.headingA}>Ballot Measures</Text>
        <Text style={styles.headingB}>Red:Yeas Black:Neas</Text>
        <FlatList style={{ width: 375 }}
          data={measureList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={setId}
    />
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
      paddingTop: 20,
      marginVertical: 0,
      marginHorizontal: 2,
      alignItems: 'center', 
      justifyContent: 'center',
    },
    title: {
      fontSize: 22,
      paddingBottom: 0,
      marginBottom: 0
    },
    headingA: {
      paddingTop: 0,
      textAlign: 'center',
      fontSize: 25,
      backgroundColor: '#ffffff',
  },
  headingB: {
    paddingTop: 0,
    textAlign: 'center',
    fontSize: 20,
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







