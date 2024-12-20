import { useEffect, useState } from "react";
import { useAuthenticator, Loader, Text, View } from "@aws-amplify/ui-react";
import { useAIGeneration } from "./client";
import ExpandableArticle from "./ExpandableArticle";

function App() {
  const [dream, setDream] = useState("");
  const [interpretation, generateInterpretation] = useAIGeneration(
    "generateInterpretation"
  );
  const [story, generateStory] = useAIGeneration("generateStory");

  const { signOut } = useAuthenticator();

  useEffect(() => {
    if (interpretation.data) {
      generateStory({
        dreamInterpretation: JSON.stringify(interpretation.data),
      });
    }
  }, [interpretation.data]);

  async function interpretDream() {
    generateInterpretation({ dream });
  }

  return (
    <main>
      <header>
        <h1>Dream Reader</h1>
      </header>
      <section>
        <h2>Enter your dream:</h2>
        <textarea value={dream} onChange={(e) => setDream(e.target.value)} />
      </section>
      <section className="button-section">
        <button onClick={interpretDream}>Interpret Dream</button>
        <button onClick={signOut}>Sign out</button>
      </section>
      {(interpretation.isLoading || story.isLoading) && (
        <section>
          <Loader variation="linear" />
        </section>
      )}

      {story.data && (
        <article>
          <h2>Dream insights:</h2>
          <section>
            <p>{story.data?.insight}</p>
          </section>
        </article>
      )}
      {interpretation.data && (
        <ExpandableArticle>
          <h2>Interpretation:</h2>
          <section>
            <h3>Dream Breakdown:</h3>
            <ul>
              {interpretation.data?.dreamBreakdown?.map((item, itemIndex) => (
                <li key={`dreamBreakdown-${itemIndex}`}>{item}</li>
              ))}
            </ul>
            <h3>Symbol Analysis:</h3>
            <ul>
              {interpretation.data?.symbolAnalysis?.map((item, itemIndex) => (
                <li key={`dreamInterpretation-${itemIndex}`}>{item}</li>
              ))}
            </ul>
            <h3>Emotional Context:</h3>
            <ul>
              {interpretation.data?.emotionalContext?.map((item, itemIndex) => (
                <li key={`dreamInterpretation-${itemIndex}`}>{item}</li>
              ))}
            </ul>
            <h3>Thematic Interpretation:</h3>
            <ul>
              {interpretation.data?.thematicInterpretation?.map(
                (item, itemIndex) => (
                  <li key={`dreamSummary-${itemIndex}`}>{item}</li>
                )
              )}
            </ul>
            <h3>Personal Relevance:</h3>
            <ul>
              {interpretation.data?.personalRelevance?.map(
                (item, itemIndex) => (
                  <li key={`dreamSummary-${itemIndex}`}>{item}</li>
                )
              )}
            </ul>
          </section>
        </ExpandableArticle>
      )}
    </main>
  );
}

export default App;
