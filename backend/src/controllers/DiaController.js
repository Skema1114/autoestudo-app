const connection = require('../database/connection');

module.exports = {
    async get(request, response){
        const id_usuario = request.headers.authorization;

        const dias = await connection('dia')
        .select('*')
        .where('id_usuario', id_usuario);

        if (dias.length > 0) {
            const [count] = await connection('dia')
            .count()
            .where('id_usuario', id_usuario);

            response.header('X-Total-Count', count['count(*)']);
        } else {
            response.header('X-Total-Count', 0);
        }

        return response.json(dias);
    },

    async post(request, response){
        const {id_mes, dia, data_cadastro, bloq} = request.body;
        const id_usuario = request.headers.authorization;

        const [id] = await connection("dia").insert({
            id_usuario,
            id_mes,
            dia,
            data_cadastro,
            bloq
        });

        return response.json({id});
    },

    async patch(request, response) {
        const {id} = request.params;
        const id_usuario = request.headers.authorization;
        const diaBody = request.body;

        const diaTeste = await connection('dia')
            .where('id', id)
            .select('id_usuario')
            .first()

        if(diaTeste.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Sem permissões.'
            });
        }
              
        const dia = await connection('dia')
            .where('id', id)
            .andWhere('id_usuario', id_usuario)
            .update(diaBody)
            .then(result => response.sendStatus(204))
            .catch(error => {
                response.status(412).json({msg: error.message})
            })
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
                error: 'Sem permissões.'
            });
        }
        await connection('dia').where('id', id).delete();

        return response.status(204).send();
    }
};