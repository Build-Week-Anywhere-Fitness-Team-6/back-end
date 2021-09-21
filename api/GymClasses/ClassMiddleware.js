const checkIfSent = (req, res , next) => {
    if(!req.body.user_name || !req.body.password){
        next({status: 400, message:'Username and Password Required!' })
    }
    else{
        next()
    }
    }

    module.exports = {checkIfSent}