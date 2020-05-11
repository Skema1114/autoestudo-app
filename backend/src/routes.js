const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');
const UsuarioController = require('./controllers/UsuarioController');
const TarefaController = require('./controllers/TarefaController');
const TarefaDiaController = require('./controllers/TarefaDiaController');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', celebrate({
          [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required(),
            fone: Joi.string().required(), 
            senha: Joi.string().required(),
          })
}), UsuarioController.create);






routes.get('/tarefas',celebrate({
            [Segments.HEADERS]: Joi.object({
              authorization: Joi.string().required()
            }).unknown(),
            [Segments.QUERY]: Joi.object().keys({
              page: Joi.number()
            })}
), TarefaController.index);
routes.post('/tarefas',celebrate({
            [Segments.HEADERS]: Joi.object({
              authorization: Joi.string().required()
            }).unknown(),
            [Segments.BODY]: Joi.object().keys({
              nome: Joi.string().required(),
              descricao: Joi.string().required(),
              data_criacao: Joi.string().required()
            })
}), TarefaController.create);
routes.delete('/tarefas/:id',celebrate({
            [Segments.HEADERS]: Joi.object({
              authorization: Joi.string().required()
            }).unknown(),
            [Segments.PARAMS]: Joi.object().keys({
              id: Joi.number().required()
            })
}), TarefaController.delete);





routes.get('/registros',celebrate({
            [Segments.HEADERS]: Joi.object({
              authorization: Joi.string().required()
            }).unknown(),
            [Segments.QUERY]: Joi.object().keys({
              id_tarefa: Joi.number()
            })}
), TarefaDiaController.index);
routes.post('/registros/:id_tarefa',celebrate({
            [Segments.HEADERS]: Joi.object({
              authorization: Joi.string().required()
            }).unknown(),
            [Segments.BODY]: Joi.object().keys({
              status: Joi.string().required(),
            }),
            [Segments.PARAMS]: Joi.object().keys({
              id_tarefa: Joi.number().required()
            })
}), TarefaDiaController.create);
routes.delete('/registros/:id',celebrate({
            [Segments.HEADERS]: Joi.object({
              authorization: Joi.string().required()
            }).unknown(),
            [Segments.PARAMS]: Joi.object().keys({
              id: Joi.number().required()
            })
}), TarefaDiaController.delete);


module.exports = routes;
