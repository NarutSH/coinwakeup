import React, { useEffect } from "react";
import scrapeIt from "scrape-it";

const News = () => {
  useEffect(() => {
    scrapeIt("https://www.thunhoon.com", {
      posts: {
        listItem: "div.card.noborder.todaycardleft",
        // name: "pages",
        data: {
          title: "h6",
          url: {
            selector: "a",
            attr: "href",
          },
          avatar: {
            selector: ".card img",
            attr: "src",
          },
        },
      },
    }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`);
      console.log(data);
    });
  }, []);

  return <div></div>;
};

export default News;
