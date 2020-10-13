import API_URL from "../constants/urlConstants";
import deserializeErrors from "../Utils/deserializeErrors";

/**
 * Send form data to api to create a user
 * @param {*} name
 * @param {*} email
 * @param {*} password
 * @param {*} confirmPassword
 */

const validate = (name, email, password, confirmPassword) => {
  var response = { message: "OK" };
  var re = /\S+@\S+\.\S+/;
  if (name === "")
    response = {
      name: "Name is required",
      message: "Check highlighted fields",
    };
  if (!re.test(email)) {
    response = {
      ...response,
      email: "Enter Valid Email",
      message: "Check highlighted fields",
    };
  }
  if (password.length < 8) {
    response = {
      ...response,
      password: "Password must have atleast 8 characters",
      message: "Check highlighted fields",
    };
  }
  if (password !== confirmPassword) {
    response = {
      ...response,
      password: "Passwords do not match",
      message: "Check highlighted fields",
    };
  }
  return response;
};

const createUser = async (name, email, password, confirmPassword) => {
  var validationResponse = validate(name, email, password, confirmPassword);
  if (validationResponse.message !== "OK") {
    return { response: validationResponse };
  }

  return fetch(`${API_URL.CREATE_URL}`, {
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
  })
    .then((res) => {
      if (res.status === 201) {
        //user created
        return { response: { message: "Success" } };
      } else if (res.status === 400) {
        return res.json().then((data) => {
          if (data.email)
            return {
              response: { email: data.email[0], message: data.email[0] },
            };
          else return { response: { message: deserializeErrors(400) } };
        });
      }
      return { response: { message: deserializeErrors(res.status) } };
    })
    .catch((err) => ({ response: { message: "API Error" } }));
};

export default createUser;
