import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen'

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer >
        <Stack.Navigator initialRouteName="welcome"
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="welcome" component={WelcomeScreen}/>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name="recipeDetails" component={RecipeDetailsScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation

