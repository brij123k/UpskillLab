import axios from "axios";
import ApiConfig from "./apiConfig";
import { toast } from "react-toastify";
export const postDataHandler = async (endPoint, data) => {
  try {
    console.log(data, "valuesvalues");
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      data: data,
    });

    if (res?.status === 200) {
      return res.data;
    } else {
      toast.error(res?.data?.message);
      return res;
    }
  } catch (error) {
    console.log("error: ", error);
    if (error.response) {
      return error.response;
    } else {
      return error;
    }
  }
};

export const postDataHandlerWithToken = async (
  endPoint,
  data,
  authorizationHeader = ""
) => {
  try {
    const token = authorizationHeader || sessionStorage.getItem("token");
    console.log("gdfgdsfdsfds", token);
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (res?.status === 200) {
      return res.data;
    } else {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const putDataHandler = async (endPoint, data) => {
  try {
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      data: data,
    });
    if (res.data.responseCode === 200) {
      return res.data;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response;
    }
  }
};

export const putDataHandlerWithToken = async (endPoint, data, params) => {
  try {
    const res = await axios({
      method: "PUT",
      url: ApiConfig[endPoint],
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: data,
      params: params,
    });
    if (res.data.responseCode === 200) {
      return res.data;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response;
    }
  }
};

export const deleteDataHandler = async (endPoint, query, body) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: ApiConfig[endPoint],
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: query,
      data: body,
    });
    if (res.data.responseCode === 200) {
      return res.data;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const patchDataHandler = async (endPoint, data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: ApiConfig[endPoint],
      data: data,
    });
    if (res.data.responseCode === 200) {
      toast.success(res.data.responseMessage);
      return res.data;
    } else {
      toast.error(res.data.responseMessage);
      return res;
    }
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    console.log(error);
  }
};

export const patchTokenDataHandler = async (endPoint, data) => {
  try {
    const res = await axios({
      method: "PUT",
      url: ApiConfig[endPoint],
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: data,
    });
    if (res.data.responseCode === 200) {
      return res.data;
    } else {
      toast.error(res?.data?.responseMessage);
      return res;
    }
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    console.log(error);
  }
};
export const deleteDataHandlerWithoutToken = async (endPoint, query) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: ApiConfig[endPoint],

      params: query,
    });
    if (res.responseCode === 200) {
      return res.message;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getDataHandler = async (endPoint, query, data) => {
  try {
    const res = await axios({
      method: "GET",
      url: ApiConfig[endPoint],
      data: data,
      params: query,
    });


    if (res?.status === 200) {
      return res.data;
    } else {
      toast.error(res?.data?.message);
      return res;
    }
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return error;
    }
  }
};
export const getDataHandlerWithToken = async (endPoint, query, data) => {
  try {
    const res = await axios({
      method: "GET",
      url: ApiConfig[endPoint],
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: data,
      params: query,
    });

    if (res?.status === 200) {
      return res.data;
    } else {
      toast.error(res?.data?.message);
      return res;
    }
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return error;
    }
  }
};



