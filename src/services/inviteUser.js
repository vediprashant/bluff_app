import handleTokens from './handleTokens'
import urls from '../Constants/urlConstants'

const deserializeError = (data) => {
    console.log(data)
    var output = ``
    Object.entries(data).map(error => {
        output += `${error[0]}: ${error[1]}\n`
    })
    return output
}

const inviteUser = async (email, game) => {
    return fetch(urls.inviteUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${handleTokens.getToken('token')}`
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