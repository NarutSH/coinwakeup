import React from "react";
import { BsHeart } from "react-icons/bs";
import { convertCurrency } from "../Services/Func";

const ExchangeCard = ({ exchange }) => {
  const { name, image, id, trade_volume_24h_btc } = exchange;
  return (
    <div className="card m-auto shadow" style={{ width: "400px" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <img src={image} alt={id} className="w-100" />
          </div>
          <div className="col-9">
            <div className="d-flex justify-content-between align-items-center">
              <div>{name}</div>
              <div>
                <BsHeart />
              </div>
            </div>
            <div className="row row-cols-3">
              <div className="col">
                <RatingData
                  label="24H VOLUME"
                  value={convertCurrency(trade_volume_24h_btc)}
                />
              </div>
              <div className="col">
                <RatingData label="VOL SHARE" value="-" />
              </div>
              <div className="col">
                <RatingData label="MARKETS" value="-" />
              </div>
              <div className="col">
                <RatingData label="LIQUIDITY" value="-" />
              </div>
              <div className="col">
                <RatingData label="COINS" value="-" />
              </div>
              <div className="col">
                <RatingData label="PAIRS" value="-" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RatingData = ({ label, value }) => {
  return (
    <div>
      <div style={{ fontSize: "10px" }} className="text-muted">
        {label}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default ExchangeCard;
