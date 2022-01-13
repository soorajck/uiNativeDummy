import React from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

type props = {
  title: string;
  color: string;
  height?: number;
  width?: number;
  font: number;
  borderRadius?: number;
  onPress?: () => void;
};

const CategoryCard = ({
  title,
  color,
  height,
  width,
  font,
  borderRadius,
  onPress,
}: props) => {
  return (
    <Pressable
      style={[
        styles(color, height, width, font, borderRadius).cardContainer,
        styles(color).shadowProp,
      ]}>
      <Text style={styles().text}>{title}</Text>
    </Pressable>
  );
};
const styles = (
  color?: string,
  height?: number,
  width?: number,
  font?: number,
  borderRadius?: number,
) =>
  StyleSheet.create({
    cardContainer: {
      flex: 1,
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
    shadowProp: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });
export default CategoryCard;
