import { siteConfig } from "../config/siteConfig";
import axios from "axios";
// Axios Instance [
const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🚀 ~ token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ] Axios Instance

// Helper function to construct URL query
const buildQueryString = (data: { [x: string]: any } = {}): string => {
  console.log("🚀 ~ buildQueryString ~ data:", data);
  let query: string = "";
  const dataLength = Object.keys(data).length;

  if (dataLength > 0) {
    Object.keys(data).forEach((key, index) => {
      const saperator = index === dataLength - 1 ? "" : "&";
      query += `${encodeURIComponent(key)}=${encodeURIComponent(
        String(data[key])
      )}${saperator}`;
    });
  }
  return query ? `?${query}` : "";
};
async function getAPIData(
  url = "",
  data: any = {},
  method = "GET",
  customURL = false,
  headers = {},
  formData = false
) {
  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  const token = localStorage.getItem("token");
  console.log("🚀 ~ getAPIData ~ token:", token);
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // ⚠️ Let browser set multipart headers
  if (!formData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
    api_type: "web",
  };

  const validMethods = ["GET", "POST", "PUT", "DELETE"];
  const methodParam = validMethods.includes(method.toUpperCase())
    ? method.toUpperCase()
    : "GET";

  const queryString = methodParam === "GET" ? buildQueryString(data) : "";

  try {
    const finalUrl = customURL
      ? url
      : `${siteConfig.apiURL}${url}${queryString}`;

    console.log("url:", finalUrl);

    const options: RequestInit = {
      method: methodParam,
      headers: mergedHeaders,
    };

    if (methodParam !== "GET") {
      options.body = formData ? data : JSON.stringify(data); // ✅ FIX
    }

    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      const err = await response.json();
      throw new Error(err?.message || err);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    // throw error;
    return {
      status: false,
      message: error.message,
    };
  }
}

// Function to handle API progress (for file uploads)

function getAPIProgressData(
  endpoint: string,
  method: string,
  data: { [x: string]: any },
  onProgress = (progress: number) => {
    console.log(progress);
  }
) {
  const isOnline = window.navigator.onLine;
  if (!isOnline) {
    return Promise.reject(new Error("No internet connection."));
  }

  const url = `${siteConfig.apiURL}${endpoint}`;
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => formData.append(key, String(item)));
    } else {
      formData.append(key, String(value));
    }
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (!["POST", "PUT"].includes(method.toUpperCase())) {
      reject(new Error(`Invalid HTTP method: ${method}`));
      return;
    }

    xhr.open(method, url, true);

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded * 100) / event.total;
        onProgress(progress);
      }
    });

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Request failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network Error"));
    xhr.send(formData);
  });
}
export { buildQueryString, getAPIData, getAPIProgressData };
