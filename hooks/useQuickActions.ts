import { useQuickActionCallback } from "expo-quick-actions/hooks";
import { Alert } from "react-native";

export const useQuickActions = () => {
  const quickActionCallback = useQuickActionCallback((action) => {
    if (action.id === "1") {
      Alert.alert(
        "Quick Action",
        "You clicked on the first quick action",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
  });

  return { quickActionCallback };
};
