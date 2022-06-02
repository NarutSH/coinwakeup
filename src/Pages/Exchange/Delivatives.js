import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";

const Delivatives = () => {
  const [coinList, setCoinList] = useState([]);

  const fetchDericatives = () => {
    coinApi
      .get("/derivatives/exchanges?order=open_interest_btc_desc")
      .then((res) => {
        setCoinList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDericatives();
  }, []);

  const displayTable = (
    <div>
      <div className="coin-table">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Volume 24h</th>
              <th>Perpetuals</th>
              <th>Futures</th>
              <th>Open Interest</th>
            </tr>
          </thead>
          <tbody>
            {coinList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      width="25px"
                      alt={item.name}
                      className="rounded-circle me-2"
                    />
                    {item.name}
                  </td>
                  <td>{item.trade_volume_24h_btc}</td>
                  <td>{item.number_of_perpetual_pairs}</td>
                  <td>{item.number_of_futures_pairs}</td>
                  <td>{item.open_interest_btc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="my-2">Top Derivative Exchanges </h1>
      <div>{displayTable}</div>
    </div>
  );
};

export default Delivatives;
