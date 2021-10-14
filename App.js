/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Component, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Navigation from './resources/config/naviagtion';
import {NavigationContainer} from '@react-navigation/native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import store from './resources/redux/store';
import {getUserData} from './resources/utils/utils';
import {saveUserData} from './resources/redux/action/auth';

// export default class App extends Component
// {
//    constructor(){
//      super();
//      this.state={
//      isVisible : true,
//     }
//   }
//    Hide_Splash_Screen=()=>{
//     this.setState({
//       isVisible : false
//     });
//   }

//     componentDidMount (){
//       async()=>{
//               const userData = await getUserData()
//               console.log("user data App.js",userData)
//               if(!!userData){
//                 saveUserData(userData)
//               }
//             }
//     var that = this;
//     setTimeout(function(){
//       that.Hide_Splash_Screen();
//     }, 5000)
//    }

//     render()

//     {
//         let Splash_Screen = (
//              <View style={styles.SplashScreen_RootView}>
//                  <View style={styles.SplashScreen_ChildView}>
//                        <Image source={require('./resources/images/Component2.png')}
//                     style={{width:150, height: "100%", resizeMode: 'contain'}} />
//                 <Text>Hyuidn jfium dkuddkk</Text>
//                 </View>
//              </View> )
//          return(
//            <Provider store={store} >
//               {(this.state.isVisible === true) ? Splash_Screen :
//            <NavigationContainer>
//            <Navigation/>
//          </NavigationContainer>}
//                <FlashMessage position="top" />
//                </Provider>
//               );
//     }
// }
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    // margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDDC9',
    flex: 1,
  },
});

function App() {
  const [isVisible, setIsVisible] = useState(true);
  Hide_Splash_Screen = () => {
    // setState({
    //   isVisible : false
    // });
    setIsVisible(false);
  };

  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      console.log('user data App.js', userData);
      if (!!userData) {
        saveUserData(userData);
      }
    })();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, 5000);
  }, []);
  {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('./resources/images/Component2.png')}
            style={{width: 150, height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
    return (
      <Provider store={store}>
        {isVisible === true ? (
          Splash_Screen
        ) : (
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        )}
        <FlashMessage position="top" />
      </Provider>
    );
  }
}
//   return (
//     <Provider store={store} >
//     <NavigationContainer>
//       <Navigation />
//     </NavigationContainer>
//     <FlashMessage/>
//     </Provider>
//   )
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
