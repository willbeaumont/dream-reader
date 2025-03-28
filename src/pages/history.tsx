import {
  Collection,
  Heading,
  Loader,
  Text,
  useAuthenticator,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { client } from "../client";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useEffect, useState, useContext } from "react";
import { DreamCard } from "../components/dream-card";
import { type Dream, DreamContext } from "../DreamContext";

Amplify.configure(outputs);

const Content = () => {
  const itemsPerPage = useBreakpointValue({
    base: 1,
    medium: 2,
    large: 3,
  }) as number;
  const [data, setData] = useState<Dream[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { dream } = useContext(DreamContext);
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    const fetchDreams = async () => {
      const { data } = await client.models.Dream.list();
      setData(
        data.sort((a, b) => {
          const d1 = new Date(a.createdAt).getTime();
          const d2 = new Date(b.createdAt).getTime();
          return d2 - d1;
        })
      );
    };

    if (user) {
      setIsLoading(true);
      fetchDreams().then(() => setIsLoading(false));
    }
  }, [user, dream]);

  if (!user) return <Text>Please sign in</Text>;
  if (isLoading) return <Loader />;
  if (!data?.length) return <Text>No dreams found, navigate to "Dream"</Text>;

  return (
    <Collection
      items={data}
      type="list"
      direction="row"
      gap="20px"
      wrap="nowrap"
      isPaginated
      itemsPerPage={itemsPerPage}
    >
      {(item, index) => <DreamCard data={item} key={index} />}
    </Collection>
  );
};

export const History = () => {
  return (
    <View>
      <Heading level={2} marginBottom={15}>
        History
      </Heading>
      <Content />
    </View>
  );
};
