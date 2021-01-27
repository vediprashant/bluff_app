import handleTokens from "Utils/handleTokens";
import deserializeErrors from "Utils/deserializeErrors";

class ApiClient {
  async request(method, url, cookies, options) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${handleTokens.getToken(cookies, "token")}`,
        },
        ...options,
      });

      if (response.ok) {
        return await response.json();
      }
      if (response.status === 400) {
        return { message: "Please provide valid Input" };
      }
      if (response.status === 401) {
        return { message: "Please provide valid credentials" };
      }
      if (response.status === 500) {
        return { message: "Internal Server Error, Please Try Later" };
      }
      return { message: deserializeErrors(response.status) };
    } catch {
      return { message: "API Error, Please try Again" };
    }
  }

  async get(url, cookies, queryParams) {
    return await this.request("get", url, cookies, { query: queryParams });
  }

  async post(url, cookies, payload) {
    return await this.request("post", url, cookies, {
      body: JSON.stringify(payload),
    });
  }
}

export default ApiClient;
