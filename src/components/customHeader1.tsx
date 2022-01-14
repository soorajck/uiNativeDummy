import React from 'react';
import {Image, StyleSheet, View, Platform} from 'react-native';

const CustomHeader1 = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/menu.png')} />
      <Image
        source={require('../../assets/images/person.png')}
        style={styles.image}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,

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
export default CustomHeader1;
