import { ThemedButton } from "@/components/Themed";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { Href, useRouter } from "expo-router";
import { FlatList } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  return (
    <FlatList
      data={_nav_menu}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <ThemedButton
          key={item.title}
          title={item.title}
          onPress={() => {
            router.push(item.route as Href);
          }}
          icon={
            <IconSymbol
              name={String(item.icon) as IconSymbolName}
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        />
      )}
      contentContainerStyle={{ paddingVertical: 10 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 1 }}
    />
  );
}

const _nav_menu = [
  {
    title: "OTP Animation V1",
    route: "/PassCodeV1",
    icon: "lock.circle",
  },
  {
    title: "OTP Animation Demo",
    route: "/PassCodeDemo",
    icon: "lock.circle",
  },
  {
    title: "Animated Select Component",
    route: "/AnimatedCarousel",
    icon: "lock.open",
  },
  {
    title: "Accordion using Scroll View",
    route: "/ScrollViewAccordion",
    icon: "lock.open",
  },
  {
    title: "Animated Cuisines",
    route: "/CuisinesScreen",
    icon: "lock.shield",
  },
  {
    title: "Animated FlatList Accordion",
    route: "/FlatListAccordion",
    icon: "lock.open",
  },
  // SiteEntryScreen
  {
    title: "Animated Site Entry",
    route: "/SiteEntryScreen",
    icon: "lock.open",
  },
  // BottomSheetScreen
  {
    title: "Animated Bottom Sheet",
    route: "/BottomSheetScreen",
    icon: "lock.open",
  },
  {
    title: "React Native Animated Timer / Countdown",
    route: "/AnimatedTimer",
    icon: "lock.open",
  },
];
