import handleTokens from '../Utils/handleTokens'
import apiUrls from '../constants/urlConstants'

const deserializeError = (data) => {
    var output = ``
    Object.entries(data).map(error => {
        output += `${error[1]}\n`
    })
    return output
}

const listInvitedUsers = async (cookies, game) => {
    return fetch(`${apiUrls.LIST_INVITED_USERS}${game}/invitedList/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${handleTokens.getToken(cookies, 'token')}`
        }
    }).then(res => {
        if (res.status === 200) {
            //send the list
            return res.json().then(data => {
                let list = []
                data.results.map(object => list.push(object.email))
                return { message: '', list}
            })
        }
        else {
            return res.json().then(data => {
                if (data[0] === 'User is not the owner of game'){
                    return {
                        message: 'Forbidden',
                        list: []
                    }
                }
                return {
                message: 'An error occured when tring to fetch invited users',
                list: []
                }
            })
        }
    })
    .catch(err => ({
        message: 'An error occured when tring to fetch invited users',
        list: []
    }))
}

export default listInvitedUsers;
