import { DOTS_ACTIVE_COLOR } from "@/utils/constants";
import { View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type DotsProps = {
  count: number;
  activeIndex: SharedValue<number>;
  onPressPagination: (index: number) => void;
};

const DOTS_SIZE = 10;
const DOTS_GAP = 20;

export const Dots = ({ count, activeIndex, onPressPagination }: DotsProps) => {
  const rContainerStyles = useAnimatedStyle(() => {
    const width =
      DOTS_SIZE * (activeIndex.value + 1) + DOTS_GAP * (activeIndex.value + 1);
    return {
      width: withSpring(width, {
        mass: 0.6,
      }),
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: DOTS_GAP,
        zIndex: 1,
      }}
    >
      {new Array(count).fill(0).map((_, index) => (
        <View
          key={index}
          style={{
            width: DOTS_SIZE,
            height: DOTS_SIZE,
            borderRadius: 5,
            backgroundColor: "white",
          }}
          onTouchEnd={() => {
            activeIndex.value = index;
            onPressPagination(index);
          }}
          onTouchStart={() => {
            activeIndex.value = index;
            activeIndex.value = withSpring(index, {
              mass: 0.6,
              stiffness: 100,
              damping: 10,
            });
          }}
        />
      ))}
      <Animated.View
        style={[
          {
            left: -DOTS_GAP / 2,
            height: DOTS_SIZE * 3,
            top: -DOTS_SIZE,
            borderRadius: DOTS_SIZE * 2,
            borderCurve: "continuous",
            backgroundColor: DOTS_ACTIVE_COLOR,
            position: "absolute",
            zIndex: -1,
          },
          rContainerStyles,
        ]}
      />
    </View>
  );
};
