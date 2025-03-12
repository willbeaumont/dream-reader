import { Heading, View, Text } from "@aws-amplify/ui-react";

export const About = () => {
  return (
    <View
      style={{
        display: "grid",
        gap: "1rem",
      }}
    >
      <Heading level={2}>What is this?</Heading>
      <Text>
        Welcome! This app explores the use of generative AI against a "dream
        interpretation" context. It conducts a chain of prompts to explore
        context of an dream against common archtypes.
      </Text>
      <Text>
        Outputs from this app are intended for fun and a starting point for self
        reflection.
      </Text>
    </View>
  );
};
