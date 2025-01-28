import { useContext, useEffect, useState } from "react";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";

import { Authenticator, View, Accordion, Loader } from "@aws-amplify/ui-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DreamBreakdown } from "../components/dream-breakdown";
import { DreamInterpretation } from "../components/dream-interpretation";
import { type Dream, DreamContext } from "../DreamContext";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export const ExploreDream = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dreamId = searchParams.get("id");
  const { dream } = useContext(DreamContext);

  const [dreamData, setDreamData] = useState<Dream>(dream);

  // get dream data if dreamId is present and dream context is not the requested dream
  useEffect(() => {
    if (dreamId && dreamId != dream.id) {
      client.models.Dream.get({ id: dreamId }).then(({ data }) => {
        if (data) {
          setDreamData(data);
        } else {
          navigate("/capture");
        }
      });
    } else {
      setDreamData(dream);
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
              content: <DreamBreakdown breakdownData={dreamData.breakdown} />,
            },
          ]}
        />
      </View>
    </Authenticator>
  );
};
