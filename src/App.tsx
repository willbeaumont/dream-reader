import {
  View,
  defaultDarkModeOverride,
  ThemeProvider,
  type Theme,
} from "@aws-amplify/ui-react";
import { TopNavigation } from "./components/top-navigation";
import { About } from "./components/about";
import { Dream } from "./components/dream";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainContent } from "./components/main-content";

function App() {
  const theme: Theme = {
    name: "dream-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <Router>
      <ThemeProvider theme={theme} colorMode="system">
        <View
          backgroundColor={"background.primary"}
          width={"100%"}
          minHeight={"100vh"}
        >
          <View
            maxWidth={"1200px"}
            margin={"0 auto"}
            overflow={"auto"}
            position={"relative"}
          >
            <TopNavigation />
            <MainContent>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/dream" element={<Dream />} />
              </Routes>
            </MainContent>
          </View>
        </View>
      </ThemeProvider>
    </Router>
  );
}

export default App;
