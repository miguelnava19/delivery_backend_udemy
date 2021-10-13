const UsersController = require('../controller/usersController');
module.exports = (app) => {
    app.get('/api/users/getAll', UsersController.getAll);
    app.post('/api/users/create', UsersController.create);
}
