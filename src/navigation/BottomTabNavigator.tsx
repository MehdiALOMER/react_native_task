import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '@/screens';
import { colors, dHeight, dWidth } from '@/constants';
import CartScreen from '@/screens/CartScreen';
import Icon from '@/components/shared/Icons';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Badge } from 'native-base';
import { GenericView } from '@/assets/css';


const BottomTab = createMaterialBottomTabNavigator();



export default function BottomTabNavigator() {

    const cartCount = useSelector((state: RootState) => state.cartReducer.cartCount || 0);

    return (
        <BottomTab.Navigator
            initialRouteName="HomeScreen"
            labeled={false}
            barStyle={{
                backgroundColor: colors.primary,
               /*  borderTopWidth: 2,
                borderTopColor: colors.primary */
            }}
            screenOptions={{

            }}
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <GenericView>
                            <Icon name="home" size={35} color={focused == true ? colors.white : colors.gray} />
                        </GenericView>
                    )
                }}
            />
            <BottomTab.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    tabBarBadge: cartCount > 0 ? cartCount : false,
                    tabBarIcon: ({ focused }) => (
                        <GenericView>
                            <Icon name="cart" size={35} color={focused == true ? colors.white : colors.gray}  />
                            {/* {
                                cartCount > 0 &&
                                <Badge
                                    style={[styles.badge,
                                    {
                                        height: cartCount > 9 ? dHeight * 0.039 : dHeight * 0.032,
                                        width: cartCount > 9 ? dHeight * 0.039 : dHeight * 0.032,
                                        borderRadius: Math.round((dHeight + dWidth) / 2),
                                        right: cartCount > 9 ? dWidth * .03 : dWidth * .001,
                                        top: cartCount > 9 ? dHeight * .0001 : dHeight * .00001
                                    }
                                    ]}
                                >
                                    <Text style={[styles.badgeText, { fontSize: cartCount > 9 ? dWidth * 0.025 : dWidth * 0.03 }]}>{cartCount}</Text>
                                </Badge>
                            } */}

                        </GenericView>
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -14,
        right: 3,
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
    },
    badgeText: {
        color: colors.white,
        textAlign: 'center'
    },
})