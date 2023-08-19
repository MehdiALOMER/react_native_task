import React, { useEffect, useCallback } from 'react';
import { FlatList, Modal, ScrollView } from 'react-native';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { changeCheckedBrand, changeCheckedModel, changeCheckedSort, filterProducts, loadMoreProducts, searchProducts } from '@/store/reducers';
import { IGenericProduct, IProduct, IProductBrand, IProductModel } from '@/types/dataTypes';
import ProductItem from '@/components/ProductItem';
import { colors, dHeight, dWidth } from '@/constants';
import SearchBar from '@/components/SearchBar';
import Icon from '@/components/shared/Icons';
import { RadioButton, Checkbox } from 'react-native-paper';


const HomeScreen: React.FC = ({ navigation }: any) => {

  const dispatch = useDispatch<AppDispatch>();

  const displayedProducts: IGenericProduct[] = useSelector((state: RootState) => state.productReducer.displayedProducts || []);


  const [state, setState] = React.useState({ showModal: false });
  const { showModal } = state;


  const sortChecked: string = useSelector((state: RootState) => state.productReducer.sortChecked || '');
  const productBrandList: IProductBrand[] = useSelector((state: RootState) => state.productReducer.productBrandList || []);
  const productModelList: IProductModel[] = useSelector((state: RootState) => state.productReducer.productModelList || []);

  useEffect(() => {

  }, []);




  const renderItem = ({ item }: { item: IGenericProduct }) => {
    return <ProductItem product={item} navigation={navigation} />;
  };

  const loadMore = () => {
    dispatch(loadMoreProducts());
  };

  const searchProductList = useCallback((query: string) => {
    dispatch(searchProducts(query));
  }, []);

  const goFavorite = () => {
    navigation.navigate('FavoriteScreen');
  }


  return (
    <SafeAreaWrapper>
      <AppHeader title="Home" right="heart" onRightPress={goFavorite} />
      <GenericView padding={dWidth * .0125} flex={1}>
        <GenericView marginBottom={dWidth * .01} flexDirection='row'>
          <GenericView flex={6}>
            <SearchBar searchProductList={searchProductList} />
          </GenericView>
          <GenericView flex={1} center>
            <GenericTouchableOpacity
              onPress={() => setState({ ...state, showModal: true })}
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
          <GenericView flex={1} backgroundColor={colors.white} >
            <GenericView flex={.5} flexDirection='row'>
              <GenericView>
                <GenericTouchableOpacity onPress={() => setState({ ...state, showModal: false })}>
                  <Icon name='close' size={30} color={colors.black} />
                </GenericTouchableOpacity>
              </GenericView>
              <GenericView>
                <GenericText fontSize={16}>Filter</GenericText>
              </GenericView>
            </GenericView>
            <GenericView flex={3} margin={dWidth * .02} borderBottomWidth={1} borderBottomColor={colors.gray}>
              <GenericView>
                <GenericText>Sort By</GenericText>
              </GenericView>
              <GenericView>
                <GenericView flexDirection='row'>
                  <GenericView center>
                    <RadioButton
                      value="oldToNew"
                      status={sortChecked === 'oldToNew' ? 'checked' : 'unchecked'}
                      onPress={() => { dispatch(changeCheckedSort('oldToNew')) }}
                      color={colors.primary}
                    />
                  </GenericView>
                  <GenericView center>
                    <GenericText>Old to New</GenericText>
                  </GenericView>
                </GenericView>
                <GenericView flexDirection='row'>
                  <GenericView center>
                    <RadioButton
                      value="newToOld"
                      status={sortChecked === 'newToOld' ? 'checked' : 'unchecked'}
                      onPress={() => { dispatch(changeCheckedSort('newToOld')) }}
                      color={colors.primary}
                    />
                  </GenericView>
                  <GenericView center>
                    <GenericText>New to Old</GenericText>
                  </GenericView>
                </GenericView>
                <GenericView flexDirection='row'>
                  <GenericView center>
                    <RadioButton
                      value="priceHighToLow"
                      status={sortChecked === 'priceHighToLow' ? 'checked' : 'unchecked'}
                      onPress={() => { dispatch(changeCheckedSort('priceHighToLow')) }}
                      color={colors.primary}
                    />
                  </GenericView>
                  <GenericView center>
                    <GenericText>Price High to Low</GenericText>
                  </GenericView>
                </GenericView>
                <GenericView flexDirection='row'>
                  <GenericView center>
                    <RadioButton
                      value="priceLowToHigh"
                      status={sortChecked === 'priceLowToHigh' ? 'checked' : 'unchecked'}
                      onPress={() => { dispatch(changeCheckedSort('priceLowToHigh')) }}
                      color={colors.primary}
                    />
                  </GenericView>
                  <GenericView center>
                    <GenericText>Price Low to High</GenericText>
                  </GenericView>
                </GenericView>
              </GenericView>
            </GenericView>
            <GenericView flex={3} margin={dWidth * .02} borderBottomWidth={1} borderBottomColor={colors.gray}>
              <GenericView>
                <GenericText>Brand</GenericText>
              </GenericView>
              <GenericView>
                <ScrollView>
                  {
                    productBrandList.map((item: IProductBrand, index: number) => {
                      return (
                        <GenericView key={index} flexDirection='row'>
                          <GenericView center>
                            <Checkbox
                              status={item.checked ? 'checked' : 'unchecked'}
                              onPress={() => { dispatch(changeCheckedBrand(item.brand)) }}
                              color={colors.primary}
                            />
                          </GenericView>
                          <GenericView center>
                            <GenericText>{item.brand}</GenericText>
                          </GenericView>
                        </GenericView>
                      )
                    })
                  }
                </ScrollView>
              </GenericView>
            </GenericView>
            <GenericView flex={3} margin={dWidth * .02}>
              <GenericView>
                <GenericText>Model</GenericText>
              </GenericView>
              <GenericView>
                <ScrollView>
                  {
                    productModelList.map((item: IProductModel, index: number) => {
                      return (
                        <GenericView key={index} flexDirection='row'>
                          <GenericView center>
                            <Checkbox
                              status={item.checked ? 'checked' : 'unchecked'}
                              onPress={() => { dispatch(changeCheckedModel(item.model)) }}
                              color={colors.primary}
                            />
                          </GenericView>
                          <GenericView center>
                            <GenericText>{item.model}</GenericText>
                          </GenericView>
                        </GenericView>
                      )
                    })
                  }
                </ScrollView>
              </GenericView>
            </GenericView>
            <GenericView flex={.5} padding={dWidth * .02}>
              <GenericTouchableOpacity
                onPress={() => {
                  dispatch(filterProducts())
                  setState({ ...state, showModal: false })
                }}
                backgroundColor={colors.primary} borderRadius={5} center padding={dWidth * .02}
              >
                <GenericText color={colors.white} bold>Primary</GenericText>
              </GenericTouchableOpacity>
            </GenericView>
          </GenericView>
        </Modal>

      </GenericView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen; 