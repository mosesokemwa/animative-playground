import { StyleSheet, Dimensions, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Checkbox } from "@/components/checkbox";

import { useCuisines } from "@/hooks/useCuisines";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { cuisines, toggleCuisine } = useCuisines();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ThemedView
          style={{
            width: width,
            bottom: 0,
            left: 0,
            position: "absolute",
            backgroundColor: "#1D3D47",
          }}
        >
          <ThemedText
            type="title"
            style={{
              color: "red",
              fontSize: 24,
              flexBasis: 0,
              flexGrow: 1,
              fontWeight: "bold",
              alignSelf: "center",
              height: 100,
            }}
          >
            React Native
          </ThemedText>
        </ThemedView>
      }
    >
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>
          What is your favourite cuisine?
        </ThemedText>
        <View style={styles.listContainer}>
          {cuisines.map((cuisine) => (
            <Checkbox
              key={cuisine.id}
              label={cuisine.name}
              checked={cuisine.selected}
              onPress={() => toggleCuisine(cuisine.id)}
            />
          ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: width,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  content: {
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 26,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 24,
  },
});
