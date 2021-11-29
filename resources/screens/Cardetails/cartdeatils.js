import React, {useState} from 'react';
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

export default function Cartdetails({route, navigation}) {
  const item = route.params;
  const imm = item.get_products.images;
  const [starCount, setstarCount] = useState(4);

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
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>Details</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}> */}
        <Ionicons
          name="cart"
          size={30}
          color="#FFDDC9"
          style={{
            ...styles.icon,
            marginRight: wp('4'),
          }}
        />
        {/* </TouchableOpacity> */}
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: hp('10')}}>
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
          <View style={{...styles.box, marginTop: 20}}>
            <Text style={[styles.tep, {fontWeight: 'bold'}]}>
              {item?.get_products?.name}
            </Text>
            {/* <Text style={styles.tep}>
            Category : {item?.getchildcategory?.name}
          </Text> */}
            {item?.get_products?.is_discounted == 2 ? (
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
                  $ {item?.get_products?.price}
                </Text>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: hp('0.5%'),
                  }}>
                  {' '}
                  $ {item?.get_products?.discounted_price}
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
                  $ {item?.get_products?.price}
                </Text>
              </View>
            )}
            <Text style={styles.tep}>SKU : {item?.get_products?.sku}</Text>
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
              {item?.get_products?.description}
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
          {item?.attributes?.length == 0 ? null : (
            <View style={{...styles.box, marginTop: 20}}>
              <View>
                <Text style={[styles.tep, {fontWeight: 'bold'}]}>
                  Attributes :{' '}
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
          {/* <Text style={styles.delvery}> Delivery & Returns</Text> */}

          {/* {renderSlider()} */}
        </View>
      </ScrollView>

      {/* {renderSlider()} */}
    </View>
  );
}

// {/* <View style={{position: 'absolute', bottom: 80, alignSelf: 'center'}}>
//       {item?.stock < 1 ? (
//         <View style={styles.carttouch}>
//           <View
//             style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             {/* // <ActivityIndicator size="large" color="white" /> */}
//             <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
//               Out of stock
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <View style={{flexDirection: 'row', bottom: 0, alignSelf: 'center'}}>
//           {loading ? (
//             <DotsLoader color="#E9691D" size={20} />
//           ) : (
//             <View style={styles.buttonParent}>
//               {favValue ? (
//                 <TouchableOpacity
//                   onPress={() => setFavValue(!favValue)}
//                   style={styles.favButton}>
//                   <Ionicons
//                     style={{color: 'white'}}
//                     name="heart"
//                     color="#B64400"
//                     size={35}
//                   />
//                 </TouchableOpacity>
//               ) : (
//                 <TouchableOpacity
//                   onPress={() => setFavValue(!favValue)}
//                   style={styles.favButton}>
//                   <Ionicons
//                     style={{color: 'white'}}
//                     name="heart-outline"
//                     color="#B64400"
//                     size={35}
//                   />
//                 </TouchableOpacity>
//               )}
//               <TouchableOpacity
//                 style={styles.carttouch}
//                 //  onPress={cartadd}
//                 onPress={validateCartAdd}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   {/* // <ActivityIndicator size="large" color="white" /> */}
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontSize: 20,
//                       fontWeight: 'bold',
//                     }}>
//                     Add To Cart
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       )}
//     </View> */}

