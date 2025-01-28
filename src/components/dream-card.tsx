import { Card, Link, useBreakpointValue, View } from "@aws-amplify/ui-react";

import { DreamInterpretation } from "./dream-interpretation";
import { type Dream, DreamContext } from "../DreamContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DreamCard = ({ data }: { data: Dream }) => {
  const navigate = useNavigate();
  const [goToPage, setGoToPage] = useState(false);

  useEffect(() => {
    if (goToPage) {
      navigate(`/explore?id=${data.id}`);
      setGoToPage(false);
    }
  }, [goToPage, data.id, navigate]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    setDream({ ...data });
    setGoToPage(true);
  };

  const { setDream } = useContext(DreamContext);
  const width = useBreakpointValue({
    base: "100%",
    medium: "50%",
    large: "33.3%",
  }) as string;
  return (
    <Link
      width={width}
      onClick={handleClick}
      href={`/explore?id=${data.id}`}
      isExternal={false}
    >
      <Card
        height={485}
        borderRadius={"medium"}
        variation="outlined"
        overflow={"scroll"}
      >
        <View padding="xs">
          <DreamInterpretation headingLevel={3} data={data} />
        </View>
      </Card>
    </Link>
  );
};
