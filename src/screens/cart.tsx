import React from 'react';
import {Image, StyleSheet, View, Text, ScrollView} from 'react-native';
import colors from '../../assets/colors/colors';
import {CustomHeader2, CategoryCard} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const Cart = ({navigation}: Props) => {
  //handling back button click
  const handleBack = () => {
    navigation.navigate('Home');
  };

  //dummy data for categories / badges
  const dummyData = [
    {
      title: 'Home',
      color: '#13BD75',
    },

    {
      title: 'Office',
      color: '#1357BD',
    },

    {
      title: 'Hotel',
      color: '#4913BD',
    },

    {
      title: 'Beach',
      color: '#8EFA73',
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader2 handleBack={handleBack} />
      <View style={styles.shadowContainer}>
        <Image
          source={require('../../assets/images/flower5.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>LeDécor Veases set of 5</Text>
        <Text style={styles.headerSubText}>by LeDécor</Text>
      </View>
      <View style={styles.priceAndRating}>
        <Text style={styles.priceText}>$ 24.99</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((e, i) => (
            <Image
              source={require('../../assets/images/starRated.png')}
              key={Math.random()}
            />
          ))}
          <Image source={require('../../assets/images/starUnrated.png')} />
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
                color={item.color}
                height={32}
                width={92}
                borderRadius={3}
                font={12}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.desc}>
        <Text style={styles.descText}>
          High Grade Porcelain Ceramic Material Light Weight, Durable & Long
          Lasting Impression It glories your home interiors beautifully Royal
          touch finishing, best deal for gifting
        </Text>
      </View>
    </View>
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
    marginTop: 30,
    marginHorizontal: 30,
  },
  descText: {
    fontSize: 14,
    lineHeight: 25,
    color: colors.textColor,
    fontFamily: 'Montserrat-Regular',
  },
});
export default Cart;
