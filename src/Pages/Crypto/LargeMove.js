import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";
import { convertCurrency, convertToOneDigit } from "../../Services/Func";

const LargeMove = () => {
  const [coinList, setCoinList] = useState([]);
  const [topGainer, setTopGainer] = useState([]);
  const [topLoser, setTopLoser] = useState([]);

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
        console.log(res.data);
        const list = [...res.data];
        const listGainer = [...list].sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        const listLoser = [...list].sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        );

        setCoinList(list);
        setTopGainer(listGainer);
        setTopLoser(listLoser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCoinsMarket();
  }, []);

  const displayWinners = (
    <div>
      <h2>Biggest Winners</h2>
      <div className="coin-table">
        <table className="table ">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Volume</th>
              <th>24h Change %</th>
            </tr>
          </thead>
          <tbody>
            {topGainer?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="d-flex align-items-center">
                    <span>
                      <img
                        src={item.image}
                        width="25px"
                        alt={item.symbol}
                        className="rounded-circle me-2"
                      />
                    </span>
                    <span>
                      <div>{item.symbol}</div>
                      <small>{item.name}</small>
                    </span>
                  </td>

                  <td>{convertCurrency(item.current_price)}</td>
                  <td>{item.total_volume}</td>
                  <td
                    style={styles.change24h(item.price_change_percentage_24h)}
                  >
                    {convertToOneDigit(item.price_change_percentage_24h)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const displayLosers = (
    <div>
      <h2>Biggest Losers</h2>
      <div className="coin-table">
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Volume</th>
              <th>24h</th>
            </tr>
          </thead>
          <tbody>
            {topLoser?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="d-flex align-items-center">
                    <span>
                      <img
                        src={item.image}
                        width="25px"
                        alt={item.symbol}
                        className="rounded-circle me-2"
                      />
                    </span>
                    <span>
                      <div>{item.symbol}</div>
                      <small>{item.name}</small>
                    </span>
                  </td>

                  <td>{convertCurrency(item.current_price)}</td>
                  <td>{item.total_volume}</td>
                  <td
                    style={styles.change24h(item.price_change_percentage_24h)}
                  >
                    {convertToOneDigit(item.price_change_percentage_24h)}%
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
      <h1 className=" my-4">Cryptocurrency Movers</h1>
      <div className="row row-cols-1 row-cols-lg-2 my-4">
        <div className="col ">{displayWinners}</div>
        <div className="col ">{displayLosers}</div>
      </div>
    </div>
  );
};

export default LargeMove;
