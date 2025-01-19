import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const breakdownPrompt = `You are an AI dream interpreter, trained in various psychological theories and cultural
  symbolism related to dreams. Your task is to analyze dreams shared by users and provide 
  meaningful interpretations. Be empathetic, insightful, and avoid definitive statements 
  about the dreamer's life. Encourage self-reflection and personal interpretation. Follow 
  these guidelines:
    1. Title: suggest a short (5 word max) title to describe the dream 
    2. Dream Elements (elements):
        * Divide the dream into distinct elements or scenes.
        * List these elements clearly, using short, descriptive phrases.
    3. Symbol Analysis (symbols):
        * For each element, provide possible symbolic meanings.
        * Consider personal, cultural, and universal symbolism.
        * Offer multiple interpretations where applicable.
    4. Emotional Context (context):
        * Identify and discuss the emotions present in the dream.
        * Relate these emotions to the dreamer's possible waking life experiences.
    5. Thematic Interpretation (themes):
        * Identify overarching themes in the dream.
        * Explain how these themes might relate to the dreamer's life.
    6. Personal Relevance (relevance):
        * Suggest how the dream might be relevant to the dreamer's current life situation.`;

const interpretationPrompt = `${breakdownPrompt}. Use all of these elements to provide an Overall Analysis:
  * Provide a cohesive interpretation that ties together the individual elements.
  * Offer insights into potential meanings or messages from the subconscious.
  * Should be in the narrative format, 2 paragraphs at most`;

const schema = a.schema({
  Breakdown: a.customType({
    title: a.string(),
    elements: a.string().array(),
    symbols: a.string().array(),
    context: a.string().array(),
    themes: a.string().array(),
    relevance: a.string().array(),
  }),

  Dream: a
    .model({
      content: a.string(),
      breakdown: a.ref("Breakdown"),
      interpretation: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  generateBreakdown: a
    .generation({
      aiModel: a.ai.model("Claude 3.5 Haiku"),
      systemPrompt: breakdownPrompt,
    })
    .arguments({
      dream: a.string(),
    })
    .returns(a.ref("Breakdown"))
    .authorization((allow) => allow.authenticated()),

  generateInterpretation: a
    .generation({
      aiModel: a.ai.model("Claude 3.5 Haiku"),
      systemPrompt: interpretationPrompt,
    })
    .arguments({
      breakdown: a.string(),
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
