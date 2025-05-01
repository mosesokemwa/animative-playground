import CustomBottomSheet from "@/components/CustomBottomSheet";
import SiteEntryScreen from "@/components/Screens/SiteEntryScreen";

export default function HomeScreen() {
  return (
    <CustomBottomSheet title="Bottom Sheet">
      <SiteEntryScreen />
    </CustomBottomSheet>
  );
}
