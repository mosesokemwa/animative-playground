import Colors from "@/constants/Colors";
import { FC } from "react";
import { View as DefaultView, LayoutChangeEvent } from "react-native";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AccordionCategory } from "../data/AccordionData";
import { Text, ThemedButton, View } from "../Themed";
import { IconSymbol } from "./IconSymbol";

interface AccordionProps {
  category: AccordionCategory;
  onAccordionOpen?: (
    LayoutY: number,
    contentHeight: number
  ) => void | undefined;
}

const Accordion: FC<AccordionProps> = ({ category, onAccordionOpen }) => {
  const contentRef = useAnimatedRef<DefaultView>();
  const contentHeight = useSharedValue(0);
  const isOpen = useSharedValue(false);

  const contentAnimatedStyles = useAnimatedStyle(() => ({
    height: contentHeight.value,
    opacity: withTiming(isOpen.value ? 1 : 0, { duration: 300 }),
  }));

  const headerScaleAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(isOpen.value ? 1.05 : 1, { duration: 300 }),
      },
      {
        translateY: withDelay(
          150,
          withSpring(isOpen.value ? -5 : 0, {
            duration: 300,
          })
        ),
      },
    ],
  }));

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen.value ? 1 : 0, { duration: 300 }),
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    if (!isOpen.value && onAccordionOpen) {
      const { y, height } = event.nativeEvent.layout;
      onAccordionOpen(y, height);
    }
  };

  const rotation = useDerivedValue(() => {
    return isOpen.value
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 300 });
  }, [isOpen.value]);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value * 180}deg`,
        },
        {
          scale: withTiming(isOpen.value ? 1 : 0.8, { duration: 200 }),
        },
      ],
      opacity: withTiming(isOpen.value ? 1 : 0.5, { duration: 200 }),
    };
  });

  function toggleAccordion() {
    if (!isOpen.value) {
      runOnUI(() => {
        "worklet";
        const measuredHeight = measure(contentRef)?.height || 0;
        contentHeight.value = withTiming(measuredHeight, { duration: 300 });
      })();
      isOpen.value = true;
    } else {
      contentHeight.value = withTiming(0, { duration: 300 });
      isOpen.value = false;
    }
  }

  return (
    <View
      onLayout={handleLayout}
      key="container"
      style={{
        // backgroundColor: "#ecf0f1",
        margin: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        overflow: "hidden",
      }}
    >
      <ThemedButton
        key="headerContainer"
        title={category.title}
        onPress={() => toggleAccordion()}
        style={{
          padding: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 14,
        }}
        icon={
          <Animated.View style={[rotateStyle]}>
            <IconSymbol
              name={"chevron.down"}
              size={20}
              color={Colors.light.text}
            />
          </Animated.View>
        }
      />

      <Animated.View style={[contentAnimatedStyles, fadeInStyle]}>
        <Animated.View
          ref={contentRef}
          key="contentContainer"
          style={{
            position: "absolute",
            top: 0,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <View
            key="contentWrapper"
            style={{
              padding: 20,
            }}
          >
            {category.content.map((item, index) => (
              <Animated.View
                key={index}
                style={[{ marginTop: 10 }, headerScaleAnimation]}
              >
                <Text
                  style={{
                    fontSize: 14,
                    // color: "#7f8c8d",
                  }}
                >
                  {item}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
