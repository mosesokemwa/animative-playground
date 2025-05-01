import { ThemedButton, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ICON_SIZE } from "@/utils/constants";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheet,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconSymbol } from "./ui/IconSymbol";
export type Ref = BottomSheet;

interface Props {
  title: string;
  children: React.ReactNode;
}

const CloseBtn = () => {
  const { close } = useBottomSheet();
  const theme = useColorScheme() ?? "light";

  //   return <ThemedButton title="Close" onPress={() => close()} />;
  return (
    <ThemedButton
      onPress={() => close()}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      style={{
        padding: 0,
        borderRadius: 0,
      }}
    >
      <IconSymbol
        name="xmark"
        size={ICON_SIZE - 10}
        color={Colors[theme].primary}
      />
    </ThemedButton>
  );
};

const CONTENT_SPACING = 20;

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const theme = useColorScheme() ?? "light";

  const snapPoints = useMemo(() => ["40%", "60%"], []);

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
    <GestureHandlerRootView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].text }}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
      >
        <BottomSheetView style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              marginRight: CONTENT_SPACING,
            }}
          >
            <CloseBtn />
          </View>
          {props.children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
});

export default CustomBottomSheet;
