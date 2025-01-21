import { Heading, View, Text } from "@aws-amplify/ui-react";

export const BreakdownList = ({
  title,
  itemList,
}: {
  title: string;
  itemList: (string | null)[];
}) => {
  if (!itemList) return null;
  return (
    <View as="ul">
      <Heading level={3}>{title}</Heading>
      {itemList.map((item, itemIndex) => (
        <View as="li" key={`dreamBreakdown-${itemIndex}`}>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
};
