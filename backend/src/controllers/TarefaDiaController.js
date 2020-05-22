const connection = require('../database/connection');

module.exports = {
    async get(request, response){
        const id_usuario = request.headers.authorization;

        const tarefa_dias = await connection('tarefa_dia')
        .join('tarefa', 'tarefa.id', '=', 'tarefa_dia.id_tarefa')
        .select([
            'tarefa_dia.*',
            'tarefa.nome',  
        ])
        .where('tarefa_dia.id_usuario', id_usuario);

        if (tarefa_dias.length > 0) {
            const [count] = await connection('tarefa_dia')
            .count()
            .where('id_usuario', id_usuario);

            response.header('X-Total-Count', count['count(*)']);
        } else {
            response.header('X-Total-Count', 0);
        }

        return response.json(tarefa_dias);
    },

    async post(request, response){
        const {id_tarefa, status, data_cadastro, bloq} = request.body;
        const id_usuario = request.headers.authorization;

        const [id] = await connection("tarefa_dia").insert({
            id_tarefa,
            id_usuario,
            status,
            data_cadastro,
            bloq
        });

        return response.json({id});
    },

    async patch(request, response) {
        const {id} = request.params;
        const id_usuario = request.headers.authorization;
        const tarefaDiaBody = request.body;

        const tarefaDiaTeste = await connection('tarefa_dia')
            .where('id', id)
            .select('id_usuario')
            .first()

        if(tarefaDiaTeste.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Sem permissões.'
            });
        }
              
        const tarefaDia = await connection('tarefa_dia')
            .where('id', id)
            .andWhere('id_usuario', id_usuario)
            .update(tarefaDiaBody)
            .then(result => response.sendStatus(204))
            .catch(error => {
                response.status(412).json({msg: error.message})
            })
    },

    async delete(request, response){
        const {id} = request.params;
        const id_usuario = request.headers.authorization;

        const tarefa_dias = await connection('tarefa_dia')
            .where('id', id)
            .select('id_usuario')
            .first()

    if((tarefa_dias.id_usuario !== id_usuario)&&(tarefa_dias.id_tarefa !== id)){
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }
        await connection('tarefa_dia').where('id', id).delete();

        return response.status(204).send();
    }
};