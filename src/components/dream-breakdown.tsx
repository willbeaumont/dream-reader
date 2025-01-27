import { View } from "@aws-amplify/ui-react";
import { BreakdownList } from "./dream-breakdown-list";

type NullableString = string | null | undefined;

type Breakdown =
  | {
      title?: NullableString;
      elements?: NullableString[] | null;
      symbols?: NullableString[] | null;
      context?: NullableString[] | null;
      themes?: NullableString[] | null;
      relevance?: NullableString[] | null;
    }
  | null
  | undefined;

export const DreamBreakdown = ({
  breakdownData,
}: {
  breakdownData: Breakdown;
}) => {
  if (!breakdownData) return <View as="section">Breakdown Data Missing</View>;
  return (
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
};
