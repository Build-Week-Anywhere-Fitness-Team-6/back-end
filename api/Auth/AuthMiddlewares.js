const User = require('../Users/UsersModel')



const checkIfSent = (req, res , next) => {
if(!req.body.user_name || !req.body.password){
    next({status: 400, message:'Username and Password Required!' })
}
else{
    next()
}
}

 const checkIfUserTaken = async(req, res , next) => {
    let user_name = req.body.user_name
    let result = await User.findByUsername(user_name)
    if(result){
        next({status: 400, message: 'Username is taken!'})
    }
    else{
        next()
    }
}

const checkAuthcode = (req, res , next) => {
    if(!req.body.authcode){
        req.body.role = "Client"
        next()
    }
    else if(req.body.authcode && req.body.authcode === process.env.Authcode){
        req.body.role = 'Instructor'
        next()
    }
    else{
        next({status: 400, message: 'Wrong AuthCode please check with the club!'})
    }

}
module.exports = {checkIfSent,checkAuthcode, checkIfUserTaken}