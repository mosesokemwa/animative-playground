import { Dots } from "@/components/dots";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { Dimensions, ScrollView } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const DOTS_SCREEN_NUMBER = 3;

export default function TabTwoScreen() {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const activeIndex = useSharedValue(0);

  return (
    <ThemedView>
      <StatusBar style="light" />
      <ScrollView
        horizontal
        decelerationRate={"fast"}
        snapToInterval={windowWidth}
      >
        {new Array(DOTS_SCREEN_NUMBER).fill(0).map((_, index) => (
          <ThemedView
            key={index}
            style={{
              backgroundColor: "white",
              width: windowWidth,
              height: windowHeight,
              opacity: index * 0.2,
            }}
          />
        ))}
      </ScrollView>
      <Dots
        count={DOTS_SCREEN_NUMBER}
        onPressPagination={(index: any) => {
          console.log("Pressed dot at index:", index);
        }}
        activeIndex={activeIndex} // Replace with the actual active index
      />
    </ThemedView>
  );
}

/**
          
          Array.from({ length: DOTS_SCREEN_NUMBER }).map((_, index) => {
            return (
              <ThemedView
                key={index}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "white",
                  margin: 10,
                  alignSelf: "center",
                }}
              />
            );
          })
        }
 */
