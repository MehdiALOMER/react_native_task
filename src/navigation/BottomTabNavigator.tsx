import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '@/screens';
import { colors } from '@/constants';
import CartScreen from '@/screens/CartScreen';
import Icon from '@/components/shared/Icons';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Badge } from 'native-base';


const BottomTab = createMaterialBottomTabNavigator();



export default function BottomTabNavigator() {

    const cartCount = useSelector((state: RootState) => state.cartReducer.cartCount || 0);

    return (
        <BottomTab.Navigator
            initialRouteName="HomeScreen"
            labeled={false}
            style={{ backgroundColor: colors.primary }}
            screenOptions={{
                /* tabBarStyle= {
                    height: 90,
                    paddingHorizontal: 5,
                    paddingTop: 0,
                    backgroundColor: 'rgba(34,36,40,1)',
                    position: 'absolute',
                    borderTopWidth: 0,
                } */
            }}
        /* screenOptions={{
            unmountOnBlur: true,
            tabBarShowLabel: false,
            lazy: false,
        }} */
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    /* tabBarLabel: 'Home',
                    headerMode: 'none',
                    headerTitle: null,
                    headerTransparent: true, */
                    /* headerShown: false,
                    tabBarActiveTintColor: Colors.EKOORANGE, */
                    tabBarColor: colors.primary,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            {/* <MaterialCommunityIcons name={"home"} size={35} color={focused == true ? Colors.EKOORANGE : Colors.WHITE} /> */}
                            {/* <Text style={[{ color: focused == true ? colors.black : colors.white, fontWeight: "bold" }]}>HomeScreen</Text> */}
                            <Icon name="home" size={35} color={focused == true ? colors.black : colors.white} />
                        </View>
                    )
                }}
            />
            <BottomTab.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    /* tabBarLabel: 'Home',
                    headerMode: 'none',
                    headerTitle: null,
                    headerTransparent: true, */
                    /* headerShown: false,
                    tabBarActiveTintColor: Colors.EKOORANGE, */
                    tabBarIcon: ({ focused }) => (
                        <View>
                            {/* <MaterialCommunityIcons name={"home"} size={35} color={focused == true ? Colors.EKOORANGE : Colors.WHITE} /> */}
                            {/* <Text style={[{ color: focused == true ? colors.black : colors.white, fontWeight: "bold" }]}>CartScreen</Text> */}
                            <Icon name="cart" size={35} color={focused == true ? colors.black : colors.white} />
                           {/*  {
                                cartCount > 0 &&
                                <Badge>
                                    <Text style={{ color: colors.white }}>{cartCount}</Text>
                                </Badge>
                            } */}

                        </View>
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}