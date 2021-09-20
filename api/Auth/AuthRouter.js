const express = require('express')
const AuthRouter = express.Router()
const {checkIfSent,checkIfUserTaken,checkAuthcode} = require('./AuthMiddlewares')
const bcrypt = require('bcryptjs')
const User = require('../Users/UsersModel')
const token_builder = require('./token_builder')

AuthRouter.post('/register',checkIfSent,checkIfUserTaken,checkAuthcode, async(req,res) => {
    let hashed = bcrypt.hashSync(req.body.password, 7)
    req.body.password = hashed
    let newUser = {
        user_name: req.body.user_name,
        password: req.body.password,
        role: req.body.role
    }
    let created = await User.insert(newUser)
    res.status(201).json(created)
})

AuthRouter.post('/login',checkIfSent, async(req,res,next) => {
    let user = await User.findByUsername(req.body.user_name)
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = token_builder(user)
        res.status(200).json({
            message: `Welcome ${user.user_name}!`,
            token: token
        })
    }
    else{
        next({status: 401, message:"invalid credentials!"})
    }
})

module.exports = AuthRouter