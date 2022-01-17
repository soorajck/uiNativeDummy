import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';
import {CategoryCard, CategoryCardImage, CustomHeader1} from '../components';
import {dummyCategoryData} from '../store/dummyItemData';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  fetchCategories,
  fetchCategoryProducts,
  fetchProduct,
} from '../store/networkRequest';
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
  category?: string[] | any;
  amount: number;
};

type RootStackParamList = {
  Home: undefined;
  ItemPage: {item: CartItemType};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({navigation}: Props) => {
  //handling clicking on item to redirect to product page
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

  //getting category data from fake store api

  const [categoryData, setCategoryData] = useState<any>();
  const [categoryDataFormated, setCategoryDataFormated] = useState<any>([]);
  const categoryFakeStore = useQuery('repoData1', fetchCategories);

  useEffect(() => {
    if (categoryFakeStore.data) {
      //setting data to display in category cards
      setCategoryData(categoryFakeStore.data?.data);
    }
  }, [categoryFakeStore.data]);

  //merging array of category to dummyCategoryData to get ui gradiants

  const mergeCategoryData = (categoryData: any) => {
    const categoryObject = categoryData
      ? categoryData.map((item: any, index: number) => {
          return {
            category: item,
            id: index + 1,
          };
        })
      : [];

    const result = categoryObject.map((t1: {id: number}) => ({
      ...t1,
      ...dummyCategoryData.find(t2 => t2.id === t1.id),
    }));
    return result;
  };

  //mergin each time category data changes

  useEffect(() => {
    if (categoryData) {
      setCategoryDataFormated(mergeCategoryData(categoryData));
    } else {
      setCategoryDataFormated([]);
    }
  }, [categoryData]);

  //getting item based on category selected when clicking on category card

  const [selectedCategory, setSelectedCategory] = useState<any>('');
  const [categoryDataProduct, setCategoryDataProduct] = useState<any>();
  const categoryBasedDataFakeStore = useQuery(
    ['repoData2', selectedCategory],
    fetchCategoryProducts,
    {enabled: selectedCategory !== ''},
  );

  useEffect(() => {
    if (categoryBasedDataFakeStore.data) {
      setCategoryDataProduct(
        removeRating(categoryBasedDataFakeStore.data?.data),
      );
    }
  }, [categoryBasedDataFakeStore.data]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader1 />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headingText}>What are you deorating today?</Text>
        </View>
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categoryDataFormated.map(
              (item: {
                category: string;
                title: React.Key | null | undefined;
                grad1: string;
                gard2: string;
              }) => (
                <CategoryCard
                  title={item.category}
                  font={14}
                  key={item.category}
                  grad1={item.grad1}
                  grad2={item.gard2}
                  onPress={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  noShadow={selectedCategory !== item.category ? true : false}
                />
              ),
            )}
          </ScrollView>
        </View>

        {isLoading ||
        (categoryBasedDataFakeStore?.isLoading && selectedCategory !== '') ||
        categoryFakeStore?.isLoading ? (
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
                  <Text style={styles.subHeadingText}>
                    {selectedCategory !== ''
                      ? `${
                          selectedCategory.charAt(0).toUpperCase() +
                          selectedCategory.slice(1)
                        } Products`
                      : 'Recomended'}
                  </Text>

                  <FlatList
                    style={styles.subHeadingContent}
                    horizontal
                    data={
                      selectedCategory !== ''
                        ? categoryDataProduct
                        : productsRecomended
                        ? productsRecomended
                        : []
                    }
                    renderItem={renderItemRecomended}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                  />
                </View>
                {selectedCategory === '' && (
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
                )}
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
