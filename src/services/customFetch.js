import handleTokens from "../Utils/handleTokens"

const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }

const customFetch = async ({
    url,
    method='POST',
    headers=defaultHeaders,
    body=null,
    cookies
}) => {
    let res = await fetch(url, {
        method,
        headers: {
            ...headers,
            Authorization: `token ${handleTokens.getToken(cookies, "token")}`
        },
        ...(body ? {body: JSON.stringify(body)} : null)
    })
    
    return res
}

export default customFetch
