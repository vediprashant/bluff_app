import handleTokens from "../Utils/handleTokens";
import apiUrls from "../constants/urlConstants";

const deserializeError = (data) => {
  var output = ``;
  Object.entries(data).map((error) => {
    output += `${error[1]}\n`;
  });
  return output;
};

const inviteUser = async (cookies, email, game) => {
  //Validate email first
  var re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return "Enter valid email address";
  }
  return fetch(apiUrls.INVITE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${handleTokens.getToken(cookies, "token")}`,
    },
    body: JSON.stringify({ email, game }),
  })
    .then((res) => {
      if (res.status === 201) {
        //user invited
        return "User Invited";
      } else {
        return res.json().then((data) => `${deserializeError(data)}`);
      }
    })
    .catch((err) => err.toString());
};

export default inviteUser;
