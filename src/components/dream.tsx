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

type Dream = Schema["Dream"]["type"];

export const Dream = () => {
  const [dreamInput, setDreamInput] = useState<string>("");
  const [dreamId, setDreamId] = useState<string>();
  const [activeTab, setActiveTab] = useState<string>("enter-dream");

  const [breakdown, generateBreakdown] = useAIGeneration("generateBreakdown");
  const [interpretation, generateInterpretation] = useAIGeneration(
    "generateInterpretation"
  );

  useEffect(() => {
    console.log("breakdown.data effect", breakdown.data);
    if (breakdown.data) {
      console.log("breakdown.data exists");
      generateInterpretation({
        breakdown: JSON.stringify(breakdown.data),
      });
    }
  }, [breakdown.data]);

  useEffect(() => {
    console.log("interpretation.data effect", interpretation.data);
    if (interpretation.data) {
      console.log("interpretation.data effect has data");
      setActiveTab("dream-insights");
      console.log("updating dream", dreamId);
      dreamId &&
        updateDream(dreamId, breakdown.data, interpretation.data.insight);
    }
  }, [interpretation.data]);

  async function updateDream(
    id: string,
    breakdown?: Dream["breakdown"],
    interpretation?: Dream["interpretation"]
  ) {
    await client.models.Dream.update({
      id,
      breakdown,
      interpretation,
    });
  }

  async function interpretDream() {
    const { data } = await client.models.Dream.create({
      content: dreamInput,
    });
    data && setDreamId(data.id);
    console.log("dream created", data);
    generateBreakdown({ dream: dreamInput });
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
                  onChange={(e) => setDreamInput(e.currentTarget.value)}
                  rows={3}
                  resize="none"
                />
                <ButtonGroup>
                  <Button
                    variation="primary"
                    onClick={interpretDream}
                    isLoading={breakdown.isLoading || interpretation.isLoading}
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
            isDisabled: !interpretation.data,
            content: (
              <View
                style={{
                  display: "grid",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <View typeof="article">
                  <Text>{interpretation.data?.insight}</Text>
                </View>
                <Accordion.Container>
                  <Accordion.Item value="dream-breakdown">
                    <Accordion.Trigger>
                      <Heading level={2}>Interpretation</Heading>
                      <Accordion.Icon />
                    </Accordion.Trigger>
                    <Accordion.Content>
                      {breakdown.data && interpretation.data && (
                        <section>
                          <Heading level={3}>Dream Elements</Heading>
                          <ul>
                            {breakdown.data?.elements?.map(
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
                            {breakdown.data?.symbols?.map((item, itemIndex) => (
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
                            {breakdown.data?.context?.map((item, itemIndex) => (
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
                            {breakdown.data?.themes?.map((item, itemIndex) => (
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
                            {breakdown.data?.relevance?.map(
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
                <History />
              </View>
            ),
          },
        ]}
      />
    </Authenticator>
  );
};
