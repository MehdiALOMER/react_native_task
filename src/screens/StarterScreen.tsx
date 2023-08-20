import React, { useEffect } from 'react';

import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { StorageService } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getProductsThunk, setCartData, setFavoriteData } from '@/store/reducers';


const StarterScreen: React.FC = ({ navigation }: any) => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getProducts();
        checkCartData();
    }, []);
    const getProducts = () => {
        dispatch(getProductsThunk());
    };

    const checkCartData = async () => {


        navigation.navigate('BottomTabNavigator', { screen: 'HomeScreen' });

        let cartData = await StorageService.getItem('cartData');
        if (cartData) {
            let data = JSON.parse(cartData);
            dispatch(setCartData(data));
        }

        let favoriteData = await StorageService.getItem('favoriteData');
        if (favoriteData) {
            let data = JSON.parse(favoriteData);
            dispatch(setFavoriteData(data));
        }


        /* StorageService.removeItem('cartData'); */
    }


    return (
        <SafeAreaWrapper>
            <AppHeader title="StarterScreen" />
            <GenericText>StarterScreen</GenericText>
        </SafeAreaWrapper>
    );
};

export default StarterScreen; 