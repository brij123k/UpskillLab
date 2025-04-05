// import axios from "axios";
// import ApiConfig from "./apiConfig";
// import { toast } from "react-toastify";
// export const postDataHandler = async (endPoint, data) => {
//   try {
//     console.log(data, "valuesvalues");
//     const res = await axios({
//       method: "POST",
//       url: ApiConfig[endPoint],
//       data: data,
//     });

//     if (res?.status === 200) {
//       return res.data;
//     } else {
//       toast.error(res?.data?.message);
//       return res;
//     }
//   } catch (error) {
//     console.log("error: ", error);
//     if (error.response) {
//       return error.response;
//     } else {
//       return error;
//     }
//   }
// };

// export const postDataHandlerWithToken = async (
//   endPoint,
//   data,
//   authorizationHeader = ""
// ) => {
//   try {
//     const token = authorizationHeader || sessionStorage.getItem("token");
//     console.log("gdfgdsfdsfds", token);
//     const res = await axios({
//       method: "POST",
//       url: ApiConfig[endPoint],
//       headers: {
//         token: token,
//         "Content-Type": "application/json",
//       },
//       data: data,
//     });
//     if (res?.status === 200) {
//       return res.data;
//     } else {
//       return res;
//     }
//   } catch (error) {
//     return error.response;
//   }
// };

// export const putDataHandler = async (endPoint, data) => {
//   try {
//     const res = await axios({
//       method: "POST",
//       url: ApiConfig[endPoint],
//       data: data,
//     });
//     if (res.data.responseCode === 200) {
//       return res.data;
//     } else {
//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//     if (error.response) {
//       return error.response;
//     }
//   }
// };

// export const putDataHandlerWithToken = async (endPoint, data, params) => {
//   try {
//     const res = await axios({
//       method: "PUT",
//       url: ApiConfig[endPoint],
//       headers: {
//         token: sessionStorage.getItem("token"),
//       },
//       data: data,
//       params: params,
//     });
//     if (res.data.responseCode === 200) {
//       return res.data;
//     } else {
//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//     if (error.response) {
//       return error.response;
//     }
//   }
// };

// export const deleteDataHandler = async (endPoint, query, body) => {
//   try {
//     const res = await axios({
//       method: "DELETE",
//       url: ApiConfig[endPoint],
//       headers: {
//         token: sessionStorage.getItem("token"),
//       },
//       params: query,
//       data: body,
//     });
//     if (res.data.responseCode === 200) {
//       return res.data;
//     } else {
//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const patchDataHandler = async (endPoint, data) => {
//   try {
//     const res = await axios({
//       method: "PATCH",
//       url: ApiConfig[endPoint],
//       data: data,
//     });
//     if (res.data.responseCode === 200) {
//       toast.success(res.data.responseMessage);
//       return res.data;
//     } else {
//       toast.error(res.data.responseMessage);
//       return res;
//     }
//   } catch (error) {
//     if (error.response) {
//       return error.response;
//     }
//     console.log(error);
//   }
// };

// export const patchTokenDataHandler = async (endPoint, data) => {
//   try {
//     const res = await axios({
//       method: "PUT",
//       url: ApiConfig[endPoint],
//       headers: {
//         token: sessionStorage.getItem("token"),
//       },
//       data: data,
//     });
//     if (res.data.responseCode === 200) {
//       return res.data;
//     } else {
//       toast.error(res?.data?.responseMessage);
//       return res;
//     }
//   } catch (error) {
//     if (error.response) {
//       return error.response;
//     }
//     console.log(error);
//   }
// };
// export const deleteDataHandlerWithoutToken = async (endPoint, query) => {
//   try {
//     const res = await axios({
//       method: "DELETE",
//       url: ApiConfig[endPoint],

//       params: query,
//     });
//     if (res.responseCode === 200) {
//       return res.message;
//     } else {
//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getDataHandler = async (endPoint, query, data) => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: ApiConfig[endPoint],
//       data: data,
//       params: query,
//     });


//     if (res?.status === 200) {
//       return res.data;
//     } else {
//       toast.error(res?.data?.message);
//       return res;
//     }
//   } catch (error) {
//     if (error.response) {
//       return error.response;
//     } else {
//       return error;
//     }
//   }
// };
// export const getDataHandlerWithToken = async (endPoint, query, data) => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: ApiConfig[endPoint],
//       headers: {
//         token: sessionStorage.getItem("token"),
//       },
//       data: data,
//       params: query,
//     });

//     if (res?.status === 200) {
//       return res.data;
//     } else {
//       toast.error(res?.data?.message);
//       return res;
//     }
//   } catch (error) {
//     if (error.response) {
//       return error.response;
//     } else {
//       return error;
//     }
//   }
// };



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
  if (res?.status === 200 || res?.data?.responseCode === 200) {
    if (successMessage) {
      toast.success(successMessage);
    }
    return res.data;
  } else {
    const errorMsg = res?.data?.message || res?.data?.responseMessage || "Request failed";
    toast.error(errorMsg);
    return res?.data || res;
  }
};

// Common error handler
const handleError = (error) => {
  console.error("API Error:", error);
  const errorMsg = error.response?.data?.message || 
                  error.response?.data?.responseMessage || 
                  error.message || 
                  "Request failed";
  toast.error(errorMsg);
  return error.response?.data || error.response || error;
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

