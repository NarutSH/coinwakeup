import React, { useState, useEffect } from "react";
import { yahooFinApi } from "./API/yahooFinApi";
import Chart from "./Component/Chart";
import Navbar from "./Component/Navbar";
import Overview from "./Component/Overview";
import Table from "./Component/Table";
import { AiOutlineLineChart } from "react-icons/ai";
import SpinnerTool from "./tools/Spinner/SpinnerTool";
import LightChart from "./Component/LightChart";
import News from "./Component/News";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quoteSummary, setQuoteSummary] = useState("");
  const [quoteSpark, setQuoteSpark] = useState("");
  const [initQuoteSpark, setInitQuoteSpark] = useState("");
  const [rangeChart, setRangeChart] = useState("3y");
  const [fairValue, setFairValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    exampleImg: {
      paddingTop: "20px",
      filter: "blur(2px)",
      maxHeight: "95vh",
    },
  };

  const fetchChartData = () => {
    setIsLoading(true);
    yahooFinApi
      .get(
        `/v8/finance/spark?interval=1d&range=${rangeChart}&symbols=${searchTerm.toLowerCase()}.BK`
      )
      .then((res) => {
        const firstObj = res.data[Object.keys(res.data)[0]];
        setQuoteSpark(firstObj);
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchTerm) fetchChartData();
  }, [rangeChart, quoteSummary]);

  const displayBlank = (
    <div className="text-center border py-5 " style={{ height: "500px" }}>
      <AiOutlineLineChart size="20em" style={{ color: "rgba(0,0,0,0.5)" }} />
      <h2 style={{ color: "rgba(0,0,0,0.5)" }}>กรุณาเลือกหุ้น</h2>
    </div>
  );

  const displayExample = (
    <div>
      <img
        src="/assets/img/overview2.png"
        alt="overview"
        className="w-100"
        style={styles.exampleImg}
      />
    </div>
  );

  return (
    <div className="">
      {isLoading && <SpinnerTool />}
      <div className="container position-relative" style={{ height: "97vh" }}>
        <Navbar
          setQuoteSummary={setQuoteSummary}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsLoading={setIsLoading}
          setInitQuoteSpark={setInitQuoteSpark}
        />
        <News />

        {quoteSummary && quoteSpark ? (
          <div>
            <Overview quoteSummary={quoteSummary} fairValue={fairValue} />
            <LightChart
              quoteSpark={quoteSpark}
              setRangeChart={setRangeChart}
              quoteSummary={quoteSummary}
            />

            <Table
              quoteSummary={quoteSummary}
              initQuoteSpark={initQuoteSpark}
              setFairValue={setFairValue}
            />
          </div>
        ) : (
          displayExample
        )}
      </div>
    </div>
  );
};

export default App;
