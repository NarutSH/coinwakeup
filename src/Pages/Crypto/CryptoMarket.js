import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";
import WeeklyChart from "../../Elements/WeeklyChart";
import { convertCurrency } from "../../Services/Func";

const CryptoMarket = () => {
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
    console.log("fetchCoinsMarket");
    coinApi
      .get("/coins/markets", {
        params: {
          vs_currency: "usd",
          sparkline: "true",
        },
      })
      .then((res) => {
        console.log(res.data);
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
        <table className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
              <th>Volume(24h)</th>
              <th>Weekly chart</th>
            </tr>
          </thead>
          <tbody>
            {coinList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.market_cap_rank}</td>
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
                  <td style={styles.change24h(item.price_change_24h)}>
                    {convertCurrency(item.price_change_24h)}
                  </td>
                  <td>{convertCurrency(item.market_cap)}</td>
                  <td>{convertCurrency(item.total_volume)}</td>
                  <td>
                    <WeeklyChart data={item.sparkline_in_7d.price} />
                  </td>
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
      <div className="h1 my-2">Cryptocurrency Prices by Market Cap</div>

      <div>{displayTable}</div>
    </div>
  );
};

export default CryptoMarket;
