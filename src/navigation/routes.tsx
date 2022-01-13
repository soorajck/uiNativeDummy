import * as React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Cart, Search, Favorite} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

function Routes() {
  //creating tab navidation
  const Tab = createBottomTabNavigator();
  //this file is only for the bottom tab navigation

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 100,
            paddingTop: 30,
            backgroundColor: 'rgba(40, 49, 59, 0.83)',
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
              return (
                <Image source={require('../../assets/images/search.png')} />
              );
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
    </NavigationContainer>
  );
}

export default Routes;

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: 'rgba(40, 49, 59, 0.6)',
    height: 90,
    position: 'absolute',
    paddingTop: 10,
  },
});
