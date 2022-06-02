import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";
import { convertCurrency, convertToOneDigit } from "../../Services/Func";
import scrapeIt from "scrape-it";

const RecentlyAdded = () => {
  const [coinList, setCoinList] = useState([]);
  const [recentlyAddedCoin, setRecentlyAddedCoin] = useState([]);

  const styles = {
    setColorChange: (price) => {
      let colorText = "inherit";

      if (+price < 0) {
        colorText = "red";
      } else if (+price > 0) {
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
        setCoinList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getScrape = () => {
    scrapeIt("https://www.coingecko.com/en/new-cryptocurrencies", {
      posts: {
        listItem: "tr",
        data: {
          title: "a.tw-items-center",
          id: "span.tw-hidden",
          url: {
            selector: "a",
            attr: "href",
          },
          dataAddress: {
            selector: "i.far.fa-far.fa-copy",
            attr: "data-address",
          },
          change1h: {
            selector: "td.td-change1h",
            attr: "data-sort",
          },
          change24h: {
            selector: "td.td-change24h",
            attr: "data-sort",
          },
          volume24: "td.td-liquidity_score>span",

          chainAddress: {
            selector: ".dropdown-menu >div > i",
            attr: "data-address",
          },

          chaninImg: {
            selector: ".dropdown-menu >div>div > img",
            attr: "src",
          },

          chaninName: {
            selector: ".dropdown-menu > div >div > div > span",
            how: "html",
          },

          price: "td.td-price.price.text-right.pl-0>span.no-wrap",
          image: {
            selector: "img",
            attr: "src",
          },
          lastAdded: "td.trade",
        },
      },
    })
      .then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`);
        console.log(data.posts);
        const list = data.posts.filter((item) => item.id);
        setRecentlyAddedCoin(list);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchCoinsMarket();
  }, []);

  useEffect(() => {
    getScrape();
  }, []);

  const displayTable = (
    <div>
      <div className="coin-table">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Coin</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Chain</th>
              <th>1h</th>
              <th>24h</th>
              <th>24h Volume</th>
              <th>Last Added</th>
            </tr>
          </thead>
          <tbody>
            {recentlyAddedCoin?.map((item, index) => {
              const getPrice = item.price
                .replaceAll("$", "")
                .replaceAll(",", "");

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      width="25px"
                      alt={item.id}
                      className="rounded-circle me-2"
                    />
                    {item.title}
                  </td>
                  <td>{item.id}</td>
                  <td>{convertCurrency(getPrice)}</td>
                  <td>
                    <img
                      src={item.chaninImg}
                      width="25px"
                      alt={item.chaninName}
                      className="rounded-circle me-2"
                    />
                    {item.chaninName}
                  </td>
                  <td style={styles.setColorChange(item.change1h)}>
                    {convertToOneDigit(item.change1h)}%
                  </td>
                  <td style={styles.setColorChange(item.change24h)}>
                    {convertToOneDigit(item.change24h)}%
                  </td>
                  <td>{item.volume24}</td>
                  <td>{item.lastAdded}</td>
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
      <h1 className="my-2">Recently Added Coin</h1>
      <div>{displayTable}</div>
    </div>
  );
};

export default RecentlyAdded;
