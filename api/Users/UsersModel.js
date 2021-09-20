const db = require('../data/db-config')


async function  getAll(){
    return await db('users')
}

async function getById(id){
    return await db('users').where('user_id', id)
}

async function findByUsername(username){
    return await db('users').where('user_name', username).first()
}

async function insert(user){
    const [newUserObject] = await db('users').insert(user, ['user_id', 'user_name', 'password'])
    return newUserObject
}


module.exports = {getAll, getById, insert,findByUsername}