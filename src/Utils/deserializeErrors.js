/**
 * returns a string describing staus code category
 * @param {*} status 
 */
export default function deserializeErrors(status){
    let statusCategory = Math.floor(status/100)
    switch(statusCategory){
        case 1:
            return 'Continue'
            
        case 2:
            return 'Success'
            
        case 3:
            return 'Redirect'
            
        case 4:
            return 'Client Error'
            
        case 5:
            return 'Internal Server Error'
            
        default:
            return ''
            
    }
}