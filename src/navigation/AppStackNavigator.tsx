import React, { useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { HomeScreen } from '@/screens';
import BottomTabNavigator from './BottomTabNavigator';


export type RootStackParamList = {
    LoginScreen: undefined;
    BottomTabNavigator: undefined;
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
            {/* <Stack.Screen name={"LoginScreen"} component={LoginScreen} /> */}
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
};

export default AppStackNavigator;