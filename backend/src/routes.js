const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const UsuarioController = require('./controllers/UsuarioController');
const MesController = require('./controllers/MesController');
const DiaController = require('./controllers/DiaController');
const TarefaController = require('./controllers/TarefaController');
const TarefaDiaController = require('./controllers/TarefaDiaController');
const ResultadoDiaController = require('./controllers/ResultadoDiaController');
const ResultadoMesController = require('./controllers/ResultadoMesController');

const routes = express.Router();


/**
 * ####################  /USUARIO
 */

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', celebrate({
          [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required(),
            senha: Joi.string().required(),
          })
}), UsuarioController.create);
routes.delete('/usuarios/:id',celebrate({
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required()
          })
}), UsuarioController.delete);


/**
 * #################### /MES
 */

routes.get('/meses',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), MesController.index);
routes.post('/meses',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            mes: Joi.string().required(),
            ano: Joi.string().required(),
            qtd_nao: Joi.string().required()
          })
}), MesController.create);
routes.delete('/meses/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), MesController.delete);



/**
 * #################### /DIA
 */

routes.get('/dias',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), DiaController.index);
routes.post('/dias/:id_mes',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            data: Joi.string().required(),
          }),
          [Segments.PARAMS]: Joi.object().keys({
            id_mes: Joi.number().required()
          })
}), DiaController.create);
routes.delete('/dias/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), DiaController.delete);



/**
 * #################### /TAREFA
 */

routes.get('/tarefas',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), TarefaController.index);
routes.post('/tarefas',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
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



/**
 * #################### /TAREFA DIA
 */

routes.get('/tarefa_dias',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), TarefaDiaController.index);
routes.post('/tarefa_dias/:id_tarefa',celebrate({
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
routes.delete('/tarefa_dias/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), TarefaDiaController.delete);



/**
 * #################### /RESULTADO DIA
 */

routes.get('/resultado_dias',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), ResultadoDiaController.index);
routes.post('/resultado_dias/:id_dia',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            resultado: Joi.string().required(),
            qtd_nao: Joi.string().required(),
          }),
          [Segments.PARAMS]: Joi.object().keys({
            id_dia: Joi.number().required()
          })
}), ResultadoDiaController.create);
routes.delete('/resultado_dias/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), ResultadoDiaController.delete);



/**
 * #################### /RESULTADO MES
 */

routes.get('/resultado_meses',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), ResultadoMesController.index);
routes.post('/resultado_meses/:id_mes',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            resultado: Joi.string().required(),
          }),
          [Segments.PARAMS]: Joi.object().keys({
            id_mes: Joi.number().required()
          })
}), ResultadoMesController.create);
routes.delete('/resultado_meses/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), ResultadoMesController.delete);


module.exports = routes;