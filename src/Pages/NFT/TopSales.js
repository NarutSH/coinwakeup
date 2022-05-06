import React from "react";

const TopSales = () => {
  const displayTable = (
    <div>
      <div className="coin-table">
        <table className="table">
          <thead>
            <tr>
              <th>MARKET</th>
              <th>AVG. PRICE</th>
              <th>TRADERS</th>
              <th>VOLUME</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  return (
    <div className="container">
      <h1 className="my-2">MARKETPLACES</h1>
      <div>{displayTable}</div>
    </div>
  );
};

export default TopSales;
