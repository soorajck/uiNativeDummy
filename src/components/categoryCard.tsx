import React, {Dispatch} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
type props = {
  title: string;

  grad1: string;
  grad2: string;
  height?: number;
  width?: number;
  font: number;
  borderRadius?: number;
  noShadow?: boolean;
  onPress?: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory?: string;
};

const CategoryCard = ({
  title,
  height,
  width,
  font,
  borderRadius,
  noShadow,
  grad1,
  grad2,
  onPress,
  selectedCategory,
}: props) => {
  const handleCategorySeletion = (title: string) => {
    if (onPress) {
      if (selectedCategory === title) {
        onPress('');
      } else {
        onPress(title);
      }
    }
  };

  return (
    <View
      style={[
        styles(grad2, height, width, font, borderRadius, noShadow).mainView,
        styles(grad2, height, width, font, borderRadius, noShadow)
          .shadowContainer,
      ]}>
      <Pressable onPress={() => handleCategorySeletion(title)}>
        <LinearGradient
          start={{x: 0, y: 1.0}}
          end={{x: 1.0, y: 0}}
          locations={[0, 0.85]}
          colors={[grad2, grad1]}
          style={
            styles(grad2, height, width, font, borderRadius).cardContainer
          }>
          <Text style={styles().text}>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};
const styles = (
  grad2?: string,
  height?: number,
  width?: number,
  font?: number,
  borderRadius?: number,
  noShadow?: boolean,
) =>
  StyleSheet.create({
    mainView: {
      height: height ? height + 20 : 80,
      marginRight: 15,
    },
    linerGrad: {},
    cardContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: grad2,
      width: width || 150,
      height: height || 60,
      borderRadius: borderRadius || 9,
      fontSize: font,
    },
    text: {
      fontFamily: 'Montserrat-SemiBold',
      color: '#FFFFFF',
    },
    shadowContainer: {
      shadowColor: grad2,
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
