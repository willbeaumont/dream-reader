import {
  View,
  defaultDarkModeOverride,
  ThemeProvider,
  type Theme,
} from "@aws-amplify/ui-react";
import { TopNavigation } from "./components/top-navigation";
import { About } from "./pages/about";
import { Dream } from "./pages/dream";
import { History } from "./pages/history";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainContent } from "./components/main-content";

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

  return (
    <Router>
      <ThemeProvider theme={theme} colorMode="system">
        <View
          backgroundColor={"background.primary"}
          width={"100%"}
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
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/dream" element={<Dream />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </MainContent>
          </View>
        </View>
      </ThemeProvider>
    </Router>
  );
}

export default App;
