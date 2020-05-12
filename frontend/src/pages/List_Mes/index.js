import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function ListMes(){
    const [meses, setMeses] = useState([]);
    const id_usuario = "1e54cc5b";
    const history = useHistory();

    useEffect(() => {
        api.get('meses', {
            headers: {
                Authorization: id_usuario,
            }
        }).then(response => {
            setMeses(response.data);
        })
    }, [id_usuario]);

    async function handleDeleteMes(id){
        try{
            await api.delete(`mes/${id}`, {
                headers: {
                    Authorization: id_usuario,
                }
            });
            
            setMeses(meses.filter(mes => mes.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, TESTE</span>

                <Link className="button" to="/mes/novo">
                    NOVO mês
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Meses Cadastrados</h1>

            <ul>
                {meses.map(mes => (
                    <li key={mes.id}>
                        <strong>ID:</strong>
                        <p>{mes.id}</p>

                        <strong>ID USUARIO:</strong>
                        <p>{mes.id_usuario}</p>

                        <strong>MES:</strong>
                        <p>{mes.mes}</p>

                        <strong>ANO:</strong>
                        <p>{mes.ano}</p>

                        <strong>QTD NAO:</strong>
                        <p>{mes.qtd_nao}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteMes(mes.id)
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