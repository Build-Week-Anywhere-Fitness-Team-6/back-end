const db = require('../data/db-config')


async function  getAll(){
    return await db('classes')
}

async function getById(id){
    return await db('classes').where('class_id', id).first()
}


async function findByclassname(classname){
    return await db('classes').where('name', classname).first()
}


async function findUsersClass(userid){
    return await db('classes as c')
    .rightJoin('users_classes as uc', function() {
        this.on('uc.class_id', '=', 'c.class_id')
      })
    .rightJoin('users as u', function() {
        this.on('u.user_id', '=', userid)
      })

}

async function updateClass(myclass){
    return await db('classes').update(myclass, 
        ['class_id', 'name', 'type', 'time','day', 'duration', 'intensity','location','current_attendees','max_capacity','punch_pass']).where('name',myclass.name)
    
}
async function del(id){
    let myclass = await db('classes').where('class_id', id).first()
    await db('classes').delete().where('class_id',id)
    return myclass
    
}

async function insert(gymclass){
    const [newclassObject] = await db('classes').insert(gymclass, ['class_id', 'name', 'type', 'time','day', 'duration', 'intensity','location','current_attendees','max_capacity','punch_pass'])
    return newclassObject
}


module.exports = {getAll, getById, insert,findByclassname,updateClass,del,findUsersClass}