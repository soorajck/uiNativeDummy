import React from 'react';
import {View, Alert} from 'react-native';
import Routes from './src/navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCartStore from './src/store/useStore';

const App = () => {
  const addToCart = useCartStore(state => state.setCartItemsData);

  const getDataFromAsyncStorage = async () => {
    try {
      AsyncStorage.getItem('cartItems').then(value => {
        if (value != null) {
          console.log(value);
          addToCart(JSON.parse(value));
        } else {
        }
      });
    } catch (e) {
      Alert.alert('Fetching data failed');
    }
  };

  //running fetch data from asycn storage

  React.useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Routes />
    </View>
  );
};

export default App;
