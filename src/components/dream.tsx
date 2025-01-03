import { useEffect, useState } from "react";
import {
  Authenticator,
  Heading,
  View,
  Button,
  ButtonGroup,
  TextAreaField,
  Accordion,
  Text,
  Tabs,
} from "@aws-amplify/ui-react";
import { useAIGeneration } from "../client";

export const Dream = () => {
  const [dream, setDream] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("enter-dream");
  const [interpretation, generateInterpretation] = useAIGeneration(
    "generateInterpretation"
  );
  const [story, generateStory] = useAIGeneration("generateStory");

  useEffect(() => {
    if (interpretation.data) {
      generateStory({
        dreamInterpretation: JSON.stringify(interpretation.data),
      });
    }
  }, [interpretation.data]);

  useEffect(() => {
    if (story.data) {
      setActiveTab("dream-insights");
    }
  }, [story.data]);

  async function interpretDream() {
    generateInterpretation({ dream });
  }

  return (
    <Authenticator>
      <Tabs
        justifyContent={"flex-start"}
        value={activeTab}
        items={[
          {
            label: "Enter your dream",
            value: "enter-dream",
            content: (
              <View
                style={{
                  display: "grid",
                  gap: "1rem",
                }}
              >
                <TextAreaField
                  autoResize
                  label="Dream input"
                  descriptiveText="Enter a dream to interpret"
                  placeholder="Your dream..."
                  value={dream}
                  onChange={(e) => setDream(e.currentTarget.value)}
                />
                <ButtonGroup>
                  <Button
                    variation="primary"
                    onClick={interpretDream}
                    isLoading={interpretation.isLoading || story.isLoading}
                    loadingText="Interpreting..."
                  >
                    Interpret Dream
                  </Button>
                </ButtonGroup>
              </View>
            ),
          },
          {
            label: "Dream insights",
            value: "dream-insights",
            isDisabled: !story.data,
            content: (
              <View
                style={{
                  display: "grid",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <View typeof="article">
                  <Text>{story.data?.insight}</Text>
                </View>
                <Accordion.Container>
                  <Accordion.Item value="dream-breakdown">
                    <Accordion.Trigger>
                      <Heading level={2}>Interpretation</Heading>
                      <Accordion.Icon />
                    </Accordion.Trigger>
                    <Accordion.Content>
                      {interpretation.data && story.data && (
                        <section>
                          <Heading level={3}>Dream Breakdown</Heading>
                          <Text>
                            <ul>
                              {interpretation.data?.dreamBreakdown?.map(
                                (item, itemIndex) => (
                                  <li key={`dreamBreakdown-${itemIndex}`}>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </Text>
                          <Heading level={3}>Symbol Analysis</Heading>
                          <Text>
                            <ul>
                              {interpretation.data?.symbolAnalysis?.map(
                                (item, itemIndex) => (
                                  <li key={`dreamInterpretation-${itemIndex}`}>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </Text>
                          <Heading level={3}>Emotional Context</Heading>
                          <Text>
                            <ul>
                              {interpretation.data?.emotionalContext?.map(
                                (item, itemIndex) => (
                                  <li key={`dreamInterpretation-${itemIndex}`}>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </Text>
                          <Heading level={3}>Thematic Interpretation</Heading>
                          <Text>
                            <ul>
                              {interpretation.data?.thematicInterpretation?.map(
                                (item, itemIndex) => (
                                  <li key={`dreamInterpretation-${itemIndex}`}>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </Text>
                        </section>
                      )}
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Container>
              </View>
            ),
          },
        ]}
      />
    </Authenticator>
  );
};
