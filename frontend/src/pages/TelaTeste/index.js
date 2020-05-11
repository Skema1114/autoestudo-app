import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

export default function TelaTeste(){

    return (
        <div className="profile-container">
            <header>

            </header>

            <h1>Dias Cadastrados</h1>

            <ul>
                    <li>
                        <Link className="button" to="/usuarios">
                            LIST USUARIO
                        </Link>
                        <Link className="button" to="/meses">
                            LIST MES
                        </Link>
                        <Link className="button" to="/dias">
                            LIST DIA
                        </Link>
                        <Link className="button" to="/tarefas">
                            LIST TAREFA
                        </Link>
                        <Link className="button" to="/tarefa_dias">
                            LIST TAREFA DIA
                        </Link>
                        <Link className="button" to="/resultado_dias">
                            LIST RESULTADO DIA
                        </Link>
                        <Link className="button" to="/resultado_meses">
                            LIST RESULTADO MES
                        </Link>
                    </li>

                    <li>
                        <Link className="button" to="/usuarios/novo">
                            NEW USUARIO
                        </Link>
                        <Link className="button" to="/meses/novo">
                            NEW MES
                        </Link>
                        <Link className="button" to="/dias/novo">
                            NEW DIA
                        </Link>
                        <Link className="button" to="/tarefas/novo">
                            NEW TAREFA
                        </Link>
                        <Link className="button" to="/tarefa_dias/novo">
                            NEW TAREFA DIA
                        </Link>
                        <Link className="button" to="/resultado_dias/novo">
                            NEW RESULTADO DIA
                        </Link>
                        <Link className="button" to="/resultado_meses/novo">
                            NEW RESULTADO MES
                        </Link>
                    </li>
            </ul>
        </div>
    );
}

//CUIDAR NOS PARAMETROS DESSE BUTTON, POIS SE É PASSADO SEM A AERO FUNCTION, ELE
//DELETA FiThumbsDown, EX: handleDeleteIncident(incident.id)
//TEM QUE TER A AERO PARA ELE PASSAR A FUNÇÃO COMO PARAMETRO
//() => handleDeleteIncident(incident.id)
//SEM ELE EXECUTA A FUNÇÃO E MANDA OS PARAMETROS