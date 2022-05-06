import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";
import { convertCurrency } from "../../Services/Func";
import scrapeIt from "scrape-it";
import { log } from "react-modal/lib/helpers/ariaAppHider";

const RecentlyAdded = () => {
  const [coinList, setCoinList] = useState([]);
  const [recentlyAddedCoin, setRecentlyAddedCoin] = useState([]);

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
        setCoinList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCoinById = async (id) => {
    const res = await coinApi.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    return res.data;
  };

  const getScrape = () => {
    scrapeIt("https://www.coingecko.com/en/coins/recently_added", {
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

  useEffect(() => {
    fetchCoinById("dogger").then((res) => {
      console.log({ res });
    });
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
              <th>Last Added</th>
            </tr>
          </thead>
          <tbody>
            {recentlyAddedCoin?.map((item, index) => {
              return (
                <tr key={index}>
                  <td></td>
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
                  <td>{item.price}</td>
                  <td>{item.price}</td>
                  <td>{item.change1h}</td>
                  <td>{item.change24h}</td>
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

{
  /* <tr key={index}>
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
<td>1 hour</td>
<td></td>
</tr> */
}
