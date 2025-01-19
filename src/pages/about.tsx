import { Heading, View, Text } from "@aws-amplify/ui-react";

export const About = () => {
  return (
    <View
      style={{
        display: "grid",
        gap: "1rem",
      }}
    >
      <Heading level={2}>About Our App</Heading>
      <Text>
        Welcome to our Dream Interpretation App, where your dreams take center
        stage! This innovative platform harnesses the power of generative AI to
        provide insightful interpretations of your dream experiences. Whether
        you’ve had a vivid adventure or a perplexing nightmare, our app is
        designed to help you explore the deeper meanings behind your dreams.
      </Text>
      <Heading level={2}>Explore Your Dreams</Heading>
      <Text>
        Dreams can be windows into our subconscious, reflecting our thoughts,
        feelings, and experiences. With our app, simply input your dream
        details, and let our AI generate interpretations that spark conversation
        and inspire personal reflection.
      </Text>
      <Heading level={2}>A Start for Reflection</Heading>
      <Text>
        While our interpretations are crafted to be engaging and
        thought-provoking, it’s important to remember that they are not a
        substitute for professional counseling or therapy. Instead, consider
        them as conversation starters or a springboard for your own exploration
        of thoughts and emotions. Use the insights provided to delve deeper into
        what your dreams might reveal about your waking life.
      </Text>
    </View>
  );
};
