import { Card, Link, View } from "@aws-amplify/ui-react";
import { Schema } from "../../amplify/data/resource";
import { DreamInterpretation } from "./dream-interpretation";

export const DreamCard = ({ data }: { data: Schema["Dream"]["type"] }) => {
  return (
    <Link href={`/explore?id=${data.id}`} isExternal={false}>
      <Card
        borderRadius={"medium"}
        variation="outlined"
        width={385}
        height={485}
        overflow={"scroll"}
      >
        <View padding="xs" color={"font.primary"}>
          <DreamInterpretation headingLevel={3} data={data} />
        </View>
      </Card>
    </Link>
  );
};
