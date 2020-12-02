import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, SafeAreaView, TextInput, FlatList, ScrollView, TouchableHighlight, Modal, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addMeasure, setMeasureError } from '../../store/actions/measureActions';
import firebase from '../../firebase/config';
import { Button, Icon, Input } from 'react-native-elements';



const Home = () => {
    //auth user root state
    const { user } = useSelector((state: RootState) => state.auth);
    //modal visable state
    const [modalVisible, setModalVisible] = useState(false);
    //measure state
    const [measure, setMeasure] = useState('');
    //measure description state
    const [description, setDescription] = useState('');
    //measure id state
    const [id, setId] = useState('');
    //measusere yeas state
    const [yeas, setYeas] = useState(0);
    //measure neas state
    const [neas, setNeas] = useState(0);
    //measure item selected state
    const [selected, setSelected] = useState('');
    //measure array state
    const [measureList, setMeasureList] = useState(Array());
    //dispatch
    const dispatch = useDispatch();
    //error root state
    const { error } = useSelector((state: RootState) => state.measure);

    //current user
    var User =  firebase.auth().currentUser?.uid!
   
    

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
          {/* Title name of measure */}
          <Text style={styles.title} >{measure}</Text>
          {/* description of measure */}
          <Text style={styles.text} >{description}</Text>
          {/* yeas and neas row with count */}
          <View style={{flexDirection: "row"}}>
          <Text style={{paddingRight: 5}}>Yeas</Text>

          <TouchableOpacity onPress={onYeasPress} >
          <View style={[styles.myButton, style]} >
            
          </View>
          </TouchableOpacity>
         <Text style={{paddingLeft: 5}}>{yeas}</Text>
         <Text style={{marginLeft: 20, paddingRight: 5}}>Neas</Text>

          <TouchableOpacity onPress={onNeasPress} >

          <View style={[styles.pressedMyButton, stylen]}>
            
          </View>
          </TouchableOpacity>
         <Text style={{paddingLeft: 5}}>{neas}</Text>
         </View>
        </View>
      );

  
      
      //render item for flatlist, plus firebase call to update yeas and neas count
      const renderItem   =  ({ item })  => {
      //update yeas count, plus add/remove user to select arrays
      const updateYeas = () =>  {  if(!result.includes(User) && !resultn.includes(User)) { firebase.firestore().collection('/measures').doc(item.id).update({yeas: firebase.firestore.FieldValue.increment(1)}),
              firebase.firestore().collection('/measures').doc(item.id).update({ yeasSelected: firebase.firestore.FieldValue.arrayUnion(User) })}
              else if(resultn.includes(User)){
                firebase.firestore().collection('/measures').doc(item.id).update({yeas: firebase.firestore.FieldValue.increment(1)}),
                firebase.firestore().collection('/measures').doc(item.id).update({neas: firebase.firestore.FieldValue.increment(-1)}),
                firebase.firestore().collection('/measures').doc(item.id).update({ yeasSelected: firebase.firestore.FieldValue.arrayUnion(User) }),
              firebase.firestore().collection('/measures').doc(item.id).update({ neasSelected: firebase.firestore.FieldValue.arrayRemove(User) })
              }
              else{}
            };
            
          
        //udpate yeas count and, plus add/remove user to select array
        const updateNeas = () => { if(!resultn.includes(User) && !result.includes(User) ) {firebase.firestore().collection('/measures').doc(item.id).update({neas: firebase.firestore.FieldValue.increment(1)}),
        firebase.firestore().collection('/measures').doc(item.id).update({ neasSelected: firebase.firestore.FieldValue.arrayUnion(User) })
        } 
        else if(result.includes(User)){
          firebase.firestore().collection('/measures').doc(item.id).update({neas: firebase.firestore.FieldValue.increment(1)}),
          firebase.firestore().collection('/measures').doc(item.id).update({yeas: firebase.firestore.FieldValue.increment(-1)}),
        firebase.firestore().collection('/measures').doc(item.id).update({ neasSelected: firebase.firestore.FieldValue.arrayUnion(User) }),
        firebase.firestore().collection('/measures').doc(item.id).update({ yeasSelected: firebase.firestore.FieldValue.arrayRemove(User) })
         }else {

         }
        };
      
      //get yaesSelected array for all firebase documents
      const yeasSelected = JSON.stringify(item.yeasSelected);
      if(yeasSelected === undefined){
      var result = ""
      // console.log(User)
      }
      else {
        var result = yeasSelected.substring(2, yeasSelected.length-2);
      }

      //get neasSelected array for all firebase docuements
      const neasSelected = JSON.stringify(item.neasSelected);
      if(neasSelected === undefined){
        var resultn = ""
      } else {
        var resultn = neasSelected.substring(2, neasSelected.length-2);
      }
    
      // console.log(result)
 
      //compare current user and yeasSelected array and if they match display yeas button as slected (dark/filled out)
       const backgroundColor = result.includes(User)? "rgba(0,0,0, 1)" : "rgba(0,0,0, .1)"; 
       //compare current user and neasSelected array and if they match display yeas button as slected (dark/filled out look)
       const opacity = resultn.includes(User)? 1 : 0.1; 
        
       
        return(
        //return item
        <Item measure={item.measure} description={item.description} yeas={item.yeas} neas={item.neas} stylen={{opacity}} style={{backgroundColor}}  onYeasPress={() => {setId(item.id), updateYeas()} }  onNeasPress={() => {setId(item.id), updateNeas() }}  />
      )
      
        }

        
   return (
    //start on main home screen/flatlist
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

    
      {/* button to display modal */}
    <View style={{marginTop: 20, marginBottom: 80}}>
      <Button raised buttonStyle={{
              backgroundColor:'#d00909',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 17,
              paddingRight: 17,
            }} title="Add a ballot measure"   onPress={() => {
              setModalVisible(true);
            }}
          />
</View>
        {/* <Text style={styles.button}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text>Add a ballot measure</Text>
        </Text> */}
    {/* modal settings / view */}
    
    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.txtHomeScreenContainer}>
        <Text style={[styles.heading]}>We The People</Text>
        <View style={{width:325, marginTop: 20}}>
        <Input
       
          placeholder='enter ballot measure name' value={measure} onChangeText={(text) => setMeasure(text)}
          leftIcon={
            <Icon
  name='edit'  />
          } />
        </View>
        {/* <TextInput
                value={measure}
                clearButtonMode="always"
                placeholder="enter ballot measure name"
                style={styles.textInput}
                onChangeText={(text) => setMeasure(text)}
            /> */}

      <View style={{width:325, marginBottom: 20}}>
        <Input
       
          placeholder='enter ballot measure description' value={description} onChangeText={(text) => setDescription(text)}
          leftIcon={
            <Icon
  name='subject'  />
          } />
        </View>
            {/* <TextInput
                value={description}
                clearButtonMode="always"
                placeholder="enter ballot measure description"
                style={styles.textInput}
                onChangeText={(text) => setDescription(text)}
            /> */}

            <Button raised buttonStyle={{
              backgroundColor:'#d00909',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }} title="Add Measure"  onPress={() => {submitHandler( measure, description, id, neas, yeas, selected ); setModalVisible(!modalVisible)}} />

             {/* <Text style={styles.measureButton} onPress={() => {submitHandler( measure, description, id, neas, yeas, selected ); setModalVisible(!modalVisible)}}>Add Measure</Text> */}

            <View style={{marginTop: 30}}>
             <Button raised buttonStyle={{
              backgroundColor:'#d00909',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 17,
              paddingRight: 17,
            }} title="Back to Home"   onPress={() => {
              setModalVisible(!modalVisible);
            }}/>
</View>

             {/* <Text style={styles.homeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Back to Home</Text>
        </Text> */}
          </View>
          </TouchableWithoutFeedback>
      </Modal>
      
   </SafeAreaView>
   
    )
}

export default Home

//home page style sheet
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
    container2: {
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
        padding: 12,
        width: '70%',
        textAlign:'center',
        fontSize:16,
        
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
      marginTop: 15,
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
        marginTop: 100,
        width: '95%',
        marginBottom: 200,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderStyle:'solid',
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
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
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
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
    paddingTop: 0,
    textAlign: 'center',
    fontFamily: 'alex-brush',
    fontSize: 40,
    backgroundColor: '#ffffff',
}
})







