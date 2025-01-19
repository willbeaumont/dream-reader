import {
  Accordion,
  Badge,
  Card,
  Heading,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { Schema } from "../../amplify/data/resource";

const cardBottomMargin = 10;

export const DreamCard = ({
  data,
  index,
}: {
  data: Schema["Dream"]["type"];
  index: number;
}) => {
  return (
    <Card
      key={index}
      borderRadius={"medium"}
      variation="outlined"
      width={400}
      height={500}
      overflow={"scroll"}
    >
      <View padding="xs" color={"font.primary"}>
        <Heading level={3} marginBottom={cardBottomMargin}>
          {data.breakdown?.title || "no title saved"}
        </Heading>
        <Badge marginBottom={cardBottomMargin}>
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Badge>
        <View marginBottom={cardBottomMargin}>
          <Text>{data.interpretation || "no interpretation saved"} </Text>
        </View>
        <Accordion
          items={[
            {
              trigger: "Dream",
              value: `dream-${index}`,
              content: data?.content,
            },
          ]}
        />
      </View>
    </Card>
  );
};
