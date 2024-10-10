import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HapticFeedback, {
  HapticFeedbackTypes,
} from "react-native-haptic-feedback";

import Animated, { Easing, LightSpeedInLeft } from 'react-native-reanimated';
import Loader from './Loader';
import { CachedImage } from '../helpers/image';

const Categories = ({ activeCat, category,handleChangeCat }) => {

  if (!category || category.length === 0) {
    return <Loader/>; 
  }

  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(500).delay(2000).easing(Easing.ease)}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-6"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {category.map((item, idx) => {
          const isActive = item.strCategory === activeCat;
          let activeButton = isActive ? 'bg-amber-400 ' : 'bg-black/10';

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handleChangeCat(item.strCategory)}
              className="flex  items-center space-y-2"
            >

              <View className={`rounded-full p-2 mt-3 ${activeButton}`}>
              
               {/** <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={{ width: hp(5.5), height: hp(5.5) }}
                  className="rounded-full "
                /> */}

                <CachedImage  uri = {item.strCategoryThumb }
                style={{ width: hp(5.5), height: hp(5.5) }}
                className="rounded-full "/>

              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.5) }}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
