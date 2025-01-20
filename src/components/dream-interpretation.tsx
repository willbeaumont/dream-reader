import { View, Heading, Text, type HeadingLevel } from "@aws-amplify/ui-react";
import { DateBadge } from "./date-badge";
import { Schema } from "../../amplify/data/resource";

type Dream = Schema["Dream"]["type"];

export const DreamInterpretation = ({
  headingLevel,
  data,
}: {
  headingLevel: HeadingLevel;
  data: Dream;
}) => (
  <View typeof="article">
    <View
      style={{
        display: "grid",
        gap: "1rem",
      }}
    >
      <View>
        <Heading level={headingLevel} marginBottom={10}>
          {data.breakdown?.title}
        </Heading>
        <DateBadge dateString={data.createdAt} />
      </View>
      {data.interpretation?.map((paragraph, index) => (
        <Text key={`interpretation-paragraph-${index}`}>{paragraph}</Text>
      )) || <Text>Dream interpretation missing.</Text>}
    </View>
  </View>
);
