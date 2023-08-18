import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppStackNavigator";
import Icon from '@/components/shared/Icons';
import { colors, dWidth } from '@/constants';
import { Button } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';


type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetailScreen'>;
interface Props {
    navigation: any;
    route: ProductDetailScreenRouteProp;
}


const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {

    const [state, setState] = React.useState({ showZoom: false, zoomImages: [], });
    const { zoomImages, showZoom } = state;

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


    return (
        <SafeAreaWrapper>
            <AppHeader back onPressBack={onPressBack} title={route.params.product.name} />
            <GenericView>
                {/* Image View */}
                <GenericView>
                    <GenericTouchableOpacity onPress={() => setState({ ...state, showZoom: true })}>
                        <GenericImage source={{ uri: route.params.product.image }} resizeMode={"cover"} width={dWidth * 1} height={200} />
                    </GenericTouchableOpacity>
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


            {/* Bottom View */}
            {/* <View style={styles.footerView}>
                <Button
                    size="md"
                    variant="solid"
                    bg={colors.info}
                isLoading={fetchCart}
                style={[GlobalStyles.button, { flex: 0.70, marginHorizontal: wp('2%') }]}
                onPress={() => !productDetail.out_of_stock ? _addToCart() : showOutofStock()}
                >
                    <Text style={GlobalStyles.buttonText}>Add to Cart</Text>
                </Button>
                <View style={styles.countBox}>
                    <Text style={styles.countTxt}>5</Text>
                    <View style={styles.arrowContainer}>
                        <TouchableOpacity style={{ flex: 0.50 }} onPress={() => setState({ ...state, productCount: productCount + 1 })}>
                            <Icon name="keyboard-arrow-up" size={20} color={colors.black} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.50 }} onPress={() => setState({ ...state, productCount: productCount > 1 ? productCount - 1 : 1 })}>
                            <Icon name="keyboard-arrow-down" size={20} color={colors.black} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </SafeAreaWrapper>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    footerView: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        borderTopColor: colors.black,
        borderTopWidth: 1
    },
    countBox: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        flex: 0.20,
        height: '4.8%',
        marginHorizontal: '1%',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        borderRadius: 5,
        justifyContent: 'center'
    },
    countTxt: {
        fontSize: '4.5%',
        flex: 0.60,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.black,

    },
    arrowContainer: {
        flex: 0.40,
        flexDirection: 'column',
    }
});