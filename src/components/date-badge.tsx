import { Badge } from "@aws-amplify/ui-react";

export const DateBadge = ({ dateString }: { dateString: string }) => (
  <Badge>
    {new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}
  </Badge>
);
