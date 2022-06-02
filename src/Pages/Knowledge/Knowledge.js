import React from "react";

import { cryptoBasics, tipsTutorials } from "../../Data/Blog";
import KnowledgeBlog from "../../Elements/KnowledgeBlog";

const Knowledge = () => {
  return (
    <div className="container">
      <KnowledgeBlog
        title="Crypto Basics"
        description="New to Crypto ? Not for long -- start with these guide and explain"
        objectData={cryptoBasics}
      />
      <KnowledgeBlog
        title="Tips and Tutorials"
        description="Get pratical, step-by-step answers to all things crypto"
        objectData={tipsTutorials}
      />
    </div>
  );
};

export default Knowledge;
