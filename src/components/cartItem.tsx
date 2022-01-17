import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';
import {CartItemType} from '../screens/home';
type props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  handleItemClick: (item: CartItemType) => void;
};

export default function CartItem({
  item,
  addToCart,
  removeFromCart,
  handleItemClick,
}: props) {
  return (
    <View style={styles.container} key={item.id}>
      <Pressable onPress={() => handleItemClick(item)}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />
      </Pressable>
      <View style={styles.dataHolder}>
        <Text style={styles.itemName}>{item.title}</Text>
        <View style={styles.volumePriceContainer}>
          <Text style={styles.priceText}>$ {item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Pressable
            onPress={() => {
              removeFromCart(item.id);
            }}>
            <LinearGradient
              start={{x: 0, y: 1.0}}
              end={{x: 1.0, y: 0}}
              locations={[0, 0.85]}
              colors={['rgba(115, 226, 250, 1)', 'rgba(19, 87, 189, 1)']}
              style={styles.quantityButtons}>
              <Text style={styles.quantityButtonText}>-</Text>
            </LinearGradient>
          </Pressable>
          <Text style={styles.volumeText}>{item.amount}</Text>
          <Pressable
            onPress={() => {
              addToCart(item);
            }}>
            <LinearGradient
              start={{x: 0, y: 1.0}}
              end={{x: 1.0, y: 0}}
              locations={[0, 0.85]}
              colors={['rgba(115, 226, 250, 1)', 'rgba(19, 87, 189, 1)']}
              style={styles.quantityButtons}>
              <Text style={styles.quantityButtonText}>+</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    margin: 10,
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  dataHolder: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '60%',
  },
  itemName: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  volumeText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  priceText: {
    fontSize: 16,
    color: colors.textColorSecondary,
    fontFamily: 'Montserrat-Bold',
  },
  volumePriceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quantityContainer: {
    display: 'flex',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    alignItems: 'center',
  },
  quantityButtons: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  quantityButtonText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.textColor,
  },
});
