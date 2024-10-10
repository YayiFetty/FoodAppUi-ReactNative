import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { mealData } from '../constants/category';
import Animated, { Easing, PinwheelIn } from 'react-native-reanimated';
import Loader from './Loader';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
const Recipes = ({category,meals}) => {

  const navigation = useNavigation();

    if (!meals || meals.length === 0) {
        return <Loader/>; 
      }
   
  return (
    <View className ="mx-4 space-y-3">
      <Text style={{fontSize:hp(3)}} className="text-neutral-600 font-semibold">Recipes</Text>
      <View>
     {
        category.length == 0 || meals == 0 ? <Loader/> : ( <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false} 
            renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation}/>}
            onEndReachedThreshold={0.1}
            
          />)
     }
      </View>
    </View>
  )
}

export default Recipes

const RecipeCard = ({item,index, navigation}) =>{
    let isEven = index%2 ===  0;
    return(
        <Animated.View entering={
              PinwheelIn
              .delay(index*100)
              .duration(600)
              .springify()
              .damping(12)
               .easing(Easing.bounce)
               }>
            <Pressable
            style={{width:"100%", paddingLeft:isEven ? 0:8, paddingRight:isEven ? 8:0}}
            className="flex justify-center mb-4 space-y-1"
            onPress={() => navigation.navigate("recipeDetails", {...item})}>

            {/**<Image source={{uri:item.strMealThumb}} 
            style={{width:"100%", height:index % 3 === 0 ? hp(25): hp(35), borderRadius:35 }}
            className="bg-black/20"/> */}

            <CachedImage uri={item.strMealThumb}
            style={{width:"100%", height:index % 3 === 0 ? hp(25): hp(35), borderRadius:35 }}
            className="bg-black/20"/>


            <Text className="font-semibold ml-2 text-neutral-600">
                {item.strMeal.length > 20 ? item.strMeal.slice(0,20) + "..." : item.strMeal}
            </Text>
            </Pressable>
        </Animated.View>
    )
}


