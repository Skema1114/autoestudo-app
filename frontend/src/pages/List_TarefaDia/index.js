import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function ListTarefaDia(){
    const [tarefaDias, setTarefaDias] = useState([]);
    const id_usuario = "1e54cc5b";
    const history = useHistory();

    useEffect(() => {
        api.get('tarefa_dias', {
            headers: {
                Authorization: id_usuario,
            }
        }).then(response => {
            setTarefaDias(response.data);
        })
    }, [id_usuario]);

    async function handleDeleteTarefaDia(id){
        try{
            await api.delete(`tarefa_dia/${id}`, {
                headers: {
                    Authorization: id_usuario,
                }
            });
            
            setTarefaDias(tarefaDias.filter(tarefaDia => tarefaDia.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/tarefa_dias');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, TESTE</span>

                <Link className="button" to="/tarefa_dia/novo">
                NOVA tarefa dia
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Tarefa Dias Cadastrados</h1>

            <ul>
                {tarefaDias.map(tarefaDia => (
                    <li key={tarefaDia.id}>
                        <strong>ID:</strong>
                        <p>{tarefaDia.id}</p>

                        <strong>ID TAREFA:</strong>
                        <p>{tarefaDia.id_tarefa}</p>

                        <strong>ID USUARIO:</strong>
                        <p>{tarefaDia.id_usuario}</p>

                        <strong>STATUS:</strong>
                        <p>{tarefaDia.status}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteTarefaDia(tarefaDia.id)
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