import React from 'react';

import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IGenericProduct } from '@/types/dataTypes';
import { colors, dWidth } from '@/constants';
import Icon from '@/components/shared/Icons';
import { FlatList } from 'react-native';
import CartProductItem from '@/components/CartProductItem';


const CartScreen: React.FC = ({ navigation }: any) => {

    const cartData: IGenericProduct[] = useSelector((state: RootState) => state.cartReducer.cartData || []);
    const cartTotalPrice: number = useSelector((state: RootState) => state.cartReducer.cartTotalPrice || 0);


    const renderItem = ({ item }: { item: IGenericProduct }) => {
        return <CartProductItem product={item} navigation={navigation} />;
    };

    return (
        <SafeAreaWrapper>
            <AppHeader title="Cart" />
            <GenericView flex={1}>

                {
                    cartData.length !== 0 ?
                        <GenericView flex={1}>
                            <GenericView flex={7}>
                                <FlatList
                                    data={cartData}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </GenericView>
                            <GenericView flex={1} padding={dWidth * .02} spaceBetween borderTopWidth={1} borderTopColor={colors.primary}>
                                <GenericView flexDirection='row' spaceBetween>
                                    <GenericView>
                                        <GenericText bold fontSize={16} color={colors.black}>Total:</GenericText>
                                    </GenericView><GenericView>
                                        <GenericText bold fontSize={16} color={colors.primary}>{cartTotalPrice} ₺</GenericText>
                                    </GenericView>
                                </GenericView>
                                <GenericTouchableOpacity
                                    onPress={() => { }}
                                    backgroundColor={colors.primary} borderRadius={5} center padding={dWidth * .02}
                                >
                                    <GenericText color={colors.white} bold>Complete</GenericText>
                                </GenericTouchableOpacity>
                            </GenericView>
                        </GenericView>
                        :
                        <GenericView flex={1} center>
                            <GenericView>
                                <GenericText color={colors.black}>No items in cart</GenericText>
                            </GenericView>
                            <GenericView marginTop={dWidth * .05}>
                                <GenericTouchableOpacity
                                    onPress={() => navigation.navigate('BottomTabNavigator', { screen: 'HomeScreen' })}
                                    backgroundColor={colors.primary} borderRadius={5} padding={dWidth * .02} flexDirection='row'>
                                    <GenericView>
                                        <Icon name="cart" size={20} color={colors.white} />
                                    </GenericView>
                                    <GenericView>
                                        <GenericText color={colors.white}>  Shop Now</GenericText>
                                    </GenericView>
                                </GenericTouchableOpacity>
                            </GenericView>
                        </GenericView>
                }
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default CartScreen; 