const express = require('express')
const ClassRouter = express.Router()
const {only, restricted} = require('../Auth/AuthMiddlewares')
const token_builder = require('./token_builder')
const Class = require('./ClassModel')

ClassRouter.get('/classes',restricted, async(req,res) => {

})

ClassRouter.get('/classes/:class_id',restricted, async(req,res, next) => {
    let id = req.params.class_id;
    let myClass = await Class.findByClassId(id)
    if(myClass){
        res.status(200).json(myClass)
    }
    else{
        next({status: 404, message: 'The class you are looking for does not exist !'})
    }
})

ClassRouter.post('/classes', restricted , only('Instructor'), async(req,res,next) => {
    let myClass = await Class.findByClassId(id)
    let 
})

module.exports = ClassRouter