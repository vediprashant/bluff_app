import handleTokens from "../Utils/handleTokens";
import apiUrls from "../constants/urlConstants";

/**
 * Fetches list of all users invited to a game
 * @param {*} cookies 
 * @param {*} game 
 */
const listInvitedUsers = async (cookies, game) => {
  try {
    let res = await fetch(`${apiUrls.LIST_INVITED_USERS}${game}/invitedList/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${handleTokens.getToken(cookies, "token")}`,
      },
    })
    let data = await res.json()
    if (res.status === 200) {
      //send the list
      let list = [];
      data.results.map((object) => list.push(object.email));
      return { message: "", list };
    }else if (data[0] === "User is not the owner of game") {
      return {
        message: "Forbidden",
        list: [],
      };
    }
    return {
      message: "An error occured when trying to fetch invited users",
      list: [],
    }
  }catch(err) { 
    return {
      message: "An error occured when trying to fetch invited users",
      list: [],
    }
  }
}
    

export default listInvitedUsers;
