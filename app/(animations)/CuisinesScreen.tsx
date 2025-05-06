import { StyleSheet, useWindowDimensions } from "react-native";

import { Checkbox } from "@/components/checkbox";

import { Text, View } from "@/components/Themed";
import { useCuisines } from "@/hooks/useCuisines";

export default function CuisinesScreen() {
  const { cuisines, toggleCuisine } = useCuisines();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.content}>
      <Text style={styles.title}>What is your favourite cuisine?</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
