const db = require('../config/config');
const User = {}

User.getAll = () => {
    const sql = `Select * from users`;
    return db.manyOrNone(sql);
}

User.create =  (user) => {
    const sql = `Insert into users(
           email,password,nombre,apellido,telefono,image,create_at,updated_at)
           Values($1,$2,$3,$4,$5,$6,$7,$8) 
           returning id`;
    return db.oneOrNone(sql, [user.email,user.password,user.nombre,user.apellido,user.telefono,user.image,new Date(),new Date()]);
};
module.exports = User;
