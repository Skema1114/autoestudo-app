const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id_usuario = request.headers.authorization;

        const tarefa_meses = await connection('tarefa_mes')
        .select('*')
        .where('id_usuario', id_usuario);

        if (tarefa_meses.length > 0) {
            const [count] = await connection('tarefa_mes')
            .count();

            response.header('X-Total-Count', count['count(*)']);
        } else {
            response.header('X-Total-Count', 0);
        }

        return response.json(tarefa_meses);
    },

    async create(request, response){
        const {data, id_mes} = request.body;
        const id_usuario = request.headers.authorization;
        const {id_tarefa} = request.params;

        const [id] = await connection("tarefa_mes").insert({
            id_mes,
            id_tarefa,
            id_usuario,
            data
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const id_usuario = request.headers.authorization;

        const tarefa_meses = await connection('tarefa_mes')
            .where('id', id)
            .select('id_usuario')
            .first()

    if((tarefa_meses.id_usuario !== id_usuario)&&(tarefa_meses.id_tarefa !== id)){
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }
        await connection('tarefa_mes').where('id', id).delete();

        return response.status(204).send();
    }
};