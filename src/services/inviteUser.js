import handleTokens from '../Utils/handleTokens'
import apiUrls from '../constants/urlConstants'

const deserializeError = (data) => {
    var output = ``
    Object.entries(data).map(error => {
        output += `${error[1]}\n`
    })
    return output
}

const inviteUser = async (cookies, email, game) => {
    return fetch(apiUrls.INVITE_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${handleTokens.getToken(cookies, 'token')}`
        },
        body: JSON.stringify({ email, game }),
    }).then(res => {
        if (res.status === 201) {
            //user invited
            return "Success"
        }
        else {
            return res.json().then(data => `${deserializeError(data)}`)
        }
    })
    .catch(err => err.toString())
}

export default inviteUser;