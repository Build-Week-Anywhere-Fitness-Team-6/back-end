const express = require('express')
const ClassRouter = express.Router()
const {only, restricted} = require('../Auth/AuthMiddlewares')
const {checkIfSent,checkUnique} = require('./ClassMiddleware')
const Class = require('./ClassModel')

ClassRouter.get('/classes',restricted, async(req,res) => {
let classes = await Class.getAll()
res.json(classes)
})

ClassRouter.get('/classes/:class_id',restricted, async(req,res, next) => {
    try{
    let id = req.params.class_id;
    let myClass = await Class.getById(id)
    if(myClass){
        res.status(200).json(myClass)
    }
    else{
        next({status: 404, message: 'The class you are looking for does not exist !'})
    }
}
catch(e){
    next(e)
}
})


ClassRouter.get('/profile/classes',restricted, async(req,res, next) => {
    let id = req.decodedJwt.subject;
    let myClass = await Class.findUsersClass(id)
    if(myClass){
        res.status(200).json(myClass)
    }
    else{
        next({status: 404, message: 'You dont have any classes yet !'})
    }
})


ClassRouter.post('/classes', restricted , only('Instructor'),checkIfSent, checkUnique , async(req,res,next) => {
    let myClass = await Class.insert(req.body)
    res.status(201).json(myClass)
})

ClassRouter.delete('/classes/:class_id', restricted , only('Instructor') , async(req,res,next) => {
    try{
        let id = req.params.class_id;
        let myClass = await Class.getById(id)
        if(myClass){
            await Class.del(id)
            res.status(200).json(myClass)
        }
        else{
            next({status: 404, message: 'The class you are trying to delete does not exist !'})
        }
    }
    catch(e){
        next(e)
    }
})

module.exports = ClassRouter