const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id_usuario = request.headers.authorization;
        const {page = 1} = request.query;
        
        const [count] = await connection('resultado_mes')
            .count();

        const resultado_meses = await connection('resultado_mes')
        .select('*')
        .limit(50)
        .offset((page - 1) * 50) 
        .where('id_usuario', id_usuario);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(resultado_meses);
    },

    async create(request, response){
        const {resultado} = request.body;
        const id_usuario = request.headers.authorization;
        const {id_mes} = request.params;

        const [id] = await connection("resultado_mes").insert({
            id_mes,
            id_usuario,
            resultado
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const id_usuario = request.headers.authorization;

        const resultado_meses = await connection('resultado_mes')
            .where('id', id)
            .select('id_usuario')
            .first()

    if((resultado_meses.id_usuario !== id_usuario)&&(resultado_meses.id !== id)){
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }
        await connection('resultado_mes').where('id', id).delete();

        return response.status(204).send();
    }
};