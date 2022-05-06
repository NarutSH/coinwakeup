import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";
import { convertCompactNumber, convertCurrency } from "../../Services/Func";

const RelatedCoin = () => {
  const [coinList, setCoinList] = useState([]);

  const styles = {
    change24h: (price) => {
      let colorText = "inherit";

      if (price < 0) {
        colorText = "red";
      } else if (price > 0) {
        colorText = "green";
      }

      return {
        color: colorText,
      };
    },
  };

  const fetchCoinsMarket = () => {
    coinApi
      .get("/coins/markets", { params: { vs_currency: "usd" } })
      .then((res) => {
        console.log(res);
        setCoinList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCoinsMarket();
  }, []);

  const displayTable = (
    <div>
      <div className="coin-table">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Coin</th>
              <th></th>
              <th>Price</th>
              <th>Chain</th>
              <th>1h</th>
              <th>24h</th>
              <th>24h Volume</th>
              <th>Mkt. Cap</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {coinList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td></td>
                  <td>
                    <img
                      src={item.image}
                      width="25px"
                      alt={item.symbol}
                      className="rounded-circle me-2"
                    />
                    {item.name}
                  </td>
                  <td>{item.symbol}</td>
                  <td>{convertCurrency(item.current_price)}</td>
                  <td></td>
                  <td></td>
                  <td style={styles.change24h(item.price_change_24h)}>
                    {convertCurrency(item.price_change_24h)}
                  </td>
                  <td>{convertCurrency(item.total_volume)}</td>
                  <td>{convertCompactNumber(item.market_cap)}</td>
                  <td></td>
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
      <h1 className="my-2">NFT Related Coin</h1>
      <div>{displayTable}</div>
    </div>
  );
};

export default RelatedCoin;
