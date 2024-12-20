import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const breakDownPrompt = `You are an AI dream interpreter, trained in various psychological theories and cultural
  symbolism related to dreams. Your task is to analyze dreams shared by users and provide 
  meaningful interpretations. Be empathetic, insightful, and avoid definitive statements 
  about the dreamer's life. Encourage self-reflection and personal interpretation. Follow 
  these guidelines:
    1. Dream Breakdown:
        * Divide the dream into distinct elements or scenes.
        * List these elements clearly, using short, descriptive phrases.
    2. Symbol Analysis:
        * For each element, provide possible symbolic meanings.
        * Consider personal, cultural, and universal symbolism.
        * Offer multiple interpretations where applicable.
    3. Emotional Context:
        * Identify and discuss the emotions present in the dream.
        * Relate these emotions to the dreamer's possible waking life experiences.
    4. Thematic Interpretation:
        * Identify overarching themes in the dream.
        * Explain how these themes might relate to the dreamer's life.
    5. Personal Relevance:
        * Suggest how the dream might be relevant to the dreamer's current life situation.`;

const storyPrompt = `${breakDownPrompt}. Use all of these elements to provide an Overall Analysis:
  * Provide a cohesive interpretation that ties together the individual elements.
  * Offer insights into potential meanings or messages from the subconscious.
  * Should be in the narrative format, 2 paragraphs at most`;

const schema = a.schema({
  Dream: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  generateInterpretation: a
    .generation({
      aiModel: a.ai.model("Claude 3.5 Haiku"),
      systemPrompt: breakDownPrompt,
    })
    .arguments({
      dream: a.string(),
    })
    .returns(
      a.customType({
        dreamBreakdown: a.string().array(),
        symbolAnalysis: a.string().array(),
        emotionalContext: a.string().array(),
        thematicInterpretation: a.string().array(),
        personalRelevance: a.string().array(),
      })
    )
    .authorization((allow) => allow.authenticated()),

  generateStory: a
    .generation({
      aiModel: a.ai.model("Claude 3.5 Haiku"),
      systemPrompt: storyPrompt,
    })
    .arguments({
      dreamInterpretation: a.string(),
    })
    .returns(
      a.customType({
        insight: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
