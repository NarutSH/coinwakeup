import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { FaTimesCircle, FaPlus } from "react-icons/fa";

const Table = ({ quoteSummary, initQuoteSpark, setFairValue }) => {
  const [growth, setGrowth] = useState(0);
  const [npm, setNpm] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const incomeStatementHistory = quoteSummary
    ? [
        ...quoteSummary?.incomeStatementHistory?.incomeStatementHistory,
      ]?.reverse()
    : [];

  const balanceSheetStatements = quoteSummary
    ? [...quoteSummary?.balanceSheetHistory?.balanceSheetStatements]?.reverse()
    : [];

  const revenue =
    quoteSummary?.incomeStatementHistory?.incomeStatementHistory[0]
      ?.totalRevenue.raw +
    quoteSummary?.incomeStatementHistory?.incomeStatementHistory[0]
      ?.totalRevenue.raw *
      (growth / 100);

  const styles = {
    tableHeader: {
      backgroundColor: "rgba(227, 242, 253, 1)",
    },
  };

  const defaultValues = {
    predict: [
      {
        revenueEl: revenue,
        growthRevEl: 0,
        pNpmEl: 0,
        npmEl: 0,
        totalSharesEl: 0,
        epsEl: 0,
      },
    ],
  };

  const { register, control, handleSubmit, reset, watch, setValue, getValues } =
    useForm();

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "predict",
    });

  const formatNumber = (data) => {
    return (Math.round((data / 1000000) * 100) / 100)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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

  const getYear = (value) => {
    const result = new Date(value * 1000);

    let year = result.getFullYear();

    return year;
  };

  const lastRev = watch(`predict.${fields.length - 1}.revenueEl`);
  const lastGrowth = watch(`predict.${fields.length - 1}.growthRevEl`);
  const lastPNpm = watch(`predict.${fields.length - 1}.pNpmEl`);
  const lastShares = watch(`predict.${fields.length - 1}.totalSharesEl`);
  const lastPe = watch(`predict.${fields.length - 1}.peEl`);
  const lastEps = formatNumber(
    ((lastRev + lastRev * (lastGrowth / 100)) * (lastPNpm / 100)) / lastShares
  );

  const lastPrice = lastPe * lastEps;

  useEffect(() => {
    setFairValue(lastPrice);
  }, [lastPrice]);

  useEffect(() => {
    if (quoteSummary) reset(defaultValues);
  }, [quoteSummary]);

  const getPrice = initQuoteSpark?.timestamp
    ?.map((item, index) => {
      return {
        date: convertDate(item),
        year: getYear(item),
        price: initQuoteSpark.close[index],
      };
    })
    .filter(
      (item) =>
        item.date.startsWith("01/12") &&
        item.year >= new Date().getFullYear() - 4
    );

  const displayTable2 = (
    <div
      className="table-scroll  "
      style={{
        width: "100%",
        overflow: "scroll",
        position: "absolute",
        top: "550px",
        bottom: "0px",
      }}
    >
      <table className="table table-sm border">
        <thead className="text-center" style={styles.tableHeader}>
          <tr>
            <td></td>
            {quoteSummary
              ? incomeStatementHistory.map((item) => {
                  return (
                    <td key={item.endDate.raw}>
                      {new Date(item.endDate.raw * 1000).getFullYear()}
                    </td>
                  );
                })
              : "-"}

            {fields.map((item, index) => {
              return (
                <td>
                  {new Date().getFullYear() + index}{" "}
                  {index !== 0 ? (
                    <span
                      className="float-end"
                      style={{ cursor: "pointer" }}
                      onClick={() => remove(index)}
                    >
                      <FaTimesCircle />
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              );
            })}
            <td>
              <div
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  append({
                    revenueEl: lastRev + lastRev * (lastGrowth / 100),
                    growthRevEl: 0,
                    pNpmEl: 0,
                    npmEl: 0,
                    totalSharesEl: 0,
                    epsEl: 0,
                  });
                }}
              >
                <FaPlus />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>รายได้ (ลบ.)</td>
            {quoteSummary
              ? incomeStatementHistory.map((item) => {
                  return (
                    <td className="text-center">
                      {formatNumber(item.totalRevenue.raw)}
                    </td>
                  );
                })
              : ""}

            {fields.map((item, index) => {
              const rev = watch(`predict.${index}.revenueEl`);
              const growth = watch(`predict.${index}.growthRevEl`);

              return (
                <td className="text-center">
                  <div>{formatNumber(rev + rev * (growth / 100))}</div>
                </td>
              );
            })}
          </tr>
          <tr>
            <td>การเติบโตของรายได้ (%)</td>

            {quoteSummary
              ? incomeStatementHistory.map((item, index) => {
                  let revGrowth;
                  if (index !== 0) {
                    revGrowth = `
                        ${
                          Math.round(
                            (item?.totalRevenue.raw /
                              incomeStatementHistory[index - 1]?.totalRevenue
                                .raw -
                              1) *
                              100 *
                              100
                          ) / 100
                        }`;
                  } else {
                    revGrowth = "-";
                  }

                  return <td className="text-center">{revGrowth}</td>;
                })
              : ""}

            {fields.map((item, index) => {
              return (
                <td className="text-center">
                  <input
                    style={{ width: "100px" }}
                    type="number"
                    {...register(`predict.${index}.growthRevEl`)}
                    className="text-center form-control m-auto py-0"
                  />
                </td>
              );
            })}
          </tr>

          <tr>
            <td>อัตรากำไรสุทธิ (%)</td>
            {quoteSummary
              ? incomeStatementHistory.map((item) => {
                  return (
                    <td className="text-center">
                      {Math.round(
                        (item.netIncome.raw / item.totalRevenue.raw) * 100 * 100
                      ) / 100}
                    </td>
                  );
                })
              : ""}

            {fields.map((item, index) => {
              return (
                <td className="text-center">
                  <input
                    style={{ width: "100px" }}
                    type="number"
                    {...register(`predict.${index}.pNpmEl`)}
                    className="text-center form-control m-auto py-0"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td>กำไรสุทธิ (ลบ.)</td>
            {quoteSummary
              ? incomeStatementHistory.map((item) => {
                  return (
                    <td className="text-center">
                      {formatNumber(item.netIncome.raw)}
                    </td>
                  );
                })
              : ""}

            {fields.map((item, index) => {
              const rev = watch(`predict.${index}.revenueEl`);
              const growth = watch(`predict.${index}.growthRevEl`);
              const pNpm = watch(`predict.${index}.pNpmEl`);
              return (
                <td className="text-center">
                  <div>
                    {pNpm
                      ? formatNumber(
                          (rev + rev * (growth / 100)) * (pNpm / 100)
                        )
                      : ""}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="text-nowrap">จำนวนหุ้นที่จดทะเบียน (ล้านหุ้น)</td>
            {quoteSummary
              ? incomeStatementHistory.map((item, index) => {
                  return (
                    <td className="text-center">
                      {formatNumber(
                        quoteSummary.defaultKeyStatistics.sharesOutstanding.raw
                      )}
                    </td>
                  );
                })
              : ""}

            {fields.map((item, index) => {
              return (
                <td className="text-center">
                  <input
                    style={{ width: "100px" }}
                    type="number"
                    {...register(`predict.${index}.totalSharesEl`)}
                    className="text-center form-control m-auto py-0"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td>กำไรต่อหุ้น (บาท)</td>

            {quoteSummary
              ? incomeStatementHistory.map((item, index) => {
                  return (
                    <td className="text-center">
                      {(
                        +item.netIncome.raw /
                        +quoteSummary.defaultKeyStatistics.sharesOutstanding.raw
                      ).toFixed(2)}
                    </td>
                  );
                })
              : ""}

            {fields.map((item, index) => {
              const rev = watch(`predict.${index}.revenueEl`);
              const growth = watch(`predict.${index}.growthRevEl`);
              const pNpm = watch(`predict.${index}.pNpmEl`);
              const shares = watch(`predict.${index}.totalSharesEl`);
              return (
                <td className="text-center">
                  <div>
                    {shares
                      ? formatNumber(
                          ((rev + rev * (growth / 100)) * (pNpm / 100)) / shares
                        )
                      : ""}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            <td>P/E</td>

            {quoteSummary
              ? incomeStatementHistory.map((item, index) => {
                  const eps =
                    +item.netIncome.raw /
                    +quoteSummary.defaultKeyStatistics.sharesOutstanding.raw;

                  const price = getPrice ? getPrice[index]?.price : 0;
                  return (
                    <td className="text-center">{(price / eps).toFixed(2)}</td>
                  );
                })
              : ""}

            {fields.map((item, index) => {
              return (
                <td className="text-center">
                  <input
                    style={{ width: "100px" }}
                    type="number"
                    {...register(`predict.${index}.peEl`)}
                    className="text-center form-control m-auto py-0"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td>ราคาหุ้น (บาท)</td>

            {initQuoteSpark
              ? getPrice.map((item, index) => {
                  return (
                    <td className="text-center">{item.price.toFixed(2)}</td>
                  );
                })
              : ""}

            {fields.map((item, index) => {
              const rev = watch(`predict.${index}.revenueEl`);
              const growth = watch(`predict.${index}.growthRevEl`);
              const pNpm = watch(`predict.${index}.pNpmEl`);
              const shares = watch(`predict.${index}.totalSharesEl`);
              const pe = watch(`predict.${index}.peEl`);
              const eps = formatNumber(
                ((rev + rev * (growth / 100)) * (pNpm / 100)) / shares
              );
              return (
                <td className="text-center">
                  <div>{shares ? (pe * eps).toFixed(2) : ""}</div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container-fluid mt-2 p-0 ">
      {quoteSummary ? displayTable2 : ""}
    </div>
  );
};

export default Table;
