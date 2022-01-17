import React from 'react';
import {View, Alert} from 'react-native';
import Routes from './src/navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCartStore from './src/store/useStore';
import {QueryClient, QueryClientProvider} from 'react-query';

const App = () => {
  //storing reduer to zustad
  const addToCart = useCartStore(state => state.setCartItemsData);

  //getting data from asych storage on app load
  const getDataFromAsyncStorage = async () => {
    try {
      AsyncStorage.getItem('cartItems').then(value => {
        if (value != null) {
          addToCart(JSON.parse(value));
        } else {
        }
      });
    } catch (e) {
      Alert.alert('Fetching data failed');
    }
  };

  //running fetch data from asycn storage on app load

  React.useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{flex: 1}}>
        <Routes />
      </View>
    </QueryClientProvider>
  );
};

export default App;
