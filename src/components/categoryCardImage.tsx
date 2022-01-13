import React from 'react';
import {Text, Pressable, StyleSheet, ImageBackground, View} from 'react-native';
import colors from '../../assets/colors/colors';

type props = {
  title?: string;
  image: any;
  height: number;
  width: number;
  borderRadius: number;
  onPress?: () => void;
};

const CategoryCardImage = ({
  title,
  image,
  height,
  width,
  borderRadius,
  onPress,
}: props) => {
  return (
    <View style={[styles(borderRadius).cardContainer, styles().shadowProp]}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={[styles(width, height).image]}>
        <Text style={styles(width, height).text}>{title}</Text>
      </ImageBackground>
    </View>
  );
};
const styles = (width?: number, height?: number, borderRadius?: number) =>
  StyleSheet.create({
    cardContainer: {
      flex: 1,
      borderRadius: 10,
      marginRight: 15,
      marginBottom: 15,
      overflow: 'hidden',
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
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });
export default CategoryCardImage;
