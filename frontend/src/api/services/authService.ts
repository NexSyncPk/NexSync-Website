import api from "../interceptor";
import { adminLogin, adminLogout } from "../endpoints";
import {type IObjectProps } from "../../types/index";
import Cookies from "js-cookie";

const loginUser = async (data: IObjectProps) => {
  try {
    console.log("Logging in user with data: ", data);
    const response = await api.post(adminLogin, data);
    const token = response?.data?.token;

    console.log("Login response: ", response);
    // Set token in cookie with an expiration time (5 minutes)
    Cookies.set("admin_token", token, { expires: 365 });
    Cookies.set("admin_user", JSON.stringify(response?.data?.user), { expires: 7 });
    return response;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

const logOutUser = async () => {
  try {
    await api.post(adminLogout);
    Cookies.remove("admin_token");
    Cookies.remove("admin_user");
    return true;
  } catch (error) {
    console.log("error: ", error);
    Cookies.remove("admin_token"); // Remove token even if logout API fails
    Cookies.remove("admin_user");
    return true;
  }
};

const verifyUserToken = async () => {
  try {
    const token = Cookies.get("admin_token");
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
