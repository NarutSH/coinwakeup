import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useKeyPress from "../Hooks/useKeyPress";

const Chart = ({ quoteSpark, setRangeChart, quoteSummary }) => {
  const [chartData, setChartData] = useState("");
  const controlPressed = useKeyPress("Control");

  const convertDate = (value) => {
    const result = new Date(value * 1000);

    let date = result.getDate();
    let month = result.getMonth() + 1;
    let year = result.getFullYear();

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return `${date}/${month}/${year}`;
  };

  const convertNumberRound = (value) => {
    return Math.round(value * 100) / 100;
  };

  const getStandardDeviation = (dataArray) => {
    const n = dataArray?.length;
    const mean = dataArray?.reduce((a, b) => a + b) / n;
    return +Math.sqrt(
      dataArray?.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );
  };

  const getPrice = quoteSpark?.close?.map((item, index) => {
    return {
      price: item,
      year: new Date(quoteSpark.timestamp[index] * 1000).getFullYear(),
    };
  });

  const getEPS =
    quoteSummary?.incomeStatementHistory?.incomeStatementHistory?.map(
      (item, index) => {
        return {
          eps:
            item.netIncome.raw /
            quoteSummary?.balanceSheetHistory.balanceSheetStatements[index]
              .commonStock.raw,
          year: new Date(item.endDate.raw * 1000).getFullYear(),
        };
      }
    );

  const getPE = getPrice?.map((item, index) => {
    const resEps = getEPS?.find((data) => data.year === item.year);
    const resPe = resEps ? +item.price / +resEps.eps : null;

    return {
      ...item,
      eps: resEps ? resEps.eps : null,
      pe: resPe ? convertNumberRound(resPe) : resPe,
    };
  });

  const purePE = getPE?.filter((item) => item.pe);

  const getSD = getPE?.map((item) => {
    const n = purePE?.length;
    const meanPE =
      purePE?.map((item) => item.pe).reduce((a, b) => +a + +b) / +n;

    const pe = purePE.map((item) => item.pe);

    return {
      ...item,
      sd: convertNumberRound(meanPE),
      sd1p: convertNumberRound(meanPE + getStandardDeviation(pe)),
      sd2p: convertNumberRound(meanPE + getStandardDeviation(pe) * 2),
      sd1m: convertNumberRound(meanPE - getStandardDeviation(pe)),
      sd2m: convertNumberRound(meanPE - getStandardDeviation(pe) * 2),
    };
  });

  const chartGenerate = () => {
    const labels = quoteSpark?.timestamp?.map((item) => convertDate(item));

    const datas = {
      labels: labels,
      datasets: [
        {
          label: quoteSpark?.symbol?.replace(".BK", ""),
          backgroundColor: "rgba(21, 101, 192, 1)",
          borderColor: "rgba(21, 101, 192, 1)",
          pointRadius: "0",
          borderWidth: 2,
          data: getSD.map((item) => item.pe),
        },
        {
          label: "+2SD",

          borderColor: "gray",
          borderDash: [10, 5],
          pointRadius: "0",
          borderWidth: 2,
          data: getSD ? getSD.map((item) => item.sd2p) : "",
        },

        {
          label: "+1SD",

          borderColor: "gray",
          borderDash: [10, 5],
          pointRadius: "0",
          borderWidth: 2,
          data: getSD ? getSD.map((item) => item.sd1p) : "",
        },

        {
          label: "Average",

          borderColor: "gray",
          borderDash: [10, 5],
          pointRadius: "0",
          borderWidth: 2,
          data: getSD ? getSD.map((item) => item.sd) : "",
        },

        {
          label: "-1SD",

          borderColor: "gray",
          borderDash: [10, 5],
          pointRadius: "0",
          borderWidth: 2,
          data: getSD ? getSD.map((item) => item.sd1m) : "",
        },
        {
          label: "-2SD",

          borderColor: "gray",
          borderDash: [10, 5],
          pointRadius: "0",
          borderWidth: 2,
          data: getSD ? getSD.map((item) => item.sd2m) : "",
        },
      ],
    };

    setChartData(datas);
  };

  let options = {
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 5,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },

    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            // modifierKey: "ctrl",
          },
          pinch: {
            enabled: true,
          },
          mode: controlPressed ? "xy" : "x",
        },

        pan: {
          enabled: true,
          mode: "xy",
          speed: 1,
          threshold: 1,
        },
      },
    },

    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  useEffect(() => {
    if (quoteSpark) chartGenerate();
  }, [quoteSpark]);

  const displayRange = (
    <div className="d-flex justify-content-around align-items-center my-1">
      <div>
        <input
          onChange={(ev) => setRangeChart(ev.target.value)}
          name="range-chart"
          type="radio"
          className="btn-check"
          id="range-1y"
          value="1y"
        />
        <label
          className="btn btn-outline-primary btn-sm px-5"
          htmlFor="range-1y"
        >
          1Y
        </label>
      </div>
      <div>
        <input
          onChange={(ev) => setRangeChart(ev.target.value)}
          name="range-chart"
          type="radio"
          className="btn-check"
          id="range-3y"
          value="3y"
          defaultChecked
        />
        <label
          className="btn btn-outline-primary btn-sm px-5"
          htmlFor="range-3y"
        >
          3Y
        </label>
      </div>
      <div>
        <input
          onChange={(ev) => setRangeChart(ev.target.value)}
          name="range-chart"
          type="radio"
          className="btn-check"
          id="range-5y"
          value="5y"
          defaultChecked
        />
        <label
          className="btn btn-outline-primary btn-sm px-5"
          htmlFor="range-5y"
        >
          5Y
        </label>
      </div>
      <div>
        <input
          onChange={(ev) => setRangeChart(ev.target.value)}
          name="range-chart"
          type="radio"
          className="btn-check"
          id="range-max"
          value="max"
        />
        <label
          className="btn btn-outline-primary btn-sm px-5"
          htmlFor="range-max"
        >
          Max
        </label>
      </div>
    </div>
  );

  return (
    <div>
      {quoteSpark ? (
        <>
          {displayRange}
          <div id="stock-chart" className="shadow my-1 px-4 py-2">
            <Line data={chartData} options={options} width={30} height={10} />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Chart;
