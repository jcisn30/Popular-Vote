import React  from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    SafeAreaView,
  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../../navigators/AuthFlowNavigator';
import AppIntroSlider from 'react-native-app-intro-slider';
import firebase from '../../firebase/config';



type WelcomeScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Welcome>;
interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProps;
    
}

const data = [
    {
      title: '',
      image: require('../../../assets/logo.png'),
      bg: '#ffffff',
    },
    {
      title: 'How it works',
      image: require('../../../assets/welcome-2.png'),
      bg: '#ffffff',
    },
    // {
    //   title: 'It is time for the people to rule!',
    //   image: require('../../../assets/welcome-image-4.jpg'),
    //   bg: '#ffffff',
    // },
  ];
  
  type Item = typeof data[0];

  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
    },
    image: {
      width: 320,
      height: 320,
      marginBottom: 120,
    },
    title: {
      fontSize: 30,
      color: 'black',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    }, 
  });

  

const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = (props) => {
    const { navigation } = props;
    const  email = " ";
    
    function checkSignIn(){
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            navigation.navigate("Main")
            // console.log(user);
         } else {
            
        }
   })
  }
    
    const _renderItem = ({item}: {item: Item}) => {
      checkSignIn();
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: item.bg,
            }}>
            <SafeAreaView style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
              <Image source={item.image} style={styles.image} />
            </SafeAreaView>
          </View>
        );
      };
    
      const _keyExtractor = (item: Item) => item.title;
    
      
      const _onDone = () => {
        
        navigation.navigate(AppScreens.Signup, {email})
        }

        return (
          <View style={{flex: 1}}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider 
              keyExtractor={_keyExtractor}
              renderItem={_renderItem}
              bottomButton
              showSkipButton
              showPrevButton
              data={data}
              onDone={_onDone}
            />
          </View>
        );

        
        
      }
    


export default WelcomeScreen;