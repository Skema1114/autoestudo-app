const connection = require('../database/connection');

module.exports = {
    async get(request, response){
        const id_usuario = parseInt(request.headers.authorization);

        const meses = await connection('mes')
        .select('*')
        .where('id_usuario', id_usuario);

        if (meses.length > 0) {
            const [count] = await connection('mes')
            .count()
            .where('id_usuario', id_usuario);

            response.header('X-Total-Count', count['count(*)']);
        } else {
            response.header('X-Total-Count', 0);
        }

        return response.json(meses);
    },

    async post(request, response){
        const {mes, ano, qtd_nao, data_cadastro, bloq} = request.body;
        const id_usuario = parseInt(request.headers.authorization);

        const [id] = await connection("mes").insert({
            id_usuario,
            mes,
            ano,
            qtd_nao,
            data_cadastro,
            bloq
        });

        return response.json({id});
    },

    async patch(request, response) {
        const {id} = request.params;
        const id_usuario = parseInt(request.headers.authorization);
        const mesBody = request.body;

        const mesTeste = await connection('mes')
            .where('id', id)
            .select('id_usuario')
            .first()

        if(mesTeste.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Sem permissões'
            });
        }
              
        const mes = await connection('mes')
            .where('id', id)
            .andWhere('id_usuario', id_usuario)
            .update(mesBody)
            .then(result => response.sendStatus(204))
            .catch(error => {
                response.status(412).json({msg: error.message})
            })
    },

    async delete(request, response){
        const {id} = request.params;
        const id_usuario = parseInt(request.headers.authorization);

        const tarefas = await connection('mes')
            .where('id', id)
            .select('id_usuario')
            .first()

        if(tarefas.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Sem permissões'
            });
        }
        await connection('mes').where('id', id).delete();

        return response.status(204).send();
    },

    async getByMesAno(request, response){
        const {mes, ano} = request.body;
        const id_usuario = parseInt(request.headers.authorization);

        const meses = await connection('mes')
            .select('*')
            .where('mes', mes)
            .andWhere('ano', ano)
            .andWhere('id_usuario', id_usuario)

        if (meses.length > 0) {
            const [count] = await connection('mes')
            .count()
            .where('mes', mes)
            .andWhere('ano', ano)

            response.header('X-Total-Count', count['count(*)']);
        } else {
            response.header('X-Total-Count', 0);
        }

        if (meses.length > 0) {
            return response.json(meses);
        } else {
            return response.status(401).json({
                error: 'Não há mes cadastrado.'
            });
        }
    },
};