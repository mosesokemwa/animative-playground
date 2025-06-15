import { Dots } from "@/components/dots";
import { View } from "@/components/Themed";
// import { Image } from "expo-image";
import { Image } from "expo-image"; // Use expo-image for better performance
import React, { FC } from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from "react-native-reanimated";

type IAnimatedCarouselProps = {
  images: any[];
};

const images = [
  require("@/assets/images/slider/slider.jpeg"),
  require("@/assets/images/slider/slider.jpeg"),
  require("@/assets/images/slider/slider.jpeg"),
];

const AnimatedCarousel: FC<IAnimatedCarouselProps> = () => {
  // const { images } = props;

  const IMAGE_HEIGHT = 300;

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const scrollAnimatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollAnimatedRef);

  const activeIndex = useDerivedValue(() => {
    return Math.round(scrollOffset.value / windowWidth);
  });

  const onPressPagination = (index: number) => {
    scrollAnimatedRef.current?.scrollTo({
      x: index * windowWidth,
      animated: true,
    });
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth,
        height: IMAGE_HEIGHT,
      }}
    >
      <Animated.ScrollView
        horizontal
        decelerationRate={"fast"}
        snapToInterval={windowWidth}
        ref={scrollAnimatedRef}
      >
        {images.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: windowWidth,
                height: IMAGE_HEIGHT,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <Image
                key={index}
                source={item}
                contentPosition="center"
                contentFit="cover"
                style={{
                  width: windowWidth,
                  height: IMAGE_HEIGHT - 10,
                  resizeMode: "cover",
                }}
              />
            </View>
          );
        })}
      </Animated.ScrollView>
      <View
        style={{
          position: "absolute",
          top: IMAGE_HEIGHT - 20,
        }}
      >
        <Dots
          count={images.length}
          activeIndex={activeIndex}
          onPressPagination={onPressPagination}
        />
      </View>
    </View>
  );
};

export default AnimatedCarousel;
