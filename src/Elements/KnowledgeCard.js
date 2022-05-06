import React from "react";

const KnowledgeCard = ({ item }) => {
  const { title, description, imgPath } = item;

  const styles = {
    image: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
    },
  };

  return (
    <div className="card m-auto" style={{ width: "400px" }}>
      <div className="card-body">
        <div>
          <img src={imgPath} alt="basic1" style={styles.image} />
        </div>
        <div className="py-2">
          <h2 className="text-truncate">{title}</h2>
          <p className="limit-line-3 ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCard;
