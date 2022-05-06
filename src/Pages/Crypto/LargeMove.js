import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";
import { convertCurrency } from "../../Services/Func";

const LargeMove = () => {
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
              <th>24h</th>
            </tr>
          </thead>
          <tbody>
            {coinList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td></td>
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
                  <td style={styles.change24h(item.price_change_24h)}>
                    {convertCurrency(item.price_change_24h)}
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
            {coinList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td></td>
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
                  <td style={styles.change24h(item.price_change_24h)}>
                    $ {item.price_change_24h}
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
    <div className="container-fluid">
      <h1 className=" my-4">Cryptocurrency Movers</h1>
      <div className="row row-cols-1 row-cols-lg-2 my-4">
        <div className="col ">{displayWinners}</div>
        <div className="col ">{displayLosers}</div>
      </div>
    </div>
  );
};

export default LargeMove;
