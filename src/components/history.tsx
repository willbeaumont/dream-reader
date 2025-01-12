import { Text, View } from "@aws-amplify/ui-react";
import { client } from "../client";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

const { data, errors } = await client.models.Dream.list();

export const History = () => {
  return (
    <View>
      <Text>History</Text>
      {errors && (
        <Text>
          {errors.map((error) => {
            return error.message;
          })}
        </Text>
      )}
      {data && (
        <ul>
          {data.map((dream) => {
            return (
              <View as="li" key={dream.id} color={"font.primary"}>
                <Text>
                  (
                  {new Date(dream.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  ) {dream?.breakdown?.title} <br />
                  <br /> {dream?.interpretation} <br />
                  <br /> {dream?.content}
                </Text>
              </View>
            );
          })}
        </ul>
      )}
    </View>
  );
};
