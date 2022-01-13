import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = {
  handleBack: () => void;
};

const CustomHeader2 = ({handleBack}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          handleBack();
        }}>
        <Image source={require('../../assets/images/back.png')}></Image>
      </Pressable>

      <Image
        source={require('../../assets/images/fav.png')}
        style={styles.image}></Image>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  image: {
    borderRadius: 50,
  },
});
export default CustomHeader2;
