import BottomSheetScreen from "@/components/Screens/BottomSheetScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetScreen />
    </GestureHandlerRootView>
  );
}
