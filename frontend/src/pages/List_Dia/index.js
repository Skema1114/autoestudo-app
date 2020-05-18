import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';


export default function ListDia(){
    const [dias, setDias] = useState([]);
    const id_usuario = "1e54cc5b";
    const history = useHistory();

    useEffect(() => {
        api.get('dias', {
            headers: {
                Authorization: id_usuario,
            }
        }).then(response => {
            setDias(response.data);
        })
    }, [id_usuario]);

    async function handleDeleteDia(id){
        try{
            await api.delete(`dia/${id}`, {
                headers: {
                    Authorization: id_usuario,
                }
            });
            
            setDias(dias.filter(dia => dia.id !== id));
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

                <Link className="button" to="/dia/1">
                    NOVO dia
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Dias Cadastrados</h1>

            <ul>
                {dias.map(dia => (
                    <li key={dia.id}>
                        <strong>ID:</strong>
                        <p>{dia.id}</p>

                        <strong>ID USUARIO:</strong>
                        <p>{dia.id_usuario}</p>

                        <strong>DATA:</strong>
                        <p>{dia.data_cadastro}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteDia(dia.id)
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