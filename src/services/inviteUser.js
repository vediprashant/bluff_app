import handleTokens from "../Utils/handleTokens";
import apiUrls from "../constants/urlConstants";

/**
 * Converts JSON from api to 'easy to read' format
 * @param {*} data 
 */
const deserializeError = (data) => {
  let dict = {
    "The fields user, game must make a unique set.": "User already invited"
  }
  let handler = {
    get: (target, prop, reciever) => prop in target ? target[prop] : prop
  }
  let translateAPIError= new Proxy(dict, handler)

  var output = ``;
  Object.entries(data).map((error) => {
    output += `${translateAPIError[`${error[1]}`]}\n`;
  });
  return output;
};

/**
 * Invite a user to a game
 * @param {*} cookies 
 * @param {*} email 
 * @param {*} game 
 */
const inviteUser = async (cookies, email, game) => {
  //Validate email first
  var re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return "Enter valid email address";
  }
  try {
    let res = await fetch(apiUrls.INVITE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${handleTokens.getToken(cookies, "token")}`,
      },
      body: JSON.stringify({ user: email, game }),
    })
    if (res.status === 201) {
      //user invited
      return "User Invited";
    } else {
      let data = await res.json()
      return `${deserializeError(data)}`
    }
  }catch(err) { return err.toString() }
};

export default inviteUser;
