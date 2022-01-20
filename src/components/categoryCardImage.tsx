import React from 'react';
import {Text, Pressable, StyleSheet, ImageBackground, View} from 'react-native';
import colors from '../../assets/colors/colors';
import {CartItemType} from '../screens/home';

type props = {
  title?: string;
  image: any;
  height: number;
  width: number;
  borderRadius: number;
  item: CartItemType;
  handleItemClick: (item: CartItemType) => void;
  index: number;
};

const CategoryCardImage = ({
  title,
  image,
  height,
  width,
  borderRadius,
  item,
  handleItemClick,
  index,
}: props) => {
  return (
    <Pressable
      style={styles().shadowProp}
      onPress={() => handleItemClick(item)}>
      <View
        style={styles(borderRadius, height, borderRadius, index).cardContainer}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={[styles(width, height).image]}>
          <Text style={styles(width, height).text}>{title}</Text>
        </ImageBackground>
      </View>
    </Pressable>
  );
};
const styles = (
  width?: number,
  height?: number,
  borderRadius?: number,
  index?: number,
) =>
  StyleSheet.create({
    cardContainer: {
      borderRadius: 10,
      marginRight: 15,
      marginBottom: 25,
      overflow: 'hidden',
      marginLeft: index === 0 ? 30 : 0,
    },
    text: {
      paddingVertical: 21,
      paddingHorizontal: 10,
      fontSize: 14,
      fontFamily: 'Montserrat-SemiBold',
      color: colors.textColorImage,
      overflow: 'hidden',
    },
    image: {
      borderRadius: borderRadius,
      height: height,
      width: width,
    },
    shadowProp: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });
export default CategoryCardImage;
