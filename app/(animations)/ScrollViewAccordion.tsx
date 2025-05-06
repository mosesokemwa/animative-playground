import { data } from "@/components/data/AccordionData";
import Accordion from "@/components/ui/Accordion";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { ScrollView } from "react-native";

export default function ScrollViewAccordion() {
  const scrollViewRef = useRef<ScrollView>(null);

  function handleAccordionOpen(ItemLayoutY: number, contentHeight: number) {
    // Scroll to the accordion item when it is opened
    scrollViewRef.current?.scrollTo({
      y: ItemLayoutY - 100,
      animated: true,
    });
  }
  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" />
      {data.map((item, index) => (
        <Accordion
          key={index}
          category={item}
          onAccordionOpen={handleAccordionOpen}
        />
      ))}
    </ScrollView>
  );
}
