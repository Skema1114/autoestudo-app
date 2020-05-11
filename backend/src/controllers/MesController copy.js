const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id_usuario = request.headers.authorization;

        const [count] = await connection('mes')
            .count();

        const meses = await connection('mes')
        .select('*')
        .where('id_usuario', id_usuario);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(meses);
    },

    async create(request, response){
        const {nome, data_criacao} = request.body;
        const id_usuario = request.headers.authorization;

        const [id] = await connection("tarefa").insert({
            id_usuario,
            nome,
            data_criacao
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const id_usuario = request.headers.authorization;

        const tarefas = await connection('tarefa')
            .where('id', id)
            .select('id_usuario')
            .first()

    if(tarefas.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }
        await connection('tarefa').where('id', id).delete();

        return response.status(204).send();
    }
};