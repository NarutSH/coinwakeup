import React from "react";

const NotFound = () => {
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
