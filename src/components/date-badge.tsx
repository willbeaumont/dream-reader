import { Badge } from "@aws-amplify/ui-react";

export const DateBadge = ({
  dateString,
}: {
  dateString: string | null | undefined;
}) => (
  <Badge>
    {dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Date missing."}
  </Badge>
);
