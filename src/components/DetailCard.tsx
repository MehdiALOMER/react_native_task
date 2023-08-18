import { GenericText, GenericView } from '@/assets/css';
import { colors, dHeight, dWidth } from '@/constants';
import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { G, Rect, Text, Image, TSpan, Path } from 'react-native-svg';

const MySVGComponent = ({ tableFillColor, chairFillColor, tableNumber, onPress }: any) => {
    /* const [tableFillColor, setTableFillColor] = useState('#c8c5d9');
    const [chairFillColor, setChairFillColor] = useState('#58508d'); */


    /*  const handleClick = () => {
         setTableFillColor(tableFillColor === '#c8c5d9' ? '#58508d' : '#c8c5d9');
         setChairFillColor(chairFillColor === '#58508d' ? '#c8c5d9' : '#58508d');
     }; */


    const svgWidth = 1536.54; // SVG bileşeninin genişliği
    const svgHeight = 1602.285; // SVG bileşeninin yüksekliği

    return (
        <GenericView>
            <GenericView backgroundColor='red' center>
                <Svg width={'92%'} height={'40%'} style={[{ backgroundColor: '#000', alignItems: 'center' }]}>
                    <Rect fill={colors.primaryLight} x="58" y="16" width="300" height="167" rx="26" ry="26" />
                    <Text fill={colors.primary} fontSize={"12.158px"} transform="translate(134.057 49.352) scale(1.316)">Logitech Mouse</Text>
                    <Text fill={colors.primary} fontSize={"10.639px"} transform="translate(135.373 76.671) scale(1.316)">869000021040268</Text>
                    <Text fill={colors.primary} fontSize={"10.639px"} transform="translate(220.651 166.897) scale(1.316)">TRX-420B/HM87</Text>
                    <Rect fill='#ca0202' x="212" y="148" width="1" height="27" rx="0.5" ry="0.5" />
                    <Text fill={colors.primary} fontSize={"10.639px"} transform="translate(134.057 166.897) scale(1.316)">TURBOX</Text>
                    <Text fill={colors.primary} fontSize={"10.639px"} transform="translate(134.057 126) scale(1.316)">MOUSE</Text>
                    <Rect fill='#ca0202' x="250" y="110" width="50" height="20" rx="10" ry="10" />
                    <Text fill='#fff' fontSize={"12px"} x="258.25" y="124" ><TSpan x="260">arızalı</TSpan></Text>
                    <Path fill='#fff' fillRule='evenodd' d="M26.422,1.638H90.375a24,24,0,0,1,24,24V142a24,24,0,0,1-24,24H26.422a24,24,0,0,1-24-24V25.638A24,24,0,0,1,26.422,1.638Z" />
                    <Image x="15" y="10" width="85" height="147" href='@/assets/img/login.png' />
                    <Path fillRule='evenodd' fill={colors.primary} d="M135.219,138.1H330V138.9H135.219V138.1Z" />
                    <Path fillRule='evenodd' fill={colors.primary} d="M135.219,101.1H330V101.9H135.219V101.1Z" />
                </Svg>

            </GenericView>
            {/* <GenericView flex={2.5} alignItems='center'>
                <GenericText color='red'>ddsfgsdfgdgfds</GenericText>
            </GenericView> */}
        </GenericView>
    );
};

export default MySVGComponent;