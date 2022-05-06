import React from "react";
import KnowledgeCard from "./KnowledgeCard";

const KnowledgeBlog = ({ title, description, objectData }) => {
  return (
    <div className="my-5">
      <div className="text-center my-3">
        <h1 className="fw-bold">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="row g-4">
        {objectData?.map((item) => {
          return (
            <div className="col">
              <KnowledgeCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeBlog;
