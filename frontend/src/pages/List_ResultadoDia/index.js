import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function ListResultadoDia(){
    const [resultadoDia, setResultadoDia] = useState([]);
    const id_usuario = "1e54cc5b";
    const history = useHistory();

    useEffect(() => {
        api.get('resultado_dias', {
            headers: {
                Authorization: id_usuario,
            }
        }).then(response => {
            setResultadoDia(response.data);
        })
    }, [id_usuario]);

    async function handleDeleteResultadoDias(id){
        try{
            await api.delete(`resultado_dias/${id}`, {
                headers: {
                    Authorization: id_usuario,
                }
            });
            
            setResultadoDia(resultadoDia.filter(resultadoDia => resultadoDia.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/resultado_dias');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, TESTE</span>

                <Link className="button" to="/resultado_dias/new">
                    NOVO resultado dia
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Resultado Dia Cadastrados</h1>

            <ul>
                {resultadoDia.map(resultadoDia => (
                    <li key={resultadoDia.id}>
                        <strong>ID:</strong>
                        <p>{resultadoDia.id}</p>

                        <strong>ID DIA:</strong>
                        <p>{resultadoDia.id_dia}</p>

                        <strong>ID USUARIO:</strong>
                        <p>{resultadoDia.id_usuario}</p>

                        <strong>RESULTADO:</strong>
                        <p>{resultadoDia.resultado}</p>

                        <strong>QTD_NAO:</strong>
                        <p>{resultadoDia.qtd_nao}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteResultadoDias(resultadoDia.id)
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