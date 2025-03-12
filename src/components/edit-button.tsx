import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@aws-amplify/ui-react";

import { type Dream, DreamContext } from "../DreamContext";

export const EditButton = ({ data }: { data: Dream }) => {
  const { setDream } = useContext(DreamContext);

  const navigate = useNavigate();

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setDream({ ...data });
    navigate(`/explore?id=${data.id}`);
  };

  return <Button onClick={handleOpen}>Open</Button>;
};
