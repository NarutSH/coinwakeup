import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import _ from "lodash";

const WeeklyChart = ({ data }) => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    let setColor = "gray";

    // if (+data[0] < +data[data.length - 1]) {
    //   setColor = "red";
    // } else if (+data[0] >= +data[data.length - 1]) {
    //   setColor = "green";
    // }

    const getLabels = _.range(1, 169, 1);

    const genChart = {
      labels: getLabels,
      datasets: [
        {
          label: "",
          data: data,
          borderColor: +data[0] < +data[167] ? "green" : "red",
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    };
    setChartData(genChart);
  }, [data]);

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    // aspectRatio: 1,
    maintainAspectRatio: false,
  };

  return (
    <div className="weekly-chart-container">
      {chartData ? <Line data={chartData} options={chartOptions} /> : ""}
    </div>
  );
};

export default WeeklyChart;
