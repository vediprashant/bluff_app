import API_URL from "../Constants/urlConstants";

const validateUser = async (email, password) => {
  try {
    const data = await fetch(`${API_URL.validateUrl}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (data.status === 400) {
      return { message: "Please provide valid input" };
    }
    if (data.status === 500) {
      return { message: "Internal Server Error, Please Try Later" };
    }
    const jsonData = await data.json();
    console.log(data);
    console.log(jsonData);
    return jsonData;
  } catch {
    return { message: "API Error, Please try Again" };
  }
};

export default validateUser;
