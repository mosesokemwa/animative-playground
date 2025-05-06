import { Text } from "@/components//Themed";
import Accordion from "@/components//ui/Accordion";
import { data } from "@/components/data/AccordionData";
import { useRef } from "react";
import { FlatList, View } from "react-native";

export default function FlatListAccordion() {
  const flastListRef = useRef<FlatList>(null);

  function handleAccordionOpen(ItemLayoutY: number, contentHeight: number) {
    // Scroll to the accordion item when it is opened
    flastListRef.current?.scrollToOffset({
      offset: ItemLayoutY - 100 - contentHeight,
      animated: true,
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flastListRef}
        data={data}
        keyExtractor={(item, index) => item.title + index.toString()}
        renderItem={({ item }) => (
          <Accordion
            key={item.title}
            category={item}
            onAccordionOpen={handleAccordionOpen}
          />
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, color: "#888" }}>
              No items available
            </Text>
          </View>
        }
        stickyHeaderHiddenOnScroll={true}
        scrollEventThrottle={16}
      />
    </View>
  );
}
