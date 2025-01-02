import { View } from "@aws-amplify/ui-react";
import { TopNavigation } from "./components/top-navigation";
import { About } from "./components/about";
import { Dream } from "./components/dream";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainContent } from "./components/main-content";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
