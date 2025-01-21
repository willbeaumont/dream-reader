import { Card, Link, useBreakpointValue, View } from "@aws-amplify/ui-react";
import { Schema } from "../../amplify/data/resource";
import { DreamInterpretation } from "./dream-interpretation";

type Dream = Schema["Dream"]["type"];
export const DreamCard = ({ data }: { data: Dream }) => {
  const width = useBreakpointValue({
    base: "100%",
    medium: "50%",
    large: "33.3%",
  }) as string;
  return (
    <Link width={width} href={`/explore?id=${data.id}`} isExternal={false}>
      <Card
        height={485}
        borderRadius={"medium"}
        variation="outlined"
        overflow={"scroll"}
      >
        <View padding="xs">
          <DreamInterpretation headingLevel={3} data={data} />
        </View>
      </Card>
    </Link>
  );
};
