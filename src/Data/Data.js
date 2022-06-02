const menuData = [
  {
    id: "menu_01",
    label: "Cryptocurrencies",
    pathUrl: "",
    subMenu: [
      { label: "Crypto Market", pathUrl: "" },
      { label: "Recently added", pathUrl: "/recently_added" },
      { label: "Large Move", pathUrl: "/large_move" },
    ],
  },
  {
    id: "menu_02",
    label: "Exchange",
    pathUrl: "/exchange",
    subMenu: [
      { label: "Spot", pathUrl: "" },
      { label: "Dex", pathUrl: "/dex" },
      { label: "Delivatives", pathUrl: "/delivatives" },
    ],
  },
  // {
  //   id: "menu_03",
  //   label: "NFT",
  //   pathUrl: "/nft",
  //   subMenu: [
  //     { label: "Related coin", pathUrl: "/related_coin" },
  //     { label: "Top Sales", pathUrl: "/top_sales" },
  //     { label: "Market Place", pathUrl: "/market_place" },
  //   ],
  // },
  {
    id: "menu_04",
    label: "Knowledge",
    pathUrl: "/knowledge",
    subMenu: [
      // { label: "Crypto Basics", pathUrl: "/crypto_basics" },
      // { label: "Tips&Tutorials", pathUrl: "/tips_and_tutorials" },
    ],
  },
  {
    id: "menu_05",
    label: "Product",
    pathUrl: "/product",
    subMenu: [
      // { label: "Store", pathUrl: "/store" }
    ],
  },
];

export default menuData;
