const validRegister = ({ username,  password, cf_password }) => {
    const err = {}
 
   
     
    if (!username) {
        err.username = "Veuillez ajouter votre nom d'utilisateur."
    } else if (username.replace(/ /g, '').length > 25) {
        err.username = "Le nom d'utilisateur comporte jusqu'à 25 caractères."
    }

    

    if (!password) {
        err.password = "Veuillez ajouter votre mot de passe."
    } else if (password.length < 6) {
        err.password = "Le mot de passe doit contenir au moins 6 caractères."
    }

    if (password !== cf_password) {
        err.cf_password = "Le mot de passe de confirmation ne correspond pas."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}



 
  
export default validRegister