import React from "react";
import { Link, useLocation } from "react-router-dom";

const AccordionEl = ({ menuObject }) => {
  const { id, subMenu, label, pathUrl } = menuObject;
  const location = useLocation();
  const { pathname } = location;

  const stylesFn = (tagPath) => {
    const condition1 = Boolean(pathname == tagPath);

    return {
      backgroundColor: condition1 ? "rgba(85, 129, 179, 1)" : "",
      color: condition1 ? "white" : "",
      listStyle: "none",
      paddingLeft: "20px",
      paddingBlock: "5px",
    };
  };

  const styles = {
    menuButton: {
      backgroundColor: "white",
      color: "inherit",
    },
    linkTag: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  return (
    <div className="accordion accordion-flush " id={`idContainer-${id}`}>
      <div className="accordion-item">
        <div className="accordion-header" id={`flush-heading-${id}`}>
          {subMenu.length ? (
            <button
              className="accordion-button text-primary"
              style={styles.menuButton}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse-${id}`}
              aria-expanded="true"
              aria-controls={`flush-collapse-${id}`}
            >
              <span className="text-dark fw-bold">{label || ""}</span>
            </button>
          ) : (
            <div className="pt-3">
              <Link style={styles.linkTag} to={pathUrl}>
                <li style={stylesFn(pathUrl)}>
                  <span className="fw-bold">{label || ""}</span>
                </li>
              </Link>
            </div>
          )}
        </div>
        <div
          id={`flush-collapse-${id}`}
          className="accordion-collapse collapse show"
          aria-labelledby={`flush-heading-${id}`}
          data-bs-parent={`#idContainer-${id}`}
        >
          {subMenu.length ? (
            <div className="accordion-body px-0">
              <Link style={styles.linkTag} to={pathUrl}>
                <li style={stylesFn(pathUrl)}>
                  <span className="">{label || ""}</span>
                </li>
              </Link>
              {subMenu.map((item) => {
                return (
                  <Link style={styles.linkTag} to={pathUrl + item?.pathUrl}>
                    <li style={stylesFn(pathUrl + item?.pathUrl)}>
                      {item?.label}
                    </li>
                  </Link>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionEl;
