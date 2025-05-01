import { Text, ThemedButton, View } from "@/components/Themed";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Button, StyleSheet } from "react-native";

export default function BottomSheetScreen() {
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  const snapeToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });
  return (
    <View style={styles.container}>
      <View style={{ gap: 10, marginTop: 20 }}>
        <ThemedButton title="Open" onPress={handleOpenPress} />
        <ThemedButton title="Close" onPress={handleClosePress} />
        <ThemedButton title="Collapse" onPress={handleCollapsePress} />
        <ThemedButton title="Snap To 0" onPress={() => snapeToIndex(0)} />
        <ThemedButton title="Snap To 1" onPress={() => snapeToIndex(1)} />
        <ThemedButton title="Snap To 2" onPress={() => snapeToIndex(2)} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        animationConfigs={animationConfigs}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
          <BottomSheetTextInput style={styles.input} />
          <Button title="Close" onPress={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
  input: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
});
