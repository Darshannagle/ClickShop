const baseURL: string =
  import.meta.env.VITE_BASE_URL || "http://localhost:8000";

interface SiteConfig {
  siteName: string;
  siteIcon: string;
  footerText: string;
  apiURL: string;
  google: {
    analyticsKey: string;
  };
  tinyEditorKey: string;
  dashboard: string;
}

// Endpoint type
interface EndPoint {
  logIn: string;
  signUp: string;
  product: {
    create: string;
    list: string;
    details: string;
  };
  user: {
    profile: string;
    update: string;
  };
  category: {
    list: string;
    create: string;
  };
  subcategory: {
    list: string;
    create: string;
    listByCategory: string;
  };
  cartItem: {
    create: string;
    list: string;
    delete: string;
    setQuantity: string;
  };
  address: {
    create: string;
    list: string;
    update: string;
    delete: string;
  };
  order: {
    create: string;
    list: string;
    delete: string;
  };
}

// Site configuration object
const siteConfig: SiteConfig = {
  siteName: "React",
  siteIcon: "ion-flash",
  footerText: `© ${new Date().getFullYear()} test`,

  apiURL: baseURL,
  google: {
    analyticsKey: "",
  },
  tinyEditorKey: "",
  dashboard: "",
};

const endPoint: EndPoint = {
  logIn: "/api/auth/login",
  signUp: "/api/auth/signup",
  product: {
    create: "/api/product/create",
    list: "/api/product/list",
    details: "/api/product/details",
  },
  user: {
    profile: "/api/user/get-profile",
    update: "/api/user/update",
  },
  category: {
    list: "/api/category/list",
    create: "/api/category/create",
  },
  subcategory: {
    list: "/api/subcategory/list",
    create: "/api/subcategory/create",
    listByCategory: "/api/subcategory/list-by-category",
  },
  cartItem: {
    create: "/api/cart-item/create",
    list: "/api/cart-item/get-cart",
    delete: "/api/cart-item/delete",
    setQuantity: "/api/cart-item/set-quantity",
  },
  address: {
    create: "/api/address/create",
    list: "/api/address/list",
    update: "/api/address/update",
    delete: "/api/address/delete",
  },
  order: {
    create: "/api/order/create",
    list: "/api/order/list",
    delete: "/api/order/delete",
  },
};

const BaseURL: string = siteConfig?.apiURL;

export { siteConfig, endPoint, BaseURL };
