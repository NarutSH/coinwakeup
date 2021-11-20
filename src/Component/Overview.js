import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Overview = ({ quoteSummary, fairValue }) => {
  const styles = {
    textUpside: {
      color: "rgba(21, 101, 192, 1)",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "10px",
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "end",
    },
    textPrice: {
      color: "rgba(21, 101, 192, 1)",
      fontSize: "20px",
      fontWeight: "600",
      marginInline: "10px",
    },
    textDesc: {
      fontSize: "14px",
      color: "rgba(97, 97, 97, 1)",
      fontWeight: "400",
    },
  };

  const displayOverview = (
    <>
      <div className="row">
        <div className="col-6">
          <div className="text-primary">
            <h4>
              {quoteSummary
                ? quoteSummary?.quoteType.symbol.replace(".BK", "")
                : "-"}
            </h4>
          </div>
          <div>{quoteSummary ? quoteSummary?.quoteType.longName : "-"}</div>
        </div>
        <div className="col-3 text-center">
          <div className="d-flex justify-content-center align-items-center">
            <div style={styles.textPrice}>
              {quoteSummary
                ? quoteSummary?.financialData.currentPrice.fmt
                : "-"}
            </div>
            <span className="align-bottom ">บาท</span>
          </div>
          <div style={styles.textDesc}>ราคาปัจจุบัน</div>
        </div>
        <div className="col-3 text-center">
          <div className="d-flex justify-content-center align-items-center">
            {fairValue ? (
              <>
                <div style={styles.textPrice}>{fairValue.toFixed(2)}</div>
                <div style={styles.textUpside}>
                  (
                  {(
                    (fairValue / quoteSummary?.financialData.currentPrice.raw -
                      1) *
                    100
                  ).toFixed(2)}
                  %){" "}
                </div>
                <span>บาท</span>
                <div className="ms-2">
                  {fairValue / quoteSummary?.financialData.currentPrice.raw -
                    1 >
                  0 ? (
                    <FaChevronUp color="green" />
                  ) : (
                    <FaChevronDown color="red" />
                  )}
                </div>
              </>
            ) : (
              "-"
            )}
          </div>
          <div style={styles.textDesc}>ราคาเป้าหมาย</div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      {quoteSummary ? <div className=" px-4 py-2">{displayOverview}</div> : ""}
    </div>
  );
};

export default Overview;
