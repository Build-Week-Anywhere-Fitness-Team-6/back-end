const db = require('../data/db-config')


async function  getAll(){
    return await db('classes')
}

async function getById(id){
    return await db('classes').where('class_id', id)
}

async function findByclassname(classname){
    return await db('classes').where('class_name', classname).first()
}

async function insert(gymclass){
    const [newclassObject] = await db('classes').insert(gymclass, ['class_id', 'name', 'type', 'time','day', 'duration', 'intensity','location','current_attendees','max_capacity','punch_pass'])
    return newclassObject
}


module.exports = {getAll, getById, insert,findByclassname}