import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import colors from '../../assets/colors/colors';
import {CategoryCard, CategoryCardImage, CustomHeader1} from '../components';

const Home = () => {
  //dummy data for categories / badges
  const dummyCategoryData = [
    {
      title: 'Living Room',
      grad1: 'rgba(142, 250, 115, 1)',
      gard2: 'rgba(19, 189, 117, 1)',
    },

    {
      title: 'Bed Room',
      grad1: 'rgba(115, 226, 250, 1)',
      gard2: 'rgba(19, 87, 189, 1)',
    },
    {
      title: 'Dinning Room',
      grad1: 'rgba(158, 115, 250, 1)',
      gard2: 'rgba(73, 19, 189, 1)',
    },
    {
      title: 'Kitchen',
      grad1: 'rgba(223, 115, 250, 1)',
      gard2: 'rgba(255, 94, 26, 1)',
    },
  ];
  //dummy data image cards1
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

  //dummy data image cards1
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
              font={14}
              key={item.title}
              grad1={item.grad1}
              grad2={item.gard2}
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
