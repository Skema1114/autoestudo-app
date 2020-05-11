const connection = require('../database/connection');
const generateUniqueId = require('../util/generateUniqueId');

module.exports = {
    async index(request, response){
        const usuarios = await connection('usuario').select('*');
        
        return response.json(usuarios);
    },

    async create(request, response){
        const {nome, email, fone, senha} = request.body;

        const id = generateUniqueId();
     
        await connection('usuario').insert({
            id,
            nome,
            email,
            fone,
            senha,
        });
        
        return response.json({id});
    }
}