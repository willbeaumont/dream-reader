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
        This idea was born from a morning conversation with my partner. We like
        sharing and talking about each other's dreams over coffee. One morning
        we tried entering our dream into a GenAI chatbot and had fun seeing what
        it came up with.
      </Text>
      <Heading level={2}>Why?</Heading>
      <Text>
        This app came to be because we wanted a way to keep track of our dreams
        and I'm interested in learning about web development. It has been
        interesting to have a place to write down our dreams overtime with some
        attempt at analysis.
      </Text>
      <Heading level={2}>How does it work?</Heading>
      <Heading level={3}>The App</Heading>
      <Text>
        The application is a React SPA built on AWS Amplify. Amplify has a lot
        of features, but I'm using mostly for these:
        <ul>
          <li>Easy integration with AWS services (Bedrock for the chatbot)</li>
          <li>It supports the React</li>
          <li>Built-in features for authentication</li>
        </ul>
      </Text>
      <Heading level={3}>The Chatbot</Heading>
      <Text>
        The chatbot utilizes Anthropic's Claude Haiku 3.5 model. I picked this
        model mostely to keep cost low.
      </Text>
      <Text>
        The prompt utilizes one user input and 2 shots to "interpret" the dream.
        The first shot asks the model break the dream into 5 sections:
        <ol>
          <li>
            Dream Elements - generally an accounting list of what happened in
            the dream
          </li>
          <li>
            Symbol Analysis - what personal, cultural, and universal symbolism
            is present in the dream
          </li>
          <li>Emotional Context - what are emotions present in the dream</li>
          <li>
            Thematic Interpretation - are there any connecting themse in the
            dream
          </li>
          <li>
            Personal Relevance - are there ties to any personal context provided
            in the prompt
          </li>
        </ol>
        The second shot uses this data to create a short story that should be no
        more than two paragraphs.
      </Text>
      <Heading level={2}>What's next?</Heading>
      <Text>
        These are the top requests from my user.
        <ul>
          <li>Editing capability</li>
          <li>Ability to track themes over time</li>
          <li>Journal prompts based on dream analysis</li>
        </ul>
      </Text>
    </View>
  );
};
