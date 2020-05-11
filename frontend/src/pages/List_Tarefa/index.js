import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function ListTarefa(){
    const [tarefas, setTarefas] = useState([]);
    const id_usuario = "1e54cc5b";
    const history = useHistory();

    useEffect(() => {
        api.get('tarefas', {
            headers: {
                Authorization: id_usuario,
            }
        }).then(response => {
            setTarefas(response.data);
        })
    }, [id_usuario]);

    async function handleDeleteTarefa(id){
        try{
            await api.delete(`tarefa/${id}`, {
                headers: {
                    Authorization: id_usuario,
                }
            });
            
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/tarefas');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, TESTE</span>

                <Link className="button" to="/tarefa/novo">
                    NOVA tarefa
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Tarefas Cadastrados</h1>

            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa.id}>
                        <strong>ID:</strong>
                        <p>{tarefa.id}</p>

                        <strong>ID USUARIO:</strong>
                        <p>{tarefa.id_usuario}</p>

                        <strong>NOME:</strong>
                        <p>{tarefa.nome}</p>

                        <strong>DATA CRIACAO:</strong>
                        <p>{tarefa.data_criacao}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteTarefa(tarefa.id)
                        }>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

//CUIDAR NOS PARAMETROS DESSE BUTTON, POIS SE É PASSADO SEM A AERO FUNCTION, ELE
//DELETA FiThumbsDown, EX: handleDeleteIncident(incident.id)
//TEM QUE TER A AERO PARA ELE PASSAR A FUNÇÃO COMO PARAMETRO
//() => handleDeleteIncident(incident.id)
//SEM ELE EXECUTA A FUNÇÃO E MANDA OS PARAMETROS