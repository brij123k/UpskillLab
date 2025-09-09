import axios from "axios";
import ApiConfig from "./apiConfig";
import { toast } from "react-toastify";

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  }
});
const getAuthHeadersFormData = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  }
});

// Common response handler
const handleResponse = (res, successMessage) => {
  // Check for both 200 and 201 status codes
  if (res?.status === 200 || res?.status === 201) {
    return res.data;
  } else {
    // Modified to match likely API error structure
    const errorMsg = res?.data?.message || 
                    res?.data?.error ||
                    "Request failed";
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

export const postDataHandler = async (endPoint, data, isUrl=false) => {
  return makeRequest("POST", endPoint, { data,isUrl });
};

export const postDataHandlerWithToken = async (endPoint, data,isUrl=false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("POST", endPoint, { 
    data, 
    isUrl,
    ...getAuthHeaders(initialAuth?.authToken) 
  });
};
export const postDataHandlerWithTokenFormData = async (endPoint, data,isUrl=false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("POST", endPoint, { 
    data, 
    isUrl,
    ...getAuthHeadersFormData(initialAuth?.authToken) 
  });
};


export const putDataHandler = async (endPoint, data,isUrl=false) => {
  console.log(endPoint, data, "5")
  return makeRequest("PUT", endPoint, { data,isUrl });
};

export const putDataHandlerWithToken = async (endPoint, data, params, isUrl=false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("PUT", endPoint, { 
    data, 
    params, 
    isUrl,
    ...getAuthHeaders(initialAuth?.authToken) 
  });
};
export const putDataHandlerWithTokenFormData = async (endPoint, data, params, isUrl=false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("PUT", endPoint, { 
    data, 
    params, 
    isUrl,
    ...getAuthHeadersFormData(initialAuth?.authToken) 
  });
};
export const deleteDataHandler = async (endPoint, isUrl=false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("DELETE", endPoint, { 
    isUrl:isUrl, 
    ...getAuthHeaders(initialAuth?.authToken) 
  });
};

export const patchDataHandler = async (endPoint, data) => {
  return makeRequest("PATCH", endPoint, { data });
};

export const patchTokenDataHandler = async (endPoint, data ,isUrl=false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("PATCH", endPoint, { 
    data, 
    isUrl,
    ...getAuthHeaders(initialAuth?.authToken) 
  });
};
export const putTokenDataHandler = async (endPoint, data) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("PUT", endPoint, { 
    data, 
    ...getAuthHeaders(initialAuth?.authToken) 
  });
};

export const patchTokenDataHandlerFormData = async (endPoint, data) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("PATCH", endPoint, { 
    data, 
    ...getAuthHeadersFormData(initialAuth?.authToken) 
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

export const getDataHandlerWithToken = async (endPoint, query, data, isUrl = false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }
  return makeRequest("GET", endPoint, { 
    params: query, 
    data, 
    isUrl,
    ...getAuthHeaders(initialAuth?.authToken) 
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

export const manualRegister = async (userData) => {
  return makeRequest("POST", "manualRegister", {
    data:userData
  });
};

export const manualRegister2 = async (userData) => {
  return makeRequest("POST", "manualRegister2", {
    data:userData
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


export const initiateOtpLogin = async (email) => {
  try {
    const response = await axios.post(ApiConfig.otpLogin, { email });
    
    if (response?.status === 200 || response?.status === 201) {
      return response.data; // Contains attemptId
    } else {
      throw new Error(response?.data?.message || "Failed to send OTP");
    }
  } catch (error) {
    console.error("OTP initiation error:", error);
    const errorMsg = error.response?.data?.message || 
                    "Failed to send OTP. Please try again.";
    toast.error(errorMsg);
    throw error;
  }
};

export const verifyOtp = async (attemptId, otpCode) => {
  try {
    const response = await axios.post(ApiConfig.verifyOtp, {otpCode, attemptId});
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Login successful!");
      return response.data; // Contains tokens
    } else {
      throw new Error(response?.data?.message || "OTP verification failed");
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    const errorMsg = error.response?.data?.message || 
                    "Invalid OTP. Please try again.";
    toast.error(errorMsg);
    throw error;
  }
};

export const getUserDetails = async () => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;
  
  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(
      ApiConfig.getUserDetails,
      {
        headers: {
          'Authorization': `Bearer ${initialAuth.authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response?.status === 200) {
      return response.data;
    } else {
      throw new Error(response?.data?.message || "Failed to fetch user details");
    }
  } catch (error) {
    console.error("Failed to get user details:", error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token is invalid or expired
      throw new Error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      throw new Error('You do not have permission to access this resource');
    }
    
    const errorMsg = error.response?.data?.message || 
                    "Failed to fetch user information";
    toast.error(errorMsg);
    throw error;
  }
};


export const refreshAuthToken = async () => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;

  if (!initialAuth?.refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post(
      ApiConfig.refreshToken, // Assumed endpoint, e.g., '/auth/refresh'
      {
        refreshToken: initialAuth.refreshToken,
      },
      {
        headers: {
          'Authorization': `Bearer ${initialAuth.authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Failed to refresh token:', error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Invalid or expired refresh token
      throw new Error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      // Forbidden - invalid refresh token or permission issue
      throw new Error('Invalid refresh token');
    }

    const errorMsg = error.response?.data?.message || 'Failed to refresh authentication token';
    toast.error(errorMsg);
    throw error;
  }
};


export const uploadFileHandler = async (endPoint, file, additionalData = {}, isUrl = false) => {
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;

  if (!initialAuth?.authToken) {
    throw new Error('No authentication token found');
  }

  const formData = new FormData();
  formData.append("files", file); // 'file' is the field name expected by the backend

  // Append any additional data like userId, categoryId, etc.
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const url = isUrl ? endPoint : ApiConfig[endPoint];
    const response = await axios.post(url, formData, {
      headers: {
        "Authorization": `Bearer ${initialAuth.authToken}`,
        "Content-Type": "multipart/form-data"
      }
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(response?.data?.message || "File upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    const errorMsg = error.response?.data?.message || "Failed to upload file";
    throw error;
  }
};



