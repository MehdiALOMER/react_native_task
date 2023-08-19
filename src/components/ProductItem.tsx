import React from 'react'
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css'
import { colors, dHeight, dWidth } from '@/constants';
import Icon from './shared/Icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { IGenericProduct } from '@/types/dataTypes';
import { addToCartThunk } from '@/store/reducers';


interface Props {
    product: IGenericProduct,
    navigation: any
}



const ProductItem = ({ product, navigation }: Props) => {

    const dispatch = useDispatch<AppDispatch>();


    const goToProductDetail = (product: IGenericProduct) => {
        navigation.navigate('ProductDetailScreen', { product });
    }

    const addToCart = (id: number) => {
        dispatch(addToCartThunk(id));
    }
    return (
        <GenericView flex={1} backgroundColor={colors.primaryLight} width={dWidth * .45} height={dWidth * .6} margin={dWidth * .0125} padding={dWidth * .025} borderRadius={5}>
            <GenericView padding={dWidth * .0125}>
                <GenericTouchableOpacity
                    onPress={goToProductDetail.bind(this, product)}
                >
                    <GenericView flex={1}>
                        <GenericImage source={{ uri: product.image }} resizeMode={"cover"} width={dWidth * .3875} height={dWidth * .4} />
                    </GenericView>
                    <GenericView marginTop={dWidth * .025}>
                        <GenericText color={colors.primary}>{product.price} ₺</GenericText>
                    </GenericView>
                    <GenericView marginTop={dWidth * .025} marginBottom={dWidth * .025}>
                        <GenericText color={colors.black}>{product.name}</GenericText>
                    </GenericView>
                </GenericTouchableOpacity>
                <GenericView>
                    <GenericTouchableOpacity
                        onPress={addToCart.bind(this, product.id)}
                        backgroundColor={colors.primary} padding={dWidth * .025} center borderRadius={5}
                    >
                        <GenericText color={colors.white}>Add to Cart</GenericText>
                    </GenericTouchableOpacity>
                </GenericView>
            </GenericView>
        </GenericView>

    )
}

export default ProductItem;