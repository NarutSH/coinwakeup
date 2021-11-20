import React, { useState, useEffect } from "react";
import { yahooFinApi } from "../API/yahooFinApi";
import { useToasts } from "react-toast-notifications";
import Modal from "react-modal";
import { FaTimesCircle, FaSearch } from "react-icons/fa";
import { stockList } from "../assets/StockList";

const Navbar = ({
  setQuoteSummary,
  setInitQuoteSpark,
  searchTerm,
  setSearchTerm,
  setIsLoading,
}) => {
  const { addToast } = useToasts();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "45%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "30vw",
      maxWidth: "710px",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      zIndex: 1000,
    },
  };

  const styles = {
    textBrand: {
      color: "rgba(21, 101, 192, 1)",
      fontWeight: "600",
      fontSize: "32px",
    },
    fakeInput: {
      border: "1px solid rgba(230, 230, 230, 0.8)",
      paddingInline: "10px",
      paddingBlock: "5px",
      minWidth: "200px",
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "white",
      marginInline: "10px",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // setSearchTerm("");
  };

  const fetchSparkMonth = () => {
    setIsLoading(true);
    yahooFinApi
      .get(
        `/v8/finance/spark?interval=1mo&range=5y&symbols=${searchTerm.toLowerCase()}.BK`
      )
      .then((res) => {
        const firstObj = res.data[Object.keys(res.data)[0]];
        setInitQuoteSpark(firstObj);
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onHandleSubmit = async (ev) => {
    ev.preventDefault();
    await yahooFinApi
      .get(
        `/v11/finance/quoteSummary/${searchTerm.toLowerCase()}.BK?lang=en&region=US&modules=defaultKeyStatistics%2CassetProfile%2CfinancialData%2CquoteType%2CsummaryDetail%2CbalanceSheetHistory%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly`
      )
      .then((res) => {
        if (res.data.quoteSummary.result) {
          setQuoteSummary(res.data.quoteSummary.result[0]);
        } else {
          addToast(res.data.quoteSummary.error.code, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => {
        closeModal();
      });

    fetchSparkMonth();
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light border">
        <div className="container-fluid">
          <div className="d-flex align-items-center ">
            <div style={styles.textBrand}>VALUATE</div>

            <div onClick={openModal} style={styles.fakeInput}>
              <FaSearch className="ms-1 me-3" />
              <span className="text-secondary">ค้นหารายชื่อหุ้น</span>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <form onSubmit={onHandleSubmit}>
                <div className="d-flex justify-content-between align-items-center  mb-2">
                  <div className="fw-bold">ค้นหาข้อมูลหุ้น</div>
                  <div style={{ cursor: "pointer" }} onClick={closeModal}>
                    <FaTimesCircle />
                  </div>
                </div>

                <div className="input-group ">
                  <span
                    className="input-group-text bg-white"
                    style={{ borderRight: "none" }}
                  >
                    <FaSearch />
                  </span>
                  <input
                    id="searchField"
                    type="text"
                    className="form-control"
                    placeholder="ค้นหารายชื่อหุ้น"
                    // onClick={openModal}
                    onChange={(ev) => setSearchTerm(ev.target.value)}
                    value={searchTerm}
                    list="stock-list"
                    style={{
                      borderLeft: "none",
                    }}
                  />
                  <datalist id="stock-list">
                    {stockList.map((item) => {
                      return (
                        <option value={item.Symbol}>{item.Company}</option>
                      );
                    })}
                  </datalist>
                  <button class="btn btn-primary" type="submit">
                    ค้นหา
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
