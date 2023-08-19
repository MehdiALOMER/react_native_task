import React from 'react'
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css'
import { colors, dHeight, dWidth } from '@/constants';
import Icon from './shared/Icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { IGenericProduct, } from '@/types/dataTypes';
import { increaseAndDecreaseQuantityThunk, deleteFromCartThunk } from '@/store/reducers';


interface Props {
    product: IGenericProduct,
    navigation: any
}


const CartProductItem = ({ product, navigation }: Props) => {

    const dispatch = useDispatch<AppDispatch>();


    const goToProductDetail = (product: IGenericProduct) => {
        navigation.navigate('ProductDetailScreen', { product });
    }

    const increaseAndDecreaseQuantity = (type: string) => {
        dispatch(increaseAndDecreaseQuantityThunk({ id: product.id, type }));
    }

    const deleteFromCart = () => {
        dispatch(deleteFromCartThunk(product.id));
    }

    return (
        <GenericView backgroundColor={colors.primaryLight} margin={dWidth * .0125} padding={dWidth * .025} borderRadius={5}>
            <GenericView padding={dWidth * .0125} flexDirection='row'>
                <GenericView flex={1}>
                    <GenericImage source={{ uri: product.image }} resizeMode={"contain"} width={dWidth * .2} height={dWidth * .2} borderRadius={5} />
                </GenericView>
                <GenericView flex={3} paddingLeft={dWidth * .05} paddingRight={dWidth * .05}>
                    <GenericView flex={1}>
                        <GenericText bold>{product.name}</GenericText>
                    </GenericView>
                    <GenericView flex={1}>
                        <GenericText color={colors.primary} bold fontSize={dWidth * .04}>{product.price} ₺</GenericText>
                    </GenericView>
                    <GenericView flex={1} flexDirection='row'>
                        <GenericTouchableOpacity
                            disabled={product.quantity === 1}
                            onPress={increaseAndDecreaseQuantity.bind(this, 'decrease')}
                            center>
                            <Icon name="minus" size={15} color={colors.black} />
                        </GenericTouchableOpacity>
                        <GenericView center>
                            <GenericText color={colors.black} bold> {product.quantity} </GenericText>
                        </GenericView>
                        <GenericTouchableOpacity
                            onPress={increaseAndDecreaseQuantity.bind(this, 'increase')}
                            center>
                            <Icon name="plus" size={15} color={colors.black} />
                        </GenericTouchableOpacity>
                    </GenericView>
                </GenericView>
                <GenericView flex={.5}>
                    <GenericTouchableOpacity
                        onPress={deleteFromCart}
                        center
                    >
                        <Icon name="delete" size={30} color={colors.primary} />
                    </GenericTouchableOpacity>

                </GenericView>

            </GenericView>
        </GenericView>

    )
}

export default CartProductItem;