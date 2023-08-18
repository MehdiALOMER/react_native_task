import React from 'react'
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css'
import { colors, dHeight, dWidth } from '@/constants';
import Icon from './shared/Icons';
import { IEmployee } from '@/types/dataTypes';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteEmployeeInventory } from '@/store/reducers/employeeInventoryReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

interface Props {
    id: number,
    name: string,
}

const ItemList = ({ id, name }: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const deleteInvertory = (id: number) => {
        dispatch(deleteEmployeeInventory(id));
    }

    return (
        <GenericView 
        margin={dWidth * 0.013}
        borderRadius={10}
        borderWidth={1}
        borderColor="#fff"
        padding={dHeight * 0.01}
        backgroundColor={colors.primaryLight}
        flexDirection={"row"}
        center>           
            <GenericView flex={3} flexDirection={'row'} justifyContent='space-between'>
                <GenericText bold fontSize={dHeight * 0.02} color={colors.black}>{id}</GenericText>
                <GenericText bold fontSize={dHeight * 0.02} color={colors.black}>{name}</GenericText>
                <GenericTouchableOpacity onPress={() => { deleteInvertory(id) }} >
                    <Icon
                        name='delete'
                        color={colors.primary}
                        size={25}
                    />
                </GenericTouchableOpacity>
            </GenericView>
        </GenericView>
    )
}

export default ItemList;