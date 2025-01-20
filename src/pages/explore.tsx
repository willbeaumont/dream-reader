import { useEffect, useState } from "react";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";

import { Authenticator, View, Accordion, Loader } from "@aws-amplify/ui-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DreamBreakdown } from "../components/dream-breakdown";
import { DreamInterpretation } from "../components/dream-interpretation";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type Dream = Schema["Dream"]["type"];

export const ExploreDream = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dreamId = searchParams.get("id");

  const [dreamData, setDreamData] = useState<Dream>();

  // get dream data if dreamId is present
  useEffect(() => {
    if (dreamId) {
      client.models.Dream.get({ id: dreamId }).then(({ data }) => {
        if (data) {
          console.log(data);
          setDreamData(data);
        }
      });
    } else {
      navigate("/capture");
    }
  }, [dreamId]);

  if (!dreamData) return <Loader />;

  return (
    <Authenticator>
      <View
        style={{
          display: "grid",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <DreamInterpretation headingLevel={2} data={dreamData} />
        <Accordion
          items={[
            {
              trigger: "Dream input",
              value: "dream-input",
              content: dreamData?.content,
            },
            {
              trigger: "AI Breakdown",
              value: "dream-breakdown",
              content: <DreamBreakdown data={dreamData} />,
            },
          ]}
        />
      </View>
    </Authenticator>
  );
};
