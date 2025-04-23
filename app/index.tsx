import { AnimatedCarousel } from "@/components/AnimatedCarousel";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const CAMPAIGN_IMAGES_DATA = [
  {
    id: 1,
    image: require("@/assets/images/slider/step1.svg"),
  },
  {
    id: 2,
    image: require("@/assets/images/slider/step1.svg"),
  },
  {
    id: 3,
    image: require("@/assets/images/slider/step3.svg"),
  },
];

export default function OnboardingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="light" />
      <AnimatedCarousel images={CAMPAIGN_IMAGES_DATA} />
    </View>
  );
}
