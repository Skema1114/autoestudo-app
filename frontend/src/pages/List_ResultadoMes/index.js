import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function ListResultadoMes(){
    const [resultadoMes, setResultadoMes] = useState([]);
    const id_usuario = "1e54cc5b";
    const history = useHistory();

    useEffect(() => {
        api.get('resultado_meses', {
            headers: {
                Authorization: id_usuario,
            }
        }).then(response => {
            setResultadoMes(response.data);
        })
    }, [id_usuario]);

    async function handleDeleteResultadoMes(id){
        try{
            await api.delete(`resultado_mes/${id}`, {
                headers: {
                    Authorization: id_usuario,
                }
            });
            
            setResultadoMes(resultadoMes.filter(resultadoMes => resultadoMes.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/resultado_meses');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, TESTE</span>

                <Link className="button" to="/resultado_mes/novo">
                    NOVO resultado mes
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Resultado Mes Cadastrados</h1>

            <ul>
                {resultadoMes.map(resultadoMes => (
                    <li key={resultadoMes.id}>
                        <strong>ID:</strong>
                        <p>{resultadoMes.id}</p>

                        <strong>ID MES:</strong>
                        <p>{resultadoMes.id_mes}</p>

                        <strong>ID USUARIO:</strong>
                        <p>{resultadoMes.id_usuario}</p>

                        <strong>RESULTADO:</strong>
                        <p>{resultadoMes.resultado}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteResultadoMes(resultadoMes.id)
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