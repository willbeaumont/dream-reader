import { Text, View } from "@aws-amplify/ui-react";
import type { GraphQLFormattedError } from "graphql";

interface DreamHistory {
  content: string | null;
  readonly id: string;
  owner: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export const History = ({
  data,
  errors,
}: {
  data: DreamHistory[];
  errors?: GraphQLFormattedError[];
}) => {
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
                  ) {dream.content}
                </Text>
              </View>
            );
          })}
        </ul>
      )}
    </View>
  );
};
