import API_URL from "../constants/urlConstants";
import deserializeErrors from "../Utils/deserializeErrors";

/**
 * Gets auth token from api
 * @param {*} email
 * @param {*} password
 */
const validateUser = async (email, password) => {
  try {
    const data = await fetch(`${API_URL.BASE_URL}${API_URL.VALIDATE_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (data.status === 400) {
      return { message: "Please provide valid credentials" };
    }
    if (data.status === 401) {
      return { message: "Please provide valid credentials" };
    }
    if (data.status === 500) {
      return { message: "Internal Server Error, Please Try Later" };
    }
    if (data.status === 201) {
      const jsonData = await data.json();
      return jsonData;
    } else {
      return { message: deserializeErrors(data.status) };
    }
  } catch {
    return { message: "API Error, Please try Again" };
  }
};

export default validateUser;
