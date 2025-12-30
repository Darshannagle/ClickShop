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
    list: string;
  };
  user: {
    profile: string;
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
    list: "/api/product/list",
  },
  user: {
    profile: "/api/user/get-profile",
  },
};

const BaseURL: string = siteConfig?.apiURL;

export { siteConfig, endPoint, BaseURL };
