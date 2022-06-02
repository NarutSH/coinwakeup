import React, { useState, useEffect } from "react";
import { coinApi } from "../../api/coinApi";
import ExchangeCard from "../../Elements/ExchangeCard";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);

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

  const fetchExchanges = () => {
    coinApi
      .get("/exchanges")
      .then((res) => {
        console.log(res.data);
        setExchanges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const displayExchanges = (
    <div className="row row-cols-1 row-cols-md-auto mx-auto g-4">
      {exchanges?.map((item) => {
        return (
          <div className="col ">
            <ExchangeCard exchange={item} />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="my-4 container ">
      <div></div>
      <div>{displayExchanges}</div>
    </div>
  );
};

export default Exchange;
