import React, { useEffect, useCallback } from 'react';
import { FlatList, Modal, ScrollView } from 'react-native';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loadMoreProducts, searchProducts } from '@/store/reducers';
import { IGenericProduct } from '@/types/dataTypes';
import ProductItem from '@/components/ProductItem';
import { colors, dWidth } from '@/constants';
import SearchBar from '@/components/SearchBar';
import Icon from '@/components/shared/Icons';
import FilterView from '@/components/FilterView';


const HomeScreen: React.FC = ({ navigation }: any) => {

  const dispatch = useDispatch<AppDispatch>();

  const displayedProducts: IGenericProduct[] = useSelector((state: RootState) => state.productReducer.displayedProducts || []);


  const [state, setState] = React.useState({ showModal: false });
  const { showModal } = state;




  useEffect(() => {

  }, []);




  const renderItem = ({ item }: { item: IGenericProduct }) => {
    return <ProductItem product={item} navigation={navigation} />;
  };

  const loadMore = () => {
    dispatch(loadMoreProducts());
  };

  // ürün arama
  const searchProductList = useCallback((query: string) => {
    dispatch(searchProducts(query));
  }, []);


  const goFavorite = () => {
    navigation.navigate('FavoriteScreen');
  }

  const changeShowModal = () => {   // modalı açıp kapatan fonksiyon
    setState({ ...state, showModal: !showModal });
  }


  return (
    <SafeAreaWrapper>
      <AppHeader title="Home" right="heart" onRightPress={goFavorite} />
      <GenericView padding={dWidth * .0125} flex={1} marginBottom={dWidth * .15}>
        <GenericView marginBottom={dWidth * .01} flexDirection='row' marginLeft={dWidth * .0125}>
          <GenericView flex={6}>
            <SearchBar search={searchProductList} />
          </GenericView>
          <GenericView flex={1} center>
            <GenericTouchableOpacity
              onPress={() => changeShowModal()}
            >
              <Icon name='filter' size={35} color={colors.primary} />
            </GenericTouchableOpacity>
          </GenericView>
        </GenericView>
        <GenericView>
          <FlatList
            numColumns={2}
            data={displayedProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMore}
          />
        </GenericView>


        {/* Filter Modal */}
        <Modal
          visible={showModal}
          transparent={true}
        >
          <FilterView changeShowModal={changeShowModal} />
        </Modal>

      </GenericView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen; 