import API_URL from "constants/urlConstants";
import deserializeErrors from "Utils/deserializeErrors";
import validate from "Utils/signUpValidator";

/**
 * Send form data to api to create a user
 * @param {*} name
 * @param {*} email
 * @param {*} password
 * @param {*} confirmPassword
 */
const createUser = async (name, email, password, confirmPassword) => {
  const validationResponse = validate(name, email, password, confirmPassword);
  if (validationResponse.message !== "OK") {
    return { response: validationResponse };
  }
  try {
    let res = await fetch(`${API_URL.BASE_URL}${API_URL.CREATE_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      }),
    });
    if (res.status === 201) {
      //user created
      return { response: { message: "Success" } };
    } else if (res.status === 400) {
      let data = await res.json();
      return { response: { ...data, message: data[Object.keys(data)[0]] } };
    } else return { response: { message: deserializeErrors(res.status) } };
  } catch (err) {
    return { response: { message: "API Error" } };
  }
};

export default createUser;
