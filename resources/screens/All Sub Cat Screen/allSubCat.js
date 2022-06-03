import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {languageCheck} from '../../config/languageChecker';
import {color} from '../../config/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {SubCat_Image_Api} from '../../config/url';

export default function allSubCat({route, navigation}) {
  const {languageType} = useSelector(state => state.languageType);
  const item = route?.params?.item;
  const child_category = route?.params?.name;
  const child_categoryFrName = route?.params?.frName;
  console.log(item, child_categoryFrName, child_category);
  const SubCatImage = item => {
    var requireImage =
      //   'https://moyenxpress.com/products/child-category-images/165288703717.png';
      'https://www.blankstyle.com/files/imagefield_default_images/notfound_0.png';
    var urlImage = `${SubCat_Image_Api}${item?.cat_image}`;
    var t = item.cat_image == null ? requireImage : urlImage;
    return t;
  };
  return (
    <View>
      <View style={styles.headerMainView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={hp('3')}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>
          {' '}
          {languageType?.code == 'en' ? item.name : item.name_fr}
        </Text>
        <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon} />
      </View>
      <ScrollView
        contentContainerStyle={{marginTop: hp('2'), paddingBottom: hp('10')}}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={item.child_category}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          initialNumToRender={4}
          style={{alignSelf: 'center'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            item.status == '1' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('subcatdetails', {
                    item: item,
                    screenData: 'subCat',
                  })
                }
                style={styles.touchContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.imageStyle}
                  source={{uri: SubCatImage(item)}}
                />
                <Text style={styles.innerText} numberOfLines={2}>
                  {languageType?.code == 'en' ? item.name : item.name_fr}
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </ScrollView>
    </View>
  );
}
