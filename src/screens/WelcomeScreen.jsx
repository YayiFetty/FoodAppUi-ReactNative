import { View, Text, Image } from "react-native";
import React,{useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const WelcomeScreen = () => {
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    ring1.value = 0;
    ring2.value = 0;
    
    setTimeout(() => {
      ring1.value = withSpring(ring1.value + hp(4));
    }, 300);

    setTimeout(() => {
      ring2.value = withSpring(ring2.value + hp(3.5));
    }, 100);

    setTimeout(() => {
      navigation.replace("home");
    }, 3000);
  }, []);
  return (
    <View className="bg-amber-500 flex-1 justify-center items-center space-y-10">
      <StatusBar style="light" />

      {/** logo */}
      <Animated.View
        className=" bg-white/20 rounded-full "
        style={{ padding: ring1 }}
      >
        <Animated.View
          className="bg-white/20 rounded-full "
          style={{ padding: ring2 }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ width: hp(15), height: hp(15) }}
            resizeMode="cover"
            className=" rounded-full "
          />
        </Animated.View>
      </Animated.View>

      {/** for some text */}
      <View className=" flex items-center space-y-2 mt-7 ">
        <Text
          className="text-white font-bold  tracking-widest "
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="text-white  tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Food is a way of life!
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
