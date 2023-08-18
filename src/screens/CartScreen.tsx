import React from 'react';

import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';


const CartScreen: React.FC = ({ navigation }: any) => {


    return (
        <SafeAreaWrapper>
            <AppHeader title="Cart" />
            <GenericText>CartScreen</GenericText>
        </SafeAreaWrapper>
    );
};

export default CartScreen; 