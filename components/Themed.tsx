import {
  KeyboardAvoidingView as DefaultKeyboardAvoidingView,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  Platform,
  TouchableOpacity,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

import { useThemeColor } from "@/hooks/useThemeColor";

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[
        { color, fontFamily: "FuturaBook", fontWeight: "400", fontSize: 16 },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function AnimatedText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <Animated.Text style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundRoot"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function AnimatedView(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundRoot"
  );

  return (
    <Animated.View
      // layout={LinearTransition}
      // entering={FadeInUp}
      // exiting={FadeOutUp}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

export function KeyboardAvoidingView(props: any) {
  const insets = useSafeAreaInsets();

  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundRoot"
  );
  return (
    <DefaultKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
      style={[style, { backgroundColor, paddingTop: insets.top }]}
      {...otherProps}
    />
  );
}

export function Card(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundRoot"
  );
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        {
          backgroundColor,
          padding: 10,
          margin: 10,
          ...Platform.select({
            ios: {
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowColor: Colors[theme].text,
              shadowOpacity: 0.25,
              shadowRadius: 5,
              borderRadius: 5,
            },
            android: {
              elevation: 5,
              dropShadow: 5,
              shadowColor: Colors[theme].text,
            },
            default: {
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowColor: Colors[theme].text,
              borderwidth: 1,
              bordercolor: Colors[theme].text,
              shadowOpacity: 0.25,
              shadowRadius: 5,
              borderRadius: 5,
              elevation: 5,
            },
          }),
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function TextInput(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultTextInput
      style={[
        {
          color,
          height: 40,
          marginBottom: 10,
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          borderColor: props.errorColor ? props.errorColor : borderColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function AnimatedScrollView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundRoot"
  );

  return (
    <Animated.ScrollView
      layout={LinearTransition}
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

export function ImageView(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundRoot"
  );

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Animated.Image
      layout={LinearTransition}
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={[{ backgroundColor, color }, style]}
      {...otherProps}
    />
  );
}

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

type ThemedButtonProps = {
  title?: string;
  icon?: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: any;
};
export function ThemedButton(props: ThemedButtonProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  return (
    <AnimatedPressable
      layout={LinearTransition}
      entering={FadeInUp}
      exiting={FadeOutUp}
      onPress={props.onPress}
      style={[
        {
          borderRadius: 10,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    >
      {props.title && (
        <Text
          style={{
            color: Colors.light.text,
            fontFamily: "FuturaBook",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          {props.title}
        </Text>
      )}
      {props.icon && props.icon}
      {props.children}
    </AnimatedPressable>
  );
}
