import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import colors from '../../assets/colors/colors';
import {CustomHeader2, CategoryCard} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {dummyData} from '../store/dummyItemData';
import {CartItemType} from './home';
import useCartStore from '../store/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  ItemPage: {item: CartItemType};
};

type Props = NativeStackScreenProps<RootStackParamList>;
const ItemPage = ({navigation, route}: Props) => {
  //handling back button click

  const handleBack = () => {
    navigation.goBack();
  };

  //getting item from props passed from navigation stack

  const {item}: any = route.params;

  //stateManagement of cart using zustad

  const cartZustad = useCartStore(state => state.cartItems);
  const addToCart = useCartStore(state => state.setCartItemsData);
  const [cartItems, setCartItems] = useState(cartZustad);

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

  //handling item availability in cart

  const handleItemAvailability = (id: number) => {
    const item = cartZustad.find(item => item.id === id);
    if (item) {
      return true;
    }
    return false;
  };

  //storing cart changes in zustad store and async storage

  useEffect(() => {
    addToCart(cartItems);
    storeData(cartItems);
  }, [cartItems]);

  //setting in asynch storage cart items

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
      <CustomHeader2 handleBack={handleBack} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.shadowContainer}>
          <Image
            source={require('../../assets/images/flower5.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{item.title}</Text>
          <Text style={styles.headerSubText}>by LeDécor</Text>
        </View>
        <View style={styles.priceAndRating}>
          <Text style={styles.priceText}>$ {item.price}</Text>
          <View style={styles.ratingContainer}>
            {[...Array(item.rating)].map((e, i) => (
              <Image
                source={require('../../assets/images/starRated.png')}
                key={Math.random()}
              />
            ))}

            {[...Array(5 - item.rating)].map((e, i) => (
              <Image
                source={require('../../assets/images/starUnrated.png')}
                key={Math.random()}
              />
            ))}
          </View>
        </View>
        <View style={styles.idealContainer}>
          <Text style={styles.idealHeading}>Ideal for</Text>
          <View style={styles.idealContainerBadge}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dummyData.map(item => (
                <CategoryCard
                  title={item.title}
                  key={Math.random()}
                  height={32}
                  width={92}
                  borderRadius={3}
                  font={12}
                  noShadow={true}
                  grad1={item.grad1}
                  grad2={item.gard2}
                />
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
      </ScrollView>
      <Pressable
        style={styles.addToCartButton}
        onPress={() =>
          handleItemAvailability(item.id)
            ? handleRemoveFromCart(item.id)
            : handleAddToCart(item)
        }>
        <Image source={require('../../assets/images/shopping-cart.png')} />
        <Text style={styles.addToCartText}>
          {handleItemAvailability(item.id) ? 'Remove from Cart' : 'Add to Cart'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },

  image: {
    height: 175,
    marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 12,
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  headerText: {
    fontSize: 36,
    lineHeight: 42,
    fontFamily: 'Montserrat-Bold',
  },
  headerSubText: {
    fontSize: 18,
    color: colors.textColor,
    opacity: 0.5,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 21,
  },
  priceAndRating: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: 5,
  },

  priceText: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.textColorSecondary,
    fontFamily: 'Montserrat-Bold',
  },
  idealContainer: {
    marginTop: 30,
    marginHorizontal: 30,
    textAlign: 'start',
  },
  idealHeading: {
    fontSize: 18,
    color: colors.textColor,
    opacity: 0.5,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 21,
  },
  idealContainerBadge: {
    marginTop: 8,
  },
  desc: {
    marginTop: 10,
    marginHorizontal: 30,
    marginBottom: 40,
  },
  descText: {
    fontSize: 14,
    lineHeight: 25,
    color: colors.textColor,
    fontFamily: 'Montserrat-Regular',
  },
  addToCartButton: {
    height: 100,
    backgroundColor: colors.backgroundNavigationBar,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
  },
  addToCartText: {
    marginLeft: 17,
    color: colors.textColorNavigationBar,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Montserrat-semibold',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
});
export default ItemPage;
