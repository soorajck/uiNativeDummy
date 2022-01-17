import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';
import {CategoryCard, CategoryCardImage, CustomHeader1} from '../components';
import {
  dummyDataRecomended,
  dummyDataIdeal,
  dummyCategoryData,
} from '../store/dummyItemData';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fetchProduct} from '../store/networkRequest';
import {useQuery} from 'react-query';
import {ActivityIndicator} from 'react-native';

//type defenition of cart item
export type CartItemType = {
  id: number;
  description: string;
  image: string;
  price: number;
  title: string;
  rating: number | any;
  category: string[] | any;
  amount: number;
};

type RootStackParamList = {
  Home: undefined;
  ItemPage: {item: CartItemType};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({navigation}: Props) => {
  //handling clicking on itemto redirect to product page

  const handleItemClick = (item: CartItemType) => {
    navigation.navigate('ItemPage', {
      item: item,
    });
  };

  //recomended items flatslist component

  const Recomended = ({title, image, item}: any) => (
    <CategoryCardImage
      height={150}
      width={315}
      title={title}
      image={image}
      borderRadius={10}
      item={item}
      handleItemClick={handleItemClick}
    />
  );
  //render items flatlist recomended

  const renderItemRecomended = ({item}: any) => (
    <Recomended title={item.title} image={item.image} item={item} />
  );

  //popular items flatlist component

  const Popular = ({item, image}: any) => (
    <CategoryCardImage
      height={140}
      width={120}
      image={item.image}
      borderRadius={12}
      item={item}
      handleItemClick={handleItemClick}
    />
  );

  //render items popular flatlist

  const renderItemPopular = ({item}: any) => <Popular item={item} />;

  // formating rating to numbers

  const removeRating = (products: any) => {
    return products.map((item: CartItemType) => {
      return {
        ...item,
        rating: Math.ceil(item.rating.rate),
      };
    });
  };

  //getting products from fake store api

  const [productsRecomended, setProductsRecomended] = useState<any>();
  const [productsPopular, setProductsPopular] = useState<any>();

  const {isLoading, error, data} = useQuery('repoData', fetchProduct);

  useEffect(() => {
    if (data) {
      //setting first 5 products in recomended
      setProductsRecomended(removeRating(data?.data).slice(0, 5));

      //setting rest of products in popular
      setProductsPopular(removeRating(data?.data).slice(5, data?.data.length));
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader1 />
      <ScrollView style={styles.scrollView}>
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

        {isLoading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator
              color={'rgba(115, 226, 250, 1)'}
              size={'large'}
            />
          </View>
        ) : (
          <>
            {error ? (
              <View style={styles.loadingView}>
                <Text>Items Not Found</Text>
              </View>
            ) : (
              <>
                <View style={styles.subHeading}>
                  <Text style={styles.subHeadingText}>Recomended</Text>

                  <FlatList
                    style={styles.subHeadingContent}
                    horizontal
                    data={productsRecomended ? productsRecomended : []}
                    renderItem={renderItemRecomended}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                  />
                </View>

                <View style={[styles.subHeading, styles.finalContent]}>
                  <Text style={styles.subHeadingText}>Popular</Text>

                  <FlatList
                    style={styles.subHeadingContent}
                    horizontal
                    data={productsPopular ? productsPopular : []}
                    renderItem={renderItemPopular}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                  />
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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

  finalContent: {
    marginBottom: 30,
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  loadingView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
  },
});
export default Home;
