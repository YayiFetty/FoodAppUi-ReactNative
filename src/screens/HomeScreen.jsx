import { View, Text, ScrollView, TextInput, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
import * as Haptics from 'expo-haptics';

const HomeScreen = () => {
  const ptop = useSafeAreaInsets();
  const [activeCat, setActiveCat] = useState("beef");
  const [category, setCategory] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
      await getRecipes(); // corrected spelling
      setLoading(false); // Stop loading when data is fetched
    };
    fetchData();
  }, []);

  const handleChangeCat = async (category) => {
    setActiveCat(category);
    setMeals([]);
    setLoading(true); // Set loading to true while fetching new recipes

    await getRecipes(category);
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
      if (response && response.data) {
        setCategory(response.data.categories);
      }
    } catch (err) {
      setError("Failed to load categories.");
      console.log(err);
    }
  };

  const getRecipes = async (category = "beef") => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      setError("Failed to load recipes.");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-yellow-50" style={{ paddingTop: ptop.top + 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6"
      >
        <View className="mx-4 flex-row justify-between items-center ">
          <Image source={require("../assets/avatar.png")} style={{ width: hp(5), height: hp(5) }} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Yayi</Text>
          <View>
            <Text style={{ fontSize: hp(3.2) }} className="font-semibold text-neutral-600">Make your own food, </Text>
          </View>
          <View>
            <Text style={{ fontSize: hp(3.2) }} className="font-semibold text-neutral-600">
              Stay at <Text className="text-amber-400">Home</Text>
            </Text>
          </View>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-2">
          <TextInput
            placeholder="Search any recipe"
            style={{ fontSize: hp(1.7) }}
            placeholderTextColor={"gray"}
            className="flex-1 text-base pl-3 tracking-wider mb-2"
          />
          <View className="bg-white rounded-full p-2">
            <MagnifyingGlassIcon style={hp(2)} strokeWidth={5} color="gray" />
          </View>
        </View>

        <View>
          <Categories category={category} activeCat={activeCat} handleChangeCat={handleChangeCat} />
        </View>

        <View>
          {error ? (
            <Text className="text-red-600 text-center">{error}</Text> // Display error message
          ) : (
            <Recipes meals={meals} category={category} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
