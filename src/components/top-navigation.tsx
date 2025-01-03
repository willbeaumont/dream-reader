import {
  View,
  Flex,
  Heading,
  Menu,
  useAuthenticator,
  MenuItem,
} from "@aws-amplify/ui-react";

import { useNavigate } from "react-router-dom";

export const TopNavigation = () => {
  const { route, signOut } = useAuthenticator();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <View
      as={"nav"}
      height={"60px"}
      position={"fixed"}
      maxWidth={"1200px"}
      width={"calc(100% - 1rem)"}
      style={{ zIndex: 100 }}
      backgroundColor={"background.primary"}
    >
      <Flex
        direction="row"
        height="100%"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Heading level={1}>Dream Reader</Heading>
        <Flex direction="column">
          <Menu size="large" menuAlign="end">
            <MenuItem onClick={() => navigate("/")}>About</MenuItem>
            <MenuItem onClick={() => navigate("/dream")}>Dream</MenuItem>
            {route === "authenticated" ? (
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            ) : (
              <MenuItem onClick={() => navigate("/dream")}>Sign In</MenuItem>
            )}
          </Menu>
        </Flex>
      </Flex>
    </View>
  );
};
