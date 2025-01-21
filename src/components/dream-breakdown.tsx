import { View } from "@aws-amplify/ui-react";
import { Schema } from "../../amplify/data/resource";

import { BreakdownList } from "./dream-breakdown-list";

type Breakdown = Schema["Dream"]["type"]["breakdown"];

export const DreamBreakdown = ({
  breakdownData,
}: {
  breakdownData: Breakdown;
}) => (
  <View as="section">
    <BreakdownList
      title="Dream Elements"
      itemList={breakdownData?.elements ?? []}
    />
    <BreakdownList
      title="Symbol Analysis"
      itemList={breakdownData?.symbols ?? []}
    />
    <BreakdownList
      title="Emotional Context"
      itemList={breakdownData?.context ?? []}
    />
    <BreakdownList
      title="Thematic Interpretation"
      itemList={breakdownData?.themes ?? []}
    />
    <BreakdownList
      title="Personal Relevance"
      itemList={breakdownData?.relevance ?? []}
    />
  </View>
);
