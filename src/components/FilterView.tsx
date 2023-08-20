import React, { useCallback } from 'react'
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css'
import { colors, dHeight, dWidth } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { IProductBrand, IProductModel } from '@/types/dataTypes';
import { changeCheckedBrand, changeCheckedModel, changeCheckedSort, filterProducts, searchBrand, searchModel } from '@/store/reducers';
import { ScrollView } from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import SearchBar from './SearchBar';
import Icon from './shared/Icons';

interface FilterViewProps {
    changeShowModal: () => void;
}
const FilterView: React.FC<FilterViewProps> = ({ changeShowModal }) => {
    const dispatch = useDispatch<AppDispatch>();

    const sortChecked: string = useSelector((state: RootState) => state.productReducer.sortChecked || '');
    const filteredProductBrandList: IProductBrand[] = useSelector((state: RootState) => state.productReducer.filteredProductBrandList || []);
    const filteredProductModelList: IProductModel[] = useSelector((state: RootState) => state.productReducer.filteredProductModelList || []);

    const radioButtonList = [
        { label: 'Old to New', value: 'oldToNew' },
        { label: 'New to Old', value: 'newToOld' },
        { label: 'Price Low to High', value: 'priceLowToHigh' },
        { label: 'Price High to Low', value: 'priceHighToLow' },
    ];


    // marka arama
    const searchBrandList = useCallback((query: string) => {
        dispatch(searchBrand(query));
    }, []);
    // model arama
    const searchModelList = useCallback((query: string) => {
        dispatch(searchModel(query));
    }, []);


    return (
        <GenericView flex={1} backgroundColor={colors.white} >
            <GenericView flex={.5} flexDirection='row' spaceBetween padding={dWidth * .02} borderBottomWidth={1} borderBottomColor={colors.primary}>
                <GenericView center>
                    <GenericTouchableOpacity onPress={() => { changeShowModal() }}>
                        <Icon name='close' size={30} color={colors.black} />
                    </GenericTouchableOpacity>
                </GenericView>
                <GenericView center>
                    <GenericText fontSize={16} color={colors.black} bold>Filter</GenericText>
                </GenericView>
                <GenericView></GenericView>
            </GenericView>
            <GenericView flex={2.5} margin={dWidth * .02} borderBottomWidth={1} borderBottomColor={colors.gray}>
                <GenericView>
                    <GenericText color={colors.black} bold>Sort By</GenericText>
                </GenericView>
                <GenericView>
                    {
                        radioButtonList.map((item, index) => {
                            return (
                                <GenericView key={index} flexDirection='row'>
                                    <GenericView center>
                                        <RadioButton
                                            value={item.value}
                                            status={sortChecked === item.value ? 'checked' : 'unchecked'}
                                            onPress={() => { dispatch(changeCheckedSort(item.value)) }}
                                            color={colors.primary}
                                        />
                                    </GenericView>
                                    <GenericView center>
                                        <GenericText color={colors.black}>{item.label}</GenericText>
                                    </GenericView>
                                </GenericView>
                            )
                        })
                    }
                </GenericView>
            </GenericView>
            <GenericView flex={3} margin={dWidth * .02} borderBottomWidth={1} borderBottomColor={colors.gray}>
                <GenericView flex={.5}>
                    <GenericText color={colors.black} bold>Brand</GenericText>
                </GenericView>
                <GenericView flex={1}>
                    <SearchBar search={searchBrandList} />
                </GenericView>
                <GenericView flex={2}>
                    <ScrollView>
                        {
                            filteredProductBrandList.map((item: IProductBrand, index: number) => {
                                return (
                                    <GenericView key={index} flexDirection='row'>
                                        <GenericView center>
                                            <Checkbox
                                                status={item.checked ? 'checked' : 'unchecked'}
                                                onPress={() => { dispatch(changeCheckedBrand(item.brand)) }}
                                                color={colors.primary}
                                            />
                                        </GenericView>
                                        <GenericView center>
                                            <GenericText color={colors.black}>{item.brand}</GenericText>
                                        </GenericView>
                                    </GenericView>
                                )
                            })
                        }
                    </ScrollView>
                </GenericView>
            </GenericView>
            <GenericView flex={3} margin={dWidth * .02}>
                <GenericView flex={.5}>
                    <GenericText color={colors.black} bold>Model</GenericText>
                </GenericView>
                <GenericView flex={1}>
                    <SearchBar search={searchModelList} />
                </GenericView>
                <GenericView flex={2}>
                    <ScrollView>
                        {
                            filteredProductModelList.map((item: IProductModel, index: number) => {
                                return (
                                    <GenericView key={index} flexDirection='row'>
                                        <GenericView center>
                                            <Checkbox
                                                status={item.checked ? 'checked' : 'unchecked'}
                                                onPress={() => { dispatch(changeCheckedModel(item.model)) }}
                                                color={colors.primary}
                                            />
                                        </GenericView>
                                        <GenericView center>
                                            <GenericText color={colors.black}>{item.model}</GenericText>
                                        </GenericView>
                                    </GenericView>
                                )
                            })
                        }
                    </ScrollView>
                </GenericView>
            </GenericView>
            <GenericView flex={.5} padding={dWidth * .02}>
                <GenericTouchableOpacity
                    onPress={() => {
                        dispatch(filterProducts())
                        changeShowModal()
                    }}
                    flex={1} backgroundColor={colors.primary} borderRadius={5} center padding={dWidth * .02}
                >
                    <GenericText color={colors.white} bold>Primary</GenericText>
                </GenericTouchableOpacity>
            </GenericView>
        </GenericView>
    )
}

export default FilterView;