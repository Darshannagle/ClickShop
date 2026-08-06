const Constant = {
  PRIAMRY_CURRENCY: "INR",
  CURRENCY: {
    USD: {
      SYMBOL: "$",
      CODE: "usd",
    },
    INR: {
      SYMBOL: "₹",
      CODE: "inr",
    },
  },

  APP: {
    NAME_KEY: "CLICKSHOP",
  },

  OAUTH: {
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
  },
};
export default Constant;
