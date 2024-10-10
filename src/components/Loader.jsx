
import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  Easing,
  interpolateColor
} from 'react-native-reanimated';

const colors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#F7B801', // Yellow
  '#98CA32', // Green
  '#E84A5F', // Pink
  '#07689F', // Navy
];

const Loader = () => {
  const rotation = useSharedValue(0);
  const colorIndex = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );

    colorIndex.value = withRepeat(
      withTiming(colors.length, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      colorIndex.value,
      [...Array(colors.length).keys()],
      colors
    );

    return {
      transform: [{ rotate: `${rotation.value}deg` }],
      borderColor,
    };
  });

  return (
    <View className="flex-1 justify-center items-center">
      <Animated.View
        style={[
          {
            width: hp(5),
            height: hp(5),
            borderRadius: hp(5),
            borderWidth: hp(0.6),
            borderColor: 'transparent',
            borderTopColor: '#FFF',
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

export default Loader;