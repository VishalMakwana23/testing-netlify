import Axios from "../Utils/AxiosConfig";
import AxiosMsg from "../Utils/AxiosMsgConfig";

export const GetCallApi = async (data) => {
  try {
    const response = await Axios.get(data?.url, {
      headers: data?.headers,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const GetMsgCallApi = async (data) => {
  try {
    const response = await AxiosMsg.get(data?.url, {
      headers: data?.headers,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const PostCallApi = async (data) => {
  try {
    const response = await Axios.post(data?.url, data.body, {
      headers: data?.headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
export const PatchCallApi = async (data) => {
  try {
    const response = await Axios.patch(data?.url, data.body, {
      headers: data?.headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
export const DeleteCallApi = async (data) => {
  try {
    const response = await Axios.delete(data?.url, {
      headers: data?.headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
