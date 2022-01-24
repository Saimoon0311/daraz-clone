import React, {useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
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
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import FlatListPicker from 'react-native-flatlist-picker';
import {
  ADDTOCART,
  Images_API,
  REVIEWS,
  SUBCATPRODUCTDATA,
} from '../../config/url';
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';

export default function Details({route, navigation}) {
  const [updateCart, setUpdateCart] = useState(false);
  const [user_id, setUser_id] = useState();
  const [loading, setLoading] = useState(false);
  const [favValue, setFavValue] = useState(false);
  // const [pickerValue, setPickerValue] = useState({});
  const [attributeArray, setAttributeArray] = useState([]);
  const [starCount, setstarCount] = useState(0);
  const [reviewsName, setreviewName] = useState('');
  const [reviewsEmail, setreviewEmail] = useState('');
  const [reviewLoading, setreviewLoading] = useState(false);
  const [subCatLoading, setSubCatLoading] = useState(true);
  const [reviews, setreview] = useState('');
  const [allReviews, setallReviews] = useState();
  const [allreviewsLoading, setallreviewsLoading] = useState(true);
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
  const [subCatdata, setSubCatdata] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  var items = subCatdata;
  useEffect(() => {
    (async () => {
      await checkStatus();
      getAllReviews();
      setUserId();
      get_child_product();
    })();
  }, []);
  const checkStatus = async () => {
    const user = await getUserData();
    console.log(236, user);
    if (user == null) {
      console.log(100);
      setIsLoggedIn(false);
    } else if (user !== null) {
      console.log(103);
      setIsLoggedIn(true);
    }
  };
  // useEffect(() => {
  //   // console.log(39, item);

  //   getAllReviews();
  //   setUserId();
  //   get_child_product();
  // }, [updateCart]);
  const routeToLogin = () => {
    console.log(22222);
    navigation.navigate('MyTabs');
  };
  const setUserId = async () => {
    const userId = await getUserData();
    const users = userId?.id;
    setUser_id(users);
  };

  const child_id = route?.child_category_id;
  const item = route?.params;
  const imm = item?.images;

  const product_id = item?.id;
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const get_child_product = () => {
    // fetch(`${SUBCATPRODUCTDATA}/${child_id}/${user_id}`)
    fetch(`${SUBCATPRODUCTDATA}/81/${user_id}`)
      .then(res => res.json())
      .then(json => {
        setSubCatdata(json[0]);
        console.log(json);
        setSubCatLoading(false);
      })
      .catch(err => {
        setSubCatLoading(true);
        console.log(err);
      });
  };

  const returnTopAlert = (type, message) => {
    return showMessage({
      type: type,
      icon: 'auto',
      message: message,
      backgroundColor: '#E9691D',
    });
  };
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const submitReviews = () => {
    setreviewLoading(true);
    if (
      (reviewsEmail !== '' &&
        reviewsEmail !== null &&
        reviewsName !== '' &&
        reviewsName !== null &&
        reviews !== '' &&
        reviews !== null &&
        starCount > 0 &&
        !reviewsEmail) ||
      reg.test(reviewsEmail) !== false
    ) {
      var myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        name: reviewsName,
        email: reviewsEmail,
        stars: starCount,
        review: reviews,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${REVIEWS}/${product_id}`, requestOptions)
        .then(response => response.json())
        .then(json => {
          setreviewLoading(false);
          setreview('');
          setreviewEmail('');
          setreviewName('');
          setstarCount(0);
          json?.success == true
            ? showMessage({
                type: 'success',
                icon: 'success',
                message: 'Your review has been posted.',
                backgroundColor: '#E9691D',
              })
            : showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Some thing is wrong.',
                backgroundColor: '#E9691D',
              });
        })
        .catch(err => {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Some thing is wrong.',
            backgroundColor: '#E9691D',
          });
          setreviewLoading(false);
          // console.log(err);
        });
    } else {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Please enter the correct informations.',
        backgroundColor: '#E9691D',
      });
      setreviewLoading(false);
    }
  };

  const getAllReviews = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${REVIEWS}/${product_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setallreviewsLoading(false);
        setallReviews(result.data);
      })
      .catch(error => {
        setallreviewsLoading(false);

        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Some thing is wrong.',
          backgroundColor: '#E9691D',
        });
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
          setUpdateCart(true);
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
        <View style={styles.bottomImageScroller}>
          {subCatLoading ? (
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{...styles.imagss, marginRight: wp('5')}}></View>
                <View style={{...styles.imagss, marginRight: wp('5')}}></View>
                <View style={{...styles.imagss, marginRight: wp('5')}}></View>
                <View style={{...styles.imagss, marginRight: wp('5')}}></View>
                <View style={{...styles.imagss, marginRight: wp('5')}}></View>
                <View style={{...styles.imagss, marginRight: wp('5')}}></View>
              </View>
            </SkeletonPlaceholder>
          ) : (
            subCatdata?.length > 0 && (
              <View>
                <View style={{...styles.recentTextContainer}}>
                  {/* <TouchableOpacity> */}
                  <Text style={{...styles.sliderText, color: 'grey'}}>
                    Related Products
                  </Text>
                  {/* </TouchableOpacity> */}
                  {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('subcatdetails', {
                    item: item?.child_category_id,
                    screenData: 'subCat',
                  })
                }>
                <Text style={styles.sliderText}>See All</Text>
              </TouchableOpacity> */}
                </View>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled
                  horizontal={true}>
                  {subCatdata?.map(res => {
                    return (
                      <View style={styles.bottomimages}>
                        <Image
                          style={styles.imagss}
                          // source={{
                          //   uri: `${Images_API}/${res.get_products.images[0].name}`,
                          // }}
                          source={{
                            uri: `${Images_API}/${res?.images[0]?.name}`,
                          }}
                          // source={{
                          //   uri: 'https://picsum.photos/200',
                          // }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )
          )}
        </View>
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
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons
            name="cart"
            size={30}
            color="#512500"
            style={{
              ...styles.icon,
              marginRight: wp('3'),
            }}
          />
        </TouchableOpacity> */}
        <View
          style={{
            ...styles.icon,
            marginLeft: wp('0'),
          }}>
          <HomeCartIcon updateCart={updateCart} navigations={navigationProps} />
        </View>
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
            <Text style={[styles.tep, {fontWeight: 'bold'}]}>
              Description :
            </Text>
            <Text
              style={{
                color: 'gray',
                textAlign: 'justify',
                marginTop: hp('0.5%'),
              }}>
              {item?.description}
              {/* Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. */}
            </Text>
          </View>
          {/* <Text style={styles.delvery}> Delivery & Returns</Text> */}
          {item?.get_attribute_values?.length == 0 ? null : (
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
          )}
          <View style={styles.box}>
            <Text style={{color: color.defaultcolor}}>Submit Your Review</Text>
            <Text></Text>
            <Text style={{color: 'gray'}}>
              Your email address will not be published. Required fields are
              marked *
            </Text>
            <Text></Text>
            <StarRating
              containerStyle={{width: wp('10')}}
              starSize={20}
              fullStarColor="#E9691D"
              starStyle={{marginBottom: hp('0.5'), marginTop: hp('0.5')}}
              maxStars={5}
              rating={starCount}
              selectedStar={rating => onStarRatingPress(rating)}
            />
            <Text></Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                paddingLeft: wp('5'),
                color: 'black',
                height: hp('8'),
                width: wp('85'),
                alignSelf: 'center',
                paddingTop: hp('1.1'),
                // paddingTop: hp('-300'),
              }}
              // minHeight={hp('20')}
              multiline
              value={reviews}
              onChangeText={text => setreview(text)}
              placeholder="Write Your Reviews Here.."
              placeholderTextColor={'gray'}
            />
            <Text></Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                paddingLeft: wp('5'),
                color: 'black',
                height: hp('5'),
                width: wp('85'),
                alignSelf: 'center',
              }}
              value={reviewsName}
              placeholder="Enter Your Name*"
              onChangeText={text => setreviewName(text)}
              placeholderTextColor={'gray'}
            />
            <Text></Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                paddingLeft: wp('5'),
                color: 'black',
                height: hp('5'),
                width: wp('85'),
                alignSelf: 'center',
              }}
              placeholder="Enter Your Email*"
              value={reviewsEmail}
              autoCapitalize="none"
              onChangeText={text => setreviewEmail(text)}
              placeholderTextColor={'gray'}
            />
            <Text></Text>
            <TouchableOpacity
              style={styles.submitreviews}
              onPress={() => submitReviews()}>
              {reviewLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={{color: 'white', fontSize: hp('2')}}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
          {allreviewsLoading ? (
            <ActivityIndicator
              style={{marginTop: hp('5')}}
              size={'large'}
              color={color.themColorPrimary}
            />
          ) : allReviews?.length > 0 ? (
            <ScrollView
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{
                ...styles.box,
                height: 'auto',
                maxHeight: hp('50'),
              }}>
              {/* <View> */}
              {allReviews.map(res => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    {/* <Avatar
                      // rounded
                      size={50}
                      source={require('../../images/avata.png')}
                    /> */}
                    <Image
                      source={require('../../images/avata.png')}
                      // width={wp('5')}
                      // height={hp('5')}
                      resizeMode="contain"
                      style={{
                        // borderRadius: hp('20'),
                        width: wp('15'),
                        height: hp('9'),
                        marginRight: wp('5'),
                      }}
                    />
                    <View>
                      <Text style={{color: 'gray'}}>{res?.name}</Text>
                      <StarRating
                        containerStyle={{width: wp('10')}}
                        starSize={15}
                        fullStarColor="#E9691D"
                        starStyle={{
                          marginBottom: hp('0.5'),
                          marginTop: hp('0.5'),
                        }}
                        maxStars={5}
                        rating={res?.stars}
                        disabled={true}
                        // selectedStar={rating => onStarRatingPress(rating)}
                      />
                      <Text numberOfLines={10} style={{color: 'gray'}}>
                        {res?.review}
                      </Text>
                      <View
                        style={{
                          ...styles.devider,
                          width: wp('60'),
                          alignSelf: 'center',
                          backgroundColor: '#C8C8C8',
                        }}
                      />
                    </View>
                  </View>
                );
              })}
              {/* </View> */}
            </ScrollView>
          ) : (
            <>
              <Image
                resizeMode="contain"
                style={{
                  // borderRadius: hp('20'),
                  width: wp('30'),
                  height: hp('20'),
                  alignSelf: 'center',
                  // marginRight: wp('10'),
                  marginTop: hp('5'),
                }}
                source={require('../../images/newVec.png')}
              />
              <Text
                style={{color: color.textColorRedCart, textAlign: 'center'}}>
                No reviews yet.
              </Text>
            </>
          )}

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
                {item?.is_wishlisted == true ? (
                  <View style={styles.favButton}>
                    <Ionicons
                      style={{color: 'white'}}
                      name="heart"
                      color="#B64400"
                      size={35}
                    />
                  </View>
                ) : (
                  <View style={styles.favButton}>
                    <Ionicons
                      style={{color: 'white'}}
                      name="heart-outline"
                      color="#B64400"
                      size={35}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.carttouch}
                  onPress={isLoggedIn == true ? validateCartAdd : routeToLogin}>
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
