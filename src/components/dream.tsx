import { useEffect, useState } from "react";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";
import { useAIGeneration } from "../client";
import { Schema } from "../../amplify/data/resource";

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
import { History } from "./history";

Amplify.configure(outputs);

const client = generateClient<Schema>();
const { data, errors } = await client.models.Dream.list();

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
    await client.models.Dream.create({
      content: dream,
    });
    generateInterpretation({ dream });
  }

  return (
    <Authenticator>
      <Tabs
        justifyContent={"flex-start"}
        value={activeTab}
        onValueChange={(e) => setActiveTab(e)}
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
                  onChange={(e) => setDream(e.currentTarget.value)}
                  rows={3}
                  resize="none"
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
                          <ul>
                            {interpretation.data?.dreamBreakdown?.map(
                              (item, itemIndex) => (
                                <View
                                  as="li"
                                  color="font.primary"
                                  key={`dreamBreakdown-${itemIndex}`}
                                >
                                  <Text>{item}</Text>
                                </View>
                              )
                            )}
                          </ul>
                          <Heading level={3}>Symbol Analysis</Heading>
                          <ul>
                            {interpretation.data?.symbolAnalysis?.map(
                              (item, itemIndex) => (
                                <View
                                  as="li"
                                  color="font.primary"
                                  key={`dreamInterpretation-${itemIndex}`}
                                >
                                  <Text>{item}</Text>
                                </View>
                              )
                            )}
                          </ul>
                          <Heading level={3}>Emotional Context</Heading>
                          <ul>
                            {interpretation.data?.emotionalContext?.map(
                              (item, itemIndex) => (
                                <View
                                  as="li"
                                  color="font.primary"
                                  key={`dreamInterpretation-${itemIndex}`}
                                >
                                  <Text>{item}</Text>
                                </View>
                              )
                            )}
                          </ul>
                          <Heading level={3}>Thematic Interpretation</Heading>
                          <ul>
                            {interpretation.data?.thematicInterpretation?.map(
                              (item, itemIndex) => (
                                <li key={`dreamInterpretation-${itemIndex}`}>
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                        </section>
                      )}
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Container>
              </View>
            ),
          },
          {
            label: "My dreams",
            value: "my-dreams",
            content: (
              <View
                style={{
                  display: "grid",
                  gap: "1rem",
                }}
              >
                <History data={data} errors={errors} />
              </View>
            ),
          },
        ]}
      />
    </Authenticator>
  );
};
