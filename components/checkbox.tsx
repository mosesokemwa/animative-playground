import { ACTIVE_COLOR, INACTIVE_COLOR } from "@/utils/constants";
import React from "react";
import { Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const _FADEDED_ACTIVE_COLOR = `${ACTIVE_COLOR}${Math.floor(255 * 0.1).toString(
  16
)}`;

const TimingConfig = {
  duration: 150,
};

type CheckboxProps = {
  index?: number;
  label: string;
  checked: boolean;
  onPress: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  index,
  label,
  checked,
  onPress,
}) => {
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? _FADEDED_ACTIVE_COLOR : "transparent",
        TimingConfig
      ),
      borderColor: withTiming(
        checked ? ACTIVE_COLOR : INACTIVE_COLOR,
        TimingConfig
      ),
      paddingLeft: 20,
      paddingRight: withTiming(!checked ? 20 : 14, TimingConfig),
    };
  }, [checked]);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? ACTIVE_COLOR : INACTIVE_COLOR, TimingConfig),
    };
  }, [checked]);

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.5)}
      key={index}
      style={[styles.container, rContainerStyle]}
      onTouchEnd={onPress}
    >
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          style={{ marginLeft: 5 }}
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
        >
          <AntDesign name="checkcircle" size={20} color={ACTIVE_COLOR} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#fff",
  },
});
