import { Card, useBreakpointValue, View } from "@aws-amplify/ui-react";

import { DreamInterpretation } from "./dream-interpretation";
import { type Dream } from "../DreamContext";
import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";

export const DreamCard = ({ data }: { data: Dream }) => {
  const width = useBreakpointValue({
    base: "100%",
    medium: "50%",
    large: "33.3%",
  }) as string;
  return (
    <Card
      width={width}
      height={485}
      borderRadius={"medium"}
      variation="outlined"
      overflow={"scroll"}
    >
      <View padding="xs">
        <DreamInterpretation headingLevel={3} data={data}>
          <EditButton data={data} />
          <DeleteButton data={data} />
        </DreamInterpretation>
      </View>
    </Card>
  );
};
