export const convertCurrency = (number) => {
  const formatter = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
    notation: "compact",
  });

  return formatter.format(number);
};

export const convertCompactNumber = (number) => {
  const formatter = new Intl.NumberFormat("en-EN", {
    notation: "compact",
  });

  return formatter.format(number);
};
