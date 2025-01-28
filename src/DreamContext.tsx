import { createContext } from "react";

export type NullableString = string | null | undefined;

export type Breakdown =
  | {
      title?: NullableString;
      elements?: NullableString[] | null | undefined;
      symbols?: NullableString[] | null | undefined;
      context?: NullableString[] | null | undefined;
      themes?: NullableString[] | null | undefined;
      relevance?: NullableString[] | null | undefined;
    }
  | null
  | undefined;

export type Dream = {
  id?: NullableString;
  content?: NullableString;
  breakdown?: Breakdown;
  interpretation?: NullableString[] | null | undefined;
  createdAt?: NullableString;
};

export type DreamContextType = {
  dream: Dream;
  setDream: React.Dispatch<React.SetStateAction<Dream>>;
};

const dream: Dream = {
  id: undefined,
  content: undefined,
  breakdown: undefined,
  interpretation: undefined,
};

export const DreamContext = createContext<DreamContextType>({
  dream,
  setDream: () => {},
});
