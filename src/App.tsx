import {
  View,
  defaultDarkModeOverride,
  ThemeProvider,
  type Theme,
} from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { TopNavigation } from "./components/top-navigation";
import { MainContent } from "./components/main-content";
import { About } from "./pages/about";
import { EditDream } from "./pages/capture";
import { History } from "./pages/history";
import { ExploreDream } from "./pages/explore";
import { DreamContext, type Dream } from "./DreamContext";

function App() {
  const theme: Theme = {
    name: "dream-theme",
    overrides: [defaultDarkModeOverride],
    tokens: {
      components: {
        heading: {
          1: {
            fontSize: "2.6rem",
            fontWeight: "400",
          },
          2: {
            fontSize: "{fontSizes.xxl}",
            fontWeight: "300",
          },
          3: {
            fontSize: "{fontSizes.xl}",
            fontWeight: "200",
          },
        },
      },
    },
  };

  const [dream, setDream] = useState<Dream>({
    id: undefined,
    content: undefined,
    breakdown: undefined,
    interpretation: undefined,
  });

  return (
    <Router>
      <ThemeProvider theme={theme} colorMode="system">
        <View
          backgroundColor={"background.primary"}
          width={"100%"}
          color={"font.primary"}
          minHeight={"100vh"}
          padding={"0 .5rem"}
        >
          <View
            maxWidth={"1200px"}
            margin={"0 auto"}
            overflow={"auto"}
            position={"relative"}
          >
            <TopNavigation />
            <MainContent>
              <DreamContext.Provider value={{ dream, setDream }}>
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/capture" element={<EditDream />} />
                  <Route path="/explore" element={<ExploreDream />} />
                  <Route path="/history" element={<History />} />
                </Routes>
              </DreamContext.Provider>
            </MainContent>
          </View>
        </View>
      </ThemeProvider>
    </Router>
  );
}

export default App;
