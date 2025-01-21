import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { useAIGeneration } from "../client";
import { Schema } from "../../amplify/data/resource";
import outputs from "../../amplify_outputs.json";

import {
  Authenticator,
  View,
  Button,
  ButtonGroup,
  TextAreaField,
} from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type Dream = Schema["Dream"]["type"];

export const EditDream = () => {
  const navigate = useNavigate();

  const [dreamInput, setDreamInput] = useState<string>("");
  const [dreamId, setDreamId] = useState<string>();

  const [breakdown, generateBreakdown] = useAIGeneration("generateBreakdown");
  const [interpretation, generateInterpretation] = useAIGeneration(
    "generateInterpretation"
  );

  useEffect(() => {
    if (breakdown.data) {
      generateInterpretation({
        breakdown: JSON.stringify(breakdown.data),
      });
    }
  }, [breakdown.data]);

  useEffect(() => {
    if (interpretation.data) {
      dreamId &&
        updateDream(dreamId, breakdown.data, interpretation.data.insight);
      navigate(`/explore?id=${dreamId}`);
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
    if (data) {
      setDreamId(data.id);
      generateBreakdown({ dream: dreamInput });
    } else {
      console.error("Error creating dream");
    }
  }

  return (
    <Authenticator>
      <View
        style={{
          display: "grid",
          gap: "1rem",
        }}
      >
        <TextAreaField
          label="Tell me something new..."
          descriptiveText="Enter a dream to interpret"
          placeholder="Your dream..."
          onChange={(e) => setDreamInput(e.currentTarget.value)}
          rows={18}
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
    </Authenticator>
  );
};
