import API_URL from "../Constants/urlConstants";

/**
 * converts Json to Human Readable form
 */
const deserializeError = (data) => {
  var output = ``;
  Object.entries(data).map((error) => {
    output += `${error[0]}: ${error[1][0]}\n`;
  });
  return output;
};

/**
 * Send form data to api to create a user
 * @param {*} name
 * @param {*} email
 * @param {*} password
 * @param {*} confirmPassword
 */
const createUser = async (name, email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return fetch(`${API_URL.createUrl}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      if (res.status === 201) {
        //user created
        return "Success";
      } else {
        return res
          .json()
          .then((data) => `Invalid Input\n${deserializeError(data)}`);
      }
    })
    .catch((err) => err.toString());
};

export default createUser;
