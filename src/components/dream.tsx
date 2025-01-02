import { Suspense, useEffect, useState } from "react";
import {
  Heading,
  View,
  Button,
  ButtonGroup,
  TextAreaField,
  Accordion,
  Loader,
} from "@aws-amplify/ui-react";
import { useAIGeneration } from "../client";
import React from "react";

const Authenticator = React.lazy(() =>
  import("@aws-amplify/ui-react").then((module) => ({
    default: module.Authenticator,
  }))
);

export const Dream = () => {
  const [dream, setDream] = useState<string>("");
  const [openAccordian, setOpenAccordian] = useState<string[]>(["enter-dream"]);
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
      setOpenAccordian(["dream-story"]);
    }
  }, [story.data]);

  async function interpretDream() {
    generateInterpretation({ dream });
  }

  return (
    <Suspense fallback={<Loader />}>
      <Authenticator>
        <Accordion.Container
          value={openAccordian}
          onValueChange={(value) => value && setOpenAccordian(value)}
          allowMultiple
        >
          <Accordion.Item value="enter-dream">
            <Accordion.Trigger>
              <Heading level={2}>Enter your dream</Heading>
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
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
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="dream-story">
            <Accordion.Trigger>
              <Heading level={2}>Dream insights</Heading>
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
              {story.data && (
                <View typeof="article">
                  <section>
                    <p>{story.data?.insight}</p>
                  </section>
                </View>
              )}
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="dream-breakdown">
            <Accordion.Trigger>
              <Heading level={2}>Interpretation</Heading>
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
              {interpretation.data && story.data && (
                <section>
                  <Heading level={3}>Dream Breakdown:</Heading>
                  <ul>
                    {interpretation.data?.dreamBreakdown?.map(
                      (item, itemIndex) => (
                        <li key={`dreamBreakdown-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ul>
                  <Heading level={3}>Symbol Analysis:</Heading>
                  <ul>
                    {interpretation.data?.symbolAnalysis?.map(
                      (item, itemIndex) => (
                        <li key={`dreamInterpretation-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ul>
                  <Heading level={3}>Emotional Context:</Heading>
                  <ul>
                    {interpretation.data?.emotionalContext?.map(
                      (item, itemIndex) => (
                        <li key={`dreamInterpretation-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ul>
                  <Heading level={3}>Thematic Interpretation:</Heading>
                  <ul>
                    {interpretation.data?.thematicInterpretation?.map(
                      (item, itemIndex) => (
                        <li key={`dreamInterpretation-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ul>
                </section>
              )}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Container>
      </Authenticator>
    </Suspense>
  );
};
