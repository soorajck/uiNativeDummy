import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';
import {CartItem} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {CartItemType} from '../screens/home';
import useCartStore from '../store/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  ItemPage: {item: CartItemType};
};

type Props = NativeStackScreenProps<RootStackParamList>;

const Cart = ({navigation, route}: Props) => {
  //handling clicking on item in the cart

  const handleItemClick = (item: CartItemType) => {
    navigation.navigate('ItemPage', {
      item: item,
    });
  };

  //state Management of cart using zustad

  const cartZustad = useCartStore(state => state.cartItems);
  const addToCart = useCartStore(state => state.setCartItemsData);
  const [cartItems, setCartItems] = useState(cartZustad);

  useEffect(() => {
    setCartItems(cartZustad);
  }, [cartZustad]);

  //handling adding to cart

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? {...item, amount: item.amount + 1}
            : item,
        );
      }
      return [...prev, {...clickedItem, amount: 1}];
    });
  };

  //handling removing from cart

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount - 1}];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[]),
    );
  };

  //getting total number of items in cart

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  //calculating total price of items in the cart

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  //storing cart changes in zustad and asynch storage on internal state change

  useEffect(() => {
    storeData(cartItems);
    addToCart(cartItems);
  }, [cartItems]);

  //function for setting cart items  in asynch storage

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('cartItems', jsonValue);
    } catch (e) {
      Alert.alert('saving data failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
      </View>

      {getTotalItems(cartZustad) === 0 ? (
        <View style={styles.cartEmptyView}>
          <Image
            source={require('../../assets/images/emptyCart.png')}
            style={styles.emptyCartImage}
          />
          <Text style={styles.cartEmptyText}> Your cart is empty !</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.cartItemContainer}>
            {cartZustad.map(item => (
              <CartItem
                key={item.id}
                item={item}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                handleItemClick={handleItemClick}
              />
            ))}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>${calculateTotal(cartZustad)}</Text>
          </View>

          <View style={styles.proceedButtonContainer}>
            <Pressable style={styles.proceedButton}>
              <LinearGradient
                start={{x: 0, y: 1.0}}
                end={{x: 1.0, y: 0}}
                locations={[0, 0.85]}
                colors={['rgba(115, 226, 250, 1)', 'rgba(19, 87, 189, 1)']}
                style={styles.proceedButton}>
                <Text style={styles.proceedButtonText}>Proceed </Text>
                <Text style={styles.proceedButtonText}>{'>'} </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
  },
  scrollView: {
    margin: 5,
  },
  cartItemContainer: {
    marginHorizontal: 15,
  },
  proceedButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
  proceedButton: {
    width: 200,
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  proceedButtonText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  totalText: {
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: colors.textColor,
  },
  totalPrice: {
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: colors.textColorSecondary,
  },
  cartEmptyView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  cartEmptyText: {
    fontSize: 24,
    marginTop: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.textColor,
  },
  emptyCartImage: {
    width: 250,
    height: 250,
    marginRight: 20,
  },
});

export default Cart;
