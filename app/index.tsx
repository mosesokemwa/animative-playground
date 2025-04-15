import { Dots } from "@/components/dots";
import { StatusBar } from "expo-status-bar";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from "react-native-reanimated";

const DOTS_SCREEN_NUMBER = 3;

export default function OnboardingScreen() {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  const scrollAnimatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollAnimatedRef);

  const activeIndex = useDerivedValue(() => {
    return Math.round(scrollOffset.value / windowWidth);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "brown",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="light" />
      <Animated.ScrollView
        horizontal
        decelerationRate={"fast"}
        snapToInterval={windowWidth}
        ref={scrollAnimatedRef}
      >
        {new Array(DOTS_SCREEN_NUMBER).fill(0).map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              width: windowWidth,
              height: windowHeight,
              opacity: index * 0.2,
            }}
          />
        ))}
      </Animated.ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 50,
        }}
      >
        <Dots count={DOTS_SCREEN_NUMBER} activeIndex={activeIndex} />
      </View>
    </View>
  );
}
