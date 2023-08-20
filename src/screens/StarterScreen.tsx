import React, { useEffect } from 'react';
import Lottie from 'lottie-react-native'
import { StorageService } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getProductsThunk, setCartData, setFavoriteData } from '@/store/reducers';


const StarterScreen: React.FC = ({ navigation }: any) => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getProducts();
        checkLocalStorage();
    }, []);

    const getProducts = () => {
        dispatch(getProductsThunk());
    };

    // Check if there is any data in local storage and set it to redux store
    const checkLocalStorage = async () => {

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

        navigation.navigate('BottomTabNavigator', { screen: 'HomeScreen' });

        /* StorageService.removeItem('cartData'); */
    }


    return (
        <Lottie source={require('../assets/lottie/loading.json')} autoPlay loop />
    );
};

export default StarterScreen; 