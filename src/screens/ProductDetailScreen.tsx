import React, { useEffect } from 'react';
import { Modal, ScrollView } from 'react-native';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppStackNavigator";
import Icon from '@/components/shared/Icons';
import { colors, dHeight, dWidth } from '@/constants';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addToCartThunk } from '@/store/reducers';


type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetailScreen'>;
interface Props {
    navigation: any;
    route: ProductDetailScreenRouteProp;
}


const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {

    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({ showZoom: false, zoomImages: [], quantity: 1 });
    const { zoomImages, showZoom, quantity } = state;

    const onPressBack = () => {
        navigation.goBack();
    }

    useEffect(() => {

        //zoom images
        let zoomImages: any = [];
        zoomImages.push({
            url: route.params.product.image
        });
        setState({ ...state, zoomImages });
    }, []);

    // quantity değerini arttırıp azaltma
    const increaseAndDecreaseQuantity = (type: string) => {
        if (type === 'increase') {
            setState({ ...state, quantity: quantity + 1 });
        } else {
            if (quantity > 1) {
                setState({ ...state, quantity: quantity - 1 });
            }
        }
    }

    const addToCart = (id: number) => {
        dispatch(addToCartThunk({ id, quantity }));     // quantity değeri 1 den farklı olabilir (aynı üründen birden fazla eklenmek istenebilir).
    }

    return (
        <SafeAreaWrapper>
            <AppHeader back onPressBack={onPressBack} title={route.params.product.name} />
            <GenericView flex={1}>
                {/* Image View */}
                <GenericView flex={2}>
                    <GenericTouchableOpacity onPress={() => setState({ ...state, showZoom: true })}>
                        <GenericImage source={{ uri: route.params.product.image }} resizeMode={"cover"} width={dWidth * 1} height={dHeight * .3} />
                    </GenericTouchableOpacity>
                </GenericView>

                {/* other info */}
                <GenericView flex={3} paddingLeft={dWidth * .02} paddingRight={dWidth * .02}>
                    <ScrollView>
                        <GenericView marginTop={dWidth * .02}>
                            <GenericText bold fontSize={18} color={colors.black}>{route.params.product.name}</GenericText>
                        </GenericView>
                        <GenericView marginTop={dWidth * .02}>
                            <GenericText bold fontSize={18} color={colors.primary}>{route.params.product.price} ₺</GenericText>
                        </GenericView>
                        <GenericView flexDirection='row' spaceBetween marginTop={dWidth * .02}>
                            <GenericView>
                                <GenericText bold fontSize={16} color={colors.black}>{route.params.product.brand}</GenericText>
                            </GenericView>
                            <GenericView>
                                <GenericText bold fontSize={16} color={colors.black}>{route.params.product.model}</GenericText>
                            </GenericView>
                        </GenericView>
                        <GenericView marginTop={dWidth * .02}>
                            <GenericText color={colors.black}>{route.params.product.description}</GenericText>
                        </GenericView>
                    </ScrollView>
                </GenericView>

                {/* Add to cart */}
                <GenericView flex={.5} borderTopWidth={1} borderTopColor={colors.primary} flexDirection='row' padding={dWidth * .02}>

                    <GenericTouchableOpacity
                        onPress={addToCart.bind(this, route.params.product.id)}
                        flex={4} backgroundColor={colors.primary} margin={dWidth * .02} borderRadius={5} center
                    >
                        <GenericText bold color={colors.white}>Add to cart</GenericText>
                    </GenericTouchableOpacity>
                    <GenericView flex={1} backgroundColor={colors.primaryLight} margin={dWidth * .02} borderRadius={5} flexDirection='row'>
                        <GenericView flex={1} center>
                            <GenericText color={colors.primary} fontSize={18} bold>{quantity}</GenericText>
                        </GenericView>
                        <GenericView flex={1}>
                            <GenericTouchableOpacity
                                onPress={increaseAndDecreaseQuantity.bind(this, 'increase')}
                                flex={1} center
                            >
                                <Icon name='chevron-up' size={25} color={colors.primary} />
                            </GenericTouchableOpacity>
                            <GenericTouchableOpacity
                                disabled={quantity === 1}
                                onPress={increaseAndDecreaseQuantity.bind(this, 'decrease')}
                                flex={1} center
                            >
                                <Icon name='chevron-down' size={25} color={colors.primary} />
                            </GenericTouchableOpacity>
                        </GenericView>
                    </GenericView>
                </GenericView>

                {/* Zoom image */}
                <Modal visible={showZoom}
                    transparent={true}>
                    <ImageViewer imageUrls={zoomImages}
                        saveToLocalByLongPress={false}
                        backgroundColor={colors.lightWhite}
                        renderIndicator={
                            (currentIndex, allSize) => {
                                return (
                                    <GenericView position='absolute' marginTop={dWidth * .02} flexDirection='row' spaceBetween>
                                        <GenericTouchableOpacity padding={8} onPress={() => setState({ ...state, showZoom: false })}>
                                            <Icon name='close' size={30} color={colors.black} />
                                        </GenericTouchableOpacity>
                                        <GenericView marginLeft={dWidth * .35}>
                                            <GenericText textAlign='center' color={colors.black} >{currentIndex} / {allSize}</GenericText>
                                        </GenericView>
                                    </GenericView>
                                );
                            }
                        }
                    />
                </Modal>
            </GenericView>

        </SafeAreaWrapper>
    );
};

export default ProductDetailScreen;
