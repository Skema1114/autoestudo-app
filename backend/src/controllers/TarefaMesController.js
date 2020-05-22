const connection = require('../database/connection');

module.exports = {
    async get(request, response){
        const id_usuario = request.headers.authorization;

        const tarefa_meses = await connection('tarefa_mes')
        .join('tarefa', 'tarefa.id', '=', 'tarefa_mes.id_tarefa')
        .join('mes', 'mes.id', '=', 'tarefa_mes.id_mes')
        .select([
            'tarefa_mes.*',
            'tarefa.nome',
            'mes.mes',
            'mes.ano'     
        ])
        .where('tarefa_mes.id_usuario', id_usuario);

        if (tarefa_meses.length > 0) {
            const [count] = await connection('tarefa_mes')
            .count()
            .where('id_usuario', id_usuario);

            response.header('X-Total-Count', count['count(*)']);
        } else {
            response.header('X-Total-Count', 0);
        }

        return response.json(tarefa_meses);
    },

    async post(request, response){
        const {id_mes, id_tarefa, data_cadastro, bloq} = request.body;
        const id_usuario = request.headers.authorization;

        const [id] = await connection("tarefa_mes").insert({
            id_mes,
            id_tarefa,
            id_usuario,
            data_cadastro,
            bloq
        });

        return response.json({id});
    },

    async patch(request, response) {
        const {id} = request.params;
        const id_usuario = request.headers.authorization;
        const tarefaMesBody = request.body;
              
        const tarefaMes = await connection('tarefa_mes')
            .where('id', id)
            .andWhere('id_usuario', id_usuario)
            .update(tarefaMesBody)
            .then(result => response.sendStatus(204))
            .catch(error => {
                response.status(412).json({msg: error.message})
            })
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