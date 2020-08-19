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


type WelcomeScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Welcome>;
interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProps;
}

const data = [
    {
      title: 'We The People',
      image: require('../../../assets/logo.png'),
      bg: '#ffffff',
    },
    {
      title: 'Knowledge is power! Get all the facts and help shape the future, with your right to vote!',
      image: require('../../../assets/welcome-image-2.png'),
      bg: '#ffffff',
    },
    {
      title: 'Sign up or just get the facts.',
      image: require('../../../assets/welcome-image-4.png'),
      bg: '#ffffff',
    },
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
      marginTop: 0,
    },
    title: {
      fontSize: 22,
      color: 'black',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10
    }, 
  });



const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = (props) => {
    const { navigation } = props;
    
    const _renderItem = ({item}: {item: Item}) => {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: item.bg,
            }}>
            <SafeAreaView style={styles.slide}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </SafeAreaView>
          </View>
        );
      };
    
      const _keyExtractor = (item: Item) => item.title;
    
      
      const _onDone = () => {
        
        navigation.navigate(AppScreens.Login)
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