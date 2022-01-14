import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Cart, Search, Favorite, ItemPage} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../../assets/colors/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//creating tab navigator for bottom navigation

export const TabNavigators = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 100,
          paddingTop: 30,
          backgroundColor: colors.backgroundNavigationBar,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return <Image source={require('../../assets/images/home.png')} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return <Image source={require('../../assets/images/search.png')} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return <Image source={require('../../assets/images/fav.png')} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarLabel: '',

          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../../assets/images/shopping-cart.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

//defining stack navigator

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigators">
        <Stack.Screen
          name="TabNavigators"
          component={TabNavigators}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ItemPage"
          component={ItemPage}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
