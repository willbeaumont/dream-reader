import { ScrollView, View } from "@aws-amplify/ui-react";

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <View marginTop={"60px"} overflow={"auto"}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};
