import { Text, ThemedButton, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function BottomSheetScreen() {
  const theme = useColorScheme() ?? "light";
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["30%", "50%", "70%"], []);

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
        pressBehavior="close"
        opacity={0.8}
        style={{
          backgroundColor: Colors[theme].background,
          borderRadius: 40,
        }}
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
    <GestureHandlerRootView style={styles.container}>
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
        backgroundStyle={{
          backgroundColor: Colors[theme].background,
          borderRadius: 40,
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
          <BottomSheetTextInput
            style={{
              marginTop: 8,
              marginHorizontal: 16,
              marginBottom: 10,
              borderRadius: 10,
              fontSize: 16,
              lineHeight: 20,
              padding: 8,
              backgroundColor: Colors[theme].backgroundTint,
            }}
          />
          <ThemedButton
            title="Close"
            onPress={handleClosePress}
            style={{
              width: "20%",
              alignSelf: "center",
              marginTop: 10,
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
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
});
