const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;
        const id_usuario = request.headers.authorization;

        const [count] = await connection('tarefa')
            .count();

        const tarefas = await connection('tarefa')
        .join('usuario', 'usuario.id', '=', 'tarefa.id_usuario')
        .limit(5)
        .offset((page - 1) * 5)    
        .select([
            'tarefa.*',
            'usuario.nome',
            'usuario.email',
            'usuario.fone',
            'usuario.senha'      
        ])
        .where('id_usuario', id_usuario)

        response.header('X-Total-Count', count['count(*)']);

        return response.json(tarefas);
    },

    async create(request, response){
        const {nome, descricao, data_criacao} = request.body;
        const id_usuario = request.headers.authorization;

        const [id] = await connection("tarefa").insert({
            id_usuario,
            nome,
            descricao,
            data_criacao
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const id_usuario = request.headers.authorization;

        const tarefa = await connection('tarefa')
            .where('id', id)
            .select('id_usuario')
            .first()

    if(tarefa.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }

        await connection('tarefa').where('id', id).delete();

        return response.status(204).send();
    }
};