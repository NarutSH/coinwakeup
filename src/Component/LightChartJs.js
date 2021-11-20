import { createChart, LineStyle } from "lightweight-charts";

import React, { useEffect, useState } from "react";

const LightChartJs = () => {
  const lightChartContainer = document.getElementById("light-chart");

  useEffect(() => {
    if (lightChartContainer) {
      const chart = createChart(lightChartContainer, {
        width: 1200,
        height: 300,
        layout: {
          backgroundColor: "#ffffff",
          textColor: "rgba(33, 56, 77, 1)",
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.7)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.7)",
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const lineSeries = chart.addLineSeries();

      lineSeries.setData([
        { time: 1556877600, value: 230.12 },
        { time: 1556881200, value: 230.24 },
        { time: 1556884800, value: 230.63 },
        { time: 1556888400, value: 231.35 },
        { time: 1556892000, value: 232.24 },
        { time: 1556895600, value: 232.52 },
        { time: 1557126000, value: 228.71 },
        { time: 1557129600, value: 228.88 },
        { time: 1557133200, value: 228.18 },
        { time: 1557136800, value: 228.89 },
        { time: 1557140400, value: 229.05 },
        { time: 1557144000, value: 229.46 },
        { time: 1557147600, value: 230.98 },
        { time: 1557151200, value: 231.71 },
        { time: 1557154800, value: 232.8 },
      ]);

      const minPriceLine = {
        price: 200,
        color: "#be1238",
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        title: "minimum price",
      };
      const avgPriceLine = {
        price: 230,
        color: "#be1238",
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        title: "average price",
      };
      const maxPriceLine = {
        price: 250,
        color: "#be1238",
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        title: "maximum price",
      };

      lineSeries.createPriceLine(minPriceLine);
      lineSeries.createPriceLine(avgPriceLine);
      lineSeries.createPriceLine(maxPriceLine);
    }
  }, [lightChartContainer]);

  return <div id="light-chart"></div>;
};

export default LightChartJs;
