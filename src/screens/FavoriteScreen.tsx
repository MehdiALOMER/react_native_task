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


const FavoriteScreen: React.FC = ({ navigation }: any) => {

    const dispatch = useDispatch<AppDispatch>();

    const favoriteList: IGenericProduct[] = useSelector((state: RootState) => state.productReducer.favoriteList || []);




    useEffect(() => {

    }, []);



    const renderItem = ({ item }: { item: IGenericProduct }) => {
        return <ProductItem product={item} navigation={navigation} />;
    };




    return (
        <SafeAreaWrapper>
            <AppHeader title="Favorite" />
            <GenericView padding={dWidth * .0125} flex={1}>
                <GenericView>
                    <FlatList
                        numColumns={2}
                        data={favoriteList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </GenericView>
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default FavoriteScreen; 