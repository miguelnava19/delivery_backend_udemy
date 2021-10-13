const User = require('../model/user')
module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`data users ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.error(`error getAll usuarios --> ${error}`)
            return res.status(501).json({
                success: false,
                message: 'Error al obtener usuarios',
                error: error
            })
        }
    },
    async create(req,res,next){
        try{
            const user = req.body;
            const data = await User.create(user);
            res.status(201).json({
                success: true,
                message: `Usuario registrado correctamente`,
                data: data.id
            });
        }catch (e) {
            console.error(`error create usuarios --> ${e}`)
            return res.status(501).json({
                success: false,
                message: 'Error al crear usuarios',
                error:e
            })
        }
    }
};
