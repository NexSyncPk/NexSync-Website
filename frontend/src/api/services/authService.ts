import api from "../interceptor";
import { adminLogin, adminLogout, adminResetPassword } from "../endpoints";
import {type IObjectProps } from "../../types/index";
import Cookies from "js-cookie";

const loginUser = async (data: IObjectProps) => {
  try {
    const response = await api.post(adminLogin, data);
    const token = response?.data?.token;

    // Set token in cookie with an expiration time (5 minutes)
    await Cookies.set("token", token, { expires: 365 });

    return response;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

const logOutUser = async () => {
  try {
    await api.post(adminLogout);
    Cookies.remove("token");
    return true;
  } catch (error) {
    console.log("error: ", error);
    Cookies.remove("token"); // Remove token even if logout API fails
    return true;
  }
};

const verifyUserToken = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) return false;
    
    const response = await api.get("adminAuth/verify-token");
    return response;
  } catch (error) {
    console.error("API error:", error);
    return false;
  }
};

export {
  loginUser,
  verifyUserToken,
  logOutUser,
};
