import { Dots } from "@/components/dots";
import { Image } from "expo-image";
import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from "react-native-reanimated";

type IAnimatedCarouselProps = {
  images: any[];
};

export const AnimatedCarousel: FC<IAnimatedCarouselProps> = (props) => {
  const { images } = props;

  const IMAGE_HEIGHT = 300;

  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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
    <React.Fragment>
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
              }}
            >
              <Image
                key={index}
                source={item.image}
                contentPosition="center"
                contentFit="contain"
                transition={500}
                style={{
                  width: windowWidth - 30,
                  height: windowWidth / 2,
                  resizeMode: "contain",
                  alignSelf: "center",
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
    </React.Fragment>
  );
};
