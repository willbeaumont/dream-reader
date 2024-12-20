// import {
//   BedrockRuntimeClient,
//   InvokeModelCommand,
//   InvokeModelCommandInput,
// } from "@aws-sdk/client-bedrock-runtime";
// import type { Schema } from "./resource";

// // initialize bedrock runtime client
// const client = new BedrockRuntimeClient();

// export const handler: Schema["generateInterpretation"]["functionHandler"] =
//   async (event, context) => {
//     // User prompt
//     const prompt = event.arguments.prompt;

//     // Prompt body
//     const request_body = {
//         "system": [
//             {"text": "You write JSON objects based on the given instructions"}
//         ],
//         "messages": [
//             {
//                 "role": "user",
//                 "content": [{"text": "Provide details about the best selling full-frame cameras in past three years.
//     Answer in JSON format with keys like name, brand, price and a summary."}]
//             },
//             {
//                 "role": "assistant",
//                 "content": [{"text": " Here is the JSON response: ```json"}]
//             },
//         ],
//         "inferenceConfig": {
//             "max_new_tokens": 300,
//             "top_p": 0.9,
//             "top_k": 20,
//             "temperature": 0.7,
//         }
//     }

//     // Invoke model
//     const input = {
//       modelId: process.env.MODEL_ID,
//       contentType: "application/json",
//       accept: "application/json",
//       body: JSON.stringify({
//         anthropic_version: "bedrock-2023-05-31",
//         system: `You are an AI dream interpreter, trained in various psychological theories and cultural symbolism related to dreams. Your task is to analyze dreams shared by users and provide meaningful interpretations. Be empathetic, insightful, and avoid definitive statements about the dreamer's life. Encourage self-reflection and personal interpretation. Follow these guidelines:
//         1. Dream Breakdown:
//         * Divide the dream into distinct elements or scenes.
//         * List these elements clearly, using short, descriptive phrases.
//         2. Symbol Analysis:
//         * For each element, provide possible symbolic meanings.
//         * Consider personal, cultural, and universal symbolism.
//         * Offer multiple interpretations where applicable.
//         3. Emotional Context:
//         * Identify and discuss the emotions present in the dream.
//         * Relate these emotions to the dreamer's possible waking life experiences.
//         4. Thematic Interpretation:
//         * Identify overarching themes in the dream.
//         * Explain how these themes might relate to the dreamer's life.
//         5. Personal Relevance:
//         * Suggest how the dream might be relevant to the dreamer's current life situation.`,
//         messages: [
//           {
//             role: "user",
//             content: [
//               {
//                 type: "text",
//                 text: prompt,
//               },
//             ],
//           },
//         ],
//         max_tokens: 1000,
//         temperature: 0.5,
//       }),
//     } as InvokeModelCommandInput;

//     const command = new InvokeModelCommand(input);

//     const response = await client.send(command);

//     // Parse the response and return the generated haiku
//     const data = JSON.parse(Buffer.from(response.body).toString());

//     return data.content[0].text;
//   };
