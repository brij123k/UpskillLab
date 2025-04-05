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
const makeRequest = async (method, endPoint, config) => {
  try {
    const response = await axios({
      method,
      url: ApiConfig[endPoint],
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

export const getDataHandler = async (endPoint, query, data) => {
  return makeRequest("GET", endPoint, { 
    params: query, 
    data 
  });
};

export const getDataHandlerWithToken = async (endPoint, query, data) => {
  return makeRequest("GET", endPoint, { 
    params: query, 
    data, 
    ...getAuthHeaders() 
  });
};


// export const getDataHandlerwithQuery = async (endPoint, query = {}, data) => {
//   try {
//     const response = await makeRequest("GET", endPoint, { 
//       params: query,
//       data 
//     });
    
//     // Transform response for infinite query compatibility
//     return {
//       data: response.data,          // The actual data array
//       count: response.totalCount || // Total count for pagination
//              response.total || 
//              response.data?.length || 
//              0,
//       ...response                  // Include all other response data
//     };
//   } catch (error) {
//     console.error(`Error in getDataHandler (${endPoint}):`, error);
//     throw error; // Re-throw for React Query to handle
//   }
// };
