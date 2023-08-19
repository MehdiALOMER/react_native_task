import React, { useEffect } from 'react';

import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { StorageService } from '@/utils/storage';


const StarterScreen: React.FC = ({ navigation }: any) => {

    useEffect(() => {
        checkCartData();
    }, []);
    const checkCartData = async () => {
        const cartData = await StorageService.getItem('cartData');
        console.log('cartData ::::::::: ', cartData);

        navigation.navigate('BottomTabNavigator', { screen: 'HomeScreen' });
    }


    return (
        <SafeAreaWrapper>
            <AppHeader title="Cart" />
            <GenericText>StarterScreen</GenericText>
        </SafeAreaWrapper>
    );
};

export default StarterScreen; 