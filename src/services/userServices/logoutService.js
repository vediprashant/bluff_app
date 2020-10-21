import API_URL from "../../constants/urlConstants";
import deserializeErrors from "../../Utils/deserializeErrors";
import handleTokens from "../../Utils/handleTokens";

/**
 * deletes token from the backend
 */
const logoutUser = async (cookies) => {
  try {
    const data = await fetch(`${API_URL.BASE_URL}${API_URL.LOGOUT_URL}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${handleTokens.getToken(cookies, "token")}`,
      },
    });
    if (data.status === 204) {
      return { success: "loggedOut" };
    }
    return { message: deserializeErrors(data.status) };
  } catch {
    return { message: "API Error, Please try Again" };
  }
};

export default logoutUser;