// <View>
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       backgroundColor: '#FFDDC9',
//       shadowColor: '#000',
//       shadowOffset: {width: 1, height: 3},
//       shadowOpacity: 0.4,
//       shadowRadius: 6,
//       elevation: 5,
//     }}>
//     <TouchableOpacity onPress={() => navigation.goBack()}>
//       <Ionicons
//         name="arrow-back-sharp"
//         size={30}
//         color="#512500"
//         style={styles.icon}
//       />
//     </TouchableOpacity>
//     <Text
//       style={{
//         textAlign: 'center',
//         fontSize: 18,
//         color: '#512500',
//         fontWeight: 'bold',
//         marginTop: 25,
//       }}>
//       Product Details
//     </Text>
//     {/* <TouchableOpacity onPress={()=>navigation.navigate("Cart")} > */}
//     <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon} />
//     {/* </TouchableOpacity> */}
//   </View>
//   <ScrollView>
//     <View style={{margin: 20}}>
//       <FlatList
//         data={imm}
//         // keyExtractor={(item) => item.key}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({item}) => {
//           return (
//             <Image
//               source={{uri: `${Images_API}/${item.name}`}}
//               style={styles.imm}
//             />
//           );
//         }}
//       />
//       <View style={styles.box}>
//         <Text style={{color: '#512500', fontSize: 14, fontWeight: 'bold', marginTop: hp('0.5%'),}}>
//           {item.get_products.name}
//         </Text>
//         {/* <Text style={{color:"#512500",fontSize:14}}>Category : {item.getchildcategory.name}</Text> */}
//         <Text style={{color: '#512500', fontSize: 14, fontWeight: 'bold', marginTop: hp('0.5%'),}}>
//           Price : ${item.get_products.price}
//         </Text>
//         <Text style={{color: '#512500', fontSize: 14, marginTop: hp('0.5%'),}}>
//           SKU : {item.get_products.sku}
//         </Text>
//         <Text style={{color: '#512500', fontSize: 14, marginTop: hp('0.5%'),}}>
//           Quantity : {item.quantity}
//         </Text>
//         <Text style={{color: '#512500', fontSize: 14, marginTop: hp('0.5%'),}}>Description :</Text>
//         <Text
//           style={{marginLeft: 'auto', textAlign: 'justify', color: 'gray'}}>
//           {/* {' '}
//           {item.get_products.description}{' '} */}
//            Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text
//           ever since the 1500s, when an unknown printer took a galley of
//           type and scrambled it to make a type specimen book. It has
//           survived not only five centuries, but also the leap into
//           electronic typesetting, remaining essentially unchanged. It was
//           popularised in the 1960s with the release of Letraset sheets
//           containing Lorem Ipsum passages, and more recently with desktop
//           publishing software like Aldus PageMaker including versions of
//           Lorem Ipsum.
//         </Text>
//       </View>
//       {/* <Text
//         style={{
//           fontSize: 14,
//           fontWeight: 'bold',
//           color: '#919191',
//           marginTop: 20,
//         }}>
//         {' '}
//         Delivery & Returns
//       </Text> */}
//       <View style={[styles.box, {marginBottom: 60}]}>
//         <Text style={{color: '#512500', fontSize: 12, fontWeight: 'bold'}}>
//           Attributes
//         </Text>

//       </View>
//     </View>
//     <Text></Text>
//     <Text></Text>
//     <Text></Text>
//     <Text></Text>
//   </ScrollView>
//   {/* <View style={{ position: "absolute", bottom: 80, alignSelf: "center"}} >
//     <View style={{ flexDirection: "row", bottom: 0, alignSelf: "center" }} >
//       <TouchableOpacity style={{ backgroundColor: "#E9691D", width: wp("85%"), height: hp("7%"), alignItems: "center", justifyContent: "center", borderRadius: 10 }} >
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text style={{ color: "white", fontSize: 20,  fontWeight: "bold" }} >Add To Cart</Text>
//         </View>
//       </TouchableOpacity>
//     </View>

//   </View>  */}
// </View>

// <View style={styles.optionsContainer}>
//       {item?.get_attribute_values &&
//         item?.get_attribute_values?.map((res, i) => {
//           const itemName = res?.attribute?.name;
//           return (
//             <View>
//               <Text style={styles.attributeText}>
//                 {/* {res?.attribute?.name} */}
//                 {itemName}
//               </Text>
//               <View style={styles.pickerParentStyle}>
//                 {/* {Platform?.OS == 'ios' && (
//                   <PickerIOS style={styles.pickerStyle}></PickerIOS>
//                 )} */}
//                 {/* {res?.value?.map(res => {
//                   return (
//                     <RNPickerSelect
//                       onValueChange={value => console.log(value)}
//                       items={
//                         res?.value?.map(res=>{
//                           return res
//                         })
//                       }
//                     />
//                   );
//                 })} */}
//                 {/* <RNPickerSelect
//                   onValueChange={value => console.log(value)}

//                   items={[
//                     {label: 'Football', value: 'football'},
//                     {label: 'Baseball', value: 'baseball'},
//                     {label: 'Hockey', value: 'hockey',},
//                   ]}
//                 /> */}
//                 <Picker
//                   mode="dialog"
//                   selectedValue={attributeArray[i]}
//                   onValueChange={e => {
//                     addToAttributeArray(e, i);
//                     forceUpdate();
//                   }}
//                   collapsable={false}
//                   style={styles.pickerStyle}>
//                   <Picker.Item
//                     key={i}
//                     value={null}
//                     label={'Select Attribute'}
//                   />
//                   {res?.value?.map(res => {
//                     return (
//                       <Picker.Item
//                         key={res?.attribute_id}
//                         value={res}
//                         label={res}
//                       />
//                     );
//                   })}
//                 </Picker>
//               </View>
//             </View>
//           );
//         })}
//     </View>
