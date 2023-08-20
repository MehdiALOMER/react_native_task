import React from "react"
import { NativeBaseProvider } from "native-base"                // Badge Kullanıldığı için eklenmiştir.
import AppStackNavigator from "./AppStackNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { DefaultTheme, PaperProvider } from "react-native-paper"

const theme = {  // aktif sekmeyi saran container'ın rengini değiştirmek için kullanılmıştır.
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
    },
};

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <PaperProvider theme={theme}>
                    <AppStackNavigator />
                </PaperProvider>
            </NativeBaseProvider>
        </NavigationContainer>
    )
}

export default MainNavigator;