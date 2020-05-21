const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const UsuarioController = require('./controllers/UsuarioController');
const MesController = require('./controllers/MesController');
const DiaController = require('./controllers/DiaController');
const TarefaController = require('./controllers/TarefaController');
const TarefaDiaController = require('./controllers/TarefaDiaController');
const ResultadoDiaController = require('./controllers/ResultadoDiaController');
const ResultadoMesController = require('./controllers/ResultadoMesController');
const SessionController = require('./controllers/SessionController');
const TarefaMesController = require('./controllers/TarefaMesController');

const routes = express.Router();


/**
 * ####################  /USUARIO
 */

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuario', celebrate({
          [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required(),
            senha: Joi.string().required(),
            data_cadastro: Joi.string().required(),
          })
}), UsuarioController.create);
routes.delete('/usuario/:id',celebrate({
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
routes.post('/mes',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            mes: Joi.string().required(),
            ano: Joi.string().required(),
            qtd_nao: Joi.string().required(),
            data_cadastro: Joi.string().required(),
            bloq: Joi.string(),
          })
}), MesController.create);
routes.post('/mes/search/',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            mes: Joi.number().required(),
            ano: Joi.number().required(),
          })
}), MesController.getByMesAno);
routes.delete('/mes/:id',celebrate({
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
routes.post('/dia',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            id_mes: Joi.number().required(),
            dia: Joi.number().required(),
            data_cadastro: Joi.string().required(),
            bloq: Joi.string(),
          }),
}), DiaController.create);
routes.delete('/dia/:id',celebrate({
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
routes.post('/tarefa',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            data_cadastro: Joi.string().required()
          })
}), TarefaController.create);
routes.delete('/tarefa/:id',celebrate({
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
routes.post('/tarefa_dia',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            id_tarefa: Joi.number().required(),
            status: Joi.string().required(),
            data_cadastro: Joi.string().required(),
            bloq: Joi.string(),
          }),
}), TarefaDiaController.create);
routes.delete('/tarefa_dia/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), TarefaDiaController.delete);



/**
 * #################### /TAREFA MES
 */
routes.get('/tarefa_meses',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), TarefaMesController.index);
routes.post('/tarefa_mes',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            id_mes: Joi.number().required(),
            id_tarefa: Joi.number().required(),
            data_cadastro: Joi.string().required(),
            bloq: Joi.string(),
          })
}), TarefaMesController.create);
routes.delete('/tarefa_mes/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), TarefaMesController.delete);



/**
 * #################### /RESULTADO DIA
 */

routes.get('/resultado_dias',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
}), ResultadoDiaController.index);
routes.post('/resultado_dia',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            id_dia: Joi.number().required(),
            resultado: Joi.string().required(),
            qtd_nao: Joi.string().required(),
            data_cadastro: Joi.string().required(),
          }),
}), ResultadoDiaController.create);
routes.delete('/resultado_dia/:id',celebrate({
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
routes.post('/resultado_mes',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.BODY]: Joi.object().keys({
            id_mes: Joi.number().required(),
            resultado: Joi.string().required(),
            data_cadastro: Joi.string().required(),
          }),
}), ResultadoMesController.create);
routes.delete('/resultado_mes/:id',celebrate({
          [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
          }).unknown(),
          [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
          })
}), ResultadoMesController.delete);



/**
 * #################### /SESSIONS
 */
routes.post('/sessions',celebrate({
          [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            senha: Joi.string().required()
          })
}), SessionController.create);

module.exports = routes;