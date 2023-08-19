import React, { useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { HomeScreen, ProductDetailScreen } from '@/screens';
import BottomTabNavigator from './BottomTabNavigator';
import { IProduct } from '@/types/dataTypes';
import StarterScreen from '@/screens/StarterScreen';


export type RootStackParamList = {
    StarterScreen: undefined;
    LoginScreen: undefined;
    BottomTabNavigator: undefined;
    ProductDetailScreen: { product: IProduct }
};

const Stack = createStackNavigator<RootStackParamList>();



const AppStackNavigator = () => {

    useEffect(() => {

    }, []);

    return (
        <Stack.Navigator
            /* initialRouteName="AppStackNavigator" */
            screenOptions={{
                headerShown: false
            }}
        >
            {/* <Stack.Screen name={"StarterScreen"} component={StarterScreen} /> */}
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name={"ProductDetailScreen"} component={ProductDetailScreen} />
        </Stack.Navigator>
    );
};

export default AppStackNavigator;