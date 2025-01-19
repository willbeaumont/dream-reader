import { Text, useAuthenticator, View } from "@aws-amplify/ui-react";
import { client } from "../client";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";

Amplify.configure(outputs);

export const History = () => {
  const [data, setData] = useState<Schema["Dream"]["type"][]>();
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user) {
      client.models.Dream.list().then((response) => {
        setData(response.data);
      });
    }
  }, [user]);

  return (
    <View>
      <Text>History</Text>
      {!user ? (
        <Text>Please sign in</Text>
      ) : (
        data && (
          <ul>
            {data
              .sort((a, b) => {
                const d1 = new Date(a.createdAt).getTime();
                const d2 = new Date(b.createdAt).getTime();
                return d2 - d1;
              })
              .map((dream) => {
                return (
                  <View as="li" key={dream.id} color={"font.primary"}>
                    <Text>
                      (
                      {new Date(dream.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      ) {dream.breakdown?.title || "no title saved"} <br />
                      <br /> {dream.interpretation ||
                        "no interpretation saved"}{" "}
                      <br />
                      <br /> {dream?.content}
                    </Text>
                  </View>
                );
              })}
          </ul>
        )
      )}
    </View>
  );
};
