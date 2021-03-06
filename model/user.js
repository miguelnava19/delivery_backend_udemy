const db = require("../config/config");
const bcrypt = require("bcryptjs");
//
const User = {};

User.getAll = () => {
  const sql = `Select * from users`;
  return db.manyOrNone(sql);
};

User.findById = (id, callback) => {
  const sql = `select u.id, u.email, u.name, u.lastname, u.image, u.phone, u.password, u.session_tooken from users u where u.id = $1`;
  return db.oneOrNone(sql, id).then((user) => {
    callback(null, user);
  });
};

User.findByEmail = (email) => {
  const sql = `select u.id, u.email, u.name, u.lastname, u.image, u.phone, u.password, u.session_tooken,
  json_agg(
    json_build_object(
      'id', r.id,
      'name', r.name,
      'image', r.image,
      'route', r.route 
    ) 
  )  as roles
  from users u inner join user_has_roles uhr on u.id = uhr.id_user inner join roles r on r.id = uhr.id_rol where u.email = $1 group by u.id `;
  return db.oneOrNone(sql, email);
};

User.create = (user) => {
  // Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

  const sql = `Insert into users(
           email,password,name,lastname,phone,image,create_at,updated_at)
           Values($1,$2,$3,$4,$5,$6,$7,$8) 
           returning id`;
  return db.oneOrNone(sql, [
    user.email,
    user.password,
    user.name,
    user.lastname,
    user.phone,
    user.image,
    new Date(),
    new Date(),
  ]);
};

module.exports = User;
