// ExpandableArticle.jsx
import { ReactNode, useState } from "react";

const ExpandableArticle = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-container">
      <div className={`interpretation-article ${isExpanded ? "expanded" : ""}`}>
        {children}
        {!isExpanded && <div className="fade-overlay" />}
      </div>
      <button className="expand-button" onClick={toggleExpand}>
        <span>{isExpanded ? "Read Less" : "Read More"}</span>
        <svg
          className={`expand-icon ${isExpanded ? "expanded" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path
            fill="currentColor"
            d="M6 8.825L11.4 3.425L12 4.025L6 10.025L0 4.025L0.6 3.425L6 8.825Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ExpandableArticle;
