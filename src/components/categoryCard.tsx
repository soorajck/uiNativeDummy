import React from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

type props = {
  title: string;
  color: string;
  height?: number;
  width?: number;
  font: number;
  borderRadius?: number;
  noShadow?: boolean;
  onPress?: () => void;
};

const CategoryCard = ({
  title,
  color,
  height,
  width,
  font,
  borderRadius,
  noShadow,
  onPress,
}: props) => {
  return (
    <View
      style={[
        styles(color, height, width, font, borderRadius, noShadow).mainView,
        styles(color, height, width, font, borderRadius, noShadow)
          .shadowContainer,
      ]}>
      <Pressable
        style={[
          styles(color, height, width, font, borderRadius).cardContainer,
        ]}>
        <Text style={styles().text}>{title}</Text>
      </Pressable>
    </View>
  );
};
const styles = (
  color?: string,
  height?: number,
  width?: number,
  font?: number,
  borderRadius?: number,
  noShadow?: boolean,
) =>
  StyleSheet.create({
    mainView: {
      height: height ? height + 20 : 80,
    },
    cardContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color,
      width: width || 150,
      height: height || 60,
      borderRadius: borderRadius || 9,
      marginRight: 15,
      fontSize: font,
    },
    text: {
      fontFamily: 'Montserrat-SemiBold',
      color: '#FFFFFF',
    },
    shadowContainer: {
      shadowColor: color,
      shadowOffset: {
        width: noShadow ? 0 : 3,
        height: noShadow ? 0 : 15,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });
export default CategoryCard;
