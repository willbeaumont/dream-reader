import {
  View,
  Flex,
  Heading,
  Menu,
  Text,
  useAuthenticator,
  MenuItem,
  Divider,
} from "@aws-amplify/ui-react";
import { FiExternalLink } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

export const TopNavigation = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
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
            {user && (
              <MenuItem onClick={() => navigate("/capture")}>Dream</MenuItem>
            )}
            {user && (
              <MenuItem onClick={() => navigate("/history")}>History</MenuItem>
            )}
            <Divider />
            {user ? (
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            ) : (
              <MenuItem onClick={() => navigate("/capture")}>
                Sign Up/In
              </MenuItem>
            )}
            <Divider />
            <MenuItem
              onClick={() => window.open("https://sandiaweb.dev", "_blank")}
            >
              <Text paddingRight={4}>Sandia Web Dev</Text>
              <FiExternalLink />
            </MenuItem>
          </Menu>
        </Flex>
      </Flex>
    </View>
  );
};
