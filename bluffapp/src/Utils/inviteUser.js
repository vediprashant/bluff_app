const deserializeError = (data) => {
    var output = ``
    Object.entries(data).map(error => {
        output += `${error[0]}: ${error[1][0]}\n`
    })
    return output
}

const inviteUser = async (email, game) => {
    return fetch(`http://127.0.0.1/game/invite`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, game }),
    }).then(res => {
        if (res.status === 201) {
            //user invited
            return "Success"
        }
        else {
            return res.json().then(data => `Invalid Input\n${deserializeError(data)}`)
        }
    })
    .catch(err => err.toString())
}

export default inviteUser;