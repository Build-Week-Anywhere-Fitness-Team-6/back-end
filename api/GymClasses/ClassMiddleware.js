const Class = require('./ClassModel')

const checkIfSent = (req, res , next) => {
    if(!req.body.name || !req.body.type || !req.body.time || !req.body.day || !req.body.duration || !req.body.intensity || !req.body.location || !req.body.current_attendees || !req.body.max_capacity || !req.body.punch_pass){
        next({status: 400, message:'Fields marked with * are  required!' })
    }
    else{
        next()
    }
    }
const checkUnique = async(req,res,next) => {
    let myclass = await Class.findByclassname(req.body.name)
    if(myclass){
        next({status: 500, message: 'Class name is already taken!'})
    }
    else{
        next()
    }
}

    module.exports = {checkIfSent,checkUnique}