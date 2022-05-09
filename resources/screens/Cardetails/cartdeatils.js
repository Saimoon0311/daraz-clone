import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images_API} from '../../config/url';
import {color} from '../../config/color';
import {styles} from './style';
import StarRating from 'react-native-star-rating';
import Carousel from 'react-native-snap-carousel';
import {getUserData} from '../../utils/utils';
import {languageCheck} from '../../config/languageChecker';

export default function Cartdetails({route, navigation}) {
  const [dummy, setDummy] = useState(1);

  const isCarousel = React.useRef(null);
  const [user, setUser] = useState();
  const item = route.params;
  const imm = item.get_products.images;
  const [starCount, setstarCount] = useState(4);
  useEffect(() => {
    (async () => {
      const user = await getUserData();
      setUser(user);
    })();
  }, []);
  const onStarRatingPress = rating => {
    setstarCount(rating);
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color={color.defaultcolor}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>{languageCheck('Details')}</Text>
        <Ionicons
          name="cart"
          size={30}
          color={color.cartIconsColor}
          style={{
            ...styles.icon,
            marginRight: wp('4'),
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp('10'),
        }}>
        <View style={{margin: 20}}>
          <View style={{height: hp('45')}}>
            <Carousel
              data={imm}
              layout={'stack'}
              useScrollView={true}
              ref={isCarousel}
              layoutCardOffset={'8'}
              contentContainerStyle={styles.contentStyleContainer}
              style={{
                alignSelf: 'center',
              }}
              sliderWidth={wp('100')}
              itemWidth={wp('100')}
              itemHeight={hp('100')}
              renderItem={({item}) => {
                return (
                  <Image
                    resizeMode="cover"
                    source={{uri: `${Images_API}/${item?.name}`}}
                    style={styles.imm}
                  />
                );
              }}
            />
          </View>
          <View style={{...styles.box, marginTop: 20}}>
            <Text style={[styles.tep, {fontWeight: 'bold'}]}>
              {item?.get_products?.name}
            </Text>
            {item?.get_products?.is_discounted == 2 ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: wp('85'),
                }}>
                <Text style={styles.priceStyleContainerLeft}>
                  {languageCheck('Price :')}
                </Text>
                <Text style={styles.priceStyleContainerRight}>
                  {user?.currency?.symbol} {item?.get_products?.price}
                </Text>
                <Text style={styles.discountStyleContainer}>
                  {' '}
                  {user?.currency?.symbol}{' '}
                  {item?.get_products?.discounted_price}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.withoutDiscountStyle}>
                  {languageCheck('Price :')}
                </Text>

                <Text style={styles.withoutDiscountStyle}>
                  {user?.currency?.symbol} {item?.get_products?.price}
                </Text>
              </View>
            )}
            <Text style={styles.tep}>SKU : {item?.get_products?.sku}</Text>

            <Text style={[styles.tep, {fontWeight: 'bold'}]}>
              {languageCheck('Description :')}
            </Text>
            <Text style={styles.descriptionStyleContainer}>
              {item?.get_products?.description}
            </Text>
          </View>
          {item?.attributes?.length == 0 ? null : (
            <View style={{...styles.box, marginTop: hp('3')}}>
              <View>
                <Text style={[styles.tep, {fontWeight: 'bold'}]}>
                  {languageCheck('Attributes :')}{' '}
                </Text>
                {item?.attributes.map((res, i) => {
                  return (
                    <View style={styles.pickerParentStyle}>
                      <Text style={styles.pickerStyle}> {res} </Text>
                    </View>
                  );
                })}
                <Text></Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
