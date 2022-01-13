import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import colors from '../../assets/colors/colors';
import {CategoryCard, CategoryCardImage, CustomHeader1} from '../components';

const Home = () => {
  const dummyCategoryData = [
    {
      title: 'Living Room',
      color: '#13BD75',
    },

    {
      title: 'Bed Room',
      color: '#1357BD',
    },
    {
      title: 'Dinning Room',
      color: '#4913BD',
    },
    {
      title: 'Kitchen',
      color: '#8EFA73',
    },
  ];

  const dummyDataCards = [
    {
      title: 'Candle Holder',
      image: require('../../assets/images/candle.png'),
    },
    {
      title: 'Candle Holder',
      image: require('../../assets/images/candle.png'),
    },
    {
      title: 'Candle Holder',
      image: require('../../assets/images/candle.png'),
    },
  ];
  const dummyDataCards1 = [
    {
      image: require('../../assets/images/flower1.png'),
    },
    {
      image: require('../../assets/images/flower2.png'),
    },
    {
      image: require('../../assets/images/flower3.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader1 />
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>What are you deorating today?</Text>
      </View>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dummyCategoryData.map(item => (
            <CategoryCard
              title={item.title}
              color={item.color}
              font={14}
              key={item.title + item.color}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingText}>Recomended</Text>

        <ScrollView
          horizontal
          style={styles.subHeadingContent}
          showsHorizontalScrollIndicator={false}>
          {dummyDataCards.map(item => (
            <CategoryCardImage
              height={150}
              width={315}
              title={item.title}
              image={item.image}
              borderRadius={10}
              key={Math.random()}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingText}>Popular</Text>

        <ScrollView
          horizontal
          style={styles.subHeadingContent}
          showsHorizontalScrollIndicator={false}>
          {dummyDataCards1.map(item => (
            <CategoryCardImage
              height={140}
              width={120}
              image={item.image}
              borderRadius={12}
              key={Math.random()}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    marginHorizontal: 30,
    marginVertical: 28,
  },
  headingText: {
    fontSize: 36,
    fontFamily: 'Montserrat-Bold',
    color: colors.textColor,
    lineHeight: 42,
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  subHeading: {
    marginTop: 30,
    textAlign: 'start',
    marginLeft: 30,
  },
  subHeadingText: {
    fontSize: 18,
    color: colors.textColor,
    fontFamily: 'Montserrat-SemiBold',
    opacity: 0.5,
  },
  subHeadingContent: {
    marginTop: 19,
    marginRight: 30,
  },
});
export default Home;
