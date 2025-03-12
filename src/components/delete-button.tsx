import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";
import { Button, Heading, Text, View } from "@aws-amplify/ui-react";

import { type Dream, DreamContext } from "../DreamContext";
import styles from "./delete-button.module.css";

const client = generateClient<Schema>();

export const DeleteButton = ({ data }: { data: Dream }) => {
  const [canDelete, setCanDelete] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { setDream } = useContext(DreamContext);

  const navigate = useNavigate();

  useEffect(() => {
    const deleteDream = async () => {
      if (!data.id) return;

      const { data: deletedDream, errors } = await client.models.Dream.delete({
        id: data.id,
      });

      if (errors) {
        console.error("Error deleting dream:", errors);
      } else {
        console.log("Dream deleted successfully:", deletedDream);
      }
    };

    if (canDelete) {
      deleteDream();
      setDream({
        id: undefined,
        content: undefined,
        breakdown: undefined,
        interpretation: undefined,
        createdAt: undefined,
      });
      setCanDelete(false);
      setShowWarning(false);
      navigate("/history");
    }
  }, [canDelete]);

  const DeleteWarning = () => {
    return (
      <View className={styles.modalOverlay}>
        <View className={styles.modalContent}>
          <Heading level={4} marginBottom={10}>
            Are you sure you want to delete the{" "}
            <i>{data.breakdown?.title || "this"} dream</i>?
          </Heading>
          <Text>This action cannot be undone.</Text>
          <View className={styles.buttonContainer}>
            <Button variation="destructive" onClick={() => setCanDelete(true)}>
              Delete
            </Button>
            <Button onClick={() => setShowWarning(false)}>Cancel</Button>
          </View>
        </View>
      </View>
    );
  };

  if (showWarning) return DeleteWarning();

  return (
    <Button variation="destructive" onClick={() => setShowWarning(true)}>
      Delete
    </Button>
  );
};
