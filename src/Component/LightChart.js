import React, { useState, useEffect } from "react";
import Chart from "kaktana-react-lightweight-charts";
import { createChart, LineStyle } from "lightweight-charts";

const LightChart = ({ quoteSpark, setRangeChart, quoteSummary }) => {
  const [chartData, setChartData] = useState([]);

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

    return `${year}-${month}-${date}`;
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
      date: convertDate(quoteSpark.timestamp[index]),
      year: new Date(quoteSpark.timestamp[index] * 1000).getFullYear(),
    };
  });

  const getEPS = quoteSummary?.incomeStatementHistory?.incomeStatementHistory
    ?.map((item, index) => {
      return {
        eps:
          item.netIncome.raw /
          quoteSummary?.defaultKeyStatistics.sharesOutstanding.raw,
        year: new Date(item.endDate.raw * 1000).getFullYear(),
      };
    })
    .concat({
      eps: quoteSummary?.defaultKeyStatistics.trailingEps.raw,
      year: new Date().getFullYear(),
    })
    .sort((a, b) => a.year - b.year);

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
      purePE?.map((item) => item.pe)?.reduce((a, b) => +a + +b) / +n;

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

  const generateChart = () => {
    const datas = getSD.map((item) => {
      return {
        time: item.date,
        value: item.pe,
      };
    });
    setChartData([
      {
        legend: "P/E",
        data: datas,
        priceLines: [
          {
            title: "+2SD",
            price: getSD[0].sd2p,
            color: "gray",
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
            axisLabelVisible: true,
          },
          {
            price: getSD[0].sd1p,
            color: "gray",
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
            axisLabelVisible: true,
            title: "+1SD",
          },
          {
            price: getSD[0].sd,
            color: "gray",
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
            axisLabelVisible: true,
            title: "Average",
          },
          {
            price: getSD[0].sd1m,
            color: "gray",
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
            axisLabelVisible: true,
            title: "-1SD",
          },
          {
            price: getSD[0].sd2m,
            color: "gray",
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
            axisLabelVisible: true,
            title: "-2SD",
          },
        ],
      },
    ]);
  };

  const options = {
    alignLabels: true,
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: "#fff000",
      visible: true,
      timeVisible: true,
      secondsVisible: false,
    },
    priceScale: {
      autoScale: true,
    },
  };

  useEffect(() => {
    generateChart();
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
            <Chart
              options={options}
              lineSeries={chartData}
              autoWidth
              height={300}
              from={`${new Date().getFullYear() - 4}-01-01`}
              to={convertDate(new Date())}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default LightChart;
