import { View, Heading, Text, type HeadingLevel } from "@aws-amplify/ui-react";
import { DateBadge } from "./date-badge";
import { type Dream } from "../DreamContext";

export const DreamInterpretation = ({
  headingLevel,
  data,
  children,
}: {
  headingLevel: HeadingLevel;
  data: Dream;
  children?: React.ReactNode;
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <DateBadge dateString={data.createdAt} />
          {children}
        </View>
      </View>
      {data.interpretation?.map((paragraph, index) => (
        <Text key={`interpretation-paragraph-${index}`}>{paragraph}</Text>
      )) || <Text>Dream interpretation missing.</Text>}
    </View>
  </View>
);
