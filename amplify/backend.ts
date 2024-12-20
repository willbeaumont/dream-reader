import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

export const backend = defineBackend({
  auth,
  data,
  // generateInterpretationFunction,
});

// backend.generateInterpretationFunction.resources.lambda.addToRolePolicy(
//   new PolicyStatement({
//     effect: Effect.ALLOW,
//     actions: ["bedrock:InvokeModel"],
//     resources: [`arn:aws:bedrock:*::foundation-model/${MODEL_ID}`],
//   })
// );
