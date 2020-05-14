const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id_usuario = request.headers.authorization;
        const {page = 1} = request.query;
        
        const [count] = await connection('dia')
            .count();

        const dias = await connection('dia')
        .select('*')
        .limit(50)
        .offset((page - 1) * 50) 
        
        .where('id_usuario', id_usuario);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(dias);
    },

    async create(request, response){
        const {data} = request.body;
        const id_usuario = request.headers.authorization;
        const {id_mes} = request.params;

        const [id] = await connection("dia").insert({
            id_usuario,
            id_mes,
            data
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const id_usuario = request.headers.authorization;

        const dias = await connection('dia')
            .where('id', id)
            .select('id_usuario')
            .first()

    if(dias.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }
        await connection('dia').where('id', id).delete();

        return response.status(204).send();
    }
};