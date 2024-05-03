export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isAccount = account => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(account);
}

export const isLength = password => {
    if(password.length < 6) return true
    return false
}
 
export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
} 

export function isPhone(phone) {
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(phone);
  }