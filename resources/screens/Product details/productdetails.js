import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import FlatListPicker from 'react-native-flatlist-picker';
import {ADDTOCART, Images_API} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import AnimatedLoader from 'react-native-animated-loader';
import {color} from '../../config/color';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
  BubblesLoader,
} from 'react-native-indicator';
import RNPickerSelect from 'react-native-picker-select';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {styles} from './style';
import StarRating from 'react-native-star-rating';

export default function Details({route, navigation}) {
  const [user_id, setUser_id] = useState();
  const [loading, setLoading] = useState(false);
  const [favValue, setFavValue] = useState(false);
  // const [pickerValue, setPickerValue] = useState({});
  const [attributeArray, setAttributeArray] = useState([]);
  const [starCount, setstarCount] = useState(4);

  const onStarRatingPress = rating => {
    setstarCount(rating);
  };
  const [silderData, setSliderData] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);

  useEffect(() => {
    // console.log(39, item);
    setUserId();
  }, []);
  const setUserId = async () => {
    const userId = await getUserData();
    const users = userId?.id;
    setUser_id(users);
  };

  const item = route?.params;
  const imm = item?.images;

  const product_id = item?.id;

  const returnTopAlert = (type, message) => {
    return showMessage({
      type: type,
      icon: 'auto',
      message: message,
      backgroundColor: '#E9691D',
    });
  };

  const validateCartAdd = () => {
    var gotUndefined = false;
    const apiDataArrayLength = item?.get_attribute_values?.length;
    if (attributeArray?.length == apiDataArrayLength) {
      for (let index = 0; index < apiDataArrayLength; index++) {
        if (attributeArray[index] == undefined) {
          gotUndefined = true;
        }
      }
      if (gotUndefined) {
        returnTopAlert(
          'danger',
          'Kindly select the product attributes before adding to cart.',
        );
      } else if (!gotUndefined) {
        cartadd();
      }
    } else {
      returnTopAlert(
        'danger',
        'Kindly select the product attributes before adding to cart.',
      );
    }
  };

  const cartadd = () => {
    setLoading(true);
    fetch(ADDTOCART, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON?.stringify({
        product_id,
        user_id,
        attribute: attributeArray,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // console.log(106, json);
        if (json[0]?.message == 'Successfully added to cart') {
          showMessage({
            type: 'success',
            icon: 'auto',
            message: 'Your Product Has Been Add To Cart',
            backgroundColor: '#E9691D',
          });
          setLoading(false);
        } else {
          showMessage({
            type: 'danger',
            icon: 'auto',
            message: 'Something went wrong.',
            backgroundColor: '#E9691D',
          });
          setLoading(false);
        }
      })
      .done();
  };

  const addToAttributeArray = (e, i) => {
    attributeArray[i] = e;
  };
  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const renderSlider = () => {
    return (
      <View
        style={{
          // backgroundColor: 'green',
          marginBottom: hp('20'),
          marginTop: hp('2'),
        }}>
        <View style={{...styles.recentTextContainer}}>
          <TouchableOpacity>
            <Text style={{...styles.sliderText, color: 'grey'}}>
              Related Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sliderText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          horizontal={true}>
          <View style={styles.bottomImageScroller}>
            {silderData?.length > 0 &&
              silderData?.map(res => {
                return (
                  <View style={styles.bottomimages}>
                    <Image
                      style={styles.imagss}
                      // source={{
                      //   uri: `${Images_API}/${res.get_products.images[0].name}`,
                      // }}
                      source={{
                        uri: 'https://picsum.photos/200',
                      }}
                    />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={35}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons
            name="cart"
            size={30}
            color="#512500"
            style={{
              ...styles.icon,

              marginRight: wp('3'),
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={
          {
            // alignSelf: 'center',
          }
        }>
        <View style={{margin: 20}}>
          <FlatList
            data={imm}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignSelf: 'center',
              // backgroundColor: 'red',
            }}
            renderItem={({item}) => {
              return (
                <Image
                  source={{uri: `${Images_API}/${item?.name}`}}
                  style={styles.imm}
                />
              );
            }}
          />
          <View style={styles.box}>
            <Text style={[styles.tep, {fontWeight: 'bold'}]}>{item?.name}</Text>
            <Text style={styles.tep}>
              Category : {item?.getchildcategory?.name}
            </Text>
            {item?.is_discounted == 2 ? (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: hp('0.5%'),
                  }}>
                  Price :
                </Text>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textDecorationLine: 'line-through',
                    marginTop: hp('0.5%'),
                  }}>
                  $ {item?.price}
                </Text>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: hp('0.5%'),
                  }}>
                  {' '}
                  $ {item?.discounted_price}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Prices :
                </Text>

                <Text
                  style={{
                    color: '#512500',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  $ {item?.price}
                </Text>
              </View>
            )}
            <Text style={styles.tep}>SKU : {item?.sku}</Text>
            <StarRating
              containerStyle={{width: wp('10')}}
              starSize={20}
              fullStarColor="#E9691D"
              starStyle={{marginBottom: hp('0.5'), marginTop: hp('0.5')}}
              disabled={true}
              maxStars={5}
              rating={starCount}
              selectedStar={rating => onStarRatingPress(rating)}
            />
            <Text style={[styles.tep, {fontWeight: 'bold'}]}>
              Description :
            </Text>
            <Text
              style={{
                color: 'gray',
                textAlign: 'justify',
                marginTop: hp('0.5%'),
              }}>
              {/* {item.description}  */}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
          {/* <Text style={styles.delvery}> Delivery & Returns</Text> */}
          <View style={styles.optionsContainer}>
            {item?.get_attribute_values &&
              item?.get_attribute_values?.map((res, i) => {
                const itemName = res?.attribute?.name;
                return (
                  <View>
                    <Text style={styles.attributeText}>
                      {/* {res?.attribute?.name} */}
                      {itemName}
                    </Text>
                    <View style={styles.pickerParentStyle}>
                      {/* {Platform?.OS == 'ios' && (
                        <PickerIOS style={styles.pickerStyle}></PickerIOS>
                      )} */}
                      {/* {res?.value?.map(res => {
                        return (
                          <RNPickerSelect
                            onValueChange={value => console.log(value)}
                            items={
                              res?.value?.map(res=>{
                                return res
                              })
                            }
                          />
                        );
                      })} */}
                      {/* <RNPickerSelect
                        onValueChange={value => console.log(value)}
                        
                        items={[
                          {label: 'Football', value: 'football'},
                          {label: 'Baseball', value: 'baseball'},
                          {label: 'Hockey', value: 'hockey',},
                        ]}
                      /> */}
                      <Picker
                        mode="dialog"
                        selectedValue={attributeArray[i]}
                        onValueChange={e => {
                          addToAttributeArray(e, i);
                          forceUpdate();
                        }}
                        collapsable={false}
                        style={styles.pickerStyle}>
                        <Picker.Item
                          key={i}
                          value={null}
                          label={'Select Attribute'}
                        />
                        {res?.value?.map(res => {
                          return (
                            <Picker.Item
                              key={res?.attribute_id}
                              value={res}
                              label={res}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                  </View>
                );
              })}
          </View>
          {renderSlider()}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: Platform?.OS == 'ios' ? 110 : 80,
          alignSelf: 'center',
        }}>
        {item?.stock < 1 ? (
          <View style={{...styles.carttouch, height: hp('6')}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* // <ActivityIndicator size="large" color="white" /> */}
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Out of stock
              </Text>
            </View>
          </View>
        ) : (
          <View style={{flexDirection: 'row', bottom: 0, alignSelf: 'center'}}>
            {loading ? (
              <DotsLoader color="#E9691D" size={20} />
            ) : (
              <View style={styles.buttonParent}>
                {favValue ? (
                  <TouchableOpacity
                    onPress={() => setFavValue(!favValue)}
                    style={styles.favButton}>
                    <Ionicons
                      style={{color: 'white'}}
                      name="heart"
                      color="#B64400"
                      size={35}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setFavValue(!favValue)}
                    style={styles.favButton}>
                    <Ionicons
                      style={{color: 'white'}}
                      name="heart-outline"
                      color="#B64400"
                      size={35}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.carttouch}
                  //  onPress={cartadd}
                  onPress={validateCartAdd}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* // <ActivityIndicator size="large" color="white" /> */}
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Add To Cart
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
      {/* {renderSlider()} */}
    </View>
  );
}
