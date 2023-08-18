import { View, Text } from 'react-native'
import React from 'react'
import { GenericImage, GenericText, GenericView } from '@/assets/css'
import { StackView } from '@react-navigation/stack'
import { colors, dHeight, dWidth } from '@/constants'
import Icon from './shared/Icons'
import SafeAreaWrapper from './shared/SafeAreaWrapper'
import AppHeader from './shared/AppHeader'
import { Image } from 'react-native-svg'
import login from '@/assets/img/mouse.png';
import { IEmployeeDevice } from '@/types/dataTypes'
import { DevicesCategoryList } from '@/data/DevicesCategoryList'








const Wallet = ({ ıcon }: any) => {
    return (
        <GenericView
            top={dHeight * -0.03} // Biraz yukarı taşıdık
            left={dWidth * -0.06} // Biraz sola taşıdık
            zIndex={1}
            flex={1}
            borderRadius={30}
            width={dWidth * 0.35}
            height={dHeight * 0.24}
            backgroundColor={colors.white}
            margin={dHeight * 0.02}
            elevation={15}
            shadowColor={colors.black}
            shadowOffset={{ width: 0, height: 2 }}
            shadowRadius={2}
            shadowOpacity={0.50}
            position='absolute' // position: 'absolute' ekledik
        >
            <GenericImage resizeMode={'center'} width={dWidth * 0.35} height={dHeight * 0.23} source={DevicesCategoryList.find((item) => item.id === ıcon)?.image} />
            {/* <Icon name={ıcon}/> */}

        </GenericView>
    );
};

interface Props {
    devices: IEmployeeDevice,
}


const MyDetailCard = ({ devices }: Props) => {

    return (
        <SafeAreaWrapper>
            <GenericView flex={3} margin={15} marginTop={25} >
                <Wallet ıcon={devices.category.id} />
                <GenericView
                    flexDirection='row'
                    style={{
                        borderRadius: 30,
                        width: dWidth * 0.89,//kartın boyutu
                        height: dHeight * 0.25,
                        backgroundColor: colors.primaryLight,
                        margin: dHeight * 0.02,
                        elevation: 5,
                        shadowColor: colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 2,
                        shadowOpacity: 0.25
                    }}
                >
                    <GenericView flex={1.5} />
                    <GenericView flex={3} flexDirection='column'>
                        <GenericView flex={1.5} justifyContent='center' paddingLeft={15} >
                            <GenericText bold fontSize={17}> {devices.name} </GenericText>
                            <GenericView height={10}></GenericView>
                            <GenericText fontSize={14} > {devices.serial_number} </GenericText>
                        </GenericView>


                        <GenericView borderWidth={0.7} borderRadius={5} borderColor={colors.primary} marginLeft={15} marginRight={15} />

                        <GenericView flex={1} flexDirection='row' alignItems='center' justifyContent='space-between' paddingLeft={15} paddingRight={15}>
                            <GenericText fontSize={15}> {DevicesCategoryList.find((item) => item.id == devices.category_id)?.name} </GenericText>
                            <GenericView borderRadius={30} padding={3} backgroundColor={devices.status_id != null ? (devices.status_id == 1 ? colors.success : devices.status_id == 2 ? colors.error : devices.status_id == 3 ? colors.warning : devices.status_id == 4 ? colors.info : devices.status_id == 5 ? colors.secondary : colors.white) : (colors.gray)} center>
                                <GenericText fontSize={15} color={colors.black} > {devices.status.name} </GenericText>
                            </GenericView>
                        </GenericView>


                        <GenericView borderWidth={0.7} borderRadius={5} borderColor={colors.primary} marginLeft={15} marginRight={15} />


                        <GenericView flex={1} flexDirection='row' alignItems='center' justifyContent='space-between' paddingLeft={9} paddingRight={15} >
                            <GenericText fontSize={15}> {devices.brand} </GenericText>
                            <GenericView borderTopWidth={30} borderWidth={0.7} borderRadius={5} borderColor={colors.primary} marginLeft={15} marginRight={15} flexDirection='row' />
                            <GenericView width={140} >
                                <GenericText fontSize={15} >{devices.model}</GenericText>
                            </GenericView>
                        </GenericView>


                    </GenericView>
                </GenericView>
            </GenericView>
        </SafeAreaWrapper>
    )
}

export default MyDetailCard