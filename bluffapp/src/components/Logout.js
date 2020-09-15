import handleTokens from '../Utils/handleTokens'
import React from 'react'
import urls from '../Constants/urlConstants'

/**
 * Deletes token and redirects to login page
 * @param {*} props 
 */
const Logout = props => {
    const handleSubmit = () => {
        fetch(urls.logoutUrl,{
            method: 'post',
            headers:{
                "Authorization": `Token ${handleTokens.getToken('token')}`
            }
        })
        handleTokens.removeToken('token')
        props.history.push('/login')
    }
    return (
        <button className="ui secondary basic button" onClick={handleSubmit}>
            Logout
        </button>
    )
}
export default Logout;