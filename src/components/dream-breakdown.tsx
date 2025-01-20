import { Heading, Text, View } from "@aws-amplify/ui-react";
import { Schema } from "../../amplify/data/resource";

type Dream = Schema["Dream"]["type"];

export const DreamBreakdown = ({ data }: { data: Dream }) => (
  <section>
    <Heading level={3}>Dream Elements</Heading>
    <ul>
      {data.breakdown?.elements?.map((item, itemIndex) => (
        <View as="li" color="font.primary" key={`dreamBreakdown-${itemIndex}`}>
          <Text>{item}</Text>
        </View>
      ))}
    </ul>
    <Heading level={3}>Symbol Analysis</Heading>
    <ul>
      {data.breakdown?.symbols?.map((item, itemIndex) => (
        <View
          as="li"
          color="font.primary"
          key={`dreamInterpretation-${itemIndex}`}
        >
          <Text>{item}</Text>
        </View>
      ))}
    </ul>
    <Heading level={3}>Emotional Context</Heading>
    <ul>
      {data.breakdown?.context?.map((item, itemIndex) => (
        <View
          as="li"
          color="font.primary"
          key={`dreamInterpretation-${itemIndex}`}
        >
          <Text>{item}</Text>
        </View>
      ))}
    </ul>
    <Heading level={3}>Thematic Interpretation</Heading>
    <ul>
      {data.breakdown?.themes?.map((item, itemIndex) => (
        <View
          as="li"
          color="font.primary"
          key={`dreamInterpretation-${itemIndex}`}
        >
          <Text>{item}</Text>
        </View>
      ))}
    </ul>
    <Heading level={3}>Personal Relevance</Heading>
    <ul>
      {data.breakdown?.relevance?.map((item, itemIndex) => (
        <View
          as="li"
          color="font.primary"
          key={`dreamInterpretation-${itemIndex}`}
        >
          <Text>{item}</Text>
        </View>
      ))}
    </ul>
  </section>
);
