import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { useAIGeneration } from "../client";

import { DreamContext, type DreamContextType } from "../DreamContext";
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
  const { dream, setDream } = useContext<DreamContextType>(DreamContext);

  const [breakdown, generateBreakdown] = useAIGeneration("generateBreakdown");
  const [interpretation, generateInterpretation] = useAIGeneration(
    "generateInterpretation"
  );

  useEffect(() => {
    if (breakdown.data) {
      setDream({ ...dream, breakdown: { ...breakdown.data } });
      generateInterpretation({
        breakdown: JSON.stringify(breakdown.data),
      });
    }
  }, [breakdown.data]);

  useEffect(() => {
    if (interpretation.data) {
      dream.id &&
        updateDreamData(dream.id, breakdown.data, interpretation.data.insight);
      setDream({ ...dream, interpretation: interpretation.data.insight });
      navigate(`/explore?id=${dream.id}`);
    }
  }, [interpretation.data]);

  async function updateDreamData(
    id: string,
    breakdown?: Dream["breakdown"],
    interpretation?: Dream["interpretation"]
  ) {
    client.models.Dream.update({
      id,
      breakdown,
      interpretation,
    });
  }

  async function interpretDream() {
    const { data } = await client.models.Dream.create({
      content: dream.content,
    });
    if (data) {
      setDream({ ...dream, id: data.id, createdAt: data.createdAt });
      generateBreakdown({ dream: dream.content });
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
          onChange={(e) =>
            setDream({ ...dream, content: e.currentTarget.value })
          }
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
