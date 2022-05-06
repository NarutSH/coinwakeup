import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuData from "../Data/Data";
import { FaBars } from "react-icons/fa";
import AccordionEl from "../Elements/AccordionEl";

const Header = () => {
  const location = useLocation();
  const [dropdownHover, setDropdownHover] = useState(false);

  const { pathname } = location;

  const styles = {
    list: {
      listStyle: "none",
      textDecoration: "none",
      color: "inherit",
      fontWeight: "bold",
    },
    imageOffcanvas: {
      padding: "20px",
      width: "100%",
      height: "100px",
      objectFit: "cover",
    },
  };

  const styleFn = (tagPath) => {
    const match = Boolean(pathname === tagPath);

    return {
      listStyle: "none",
      textDecoration: "none",
      color: match ? "#E0BBE4" : "inherit",
      fontWeight: "bold",
    };
  };

  const displayNavMenu = (
    <ul className="nav d-none d-lg-flex">
      {menuData.map((item) => {
        return (
          <div className="dropdown" key={item.id}>
            <li
              className="d-inline me-4 btn"
              onMouseEnter={() =>
                document.getElementById(item.id)?.classList.add("show")
              }
              onMouseLeave={() =>
                document.getElementById(item.id)?.classList.remove("show")
              }
            >
              <Link to={item.pathUrl} style={styleFn(item.pathUrl)}>
                {item.label}
              </Link>
            </li>
            {item.subMenu.length ? (
              <ul
                id={item.id}
                onMouseEnter={(ev) => ev.target.classList.add("show")}
                onMouseLeave={(ev) => ev.target.classList.remove("show")}
                className={`dropdown-menu`}
              >
                {item.subMenu.map((el, elIndex) => {
                  return (
                    <li key={elIndex}>
                      <Link
                        className="dropdown-item"
                        onClick={() =>
                          document
                            .getElementById(item.id)
                            .classList.remove("show")
                        }
                        to={`${item.pathUrl}${el.pathUrl}`}
                      >
                        {el.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </ul>
  );

  const displayOffcanvasMenu = (
    <div className="d-block d-lg-none">
      <button
        className="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasMenu"
        aria-controls="offcanvasMenu"
      >
        <FaBars size="1.5rem" />
      </button>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <div>
            <img src="/assets/images/logo1.png" style={styles.imageOffcanvas} />
          </div>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body px-0">
          <div>
            {menuData?.map((item) => {
              return <AccordionEl menuObject={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="navbar px-5 border flex-nowrap">
      <div className="d-flex align-items-center">
        <Link to="/" style={styles.list} className="me-3">
          <img src="/assets/images/logo1.png" />
        </Link>
        {displayNavMenu}
      </div>
      {displayOffcanvasMenu}
      <div className="d-none d-lg-block">
        <input type="text" placeholder="search" className="form-control" />
      </div>
    </div>
  );
};

export default Header;
