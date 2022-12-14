import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/home';
import Deal from '../screens/Deal/deal';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
  Platform,
} from 'react-native';
import cate from '../screens/Catergory/catagery';
import Order from '../screens/OrderDetails/OrderDetails';
import setting from '../screens/Setting/setting';
import {color} from '../config/color';
import seacrhScreen from '../screens/SeacrhScreen/seacrScreen';
import Cart from '../screens/Cart/cart';
import {languageCheck} from '../config/languageChecker';
import {useSelector} from 'react-redux';
import {TourGuideZoneByPosition} from 'rn-tourguide';
import Svg, {Path, G, Defs, FillProps} from 'react-native-svg';

const Tab = createBottomTabNavigator();

function MybottomTabs() {
  const iconProps = {size: 40, color: '#888'};

  const [dummy, setDummy] = useState(1);
  const {languageType} = useSelector(state => state.languageType);
  useEffect(() => {
    setDummy(1);
  }, [languageType]);
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#512500',
        // tabBarInactiveTintColor: '#512500',

        // tabBarInactiveTintColor: '#E9691D',
        swipeEnabled: true,
        animationEnabled: true,
        // tabBarActiveBackgroundColor: 'white',
        // tabBarInactiveBackgroundColor: 'white',
        tabBarStyle: {
          width: wp('100'),
          // height: hp(Platform?.OS == 'ios' ? '10%' : '8%'),
          // height: hp('0'),
          borderWidth: 0,
          // borderColor: color.defaultBackgroundColor,
          // display: 'none',
          // position: 'absolute',
          // bottom:hp
          // paddingTop: hp('-2'),
        },
        tabBarBackground: () => {
          return (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={wp('100')}
              height={hp('10')}
              style={{
                position: 'absolute',
                bottom: Platform.OS == 'ios' ? hp('-0.2') : hp('-2'),
                zIndex: 1,
                // alignSelf: 'center',
              }}
              viewBox="0 0 429.292 85.134">
              <Path
                id="Path_179"
                data-name="Path 179"
                // d="M1472.044,984c-15.208,0-29.043,8.5-36.893,21.951C1430,1013.918,1422.557,1021,1409,1021s-21.5-7.082-26.151-15.049C1375,992.5,1361.164,984,1345.956,984H1195v82.5h381.8c13.573,0,36.215,4.072,46.2,0,.718-9.4,0-35.376,0-47.706V984Z"
                d="M1472.044,984c-15.208,0-29.043,8.5-36.893,21.951C1430.5,1013.918,1422.557,1021,1409,1021s-21.5-7.082-26.151-15.049C1375,992.5,1361.164,984,1345.956,984H1195v82.5h381.8c13.573,0,36.215,4.072,46.2,0,.718-9.4,0-35.376,0-47.706V984Z"
                transform="translate(-1194.5 -983.5)"
                fill="#fff"
                stroke="#d0d0d0"
                stroke-miterlimit="10"
                stroke-width="1"
              />
            </Svg>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" color={color} size={hp('3')} />
          ),
          title: languageCheck('Home'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '0.5'),
          },
        }}
        component={Home}
      />

      <Tab.Screen
        name="cate"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="list" color={color} size={hp('3')} />
          ),
          tabBarIconStyle: {
            color: 'red',
          },
          title: languageCheck('Shop'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '0.5'),
          },
        }}
        component={cate}
      />
      {/* <Tab.Screen
        name="Deal"
        options={{
          tabBarIcon: () => {
            return <Ionicons name="pricetags" color="#512500" size={25} />;
          },
          title: 'Deal',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
        component={Deal}
      /> */}
      {/* </BlurView> */}

      <Tab.Screen
        name="setting"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={wp('15')}
                height={hp('16')}
                style={{
                  marginBottom: Platform.OS == 'ios' ? hp('5') : hp('6'),
                }}
                viewBox="0 0 52 51">
                <G
                  id="Group_251"
                  data-name="Group 251"
                  transform="translate(-202 -835.04)">
                  <G
                    id="Group_125"
                    data-name="Group 125"
                    transform="translate(14 12.04)">
                    <Path
                      id="Path_188"
                      data-name="Path 188"
                      d="M26,0A25.754,25.754,0,0,1,52,25.5,25.754,25.754,0,0,1,26,51,25.754,25.754,0,0,1,0,25.5,25.48,25.48,0,0,1,11.65,4.232,26,26,0,0,1,26,0Z"
                      transform="translate(188 823)"
                      fill="#512500"
                    />
                    <G
                      id="Path_189"
                      data-name="Path 189"
                      transform="translate(190.3 825.256)"
                      fill="none">
                      <Path
                        d="M23.7,0A23.475,23.475,0,0,1,47.4,23.244,23.475,23.475,0,0,1,23.7,46.488,23.475,23.475,0,0,1,0,23.244,23.475,23.475,0,0,1,23.7,0Z"
                        stroke="none"
                      />
                      <Path
                        d="M 23.69984436035156 0.9999961853027344 C 20.63255500793457 0.9999961853027344 17.65771484375 1.588886260986328 14.85796356201172 2.750308990478516 C 12.15446472167969 3.871807098388672 9.726573944091797 5.477226257324219 7.641735076904297 7.521968841552734 C 5.558235168457031 9.565399169921875 3.922756195068359 11.94423675537109 2.780693054199219 14.59243774414062 C 1.599105834960938 17.33229827880859 0.9999961853027344 20.24312782287598 0.9999961853027344 23.24407768249512 C 0.9999961853027344 26.24502754211426 1.599105834960938 29.15585708618164 2.780693054199219 31.89571762084961 C 3.922756195068359 34.54391860961914 5.558235168457031 36.92276000976562 7.641735076904297 38.9661865234375 C 9.726573944091797 41.01092910766602 12.15446472167969 42.61634826660156 14.85796356201172 43.73784637451172 C 17.65771484375 44.89926910400391 20.63255500793457 45.4881591796875 23.69984436035156 45.4881591796875 C 26.76713371276855 45.4881591796875 29.74197387695312 44.89926910400391 32.54172515869141 43.73784637451172 C 35.24522399902344 42.61634826660156 37.67311477661133 41.01092910766602 39.75795364379883 38.9661865234375 C 41.84144592285156 36.92276000976562 43.47693634033203 34.54391860961914 44.61898422241211 31.89571762084961 C 45.80057525634766 29.15585708618164 46.39968490600586 26.24502754211426 46.39968490600586 23.24407768249512 C 46.39968490600586 20.24312782287598 45.80057525634766 17.33229827880859 44.61898422241211 14.59243774414062 C 43.47693634033203 11.94423675537109 41.84144592285156 9.565399169921875 39.75795364379883 7.521968841552734 C 37.67311477661133 5.477226257324219 35.24522399902344 3.871807098388672 32.54172515869141 2.750308990478516 C 29.74197387695312 1.588886260986328 26.76713371276855 0.9999961853027344 23.69984436035156 0.9999961853027344 M 23.69984436035156 -3.814697265625e-06 C 36.78890228271484 -3.814697265625e-06 47.39968490600586 10.4067268371582 47.39968490600586 23.24407768249512 C 47.39968490600586 36.08142852783203 36.78890228271484 46.4881591796875 23.69984436035156 46.4881591796875 C 10.61078262329102 46.4881591796875 -3.814697265625e-06 36.08142852783203 -3.814697265625e-06 23.24407768249512 C -3.814697265625e-06 10.4067268371582 10.61078262329102 -3.814697265625e-06 23.69984436035156 -3.814697265625e-06 Z"
                        stroke="none"
                        fill="#fff"
                      />
                    </G>
                    <Path
                      id="Icon_material-person"
                      data-name="Icon material-person"
                      d="M15.875,15.875a4.937,4.937,0,1,0-4.937-4.937A4.936,4.936,0,0,0,15.875,15.875Zm0,2.469C12.579,18.344,6,20,6,23.281V25.75H25.75V23.281C25.75,20,19.171,18.344,15.875,18.344Z"
                      transform="translate(198.125 832.625)"
                      fill="#fff"
                    />
                  </G>
                </G>
              </Svg>

              <TourGuideZoneByPosition
                zone={3}
                text={'You can change Language and currency from your setting.'}
                shape={'rectangle_and_keep'}
                isTourGuide
                bottom={Platform.OS == 'ios' ? hp('-3') : hp('-6')}
                width={wp('8')}
                height={hp('7')}
                left={Platform.OS == 'ios' ? wp('6') : wp('6')}
                // iconProps
                // borderRadius={16}
              />
              {/* <Ionicons
                {...iconProps}
                name="person"
                color={color}
                size={hp('3')}
                style={{bottom: hp('5')}}
              /> */}
            </>
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={setting}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="cart" color={color} size={hp('3')} />
          ),
          title: languageCheck('Cart'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            // position: 'absolute',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '0.5'),
          },
          tabBarIconStyle: {
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '0'),
            // position: 'absolute',
            // bottom: hp('10'),
            backgroundColor: 'red',
          },
        }}
        component={Cart}
      />
      <Tab.Screen
        name="seacrhScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="search" color={color} size={hp('3')} />
          ),
          title: languageCheck('Search'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '0.5'),
          },
        }}
        component={seacrhScreen}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;
