import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2, FiThumbsDown} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(() => {
        api.get('usuarios', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            
            setIncidents(incidents.filter(incident => incident.id != id));
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
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>NOME:</strong>
                        <p>{incident.nome}</p>

                        <strong>EMAIL:</strong>
                        <p>{incident.email}</p>

                        <strong>FONE:</strong>
                        <p>{incident.fone}</p>

                        <strong>SENHA:</strong>
                        <p>{incident.senha}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteIncident(incident.id)
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