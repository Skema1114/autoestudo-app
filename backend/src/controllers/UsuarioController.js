const connection = require('../database/connection');
const generateUniqueId = require('../util/generateUniqueId');

module.exports = {
    async get(request, response){

        const usuarios = await connection('usuario')
        .select('*');
        
        if (usuarios.length > 0) {
            const [count] = await connection('usuario')
            .count()

            response.header('X-Total-Count', count['count(*)']);
        } else {
            response.header('X-Total-Count', 0);
        }

        return response.json(usuarios);
    },

    async post(request, response){
        const {nome, email, senha, data_cadastro} = request.body;

        const id = generateUniqueId();
     
        await connection('usuario').insert({
            id,
            nome,
            email,
            senha,
            data_cadastro
        });
        
        return response.json({id});
    },

    async patch(request, response) {
        const {id} = request.params;
        const id_usuario = request.headers.authorization;
        const usuarioBody = request.body;

        const usuarioTeste = await connection('usuario')
            .where('id', id)
            .first()

        if(usuarioTeste.id_usuario !== id_usuario){
            return response.status(401).json({
                error: 'Sem permissões.'
            });
        }
              
        const usuario = await connection('usuario')
            .where('id', id)
            .update(usuarioBody)
            .then(result => response.sendStatus(204))
            .catch(error => {
                response.status(412).json({msg: error.message})
            })
    },

    async delete(request, response){
        const {id} = request.params;

        const usuarios = await connection('usuario')
            .where('id', id)
            .select('id ')
            .first()

    if(usuarios.id !== id){
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }  
        await connection('usuario').where('id', id).delete();

        return response.status(204).send();
    }
}