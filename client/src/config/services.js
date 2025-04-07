import axios from "axios";
import ApiConfig from "./apiConfig";
import { toast } from "react-toastify";

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  headers: {
    token: token || sessionStorage.getItem("token"),
    "Content-Type": "application/json"
  }
});

// Common response handler
const handleResponse = (res, successMessage) => {
  // Check for both 200 and 201 status codes
  if (res?.status === 200 || res?.status === 201) {
    if (successMessage) {
      toast.success(successMessage);
    }
    return res.data;
  } else {
    // Modified to match likely API error structure
    const errorMsg = res?.data?.message || 
                    res?.data?.error ||
                    "Request failed";
    toast.error(errorMsg);
    throw res?.data || res; // Throw instead of return to maintain error flow
  }
};

// Common error handler
const handleError = (error) => {
  console.error("API Error:", error);
  const errorMsg = error.response?.data?.message || 
                  error.response?.data?.error || 
                  error.message || 
                  "Request failed";
  toast.error(errorMsg);
  throw error.response?.data || error.response || error; // Throw to maintain error flow
};

// Base request handler
const makeRequest = async (method, endPointOrUrl, config) => {
  // const isUrl = config?.isUrl || false; // Check if it's a direct URL
  try {
    const finalUrl = config.isUrl
      ? endPointOrUrl // direct URL like https://.../course/123
      : ApiConfig[endPointOrUrl]; // use from config if key
    const response = await axios({
      method,
      url: finalUrl,
      ...config
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const postDataHandler = async (endPoint, data) => {
  return makeRequest("POST", endPoint, { data });
};

export const postDataHandlerWithToken = async (endPoint, data, token) => {
  return makeRequest("POST", endPoint, { 
    data, 
    ...getAuthHeaders(token) 
  });
};

export const putDataHandler = async (endPoint, data) => {
  return makeRequest("PUT", endPoint, { data });
};

export const putDataHandlerWithToken = async (endPoint, data, params) => {
  return makeRequest("PUT", endPoint, { 
    data, 
    params, 
    ...getAuthHeaders() 
  });
};

export const deleteDataHandler = async (endPoint, query, body) => {
  return makeRequest("DELETE", endPoint, { 
    params: query, 
    data: body, 
    ...getAuthHeaders() 
  });
};

export const patchDataHandler = async (endPoint, data) => {
  return makeRequest("PATCH", endPoint, { data });
};

export const patchTokenDataHandler = async (endPoint, data) => {
  return makeRequest("PUT", endPoint, { 
    data, 
    ...getAuthHeaders() 
  });
};

export const deleteDataHandlerWithoutToken = async (endPoint, query) => {
  return makeRequest("DELETE", endPoint, { params: query });
};

export const getDataHandler = async (endPointOrUrl, query = {}, data = {}, isUrl = false) => {
  return makeRequest("GET", endPointOrUrl, {
    params: query,
    data,
    isUrl
  });
};

export const getDataHandlerWithToken = async (endPoint, query, data) => {
  return makeRequest("GET", endPoint, { 
    params: query, 
    data, 
    ...getAuthHeaders() 
  });
};


export const getFilteredCourses = async (params) => {
  return makeRequest("POST", "courseDisplay", {
    data: {
      skip: params.skip || 0,
      limit: params.limit || 12,
      categoryIds: params.categoryIds,
      languageIds: params.languageIds,
      courseLevels: params.courseLevels,
      search: params.search,
      sort: params.sort,
    }
  });
};



// function for payment 
export const registerBatch = async (batchId, userData) => {
  return makeRequest("POST", "batchRegistration", {
    data: {
      batchId,
      ...userData
    }
  });
};

export const initiateCashfreePayment = async (orderId, sessionId) => {
  return makeRequest("POST", "cashfreeCheckout", {
    data: { orderId, sessionId }
  });
};


export const getBlogs = async (params = {}) => {
  return makeRequest("GET", "blogs", {
    params: {
      limit: params.limit || 10
    }
  });
};

// export const getBlogById = async (id) => {
//   return makeRequest("GET", `blogById/${id}`, {
//     isUrl: true, // This tells makeRequest to use the URL directly
//     params: { id }
//   });
// };
