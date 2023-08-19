import React from "react"
import { NativeBaseProvider } from "native-base"                // Badge Kullanıldığı için eklenmiştir.
import AppStackNavigator from "./AppStackNavigator"
import { NavigationContainer } from "@react-navigation/native"

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <AppStackNavigator />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}

export default MainNavigator;