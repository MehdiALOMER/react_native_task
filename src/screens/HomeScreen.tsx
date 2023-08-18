import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getProductsThunk } from '@/store/reducers';
import { IProduct } from '@/types/dataTypes';
import ProductItem from '@/components/ProductItem';
import { dWidth } from '@/constants';


const HomeScreen: React.FC = ({ navigation }: any) => {

  const dispatch = useDispatch<AppDispatch>();

  const productList: IProduct[] = useSelector((state: RootState) => state.productReducer.filteredProductList || []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    dispatch(getProductsThunk());
  };


  const renderItem = ({ item }: { item: IProduct }) => {
    return <ProductItem product={item} navigation={navigation} />;
  };


  return (
    <SafeAreaWrapper>
      <AppHeader title="Home" />
      <GenericView padding={dWidth * .0125} flex={1}>
        <FlatList
          numColumns={2}
          data={productList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </GenericView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen; 